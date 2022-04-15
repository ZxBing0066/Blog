import"./app.d36d7bad.js";const s='{"title":"\u524D\u7AEF\u6A21\u5757\u7B80\u53F2 - CJS & *MD & ES Modules & SystemJS & Webpack","description":"","frontmatter":{"tags":["javascript","module"],"date":"2020-06-18T00:00:00.000Z"},"headers":[{"level":2,"title":"\u6587\u4EF6\u6A21\u5757","slug":"\u6587\u4EF6\u6A21\u5757"},{"level":3,"title":"\u5168\u5C40\u53D8\u91CF","slug":"\u5168\u5C40\u53D8\u91CF"},{"level":3,"title":"\u547D\u540D\u7A7A\u95F4","slug":"\u547D\u540D\u7A7A\u95F4"},{"level":3,"title":"IIFE \u5305\u88F9","slug":"iife-\u5305\u88F9"},{"level":2,"title":"\u6A21\u5757\u7CFB\u7EDF","slug":"\u6A21\u5757\u7CFB\u7EDF"},{"level":3,"title":"CommonJS\uFF08\u4EE5\u4E0B\u79F0 CJS\uFF09","slug":"commonjs\uFF08\u4EE5\u4E0B\u79F0-cjs\uFF09"},{"level":3,"title":"AMD","slug":"amd"},{"level":3,"title":"CMD","slug":"cmd"},{"level":3,"title":"UMD","slug":"umd"},{"level":3,"title":"ES Modules","slug":"es-modules"},{"level":3,"title":"SystemJS","slug":"systemjs"},{"level":2,"title":"\u6A21\u5757\u6253\u5305","slug":"\u6A21\u5757\u6253\u5305"},{"level":3,"title":"webpack","slug":"webpack"},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3"},{"level":2,"title":"\u6700\u540E","slug":"\u6700\u540E"}],"relativePath":"blog/2020-modules.md","createTime":1650038339000,"lastUpdated":1650038339000}';var a=()=>`<h1 id="\u524D\u7AEF\u6A21\u5757\u7B80\u53F2-cjs-md-es-modules-systemjs-webpack" tabindex="-1">\u524D\u7AEF\u6A21\u5757\u7B80\u53F2 - CJS &amp; *MD &amp; ES Modules &amp; SystemJS &amp; Webpack <a class="header-anchor" href="#\u524D\u7AEF\u6A21\u5757\u7B80\u53F2-cjs-md-es-modules-systemjs-webpack" aria-hidden="true">#</a></h1>
<blockquote>
<p>\u6700\u8FD1\u8FD9\u4E9B\u5E74\u524D\u7AEF\u53D1\u5C55\u901F\u5EA6\u8FC5\u731B\uFF0C\u800C\u524D\u7AEF\u7684\u6A21\u5757\u5316\u65B9\u6848\u4E5F\u5728\u4E0D\u65AD\u7684\u66F4\u65B0\uFF0C\u8FD9\u91CC\u8BB0\u5F55\u6574\u7406\u4E0B\u5DE5\u4F5C 8 \u5E74\u6240\u4E86\u89E3\u7684\u4E00\u4E9B\u5173\u4E8E\u524D\u7AEF\u6A21\u5757\u5316\u7684\u77E5\u8BC6\uFF0C\u987A\u4FBF \u201C\u8003\u4E0B\u53E4\u201D \uFF0C\u7531\u4E8E\u6D89\u53CA\u7684\u5185\u5BB9\u8F83\u591A\u4E0D\u662F\u6BCF\u4E2A\u90FD\u5F88\u4E86\u89E3\uFF0C\u53EA\u80FD\u5C3D\u91CF\u4FDD\u8BC1\u8F93\u51FA\u5185\u5BB9\u7684\u51C6\u786E\u6027\u3002</p>
</blockquote>
<p>\u914D\u5408 demo <a href="https://github.com/ZxBing0066/fe-module-examples" target="_blank" rel="noopener noreferrer"> FE-module-examples</a> \u98DF\u7528\u66F4\u4F73</p>
<h2 id="\u6587\u4EF6\u6A21\u5757" tabindex="-1">\u6587\u4EF6\u6A21\u5757 <a class="header-anchor" href="#\u6587\u4EF6\u6A21\u5757" aria-hidden="true">#</a></h2>
<p>\u5728\u6CA1\u6709\u524D\u7AEF\u6A21\u5757\u5316\u89C4\u8303\u524D\uFF0C\u6211\u4EEC\u901A\u8FC7\u62BD\u79BB\u516C\u5171\u903B\u8F91\u653E\u5230\u516C\u5171\u4EE3\u7801\u4E2D\uFF0C\u800C\u540E\u5728\u4E0D\u540C\u7684\u9875\u9762\u4E2D\u76F4\u63A5\u5F15\u7528\u60F3\u8981\u7684\u6587\u4EF6\u6765\u5B9E\u73B0\u4EE3\u7801\u6A21\u5757\u5316\u548C\u6A21\u5757\u5171\u4EAB\u3002</p>
<p>page1.html</p>
<div class="language-html"><pre><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Demo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://code.jquery.com/jquery-1.1.1.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/header.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/footer.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/menu.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/page1.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre>
</div><p>page2.html</p>
<div class="language-html"><pre><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Demo<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://code.jquery.com/jquery-1.1.1.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/header.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/footer.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/menu.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/page2.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre>
</div><p>\u6A21\u5757\u7684\u5B9A\u4E49\u65B9\u5F0F\u4E5F\u5728\u4E0D\u65AD\u7684\u8FDB\u5316</p>
<h3 id="\u5168\u5C40\u53D8\u91CF" tabindex="-1">\u5168\u5C40\u53D8\u91CF <a class="header-anchor" href="#\u5168\u5C40\u53D8\u91CF" aria-hidden="true">#</a></h3>
<p>\u65E9\u671F\u7684\u4F1A\u5C06\u53D8\u91CF\u90FD\u66B4\u9732\u5728\u5168\u5C40\uFF0C\u8FD9\u6837\u65B9\u4FBF\u8C03\u7528\u4F46\u662F\u5374\u4F1A\u4E25\u91CD\u6C61\u67D3\u5168\u5C40\u53D8\u91CF\u3002</p>
<p>header.js</p>
<div class="language-js"><pre><code>window<span class="token punctuation">.</span><span class="token function-variable function">login</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
window<span class="token punctuation">.</span><span class="token function-variable function">logout</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre>
</div><p>main.js</p>
<div class="language-js"><pre><code>window<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><h3 id="\u547D\u540D\u7A7A\u95F4" tabindex="-1">\u547D\u540D\u7A7A\u95F4 <a class="header-anchor" href="#\u547D\u540D\u7A7A\u95F4" aria-hidden="true">#</a></h3>
<p>\u800C\u540E\u51FA\u73B0\u4E86\u4F7F\u7528\u547D\u540D\u7A7A\u95F4\u6765\u51CF\u5C11\u5BF9\u5168\u5C40\u4F5C\u7528\u57DF\u7684\u5F71\u54CD\uFF0C\u4F46\u662F\u7531\u4E8E\u4EE3\u7801\u90FD\u5728\u5168\u5C40\u4F5C\u7528\u57DF\u6267\u884C\u5F88\u5BB9\u6613\u9020\u6210\u610F\u5916\u7684\u6C61\u67D3\u3002</p>
<p>header.js</p>
<div class="language-js"><pre><code><span class="token keyword">var</span> header <span class="token operator">=</span> window<span class="token punctuation">.</span>header <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
header<span class="token punctuation">.</span><span class="token function-variable function">login</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
header<span class="token punctuation">.</span><span class="token function-variable function">logout</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre>
</div><p>main.js</p>
<div class="language-js"><pre><code>window<span class="token punctuation">.</span>header<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><h3 id="iife-\u5305\u88F9" tabindex="-1">IIFE \u5305\u88F9 <a class="header-anchor" href="#iife-\u5305\u88F9" aria-hidden="true">#</a></h3>
<p>\u7136\u540E\u5927\u5BB6\u5F00\u59CB\u4F7F\u7528 IIFE\uFF08\u81EA\u6267\u884C/\u7ACB\u5373\u6267\u884C\u51FD\u6570\uFF09\u901A\u8FC7\u51FD\u6570\u4F5C\u7528\u57DF\u5305\u88F9\u4EE3\u7801\uFF0C\u8FDB\u4E00\u6B65\u51CF\u5C11\u5BF9\u5168\u5C40\u4F5C\u7528\u57DF\u7684\u6C61\u67D3\u3002</p>
<p>header.js</p>
<div class="language-js"><pre><code>window<span class="token punctuation">.</span>header <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">login</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token function-variable function">logout</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>main.js</p>
<div class="language-js"><pre><code>window<span class="token punctuation">.</span>header<span class="token punctuation">.</span><span class="token function">login</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><h2 id="\u6A21\u5757\u7CFB\u7EDF" tabindex="-1">\u6A21\u5757\u7CFB\u7EDF <a class="header-anchor" href="#\u6A21\u5757\u7CFB\u7EDF" aria-hidden="true">#</a></h2>
<p>\u968F\u7740\u65F6\u95F4\u7684\u63A8\u79FB\uFF0C\u793E\u533A\u5F00\u59CB\u51FA\u73B0\u5404\u79CD\u6A21\u5757\u7CFB\u7EDF\u3002</p>
<h3 id="commonjs\uFF08\u4EE5\u4E0B\u79F0-cjs\uFF09" tabindex="-1">CommonJS\uFF08\u4EE5\u4E0B\u79F0 CJS\uFF09 <a class="header-anchor" href="#commonjs\uFF08\u4EE5\u4E0B\u79F0-cjs\uFF09" aria-hidden="true">#</a></h3>
<p>\u6700\u5148\u662F CJS\uFF0C\u65E9\u671F\u53EB ServerJS\uFF0C\u63A8\u51FA Modules/1.0 \u89C4\u8303\u540E\u5728 nodejs \u9010\u6E10\u53D1\u5C55\u4E3A\u5185\u7F6E\u6A21\u5757\u7CFB\u7EDF\u3002CJS \u901A\u8FC7 require \u548C module \u6765\u5BFC\u5165\u548C\u5BFC\u51FA\u6A21\u5757\u3002</p>
<p>a.js</p>
<div class="language-js"><pre><code>module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">log</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>log<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>demo.js</p>
<div class="language-js"><pre><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">a</span><span class="token punctuation">(</span><span class="token string">'test'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u5176\u5B9E\u73B0\u57FA\u4E8E IIFE\uFF0CCJS \u6A21\u5757\u5728 nodejs \u4E2D\u88AB\u51FD\u6570\u5305\u88F9</p>
<div class="language-js"><pre><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">exports<span class="token punctuation">,</span> require<span class="token punctuation">,</span> module<span class="token punctuation">,</span> __filename<span class="token punctuation">,</span> __dirname</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    module<span class="token punctuation">.</span><span class="token function-variable function">exports</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">log</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>log<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u4ECE\u800C\u5B9E\u73B0\u6A21\u5757\u7684\u9694\u79BB\u4E0E\u5B9A\u4E49\u3002</p>
<h3 id="amd" tabindex="-1">AMD <a class="header-anchor" href="#amd" aria-hidden="true">#</a></h3>
<p>\u800C\u7531\u4E8E CJS \u4E0D\u9002\u7528\u4E8E\u6D4F\u89C8\u5668\uFF0CAMD \u89C4\u8303\u7531\u4E8E\u5404\u79CD\u539F\u56E0\u4ECE CJS \u9635\u8425\u5206\u79BB\u51FA\u6765\uFF0C\u81EA\u6210\u4E00\u5BB6\uFF0C\u4EE3\u8868\u4F5C\u5C31\u662F require.js\u3002</p>
<p>a.js</p>
<div class="language-js"><pre><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token function-variable function">log</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">log</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>log<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>b.js</p>
<div class="language-js"><pre><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">loga</span><span class="token operator">:</span> a<span class="token punctuation">.</span>log<span class="token punctuation">,</span>
        <span class="token function-variable function">logb</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">log</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>log<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>main.js</p>
<div class="language-js"><pre><code><span class="token function">require</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    a<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    b<span class="token punctuation">.</span><span class="token function">logb</span><span class="token punctuation">(</span><span class="token string">'b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    b<span class="token punctuation">.</span><span class="token function">logb</span><span class="token punctuation">(</span><span class="token string">'b'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><div class="language-!"><pre><code>require.js \u867D\u7136\u88AB\u5E7F\u6CDB\u652F\u6301\uFF0C\u4F46\u662F\u6709\u4E9B\u5E93\u4E3A\u4E86\u517C\u5BB9\u67D0\u4E9B\u4F7F\u7528\u60C5\u51B5\uFF0C\u4F1A\u6CE8\u5165\u5230\u5168\u5C40\u53D8\u91CF\uFF0C\u5982 lodash\u3002
</code></pre>
</div><h3 id="cmd" tabindex="-1">CMD <a class="header-anchor" href="#cmd" aria-hidden="true">#</a></h3>
<p>\u7136\u800C AMD \u4E0E CJS \u5B58\u5728\u4E00\u4E9B\u5DEE\u5F02\u5BFC\u81F4\u4E00\u4E9B\u4EBA\u7684\u4E0D\u8BA4\u53EF\u3002</p>
<p>CJS</p>
<div class="language-js"><pre><code><span class="token comment">// \u53EA\u6709\u5F53 require \u6A21\u5757\u65F6\uFF0CCJS \u624D\u4F1A\u52A0\u8F7D\u6A21\u5757\uFF0C\u5E76\u6267\u884C</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">reuqire</span><span class="token punctuation">(</span><span class="token string">'js'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>AMD</p>
<div class="language-js"><pre><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">a</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5728\u8FD9\u91CC\u54EA\u6015\u6CA1\u6709\u7528\u5230 a \u6A21\u5757\uFF0Ca \u6A21\u5757\u7684\u4EE3\u7801\u4E5F\u5DF2\u7ECF\u4E0B\u8F7D\u5E76\u6267\u884C\u5B8C\u6210</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u7531\u4E8E\u6D4F\u89C8\u5668\u7684\u9650\u5236\uFF0C\u8981\u505A\u5230\u548C CJS \u4E00\u6837\u540C\u6B65\u4E0B\u8F7D\u5E76\u6267\u884C\u6CA1\u6709\u529E\u6CD5\uFF08\u5176\u5B9E\u6709\u529E\u6CD5\uFF0C\u4E0D\u8FC7\u4E0D\u592A\u597D\uFF09\u4E8E\u662F\u56FD\u5185\u5927\u725B\u7389\u4F2F\uFF0C\u5F00\u53D1\u4E86 sea.js \u5E76\u63A8\u5E7F\u4E86 CMD \u89C4\u8303\u3002 sea.js \u4E0E require.js \u6700\u5927\u7684\u4E0D\u540C\uFF0C\u5C31\u662F\u5173\u4E8E\u6A21\u5757\u7684\u6267\u884C\u65F6\u673A\u3002</p>
<p>CMD</p>
<div class="language-js"><pre><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">require</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8FD9\u91CC a \u6A21\u5757\u867D\u7136\u4E0B\u8F7D\u5B8C\u6210\uFF0C\u4F46\u662F\u5B83\u7684 factory \u5E76\u6CA1\u6709\u6267\u884C</span>
    <span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u5F53 a \u6A21\u5757\u88AB\u9996\u6B21 require \u65F6\uFF0C\u5B83\u7684 factory \u624D\u5F00\u59CB\u6267\u884C</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><div class="language-!"><pre><code>\u8FD9\u91CC\u5F88\u591A\u4EBA\u5BF9 CMD \u6709\u8BEF\u89E3\uFF0C\u4EE5\u4E3A CMD \u662F\u61D2\u52A0\u8F7D\uFF0C\u5176\u5B9E CMD \u4E0D\u662F\u61D2\u52A0\u8F7D\uFF0C\u800C\u662F\u61D2\u6267\u884C\u3002\u7531\u4E8E\u6D4F\u89C8\u5668\u7684\u9650\u5236\uFF0C\u5176\u5B9E\u8FD9\u79CD\u8BED\u6CD5\u662F\u65E0\u6CD5\u5B9E\u73B0\u61D2\u52A0\u8F7D\u7684\u3002
</code></pre>
</div><p>\u4E0D\u8FC7\u968F\u7740 require.js \u7684\u66F4\u65B0\uFF0C\u5728\u4E4B\u540E\u7684 require.js \u4E5F\u5B9E\u73B0\u4E86\u61D2\u6267\u884C\uFF0C\u5E76\u4E14\u5728\u652F\u6301\u4E86 CJS \u7684\u6A21\u5757\uFF08\u4F2A\u652F\u6301\uFF09\u3002</p>
<p>\u5177\u4F53\u7684\u5173\u4E8E AMD\u3001CMD \u6807\u51C6\u4E4B\u4E89\u7684\u5386\u53F2\u60F3\u8003\u53E4\u7684\u540C\u5B66\u53EF\u4EE5\u770B\u8FD9\u91CC\uFF1A <a href="https://github.com/seajs/seajs/issues/588" target="_blank" rel="noopener noreferrer">\u524D\u7AEF\u6A21\u5757\u5316\u5F00\u53D1\u90A3\u70B9\u5386\u53F2</a></p>
<h3 id="umd" tabindex="-1">UMD <a class="header-anchor" href="#umd" aria-hidden="true">#</a></h3>
<p>\u968F\u7740\u6A21\u5757\u6807\u51C6\u8D8A\u6765\u8D8A\u591A\uFF0C\u5BF9\u4E00\u4E9B\u7C7B\u5E93\u51FA\u73B0\u4E86\u56F0\u6270\uFF0C\u7C7B\u5E93\u4E3A\u4E86\u517C\u5BB9\u5404\u6A21\u5757\u7CFB\u7EDF\uFF0C\u53C8\u51FA\u73B0\u4E86 UMD \u89C4\u8303\uFF0C\u6807\u51C6\u7684 UMD \u4E3B\u8981\u517C\u5BB9\u4E86 CJS\u3001AMD \u4EE5\u53CA\u5168\u5C40\u53D8\u91CF\u4E09\u79CD\u6A21\u5757\u65B9\u5F0F\u3002</p>
<div class="language-js"><pre><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">global<span class="token punctuation">,</span> factory</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">typeof</span> exports <span class="token operator">===</span> <span class="token string">'object'</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">typeof</span> module <span class="token operator">!==</span> <span class="token string">'undefined'</span>
        <span class="token operator">?</span> <span class="token function">factory</span><span class="token punctuation">(</span>exports<span class="token punctuation">,</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'react'</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token keyword">typeof</span> define <span class="token operator">===</span> <span class="token string">'function'</span> <span class="token operator">&amp;&amp;</span> define<span class="token punctuation">.</span>amd
        <span class="token operator">?</span> <span class="token function">define</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'exports'</span><span class="token punctuation">,</span> <span class="token string">'dep'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> factory<span class="token punctuation">)</span>
        <span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>global <span class="token operator">=</span> global <span class="token operator">||</span> self<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">factory</span><span class="token punctuation">(</span><span class="token punctuation">(</span>global<span class="token punctuation">.</span>module <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> global<span class="token punctuation">.</span>dep<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">exports<span class="token punctuation">,</span> dep</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// code</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u901A\u8FC7\u5224\u65AD\u6240\u5728\u73AF\u5883\uFF0C\u53EF\u4EE5\u8BA9\u7C7B\u5E93\u9002\u914D\u5404\u79CD\u6A21\u5757\u7CFB\u7EDF\u3002</p>
<p>UMD \u4E2D\u4E5F\u53EF\u4EE5\u6DFB\u52A0 CMD \u7684\u652F\u6301\uFF0C\u4E0D\u8FC7\u7531\u4E8E\u524D\u7AEF\u7684\u53D1\u5C55\uFF0CCMD \u5DF2\u7ECF\u9010\u6E10\u88AB\u9000\u51FA\u821E\u53F0\u3002</p>
<h3 id="es-modules" tabindex="-1">ES Modules <a class="header-anchor" href="#es-modules" aria-hidden="true">#</a></h3>
<p>\u800C\u968F\u7740 ES \u6807\u51C6\u7684\u66F4\u65B0\uFF0C\u9010\u6E10\u51FA\u73B0\u4E86\u539F\u751F\u7684\u6A21\u5757\u5316\u8BED\u6CD5 ES Modules\u3002</p>
<p>import \u652F\u6301\u4E24\u79CD\u8BED\u6CD5</p>
<h4 id="\u9759\u6001\u58F0\u660E-import-module" tabindex="-1">\u9759\u6001\u58F0\u660E import 'module' <a class="header-anchor" href="#\u9759\u6001\u58F0\u660E-import-module" aria-hidden="true">#</a></h4>
<p>\u9996\u5148\u662F\u4F5C\u4E3A\u9759\u6001\u58F0\u660E</p>
<p>b.js</p>
<div class="language-js"><pre><code><span class="token keyword">import</span> a <span class="token keyword">from</span> <span class="token string">'a'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> b<span class="token punctuation">;</span>
</code></pre>
</div><p>\u9759\u6001\u58F0\u660E\u7684 import \u7C7B\u4F3C\u4E8E CJS \u7684 require\uFF0C\u4F46\u662F\u4E5F\u5B58\u5728\u4E0D\u540C\u4E4B\u5904\uFF1A</p>
<ol>
<li>import \u5FC5\u987B\u5728\u9876\u90E8\u58F0\u660E\uFF0C\u4E0D\u5F97\u5305\u88F9\u5728\u5757\u6216\u51FD\u6570\u4E2D</li>
<li>import \u5BFC\u5165\u7684\u5F15\u7528\u4E3A live bindings\uFF08\u6D3B\u5F15\u7528\uFF09\uFF0C\u5373\u5728\u539F\u5F15\u7528\u53D8\u66F4\u65F6\uFF0Cimport \u7684\u5F15\u7528\u4E5F\u4F1A\u53D8\u66F4</li>
<li>import \u662F\u5C06\u6A21\u5757\u6309\u9700\u5BFC\u5165\u7684\uFF0C\u800C require \u662F\u6574\u4E2A\u5BFC\u5165\u6587\u4EF6\u4E2D\u6240\u6709\u5BFC\u51FA\u7684\u5185\u5BB9</li>
</ol>
<p>live bindings \u53EF\u4EE5\u8BA4\u4E3A\u662F\u76EE\u524D\u4E3A\u6B62 JS \u4E2D\u7B2C\u4E00\u6B21\u51FA\u73B0\u6309\u5F15\u7528\u4F20\u9012\u3002</p>
<div class="language-!"><pre><code>live bindings \u867D\u7136\u5728 webpack \u4E2D\u6709\u5B9E\u73B0\uFF08\u901A\u8FC7\u5408\u5E76\u6A21\u5757\u6216\u5C06\u5F15\u7528\u4FEE\u6539\u4E3A\u6A21\u5757\u7684\u5C5E\u6027\uFF09\uFF0C\u4F46\u662F\u4F7F\u7528 babel \u76F4\u63A5\u8F6C\u4E49\u4EE3\u7801\u65F6\uFF0Cimport \u4F1A\u7B49\u4EF7\u4E8E require\uFF0C\u6240\u4EE5\u4F7F\u7528\u4E2D\u9700\u8981\u6CE8\u610F\uFF0C\u5E76\u4E14\u5982\u679C\u662F\u4ECE\u5728 lib \u4E2D\u5BFC\u51FA\uFF0C\u5728\u5176\u5B83 lib \u4E2D\u4F7F\u7528\u65F6\uFF0Cwebpack \u4E5F\u662F\u6CA1\u529E\u6CD5\u7684
</code></pre>
</div><p>a.js</p>
<div class="language-js"><pre><code><span class="token keyword">let</span> v <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> v <span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">v updated</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> <span class="token operator">++</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>main.js</p>
<div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> v <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./a.js'</span><span class="token punctuation">;</span>

<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><h4 id="\u52A8\u6001\u5BFC\u5165-import-module" tabindex="-1">\u52A8\u6001\u5BFC\u5165 import('module') <a class="header-anchor" href="#\u52A8\u6001\u5BFC\u5165-import-module" aria-hidden="true">#</a></h4>
<p>\u540C\u65F6 import \u4E5F\u652F\u6301\u52A8\u6001\u5BFC\u5165\u6A21\u5757</p>
<p>dep1.js</p>
<div class="language-js"><pre><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'dep1 ready to run'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">log</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'this is dep1'</span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>dep2.js</p>
<div class="language-js"><pre><code>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'dep2 ready to run'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">log</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'this is dep2'</span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>main.js</p>
<div class="language-js"><pre><code><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">[</span>dep1<span class="token punctuation">,</span> dep2<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./dep1.js'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">'./dep2.js'</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dep1<span class="token punctuation">,</span> dep2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u914D\u5408 await \u53EF\u4EE5\u65B9\u4FBF\u7684\u5F02\u6B65\u5BFC\u5165\u6A21\u5757\uFF08\u771F\u61D2\u52A0\u8F7D\u548C\u61D2\u6267\u884C\uFF09\uFF0C\u4E0D\u8FC7\u4ECE\u603B\u4F53\u901F\u5EA6\u4E0A\u4F1A\u6BD4\u524D\u7F6E\u6279\u91CF\u52A0\u8F7D\u66F4\u5F71\u54CD\u901F\u5EA6\uFF0C\u5F53\u7136\u53EF\u4EE5\u901A\u8FC7\u5934\u90E8\u63D0\u524D\u5BFC\u5165\u6765\u4F18\u5316\u3002\u6CE8\u610F\u8FD9\u91CC\u8FD4\u56DE\u503C\u662F\u6A21\u5757\u5BF9\u8C61\uFF0C\u4E0D\u662F export default \u7684\u503C\uFF08\u6B64\u5904\u8FD4\u56DE\u503C\u7C7B\u4F3C require('module') \u7684\u503C\uFF09\u3002</p>
<h3 id="systemjs" tabindex="-1">SystemJS <a class="header-anchor" href="#systemjs" aria-hidden="true">#</a></h3>
<p>\u9664\u4E86\u4E0A\u8FF0\u7684\u6A21\u5757\u52A0\u8F7D\u5668\uFF0C\u8FD8\u6709 SystemJS\uFF0C\u5728\u56FD\u5185\u597D\u50CF\u4E0D\u662F\u592A\u5E38\u89C1\uFF0C\u4F46\u662F\u4F5C\u4E3A Angular2 \u7684\u63A8\u8350\u9009\u9879\uFF0C\u56FD\u5916\u7528\u7684\u8FD8\u662F\u6BD4\u8F83\u591A\u3002</p>
<p>SystemJS \u6A21\u5757\u7684\u5B9A\u4E49</p>
<div class="language-js"><pre><code>System<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'react'</span><span class="token punctuation">,</span> <span class="token string">'react-dom'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">_export<span class="token punctuation">,</span> _context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token string">'use strict'</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> React<span class="token punctuation">,</span> ReactDOM<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">setters</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">_react</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                React <span class="token operator">=</span> _react<span class="token punctuation">.</span>default<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">_reactDom</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                ReactDOM <span class="token operator">=</span> _reactDom<span class="token punctuation">.</span>default<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token function-variable function">execute</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
                React<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'button'</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token string">'A button created by React'</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'react-root'</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
            System<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">_export<span class="token punctuation">,</span> _context</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">_export</span><span class="token punctuation">(</span><span class="token string">'foo'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'foo'</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>SystemJS \u53EF\u4EE5\u901A\u8FC7\u5404\u79CD\u63D2\u4EF6\uFF0C\u5B9E\u73B0\u5BF9 AMD\u3001UMD \u7684\u52A0\u8F7D\uFF0C\u5E76\u4E14\u501F\u52A9\u8FD0\u884C\u65F6\u7F16\u8BD1\u5668\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u5BF9 ES Modules \u548C CJS \u6A21\u5757\u7684\u76F4\u63A5\u52A0\u8F7D\uFF0C\u4E0D\u8FC7\u5B98\u65B9\u4E5F\u4E0D\u5EFA\u8BAE\u7528\u5728\u751F\u4EA7\u73AF\u5883\uFF0C\u4F1A\u5F71\u54CD\u5230\u9875\u9762\u7684\u6027\u80FD\uFF0C\u4F46\u4F5C\u4E3A\u73A9\u5177\u65F6\u8FD8\u662F\u5F88\u65B9\u4FBF\u3002</p>
<h2 id="\u6A21\u5757\u6253\u5305" tabindex="-1">\u6A21\u5757\u6253\u5305 <a class="header-anchor" href="#\u6A21\u5757\u6253\u5305" aria-hidden="true">#</a></h2>
<p>\u9664\u4E86\u901A\u8FC7\u4E0A\u8FF0\u7684\u6A21\u5757\u7BA1\u7406\u7CFB\u7EDF\uFF0C\u8FD8\u6709\u5F88\u591A\u5728\u7F16\u8BD1\u65F6\u8FDB\u884C\u6A21\u5757\u5316\u7BA1\u7406\u7684\u5DE5\u5177\uFF0C\u5982 webpack\u3002</p>
<h3 id="webpack" tabindex="-1">webpack <a class="header-anchor" href="#webpack" aria-hidden="true">#</a></h3>
<h4 id="cjs" tabindex="-1">CJS <a class="header-anchor" href="#cjs" aria-hidden="true">#</a></h4>
<p>\u5148\u770B\u4E0B webpack \u5C06 CJS \u4EE3\u7801\u8FDB\u884C\u6253\u5305\u7684\u7ED3\u679C</p>
<p>\u6E90\u7801</p>
<p>cjs.js</p>
<div class="language-js"><pre><code><span class="token keyword">const</span> <span class="token punctuation">{</span> v <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./cjsDep'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><div class="language-js"><pre><code><span class="token keyword">let</span> v <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    v<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span> v <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>webpack \u6253\u5305\u540E\u7684\u6A21\u5757\u90E8\u5206\u4EE3\u7801</p>
<div class="language-js"><pre><code><span class="token function">webpackModuleFactory</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> t<span class="token punctuation">,</span> n</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token literal-property property">v</span><span class="token operator">:</span> r <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">n</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1e3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> t</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> n <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            n<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1e3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token punctuation">(</span>e<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">v</span><span class="token operator">:</span> n <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u6E90\u7801\u4E2D\u5F00\u53D1\u4E4B\u4F7F\u7528 CJS \u6216\u8005 ES Modules \u7684\u8BED\u6CD5\u8FDB\u884C\u7F16\u5199\uFF0C\u6253\u5305\u65F6 webpack \u5C06\u6BCF\u4E2A\u6A21\u5757\u5305\u88F9\u5230 function \u4E2D\u8FDB\u884C\u9694\u79BB\uFF0C\u7136\u540E\u7528\u6A21\u5757\u7684\u6570\u7EC4\uFF08\u4E5F\u53EF\u80FD\u662F\u5BF9\u8C61\uFF09 id \u8FDB\u884C\u6A21\u5757\u6807\u8BC6\uFF0C\u5728\u4F7F\u7528\u65F6\u6267\u884C\u6A21\u5757\u51FD\u6570\u8FD4\u56DE\u6A21\u5757\u503C</p>
<h4 id="es-modules-1" tabindex="-1">ES Modules <a class="header-anchor" href="#es-modules-1" aria-hidden="true">#</a></h4>
<p>\u518D\u770B\u4E0B ES Modules \u4EE3\u7801\u6253\u51FA\u6765\u7684\u5305\uFF1A</p>
<p>\u6E90\u7801</p>
<p>es.js</p>
<div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> v <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./esDep'</span><span class="token punctuation">;</span>

<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>esDep.js</p>
<div class="language-js"><pre><code><span class="token keyword">let</span> v <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    v<span class="token operator">++</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token punctuation">{</span> v <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>webpack \u6253\u5305\u540E\u7684\u6A21\u5757\u90E8\u5206\u4EE3\u7801</p>
<div class="language-js"><pre><code><span class="token function">webpackModuleFactory</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token number">2</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> t<span class="token punctuation">,</span> r</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token string">'use strict'</span><span class="token punctuation">;</span>
        r<span class="token punctuation">.</span><span class="token function">r</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> n <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            n<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1e3</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1e3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u4E3A\u4E86\u5B9E\u73B0 live bindings\uFF0Cwebpack \u5C06 dep \u548C es \u6253\u5305\u5230\u4E86\u4E00\u8D77\u3002</p>
<p>\u800C\u5F53 dep \u88AB\u5176\u5B83 entry \u5171\u4EAB\u65F6\uFF0Cwebpack \u5C06\u4F1A\u628A dep \u7684\u8F93\u51FA\u6253\u5305\u6210\u6A21\u5757\uFF0C\u800C\u5C06 import \u7684\u53D8\u91CF\u8F6C\u6362\u4E3A\u6A21\u5757\u5BF9\u8C61\u7684\u5C5E\u6027\uFF0C\u4EE5\u6B64\u6765\u5B9E\u73B0 live bindings\u3002</p>
<div class="language-js"><pre><code><span class="token function">webpackModuleFactory</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> t<span class="token punctuation">,</span> r</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token string">'use strict'</span><span class="token punctuation">;</span>
        r<span class="token punctuation">.</span><span class="token function">r</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">,</span>
            r<span class="token punctuation">.</span><span class="token function">d</span><span class="token punctuation">(</span>t<span class="token punctuation">,</span> <span class="token string">'v'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> n<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">let</span> n <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            n<span class="token operator">++</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1e3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e<span class="token punctuation">,</span> t<span class="token punctuation">,</span> r</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token string">'use strict'</span><span class="token punctuation">;</span>
        r<span class="token punctuation">.</span><span class="token function">r</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> n <span class="token operator">=</span> <span class="token function">r</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">.</span>v<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1e3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u540C\u65F6 webpack \u4E5F\u652F\u6301\u52A8\u6001 import \u548C\u52A8\u6001 require \u8BED\u6CD5\uFF0C\u539F\u7406\u662F\u5206\u5305\u540E\u901A\u8FC7 webpackJsonp \u6765\u52A0\u8F7D\u6A21\u5757\u6587\u4EF6\u3002</p>
<p>webpack 5 \u4E2D\u51FA\u73B0\u7684 <a href="https://webpack.js.org/concepts/module-federation/#root" target="_blank" rel="noopener noreferrer">Module Federation</a> \u4E5F\u5F25\u8865\u4E86 webpack \u539F\u5148\u8DE8\u9879\u76EE\u6A21\u5757\u5F15\u7528\u7684\u7F3A\u9677\u3002\u53EF\u4EE5\u9884\u89C1 ModuleConcatenation \u4F1A\u5BF9\u5927\u578B\u524D\u7AEF\u9879\u76EE\u3001\u524D\u7AEF\u5FAE\u670D\u52A1\u7684\u73A9\u6CD5\u5E26\u6765\u4E00\u5B9A\u7684\u53D8\u5316\u3002</p>
<h2 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3 <a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a></h2>
<p>\u867D\u7136\u5927\u90E8\u5206\u5F00\u53D1\u8005\u73B0\u5728\u90FD\u8F6C\u5230 webpack \u9635\u8425\uFF0C\u4F46\u662F\u4E00\u4E9B\u6D4F\u89C8\u5668\u7AEF\u7684\u6A21\u5757\u52A0\u8F7D\u5668\u8FD8\u662F\u6709\u5B83\u7684\u4F7F\u7528\u573A\u666F\uFF0C\u6BD4\u5982\u591A\u9879\u76EE\u95F4\u7684\u6A21\u5757\u5171\u4EAB\uFF0C\u4F7F\u7528\u4E00\u4E9B\u516C\u5171 CDN \u7684\u6A21\u5757\u7B49\uFF0C\u6240\u4EE5 require.js\u3001SystemJS \u7B49\u6A21\u5757\u5316\u7BA1\u7406\u5DE5\u5177\u8FD8\u662F\u6709\u7528\u6B66\u4E4B\u5730\uFF0C\u5E76\u4E14\u968F\u7740 http 2.0 \u7684\u666E\u53CA\uFF0C\u6A21\u5757\u5206\u5305\u8D8A\u6765\u8D8A\u7EC6\u3002\u4E5F\u8BB8\u4E0D\u4E45\u7684\u5C06\u6765\u8FD8\u4F1A\u6709\u5176\u5B83\u7684\u6A21\u5757\u5316\u65B9\u6848\u51FA\u73B0\u3002</p>
<p>\u5176\u5B9E\u8FD8\u6709\u5F88\u591A\u5176\u5B83\u7684\u6A21\u5757\u5316\u65B9\u6848\uFF0C\u6BD4\u5982 angularjs \u7684\u4F9D\u8D56\u6CE8\u5165\u7B49\uFF0C\u7531\u4E8E\u4E0D\u662F\u592A\u719F\u6089\u8FD9\u91CC\u5C31\u4E0D\u518D\u591A\u8BF4\u3002</p>
<h2 id="\u6700\u540E" tabindex="-1">\u6700\u540E <a class="header-anchor" href="#\u6700\u540E" aria-hidden="true">#</a></h2>
<ul>
<li>\u672C\u6587\u6D89\u53CA\u7684 demo \u4EE3\u7801\u6574\u7406\u5728\u8FD9\u91CC <a href="https://github.com/ZxBing0066/fe-module-examples" target="_blank" rel="noopener noreferrer">FE-module-examples</a></li>
</ul>
<blockquote>
<p>\u5982\u679C\u6709\u7528\u6B22\u8FCE\u70B9\u8D5E\uFF0C\u5982\u679C\u6709\u8BEF\u6B22\u8FCE\u7559\u8A00</p>
</blockquote>
`;export{s as __pageData,a as default};
