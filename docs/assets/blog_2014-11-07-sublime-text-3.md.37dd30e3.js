import"./app.d36d7bad.js";const n='{"title":"SublimeText3 \u5B89\u88C5&\u914D\u7F6E","description":"","frontmatter":{"date":"2014-11-07T10:16:43.000Z","tags":["sublime-text"]},"headers":[{"level":2,"title":"\u4E0B\u8F7D","slug":"\u4E0B\u8F7D"},{"level":2,"title":"\u5B89\u88C5Package Control","slug":"\u5B89\u88C5package-control"},{"level":2,"title":"\u4E0B\u8F7D\u540E\u76F4\u63A5\u5B89\u88C5","slug":"\u4E0B\u8F7D\u540E\u76F4\u63A5\u5B89\u88C5"},{"level":2,"title":"Package Control\u4F7F\u7528","slug":"package-control\u4F7F\u7528"},{"level":2,"title":"\u5E38\u7528\u547D\u4EE4","slug":"\u5E38\u7528\u547D\u4EE4"},{"level":2,"title":"\u624B\u52A8\u5B89\u88C5\u63D2\u4EF6","slug":"\u624B\u52A8\u5B89\u88C5\u63D2\u4EF6"},{"level":2,"title":"\u63D2\u4EF6\u63A8\u8350","slug":"\u63D2\u4EF6\u63A8\u8350"},{"level":2,"title":"\u4E3B\u9898\u63A8\u8350","slug":"\u4E3B\u9898\u63A8\u8350"}],"relativePath":"blog/2014-11-07-sublime-text-3.md","createTime":1649686573000,"lastUpdated":1647786576000}';var a=()=>`<h1 id="sublimetext3-\u5B89\u88C5-\u914D\u7F6E" tabindex="-1">SublimeText3 \u5B89\u88C5&amp;\u914D\u7F6E <a class="header-anchor" href="#sublimetext3-\u5B89\u88C5-\u914D\u7F6E" aria-hidden="true">#</a></h1>
<h2 id="\u4E0B\u8F7D" tabindex="-1">\u4E0B\u8F7D <a class="header-anchor" href="#\u4E0B\u8F7D" aria-hidden="true">#</a></h2>
<blockquote>
<p>\u4E0B\u8F7D\u5730\u5740\u94FE\u63A5:<a href="http://www.sublimetext.com/3" target="_blank" rel="noopener noreferrer">http://www.sublimetext.com/3</a> \u672C\u4EBA\u4E0B\u8F7D\u7684\u662F\u7EFF\u8272\u7248<code>portable version</code>,\u4E0B\u8F7D\u540E\u89E3\u538B\u6253\u5F00 ST3.</p>
</blockquote>
<h2 id="\u5B89\u88C5package-control" tabindex="-1">\u5B89\u88C5<code>Package Control</code> <a class="header-anchor" href="#\u5B89\u88C5package-control" aria-hidden="true">#</a></h2>
<p><code>Package Control</code>\u5B98\u7F51\u5730\u5740:<a href="https://packagecontrol.io/installation#st3" target="_blank" rel="noopener noreferrer">https://packagecontrol.io/installation#st3</a></p>
<blockquote>
<p>\u4F7F\u7528<code>ST Console</code>\u5B89\u88C5\u4F7F\u7528<code>Ctrl+\`</code>\u5FEB\u6377\u952E\u6216<code>View-&gt;Show Console</code>\u6765\u6253\u5F00<code>Console</code>,\u8F93\u5165\u5982\u4E0B\u4EE3\u7801:</p>
</blockquote>
<div class="language-python"><pre><code><span class="token keyword">import</span> urllib<span class="token punctuation">.</span>request<span class="token punctuation">,</span>os<span class="token punctuation">,</span>hashlib<span class="token punctuation">;</span> h <span class="token operator">=</span> <span class="token string">'7183a2d3e96f11eeadd761d777e62404'</span> <span class="token operator">+</span> <span class="token string">'e330c659d4bb41d3bdf022e94cab3cd0'</span><span class="token punctuation">;</span> pf <span class="token operator">=</span> <span class="token string">'Package Control.sublime-package'</span><span class="token punctuation">;</span> ipp <span class="token operator">=</span> sublime<span class="token punctuation">.</span>installed_packages_path<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> urllib<span class="token punctuation">.</span>request<span class="token punctuation">.</span>install_opener<span class="token punctuation">(</span> urllib<span class="token punctuation">.</span>request<span class="token punctuation">.</span>build_opener<span class="token punctuation">(</span> urllib<span class="token punctuation">.</span>request<span class="token punctuation">.</span>ProxyHandler<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> by <span class="token operator">=</span> urllib<span class="token punctuation">.</span>request<span class="token punctuation">.</span>urlopen<span class="token punctuation">(</span> <span class="token string">'http://packagecontrol.io/'</span> <span class="token operator">+</span> pf<span class="token punctuation">.</span>replace<span class="token punctuation">(</span><span class="token string">' '</span><span class="token punctuation">,</span> <span class="token string">'%20'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> dh <span class="token operator">=</span> hashlib<span class="token punctuation">.</span>sha256<span class="token punctuation">(</span>by<span class="token punctuation">)</span><span class="token punctuation">.</span>hexdigest<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'Error validating download (got %s instead of %s), please try manual install'</span> <span class="token operator">%</span> <span class="token punctuation">(</span>dh<span class="token punctuation">,</span> h<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">if</span> dh <span class="token operator">!=</span> h <span class="token keyword">else</span> <span class="token builtin">open</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>path<span class="token punctuation">.</span>join<span class="token punctuation">(</span> ipp<span class="token punctuation">,</span> pf<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">'wb'</span> <span class="token punctuation">)</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span>by<span class="token punctuation">)</span>
</code></pre>
</div><h2 id="\u4E0B\u8F7D\u540E\u76F4\u63A5\u5B89\u88C5" tabindex="-1">\u4E0B\u8F7D\u540E\u76F4\u63A5\u5B89\u88C5 <a class="header-anchor" href="#\u4E0B\u8F7D\u540E\u76F4\u63A5\u5B89\u88C5" aria-hidden="true">#</a></h2>
<blockquote>
<p>\u70B9\u51FB<code>Preferences &gt; Browse Packages</code>\u83DC\u5355,\u8FDB\u5165\u6253\u5F00\u7684\u76EE\u5F55\u7684\u4E0A\u5C42\u76EE\u5F55,\u7136\u540E\u518D\u8FDB\u5165<code>Installed Packages/</code>\u76EE\u5F55,\u4E0B\u8F7D<a href="https://packagecontrol.io/Package%20Control.sublime-package" target="_blank" rel="noopener noreferrer">Package Control.sublime-package</a>\u5E76\u590D\u5236\u5230<code>Installed Packages/</code>\u76EE\u5F55\u5373\u53EF.</p>
</blockquote>
<blockquote>
<p>\u5B89\u88C5\u6210\u529F\u540E\u4F1A\u5728\u83DC\u5355\u680F\u591A\u51FA<code>Preferences &gt; Package Control</code>\u83DC\u5355,\u82E5\u662F\u672A\u51FA\u73B0\u53EF\u91CD\u542F\u4E00\u4E0B\u8BD5\u8BD5.</p>
</blockquote>
<h2 id="package-control\u4F7F\u7528" tabindex="-1"><code>Package Control</code>\u4F7F\u7528 <a class="header-anchor" href="#package-control\u4F7F\u7528" aria-hidden="true">#</a></h2>
<blockquote>
<p><code>Ctrl+Shift+P</code>\u6253\u5F00\u9762\u677F,\u8F93\u5165<code>Package Control</code>\u53EF\u770B\u5230\u6240\u6709\u53EF\u4F7F\u7528\u7684\u547D\u4EE4.</p>
</blockquote>
<h2 id="\u5E38\u7528\u547D\u4EE4" tabindex="-1">\u5E38\u7528\u547D\u4EE4 <a class="header-anchor" href="#\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a></h2>
<ul>
<li><code>Install Package</code>\u5B89\u88C5\u63D2\u4EF6\u7684\u547D\u4EE4,\u6267\u884C\u540E\u5C06\u4F1A\u5217\u51FA\u6240\u6709\u53EF\u7528\u7684\u63D2\u4EF6\u5217\u8868,\u7136\u540E\u9009\u62E9\u63D2\u4EF6\u4FBF\u53EF\u76F4\u63A5\u5B89\u88C5</li>
<li><code>Remove Package</code>\u5220\u9664\u5DF2\u5B89\u88C5\u7684\u63D2\u4EF6</li>
<li><code>List Packages</code>\u5217\u51FA\u6240\u6709\u5DF2\u5B89\u88C5\u7684\u63D2\u4EF6</li>
<li><code>Disable Package</code>\u6682\u505C\u4F7F\u7528\u67D0\u63D2\u4EF6</li>
<li><code>Enable Package</code>\u542F\u7528\u67D0\u63D2\u4EF6</li>
</ul>
<h2 id="\u624B\u52A8\u5B89\u88C5\u63D2\u4EF6" tabindex="-1">\u624B\u52A8\u5B89\u88C5\u63D2\u4EF6 <a class="header-anchor" href="#\u624B\u52A8\u5B89\u88C5\u63D2\u4EF6" aria-hidden="true">#</a></h2>
<p>(2014.12.19 \u66F4\u65B0)</p>
<p>\u56E0\u4E3A\u56FD\u5185\u7684 X \u6BD4\u8F83\u9AD8,\u6240\u4EE5\u53EF\u80FD\u7ECF\u5E38\u8FDE\u4E0D\u4E0A\u63D2\u4EF6\u5E93,\u8FD9\u65F6\u5019\u5C31\u9700\u8981\u624B\u52A8\u5B89\u88C5\u4E86,\u8FD8\u597D<code>Github</code>\u6CA1\u88AB XX \u4E86</p>
<p>\u76F4\u63A5\u5230\u63D2\u4EF6\u7684\u9875\u9762\u53BB\u4E0B\u8F7D\u63D2\u4EF6,\u4E5F\u53EF\u4EE5\u5728\u4E0A\u9762\u7684<code>Package Control</code>\u5B98\u7F51\u4E2D\u76F4\u63A5\u641C\u7D22\u4E0B\u8F7D,\u4E00\u822C\u63D2\u4EF6\u90FD\u662F\u6258\u7BA1\u5728<code>Github</code>\u4E0A,\u6240\u4EE5\u76F4\u63A5\u5230<code>Github</code>\u4E0A\u641C\u7D22\u5F53\u7136\u4E5F\u662F\u53EF\u884C\u7684.</p>
<p>\u4E0B\u8F7D\u65F6\u53EF\u4EE5\u770B\u4E0B\u63D2\u4EF6\u7684\u4ECB\u7ECD,\u4E00\u822C\u90FD\u5199\u6709\u5B89\u88C5\u65B9\u6CD5,\u4E00\u79CD\u662F\u4F7F\u7528<code>Package Control</code>,\u53E6\u4E00\u79CD\u5C31\u662F<code>Manual Installation</code>\u4E86.\u4E00\u822C\u90FD\u662F\u76F4\u63A5<code>clone</code>\u6574\u4E2A\u9879\u76EE,\u7136\u540E\u70B9\u51FB<code>Preferences</code>--&gt;<code>Browse Packages...</code>\u6253\u5F00<code>Packages</code>\u6587\u4EF6\u5939,\u628A\u9879\u76EE\u590D\u5236\u8FDB\u53BB\u5C31\u53EF\u4EE5\u4E86.\u4E0D\u8FC7\u4E5F\u6709\u7684\u53EF\u4EE5\u76F4\u63A5\u4E0B\u8F7D<code>.sublime-package</code>\u6587\u4EF6,\u8FD9\u4E2A\u6587\u4EF6\u9700\u8981\u653E\u5230<code>Packages</code>\u4E0A\u7EA7\u76EE\u5F55\u4E0B\u7684<code>Installed Packages</code>\u6587\u4EF6\u5939\u4E0B.</p>
<p>\u653E\u5165\u6587\u4EF6\u5939\u540E\u53EF\u80FD\u9700\u8981\u91CD\u542F\u624D\u80FD\u751F\u6548</p>
<h2 id="\u63D2\u4EF6\u63A8\u8350" tabindex="-1">\u63D2\u4EF6\u63A8\u8350 <a class="header-anchor" href="#\u63D2\u4EF6\u63A8\u8350" aria-hidden="true">#</a></h2>
<ul>
<li>
<p><a href="http://emmet.io/" target="_blank" rel="noopener noreferrer"><code>Emmet</code></a> \u4EE5\u524D\u7684<code>Zen-Coding</code>\u6539\u540D\u53EB<code>Emmet</code>,\u9644\u4E0A\u5B98\u7F51\u5730\u5740<a href="http://emmet.io/" target="_blank" rel="noopener noreferrer">http://emmet.io/</a>,\u91CC\u9762\u6709\u6559\u7A0B\u4E4B\u7C7B\u7684~</p>
</li>
<li>
<p><a href="https://github.com/kemayo/sublime-text-git" target="_blank" rel="noopener noreferrer"><code>Git</code></a> \u5C06<code>Git</code>\u6574\u5408\u8FDB<code>Sublime Text</code>\u4E2D,\u4E0D\u8FC7\u6211\u4E2A\u4EBA\u8FD8\u662F\u6BD4\u8F83\u4E60\u60EF\u7528<code>Shell</code>\u64CD\u4F5C<code>Git</code></p>
</li>
<li>
<p><a href="https://github.com/SublimeText-Markdown/MarkdownEditing" target="_blank" rel="noopener noreferrer"><code>MarkDown Editing</code></a> <code>Sublime Text</code>\u4E0D\u4EC5\u4EC5\u662F\u80FD\u591F\u67E5\u770B\u548C\u7F16\u8F91<code>Markdown</code>\u6587\u4EF6\uFF0C\u4F46\u5B83\u4F1A\u89C6\u5B83\u4EEC\u4E3A\u683C\u5F0F\u5F88\u7CDF\u7CD5\u7684\u7EAF\u6587\u672C\u3002\u8FD9\u4E2A\u63D2\u4EF6\u901A\u8FC7\u9002\u5F53\u7684\u989C\u8272\u9AD8\u4EAE\u548C\u5176\u5B83\u529F\u80FD\u6765\u66F4\u597D\u5730\u5B8C\u6210\u8FD9\u4E9B\u4EFB\u52A1\u3002</p>
</li>
<li>
<p><a href="https://github.com/colinta/SublimeFileDiffs" target="_blank" rel="noopener noreferrer"><code>FileDiffs</code></a> \u8FD9\u4E2A\u63D2\u4EF6\u5141\u8BB8\u4F60\u770B\u5230<code>Sublime Text</code>\u4E2D\u4E24\u4E2A\u4E0D\u540C\u6587\u4EF6\u7684\u5DEE\u5F02\u3002\u4F60\u53EF\u4EE5\u6BD4\u8F83\u7684\u5BF9\u8C61\u53EF\u4EE5\u662F\u4ECE\u526A\u8D34\u677F\u4E2D\u590D\u5236\u7684\u6570\u636E\uFF0C\u6216\u5DE5\u7A0B\u4E2D\u7684\u6587\u4EF6\uFF0C\u5F53\u524D\u6253\u5F00\u7684\u6587\u4EF6\u7B49\u3002</p>
</li>
<li>
<p><a href="https://github.com/spadgos/sublime-jsdocs" target="_blank" rel="noopener noreferrer"><code>DocBlockr</code></a> <code>DocBlockr</code>\u53EF\u4EE5\u4F7F\u4F60\u5F88\u65B9\u4FBF\u5730\u5BF9\u4EE3\u7801\u5EFA\u7ACB\u6587\u6863\u3002\u5B83\u4F1A\u89E3\u6790\u51FD\u6570\uFF0C\u53D8\u91CF\uFF0C\u548C\u53C2\u6570\uFF0C\u6839\u636E\u5B83\u4EEC\u81EA\u52A8\u751F\u6210\u6587\u6863\u8303\u5F0F\uFF0C\u4F60\u7684\u5DE5\u4F5C\u5C31\u662F\u53BB\u586B\u5145\u5BF9\u5E94\u7684\u8BF4\u660E\u3002</p>
</li>
<li>
<p><code>Snippets</code> <code>Snippets</code>\uFF0C\u4F60\u4E00\u5B9A\u5DF2\u7ECF\u542C\u8BF4\u4E86\uFF0C\u53EF\u4EE5\u5E2E\u4F60\u5FEB\u901F\u4E66\u5199\u4EE3\u7801\u3002\u4F46\u5B83\u4E0D\u662F\u50CF\u4E0A\u9762\u63D0\u5230\u7684\u63D2\u4EF6\u90A3\u6837\u4F7F\u7528\u7F29\u5199\uFF0C\u5B83\u662F\u91CD\u7528\u4EE3\u7801\u5757\u4EE5\u8282\u7701\u60A8\u7684\u65F6\u95F4\u3002\u4F60\u751A\u81F3\u53EF\u4EE5\u521B\u5EFA\u81EA\u5DF1\u7684\u4EE3\u7801\u6BB5\uFF0C\u8FD9\u5B8C\u5168\u53D6\u51B3\u4E8E\u4F60\u81EA\u5DF1\u3002</p>
</li>
<li>
<p><a href="https://github.com/sokolovstas/SublimeWebInspector" target="_blank" rel="noopener noreferrer"><code>WebInspector</code></a> \u8FD9\u4E2A\u63D2\u4EF6\u628A<code>Sublime Text</code>\u6253\u9020\u6210\u4E86\u4E00\u4E2A<code>Javascript</code>\u8C03\u8BD5\u5DE5\u5177,\u8C8C\u4F3C\u628A<code>Chrome</code>\u4E2D\u7684\u4E3B\u8981\u7684\u8C03\u8BD5\u529F\u80FD\u90FD\u6574\u5408\u8FDB\u6765\u4E86.</p>
</li>
<li>
<p><a href="https://sublime.wbond.net/packages/BracketHighlighter" target="_blank" rel="noopener noreferrer"><code>BracketHighlighter</code></a> \u8FD9\u4E2A\u63D2\u4EF6\u53EF\u4EE5\u663E\u793A\u51FA\u5F53\u524D\u5149\u6807\u6240\u5728\u7684\u5F00\u5408\u90E8\u5206 <img src="http://zxspace.qiniudn.com/blog/2014-11-7-img-0.jpg" alt="\u63D2\u56FE"></p>
</li>
<li>
<p><a href="https://sublimall.org/" target="_blank" rel="noopener noreferrer"><code>Sublimall</code></a> \u8FD9\u4E2A\u63D2\u4EF6\u80FD\u5728\u4F60\u6CE8\u518C\u5E10\u53F7\u540E\u5C06\u4F60\u7684<code>Sublime Text</code>\u6240\u6709\u914D\u7F6E\u540C\u6B65,\u7565\u540A~</p>
</li>
<li>
<p><a href="https://github.com/BoundInCode/AutoFileName" target="_blank" rel="noopener noreferrer"><code>AutoFileName</code></a> \u81EA\u52A8\u7D22\u5F15\u6587\u4EF6\u76EE\u5F55,\u8865\u5168\u6587\u4EF6\u540D</p>
</li>
<li>
<p><a href="https://github.com/aziz/PlainTasks" target="_blank" rel="noopener noreferrer"><code>PlainTasks</code></a> \u628A<code>Sublime Text</code>\u6253\u9020\u6210<code>Task</code>\u7BA1\u7406\u5DE5\u5177,\u597D\u53FC\u7684\u6837\u5B50~ <img src="http://zxspace.qiniudn.com/blog/2014-11-7-img-1.jpg" alt="\u63D2\u56FE"></p>
</li>
</ul>
<p>\u672C\u6BB5\u53C2\u8003:</p>
<ul>
<li><a href="http://ipestov.com/the-best-plugins-for-sublime-text/" target="_blank" rel="noopener noreferrer">http://ipestov.com/the-best-plugins-for-sublime-text/</a></li>
<li><a href="http://www.oschina.net/translate/20-powerful-sublimetext-plugins" target="_blank" rel="noopener noreferrer">http://www.oschina.net/translate/20-powerful-sublimetext-plugins</a></li>
</ul>
<p>(2014 \u5E74 11 \u6708 8 \u65E5, AM 07:06:35 \u4FEE\u6539)</p>
<ul>
<li><code>Gist</code> \u53EF\u5728<code>Sublime Text</code>\u4E0A\u4F7F\u7528\u548C\u7F16\u8F91<code>Gist</code>\u7684\u63D2\u4EF6</li>
</ul>
<p>(2015 \u5E74 1 \u6708 30 \u65E5, PM 5:57:00 \u4FEE\u6539)</p>
<ul>
<li>
<p><code>JsFormat</code> \u770B\u540D\u5B57\u5C31\u77E5\u9053\u662F\u7528\u4E8E\u683C\u5F0F\u5316<code>JS</code>\u7684\u4E86,\u4E0D\u5E9F\u8BDD</p>
</li>
<li>
<p><code>CSS Format</code> \u770B\u540D\u5B57\u5C31\u77E5\u9053\u662F\u7528\u4E8E\u683C\u5F0F\u5316<code>CSS</code>\u7684\u4E86,\u540C\u6837\u4E0D\u5E9F\u8BDD</p>
</li>
<li>
<p><code>Tag</code> \u4E00\u6B3E\u683C\u5F0F\u5316\u7EC4\u4EF6,\u4E2A\u4EBA\u7528\u4E8E\u683C\u5F0F\u5316<code>HTML</code></p>
</li>
</ul>
<h2 id="\u4E3B\u9898\u63A8\u8350" tabindex="-1">\u4E3B\u9898\u63A8\u8350 <a class="header-anchor" href="#\u4E3B\u9898\u63A8\u8350" aria-hidden="true">#</a></h2>
<ul>
<li>
<p><a href="http://colorsublime.com/" target="_blank" rel="noopener noreferrer">colorsublime,\u4E00\u4E2A\u4E3B\u9898\u63D0\u4F9B\u7AD9\u70B9</a></p>
</li>
<li>
<p><a href="http://kkga.github.io/spacegray/" target="_blank" rel="noopener noreferrer"><code>SpaceGray</code></a> <img src="http://zxspace.qiniudn.com/blog/2014-11-7-img-2.jpg" alt="\u4E3B\u9898\u56FE\u7247"></p>
</li>
<li>
<p><a href="https://github.com/allanhortle/Centurion" target="_blank" rel="noopener noreferrer"><code>Centurion</code></a> <img src="http://zxspace.qiniudn.com/blog/2014-11-7-img-3.jpg" alt="\u4E3B\u9898\u56FE\u7247"></p>
</li>
<li>
<p><a href="https://github.com/thinkpixellab/flatland" target="_blank" rel="noopener noreferrer"><code>flatland</code></a> <img src="http://zxspace.qiniudn.com/blog/2014-11-7-img-4.jpg" alt="\u4E3B\u9898\u56FE\u7247"></p>
</li>
<li>
<p><a href="https://github.com/jamiewilson/predawn" target="_blank" rel="noopener noreferrer"><code>predawn</code></a> <img src="http://zxspace.qiniudn.com/blog/2014-11-7-img-5.jpg" alt="\u4E3B\u9898\u56FE\u7247"></p>
</li>
<li>
<p><a href="https://sublime.wbond.net/packages/Theme%20-%20itg.flat" target="_blank" rel="noopener noreferrer"><code>itg.\u200Bflat</code></a> <img src="http://zxspace.qiniudn.com/blog/2014-11-7-img-6.jpg" alt="\u4E3B\u9898\u56FE\u7247"></p>
</li>
</ul>
`;export{n as __pageData,a as default};
