import"./app.d36d7bad.js";const a='{"title":"Jekyll on Windows \u5B89\u88C5","description":"","frontmatter":{"date":"2014-09-12T22:02:12.000Z","tags":["github","jekyll","blog"]},"headers":[{"level":2,"title":"\u5B89\u88C5 ruby","slug":"\u5B89\u88C5-ruby"},{"level":2,"title":"\u5B89\u88C5 Ruby DevKit","slug":"\u5B89\u88C5-ruby-devkit"},{"level":2,"title":"\u5B89\u88C5 Jekyll Gem","slug":"\u5B89\u88C5-jekyll-gem"},{"level":2,"title":"\u5B89\u88C5 python","slug":"\u5B89\u88C5-python"},{"level":2,"title":"\u4EE3\u7801\u9AD8\u4EAE","slug":"\u4EE3\u7801\u9AD8\u4EAE"}],"relativePath":"blog/2014-09-12-how-to-use-jekyll.md","createTime":1649686573000,"lastUpdated":1647786576000}';var n=()=>`<h1 id="jekyll-on-windows-\u5B89\u88C5" tabindex="-1">Jekyll on Windows \u5B89\u88C5 <a class="header-anchor" href="#jekyll-on-windows-\u5B89\u88C5" aria-hidden="true">#</a></h1>
<blockquote>
<p><code>jekyll</code>\u662F\u4E00\u4E2A\u7B80\u5355\u7684\u9759\u6001\u9875\u9762\u751F\u6210\u5DE5\u5177,\u4E3B\u8981\u7528\u4E8E\u642D\u5EFA\u9759\u6001\u7B80\u6613<code>Blog</code></p>
</blockquote>
<h2 id="\u5B89\u88C5-ruby" tabindex="-1">\u5B89\u88C5 ruby <a class="header-anchor" href="#\u5B89\u88C5-ruby" aria-hidden="true">#</a></h2>
<p><a href="http://rubyinstaller.org/downloads/" target="_blank" rel="noopener noreferrer">ruby \u4E0B\u8F7D\u5730\u5740</a> (\u6CE8\u610F\u52FE\u9009 <code>Add Ruby executables to your PATH</code> \u5C06 Ruby \u6DFB\u52A0\u5230\u73AF\u5883\u53D8\u91CF)</p>
<h2 id="\u5B89\u88C5-ruby-devkit" tabindex="-1">\u5B89\u88C5 Ruby DevKit <a class="header-anchor" href="#\u5B89\u88C5-ruby-devkit" aria-hidden="true">#</a></h2>
<p><a href="http://rubyinstaller.org/downloads/" target="_blank" rel="noopener noreferrer">Ruby DevKit \u4E0B\u8F7D\u5730\u5740</a></p>
<p>\u6267\u884C\u540E\u89E3\u538B\u5230 <code>C:\\RubyDevKit\\</code> (\u5EFA\u8BAE)</p>
<div class="language-bash"><pre><code><span class="token builtin class-name">cd</span> C:<span class="token punctuation">\\</span>RubyDevKit
ruby dk.rb init
ruby dk.rb <span class="token function">install</span>
</code></pre>
</div><h2 id="\u5B89\u88C5-jekyll-gem" tabindex="-1">\u5B89\u88C5 Jekyll Gem <a class="header-anchor" href="#\u5B89\u88C5-jekyll-gem" aria-hidden="true">#</a></h2>
<div class="language-bash"><pre><code>gem <span class="token function">install</span> jekyll
</code></pre>
</div><p>\u5982\u679C\u51FA\u73B0\u8FDE\u63A5\u9519\u8BEF\u8BF7\u4FEE\u6539<code>gem</code>\u6E90,\u4E07\u6076\u7684<code>XXX</code>,\u5177\u4F53\u53EF\u770B<a href="http://ruby.taobao.org/" target="_blank" rel="noopener noreferrer">ruby.taobao</a></p>
<div class="language-bash"><pre><code>gem sources --remove https://rubygems.org/
gem sources -a https://ruby.taobao.org/
</code></pre>
</div><h2 id="\u5B89\u88C5-python" tabindex="-1">\u5B89\u88C5 python <a class="header-anchor" href="#\u5B89\u88C5-python" aria-hidden="true">#</a></h2>
<p><a href="https://www.python.org/download/releases/2.7.8/" target="_blank" rel="noopener noreferrer">python \u4E0B\u8F7D\u5730\u5740</a> (\u540C\u6837\u8BB0\u5F97\u52FE\u9009\u6DFB\u52A0\u73AF\u5883\u53D8\u91CF,\u4E0D\u7136\u5C31\u624B\u52A8\u6DFB\u52A0\u5427)</p>
<h2 id="\u4EE3\u7801\u9AD8\u4EAE" tabindex="-1">\u4EE3\u7801\u9AD8\u4EAE <a class="header-anchor" href="#\u4EE3\u7801\u9AD8\u4EAE" aria-hidden="true">#</a></h2>
<p><code>jekyll</code>\u9ED8\u8BA4\u4F7F\u7528\u7684<code>markdown</code>\u5F15\u64CE\u7684\u4EE3\u7801\u5757\u9AD8\u4EAE\u5199\u6CD5\u6BD4\u8F83\u86CB\u75BC,\u53EF\u4EE5\u6539\u4E3A<code>GFM</code>\u65B9\u5F0F\u89E3\u6790,\u5728<code>_config.yml</code>\u4E2D\u6DFB\u52A0\u914D\u7F6E.</p>
<div class="language-xml"><pre><code>kramdown
    input: GFM
</code></pre>
</div><p>\u7136\u540E\u6DFB\u52A0\u4E0A<code>highlight.js</code>\u4E4B\u7C7B\u7684\u9AD8\u4EAE\u5E93\u5C31\u53EF\u4EE5\u8131\u79BB\u86CB\u75BC\u7684\u4EE3\u7801\u9AD8\u4EAE\u5199\u6CD5\u4F7F\u7528<code>GFM</code>\u65B9\u5F0F\u6765\u7F16\u5199\u4E86</p>
<p>\u53C2\u8003\u6587\u6863:</p>
<ul>
<li><a href="http://jekyll-windows.juthilo.com/" title="Jekyll on Windows" target="_blank" rel="noopener noreferrer">Jekyll on Windows \u82F1\u6587\u6559\u7A0B</a></li>
</ul>
`;export{a as __pageData,n as default};
