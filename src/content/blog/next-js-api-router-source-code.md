---
title: next.js 源码解析 - API 路由篇
description: 解析下 next.js 中 API 路由实现的相关源码，包含打包、dev server、server 相关的部分。
pubDate: '2022-10-01'
heroImage: 'https://stg.heyfe.org/images/blog-next.js-1690694536769.webp'
tags:
    - next.js
    - React
    - 源码解析
---

文章中包含大量源码排查路径相关内容，不感兴趣可直接跳到最后。

首先我们得确认下源码的位置， `next.js` 的 `packages` 中包括了很多包，我们先要确认和 `API` 路由相关的源码位置。

## 排查 CLI 源码

> 本章是排查 `API` 路由相关的源码的步骤，不感兴趣的可以跳过。

`next` 会启动 `API` 路由的命令包括：`start` 和 `dev`，我们首先从这两个命令开始排查：

首先 `next start` 这些命令调用的是项目 `node_modules/bin` 下的 `next` 文件，我们找到文件后看一下：

```js
#!/bin/sh
basedir=$(dirname "$(echo "$0" | sed -e 's,\\,/,g')")

case `uname` in
    *CYGWIN*) basedir=`cygpath -w "$basedir"`;;
esac

if [ -z "$NODE_PATH" ]; then
  export NODE_PATH="/xxxx"
else
  export NODE_PATH="$NODE_PATH:xxxx"
fi
if [ -x "$basedir/node" ]; then
  exec "$basedir/node"  "$basedir/../next/dist/bin/next" "$@"
else
  exec node  "$basedir/../next/dist/bin/next" "$@"
fi
```

`NODE_PATH` 里的代码被我省略，可以看出，该文件指向的是 `next/dist/bin/next`，所以可以看出包名就是 `next`，而 `cli` 入口文件为 `next` 下的 `dist/bin/next`。

我们到 `next` 项目下确认下：

```json
{
    "bin": {
        "next": "./dist/bin/next"
    }
}
```

确认 `next` 命令确实是在 `next` 包下，且文件为 `dist/bin/next`，从文件结构不难猜到，这个文件的源码就是 `bin/next` 文件。进入这个文件我们可以看到，调用命令的源码为：

```ts
commands[command]()
    .then(exec => exec(forwardedArgs))
    .then(() => {
        if (command === 'build') {
            // ensure process exits after build completes so open handles/connections
            // don't cause process to hang
            process.exit(0);
        }
    });
```

点击 `commands` 进去跳到 `lib/commands.ts` 文件：

```ts
export const commands: { [command: string]: () => Promise<cliCommand> } = {
    build: () => Promise.resolve(require('../cli/next-build').nextBuild),
    start: () => Promise.resolve(require('../cli/next-start').nextStart),
    export: () => Promise.resolve(require('../cli/next-export').nextExport),
    dev: () => Promise.resolve(require('../cli/next-dev').nextDev),
    lint: () => Promise.resolve(require('../cli/next-lint').nextLint),
    telemetry: () => Promise.resolve(require('../cli/next-telemetry').nextTelemetry),
    info: () => Promise.resolve(require('../cli/next-info').nextInfo)
};
```

可以看出 `start` 和 `dev`，最终指向的是 `cli` 下的 `next-dev` 和 `next-start` 文件。我们直接看 `next-start` 文件：

```ts
startServer({
    dir,
    hostname: host,
    port,
    keepAliveTimeout
})
    .then(async app => {
        const appUrl = `http://${app.hostname}:${app.port}`;
        Log.ready(`started server on ${host}:${app.port}, url: ${appUrl}`);
        await app.prepare();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
```

前面是一些参数的 `parse`、校验，这里直接跳过，看下面主体部分，调用的是 `lib/start-server` 中的 `startServer`，其实 `next-dev` 最终也会调用 `startServer`，只是参数的不同。

我们再看下 `startServer`，抽离其中关键代码瞧瞧：

```ts
let requestHandler: RequestHandler;

const server = http.createServer((req, res) => {
    return requestHandler(req, res);
});

return new Promise<NextServer>((resolve, reject) => {
    server.on('listening', () => {
        const addr = server.address();
        const hostname = !opts.hostname || opts.hostname === '0.0.0.0' ? 'localhost' : opts.hostname;

        const app = next({
            ...opts,
            hostname,
            customServer: false,
            httpServer: server,
            port: addr && typeof addr === 'object' ? addr.port : port
        });

        requestHandler = app.getRequestHandler();
        upgradeHandler = app.getUpgradeHandler();
        resolve(app);
    });

    server.listen(port, opts.hostname);
});
```

可以看到此处就是调用 `node` 中的 `http` 模块创建 `server`，然而 `handler` 是从 `next` 函数创建的 `app` 中通过 `getRequestHandler` 获取的。在其中经过无数次跳转最终来到 `server/next.ts` 中的 `createServer` 方法：

```ts
export class NextServer {
    private async createServer(options: DevServerOptions): Promise<Server> {
        if (options.dev) {
            const DevServer = require('./dev/next-dev-server').default;
            return new DevServer(options);
        }
        const ServerImplementation = await getServerImpl();
        return new ServerImplementation(options);
    }
}
```

此处会根据 `dev` 参数出现分支，也就是 `next dev` 会调用 `server/dev/next-dev-server` 中的 `DevServer`，而 `next start` 则会调用 `getServerImpl` 其中调的是 `server/next-server` 中的 `NextNodeServer`，而 `DevServer` 继承自 `NextNodeServer`，上面用到的 `NextNodeServer` 的 `getRequestHandler` 又继承自 `server/base-server` 中的 `Server`。

差不多算是找到正主了，好了，此文终结。🤦‍♂️ 还好代码还算清晰，虽然路径长了些，找起来还算方便。

## getRequestHandler

代码篇幅过长，因为本文目的是找到 `API` 路由相关的代码，其余包含的很多 `i18n`、`cookie`、`url parse` 之类的代码直接跳过。进过无数次调用，`getRequestHandler` 最终会调用 `this.run`：

```ts
export default abstract class Server<ServerOptions extends Options = Options> {
    protected async run(req: BaseNextRequest, res: BaseNextResponse, parsedUrl: UrlWithParsedQuery): Promise<void> {
        this.handleCompression(req, res);

        try {
            const matched = await this.router.execute(req, res, parsedUrl);
            if (matched) {
                return;
            }
        } catch (err) {
            if (err instanceof DecodeError || err instanceof NormalizeError) {
                res.statusCode = 400;
                return this.renderError(null, req, res, '/_error', {});
            }
            throw err;
        }

        await this.render404(req, res, parsedUrl);
    }
}
```

可以看出此处会调用 `this.router.execute` 来进行路由匹配，不匹配会进入 `render404`，报错会 `renderError`。`this.router` 是在 `constructor` 中通过 `new Router(this.generateRoutes())` 来生成，而 `generateRoutes` 的实现则是在 `NextServer` 中，其中大部分都是处理 `pages` 相关的请求，此处不做讨论，找到 `API` 相关的代码：

```ts
if (pathname === '/api' || pathname.startsWith('/api/')) {
    delete query._nextBubbleNoFallback;

    const handled = await this.handleApiRequest(req, res, pathname, query);
    if (handled) {
        return { finished: true };
    }
}
```

此处调用 `this.handleApiRequest` 来处理发送到 /`api/` 下的 `API` 请求，`DevServer` 也复写了 `generateRoutes` 方法，不过其中只是变动了 `fsServer`：

```ts
export default class DevServer extends Server {
    generateRoutes() {
        const { fsRoutes, ...otherRoutes } = super.generateRoutes();
    }
}
```

所以最终 `API` 的处理都集中在 `handleApiRequest` 中：

```ts
export default class NextNodeServer extends BaseServer {
    protected async handleApiRequest(
        req: BaseNextRequest,
        res: BaseNextResponse,
        pathname: string,
        query: ParsedUrlQuery
    ): Promise<boolean> {
        let page = pathname;
        let params: Params | undefined = undefined;
        let pageFound = !isDynamicRoute(page) && (await this.hasPage(page));

        if (!pageFound && this.dynamicRoutes) {
            for (const dynamicRoute of this.dynamicRoutes) {
                params = dynamicRoute.match(pathname) || undefined;
                if (dynamicRoute.page.startsWith('/api') && params) {
                    page = dynamicRoute.page;
                    pageFound = true;
                    break;
                }
            }
        }

        if (!pageFound) {
            return false;
        }
        // Make sure the page is built before getting the path
        // or else it won't be in the manifest yet
        await this.ensureApiPage(page);

        let builtPagePath;
        try {
            builtPagePath = this.getPagePath(page);
        } catch (err) {
            if (isError(err) && err.code === 'ENOENT') {
                return false;
            }
            throw err;
        }

        return this.runApi(req, res, query, params, page, builtPagePath);
    }
}
```

其中上方做路由匹配，校验路由是否存在，然后调用 `runApi`。

```ts
export default class NextNodeServer extends BaseServer {
    protected async runApi(
        req: BaseNextRequest | NodeNextRequest,
        res: BaseNextResponse | NodeNextResponse,
        query: ParsedUrlQuery,
        params: Params | undefined,
        page: string,
        builtPagePath: string
    ): Promise<boolean> {
        const edgeFunctions = this.getEdgeFunctions();

        for (const item of edgeFunctions) {
            if (item.page === page) {
                const handledAsEdgeFunction = await this.runEdgeFunction({
                    req,
                    res,
                    query,
                    params,
                    page,
                    appPaths: null
                });

                if (handledAsEdgeFunction) {
                    return true;
                }
            }
        }

        const pageModule = await require(builtPagePath);
        query = { ...query, ...params };

        delete query.__nextLocale;
        delete query.__nextDefaultLocale;

        if (!this.renderOpts.dev && this._isLikeServerless) {
            if (typeof pageModule.default === 'function') {
                prepareServerlessUrl(req, query);
                await pageModule.default(req, res);
                return true;
            }
        }

        await apiResolver(
            (req as NodeNextRequest).originalRequest,
            (res as NodeNextResponse).originalResponse,
            query,
            pageModule,
            {
                ...this.renderOpts.previewProps,
                revalidate: (newReq: IncomingMessage, newRes: ServerResponse) =>
                    this.getRequestHandler()(new NodeNextRequest(newReq), new NodeNextResponse(newRes)),
                // internal config so is not typed
                trustHostHeader: (this.nextConfig.experimental as any).trustHostHeader
            },
            this.minimalMode,
            this.renderOpts.dev,
            page
        );
        return true;
    }
}
```

上方 `edgeFunctions` 可以看出是用来做边缘计算的，由于目前暂时对边缘计算相关内容了解不多，这里不做深入，继续向下看。下面会直接将对应的 `API` 路由文件通过 `require` 引用，中间一段是处理 `serverless`，会直接调用路由模块的默认方法来处理 `req`、`res`。`serverless` 支持通过配置中的 `target` 进行配置。

```ts
export async function apiResolver(
    req: IncomingMessage,
    res: ServerResponse,
    query: any,
    resolverModule: any,
    apiContext: ApiContext,
    propagateError: boolean,
    dev?: boolean,
    page?: string
): Promise<void> {
    const apiReq = req as NextApiRequest;
    const apiRes = res as NextApiResponse;

    if (!resolverModule) {
        res.statusCode = 404;
        res.end('Not Found');
        return;
    }
    const config: PageConfig = resolverModule.config || {};
    const bodyParser = config.api?.bodyParser !== false;
    const responseLimit = config.api?.responseLimit ?? true;
    const externalResolver = config.api?.externalResolver || false;
}
```

在 `apiResolver` 中首先检查代码模块检查，然后获取模块中的 `config`，及其中具体的 `bodyParser` 参数等。

```ts
// Parsing of cookies
setLazyProp({ req: apiReq }, 'cookies', getCookieParser(req.headers));
// Parsing query string
apiReq.query = query;
// Parsing preview data
setLazyProp({ req: apiReq }, 'previewData', () => tryGetPreviewData(req, res, apiContext));
// Checking if preview mode is enabled
setLazyProp({ req: apiReq }, 'preview', () => (apiReq.previewData !== false ? true : undefined));

// Parsing of body
if (bodyParser && !apiReq.body) {
    apiReq.body = await parseBody(
        apiReq,
        config.api && config.api.bodyParser && config.api.bodyParser.sizeLimit ? config.api.bodyParser.sizeLimit : '1mb'
    );
}
```

然后是进行 `cookie`、`query`、`previewData`、`preview`、`bodyParser`、`body` 等获取和处理。此处还设置了 `previewData` 和 `preview`，这两个属性在页面中有使用，但是在 `API` 路由中的用途在官网没有介绍，我暂时也没遇到使用场景，也不多说了。代码中还用到一段 `setLazyProp`：

```ts
export function setLazyProp<T>({ req }: LazyProps, prop: string, getter: () => T): void {
    const opts = { configurable: true, enumerable: true };
    const optsReset = { ...opts, writable: true };

    Object.defineProperty(req, prop, {
        ...opts,
        get: () => {
            const value = getter();
            // we set the property on the object to avoid recalculating it
            Object.defineProperty(req, prop, { ...optsReset, value });
            return value;
        },
        set: value => {
            Object.defineProperty(req, prop, { ...optsReset, value });
        }
    });
}
```

用途是将传入的 `req`，上面挂载 `getter`、`setter`，这样在第一次获取上面的属性时，会走到 `get` 定义，此时才会执行传入的 `getter` 函数，并覆盖 `getter setter` 定义，这样就可以做到只有当我们去使用 `req` 上的对应属性时，才回去调用 `setter`，并且覆盖后不会再重复调用 `setter`，算是一个常见的懒加载性能优化。

然后下面的大部分代码都是扩展 `res` 和 `req` 上的属性，如 `status`、`send`、`json` 等，后面还用到了 `interopDefault` 来获取路由模块中的处理函数：

```ts
export function interopDefault(mod: any) {
    return mod.default || mod;
}
```

所以 `API` 路由模块文件中的默认处理函数可以使用 `esm` 的 `export default` 也可以使用 `cjs` 中的 `module.exports`。

## 总结

从源码解析我们可以看到文档中没有描绘出来的一些点：

-   `next.js` 中的 `/api` 下的请求和 `ssr`、`ssg` 是同一个 `server` 处理，只是 `ssr`、`ssg` 的处理由 `next.js` 内部处理，而 `api` 请求会转交给 `API` 路由文件中的默认函数来处理。
-   `API` 路由文件可以使用 `esm` 模式导出处理函数，也可以使用 `cjs` 导出。
-   `API` 路由下也可以访问到 `previewData` 和 `preview`，虽然暂不清楚用途是什么。
-   `cookies`、`previewData` 和 `preview` 结尾 `lazyProp`，只有在访问该属性时才会去挂载。