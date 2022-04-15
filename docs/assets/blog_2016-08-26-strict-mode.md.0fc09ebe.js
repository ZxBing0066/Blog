import"./app.d36d7bad.js";const s='{"title":"Javascript \u4E25\u683C\u6A21\u5F0F","description":"","frontmatter":{"date":"2016-08-26T18:08:18.000Z","tags":["javascript"]},"headers":[{"level":3,"title":"\u517C\u5BB9\u7248\u672C","slug":"\u517C\u5BB9\u7248\u672C"},{"level":3,"title":"\u5BA3\u544A\u4E25\u683C\u6A21\u5F0F","slug":"\u5BA3\u544A\u4E25\u683C\u6A21\u5F0F"},{"level":3,"title":"\u4E25\u683C\u6A21\u5F0F\u4E2D\u4E0D\u5141\u8BB8\u7684\u4EE3\u7801","slug":"\u4E25\u683C\u6A21\u5F0F\u4E2D\u4E0D\u5141\u8BB8\u7684\u4EE3\u7801"},{"level":3,"title":"\u6CE8\u610F\u4E8B\u9879","slug":"\u6CE8\u610F\u4E8B\u9879"},{"level":3,"title":"\u53C2\u8003\u6587\u732E\u5730\u5740","slug":"\u53C2\u8003\u6587\u732E\u5730\u5740"}],"relativePath":"blog/2016-08-26-strict-mode.md","createTime":1649686573000,"lastUpdated":1647786576000}';var a=()=>`<h1 id="javascript-\u4E25\u683C\u6A21\u5F0F" tabindex="-1">Javascript \u4E25\u683C\u6A21\u5F0F <a class="header-anchor" href="#javascript-\u4E25\u683C\u6A21\u5F0F" aria-hidden="true">#</a></h1>
<blockquote>
<p>\u4E25\u683C\u6A21\u5F0F\u662F\u5728 ES5 \u4E2D\u65B0\u589E\u7684\u6307\u4EE4,\u4ED6\u4E0D\u662F\u4E00\u4E2A\u58F0\u660E,\u800C\u662F\u4E00\u4E2A\u5B57\u9762\u8868\u8FBE\u5F0F,\u8FD9\u6837\u5728\u8001\u7248\u672C\u7684\u6D4F\u89C8\u5668\u4E2D\u4F1A\u88AB\u5FFD\u89C6\u800C\u4E0D\u81F3\u4E8E\u4F1A\u5F15\u8D77\u9519\u8BEF.</p>
</blockquote>
<h3 id="\u517C\u5BB9\u7248\u672C" tabindex="-1">\u517C\u5BB9\u7248\u672C <a class="header-anchor" href="#\u517C\u5BB9\u7248\u672C" aria-hidden="true">#</a></h3>
<table>
<thead>
<tr>
<th>IE</th>
<th>Chrome</th>
<th>Firefox</th>
<th>Safari</th>
<th>Opera</th>
</tr>
</thead>
<tbody>
<tr>
<td>10+</td>
<td>13+</td>
<td>4+</td>
<td>5.1+</td>
<td>12+</td>
</tr>
</tbody>
</table>
<h3 id="\u5BA3\u544A\u4E25\u683C\u6A21\u5F0F" tabindex="-1">\u5BA3\u544A\u4E25\u683C\u6A21\u5F0F <a class="header-anchor" href="#\u5BA3\u544A\u4E25\u683C\u6A21\u5F0F" aria-hidden="true">#</a></h3>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
x <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span> <span class="token comment">// \u8FDB\u5165\u4E25\u683C\u6A21\u5F0F\u8FD9\u91CC\u4F1A\u62A5\u9519</span>
</code></pre>
</div><p>\u4E25\u683C\u6A21\u5F0F\u9700\u8981\u5728\u4E00\u6BB5\u811A\u672C\u6216\u8005\u51FD\u6570\u7684\u5F00\u5934\u5BA3\u544A\u624D\u80FD\u88AB\u8BC6\u522B,\u5728\u811A\u672C\u5F00\u5934\u8FD9\u4E2A\u811A\u672C\u4E2D\u7684\u4EE3\u7801\u90FD\u5C06\u4EE5\u4E25\u683C\u6A21\u5F0F\u6267\u884C,\u51FD\u6570\u5F00\u5934\u5BA3\u544A\u5219\u53EA\u6709\u8FD9\u4E2A\u51FD\u6570\u4E2D\u7684\u4EE3\u7801\u4F1A\u8FDB\u5165\u4E25\u683C\u6A21\u5F0F.(\u7C7B\u4F3C javascript \u7684\u51FD\u6570\u4F5C\u7528\u57DF)</p>
<div class="language-js"><pre><code>x <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span> <span class="token comment">// \u8FD9\u91CC\u4E0D\u4F1A\u62A5\u9519,\u56E0\u4E3A\u4E0D\u662F\u4E25\u683C\u6A21\u5F0F</span>
<span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">myFunction</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token string">'use strict'</span><span class="token punctuation">;</span>
    y <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span> <span class="token comment">// \u8FD9\u91CC\u662F\u4E25\u683C\u6A21\u5F0F\u4F1A\u62A5\u9519</span>
<span class="token punctuation">}</span>
</code></pre>
</div><h3 id="\u4E25\u683C\u6A21\u5F0F\u4E2D\u4E0D\u5141\u8BB8\u7684\u4EE3\u7801" tabindex="-1">\u4E25\u683C\u6A21\u5F0F\u4E2D\u4E0D\u5141\u8BB8\u7684\u4EE3\u7801 <a class="header-anchor" href="#\u4E25\u683C\u6A21\u5F0F\u4E2D\u4E0D\u5141\u8BB8\u7684\u4EE3\u7801" aria-hidden="true">#</a></h3>
<ul>
<li>
<p>\u53D8\u91CF\u672A\u58F0\u660E\u4E0D\u53EF\u4F7F\u7528</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
x <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span> <span class="token comment">// x\u672A\u58F0\u660E\u6240\u4EE5\u62A5\u9519</span>
</code></pre>
</div></li>
<li>
<p>\u4E0D\u53EF\u5220\u9664\u53D8\u91CF\u548C\u51FD\u6570</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span>
<span class="token keyword">delete</span> x<span class="token punctuation">;</span> <span class="token comment">// \u53D8\u91CF\u65E0\u6CD5\u5220\u9664\u62A5\u9519</span>
</code></pre>
</div><div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">x</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">delete</span> x<span class="token punctuation">;</span> <span class="token comment">// \u51FD\u6570\u65E0\u6CD5\u5220\u9664\u62A5\u9519</span>
</code></pre>
</div></li>
<li>
<p>\u4E0D\u5141\u8BB8\u5B9A\u4E49\u91CD\u590D\u7684\u5F62\u53C2</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">x</span><span class="token punctuation">(</span><span class="token parameter">p1<span class="token punctuation">,</span> p1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// \u5F62\u53C2\u91CD\u590D\u62A5\u9519</span>
</code></pre>
</div></li>
<li>
<p>\u4E0D\u652F\u6301\u516B\u8FDB\u5236\u6570\u5B57\u5B57\u9762\u8868\u8FBE\u5F0F</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token number">010</span><span class="token punctuation">;</span> <span class="token comment">// \u5B57\u9762\u91CF\u516B\u8FDB\u5236\u6570\u62A5\u9519</span>
</code></pre>
</div></li>
<li>
<p>\u4E0D\u5141\u8BB8\u8F6C\u4E49\u5B57\u7B26</p>
<div class="language-js"><pre><code><span class="token string">"use strict"</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> x <span class="token operator">=</span> \\<span class="token number">010</span><span class="token punctuation">;</span>  <span class="token comment">// \u8F6C\u4E49\u5B57\u7B26\u62A5\u9519</span>
</code></pre>
</div></li>
<li>
<p>\u4E0D\u5141\u8BB8\u5199\u53EA\u8BFB\u5C5E\u6027</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'x'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span> <span class="token comment">// \u53EA\u8BFB\u4E0D\u53EF\u5199,\u62A5\u9519</span>
</code></pre>
</div></li>
<li>
<p>\u4E0D\u5141\u8BB8\u5199\u53EA\u80FD get \u7684\u5C5E\u6027</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token keyword">get</span> <span class="token function">x</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

obj<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span> <span class="token comment">// x\u5C5E\u6027\u4E4B\u5B9A\u4E49\u4E86getter,\u6CA1\u6709setter,\u62A5\u9519</span>
</code></pre>
</div></li>
<li>
<p>\u4E0D\u5141\u8BB8\u5220\u9664\u4E00\u4E2A\u4E0D\u53EF\u5220\u5C5E\u6027</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">delete</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span> <span class="token comment">// prototype\u4E0D\u53EF\u5220,\u62A5\u9519</span>
</code></pre>
</div></li>
<li>
<p>eval \u5B57\u7B26\u4E32\u4E0D\u80FD\u4F5C\u4E3A\u53D8\u91CF\u540D</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> eval <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span> <span class="token comment">// eval\u4E0D\u53EF\u5B9A\u4E49\u4E3A\u53D8\u91CF,\u62A5\u9519</span>
</code></pre>
</div></li>
<li>
<p>\u4E0D\u80FD\u5B9A\u4E49 arguments \u53D8\u91CF</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> arguments <span class="token operator">=</span> <span class="token number">3.14</span><span class="token punctuation">;</span> <span class="token comment">// \u4E0D\u80FD\u5B9A\u4E49arguments\u53D8\u91CF,\u62A5\u9519</span>
</code></pre>
</div></li>
<li>
<p>\u4E0D\u53EF\u4F7F\u7528 with</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">with</span> <span class="token punctuation">(</span>Math<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    x <span class="token operator">=</span> <span class="token function">cos</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token comment">// \u4E0D\u53EF\u4F7F\u7528with,\u62A5\u9519</span>
</code></pre>
</div></li>
<li>
<p>\u51FA\u4E8E\u5B89\u5168\u539F\u56E0\u8003\u8651,eval \u8BED\u53E5\u4E0D\u5141\u8BB8\u521B\u5EFA\u53D8\u91CF</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token function">eval</span><span class="token punctuation">(</span><span class="token string">'var x = 2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">alert</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u62A5\u9519,\u672A\u5B9A\u4E49</span>
</code></pre>
</div></li>
<li>
<p>\u5728\u4E25\u683C\u6A21\u5F0F\u7684\u51FD\u6570\u4E2D\u7684 this \u5C06\u4F1A\u53D8\u4E3A undefined \u800C\u4E0D\u662F window \u6216\u8005\u5176\u4ED6\u5168\u5C40\u5BF9\u8C61</p>
<div class="language-js"><pre><code><span class="token string">'use strict'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// undefined</span>
</code></pre>
</div></li>
<li>
<p>\u524D\u77BB\u6027\u8003\u8651</p>
<p>\u4E25\u683C\u6A21\u5F0F\u4E2D\u4E00\u4E9B\u5C06\u6765\u53EF\u80FD\u7528\u5230\u7684\u65B0\u589E\u5173\u952E\u5B57\u5C06\u4E0D\u5141\u8BB8\u4F7F\u7528:</p>
<ul>
<li>implements</li>
<li>interface</li>
<li>let</li>
<li>package</li>
<li>private</li>
<li>protected</li>
<li>public</li>
<li>static</li>
<li>yield</li>
</ul>
</li>
</ul>
<h3 id="\u6CE8\u610F\u4E8B\u9879" tabindex="-1">\u6CE8\u610F\u4E8B\u9879 <a class="header-anchor" href="#\u6CE8\u610F\u4E8B\u9879" aria-hidden="true">#</a></h3>
<p>&quot;use strict&quot;\u5FC5\u987B\u5728\u811A\u672C\u6216\u8005\u51FD\u6570\u7684\u6700\u4E0A\u65B9\u5B9A\u4E49,\u4E0D\u7136\u6D4F\u89C8\u5668\u5C06\u4E0D\u4F1A\u89E3\u6790\u4E3A\u4E25\u683C\u6A21\u5F0F.</p>
<h3 id="\u53C2\u8003\u6587\u732E\u5730\u5740" tabindex="-1">\u53C2\u8003\u6587\u732E\u5730\u5740 <a class="header-anchor" href="#\u53C2\u8003\u6587\u732E\u5730\u5740" aria-hidden="true">#</a></h3>
<p><a href="http://www.w3schools.com/js/js_strict.asp" target="_blank" rel="noopener noreferrer">w3schools</a></p>
`;export{s as __pageData,a as default};
