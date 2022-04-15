import"./app.d36d7bad.js";const a='{"title":"Shell \u811A\u672C\u521D\u5C1D\u8BD5","description":"","frontmatter":{"date":"2016-08-14T14:57:47.000Z","tags":["shell"]},"headers":[{"level":2,"title":"Trouble Shooting","slug":"trouble-shooting"}],"relativePath":"blog/2016-08-14-shell-scripting.md","createTime":1649686573000,"lastUpdated":1647786576000}';var n=()=>`<h1 id="shell-\u811A\u672C\u521D\u5C1D\u8BD5" tabindex="-1">Shell \u811A\u672C\u521D\u5C1D\u8BD5 <a class="header-anchor" href="#shell-\u811A\u672C\u521D\u5C1D\u8BD5" aria-hidden="true">#</a></h1>
<blockquote>
<p>\u4F7F\u7528<code>jekyll</code>\u65B0\u5EFA<code>post</code>\u65F6\u9700\u8981\u586B\u5199\u5F88\u591A\u91CD\u590D\u53C2\u6570,\u56E0\u4E3A\u672C\u4EBA\u6BD4\u8F83\u61D2\u6240\u4EE5\u51B3\u5B9A\u5C1D\u8BD5\u5199\u4E2A<code>shell</code>\u811A\u672C\u6765\u521B\u5EFA<code>post</code>.</p>
</blockquote>
<ul>
<li>\u9996\u5148\u5F53\u7136\u662F\u7533\u660E\u811A\u672C\u89E3\u91CA\u5668,\u8FD9\u4E2A\u770B\u4E2A\u4EBA\u9700\u6C42\u6216\u8005\u559C\u597D.</li>
</ul>
<div class="language-bash"><pre><code><span class="token shebang important">#!/bin/zsh</span>
</code></pre>
</div><ul>
<li>\u7136\u540E\u5B9A\u4E49\u4E00\u4E0B\u51E0\u4E2A\u5E38\u7528\u53D8\u91CF,\u5206\u522B\u662F posts \u7684\u5B58\u653E\u76EE\u5F55,\u5E74\u6708\u65E5\u683C\u5F0F\u7684\u65E5\u671F\u5B57\u7B26\u4E32,\u5B8C\u6574\u65F6\u95F4\u5B57\u7B26\u4E32.</li>
</ul>
<div class="language-bash"><pre><code><span class="token assign-left variable">basePostDirPath</span><span class="token operator">=</span><span class="token string">"./_posts/"</span>
<span class="token assign-left variable">date1</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token string">"+%Y-%m-%d"</span><span class="token variable">\`</span></span>
<span class="token assign-left variable">date2</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token string">"+%Y-%m-%d %H:%M:%S"</span><span class="token variable">\`</span></span>
</code></pre>
</div><ul>
<li>\u63A5\u4E0B\u6765\u662F\u63D0\u793A\u8BA9\u7528\u6237(\u4E5F\u5C31\u662F\u6211\u81EA\u5DF1)\u8F93\u5165 post \u540D\u79F0(\u7528\u4F5C\u6587\u4EF6\u540D),\u7136\u540E\u751F\u6210\u5B8C\u6574\u7684\u6587\u4EF6\u8DEF\u5F84.</li>
</ul>
<div class="language-bash"><pre><code><span class="token comment"># input the name of new post</span>
<span class="token builtin class-name">printf</span> <span class="token string">"Please input the name of your new post:"</span><span class="token punctuation">;</span> <span class="token builtin class-name">read</span> postName

<span class="token comment"># filename with full path</span>
<span class="token assign-left variable">fullFileName</span><span class="token operator">=</span><span class="token string">"<span class="token variable">\${basePostDirPath}</span><span class="token variable">\${date1}</span>-<span class="token variable">\${postName}</span>.md"</span>
</code></pre>
</div><ul>
<li>\u5224\u65AD\u6587\u4EF6\u662F\u5426\u91CD\u540D,\u9632\u6B62\u4E0D\u5C0F\u5FC3\u8986\u76D6,\u91CD\u540D\u5219\u9000\u51FA\u7A0B\u5E8F</li>
</ul>
<div class="language-bash"><pre><code><span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> -a <span class="token string">"<span class="token variable">\${fullFileName}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"exist"</span>
    <span class="token builtin class-name">exit</span> <span class="token number">0</span>
<span class="token keyword">fi</span>
</code></pre>
</div><ul>
<li>\u975E\u91CD\u540D\u521B\u5EFA\u6587\u4EF6</li>
</ul>
<div class="language-bash"><pre><code><span class="token comment"># create the post file</span>
<span class="token function">touch</span> <span class="token variable">\${fullFileName}</span>
</code></pre>
</div><ul>
<li>\u83B7\u53D6\u76F8\u540C\u65E5\u671F\u7684 post \u6570\u7EC4,\u8BA1\u7B97\u6570\u7EC4\u957F\u5EA6,\u8BA1\u7B97 postId.</li>
</ul>
<div class="language-bash"><pre><code><span class="token comment"># get the array of the posts doday used for get the id of post</span>
<span class="token assign-left variable">posts</span><span class="token operator">=</span><span class="token punctuation">(</span><span class="token variable"><span class="token variable">\`</span><span class="token function">find</span> $<span class="token punctuation">{</span>basePostDirPath<span class="token punctuation">}</span> -type f -name <span class="token string">"<span class="token variable">\${date1}</span>*.md"</span><span class="token variable">\`</span></span><span class="token punctuation">)</span>
<span class="token comment"># get the length</span>
<span class="token assign-left variable">postsL</span><span class="token operator">=</span><span class="token variable">\${<span class="token operator">#</span>posts<span class="token punctuation">[</span>*<span class="token punctuation">]</span>}</span>

<span class="token comment"># compute post id</span>
<span class="token keyword">if</span> <span class="token builtin class-name">test</span> <span class="token variable">\${postsL}</span> -lt <span class="token number">10</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token assign-left variable">postId</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token string">"+%Y%m%d"</span><span class="token variable">\`</span></span>0<span class="token variable">\${postsL}</span>"</span>
<span class="token keyword">else</span>
    <span class="token assign-left variable">postId</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">\`</span><span class="token function">date</span> <span class="token string">"+%Y%m%d"</span><span class="token variable">\`</span></span><span class="token variable">\${postsL}</span>"</span>
<span class="token keyword">fi</span>
</code></pre>
</div><ul>
<li>\u5C06\u6A21\u677F\u5185\u5BB9\u8F93\u51FA\u5230\u6587\u4EF6\u4E2D,\u7136\u540E\u4F7F\u7528\u7F16\u8F91\u5668\u6253\u5F00 post \u6587\u4EF6</li>
</ul>
<div class="language-bash"><pre><code><span class="token comment"># echo the template to the new post file</span>
<span class="token builtin class-name">echo</span> <span class="token string">"---<span class="token entity" title="\\n">\\n</span>layout: post<span class="token entity" title="\\n">\\n</span>title:<span class="token entity" title="\\n">\\n</span>date: <span class="token variable">\${date2}</span><span class="token entity" title="\\n">\\n</span>author: ZxBing0066<span class="token entity" title="\\n">\\n</span>blogid: <span class="token variable">\${postId}</span><span class="token entity" title="\\n">\\n</span>categories: <span class="token entity" title="\\n">\\n</span>tags: <span class="token entity" title="\\n">\\n</span>---"</span> <span class="token operator">></span> <span class="token variable">\${fullFileName}</span>
<span class="token comment"># edit the post file</span>
<span class="token string">"/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl"</span> <span class="token variable">\${fullFileName}</span>
</code></pre>
</div><br/>
<hr>
<br/>
<h2 id="trouble-shooting" tabindex="-1">Trouble Shooting <a class="header-anchor" href="#trouble-shooting" aria-hidden="true">#</a></h2>
<ul>
<li>\u751F\u6210\u6587\u4EF6\u6A21\u677F\u4E2D\u7684<code>date</code>\u4E3A\u5F53\u524D\u7684\u672C\u5730\u65F6\u95F4,\u4F46\u662F\u4F7F\u7528<code>jekyll</code>\u751F\u6210\u7684\u65F6\u5019<code>jekyll</code>\u597D\u50CF\u4F1A\u68C0\u6D4B\u65F6\u95F4,\u65F6\u95F4\u5728\u5F53\u524D\u65F6\u95F4\u5F80\u540E\u7684\u4F1A\u4E0D\u751F\u6210 ,\u6240\u4EE5\u5BFC\u81F4\u521B\u5EFA\u7684\u65F6\u5019\u65E0\u6CD5\u751F\u6210,\u5E94\u8BE5\u662F\u68C0\u6D4B\u7684\u65F6\u5019\u4F7F\u7528\u7684\u662F\u4E16\u754C\u6807\u51C6\u65F6\u95F4,\u800C\u672C\u5730\u662F\u5317\u4EAC\u65F6\u95F4\u8D85\u524D 8 \u5C0F\u65F6,\u6240\u4EE5\u53EF\u4EE5\u7A0D\u5FAE\u505A\u70B9<code>hack</code>\u53BB\u8EB2\u6389\u8FD9\u4E00\u70B9,\u6BD4\u5982<code>date</code>\u53EA\u4F7F\u7528\u5E74\u6708\u65E5,\u4E0D\u5305\u542B\u5177\u4F53\u65F6\u95F4,\u5F53\u7136\u5982\u679C\u4F60\u662F\u5728\u65E9\u4E0A 8 \u70B9\u524D\u521B\u5EFA\u7684\u8BDD\u5C31\u53E6\u5F53\u522B\u8BBA\u4E86...</li>
</ul>
`;export{a as __pageData,n as default};
