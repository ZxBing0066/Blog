import"./app.d36d7bad.js";const e='{"title":"Tmux \u914D\u7F6E\u8BE6\u89E3","description":"","frontmatter":{"date":"2016-08-15T06:57:47.000Z","tags":["terminal","tmux"]},"headers":[{"level":2,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5"},{"level":2,"title":"panes \u7684\u9ED8\u8BA4\u5E03\u5C40\u65B9\u5F0F","slug":"panes-\u7684\u9ED8\u8BA4\u5E03\u5C40\u65B9\u5F0F"},{"level":2,"title":"CLIENTS \u548C SESSIONS","slug":"clients-\u548C-sessions"},{"level":2,"title":"WINDOWS \u548C PANES","slug":"windows-\u548C-panes"},{"level":2,"title":"\u5FEB\u6377\u952E","slug":"\u5FEB\u6377\u952E"},{"level":2,"title":"Trouble Shooting","slug":"trouble-shooting"}],"relativePath":"blog/2016-08-15-tmux.md","createTime":1649686573000,"lastUpdated":1647786576000}';var n=()=>`<h1 id="tmux-\u914D\u7F6E\u8BE6\u89E3" tabindex="-1">Tmux \u914D\u7F6E\u8BE6\u89E3 <a class="header-anchor" href="#tmux-\u914D\u7F6E\u8BE6\u89E3" aria-hidden="true">#</a></h1>
<blockquote>
<p>Tmux \u662F\u4E00\u4E2A\u7BA1\u7406\u7EC8\u7AEF\u7A97\u53E3\u4F1A\u8BDD\u7684\u5DE5\u5177,\u5B98\u65B9\u7684\u8BF4\u660E\u662F<code>terminal multiplexer</code>,\u76F4\u8BD1\u8FC7\u6765\u5C31\u662F\u7EC8\u7AEF\u591A\u8DEF\u8F6C\u6362\u5668,...\u5F88\u9AD8\u5927\u4E0A\u7684\u6837\u5B50.</p>
</blockquote>
<h2 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h2>
<ul>
<li>\u5305\u7BA1\u7406\u5668\u5B89\u88C5</li>
</ul>
<div class="language-bash"><pre><code>brew <span class="token function">install</span> tmux
</code></pre>
</div><ul>
<li>\u7F16\u8BD1\u5B89\u88C5</li>
</ul>
<div class="language-bash"><pre><code><span class="token function">git</span> clone https://github.com/tmux/tmux.git <span class="token comment"># \u83B7\u53D6\u60F3\u8981\u5B89\u88C5\u7684\u7248\u672C\u6E90\u7801</span>
<span class="token builtin class-name">cd</span> tmux
<span class="token function">sh</span> autogen.sh
./configure <span class="token operator">&amp;&amp;</span> <span class="token function">make</span>
</code></pre>
</div><p>\u5B89\u88C5\u524D\u9700\u6CE8\u610F\u5B89\u88C5<code>gcc</code>\u7B49\u7F16\u8BD1\u4F9D\u8D56\u5305</p>
<h2 id="panes-\u7684\u9ED8\u8BA4\u5E03\u5C40\u65B9\u5F0F" tabindex="-1">panes \u7684\u9ED8\u8BA4\u5E03\u5C40\u65B9\u5F0F <a class="header-anchor" href="#panes-\u7684\u9ED8\u8BA4\u5E03\u5C40\u65B9\u5F0F" aria-hidden="true">#</a></h2>
<p>\u9ED8\u8BA4\u6709 even-horizontal, even-vertical, main-horizontal, main-vertical, tiled \u4E94\u79CD\u5E03\u5C40\u65B9\u5F0F</p>
<h2 id="clients-\u548C-sessions" tabindex="-1">CLIENTS \u548C SESSIONS <a class="header-anchor" href="#clients-\u548C-sessions" aria-hidden="true">#</a></h2>
<p><code>CLIENTS</code>\u4EE3\u8868\u8FD0\u884C\u4E86 tmux \u7684\u7EC8\u7AEF,<code>SESSIONS</code>\u4EE3\u8868 tmux \u4E2D\u7684\u4F1A\u8BDD.</p>
<h2 id="windows-\u548C-panes" tabindex="-1">WINDOWS \u548C PANES <a class="header-anchor" href="#windows-\u548C-panes" aria-hidden="true">#</a></h2>
<p><code>WINDOWS</code>\u4EE3\u8868 tmux \u4E2D\u7684\u7A97\u53E3,<code>PANES</code>\u4EE3\u8868 tmux \u4E2D\u7684\u9762\u677F.</p>
<h2 id="\u5FEB\u6377\u952E" tabindex="-1">\u5FEB\u6377\u952E <a class="header-anchor" href="#\u5FEB\u6377\u952E" aria-hidden="true">#</a></h2>
<table>
<thead>
<tr>
<th style="text-align:left">\u5FEB\u6377\u952E</th>
<th style="text-align:left">\u7528\u9014</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">C-b</td>
<td style="text-align:left">\u524D\u7F6E\u529F\u80FD\u952E,\u6240\u6709\u5FEB\u6377\u952E\u90FD\u662F\u5728\u6B64\u4E4B\u540E\u8F93\u5165\u6765\u89E6\u53D1\u7684</td>
</tr>
<tr>
<td style="text-align:left">?</td>
<td style="text-align:left">\u5217\u51FA\u6309\u952E\u7ED1\u5B9A</td>
</tr>
<tr>
<td style="text-align:left">:</td>
<td style="text-align:left">\u8FDB\u5165\u547D\u4EE4\u6A21\u5F0F</td>
</tr>
<tr>
<td style="text-align:left">C-z</td>
<td style="text-align:left">\u6302\u8D77</td>
</tr>
<tr>
<td style="text-align:left">t</td>
<td style="text-align:left">\u663E\u793A\u65F6\u95F4</td>
</tr>
<tr>
<td style="text-align:left">~</td>
<td style="text-align:left">\u663E\u793A tmux \u4E4B\u524D\u7684\u6D88\u606F\u901A\u77E5</td>
</tr>
<tr>
<td style="text-align:left">C,M-o</td>
<td style="text-align:left">\u65CB\u8F6C,\u53CD\u5411\u65CB\u8F6C\u5F53\u524D panes \u7684\u5E03\u5C40</td>
</tr>
<tr>
<td style="text-align:left">M-1~5</td>
<td style="text-align:left">\u5207\u6362\u5BF9\u5E94\u7684 panes \u7684\u9ED8\u8BA4\u5E03\u5C40</td>
</tr>
<tr>
<td style="text-align:left">Space</td>
<td style="text-align:left">\u5728 panes \u7684\u9ED8\u8BA4\u5E03\u5C40\u4E2D\u5FAA\u73AF\u5207\u6362</td>
</tr>
<tr>
<td style="text-align:left">C,M-\u65B9\u5411\u952E</td>
<td style="text-align:left">\u4EE5\u6BCF\u6B21 1,5 \u50CF\u7D20\u8C03\u6574 pane \u5927\u5C0F</td>
</tr>
<tr>
<td style="text-align:left">\u65B9\u5411\u952E</td>
<td style="text-align:left">\u6309\u65B9\u5411\u8FDB\u5165 pane</td>
</tr>
<tr>
<td style="text-align:left">&quot;,%</td>
<td style="text-align:left">\u4E0A\u4E0B,\u5DE6\u53F3\u5206\u5272 pane</td>
</tr>
<tr>
<td style="text-align:left">;</td>
<td style="text-align:left">\u5207\u6362\u5230\u4E4B\u524D\u7684 pane</td>
</tr>
<tr>
<td style="text-align:left">o</td>
<td style="text-align:left">\u5207\u6362\u5230\u4E0B\u4E00\u4E2A pane</td>
</tr>
<tr>
<td style="text-align:left">q</td>
<td style="text-align:left">\u663E\u793A pane \u7684 index</td>
</tr>
<tr>
<td style="text-align:left">m</td>
<td style="text-align:left">\u6807\u8BB0\u5F53\u524D pane</td>
</tr>
<tr>
<td style="text-align:left">M</td>
<td style="text-align:left">\u6E05\u9664\u7F16\u8F91\u7684 pane</td>
</tr>
<tr>
<td style="text-align:left">x</td>
<td style="text-align:left">\u5E72\u6389\u5F53\u524D pane</td>
</tr>
<tr>
<td style="text-align:left">z</td>
<td style="text-align:left">\u5207\u6362\u5F53\u524D pane \u7684\u7F29\u653E\u6A21\u5F0F</td>
</tr>
<tr>
<td style="text-align:left" ,=""></td>
<td style="text-align:left">\u5411\u524D,\u540E\u4EA4\u6362 pane \u4F4D\u7F6E</td>
</tr>
<tr>
<td style="text-align:left">!</td>
<td style="text-align:left">\u5C06\u5F53\u524D pane \u8131\u79BB\u5F53\u524D window \u72EC\u7ACB\u65B0\u5F00\u4E00\u4E2A window</td>
</tr>
<tr>
<td style="text-align:left">c</td>
<td style="text-align:left">\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684 window</td>
</tr>
<tr>
<td style="text-align:left">&amp;</td>
<td style="text-align:left">\u5E72\u6389\u5F53\u524D\u7684 window</td>
</tr>
<tr>
<td style="text-align:left">f</td>
<td style="text-align:left">\u641C\u7D22 window</td>
</tr>
<tr>
<td style="text-align:left">w</td>
<td style="text-align:left">\u5217\u51FA\u6240\u6709\u7684 window</td>
</tr>
<tr>
<td style="text-align:left">i</td>
<td style="text-align:left">\u663E\u793A\u5F53\u524D window \u7684\u4E00\u4E9B\u4FE1\u606F</td>
</tr>
<tr>
<td style="text-align:left">l</td>
<td style="text-align:left">\u5207\u6362\u5230\u4E4B\u524D\u7684 window</td>
</tr>
<tr>
<td style="text-align:left">p,n</td>
<td style="text-align:left">\u5207\u6362\u5230\u4E0B\u4E00\u4E2A window</td>
</tr>
<tr>
<td style="text-align:left">0~9</td>
<td style="text-align:left">\u5207\u6362\u5BF9\u5E94 index \u7684 window</td>
</tr>
<tr>
<td style="text-align:left">'</td>
<td style="text-align:left">\u8F93\u5165 window \u7684 index \u6765\u5207\u6362 window</td>
</tr>
<tr>
<td style="text-align:left">.</td>
<td style="text-align:left">\u8F93\u5165\u8BBE\u7F6E\u5F53\u524D window \u7684 index</td>
</tr>
<tr>
<td style="text-align:left">,</td>
<td style="text-align:left">\u91CD\u547D\u540D\u5F53\u524D window</td>
</tr>
<tr>
<td style="text-align:left">$</td>
<td style="text-align:left">\u91CD\u547D\u540D session</td>
</tr>
<tr>
<td style="text-align:left">(,)</td>
<td style="text-align:left">\u5411\u524D,\u5411\u540E\u5207\u6362 session</td>
</tr>
<tr>
<td style="text-align:left">L</td>
<td style="text-align:left">\u5207\u6362\u81F3\u4E4B\u524D\u7684 session</td>
</tr>
<tr>
<td style="text-align:left">s</td>
<td style="text-align:left">\u5217\u51FA\u6240\u6709\u7684 session</td>
</tr>
<tr>
<td style="text-align:left">[</td>
<td style="text-align:left">\u8FDB\u5165\u590D\u5236\u6A21\u5F0F</td>
</tr>
<tr>
<td style="text-align:left">#</td>
<td style="text-align:left">\u5217\u51FA\u6240\u6709\u7684\u7C98\u8D34\u7F13\u51B2\u533A</td>
</tr>
<tr>
<td style="text-align:left">]</td>
<td style="text-align:left">\u7C98\u8D34\u6700\u8FD1\u7684\u7F13\u51B2\u533A\u5185\u5BB9</td>
</tr>
<tr>
<td style="text-align:left">=</td>
<td style="text-align:left">\u9009\u62E9\u7C98\u8D34\u7684\u7F13\u51B2\u533A</td>
</tr>
<tr>
<td style="text-align:left">-</td>
<td style="text-align:left">\u5220\u9664\u6700\u8FD1\u7684\u7C98\u8D34\u7F13\u51B2\u533A</td>
</tr>
<tr>
<td style="text-align:left">d</td>
<td style="text-align:left">\u65AD\u5F00\u5F53\u524D client</td>
</tr>
<tr>
<td style="text-align:left">D</td>
<td style="text-align:left">\u9009\u62E9\u4E00\u4E2A client \u4F7F\u5176\u65AD\u5F00</td>
</tr>
<tr>
<td style="text-align:left">r</td>
<td style="text-align:left">\u5F3A\u5236\u91CD\u7ED8\u5F53\u524D client</td>
</tr>
</tbody>
</table>
<br/>
<hr>
<br/>
<h2 id="trouble-shooting" tabindex="-1">Trouble Shooting <a class="header-anchor" href="#trouble-shooting" aria-hidden="true">#</a></h2>
<ul>
<li><code>tmux</code>\u6253\u5F00<code>emacs</code>\u65E0\u6CD5\u4F7F\u7528<code>shift+arrow</code>\u9009\u4E2D:</li>
</ul>
<p>\u5C06\u4EE5\u4E0B\u5185\u5BB9\u6DFB\u52A0\u5230<code>~/.tmux.conf</code>:</p>
<div class="language-"><pre><code>setw -g xterm-keys on
</code></pre>
</div><p>\u5C06\u4EE5\u4E0B\u5185\u5BB9\u6DFB\u52A0\u5230<code>~/.emacs.d/init.el</code>:</p>
<div class="language-"><pre><code>;; handle tmux&#39;s xterm-keys
;; put the following line in your ~/.tmux.conf:
;;   setw -g xterm-keys on
(if (getenv &quot;TMUX&quot;)
  (progn
    (let ((x 2) (tkey &quot;&quot;))
  (while (&lt;= x 8)
    ;; shift
    (if (= x 2)
        (setq tkey &quot;S-&quot;))
    ;; alt
    (if (= x 3)
        (setq tkey &quot;M-&quot;))
    ;; alt + shift
    (if (= x 4)
        (setq tkey &quot;M-S-&quot;))
    ;; ctrl
    (if (= x 5)
        (setq tkey &quot;C-&quot;))
    ;; ctrl + shift
    (if (= x 6)
        (setq tkey &quot;C-S-&quot;))
    ;; ctrl + alt
    (if (= x 7)
        (setq tkey &quot;C-M-&quot;))
    ;; ctrl + alt + shift
    (if (= x 8)
        (setq tkey &quot;C-M-S-&quot;))
    ;; arrows
    (define-key key-translation-map (kbd (format &quot;M-[ 1 ; %d A&quot; x)) (kbd (format &quot;%s&lt;up&gt;&quot; tkey)))
    (define-key key-translation-map (kbd (format &quot;M-[ 1 ; %d B&quot; x)) (kbd (format &quot;%s&lt;down&gt;&quot; tkey)))
    (define-key key-translation-map (kbd (format &quot;M-[ 1 ; %d C&quot; x)) (kbd (format &quot;%s&lt;right&gt;&quot; tkey)))
    (define-key key-translation-map (kbd (format &quot;M-[ 1 ; %d D&quot; x)) (kbd (format &quot;%s&lt;left&gt;&quot; tkey)))
    ;; home
    (define-key key-translation-map (kbd (format &quot;M-[ 1 ; %d H&quot; x)) (kbd (format &quot;%s&lt;home&gt;&quot; tkey)))
    ;; end
    (define-key key-translation-map (kbd (format &quot;M-[ 1 ; %d F&quot; x)) (kbd (format &quot;%s&lt;end&gt;&quot; tkey)))
    ;; page up
    (define-key key-translation-map (kbd (format &quot;M-[ 5 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;prior&gt;&quot; tkey)))
    ;; page down
    (define-key key-translation-map (kbd (format &quot;M-[ 6 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;next&gt;&quot; tkey)))
    ;; insert
    (define-key key-translation-map (kbd (format &quot;M-[ 2 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;delete&gt;&quot; tkey)))
    ;; delete
    (define-key key-translation-map (kbd (format &quot;M-[ 3 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;delete&gt;&quot; tkey)))
    ;; f1
    (define-key key-translation-map (kbd (format &quot;M-[ 1 ; %d P&quot; x)) (kbd (format &quot;%s&lt;f1&gt;&quot; tkey)))
    ;; f2
    (define-key key-translation-map (kbd (format &quot;M-[ 1 ; %d Q&quot; x)) (kbd (format &quot;%s&lt;f2&gt;&quot; tkey)))
    ;; f3
    (define-key key-translation-map (kbd (format &quot;M-[ 1 ; %d R&quot; x)) (kbd (format &quot;%s&lt;f3&gt;&quot; tkey)))
    ;; f4
    (define-key key-translation-map (kbd (format &quot;M-[ 1 ; %d S&quot; x)) (kbd (format &quot;%s&lt;f4&gt;&quot; tkey)))
    ;; f5
    (define-key key-translation-map (kbd (format &quot;M-[ 15 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f5&gt;&quot; tkey)))
    ;; f6
    (define-key key-translation-map (kbd (format &quot;M-[ 17 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f6&gt;&quot; tkey)))
    ;; f7
    (define-key key-translation-map (kbd (format &quot;M-[ 18 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f7&gt;&quot; tkey)))
    ;; f8
    (define-key key-translation-map (kbd (format &quot;M-[ 19 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f8&gt;&quot; tkey)))
    ;; f9
    (define-key key-translation-map (kbd (format &quot;M-[ 20 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f9&gt;&quot; tkey)))
    ;; f10
    (define-key key-translation-map (kbd (format &quot;M-[ 21 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f10&gt;&quot; tkey)))
    ;; f11
    (define-key key-translation-map (kbd (format &quot;M-[ 23 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f11&gt;&quot; tkey)))
    ;; f12
    (define-key key-translation-map (kbd (format &quot;M-[ 24 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f12&gt;&quot; tkey)))
    ;; f13
    (define-key key-translation-map (kbd (format &quot;M-[ 25 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f13&gt;&quot; tkey)))
    ;; f14
    (define-key key-translation-map (kbd (format &quot;M-[ 26 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f14&gt;&quot; tkey)))
    ;; f15
    (define-key key-translation-map (kbd (format &quot;M-[ 28 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f15&gt;&quot; tkey)))
    ;; f16
    (define-key key-translation-map (kbd (format &quot;M-[ 29 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f16&gt;&quot; tkey)))
    ;; f17
    (define-key key-translation-map (kbd (format &quot;M-[ 31 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f17&gt;&quot; tkey)))
    ;; f18
    (define-key key-translation-map (kbd (format &quot;M-[ 32 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f18&gt;&quot; tkey)))
    ;; f19
    (define-key key-translation-map (kbd (format &quot;M-[ 33 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f19&gt;&quot; tkey)))
    ;; f20
    (define-key key-translation-map (kbd (format &quot;M-[ 34 ; %d ~&quot; x)) (kbd (format &quot;%s&lt;f20&gt;&quot; tkey)))

    (setq x (+ x 1))
    ))
  )
)
</code></pre>
</div><p><a href="http://unix.stackexchange.com/questions/24414/shift-arrow-not-working-in-emacs-within-tmux" target="_blank" rel="noopener noreferrer">\u7B54\u6848\u5730\u5740</a></p>
<blockquote>
<p><a href="https://github.com/tmux/tmux" target="_blank" rel="noopener noreferrer">tmux github \u5730\u5740</a></p>
</blockquote>
<blockquote>
<p><a href="http://manpages.ubuntu.com/manpages/xenial/en/man1/tmux.1.html" target="_blank" rel="noopener noreferrer">\u53C2\u8003\u6587\u6863</a></p>
</blockquote>
`;export{e as __pageData,n as default};
