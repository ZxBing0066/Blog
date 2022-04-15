import"./app.d36d7bad.js";const s='{"title":"JavaScript \u4EE3\u7801\u6027\u80FD\u4F18\u5316 - \u4ECE\u6392\u67E5\u5230\u5904\u7406","description":"","frontmatter":{"tags":["javascript","performance"],"date":"2019-11-14T00:00:00.000Z"},"headers":[{"level":2,"title":"\u6027\u80FD\u95EE\u9898\u6392\u67E5\u4E0E\u6536\u96C6","slug":"\u6027\u80FD\u95EE\u9898\u6392\u67E5\u4E0E\u6536\u96C6"},{"level":3,"title":"Performance","slug":"performance"},{"level":3,"title":"JavaScript Profiler","slug":"javascript-profiler"},{"level":3,"title":"console.time","slug":"console-time"},{"level":2,"title":"\u6027\u80FD\u95EE\u9898\u6574\u7406\u548C\u4F18\u5316","slug":"\u6027\u80FD\u95EE\u9898\u6574\u7406\u548C\u4F18\u5316"},{"level":3,"title":"\u62C6\u5206\u5FAA\u73AF\u4E2D\u7684\u4EFB\u52A1","slug":"\u62C6\u5206\u5FAA\u73AF\u4E2D\u7684\u4EFB\u52A1"},{"level":3,"title":"\u7406\u6E05\u903B\u8F91","slug":"\u7406\u6E05\u903B\u8F91"},{"level":3,"title":"\u5584\u7528\u4F4D\u8FD0\u7B97","slug":"\u5584\u7528\u4F4D\u8FD0\u7B97"},{"level":3,"title":"\u51CF\u5C11\u91CD\u590D\u4EFB\u52A1","slug":"\u51CF\u5C11\u91CD\u590D\u4EFB\u52A1"},{"level":3,"title":"\u5C3D\u65E9\u9000\u51FA","slug":"\u5C3D\u65E9\u9000\u51FA"},{"level":3,"title":"\u5584\u7528 lazy","slug":"\u5584\u7528-lazy"},{"level":2,"title":"\u6210\u679C","slug":"\u6210\u679C"},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3"}],"relativePath":"blog/2019-console-performance.md","createTime":1650038339000,"lastUpdated":1650038339000}';var a=()=>`<h1 id="javascript-\u4EE3\u7801\u6027\u80FD\u4F18\u5316-\u4ECE\u6392\u67E5\u5230\u5904\u7406" tabindex="-1">JavaScript \u4EE3\u7801\u6027\u80FD\u4F18\u5316 - \u4ECE\u6392\u67E5\u5230\u5904\u7406 <a class="header-anchor" href="#javascript-\u4EE3\u7801\u6027\u80FD\u4F18\u5316-\u4ECE\u6392\u67E5\u5230\u5904\u7406" aria-hidden="true">#</a></h1>
<p>\u8FD1\u671F\u5728\u5BF9\u6211\u4EEC\u7684\u63A7\u5236\u53F0\u505A\u6027\u80FD\u4F18\u5316\uFF0C\u8FD9\u6B21\u8BB0\u5F55\u4E0B\u4EE3\u7801\u6267\u884C\u65B9\u9762\u7684\u6027\u80FD\u6392\u67E5\u4E0E\u4F18\u5316\uFF08\u7EAF JS \u4E0A\u7684\u4E0D\u5305\u542B DOM \u64CD\u4F5C\u7B49\u4F18\u5316\uFF09\u3002\u5176\u5B83\u7684\u4F18\u5316\u70B9\u4EE5\u540E\u6709\u673A\u4F1A\u518D\u5206\u4EAB\u3002</p>
<p>\u63A7\u5236\u53F0\u5730\u5740\uFF1A<a href="https://console.ucloud.cn/" target="_blank" rel="noopener noreferrer">https://console.ucloud.cn/</a></p>
<h2 id="\u6027\u80FD\u95EE\u9898\u6392\u67E5\u4E0E\u6536\u96C6" tabindex="-1">\u6027\u80FD\u95EE\u9898\u6392\u67E5\u4E0E\u6536\u96C6 <a class="header-anchor" href="#\u6027\u80FD\u95EE\u9898\u6392\u67E5\u4E0E\u6536\u96C6" aria-hidden="true">#</a></h2>
<p>\u9996\u5148\u9700\u8981\u6392\u67E5\u51FA\u9700\u8981\u4F18\u5316\u7684\u70B9\uFF0C\u8FD9\u4E2A\u6211\u4EEC\u53EF\u4EE5\u501F\u52A9 Chrome \u7684 DevTool \u6765\u6392\u67E5\u7F51\u7AD9\u4E2D\u7684\u6027\u80FD\u95EE\u9898\u3002</p>
<blockquote>
<p>\u6700\u597D\u5728\u9690\u8EAB\u6A21\u5F0F\u4E0B\u6536\u96C6\u4FE1\u606F\uFF0C\u907F\u514D\u4E00\u4E9B\u63D2\u4EF6\u7684\u5F71\u54CD\u3002</p>
</blockquote>
<h3 id="performance" tabindex="-1">Performance <a class="header-anchor" href="#performance" aria-hidden="true">#</a></h3>
<p>\u7B2C\u4E00\u79CD\u65B9\u5F0F\u53EF\u4EE5\u501F\u52A9 Performance \u9762\u677F\u6765\u91C7\u96C6\u4FE1\u606F\uFF0C\u5C55\u5F00 Main \u9762\u677F\uFF0C\u53EF\u4EE5\u770B\u5230\u4EE3\u7801\u8FD0\u884C\u7684\u4FE1\u606F\u3002\u4E0D\u8FC7 Performance \u9762\u677F\u4E2D\u5185\u5BB9\u8F83\u591A\uFF0C\u8FD8\u5305\u542B\u4E86\u6E32\u67D3\u3001\u7F51\u7EDC\u3001\u5185\u5B58\u7B49\u5176\u5B83\u7684\u4FE1\u606F\uFF0C\u89C6\u89C9\u5E72\u6270\u6BD4\u8F83\u4E25\u91CD\u3002\u867D\u7136\u5F88\u5F3A\u5927\u4F46\u662F\u505A\u7EAF JS \u6027\u80FD\u6392\u67E5\u65F6\u4E0D\u63A8\u8350\u4F7F\u7528\uFF0C\u4ECA\u5929\u4E3B\u8981\u4ECB\u7ECD\u53E6\u4E00\u79CD\u65B9\u5F0F\u3002</p>
<p><img src="/image/blog-2019-console-performance-85.png" alt="picture 5"></p>
<h3 id="javascript-profiler" tabindex="-1">JavaScript Profiler <a class="header-anchor" href="#javascript-profiler" aria-hidden="true">#</a></h3>
<p>\u8FD8\u6709\u4E00\u79CD\u65B9\u5F0F\u662F\u501F\u52A9 JavaScript Profiler\uFF0CJavaScript Profiler \u9ED8\u8BA4\u662F\u9690\u85CF\u7684\uFF0C\u9700\u8981\u5728 DevTool \u53F3\u4E0A\u89D2\u7684\u66F4\u591A\u6309\u94AE\uFF08\u4E09\u4E2A\u70B9\u7684\u6309\u94AE\uFF09 =&gt; More tools \u4E2D\u6253\u5F00\u3002</p>
<p><img src="/image/blog-2019-console-performance-83.png" alt="picture 6"></p>
<p>\u53EF\u4EE5\u770B\u5230 JavaScript Profiler \u9762\u677F\u8F83 Performance \u9762\u677F\u6BD4\u8D77\u6765\u7B80\u5355\u591A\u4E86\uFF0C\u5DE6\u4FA7\u6700\u4E0A\u65B9\u4E00\u6392\u6309\u94AE\u53EF\u4EE5\u6536\u96C6\u3001\u5220\u9664\u3001\u5783\u573E\u56DE\u6536\uFF08\u53EF\u80FD\u662F\u7528\u6765\u5F3A\u5236\u6267\u884C GC \u7684\uFF0C\u4E0D\u592A\u786E\u5B9A\uFF09\uFF0C\u53EF\u4EE5\u6536\u96C6\u591A\u6B21 Profiler \u8FDB\u884C\u6BD4\u5BF9\u3002</p>
<p>\u53F3\u4FA7\u662F Profiler \u7684\u5C55\u793A\u533A\u57DF\uFF0C\u4E0A\u65B9\u53EF\u4EE5\u5207\u6362\u5C55\u793A\u6A21\u5F0F\uFF0C\u5305\u62EC Chart\u3001Heavy\u3001Tree \u4E09\u79CD\u6A21\u5F0F\uFF0C\u8FD9\u91CC\u63A8\u8350 Chart\uFF0C\u6700\u76F4\u89C2\uFF0C\u4E5F\u662F\u6700\u6613\u61C2\u7684\u3002</p>
<p>Chart \u9762\u677F\u4E0A\u65B9\u4E3A\u56FE\u8868\uFF0C\u7EB5\u8F74\u4E3A CPU \u7684\u4F7F\u7528\u7387\uFF0C\u6A2A\u8F74\u662F\u65F6\u95F4\u8F74\uFF0C\u7EB5\u8F74\u662F\u8C03\u7528\u6808\u6DF1\u5EA6\u3002\u4E0B\u65B9\u4E3A\u4EE3\u7801\u6267\u884C\u7684\u65F6\u95F4\u7247\u6BB5\u4FE1\u606F\uFF0C\u957F\u5EA6\u8F83\u957F\u7684\u65F6\u95F4\u7247\u6BB5\u4F1A\u5728\u9875\u9762\u4E2D\u9020\u6210\u660E\u663E\u7684\u5361\u987F\uFF0C\u9700\u8981\u91CD\u70B9\u6392\u67E5\u3002</p>
<p>\u5728 Chart \u9762\u677F\u4E2D\uFF0C\u4E0A\u4E0B\u6EDA\u52A8\u4F1A\u5C06\u56FE\u5F62\u8FDB\u884C\u653E\u5927\u7F29\u5C0F\uFF0C\u5DE6\u53F3\u6EDA\u52A8\u4E3A\u6EDA\u52A8\u65F6\u95F4\u8F74\uFF0C\u4E5F\u53EF\u4EE5\u5728\u56FE\u8868\u4E2D\u8FDB\u884C\u9F20\u6807\u5708\u9009\u548C\u62D6\u52A8\u3002CMD + f \u53EF\u4EE5\u8FDB\u884C\u641C\u7D22\uFF0C\u5728\u60F3\u8981\u67E5\u627E\u5BF9\u5E94\u4EE3\u7801\u6027\u80FD\u7684\u65F6\u5019\u6BD4\u8F83\u65B9\u4FBF\u3002</p>
<p>\u901A\u8FC7 JavaScript Profiler \u9762\u677F\u53EF\u4EE5\u5F88\u65B9\u9762\u7684\u6392\u67E5\u51FA\u6027\u80FD\u5F02\u5E38\u7684\u4EE3\u7801\u3002</p>
<p><img src="/image/blog-2019-console-performance-4.png" alt="picture 7"></p>
<p>\u6BD4\u5982\u56FE\u4E2D\u7684 n.bootstrap\uFF0C\u6267\u884C\u65F6\u95F4\u4E3A 354.3ms\uFF0C\u663E\u7136\u4F1A\u9020\u6210\u6BD4\u8F83\u4E25\u91CD\u7684\u5361\u987F\u3002</p>
<p><img src="/image/blog-2019-console-performance-71.png" alt="picture 9"></p>
<p>\u8FD8\u53EF\u4EE5\u987A\u7740\u65F6\u95F4\u7247\u6BB5\u5F80\u4E0B\u6DF1\u7A76\u5230\u5E95\u662F\u54EA\u4E2A\u6B65\u9AA4\u8017\u65F6\u8F83\u957F\uFF0C\u4ECE\u4E0A\u9762\u53EF\u4EE5\u770B\u5230\u5176\u4E2D l.initState \u8017\u65F6 173ms\uFF0C\u4E0B\u9762\u662F\u51E0\u4E2A forEach\uFF0C\u663E\u7136\u662F\u8FD9\u91CC\u7684\u5FAA\u73AF\u6027\u80FD\u6D88\u8017\u6BD4\u8F83\u5927\uFF0C\u70B9\u51FB\u65F6\u95F4\u7247\u6BB5\u4F1A\u8DF3\u8F6C\u5230 source \u9762\u677F\u7684\u5BF9\u5E94\u4EE3\u7801\u4E2D\uFF0C\u6392\u67E5\u8D77\u6765\u975E\u5E38\u65B9\u4FBF\u3002</p>
<p>\u501F\u52A9 JavaScript Profiler\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5C06\u6240\u6709\u65F6\u95F4\u8F83\u957F\u3001\u53EF\u80FD\u6709\u6027\u80FD\u95EE\u9898\u7684\u4EE3\u7801\u5168\u90E8\u6574\u7406\u51FA\u6765\uFF0C\u653E\u5230\u4EE3\u529E\u5217\u8868\u4E2D\uFF0C\u7B49\u5F85\u8FDB\u4E00\u6B65\u6392\u67E5\u3002</p>
<h3 id="console-time" tabindex="-1">console.time <a class="header-anchor" href="#console-time" aria-hidden="true">#</a></h3>
<p>\u501F\u52A9 Profiler \u8FDB\u884C\u95EE\u9898\u4EE3\u7801\u6574\u7406\u5F88\u65B9\u4FBF\uFF0C\u4F46\u662F\u5728\u5B9E\u9645\u8C03\u4F18\u8FC7\u7A0B\u4E2D\u5374\u6709\u70B9\u9EBB\u70E6\uFF0C\u56E0\u4E3A\u6BCF\u6B21\u8C03\u8BD5\u90FD\u9700\u8981\u6267\u884C\u4E00\u6B21\u6536\u96C6\uFF0C\u6536\u96C6\u5B8C\u4E86\u8FD8\u9700\u8981\u627E\u5230\u5F53\u524D\u8C03\u8BD5\u7684\u70B9\uFF0C\u65E0\u5F62\u4E2D\u4F1A\u6D6A\u8D39\u5F88\u591A\u65F6\u95F4\uFF0C\u6240\u4EE5\u5B9E\u9645\u8C03\u4F18\u8FC7\u7A0B\u4E2D\u6211\u4EEC\u4F1A\u9009\u62E9\u5176\u4ED6\u7684\u65B9\u5F0F\uFF0C\u6BD4\u5982\u8BA1\u7B97\u51FA\u65F6\u95F4\u6233\u5DEE\u503C\u7136\u540E log \u51FA\u6765\uFF0C\u4E0D\u8FC7\u5176\u5B9E\u6709\u66F4\u65B9\u4FBF\u7684\u65B9\u5F0F - console.time\u3002</p>
<div class="language-js"><pre><code><span class="token keyword">const</span> <span class="token function-variable function">doSomething</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">100000</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> i <span class="token operator">*</span> i<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// start a time log</span>
console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token string">'time log name'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// log time</span>
console<span class="token punctuation">.</span><span class="token function">timeLog</span><span class="token punctuation">(</span><span class="token string">'time log name'</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// log time</span>
console<span class="token punctuation">.</span><span class="token function">timeLog</span><span class="token punctuation">(</span><span class="token string">'time log name'</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">doSomething</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// log time and end timer</span>
console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token string">'time log name'</span><span class="token punctuation">,</span> <span class="token string">'end'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>console.time \u76EE\u524D\u5927\u90E8\u5206\u6D4F\u89C8\u5668\u5DF2\u7ECF\u652F\u6301\uFF0C\u901A\u8FC7 console.time \u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u6253\u5370\u51FA\u4E00\u6BB5\u4EE3\u7801\u7684\u6267\u884C\u65F6\u95F4\u3002</p>
<ul>
<li>console.time \u63A5\u6536\u4E00\u4E2A\u53C2\u6570\u6807\u8BC6\u5E76\u5F00\u542F\u4E00\u4E2A timer\uFF0C\u968F\u540E\u53EF\u4F7F\u7528\u8FD9\u4E2A timer \u7684\u6807\u8BC6\u6765\u6267\u884C timeLog \u548C timeEnd</li>
<li>timeLog \u63A5\u6536 1-n \u4E2A\u53C2\u6570\uFF0C\u7B2C\u4E00\u4E2A\u4E3A timer \u6807\u8BC6\uFF0C\u5176\u540E\u7684\u4E3A\u53EF\u9009\u53C2\u6570\uFF0C\u6267\u884C\u540E\u4F1A\u6253\u5370\u51FA\u5F53\u524D timer \u7684\u5DEE\u65F6\uFF0C\u4EE5\u53CA\u4F20\u5165\u7684\u5176\u5B83\u53EF\u9009\u53C2\u6570</li>
<li>timeEnd \u548C timeLog \u7C7B\u4F3C\uFF0C\u4E0D\u540C\u7684\u662F\u4E0D\u4F1A\u63A5\u53D7\u591A\u4F59\u53EF\u9009\u53C2\u6570\u5E76\u4F1A\u5728\u6267\u884C\u540E\u5173\u95ED\u8FD9\u4E2A timer</li>
<li>\u4E0D\u80FD\u540C\u65F6\u542F\u7528\u591A\u4E2A\u540C\u6837\u6807\u8BC6\u7684 timer</li>
<li>\u4E00\u4E2A timer \u7ED3\u675F\u540E\uFF0C\u53EF\u4EE5\u518D\u6B21\u5F00\u542F\u4E00\u4E2A\u540C\u540D timer</li>
</ul>
<p><img src="/image/blog-2019-console-performance-64.png" alt="picture 10"></p>
<p>\u901A\u8FC7 console.time \u6211\u4EEC\u53EF\u4EE5\u76F4\u89C2\u7684\u770B\u5230\u4E00\u6BB5\u4EE3\u7801\u7684\u6267\u884C\u65F6\u957F\uFF0C\u6BCF\u6B21\u6539\u52A8\u540E\u9875\u9762\u5237\u65B0\u5C31\u80FD\u770B\u5230 log\uFF0C\u4ECE\u800C\u770B\u5230\u6539\u52A8\u540E\u7684\u5F71\u54CD\u3002</p>
<h2 id="\u6027\u80FD\u95EE\u9898\u6574\u7406\u548C\u4F18\u5316" tabindex="-1">\u6027\u80FD\u95EE\u9898\u6574\u7406\u548C\u4F18\u5316 <a class="header-anchor" href="#\u6027\u80FD\u95EE\u9898\u6574\u7406\u548C\u4F18\u5316" aria-hidden="true">#</a></h2>
<p>\u501F\u52A9 JavaScript Profiler\uFF0C\u4ECE\u63A7\u5236\u53F0\u4E2D\u6392\u67E5\u51FA\u591A\u5904\u6027\u80FD\u4F18\u5316\u70B9\u3002\uFF08\u4EE5\u4E0B\u65F6\u95F4\u4E3A\u672C\u5730\u8C03\u8BD5\u5E76\u5F00\u7740 DevTool \u65F6\u7684\u6570\u636E\uFF0C\u6BD4\u5B9E\u9645\u60C5\u51B5\u8F83\u9AD8\uFF09</p>
<table>
<thead>
<tr>
<th>\u540D\u79F0</th>
<th>\u4F4D\u7F6E</th>
<th>\u5355\u6B21\u8017\u65F6</th>
<th>\u9996\u6B21\u6267\u884C\u6B21\u6570</th>
<th>\u5207\u6362\u6267\u884C\u6B21\u6570</th>
</tr>
</thead>
<tbody>
<tr>
<td>initState</td>
<td>route.extend.js:148</td>
<td>200ms - 400ms</td>
<td>1</td>
<td>0</td>
</tr>
<tr>
<td>initRegionHash</td>
<td>s_region.js:217</td>
<td>50ms - 110ms</td>
<td>1</td>
<td>0</td>
</tr>
<tr>
<td>getMenu</td>
<td>s_top_menu.js:53</td>
<td>0 - 40ms</td>
<td>4</td>
<td>3</td>
</tr>
<tr>
<td>initRegion</td>
<td>s_region.js:105, QuickMenuWrapper/index.jsx:72</td>
<td>70ms - 200ms</td>
<td>1</td>
<td>0</td>
</tr>
<tr>
<td>getProducts</td>
<td>s_globalAction.js:73</td>
<td>40ms - 80ms</td>
<td>1</td>
<td>2</td>
</tr>
<tr>
<td>getNav</td>
<td>s_userinfo:58</td>
<td>40ms - 200ms</td>
<td>2</td>
<td>0</td>
</tr>
<tr>
<td>extendProductTrans</td>
<td>s_translateLoader.js:114</td>
<td>40ms - 120ms</td>
<td>1</td>
<td>1</td>
</tr>
<tr>
<td>filterStorageMenu</td>
<td>QuickMenu.jsx:198</td>
<td>4ms - 10ms</td>
<td>1</td>
<td>0</td>
</tr>
<tr>
<td>filterTopNavShow</td>
<td>EditPanel.jsx:224</td>
<td>0 - 20ms</td>
<td>7</td>
<td>3</td>
</tr>
</tbody>
</table>
<p>\u6839\u636E\u5217\u51FA\u7684\u6392\u67E5\u7684\u70B9\uFF0C\u5177\u4F53\u6392\u9664\u6027\u80FD\u95EE\u9898\u3002\u4E0B\u9762\u5217\u4E00\u4E9B\u6BD4\u8F83\u5178\u578B\u7684\u95EE\u9898\u70B9\u3002</p>
<h3 id="\u62C6\u5206\u5FAA\u73AF\u4E2D\u7684\u4EFB\u52A1" tabindex="-1">\u62C6\u5206\u5FAA\u73AF\u4E2D\u7684\u4EFB\u52A1 <a class="header-anchor" href="#\u62C6\u5206\u5FAA\u73AF\u4E2D\u7684\u4EFB\u52A1" aria-hidden="true">#</a></h3>
<div class="language-js"><pre><code><span class="token keyword">var</span> <span class="token function-variable function">localeFilesHandle</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">files</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[^\\/\\\\\\:\\*\\"\\&lt;\\>\\|\\?\\.]+(?=\\.json)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
    _<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span>files<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">file<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// some code</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> <span class="token function-variable function">loadFilesHandle</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">files</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[^\\/\\\\\\:\\*\\"\\&lt;\\>\\|\\?\\.]+(?=\\.json)</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
    _<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span>files<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">file<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// some code</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

self<span class="token punctuation">.</span><span class="token function-variable function">initState</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span> common</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token string">'initState'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// some code</span>
    _<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span>filterDatas<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> route <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> common<span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> loadFiles <span class="token operator">=</span> <span class="token function">loadFilesHandle</span><span class="token punctuation">(</span>route<span class="token punctuation">[</span><span class="token string">'files'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> localeFiles <span class="token operator">=</span> <span class="token function">localeFilesHandle</span><span class="token punctuation">(</span>route<span class="token punctuation">[</span><span class="token string">'files'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        route<span class="token punctuation">[</span><span class="token string">'loadfiles'</span><span class="token punctuation">]</span> <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">union</span><span class="token punctuation">(</span>route<span class="token punctuation">[</span><span class="token string">'common_files'</span><span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> loadFiles<span class="token punctuation">)</span><span class="token punctuation">;</span>
        route<span class="token punctuation">[</span><span class="token string">'localeFiles'</span><span class="token punctuation">]</span> <span class="token operator">=</span> localeFiles<span class="token punctuation">;</span>
        routes<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> route<span class="token punctuation">;</span>
        $stateProvider<span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> route<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// some code</span>
    console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token string">'initState'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>initState \u4E2D\uFF0CfilterDatas \u4E3A\u4E00\u4E2A\u8FD1 1000 \u4E2A key \u7684\u8DEF\u7531 map\uFF0C\u521D\u59CB\u5316\u662F\u9700\u8981\u53BB ui-router \u4E2D\u6CE8\u518C\u8DEF\u7531\u4FE1\u606F\uFF0C$stateProvider.state \u662F\u6CA1\u529E\u6CD5\u7701\u7565\u4E86\uFF0C\u4F46\u662F \u4E24\u4E2A files \u53EF\u4EE5\u5EF6\u540E\u5316\u5904\u7406\uFF0C\u5728\u62C9\u53D6\u6587\u4EF6\u65F6\u518D\u53BB\u83B7\u53D6\u6587\u4EF6\u5217\u8868\u3002</p>
<div class="language-js"><pre><code>self<span class="token punctuation">.</span><span class="token function-variable function">initState</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data<span class="token punctuation">,</span> common</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token string">'initState'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// some code</span>
    <span class="token comment">//\u6DFB\u52A0\u8DEF\u7531\u5230state</span>
    _<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span>filterDatas<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> route <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> common<span class="token punctuation">,</span> state<span class="token punctuation">)</span><span class="token punctuation">;</span>
        routes<span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token operator">=</span> route<span class="token punctuation">;</span>
        $stateProvider<span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> route<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// some code</span>
    console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token string">'initState'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// when load files</span>
<span class="token operator">!</span>toState<span class="token punctuation">.</span>loadfiles <span class="token operator">&amp;&amp;</span>
    <span class="token punctuation">(</span>toState<span class="token punctuation">.</span>loadfiles <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">union</span><span class="token punctuation">(</span>toState<span class="token punctuation">[</span><span class="token string">'common_files'</span><span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> $UStateExtend<span class="token punctuation">.</span><span class="token function">loadFilesHandle</span><span class="token punctuation">(</span>toState<span class="token punctuation">[</span><span class="token string">'files'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token operator">!</span>toState<span class="token punctuation">.</span>localeFiles <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>toState<span class="token punctuation">.</span>localeFiles <span class="token operator">=</span> $UStateExtend<span class="token punctuation">.</span><span class="token function">localeFilesHandle</span><span class="token punctuation">(</span>toState<span class="token punctuation">[</span><span class="token string">'files'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u7ECF\u8FC7\u51CF\u5C11\u8FED\u4EE3\u4E2D\u7684\u4EFB\u52A1\uFF0CinitState \u901F\u5EA6\u63D0\u5347\u4E86 30% - 40%\u3002</p>
<h3 id="\u7406\u6E05\u903B\u8F91" tabindex="-1">\u7406\u6E05\u903B\u8F91 <a class="header-anchor" href="#\u7406\u6E05\u903B\u8F91" aria-hidden="true">#</a></h3>
<div class="language-js"><pre><code><span class="token keyword">var</span> bitMaps <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// map info</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">getUserRights</span><span class="token punctuation">(</span><span class="token parameter">bits<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> map <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    _<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span>bitMaps<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">val<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        map<span class="token punctuation">[</span>key<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> val<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> map <span class="token operator">&amp;&amp;</span> map<span class="token punctuation">[</span><span class="token punctuation">(</span>key <span class="token operator">||</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token operator">+</span>bits<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>map<span class="token punctuation">[</span><span class="token punctuation">(</span>key <span class="token operator">||</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</div><p>getUserRights \u4E2D\u53EF\u4EE5\u770B\u5230\u6BCF\u6B21\u90FD\u4F1A\u53BB\u5BF9 bitMaps \u505A\u4E00\u6B21\u904D\u5386\uFF0C\u800C bitMaps \u672C\u8EAB\u4E0D\u4F1A\u6709\u4EFB\u4F55\u53D8\u5316\uFF0C\u6240\u4EE5\u8FD9\u91CC\u5176\u5B9E\u53EA\u9700\u8981\u5728\u521D\u59CB\u5316\u65F6\u505A\u4E00\u6B21\u904D\u5386\u5C31\u53EF\u4EE5\u4E86\uFF0C\u6216\u8005\u5728\u521D\u6B21\u904D\u5386\u540E\u505A\u597D\u7F13\u5B58\u3002</p>
<div class="language-js"><pre><code><span class="token keyword">var</span> _bitMaps <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// map info</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> bitMaps <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
_<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span>_bitMaps<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    bitMaps<span class="token punctuation">[</span>key<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> value<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">getUserRights</span><span class="token punctuation">(</span><span class="token parameter">bits<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    key <span class="token operator">=</span> <span class="token punctuation">(</span>key <span class="token operator">||</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> bitMaps<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token operator">!</span><span class="token operator">!</span><span class="token operator">+</span>bits<span class="token punctuation">.</span><span class="token function">charAt</span><span class="token punctuation">(</span>bitMaps<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</div><p>\u7ECF\u8FC7\u4E0A\u8FF0\u6539\u52A8\uFF0CgetUserRights \u7684\u6548\u7387\u63D0\u5347\u4E86 90+%\uFF0C\u800C\u4E0A\u8FF0\u5F88\u591A\u6027\u80FD\u95EE\u9898\u70B9\u4E2D\u90FD\u591A\u6B21\u8C03\u7528\u4E86 getUserRights\uFF0C\u6240\u4EE5\u8FD9\u70B9\u6539\u52A8\u5C31\u80FD\u5E26\u6765\u660E\u663E\u7684\u6027\u80FD\u63D0\u5347\u3002</p>
<h3 id="\u5584\u7528\u4F4D\u8FD0\u7B97" tabindex="-1">\u5584\u7528\u4F4D\u8FD0\u7B97 <a class="header-anchor" href="#\u5584\u7528\u4F4D\u8FD0\u7B97" aria-hidden="true">#</a></h3>
<div class="language-js"><pre><code><span class="token keyword">var</span> <span class="token function-variable function">buildRegionBitMaps</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">bit<span class="token punctuation">,</span> rBit</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> result<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>bit <span class="token operator">||</span> <span class="token operator">!</span>rBit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">''</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">var</span> zoneBit <span class="token operator">=</span> <span class="token punctuation">(</span>bit <span class="token operator">+</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> regionBit <span class="token operator">=</span> <span class="token punctuation">(</span>rBit <span class="token operator">+</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> forList <span class="token operator">=</span> zoneBit<span class="token punctuation">.</span>length <span class="token operator">></span> regionBit<span class="token punctuation">.</span>length <span class="token operator">?</span> zoneBit <span class="token operator">:</span> regionBit<span class="token punctuation">;</span>
    <span class="token keyword">var</span> diffList <span class="token operator">=</span> zoneBit<span class="token punctuation">.</span>length <span class="token operator">></span> regionBit<span class="token punctuation">.</span>length <span class="token operator">?</span> regionBit <span class="token operator">:</span> zoneBit<span class="token punctuation">;</span>
    <span class="token keyword">var</span> resultList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    _<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span>forList<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">v<span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        resultList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token function">parseInt</span><span class="token punctuation">(</span>diffList<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    result <span class="token operator">=</span> resultList<span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> <span class="token function-variable function">initRegionsHash</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// some code</span>
    _<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">o</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>regionsHash<span class="token punctuation">[</span>o<span class="token punctuation">[</span><span class="token string">'Region'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            regionsHash<span class="token punctuation">[</span>o<span class="token punctuation">[</span><span class="token string">'Region'</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            regionsHash<span class="token punctuation">[</span><span class="token string">'regionBits'</span><span class="token punctuation">]</span><span class="token punctuation">[</span>o<span class="token punctuation">[</span><span class="token string">'Region'</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> o<span class="token punctuation">[</span><span class="token string">'BitMaps'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            regionsList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>o<span class="token punctuation">[</span><span class="token string">'Region'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        regionsHash<span class="token punctuation">[</span><span class="token string">'regionBits'</span><span class="token punctuation">]</span><span class="token punctuation">[</span>o<span class="token punctuation">[</span><span class="token string">'Region'</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">buildRegionBitMaps</span><span class="token punctuation">(</span>
            o<span class="token punctuation">[</span><span class="token string">'BitMaps'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            regionsHash<span class="token punctuation">[</span><span class="token string">'regionBits'</span><span class="token punctuation">]</span><span class="token punctuation">[</span>o<span class="token punctuation">[</span><span class="token string">'Region'</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
        regionsHash<span class="token punctuation">[</span>o<span class="token punctuation">[</span><span class="token string">'Region'</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>o<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// some code</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>buildRegionBitMaps \u662F\u5C06\u4E24\u4E2A 512 \u4F4D\u957F\uFF08\u770B\u5F53\u524D\u4EE3\u7801\uFF0C\u957F\u5EA6\u672A\u5FC5\u56FA\u5B9A\uFF09\u7684\u6743\u9650\u4F4D\u4E8C\u8FDB\u5236\u5B57\u7B26\u4E32\u8FDB\u884C\u5408\u5E76\uFF0C\u8BA1\u7B97\u51FA\u5B9E\u9645\u7684\u6743\u9650\uFF0C\u76EE\u524D\u7684\u4EE3\u7801\u5C06\u4E8C\u8FDB\u5236\u5B57\u7B26\u4E32\u62C6\u89E3\u4E3A\u6570\u7EC4\uFF0C\u7136\u540E\u904D\u5386\u53BB\u8BA1\u7B97\u51FA\u6BCF\u4E00\u4F4D\u7684\u6743\u9650\uFF0C\u6548\u7387\u8F83\u4F4E\u3002initRegionsHash \u4E2D\u4F1A\u8C03\u7528\u591A\u6B21 buildRegionBitMaps\uFF0C\u5BFC\u81F4\u8FD9\u91CC\u7684\u6027\u80FD\u95EE\u9898\u88AB\u653E\u5927\u3002</p>
<p>\u8FD9\u91CC\u53EF\u4EE5\u4F7F\u7528\u4F4D\u8FD0\u7B97\u6765\u65B9\u4FBF\u7684\u8BA1\u7B97\u51FA\u6743\u9650\uFF0C\u6548\u7387\u4F1A\u6BD4\u6570\u7EC4\u904D\u5386\u9AD8\u5F88\u591A\u3002</p>
<div class="language-js"><pre><code><span class="token keyword">var</span> <span class="token function-variable function">buildRegionBitMaps</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">bit<span class="token punctuation">,</span> rBit</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>bit <span class="token operator">||</span> <span class="token operator">!</span>rBit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">''</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> longBit<span class="token punctuation">,</span> shortBit<span class="token punctuation">,</span> shortBitLength<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bit<span class="token punctuation">.</span>length <span class="token operator">></span> rBit<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        longBit <span class="token operator">=</span> bit<span class="token punctuation">;</span>
        shortBit <span class="token operator">=</span> rBit<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        longBit <span class="token operator">=</span> rBit<span class="token punctuation">;</span>
        shortBit <span class="token operator">=</span> bit<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    shortBitLength <span class="token operator">=</span> shortBit<span class="token punctuation">.</span>length<span class="token punctuation">;</span>
    <span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> limit <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> remainder <span class="token operator">=</span> shortBitLength <span class="token operator">%</span> <span class="token number">30</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> mergeLength <span class="token operator">=</span> shortBitLength <span class="token operator">-</span> remainder<span class="token punctuation">;</span>
    <span class="token keyword">var</span> <span class="token function-variable function">mergeString</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">s<span class="token punctuation">,</span> e</span><span class="token punctuation">)</span> <span class="token operator">=></span>
        <span class="token punctuation">(</span><span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">'1'</span> <span class="token operator">+</span> longBit<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token function">parseInt</span><span class="token punctuation">(</span><span class="token string">'1'</span> <span class="token operator">+</span> shortBit<span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span>s<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">substring</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> mergeLength<span class="token punctuation">;</span> <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> n <span class="token operator">=</span> i <span class="token operator">+</span> limit<span class="token punctuation">;</span>
        result <span class="token operator">+=</span> <span class="token function">mergeString</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
        i <span class="token operator">=</span> n<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>remainder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        result <span class="token operator">+=</span> <span class="token function">mergeString</span><span class="token punctuation">(</span>mergeLength<span class="token punctuation">,</span> shortBitLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> result <span class="token operator">+</span> longBit<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>shortBitLength<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u901A\u8FC7\u4E0A\u8FF0\u6539\u52A8\uFF0CinitRegionHash \u8FD0\u884C\u65F6\u95F4\u88AB\u4F18\u5316\u5230 2ms - 8ms\uFF0C\u63D0\u5347 90+%\u3002\u6CE8\u610F JavaScript \u4E2D\u4F4D\u8FD0\u7B97\u57FA\u4E8E 32 \u4F4D\uFF0C\u8D85\u8FC7 32 \u4F4D\u6EA2\u51FA\uFF0C\u6240\u4EE5\u4E0A\u9762\u62C6\u89E3\u4E3A 30 \u4F4D\u7684\u5B57\u7B26\u4E32\u8FDB\u884C\u5408\u5E76\u3002</p>
<h3 id="\u51CF\u5C11\u91CD\u590D\u4EFB\u52A1" tabindex="-1">\u51CF\u5C11\u91CD\u590D\u4EFB\u52A1 <a class="header-anchor" href="#\u51CF\u5C11\u91CD\u590D\u4EFB\u52A1" aria-hidden="true">#</a></h3>
<div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    currentTrans <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    angular<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>products<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">product<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setLoaded</span><span class="token punctuation">(</span>product<span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>options<span class="token punctuation">.</span>key<span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        currentTrans <span class="token operator">=</span> <span class="token function">extendProduct</span><span class="token punctuation">(</span>product<span class="token punctuation">[</span><span class="token string">'name'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>options<span class="token punctuation">.</span>key<span class="token punctuation">,</span> CNlan<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    currentTrans <span class="token operator">=</span> <span class="token function">extendProduct</span><span class="token punctuation">(</span>Loader<span class="token punctuation">.</span>cname<span class="token operator">||</span><span class="token string">'common'</span><span class="token punctuation">,</span>options<span class="token punctuation">.</span>key<span class="token punctuation">,</span> CNlan<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>$rootScope<span class="token punctuation">.</span>reviseTrans<span class="token punctuation">)</span><span class="token punctuation">{</span>
        currentTrans <span class="token operator">=</span> Loader<span class="token punctuation">.</span><span class="token function">changeTrans</span><span class="token punctuation">(</span>$rootScope<span class="token punctuation">.</span>reviseNoticeSet<span class="token punctuation">,</span>currentTrans<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    deferred<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>currentTrans<span class="token punctuation">[</span>options<span class="token punctuation">.</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</div><p>\u4E0A\u8FF0\u4EE3\u7801\u88AB\u7528\u6765\u8FDB\u884C\u4EA7\u54C1\u8BED\u8A00\u7684\u5408\u5E76\uFF0Cproducts \u4E2D\u662F\u8DEF\u7531\u5BF9\u5E94\u7684\u4EA7\u54C1\u540D\uFF0C\u4F1A\u6709\u91CD\u590D\uFF0C\u5176\u4E2D common \u7684\u8BED\u8A00\u8F83\u5927\uFF0C\u6709 1W \u591A\u4E2A key\uFF0C\u6240\u4EE5\u5408\u5E76\u65F6\u8017\u65F6\u8F83\u4E3A\u4E25\u91CD\u3002</p>
<div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token string">'extendTrans'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    currentTrans <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> productNameList <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">union</span><span class="token punctuation">(</span>_<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>products<span class="token punctuation">,</span> <span class="token parameter">product</span> <span class="token operator">=></span> product<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> cname <span class="token operator">=</span> Loader<span class="token punctuation">.</span>cname <span class="token operator">||</span> <span class="token string">'common'</span><span class="token punctuation">;</span>
    angular<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>productNameList<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">productName<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">setLoaded</span><span class="token punctuation">(</span>productName<span class="token punctuation">,</span> options<span class="token punctuation">.</span>key<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>productName <span class="token operator">===</span> cname <span class="token operator">||</span> productName <span class="token operator">===</span> <span class="token string">'common'</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token function">extendProduct</span><span class="token punctuation">(</span>productName<span class="token punctuation">,</span> options<span class="token punctuation">.</span>key<span class="token punctuation">,</span> CNlan<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">extendProduct</span><span class="token punctuation">(</span><span class="token string">'common'</span><span class="token punctuation">,</span> options<span class="token punctuation">.</span>key<span class="token punctuation">,</span> CNlan<span class="token punctuation">)</span><span class="token punctuation">;</span>
    cname <span class="token operator">!==</span> <span class="token string">'common'</span> <span class="token operator">&amp;&amp;</span> <span class="token function">extendProduct</span><span class="token punctuation">(</span>cname<span class="token punctuation">,</span> options<span class="token punctuation">.</span>key<span class="token punctuation">,</span> CNlan<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>$rootScope<span class="token punctuation">.</span>reviseTrans<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        currentTrans <span class="token operator">=</span> Loader<span class="token punctuation">.</span><span class="token function">changeTrans</span><span class="token punctuation">(</span>$rootScope<span class="token punctuation">.</span>reviseNoticeSet<span class="token punctuation">,</span> currentTrans<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    deferred<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>currentTrans<span class="token punctuation">[</span>options<span class="token punctuation">.</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token string">'extendTrans'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre>
</div><p>\u8FD9\u8FB9\u5C06 product \u4E2D\u7684\u4EA7\u54C1\u540D\u53BB\u91CD\u51CF\u5C11\u5408\u5E76\u6B21\u6570\uFF0C\u7136\u540E\u5C06 common \u548C cname \u5BF9\u5E94\u7684\u8BED\u8A00\u5408\u5E76\u4ECE\u904D\u5386\u4E2D\u5254\u9664\uFF0C\u5728\u6700\u540E\u505A\u5408\u5E76\u6765\u51CF\u5C11\u5408\u5E76\u6B21\u6570\uFF0C\u51CF\u5C11\u524D\u671F\u5408\u5E76\u7684\u6570\u636E\u91CF\u3002\u7ECF\u8FC7\u6539\u52A8\u540E extendTrans \u901F\u5EA6\u63D0\u9AD8\u4E86 70+%\u3002</p>
<h3 id="\u5C3D\u65E9\u9000\u51FA" tabindex="-1">\u5C3D\u65E9\u9000\u51FA <a class="header-anchor" href="#\u5C3D\u65E9\u9000\u51FA" aria-hidden="true">#</a></h3>
<div class="language-js"><pre><code>user<span class="token punctuation">.</span><span class="token function-variable function">getNav</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>_<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>$rootScope<span class="token punctuation">.</span><span class="token constant">USER</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    _<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span>modules<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> show <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>list<span class="token punctuation">.</span>isAdmin <span class="token operator">===</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            show <span class="token operator">=</span> $rootScope<span class="token punctuation">.</span><span class="token constant">USER</span><span class="token punctuation">.</span>Admin <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">var</span> authBitKey <span class="token operator">=</span> list<span class="token punctuation">.</span>bitKey <span class="token operator">?</span> regionService<span class="token punctuation">.</span><span class="token function">getUserRights</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span>bitKey<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> show<span class="token punctuation">;</span>
        <span class="token keyword">var</span> item <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> list<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> show<span class="token punctuation">,</span>
            <span class="token literal-property property">authBitKey</span><span class="token operator">:</span> authBitKey
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>item<span class="token punctuation">.</span>isUserNav <span class="token operator">===</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>getNav \u4E2D\u7684 modules \u4E3A\u8DEF\u7531\uFF0C\u4E0A\u9762\u4E5F\u63D0\u5230\u8FC7\uFF0C\u8DEF\u7531\u8F83\u591A\u6709\u8FD1\u5343\uFF0C\u800C\u5728\u8FD9\u91CC\u7684\u904D\u5386\u4E2D\u8C03\u7528\u4E86 getUseRights\uFF0C\u5BFC\u81F4\u6027\u80FD\u635F\u5931\u4E25\u91CD\uFF0C\u5E76\u4E14\u53C8\u4E00\u4E2A\u975E\u5E38\u4E25\u91CD\u7684\u95EE\u9898\u662F\uFF0C\u5927\u90E8\u5206\u7684\u6570\u636E\u4F1A\u88AB isUserNav \u7B5B\u9664\u6389\u3002</p>
<div class="language-js"><pre><code>user<span class="token punctuation">.</span><span class="token function-variable function">getNav</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>_<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>$rootScope<span class="token punctuation">.</span><span class="token constant">USER</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">time</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">getNav</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    _<span class="token punctuation">.</span><span class="token function">each</span><span class="token punctuation">(</span>modules<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">list</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>list<span class="token punctuation">.</span>isUserNav <span class="token operator">!==</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

        <span class="token keyword">var</span> show <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>list<span class="token punctuation">.</span>isAdmin <span class="token operator">===</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            show <span class="token operator">=</span> $rootScope<span class="token punctuation">.</span><span class="token constant">USER</span><span class="token punctuation">.</span>Admin <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">var</span> authBitKey <span class="token operator">=</span> list<span class="token punctuation">.</span>bitKey <span class="token operator">?</span> regionService<span class="token punctuation">.</span><span class="token function">getUserRights</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span>bitKey<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">:</span> show<span class="token punctuation">;</span>
        <span class="token keyword">var</span> item <span class="token operator">=</span> _<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> list<span class="token punctuation">,</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">show</span><span class="token operator">:</span> show<span class="token punctuation">,</span>
            <span class="token literal-property property">authBitKey</span><span class="token operator">:</span> authBitKey
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        result<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">timeEnd</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">getNav</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u901A\u8FC7\u5C06\u5224\u65AD\u63D0\u524D\uFF0C\u5C3D\u65E9\u7ED3\u675F\u65E0\u610F\u4E49\u7684\u4EE3\u7801\uFF0C\u548C\u4E4B\u524D\u5BF9 getUserRights \u6240\u505A\u7684\u4F18\u5316\uFF0CgetNav \u7684\u901F\u5EA6\u63D0\u9AD8\u4E86 99%\u3002</p>
<h3 id="\u5584\u7528-lazy" tabindex="-1">\u5584\u7528 lazy <a class="header-anchor" href="#\u5584\u7528-lazy" aria-hidden="true">#</a></h3>
<div class="language-js"><pre><code><span class="token function-variable function">renderMenuList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> translateLoadingSuccess<span class="token punctuation">,</span> topMenu <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>translateLoadingSuccess<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> topMenu
        <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> filterTopNavShow <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$filter</span><span class="token punctuation">(</span><span class="token string">'filterTopNavShow'</span><span class="token punctuation">)</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> filterTopNavShow <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">INDEX_TOP_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token punctuation">(</span>item<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span>type<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span>
                <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">'uc-nav__edit-panel-item'</span> key<span class="token operator">=</span><span class="token punctuation">{</span>i<span class="token punctuation">}</span><span class="token operator">></span>
                    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">'uc-nav__edit-panel-item-title'</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token function">formatMessage</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> title <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">'uc-nav__edit-panel-item-content'</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>Row gutter<span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">12</span><span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">renderMenuProdList</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>Row<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u4E0A\u8FF0\u4EE3\u7801\u5728\u63A7\u5236\u53F0\u7684\u4E00\u4E2A\u83DC\u5355\u7F16\u8F91\u9762\u677F\u4E2D\uFF0C\u8FD9\u4E2A\u9762\u677F\u53EA\u6709\u7528\u6237\u70B9\u51FB\u4E86\u7F16\u8F91\u624D\u4F1A\u51FA\u73B0\uFF0C\u4F46\u662F\u73B0\u6709\u903B\u8F91\u5BFC\u81F4\u8FD9\u5757\u6570\u636E\u4F1A\u7ECF\u5E38\uFF0C\u4E00\u8FDB\u9875\u9762\u4F1A\u6267\u884C 7 \u6B21 filterTopNavShow\uFF0C\u5E76\u4E14\u8FD8\u4F1A\u91CD\u65B0\u6E32\u67D3\u3002</p>
<div class="language-js"><pre><code><span class="token function-variable function">renderMenuList</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> translateLoadingSuccess<span class="token punctuation">,</span> topMenu<span class="token punctuation">,</span> mode <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>translateLoadingSuccess<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>mode <span class="token operator">!==</span> <span class="token string">'edit'</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_lazyRender<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_lazyRender <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> menuList <span class="token operator">=</span> topMenu
        <span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> filterTopNavShow <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$filter</span><span class="token punctuation">(</span><span class="token string">'filterTopNavShow'</span><span class="token punctuation">)</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> filterTopNavShow <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">item <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> i</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">INDEX_TOP_</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token punctuation">(</span>item<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span>type<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token punctuation">(</span>
                <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">'uc-nav__edit-panel-item'</span> key<span class="token operator">=</span><span class="token punctuation">{</span>i<span class="token punctuation">}</span><span class="token operator">></span>
                    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">'uc-nav__edit-panel-item-title'</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token function">formatMessage</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">id</span><span class="token operator">:</span> title <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">'uc-nav__edit-panel-item-content'</span><span class="token operator">></span>
                        <span class="token operator">&lt;</span>Row gutter<span class="token operator">=</span><span class="token punctuation">{</span><span class="token number">12</span><span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">renderMenuProdList</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>Row<span class="token operator">></span>
                    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
                <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> menuList<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u8FD9\u8FB9\u7B80\u5355\u7684\u901A\u8FC7\u6DFB\u52A0\u4E00\u4E2A _lazyRender \u5B57\u6BB5\uFF0C\u5C06\u6E32\u67D3\u548C\u8BA1\u7B97\u5EF6\u8FDF\u5230\u521D\u6B21\u6253\u5F00\u65F6\u518D\u53BB\u505A\uFF0C\u907F\u514D\u4E86\u9875\u9762\u521D\u59CB\u5316\u65F6\u7684\u4E0D\u5FC5\u8981\u64CD\u4F5C\u3002</p>
<h2 id="\u6210\u679C" tabindex="-1">\u6210\u679C <a class="header-anchor" href="#\u6210\u679C" aria-hidden="true">#</a></h2>
<p>\u5148\u770B\u4E0B\u6539\u9020\u524D\u540E\u7684\u65F6\u95F4\u5BF9\u6BD4</p>
<table>
<thead>
<tr>
<th>\u540D\u79F0</th>
<th>\u5355\u6B21\u8017\u65F6</th>
<th>\u4F18\u5316\u6548\u679C</th>
</tr>
</thead>
<tbody>
<tr>
<td>initState</td>
<td>200ms - 400ms</td>
<td>120ms - 300ms\uFF0C\u51CF\u5C11 30%-40%</td>
</tr>
<tr>
<td>initRegionHash</td>
<td>50ms - 110ms</td>
<td>2ms - 8ms\uFF0C\u51CF\u5C11 90%</td>
</tr>
<tr>
<td>getMenu</td>
<td>0 - 40ms</td>
<td>0ms - 8ms\uFF0C\u51CF\u5C11 80%</td>
</tr>
<tr>
<td>initRegion</td>
<td>70ms - 200ms</td>
<td>3ms - 10ms\uFF0C\u51CF\u5C11 90%</td>
</tr>
<tr>
<td>getProducts</td>
<td>40ms - 80ms</td>
<td>3ms - 10ms\uFF0C\u51CF\u5C11 90%</td>
</tr>
<tr>
<td>getNav</td>
<td>40ms - 200ms</td>
<td>0ms - 2ms\uFF0C\u51CF\u5C11 99%</td>
</tr>
<tr>
<td>extendProductTrans</td>
<td>40ms - 120ms</td>
<td>10ms - 40ms \u51CF\u5C11 70%</td>
</tr>
<tr>
<td>filterStorageMenu</td>
<td>4ms - 10ms</td>
<td>0ms - 2ms\uFF0C\u51CF\u5C11 80%</td>
</tr>
<tr>
<td>filterTopNavShow</td>
<td>0 - 20ms</td>
<td>\u521D\u6B21\u52A0\u8F7D\u4E0D\u518D\u6267\u884C\uFF0C\u5C55\u5F00\u6267\u884C</td>
</tr>
</tbody>
</table>
<p>\u5BF9\u6BD4\u8FD8\u662F\u6BD4\u8F83\u660E\u663E\u7684\uFF0C\u5927\u90E8\u5206\u65F6\u95F4\u90FD\u63A7\u5236\u5728\u4E86 10ms \u4EE5\u5185\u3002</p>
<p>\u53EF\u4EE5\u518D\u770B\u4E00\u4E0B\u6539\u9020\u524D\u540E\u7684 Profiler \u7684\u56FE\u5F62\u3002</p>
<p>\u6539\u9020\u524D\uFF1A <img src="/image/blog-2019-console-performance-67.png" alt="picture 11"></p>
<p>\u6539\u9020\u540E\uFF1A <img src="/image/blog-2019-console-performance-24.png" alt="picture 12"></p>
<p>\u7ECF\u8FC7\u4F18\u5316\u53EF\u4EE5\u770B\u5230\u5F88\u591A\u5CF0\u503C\u90FD\u5DF2\u7ECF\u6D88\u5931\u4E86\uFF08\u5269\u4F59\u7684\u662F\u4E00\u4E9B\u76EE\u524D\u4E0D\u592A\u597D\u505A\u7684\u4F18\u5316\u70B9\uFF09\uFF0C\u8FDB\u5165\u9875\u9762\u548C\u5207\u6362\u4EA7\u54C1\u65F6\u4E5F\u80FD\u660E\u663E\u611F\u53D7\u5230\u5DEE\u5F02\u3002</p>
<h2 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3 <a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a></h2>
<p>\u4ECE\u4E0A\u8FF0\u4F18\u5316\u4EE3\u7801\u4E2D\u53EF\u4EE5\u770B\u5230\uFF0C\u5927\u90E8\u5206\u7684\u6027\u80FD\u95EE\u9898\u90FD\u662F\u7531\u5FAA\u73AF\u5E26\u6765\u7684\uFF0C\u4E00\u4E2A\u5C0F\u5C0F\u7684\u6027\u80FD\u95EE\u9898\u5728\u7ECF\u8FC7\u591A\u6B21\u5FAA\u73AF\u540E\u4E5F\u4F1A\u5E26\u6765\u4E25\u91CD\u7684\u5F71\u54CD\uFF0C\u6240\u4EE5\u5E73\u65F6\u4EE3\u7801\u65F6\u5F88\u591A\u4E1C\u897F\u8FD8\u662F\u9700\u8981\u5C3D\u53EF\u80FD\u6CE8\u610F\uFF0C\u6BD4\u5982\u80FD\u5C3D\u5FEB\u7ED3\u675F\u7684\u4EE3\u7801\u5C31\u5C3D\u5FEB\u7ED3\u675F\uFF0C\u6CA1\u6709\u5FC5\u8981\u7684\u64CD\u4F5C\u4E00\u6982\u7701\u7565\uFF0C\u8BE5\u505A\u7F13\u5B58\u7684\u505A\u7F13\u5B58\uFF0C\u4FDD\u6301\u826F\u597D\u7684\u7F16\u7A0B\u4E60\u60EF\uFF0C\u53EF\u4EE5\u8BA9\u81EA\u5DF1\u7684\u4EE3\u7801\u54EA\u6015\u5728\u672A\u77E5\u60C5\u51B5\u4E0B\u4E5F\u80FD\u4FDD\u8BC1\u826F\u597D\u7684\u8FD0\u884C\u901F\u5EA6\u3002</p>
<p>\u501F\u52A9 JavaScript Profiler \u548C console.time\uFF0C\u6027\u80FD\u6392\u67E5\u548C\u4F18\u5316\u53EF\u4EE5\u505A\u5230\u975E\u5E38\u7B80\u5355\uFF0C\u6392\u67E5\u5230\u95EE\u9898\u70B9\uFF0C\u5F88\u5BB9\u6613\u9488\u5BF9\u95EE\u9898\u53BB\u505A\u4F18\u5316\u65B9\u6848\u3002</p>
`;export{s as __pageData,a as default};
