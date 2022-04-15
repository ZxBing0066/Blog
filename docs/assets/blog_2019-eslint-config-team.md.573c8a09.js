import"./app.d36d7bad.js";const s='{"title":"\u5982\u4F55\u65B9\u4FBF\u7684\u4E3A\u56E2\u961F\u6240\u6709\u9879\u76EE\u7EDF\u4E00 ESLint \u914D\u7F6E","description":"","frontmatter":{"tags":["eslint","team"],"date":"2019-11-18T00:00:00.000Z"},"headers":[{"level":2,"title":"\u524D\u8A00","slug":"\u524D\u8A00"},{"level":2,"title":"\u7EDF\u4E00\u914D\u7F6E\u5904\u7406","slug":"\u7EDF\u4E00\u914D\u7F6E\u5904\u7406"},{"level":3,"title":"ESLint extends","slug":"eslint-extends"},{"level":3,"title":"Package eslintConfig","slug":"package-eslintconfig"},{"level":3,"title":"\u4F9D\u8D56\u5305","slug":"\u4F9D\u8D56\u5305"},{"level":3,"title":"\u53C2\u8003","slug":"\u53C2\u8003"},{"level":2,"title":"\u4FDD\u8BC1\u914D\u7F6E\u4E0D\u88AB\u7BE1\u6539","slug":"\u4FDD\u8BC1\u914D\u7F6E\u4E0D\u88AB\u7BE1\u6539"},{"level":3,"title":"CLI","slug":"cli"},{"level":3,"title":"commit hook","slug":"commit-hook"},{"level":3,"title":"CI/CD","slug":"ci-cd"},{"level":3,"title":"\u53D1\u5E03\u7CFB\u7EDF\u53D1\u5E03\u65F6\u505A\u6821\u9A8C","slug":"\u53D1\u5E03\u7CFB\u7EDF\u53D1\u5E03\u65F6\u505A\u6821\u9A8C"},{"level":2,"title":"\u540E\u7EED\u5347\u7EA7","slug":"\u540E\u7EED\u5347\u7EA7"},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3"}],"relativePath":"blog/2019-eslint-config-team.md","createTime":1650038339000,"lastUpdated":1650038339000}';var a=()=>`<h1 id="\u5982\u4F55\u65B9\u4FBF\u7684\u4E3A\u56E2\u961F\u6240\u6709\u9879\u76EE\u7EDF\u4E00-eslint-\u914D\u7F6E" tabindex="-1">\u5982\u4F55\u65B9\u4FBF\u7684\u4E3A\u56E2\u961F\u6240\u6709\u9879\u76EE\u7EDF\u4E00 ESLint \u914D\u7F6E <a class="header-anchor" href="#\u5982\u4F55\u65B9\u4FBF\u7684\u4E3A\u56E2\u961F\u6240\u6709\u9879\u76EE\u7EDF\u4E00-eslint-\u914D\u7F6E" aria-hidden="true">#</a></h1>
<h2 id="\u524D\u8A00" tabindex="-1">\u524D\u8A00 <a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a></h2>
<p>\u8FD1\u671F\u7ED9\u56E2\u961F\u9879\u76EE CLI \u505A\u91CD\u6784\uFF0C\u5176\u4E2D\u6D89\u53CA\u5230 ESLint \u7684\u90E8\u5206\uFF0C\u8FD9\u90E8\u5206\u4E4B\u524D\u7684\u65B9\u5F0F\u662F\u901A\u8FC7\u5F00\u53D1\u548C\u7F16\u8BD1\u65F6\u8C03\u7528 ESLint \u7684 CLI \u53BB\u68C0\u67E5\u9879\u76EE\u4EE3\u7801\uFF0C\u867D\u7136\u4E0D\u4F1A\u51FA\u4EC0\u4E48\u95EE\u9898\uFF0C\u4F46\u662F\u5404\u79CD IDE \u7684\u63D0\u793A\u5C31\u5E9F\u6389\u4E86\uFF0C\u6240\u4EE5\u6253\u7B97\u6362\u4E00\u79CD\u6BD4\u8F83\u901A\u7528\u7684\u65B9\u5F0F\u3002</p>
<h2 id="\u7EDF\u4E00\u914D\u7F6E\u5904\u7406" tabindex="-1">\u7EDF\u4E00\u914D\u7F6E\u5904\u7406 <a class="header-anchor" href="#\u7EDF\u4E00\u914D\u7F6E\u5904\u7406" aria-hidden="true">#</a></h2>
<p>\u4E3A\u4E86\u7EDF\u4E00\u914D\u7F6E\uFF0C\u914D\u7F6E\u81EA\u7136\u662F\u4E0D\u80FD\u76F4\u63A5\u66B4\u9732\u7ED9\u5F00\u53D1\u8005\u7684\uFF0C\u4E0D\u7136\u5F88\u5BB9\u6613\u88AB\u5404\u79CD\u9B54\u6539\u5C31\u5E9F\u4E86\uFF0C\u6240\u4EE5\u9700\u8981\u5C06\u914D\u7F6E\u5305\u88C5\u8D77\u6765\u3002</p>
<h3 id="eslint-extends" tabindex="-1">ESLint extends <a class="header-anchor" href="#eslint-extends" aria-hidden="true">#</a></h3>
<p>ESlint \u4E2D\u652F\u6301 extends \u5C5E\u6027\uFF0C\u7528\u4E8E\u5728\u73B0\u6709\u914D\u7F6E\u4E2D\u6269\u5C55\u4E0A\u4E00\u4E9B\u5176\u5B83\u7684\u901A\u7528\u7684\u914D\u7F6E\u3002\u4E3B\u8981\u652F\u6301\u4EE5\u4E0B\u51E0\u79CD\u4F20\u503C\uFF1A</p>
<ul>
<li>\u9884\u7F6E\u7684\u901A\u7528\u914D\u7F6E\uFF1Aeslint:recommended\u3001eslint:all
<blockquote>
<p>\u5B9E\u9645\u914D\u7F6E\u6587\u4EF6\u5728 eslint/conf \u4E2D\u53EF\u4EE5\u627E\u5230</p>
</blockquote>
</li>
<li>\u914D\u7F6E\u6587\u4EF6\u5730\u5740\uFF1A./path/to/shared/.eslintrc</li>
<li>\u63D2\u4EF6\u4E2D\u63D0\u4F9B\u7684\u914D\u7F6E\uFF1Aplugin:react/recommended
<blockquote>
<p>\u53EF\u4EE5\u5728 eslint-plugin-react/index.js \u4E2D\u770B\u5230\u7684\u914D\u7F6E\u8BE6\u60C5\uFF0Ceslint-plugin- \u7684\u524D\u7F00\u53EF\u7701\u7565\uFF0C/recommended \u4E3A\u5305\u4E2D\u629B\u51FA\u7684 configs \u7684 recommended \u5C5E\u6027</p>
</blockquote>
</li>
<li>\u914D\u7F6E\u6A21\u5757\u5305\uFF1Areact-app
<blockquote>
<p>\u5B9E\u9645\u914D\u7F6E\u5728 eslint-config-react-app \u4E2D\u53EF\u4EE5\u627E\u5230\uFF0Ceslint-config- \u7684\u524D\u7F00\u4E3A\u53EF\u7701\u7565</p>
</blockquote>
</li>
</ul>
<p>\u901A\u8FC7 extends\uFF0C\u53EF\u4EE5\u65B9\u4FBF\u7684\u5C06\u7EDF\u4E00\u7684\u914D\u7F6E\u6587\u4EF6\u653E\u7F6E\u5728\u81EA\u5B9A\u4E49\u914D\u7F6E\u5305\u4E2D\u3002\u5047\u8BBE\u6211\u4EEC\u73B0\u5728\u5B9A\u4E49\u4E00\u4E2A\u901A\u7528\u7684\u6A21\u5757\u5305\u540D\uFF1A@ucloud/eslint-config-console</p>
<h3 id="package-eslintconfig" tabindex="-1">Package eslintConfig <a class="header-anchor" href="#package-eslintconfig" aria-hidden="true">#</a></h3>
<p>ESlint \u914D\u7F6E\u9664\u4E86\u53EF\u4EE5\u4F7F\u7528\u914D\u7F6E\u6587\u4EF6\uFF0C\u4E5F\u53EF\u4EE5\u5728 package.json \u4E2D\u914D\u7F6E eslintConfig \u5B57\u6BB5\uFF0C\u8F83\u914D\u7F6E\u6587\u4EF6\u7A0D\u5FAE\u7B80\u6D01\u4E00\u70B9\u3002\u76F4\u63A5\u5982\u4E0B\u4F7F\u7528\u4E0A\u8FF0\u6A21\u5757\u5305\uFF1A</p>
<div class="language-json"><pre><code><span class="token comment">// package.json</span>
<span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-package"</span><span class="token punctuation">,</span>
    <span class="token property">"eslintConfig"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"extends"</span><span class="token operator">:</span> <span class="token string">"@ucloud/console"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
</div><h3 id="\u4F9D\u8D56\u5305" tabindex="-1">\u4F9D\u8D56\u5305 <a class="header-anchor" href="#\u4F9D\u8D56\u5305" aria-hidden="true">#</a></h3>
<p>\u53EF\u4EE5\u5C06 ESLint \u4EE5\u53CA\u76F8\u5173\u7684\u63D2\u4EF6\u3001\u4F9D\u8D56\u5305\u7B49\u5B89\u88C5\u5230 config \u5305\u4E2D\uFF0C\u4FDD\u8BC1\u5305\u7684\u7EDF\u4E00\u6027\u3002</p>
<h3 id="\u53C2\u8003" tabindex="-1">\u53C2\u8003 <a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a></h3>
<p>\u6700\u7EC8 @ucloud/eslint-config-console \u5982\u4E0B</p>
<p>package.json</p>
<div class="language-json"><pre><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"@ucloud/eslint-config-console"</span><span class="token punctuation">,</span>
    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"0.0.3"</span><span class="token punctuation">,</span>
    <span class="token property">"description"</span><span class="token operator">:</span> <span class="token string">"eslint config for console develop"</span><span class="token punctuation">,</span>
    <span class="token property">"main"</span><span class="token operator">:</span> <span class="token string">"index.js"</span><span class="token punctuation">,</span>
    <span class="token property">"author"</span><span class="token operator">:</span> <span class="token string">"zxbing0066@gmail.com"</span><span class="token punctuation">,</span>
    <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"@typescript-eslint/eslint-plugin"</span><span class="token operator">:</span> <span class="token string">"^2.6.1"</span><span class="token punctuation">,</span>
        <span class="token property">"@typescript-eslint/parser"</span><span class="token operator">:</span> <span class="token string">"^2.6.1"</span><span class="token punctuation">,</span>
        <span class="token property">"babel-eslint"</span><span class="token operator">:</span> <span class="token string">"^10.0.3"</span><span class="token punctuation">,</span>
        <span class="token property">"eslint"</span><span class="token operator">:</span> <span class="token string">"^6.6.0"</span><span class="token punctuation">,</span>
        <span class="token property">"eslint-plugin-flowtype"</span><span class="token operator">:</span> <span class="token string">"^4.3.0"</span><span class="token punctuation">,</span>
        <span class="token property">"eslint-plugin-import"</span><span class="token operator">:</span> <span class="token string">"^2.18.2"</span><span class="token punctuation">,</span>
        <span class="token property">"eslint-plugin-jsx-a11y"</span><span class="token operator">:</span> <span class="token string">"^6.2.3"</span><span class="token punctuation">,</span>
        <span class="token property">"eslint-plugin-react"</span><span class="token operator">:</span> <span class="token string">"^7.16.0"</span><span class="token punctuation">,</span>
        <span class="token property">"eslint-plugin-react-hooks"</span><span class="token operator">:</span> <span class="token string">"^2.2.0"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
</div><p>indexjs</p>
<div class="language-javascript"><pre><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">'babel-eslint'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'import'</span><span class="token punctuation">,</span> <span class="token string">'flowtype'</span><span class="token punctuation">,</span> <span class="token string">'jsx-a11y'</span><span class="token punctuation">,</span> <span class="token string">'react'</span><span class="token punctuation">,</span> <span class="token string">'react-hooks'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">commonjs</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">es6</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">jest</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">node</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token number">2018</span><span class="token punctuation">,</span>
        <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">'module'</span><span class="token punctuation">,</span>
        <span class="token literal-property property">ecmaFeatures</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">jsx</span><span class="token operator">:</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'eslint:recommended'</span><span class="token punctuation">,</span> <span class="token string">'plugin:react/recommended'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">overrides</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">files</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'**/*.ts?(x)'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">'@typescript-eslint/parser'</span><span class="token punctuation">,</span>
            <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token literal-property property">ecmaVersion</span><span class="token operator">:</span> <span class="token number">2018</span><span class="token punctuation">,</span>
                <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">'module'</span><span class="token punctuation">,</span>
                <span class="token literal-property property">ecmaFeatures</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">jsx</span><span class="token operator">:</span> <span class="token boolean">true</span>
                <span class="token punctuation">}</span><span class="token punctuation">,</span>
                <span class="token literal-property property">warnOnUnsupportedTypeScriptVersion</span><span class="token operator">:</span> <span class="token boolean">true</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'@typescript-eslint'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'eslint:recommended'</span><span class="token punctuation">,</span> <span class="token string">'plugin:react/recommended'</span><span class="token punctuation">,</span> <span class="token string">'plugin:@typescript-eslint/recommended'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token literal-property property">settings</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">react</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">version</span><span class="token operator">:</span> <span class="token string">'detect'</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u9879\u76EE\u4E2D\u4F7F\u7528</p>
<div class="language-json"><pre><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"my-project"</span><span class="token punctuation">,</span>
    <span class="token property">"eslintConfig"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"extends"</span><span class="token operator">:</span> <span class="token string">"@ucloud/console"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre>
</div><h2 id="\u4FDD\u8BC1\u914D\u7F6E\u4E0D\u88AB\u7BE1\u6539" tabindex="-1">\u4FDD\u8BC1\u914D\u7F6E\u4E0D\u88AB\u7BE1\u6539 <a class="header-anchor" href="#\u4FDD\u8BC1\u914D\u7F6E\u4E0D\u88AB\u7BE1\u6539" aria-hidden="true">#</a></h2>
<p>\u901A\u8FC7 extends \u53EF\u4EE5\u65B9\u4FBF\u7EDF\u4E00\u914D\u7F6E\uFF0C\u4F46\u662F\u914D\u7F6E\u5728\u5404\u9879\u76EE\u4E2D\u4F9D\u65E7\u5BB9\u6613\u88AB\u7BE1\u6539\uFF0C\u8FD9\u4E2A\u65F6\u5019\u9700\u8981\u505A\u4E00\u4E9B\u9632\u8303\u63AA\u65BD\u3002</p>
<h3 id="cli" tabindex="-1">CLI <a class="header-anchor" href="#cli" aria-hidden="true">#</a></h3>
<p>\u5982\u679C\u6709\u7EDF\u4E00\u7684\u5F00\u53D1\u7528 CLI\uFF0C\u53EF\u4EE5\u5728 CLI \u4E2D\u505A\u597D\u6821\u9A8C\u3002</p>
<h3 id="commit-hook" tabindex="-1">commit hook <a class="header-anchor" href="#commit-hook" aria-hidden="true">#</a></h3>
<p>\u901A\u8FC7 commit hook \u5728\u9879\u76EE commit \u65F6\u6821\u9A8C\u9879\u76EE\u7684 eslint \u914D\u7F6E\u662F\u5426\u88AB\u7BE1\u6539\uFF0C\u4E0D\u8FC7\u4F9D\u7136\u53EF\u4EE5\u7ED5\u8FC7\u3002</p>
<h3 id="ci-cd" tabindex="-1">CI/CD <a class="header-anchor" href="#ci-cd" aria-hidden="true">#</a></h3>
<p>\u53EF\u5728 CI/CD \u9636\u6BB5\u505A\u6821\u9A8C\uFF0C\u914D\u7F6E\u7BE1\u6539\u540E\u76F4\u63A5\u62A5\u9519\u3002</p>
<h3 id="\u53D1\u5E03\u7CFB\u7EDF\u53D1\u5E03\u65F6\u505A\u6821\u9A8C" tabindex="-1">\u53D1\u5E03\u7CFB\u7EDF\u53D1\u5E03\u65F6\u505A\u6821\u9A8C <a class="header-anchor" href="#\u53D1\u5E03\u7CFB\u7EDF\u53D1\u5E03\u65F6\u505A\u6821\u9A8C" aria-hidden="true">#</a></h3>
<p>\u5728\u6700\u7EC8\u53D1\u5E03\u65F6\u505A\u597D\u6821\u9A8C\u3002</p>
<h2 id="\u540E\u7EED\u5347\u7EA7" tabindex="-1">\u540E\u7EED\u5347\u7EA7 <a class="header-anchor" href="#\u540E\u7EED\u5347\u7EA7" aria-hidden="true">#</a></h2>
<p>\u524D\u7AEF\u6280\u672F\u53D1\u5C55\u8FC5\u731B\uFF0C\u4E5F\u9700\u8981\u8003\u8651\u5230\u540E\u7EED\u5347\u7EA7\u7684\u95EE\u9898\u3002</p>
<ul>
<li>\u5C3D\u91CF\u4FDD\u6301\u914D\u7F6E\u4E00\u81F4\u6027</li>
<li>\u53EF\u5207\u5272\u7248\u672C\uFF0C\u8001\u9879\u76EE\u4E0D\u505A\u5347\u7EA7\uFF0C\u65B0\u9879\u76EE\u76F4\u63A5\u4F7F\u7528\u65B0\u7248</li>
<li>\u901A\u8FC7 AST\uFF0C\u5C06\u89C4\u5219\u5DEE\u5F02\u5904\u505A\u8F6C\u6362</li>
</ul>
<h2 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3 <a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a></h2>
<p>\u901A\u8FC7 ESLint extends \u53EF\u4EE5\u5F88\u597D\u7684\u7EDF\u4E00\u56E2\u961F\u7684\u914D\u7F6E\uFF0C\u5E76\u4E14\u4E0D\u4F1A\u5F71\u54CD IDE \u7684 lint \u63D0\u793A\u3002</p>
<p>\u501F\u52A9 CI/CD \u7B49\u5DE5\u5177\u505A\u597D\u68C0\u9A8C\u5DE5\u4F5C\uFF0C\u53EF\u4EE5\u6709\u6548\u9632\u6B62\u7EDF\u4E00\u914D\u7F6E\u88AB\u7BE1\u6539\u3002</p>
`;export{s as __pageData,a as default};
