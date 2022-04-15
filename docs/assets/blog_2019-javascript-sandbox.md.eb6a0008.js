import"./app.d36d7bad.js";const s='{"title":"\u52A8\u624B\u5B9E\u73B0\u4E00\u4E2A JavaScript \u6C99\u7BB1","description":"","frontmatter":{"tags":["javascript","sandbox"],"date":"2019-10-25T00:00:00.000Z"},"headers":[{"level":2,"title":"\u524D\u8A00","slug":"\u524D\u8A00"},{"level":2,"title":"\u52A8\u624B","slug":"\u52A8\u624B"},{"level":3,"title":"\u4EE3\u7801\u6267\u884C","slug":"\u4EE3\u7801\u6267\u884C"},{"level":3,"title":"\u521D\u7248\u5B9E\u73B0","slug":"\u521D\u7248\u5B9E\u73B0"},{"level":3,"title":"\u8FDB\u9636\u5B9E\u73B0","slug":"\u8FDB\u9636\u5B9E\u73B0"},{"level":3,"title":"\u6700\u7EC8\u5B9E\u73B0","slug":"\u6700\u7EC8\u5B9E\u73B0"},{"level":2,"title":"\u4F7F\u7528\u573A\u666F","slug":"\u4F7F\u7528\u573A\u666F"},{"level":2,"title":"\u4E3E\u4E2A \u{1F330}","slug":"\u4E3E\u4E2A-\u{1F330}"},{"level":2,"title":"\u5C40\u9650\u6027","slug":"\u5C40\u9650\u6027"},{"level":2,"title":"\u6269\u5C55\u9605\u8BFB","slug":"\u6269\u5C55\u9605\u8BFB"},{"level":2,"title":"\u53C2\u8003\u6587\u732E","slug":"\u53C2\u8003\u6587\u732E"}],"relativePath":"blog/2019-javascript-sandbox.md","createTime":1650038339000,"lastUpdated":1649686573000}';var a=()=>`<h1 id="\u52A8\u624B\u5B9E\u73B0\u4E00\u4E2A-javascript-\u6C99\u7BB1" tabindex="-1">\u52A8\u624B\u5B9E\u73B0\u4E00\u4E2A JavaScript \u6C99\u7BB1 <a class="header-anchor" href="#\u52A8\u624B\u5B9E\u73B0\u4E00\u4E2A-javascript-\u6C99\u7BB1" aria-hidden="true">#</a></h1>
<blockquote>
<p>\u6C99\u7BB1\u7684\u5B58\u5728\u4E0D\u53EA\u662F\u4E3A\u4E86\u5B89\u5168\u95EE\u9898\uFF0C\u4E5F\u662F\u4E3A\u4E86\u89E3\u51B3\u4E00\u4E9B\u9694\u79BB\u6027\u7684\u95EE\u9898\uFF0C\u8FD9\u91CC\u53EA\u8003\u8651\u9694\u79BB\u6027\u95EE\u9898\uFF0C\u4E0D\u8003\u8651\u6076\u610F\u6CE8\u5165\u3002\u8981\u4E3A\u4E86\u5B89\u5168\u9694\u79BB\u6076\u610F\u4EE3\u7801\u7684\u8BDD\uFF0C\u8BF7\u4F7F\u7528 iframe \u4E4B\u7C7B\u7684\u65B9\u6848\u89E3\u51B3\u3002</p>
</blockquote>
<h2 id="\u524D\u8A00" tabindex="-1">\u524D\u8A00 <a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a></h2>
<p>\u8FD9\u51E0\u5929\u9879\u76EE\u4E2D\u6709\u6D89\u53CA\u5230\u5404\u9879\u76EE\u95F4\u4EE3\u7801\u9694\u79BB\u7684\u5185\u5BB9\uFF0C\u6240\u4EE5\u9488\u5BF9<code>JS</code>\u4E2D\u7684\u6C99\u7BB1\u5B9E\u73B0\u505A\u4E86\u4E00\u4E9B\u5C1D\u8BD5\uFF0C\u57FA\u672C\u5B9E\u73B0\u4E86\u6B63\u5E38\u4EE3\u7801\u95F4\u7684\u8FD0\u884C\u9694\u79BB\uFF0C\u8FD9\u91CC\u8BB0\u5F55\u4E00\u4E0B\u5B9E\u73B0\u8FC7\u7A0B\u3002</p>
<p>\u60F3\u770B\u4E0B\u6700\u7EC8\u6548\u679C\u7684\u53EF\u4EE5\u76F4\u63A5\u770B\u4E0B\u65B9 <a href="#%E4%B8%BE%E4%B8%AA-%F0%9F%8C%B0">\u4E3E\u4E2A \u{1F330}</a></p>
<h2 id="\u52A8\u624B" tabindex="-1">\u52A8\u624B <a class="header-anchor" href="#\u52A8\u624B" aria-hidden="true">#</a></h2>
<h3 id="\u4EE3\u7801\u6267\u884C" tabindex="-1">\u4EE3\u7801\u6267\u884C <a class="header-anchor" href="#\u4EE3\u7801\u6267\u884C" aria-hidden="true">#</a></h3>
<p>\u8981\u5B9E\u73B0\u6C99\u7BB1\uFF0C\u9996\u5148\uFF0C\u5F97\u8BA9\u4E00\u6BB5\u4EE3\u7801\u53D7\u63A7\u7684\u8DD1\u8D77\u6765\uFF0C\u4EE3\u7801\u5F97\u8F6C\u6210\u5B57\u7B26\u4E32\uFF0C\u7136\u540E\u4F7F\u7528\u5B57\u7B26\u4E32\u8C03\u7528\u4EE3\u7801\u3002</p>
<p>\u8FD9\u91CC\u5F88\u5BB9\u6613\u5C31\u60F3\u5230\u4E86 eval \u548C Function\u3002</p>
<div class="language-js"><pre><code><span class="token keyword">const</span> <span class="token function-variable function">exec1</span> <span class="token operator">=</span> <span class="token parameter">code</span> <span class="token operator">=></span> <span class="token function">eval</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> geval <span class="token operator">=</span> eval<span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">exec2</span> <span class="token operator">=</span> <span class="token parameter">code</span> <span class="token operator">=></span> <span class="token function">geval</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">exec3</span> <span class="token operator">=</span> <span class="token parameter">code</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token string">'use strict'</span><span class="token punctuation">;</span>
    <span class="token function">eval</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">exec4</span> <span class="token operator">=</span> <span class="token parameter">code</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token string">'use strict'</span><span class="token punctuation">;</span>
    <span class="token function">geval</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">exec5</span> <span class="token operator">=</span> <span class="token parameter">code</span> <span class="token operator">=></span> <span class="token function">Function</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u603B\u5171\u6709\u4E0A\u8FF0 5 \u4E2D\u65B9\u5F0F\u53EF\u4EE5\u5B9E\u73B0\u4EE3\u7801\u7684\u8FD0\u884C\uFF1A</p>
<ul>
<li>eval \u4F1A\u5F71\u54CD\u8C03\u7528\u7684\u4E0A\u4E0B\u6587</li>
<li>geval \u4E0D\u4F1A\u5F71\u54CD\u4E0A\u4E0B\u6587\uFF0C\u4F46\u662F\u4F1A\u76F4\u63A5\u5728\u5168\u5C40\u4F5C\u7528\u57DF\u4E0B\u6267\u884C\uFF0C\u53D8\u91CF\u7B49\u4F1A\u6302\u5230\u5168\u5C40</li>
<li>\u4E25\u683C eval \u53EF\u4EE5\u8BFB\u5199\u4E0A\u4E0B\u6587\u7684\u53D8\u91CF\uFF0C\u4F46\u662F\u4E0D\u80FD\u65B0\u589E\uFF0C\u4EE3\u7801\u6267\u884C\u4E3A\u4E25\u683C\u6A21\u5F0F</li>
<li>\u4E25\u683C geval \u540C\u4E0A\uFF0C\u4F46\u662F\u5728\u5168\u5C40\u4F5C\u7528\u57DF\u4E0B\u6267\u884C</li>
<li>Function \u76F8\u5F53\u4E8E\u5728\u5168\u5C40\u4F5C\u7528\u57DF\u4E0B\u521B\u5EFA\u4E00\u4E2A\u533F\u540D\u51FD\u6570\u6267\u884C</li>
</ul>
<p>geval \u53EF\u4EE5\u770B\u6700\u4E0B\u65B9\u77E5\u8BC6\u70B9\u3002\u6211\u4EEC\u9009\u62E9 Function \u6765\u5B9E\u73B0\uFF08eval \u4E5F\u53EF\u4EE5\u5B9E\u73B0\uFF0C\u7A0D\u5FAE\u9EBB\u70E6\u4E00\u70B9\uFF0C<code>Function('code')();</code> \u57FA\u672C\u7B49\u4EF7\u4E8E <code>const geval = eval; geval('function() {&quot;code&quot;})()');</code>\uFF09\uFF0C</p>
<h3 id="\u521D\u7248\u5B9E\u73B0" tabindex="-1">\u521D\u7248\u5B9E\u73B0 <a class="header-anchor" href="#\u521D\u7248\u5B9E\u73B0" aria-hidden="true">#</a></h3>
<div class="language-js"><pre><code><span class="token keyword">const</span> global <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> outterVariable <span class="token operator">=</span> <span class="token string">'outter'</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">createSandbox</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token parameter">code</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">Function</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                ;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
            </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> sandbox <span class="token operator">=</span> <span class="token function">createSandbox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sandbox</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        var a = 1;
        var b = 2;
        // \u671F\u5F85\u6253\u51FA 1 2
        console.log(a, b);
        outterVariable = 'sandbox';
        console.log(outterVariable);
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token string">'fail'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'success'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token string">'fail'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'success'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>outterVariable<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>outterVariable<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u9664\u4E86\u5168\u5C40\u53D8\u91CF\u7684\u95EE\u9898\uFF0C\u8C8C\u4F3C\u4E00\u5207 OK\uFF0C\u518D\u60F3\u60F3\u600E\u4E48\u89E3\u51B3\u5168\u5C40\u53D8\u91CF\u8FD9\u4E2A\u5927\u9EBB\u70E6</p>
<p><img src="/image/emot-dydx.jpg" alt=""></p>
<p>\u6539\u53D8\u4EE3\u7801\u7684\u4F5C\u7528\u57DF\uFF0C\u9664\u4E86 eval\u3001Function \u5C31\u53EA\u80FD\u60F3\u5230 with \u4E86\uFF0C\u4E0D\u8FC7 with \u7684\u529F\u80FD\u662F\u5C06\u7ED9\u5B9A\u7684\u8868\u8FBE\u5F0F\u6302\u5230\u4F5C\u7528\u57DF\u7684\u9876\u7AEF\uFF0C\u5168\u5C40\u53D8\u91CF\u597D\u50CF\u4E0D\u592A\u884C\uFF1F\u7B49\u7B49\uFF0C\u90A3\u8BD5\u8BD5 Proxy \u5462\u3002</p>
<h3 id="\u8FDB\u9636\u5B9E\u73B0" tabindex="-1">\u8FDB\u9636\u5B9E\u73B0 <a class="header-anchor" href="#\u8FDB\u9636\u5B9E\u73B0" aria-hidden="true">#</a></h3>
<div class="language-js"><pre><code><span class="token keyword">const</span> global <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> outterVariable <span class="token operator">=</span> <span class="token string">'outter'</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">createSandbox</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> prop<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>prop<span class="token punctuation">)</span><span class="token punctuation">;</span>
                obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>prop <span class="token keyword">in</span> obj<span class="token punctuation">)</span> <span class="token keyword">return</span> obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token keyword">return</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token function-variable function">has</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token parameter">code</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">Function</span><span class="token punctuation">(</span>
                <span class="token string">'proxy'</span><span class="token punctuation">,</span>
                <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                with(proxy) {
                    ;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
                }
            </span><span class="token template-punctuation string">\`</span></span>
            <span class="token punctuation">)</span><span class="token punctuation">(</span>proxy<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> sandbox <span class="token operator">=</span> <span class="token function">createSandbox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sandbox</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        var a = 1;
        var b = 2;
        // \u671F\u5F85\u6253\u51FA 1 2
        console.log(a, b);
        outterVariable = 'sandbox';
        console.log(outterVariable);
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token string">'fail'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'success'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token string">'fail'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'success'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>outterVariable<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>outterVariable<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u901A\u8FC7 with \u6539\u53D8\u4F5C\u7528\u57DF\u94FE\uFF0C\u4EE5\u53CA Proxy \u7684 has \u963B\u65AD\u53D8\u91CF\u7684\u67E5\u8BE2\uFF0C\u5C31\u80FD\u5C06\u5BF9\u53D8\u91CF\u7684\u8BBF\u95EE\u9501\u6B7B\u5728\u6C99\u76D2\u73AF\u5883\u4E2D\u3002\u7136\u800C\uFF0C\u62A5\u9519\u4E86\u3002</p>
<p><img src="/image/emot-qnqs.jpg" alt="\u5F53\u573A\u53BB\u4E16"></p>
<p>\u7531\u4E8E\u963B\u65AD\u4E86\u53D8\u91CF\u7684\u67E5\u8BE2\uFF0C\u5168\u5C40\u5BF9\u8C61\u4E0A\u7684\u6B63\u5E38\u5C5E\u6027\u4E5F\u90FD\u65E0\u6CD5\u8BBF\u95EE\u4E86\uFF0C\u8FD9\u5C31\u4E0D\u5999\u4E86\u3002\u5982\u4F55\u5728\u963B\u65AD\u540E\u8FD8\u80FD\u8BBF\u95EE\u5230\u5168\u5C40\u53D8\u91CF\u5462\uFF0C\u628A\u6211\u4EEC\u4E0A\u9762\u7684 context \u91CC\u585E\u4E0A window \u7684\u5C5E\u6027\u5C31\u597D\u5566\u3002\u5F53\u7136\u4E0D\u80FD\u4E00\u4E2A\u4E2A\u590D\u5236\uFF0C\u8FD9\u65F6\u5019\u6211\u4EEC\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u7EE7\u627F\uFF0C\u8FD9\u6837\u4E0D\u6B62\u80FD\u8BBF\u95EE\u5230\u5168\u5C40\uFF0C\u8FD8\u80FD\u8BA9\u5BF9\u5168\u5C40\u5BF9\u8C61\u7684\u4FEE\u6539\u53EA\u5F71\u54CD\u5230 context \u800C\u4E0D\u5F71\u54CD window\uFF0C\u53EF\u559C\u53EF\u8D3A \u53EF\u559C\u53EF\u8D3A\u3002</p>
<div class="language-js"><pre><code><span class="token keyword">const</span> global <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> outterVariable <span class="token operator">=</span> <span class="token string">'outter'</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">createSandbox</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> context <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>global<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span>context<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token function-variable function">set</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> prop<span class="token punctuation">,</span> value</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token function-variable function">get</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter">obj<span class="token punctuation">,</span> prop</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> obj<span class="token punctuation">[</span>prop<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token function-variable function">has</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token parameter">code</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token function">Function</span><span class="token punctuation">(</span>
                <span class="token string">'proxy'</span><span class="token punctuation">,</span>
                <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
                with(proxy) {
                    ;</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>code<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
                }
            </span><span class="token template-punctuation string">\`</span></span>
            <span class="token punctuation">)</span><span class="token punctuation">(</span>proxy<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> sandbox <span class="token operator">=</span> <span class="token function">createSandbox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sandbox</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
        var a = 1;
        var b = 2;
        // \u671F\u5F85\u6253\u51FA 1 2
        console.log(a, b);
        outterVariable = 'sandbox';
        console.log(outterVariable);
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> <span class="token string">'fail'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'success'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token string">'fail'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>b<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'success'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>outterVariable<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'outterVariable'</span> <span class="token keyword">in</span> global<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u8C8C\u4F3C\u79BB\u6210\u529F\u4E0D\u8FDC\u4E86\uFF0C\u5168\u5C40\u53D8\u91CF\u7684\u8BBF\u95EE\u901A\u8FC7\u539F\u578B\u94FE\u5B8C\u6210\uFF0C\u53D8\u91CF\u7684\u9694\u79BB\u901A\u8FC7 with \u548C Proxy \u7684 has \u5C5E\u6027\u9501\u6B7B\u5728 context \u4E2D\uFF0C\u4E0D\u8FC7\u8FD8\u6709\u4E9B\u95EE\u9898\uFF1A</p>
<ol>
<li>\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7 window\u3001self\u3001this\u3001globalThis \u6765\u8BBF\u95EE\u5168\u5C40\u53D8\u91CF\uFF0C\u5E76\u5F71\u54CD\u5168\u5C40\u5C5E\u6027</li>
<li>\u901A\u8FC7\u62FF\u5230\u4E00\u4E9B\u5168\u5C40\u5C5E\u6027\u7684\u5F15\u7528\u540E\u53EF\u4EE5\u7BE1\u6539\u5168\u5C40\u5C5E\u6027\u7684\u503C</li>
<li>Function('return this') function(){return this} \u548C eval('this') \u53EF\u4EE5\u62FF\u5230\u771F\u5B9E\u7684 window</li>
</ol>
<p>\u7B2C\u4E00\u4E2A\u70B9\u6BD4\u8F83\u597D\u89E3\u51B3\uFF0C\u8BBF\u95EE\u8FD9\u4E9B\u5C5E\u6027\u65F6\u76F4\u63A5\u8FD4\u56DE proxy \u5C31\u884C\u4E86\uFF0Cthis \u53EF\u4EE5\u901A\u8FC7\u5C06 Function bind proxy \u89E3\u51B3\u7B2C\u4E8C\u4E2A\u5C31\u6BD4\u8F83\u9EBB\u70E6\u4E86\uFF0C\u7531\u4E8E\u5168\u5C40\u53D8\u91CF\u5F88\u591A\u90FD\u662F\u5F15\u7528\u7C7B\u578B\uFF0C\u8981\u89E3\u51B3\u9664\u975E\u4E00\u5C42\u5C42\u6DF1\u514B\u9686\uFF08\u8981\u5904\u7406\u5404\u79CD\u5947\u602A\u95EE\u9898\uFF09\uFF0C\u6216\u8005\u4E00\u5C42\u5C42\u4EE3\u7406\uFF08\u4E5F\u4F1A\u51FA\u73B0\u5404\u79CD\u5404\u6837\u7684\u95EE\u9898\uFF09\uFF0C\u6240\u4EE5\u653E\u5F03\u4E86\uFF0C\u6BD5\u7ADF\u7BE1\u6539\u5168\u5C40\u53D8\u91CF\u4E0D\u662F\u4EC0\u4E48\u597D\u4EE3\u7801\uFF0C\u4E00\u822C\u573A\u666F\u4E0B\u4E5F\u5F88\u5C11\u51FA\u73B0\u8FD9\u6837\u7684\u4EE3\u7801\uFF0C\u4E0D\u8FC7\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7\u767D\u540D\u5355\u6216\u8005\u9ED1\u540D\u5355\u7684\u65B9\u5F0F\uFF0C\u8BA9\u6C99\u76D2\u4E2D\u7684\u4EE3\u7801\u53EA\u80FD\u8BBF\u95EE\u5FC5\u8981\u7684\u5168\u5C40\u53D8\u91CF\uFF0C\u9632\u6B62\u91CD\u8981\u7684\u5168\u5C40\u53D8\u91CF\u88AB\u7BE1\u6539</p>
<p><img src="/image/emot-wxwm.jpg" alt="\u6211\u80FD\u600E\u4E48\u529E"></p>
<p>\u7B2C\u4E09\u4E2A\u4E5F\u5F88\u9EBB\u70E6\uFF0CFunction \u548C\u95F4\u63A5 eval \u662F\u76F4\u63A5\u5728\u5168\u5C40\u4E0B\u6267\u884C\u7684\uFF0C\u5B9E\u5728\u60F3\u89E3\u51B3\u7684\u8BDD\uFF0CFunction \u548C eval \u53EF\u4EE5\u901A\u8FC7\u629B\u51FA\u81EA\u5B9A\u4E49\u7684 eval \u548C Function \u6765\u5B9E\u73B0\uFF0C\u800C function \u7684\u8BDD\u53EF\u4EE5\u901A\u8FC7\u542F\u7528\u6C99\u7BB1\u7684\u4E25\u683C\u6A21\u5F0F\u6765\u5B9E\u73B0</p>
<p>\u7136\u800C\u8FD8\u662F\u53EF\u4EE5\u7ED5\u8FC7\uFF0C\u6BD4\u5982\u4F7F\u7528 (function(){}).constructor</p>
<p><img src="/image/emot-sbz.jpg" alt=""></p>
<h3 id="\u6700\u7EC8\u5B9E\u73B0" tabindex="-1">\u6700\u7EC8\u5B9E\u73B0 <a class="header-anchor" href="#\u6700\u7EC8\u5B9E\u73B0" aria-hidden="true">#</a></h3>
<p>\u8003\u8651\u5230\u5404\u79CD\u4E0A\u8FF0\u7684\u5404\u79CD\u5B9E\u73B0\u4E0A\u7684\u95EE\u9898\uFF0C\u4EE5\u53CA\u8FD8\u6709\u5F88\u591A\u56E0\u4E3A\u7BE1\u6539\u4E86 window \u5BFC\u81F4\u7684\u65B9\u6CD5\u9519\u8BEF\u7684\u95EE\u9898\uFF0C\u6539\u7248\u540E\u7684\u6700\u7EC8\u5B9E\u73B0\u770B\u8FD9\u91CC\uFF1A<a href="https://github.com/ZxBing0066/z-sandbox" target="_blank" rel="noopener noreferrer">https://github.com/ZxBing0066/z-sandbox</a></p>
<h2 id="\u4F7F\u7528\u573A\u666F" tabindex="-1">\u4F7F\u7528\u573A\u666F <a class="header-anchor" href="#\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a></h2>
<p>\u4E0A\u9762\u53EF\u4EE5\u770B\u51FA\u6765\uFF0C\u5728\u9762\u5BF9\u6076\u610F\u4EE3\u7801\u65F6\uFF0C\u4F7F\u7528 JavaScript \u672C\u8EAB\u53BB\u5B9E\u73B0\u7684\u6C99\u7BB1\u662F\u65E0\u6CD5\u7EDD\u5BF9\u5B89\u5168\u7684\uFF08\u751A\u81F3\u6CA1\u8003\u8651\u9632\u6CE8\u5165\uFF09\uFF0C\u4E0D\u8FC7\u8FD9\u4E2A\u4E0D\u662F\u5F88\u5B89\u5168\u7684\u6C99\u7BB1\u4E5F\u6709\u5B83\u7684\u4F7F\u7528\u573A\u666F\uFF0C\u6BD4\u5982\u9762\u5BF9\u5185\u90E8\u4EE3\u7801\u867D\u7136\u5B89\u5168\uFF0C\u4F46\u662F\u53C8\u4E0D\u53EF\u63A7\u7684\u5168\u5C40\u53D8\u91CF\u53EF\u80FD\u4F1A\u5BFC\u81F4\u4EE3\u7801\u95F4\u4E92\u76F8\u5F71\u54CD\u800C\u5BFC\u81F4 crash \u7684\uFF0C\u6BD4\u5982\u9700\u8981\u5728\u540C\u4E00\u4E2A\u9875\u9762\u8FD0\u884C\u591A\u4E2A\u7248\u672C\u5E93\u7684\uFF08\u6B63\u5E38\u4F1A\u76F8\u4E92\u51B2\u7A81\uFF09</p>
<h2 id="\u4E3E\u4E2A-\u{1F330}" tabindex="-1">\u4E3E\u4E2A \u{1F330} <a class="header-anchor" href="#\u4E3E\u4E2A-\u{1F330}" aria-hidden="true">#</a></h2>
<p>\u60F3\u770B DEMO \u6548\u679C\u7684\u53EF\u4EE5\u76F4\u63A5\u770B\u8FD9\u91CC\uFF1A <a href="https://codesandbox.io/s/quirky-microservice-8oqog?fontsize=14&amp;hidenavigation=1&amp;theme=dark" target="_blank" rel="noopener noreferrer"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="Edit quirky-microservice-8oqog"></a></p>
<p>\u6548\u679C\u57FA\u672C\u5982\u671F\uFF0C\u5176\u4E2D\u8FD8\u6709\u4E00\u4E9B\u6BD4\u8F83\u7EC6\u8282\u5B9E\u73B0\uFF0C\u6709\u5174\u8DA3\u7684\u53EF\u4EE5\u5173\u6CE8\u4E0B\u6700\u7EC8\u5B9E\u73B0\u5E93\uFF0C\u6E90\u7801\u4E0D\u5230 100 \u884C <a href="https://github.com/ZxBing0066/z-sandbox" target="_blank" rel="noopener noreferrer"><img src="/image/github-star.jpg" alt=""></a></p>
<p>\u901A\u8FC7\u4E0B\u9762\u7684\u4EE3\u7801\u6211\u4EEC\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u5C06 React15 \u548C 16 \u8DD1\u5728\u4E00\u8D77\uFF0C\u800C\u4E0D\u9700\u8981\u62C5\u5FC3\u5B83\u4EEC\u4E92\u76F8\u5E72\u6270\u3002</p>
<div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token string">'./styles.css'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createSandbox <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'z-sandbox'</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'axios'</span><span class="token punctuation">;</span>

document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'app'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>innerHTML <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
&lt;div id='container1'>
&lt;/div>
&lt;div id='container2'>
&lt;/div>
</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>

<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>screen<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> sandbox15 <span class="token operator">=</span> <span class="token function">createSandbox</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">useStrict</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> sandbox16 <span class="token operator">=</span> <span class="token function">createSandbox</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">useStrict</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">getReactCode15</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
        axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'https://unpkg.com/react@15.6.2/dist/react-with-addons.js'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">getReactCode16</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
        axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'https://unpkg.com/react@16.11.0/umd/react.development.js'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">getReactDOMCode15</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
        axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'https://unpkg.com/react-dom@15.6.2/dist/react-dom.js'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">getReactDOMCode16</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>
        axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'https://unpkg.com/react-dom@16.11.0/umd/react-dom.development.js'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">res</span> <span class="token operator">=></span> res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">getReactCode15</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getReactCode16</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getReactDOMCode15</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">getReactDOMCode16</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>reactCode15<span class="token punctuation">,</span> reactCode16<span class="token punctuation">,</span> reactDOMCode15<span class="token punctuation">,</span> reactDOMCode16<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reactCode15<span class="token punctuation">.</span>length<span class="token punctuation">,</span> reactCode16<span class="token punctuation">.</span>length<span class="token punctuation">,</span> reactDOMCode15<span class="token punctuation">.</span>length<span class="token punctuation">,</span> reactDOMCode16<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">sandbox15</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
      console.log(Object.prototype)
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">sandbox15</span><span class="token punctuation">(</span>reactCode15<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">sandbox15</span><span class="token punctuation">(</span>reactDOMCode15<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">sandbox16</span><span class="token punctuation">(</span>reactCode16<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">sandbox16</span><span class="token punctuation">(</span>reactDOMCode16<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">sandbox15</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
    ReactDOM.render(React.createElement('div', {
      onClick: () => alert('I am a component using React' + React.version)
    }, 'Hello world, try to click me'), document.getElementById('container1'))
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">sandbox16</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
      ReactDOM.render(React.createElement('div', {
        onClick: () => alert('I am a component using React' + React.version)
      }, 'Hello world, try to click me'), document.getElementById('container2'))
    </span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sandbox15<span class="token punctuation">.</span>context<span class="token punctuation">.</span>React<span class="token punctuation">.</span>version<span class="token punctuation">)</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sandbox16<span class="token punctuation">.</span>context<span class="token punctuation">.</span>React<span class="token punctuation">.</span>version<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><h2 id="\u5C40\u9650\u6027" tabindex="-1">\u5C40\u9650\u6027 <a class="header-anchor" href="#\u5C40\u9650\u6027" aria-hidden="true">#</a></h2>
<p>\u7531\u4E8E\u53D8\u91CF\u7684\u62E6\u622A\u501F\u52A9\u4E8E\u6700\u65B0\u7684 Proxy API\uFF0C\u5B58\u5728\u517C\u5BB9\u95EE\u9898</p>
<h2 id="\u6269\u5C55\u9605\u8BFB" tabindex="-1">\u6269\u5C55\u9605\u8BFB <a class="header-anchor" href="#\u6269\u5C55\u9605\u8BFB" aria-hidden="true">#</a></h2>
<blockquote>
<p>If you use the eval function indirectly, by invoking it via a reference other than eval, as of ECMAScript 5 it works in the global scope rather than the local scope. This means, for instance, that function declarations create global functions, and that the code being evaluated doesn't have access to local variables within the scope where it's being called. <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval" target="_blank" rel="noopener noreferrer">MDN</a></p>
</blockquote>
<p>MDN \u6709\u63CF\u8FF0\uFF0C\u5F53 <strong>\u95F4\u63A5\u8C03\u7528</strong> eval \u65F6\uFF0C\u5C06\u4F1A\u5728 <strong>\u5168\u5C40\u73AF\u5883</strong> \u4E0B\u6267\u884C\u800C\u4E0D\u4F1A\u5F71\u54CD\u5230\u4F5C\u7528\u57DF\u4E2D\u7684\u672C\u5730\u53D8\u91CF\u3002\u6240\u4EE5\u4E00\u822C\u4E5F\u79F0\u4E3A\u5168\u5C40 eval</p>
<h2 id="\u53C2\u8003\u6587\u732E" tabindex="-1">\u53C2\u8003\u6587\u732E <a class="header-anchor" href="#\u53C2\u8003\u6587\u732E" aria-hidden="true">#</a></h2>
<p><a href="https://blog.risingstack.com/writing-a-javascript-framework-sandboxed-code-evaluation/" target="_blank" rel="noopener noreferrer">writing-a-javascript-framework-sandboxed-code-evaluation</a></p>
`;export{s as __pageData,a as default};
