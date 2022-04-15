import"./app.d36d7bad.js";const s='{"title":"NodeJS \u642D\u5EFA\u7B80\u6613\u7F51\u7AD9","description":"","frontmatter":{"date":"2014-12-17T15:29:00.000Z","tags":["nodejs"]},"headers":[{"level":2,"title":"\u5B89\u88C5nodejs","slug":"\u5B89\u88C5nodejs"},{"level":2,"title":"\u5B89\u88C5npm","slug":"\u5B89\u88C5npm"},{"level":2,"title":"\u5B89\u88C5express","slug":"\u5B89\u88C5express"},{"level":2,"title":"\u521B\u5EFA\u6587\u4EF6\u5E76\u542F\u52A8","slug":"\u521B\u5EFA\u6587\u4EF6\u5E76\u542F\u52A8"},{"level":2,"title":"\u9759\u6001\u6587\u4EF6\u670D\u52A1\u5668","slug":"\u9759\u6001\u6587\u4EF6\u670D\u52A1\u5668"},{"level":2,"title":"\u6253\u5B8C\u6536\u5DE5","slug":"\u6253\u5B8C\u6536\u5DE5"}],"relativePath":"blog/2014-12-17-nodejs-simple-server.md","createTime":1649686573000,"lastUpdated":1647786576000}';var a=()=>`<h1 id="nodejs-\u642D\u5EFA\u7B80\u6613\u7F51\u7AD9" tabindex="-1">NodeJS \u642D\u5EFA\u7B80\u6613\u7F51\u7AD9 <a class="header-anchor" href="#nodejs-\u642D\u5EFA\u7B80\u6613\u7F51\u7AD9" aria-hidden="true">#</a></h1>
<blockquote>
<p>\u670B\u53CB\u8BA9\u5E2E\u5FD9\u5728\u4ED6\u7684<code>Windows Azure</code>\u91CC\u642D\u4E2A\u7B80\u5355\u7684<code>nodejs</code>\u670D\u52A1\u5668,\u597D\u5427,\u5176\u5B9E\u771F\u7684\u5F88\u65E0\u8111,\u770B\u4E86\u5C31\u77E5\u9053.\u642D\u5EFA\u73AF\u5883\u662F<code>Ubuntu 14.10</code>.</p>
</blockquote>
<h2 id="\u5B89\u88C5nodejs" tabindex="-1">\u5B89\u88C5<code>nodejs</code> <a class="header-anchor" href="#\u5B89\u88C5nodejs" aria-hidden="true">#</a></h2>
<p>\u65E2\u7136\u662F<code>nodejs</code>\u670D\u52A1\u5668,\u7B2C\u4E00\u6B65\u5F53\u7136\u662F\u5B89\u88C5<code>nodejs</code>\u5566.</p>
<div class="language-bash"><pre><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> nodejs
</code></pre>
</div><p>\u7136\u540E<code>Ubuntu</code>\u4E0B\u7684<code>node</code>\u547D\u4EE4\u9ED8\u8BA4\u88AB\u5176\u5B83\u5E94\u7528\u5360\u7528\u4E86,\u6240\u4EE5\u9700\u8981\u518D\u88C5\u4E2A<code>nodejs-legacy</code>.</p>
<div class="language-bash"><pre><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> nodejs-legacy
</code></pre>
</div><h2 id="\u5B89\u88C5npm" tabindex="-1">\u5B89\u88C5<code>npm</code> <a class="header-anchor" href="#\u5B89\u88C5npm" aria-hidden="true">#</a></h2>
<p><code>npm</code>\u662F<code>nodejs</code>\u7684\u6A21\u5757\u7BA1\u7406\u5668,\u5B89\u88C5\u4E0D\u591A\u8BF4,\u5C31\u4E00\u884C\u547D\u4EE4</p>
<div class="language-bash"><pre><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">npm</span>
</code></pre>
</div><p>\u597D\u4E86,\u4E0B\u9762\u5C31\u53EF\u4EE5\u4F7F\u7528<code>npm</code>\u6765\u5B89\u88C5\u6A21\u5757\u4E86</p>
<h2 id="\u5B89\u88C5express" tabindex="-1">\u5B89\u88C5<code>express</code> <a class="header-anchor" href="#\u5B89\u88C5express" aria-hidden="true">#</a></h2>
<p><code>express</code>\u662F\u4E00\u4E2A<code>nodejs</code>\u7684<code>web</code>\u7A0B\u5E8F\u6846\u67B6,\u4F7F\u7528<code>npm</code>\u5B89\u88C5\u4E00\u4E0B\u5427(<code>-g</code>\u53C2\u6570\u7684\u610F\u601D\u662F\u5B89\u88C5\u4E3A\u5168\u5C40\u6A21\u5757,\u800C\u4E0D\u662F\u76F4\u63A5\u5B89\u88C5\u5230\u5F53\u524D\u6587\u4EF6\u5939\u4E0B\u7684<code>node_modules</code>\u91CC,\u4F46\u662F\u53EF\u80FD\u9700\u8981\u914D\u7F6E\u73AF\u5883\u53D8\u91CF,\u4E0D\u60F3\u914D\u7F6E\u76F4\u63A5\u88C5\u5230\u9879\u76EE\u6587\u4EF6\u5939\u5C31\u884C)</p>
<div class="language-bash"><pre><code>$ <span class="token function">sudo</span> <span class="token function">npm</span> <span class="token function">install</span> express -g
</code></pre>
</div><h2 id="\u521B\u5EFA\u6587\u4EF6\u5E76\u542F\u52A8" tabindex="-1">\u521B\u5EFA\u6587\u4EF6\u5E76\u542F\u52A8 <a class="header-anchor" href="#\u521B\u5EFA\u6587\u4EF6\u5E76\u542F\u52A8" aria-hidden="true">#</a></h2>
<p>\u5728\u9879\u76EE\u6587\u4EF6\u5939\u4E2D\u521B\u5EFA\u5165\u53E3\u6587\u4EF6,\u7136\u540E\u76F4\u63A5\u542F\u52A8</p>
<div class="language-bash"><pre><code>$ <span class="token function">touch</span> app.js
$ <span class="token function">vim</span> app.js
</code></pre>
</div><p><code>app.js</code>\u7684\u6587\u4EF6\u5185\u5BB9\u5982\u4E0B(\u4EE3\u7801\u542B\u4E49\u89C1\u6CE8\u91CA):</p>
<div class="language-javascript"><pre><code><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u5F15\u7528express\u6A21\u5757</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// \u8C03\u7528express\u5E76\u83B7\u53D6\u5F15\u7528</span>
<span class="token keyword">var</span> <span class="token constant">APP_PORT</span> <span class="token operator">=</span> <span class="token number">80</span><span class="token punctuation">;</span> <span class="token comment">// \u670D\u52A1\u5668\u7AEF\u53E3\u53F7</span>

<span class="token comment">// \u5F53\u53CD\u95EE\u8DEF\u5F84\u4E3A/\u65F6\u7684\u5904\u7406\u51FD\u6570</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'hello world'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// app\u76D1\u542C\u7AEF\u53E3\u542F\u52A8</span>
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token constant">APP_PORT</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u4E0B\u9762\u76F4\u63A5\u4F7F\u7528<code>nodejs</code>\u6765\u542F\u52A8\u5427</p>
<div class="language-bash"><pre><code>$ <span class="token function">node</span> app.js
</code></pre>
</div><p>\u82E5\u662F\u6709\u62A5\u9519\u53EF\u80FD\u9700\u8981\u6CE8\u610F\u4E0B\u7AEF\u53E3\u662F\u5426\u88AB\u5360\u7528,\u5C31\u8FD9\u4E48\u70B9\u4EE3\u7801\u5E94\u8BE5\u6CA1\u5565\u522B\u7684\u95EE\u9898~</p>
<p>\u7136\u540E\u5728\u6D4F\u89C8\u5668\u91CC\u8F93\u5165\u670D\u52A1\u5668\u5730\u5740+\u7AEF\u53E3\u53F7\u67E5\u770B\u5427,OK,\u4E00\u4E2A<code>hello world</code>\u641E\u5B9A\u4E86.</p>
<h2 id="\u9759\u6001\u6587\u4EF6\u670D\u52A1\u5668" tabindex="-1">\u9759\u6001\u6587\u4EF6\u670D\u52A1\u5668 <a class="header-anchor" href="#\u9759\u6001\u6587\u4EF6\u670D\u52A1\u5668" aria-hidden="true">#</a></h2>
<p><code>express</code>\u7684\u9759\u6001\u6587\u4EF6\u670D\u52A1\u5668\u642D\u5EFA\u4E5F\u662F\u5F88\u65E0\u8111</p>
<div class="language-javascript"><pre><code>app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'/static'</span><span class="token punctuation">,</span> express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">'/public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre>
</div><p>\u6DFB\u52A0\u4E00\u884C\u4EE3\u7801\u5C31\u53EF\u4EE5\u5C06\u9879\u76EE\u6587\u4EF6\u5939\u4E0B\u7684\u76EE\u5F55\u4E0B\u7684\u6587\u4EF6\u6620\u5C04\u4E3A\u9759\u6001\u6587\u4EF6</p>
<p>\u6BD4\u5982\u4E0A\u9762\u7684\u4EE3\u7801\u76F4\u63A5\u8F93\u5165\u670D\u52A1\u5668\u5730\u5740+\u7AEF\u53E3\u53F7+/static/+\u9879\u76EE\u6587\u4EF6\u5939\u4E0B\u7684/public \u4E2D\u7684\u5BF9\u5E94\u6587\u4EF6\u540D\u5C31\u53EF\u8BBF\u95EE\u6587\u4EF6\u4E86.</p>
<h2 id="\u6253\u5B8C\u6536\u5DE5" tabindex="-1">\u6253\u5B8C\u6536\u5DE5 <a class="header-anchor" href="#\u6253\u5B8C\u6536\u5DE5" aria-hidden="true">#</a></h2>
<p>\u597D\u4E86,\u6700\u7B80\u5355\u7684\u5C31\u662F\u8FD9\u4E48\u591A,\u4E0B\u9762\u5C31\u968F\u4FBF\u73A9\u73A9\u5427.</p>
<p><a href="http://168.63.150.67:8089/static/index.html" target="_blank" rel="noopener noreferrer">\u6211\u7684\u6D4B\u8BD5\u5730\u5740</a></p>
`;export{s as __pageData,a as default};
