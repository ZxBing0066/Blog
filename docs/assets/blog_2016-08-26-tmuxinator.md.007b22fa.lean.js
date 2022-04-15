import"./app.d36d7bad.js";const a='{"title":"tmuxinator \u4F7F\u7528","description":"","frontmatter":{"date":"2016-08-26T06:03:27.000Z","tags":["terminal","tmux"]},"headers":[{"level":3,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5"},{"level":3,"title":"\u8BBE\u7F6E\u9ED8\u8BA4\u7F16\u8F91\u5668","slug":"\u8BBE\u7F6E\u9ED8\u8BA4\u7F16\u8F91\u5668"},{"level":3,"title":"\u81EA\u52A8\u8865\u5168","slug":"\u81EA\u52A8\u8865\u5168"},{"level":3,"title":"\u4F7F\u7528","slug":"\u4F7F\u7528"},{"level":3,"title":"\u5176\u4ED6\u547D\u4EE4","slug":"\u5176\u4ED6\u547D\u4EE4"},{"level":3,"title":"\u9879\u76EE\u6587\u4EF6\u8BE6\u89E3","slug":"\u9879\u76EE\u6587\u4EF6\u8BE6\u89E3"}],"relativePath":"blog/2016-08-26-tmuxinator.md","createTime":1649686573000,"lastUpdated":1647786576000}';var s=()=>`<h1 id="tmuxinator-\u4F7F\u7528" tabindex="-1">tmuxinator \u4F7F\u7528 <a class="header-anchor" href="#tmuxinator-\u4F7F\u7528" aria-hidden="true">#</a></h1>
<blockquote>
<p>tmuxinator \u662F\u4E00\u4E2A tmux \u7684\u7BA1\u7406\u5DE5\u5177,\u4F7F\u7528\u5B83\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u521B\u5EFA\u548C\u7BA1\u7406 tmux. <a href="https://github.com/tmuxinator/tmuxinator" target="_blank" rel="noopener noreferrer">github \u5730\u5740</a></p>
</blockquote>
<h3 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h3>
<div class="language-bash"><pre><code>gem <span class="token function">install</span> tmuxinator
</code></pre>
</div><h3 id="\u8BBE\u7F6E\u9ED8\u8BA4\u7F16\u8F91\u5668" tabindex="-1">\u8BBE\u7F6E\u9ED8\u8BA4\u7F16\u8F91\u5668 <a class="header-anchor" href="#\u8BBE\u7F6E\u9ED8\u8BA4\u7F16\u8F91\u5668" aria-hidden="true">#</a></h3>
<p>tmuxinator \u67D0\u4E9B\u64CD\u4F5C(\u5982\u521B\u5EFA\u9879\u76EE\u540E\u6253\u5F00)\u4F1A\u9700\u8981\u8C03\u7528\u9ED8\u8BA4\u7F16\u8F91\u5668,\u53EF\u4EE5\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\u67E5\u770B\u9ED8\u8BA4\u7F16\u8F91\u5668:</p>
<div class="language-bash"><pre><code><span class="token builtin class-name">echo</span> <span class="token variable">$EDITOR</span>
</code></pre>
</div><p>\u82E5\u662F\u6CA1\u6709\u8BBE\u7F6E\u53EF\u4EE5\u5C06\u4EE5\u4E0B\u4EE3\u7801\u6DFB\u52A0\u5230\u4F60\u7684\u9ED8\u8BA4 shell \u914D\u7F6E\u6587\u4EF6\u4E2D:</p>
<div class="language-bash"><pre><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">EDITOR</span><span class="token operator">=</span><span class="token string">'vim'</span>
</code></pre>
</div><h3 id="\u81EA\u52A8\u8865\u5168" tabindex="-1">\u81EA\u52A8\u8865\u5168 <a class="header-anchor" href="#\u81EA\u52A8\u8865\u5168" aria-hidden="true">#</a></h3>
<p>\u4ECE\u4ED3\u5E93\u4E2D\u6216\u8005\u662F\u6E90\u7801\u4E2D\u4E0B\u8F7D\u5BF9\u5E94\u7684\u6587\u4EF6\u653E\u5230<code>~/.bin</code>\u6587\u4EF6\u5939\u4E2D,\u7136\u540E\u5C06\u5176\u914D\u7F6E\u5230<code>shell</code>\u914D\u7F6E\u6587\u4EF6\u4E2D,\u4EE5<code>zsh</code>\u4E3A\u4F8B:</p>
<div class="language-"><pre><code>source ~/.bin/tmuxinator.zsh
</code></pre>
</div><h3 id="\u4F7F\u7528" tabindex="-1">\u4F7F\u7528 <a class="header-anchor" href="#\u4F7F\u7528" aria-hidden="true">#</a></h3>
<ul>
<li>
<p>\u521B\u5EFA\u4E00\u4E2A\u9879\u76EE</p>
<div class="language-bash"><pre><code>tmuxinator new <span class="token punctuation">[</span>project<span class="token punctuation">]</span>
</code></pre>
</div></li>
<li>
<p>\u7F16\u8F91\u9879\u76EE</p>
<div class="language-bash"><pre><code>tmuxinator <span class="token function">open</span> <span class="token punctuation">[</span>project<span class="token punctuation">]</span>
</code></pre>
</div></li>
<li>
<p>\u6253\u5F00\u4E00\u4E2A session</p>
<div class="language-bash"><pre><code>tmuxinator start <span class="token punctuation">[</span>project<span class="token punctuation">]</span> <span class="token punctuation">[</span>alias<span class="token punctuation">]</span>
</code></pre>
</div><p>\u4F7F\u7528 alias \u5C06\u4F1A\u4E3A session \u8BBE\u5B9A\u4E00\u4E2A\u522B\u540D,\u8BA9\u540C\u4E00\u4E2A\u914D\u7F6E\u6587\u4EF6\u53EF\u4EE5\u91CD\u7528</p>
</li>
</ul>
<h3 id="\u5176\u4ED6\u547D\u4EE4" tabindex="-1">\u5176\u4ED6\u547D\u4EE4 <a class="header-anchor" href="#\u5176\u4ED6\u547D\u4EE4" aria-hidden="true">#</a></h3>
<ul>
<li>
<p>\u590D\u5236\u4E00\u4E2A\u5DF2\u6709\u7684\u9879\u76EE</p>
<div class="language-bash"><pre><code>tmuxinator copy <span class="token punctuation">[</span>existing<span class="token punctuation">]</span> <span class="token punctuation">[</span>new<span class="token punctuation">]</span>
</code></pre>
</div></li>
<li>
<p>\u5217\u51FA\u6240\u6709\u9879\u76EE</p>
<div class="language-bash"><pre><code>tmuxinator list
</code></pre>
</div></li>
<li>
<p>\u5220\u9664\u9879\u76EE</p>
<div class="language-bash"><pre><code>tmuxinator delete <span class="token punctuation">[</span>project<span class="token punctuation">]</span>
</code></pre>
</div></li>
<li>
<p>\u6E05\u7A7A\u6240\u6709\u914D\u7F6E\u9879</p>
<div class="language-bash"><pre><code>tmuxinator implode
</code></pre>
</div></li>
<li>
<p>\u68C0\u67E5\u73AF\u5883\u914D\u7F6E\u6587\u4EF6\u7B49</p>
<div class="language-bash"><pre><code>tmuxinator doctor
</code></pre>
</div></li>
<li>
<p>\u663E\u793A\u5E2E\u52A9</p>
<div class="language-bash"><pre><code>tmuxinator <span class="token builtin class-name">help</span>
</code></pre>
</div></li>
<li>
<p>\u663E\u793A\u9879\u76EE\u6267\u884C\u7684 shell \u547D\u4EE4</p>
<div class="language-bash"><pre><code>tmuxinator debug <span class="token punctuation">[</span>project<span class="token punctuation">]</span>
</code></pre>
</div></li>
<li>
<p>\u663E\u793A\u7248\u672C\u53F7</p>
<div class="language-bash"><pre><code>tmuxinator version
</code></pre>
</div></li>
</ul>
<h3 id="\u9879\u76EE\u6587\u4EF6\u8BE6\u89E3" tabindex="-1">\u9879\u76EE\u6587\u4EF6\u8BE6\u89E3 <a class="header-anchor" href="#\u9879\u76EE\u6587\u4EF6\u8BE6\u89E3" aria-hidden="true">#</a></h3>
<div class="language-yml"><pre><code><span class="token comment"># ~/.tmuxinator/sample.yml</span>

<span class="token key atrule">name</span><span class="token punctuation">:</span> sample <span class="token comment"># \u5B9A\u4E49\u9879\u76EE\u540D\u79F0</span>
<span class="token key atrule">root</span><span class="token punctuation">:</span> ~/ <span class="token comment"># \u9879\u76EE\u6839\u8DEF\u5F84,\u6240\u6709window\u548Cpane\u7684\u9ED8\u8BA4\u8DEF\u5F84</span>

<span class="token comment"># Optional. tmux socket</span>
<span class="token comment"># socket_name: foo</span>

<span class="token comment"># Runs before everything. Use it to start daemons etc.</span>
<span class="token comment"># \u542F\u52A8\u9879\u76EE\u524D\u524D\u4F1A\u5148\u6267\u884C\u4E0B\u9762\u7684\u547D\u4EE4,</span>
<span class="token comment"># pre: sudo /etc/rc.d/mysqld start</span>

<span class="token comment"># Runs in each window and pane before window/pane specific commands. Useful for setting up interpreter versions.</span>
<span class="token comment"># \u5927\u6982\u610F\u601D\u662F\u8FDB\u5165\u6BCF\u4E2Awindow\u548Cpane\u524D\u90FD\u4F1A\u6267\u884C\u4E0B\u9762\u7684\u547D\u4EE4, \u53EF\u4EE5\u7528\u6765\u8FDB\u5165\u6307\u5B9A\u7684\u89E3\u91CA\u5668.</span>
<span class="token comment"># pre_window: rbenv shell 2.0.0-p247</span>

<span class="token comment"># Pass command line options to tmux. Useful for specifying a different tmux.conf.</span>
<span class="token comment"># \u7528\u6765\u5B9A\u4E49\u9879\u76EE\u81EA\u5DF1\u7684tmux\u914D\u7F6E\u6587\u4EF6</span>
<span class="token comment"># tmux_options: -f ~/.tmux.mac.conf</span>

<span class="token comment"># Change the command to call tmux.  This can be used by derivatives/wrappers like byobu.</span>
<span class="token comment"># \u989D...</span>
<span class="token comment"># tmux_command: byobu</span>

<span class="token comment"># Specifies (by name or index) which window will be selected on project startup. If not set, the first window is used.</span>
<span class="token comment"># \u5B9A\u4E49\u9879\u76EE\u542F\u52A8\u65F6\u9ED8\u8BA4\u8FDB\u5165\u90A3\u4E2A\u7A97\u53E3</span>
<span class="token comment"># startup_window: logs</span>

<span class="token key atrule">windows</span><span class="token punctuation">:</span> <span class="token comment"># \u4E0B\u9762\u662F\u9879\u76EE\u4E2D\u7684\u6240\u6709\u7A97\u53E3\u5B9A\u4E49</span>
    <span class="token punctuation">-</span> <span class="token key atrule">editor</span><span class="token punctuation">:</span> <span class="token comment"># \u7A97\u53E3\u540D\u79F0</span>
          <span class="token key atrule">layout</span><span class="token punctuation">:</span> main<span class="token punctuation">-</span>vertical <span class="token comment"># \u7A97\u53E3\u7684\u5E03\u5C40\u65B9\u5F0F</span>
          <span class="token key atrule">root</span><span class="token punctuation">:</span> ~/ <span class="token comment"># \u7A97\u53E3\u7684\u6839\u76EE\u5F55,\u4E0D\u5B9A\u4E49\u5C31\u4F7F\u7528\u9879\u76EE\u7684root</span>
          <span class="token key atrule">panes</span><span class="token punctuation">:</span> <span class="token comment"># \u7A97\u53E3\u4E0B\u7684\u9762\u677F</span>
              <span class="token punctuation">-</span> vim <span class="token comment"># \u9762\u677F\u9ED8\u8BA4\u6267\u884C\u547D\u4EE4</span>
              <span class="token punctuation">-</span> guard
    <span class="token punctuation">-</span> <span class="token key atrule">server</span><span class="token punctuation">:</span> bundle exec rails s
    <span class="token punctuation">-</span> <span class="token key atrule">logs</span><span class="token punctuation">:</span> tail <span class="token punctuation">-</span>f log/development.log
</code></pre>
</div>`;export{a as __pageData,s as default};
