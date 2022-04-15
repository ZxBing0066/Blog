import"./app.d36d7bad.js";const e='{"title":"Tmux \u914D\u7F6E","description":"","frontmatter":{"date":"2016-08-27T05:45:43.000Z","tags":["terminal","tmux"]},"headers":[{"level":3,"title":"\u914D\u7F6E\u6587\u4EF6","slug":"\u914D\u7F6E\u6587\u4EF6"},{"level":3,"title":"\u914D\u7F6E\u6587\u4EF6\u4FEE\u6539","slug":"\u914D\u7F6E\u6587\u4EF6\u4FEE\u6539"},{"level":3,"title":"\u53C2\u8003\u6587\u732E","slug":"\u53C2\u8003\u6587\u732E"}],"relativePath":"blog/2016-08-27-tmux-config.md","createTime":1649686573000,"lastUpdated":1647786576000}';var n=()=>`<h1 id="tmux-\u914D\u7F6E" tabindex="-1">Tmux \u914D\u7F6E <a class="header-anchor" href="#tmux-\u914D\u7F6E" aria-hidden="true">#</a></h1>
<h3 id="\u914D\u7F6E\u6587\u4EF6" tabindex="-1">\u914D\u7F6E\u6587\u4EF6 <a class="header-anchor" href="#\u914D\u7F6E\u6587\u4EF6" aria-hidden="true">#</a></h3>
<p>\u4E2A\u4EBA<code>tmux</code>\u914D\u7F6E\u6587\u4EF6\u5730\u5740\u662F<code>~/.tmux.conf</code>,<code>mac</code>\u4E0B\u7684\u7CFB\u7EDF\u914D\u7F6E\u6587\u4EF6\u8DEF\u5F84<code>/etc/tmux.conf</code>(\u4E0D\u901A\u7CFB\u7EDF\u4E0B\u8DEF\u5F84\u4F1A\u4E0D\u76F8\u540C).</p>
<h3 id="\u914D\u7F6E\u6587\u4EF6\u4FEE\u6539" tabindex="-1">\u914D\u7F6E\u6587\u4EF6\u4FEE\u6539 <a class="header-anchor" href="#\u914D\u7F6E\u6587\u4EF6\u4FEE\u6539" aria-hidden="true">#</a></h3>
<ul>
<li>
<p>\u4FEE\u6539\u9ED8\u8BA4\u524D\u7F6E\u5FEB\u6377\u952E</p>
<div class="language-conf"><pre><code># remap prefix from &#39;C-b&#39; to &#39;C-a&#39;
unbind C-b # \u89E3\u7ED1C-b
set-option -g prefix C-a # \u8BBE\u7F6E\u524D\u7F6E\u5FEB\u6377\u952E\u4E3AC-a
bind-key C-a send-prefix # \u540C\u4E0A
</code></pre>
</div><blockquote>
<p>TODO \u5B9E\u8DF5\u4E86\u4E00\u4E0B\u53D1\u73B0\u8FD9\u5757\u633A\u5947\u602A,\u7B2C\u4E09\u53E5\u5B8C\u5168\u4E0D\u8D77\u4F5C\u7528,\u4E00\u4E8C\u4E24\u53E5\u53EF\u4EE5\u751F\u6548,\u4F46\u662F\u4E0D\u5199\u7B2C\u4E00\u53E5\u597D\u50CF\u4E5F\u4F1A\u88AB\u89E3\u7ED1,\u6709\u65F6\u53C8\u4F1A\u4E24\u4E2A\u4E00\u8D77\u751F\u6548.\u5F85\u6709\u7A7A\u7814\u7A76\u4E00\u4E0B...</p>
</blockquote>
</li>
<li>
<p>\u5FEB\u901F\u91CD\u8F7D\u914D\u7F6E\u6587\u4EF6</p>
<div class="language-conf"><pre><code># reload config file (change file location to your the tmux.conf you want to use)
bind r source-file ~/.tmux.conf \\; display-message &quot;config reloaded&quot;
</code></pre>
</div><p>\u914D\u7F6E\u540E\u53EF\u5B9E\u73B0<code>r</code>\u952E\u76F4\u63A5\u4ECE\u6587\u4EF6\u4E2D\u5237\u65B0\u914D\u7F6E.\u5E76\u663E\u793A\u63D0\u793A\u4FE1\u606F.</p>
</li>
<li>
<p>\u5F00\u542F\u9F20\u6807\u6A21\u5F0F</p>
<div class="language-conf"><pre><code>set -g mouse on
</code></pre>
</div><p>\u914D\u7F6E\u540E\u53EF\u4EE5\u4F7F\u7528\u9F20\u6807\u6765\u5B8C\u6210 window,pane \u7684\u5207\u6362,\u62D6\u62FD\u9009\u62E9\u5185\u5BB9,\u4FEE\u6539 pane \u5927\u5C0F\u7B49\u529F\u80FD. \u4E0A\u9762\u662F<code>tmux2.1</code>\u540E\u7684\u914D\u7F6E,<code>2.1</code>\u4E4B\u524D\u5982\u4F55\u914D\u7F6E\u53EF\u4EE5\u770B\u53C2\u8003\u6587\u732E\u4E2D\u7684\u5730\u5740\u6216\u8005\u81EA\u884C\u641C\u7D22.</p>
</li>
<li>
<p>\u5173\u95ED\u81EA\u52A8\u91CD\u547D\u540D\u7A97\u53E3</p>
<div class="language-conf"><pre><code># don&#39;t rename windows automatically
set-option -g allow-rename off
</code></pre>
</div><p>\u914D\u7F6E\u540E\u53EF\u4EE5\u9632\u6B62\u7A97\u53E3\u5728\u6267\u884C\u547D\u4EE4\u662F\u88AB\u81EA\u52A8\u91CD\u547D\u540D</p>
</li>
<li>
<p>\u6837\u5F0F\u4FEE\u6539</p>
<div class="language-conf"><pre><code>######################
### DESIGN CHANGES ###
######################

# pane\u7684\u6837\u5F0F
set -g pane-border-fg black
set -g pane-active-border-fg brightred

# \u72B6\u6001\u680F\u6837\u5F0F
set -g status-utf8 on # status-utf8\u5728tmux2.1\u4EE5\u4E0A\u8C8C\u4F3C\u4E0D\u652F\u6301
set -g status-justify left
set -g status-bg default
set -g status-fg colour12
set -g status-interval 2

# \u6D88\u606F\u680F\u6837\u5F0F
set -g message-fg black
set -g message-bg yellow
set -g message-command-fg blue
set -g message-command-bg black

# \u7A97\u53E3\u6A21\u5F0F
setw -g mode-bg colour6
setw -g mode-fg colour0

# \u7A97\u53E3\u72B6\u6001\u680F\u6837\u5F0F
setw -g window-status-format &quot; #F#I:#W#F &quot;
setw -g window-status-current-format &quot; #F#I:#W#F &quot;
setw -g window-status-format &quot;#[fg=magenta]#[bg=black] #I #[bg=cyan]#[fg=colour8] #W &quot;
setw -g window-status-current-format &quot;#[bg=brightmagenta]#[fg=colour8] #I #[fg=colour8]#[bg=colour14] #W &quot;
setw -g window-status-current-bg colour0
setw -g window-status-current-fg colour11
setw -g window-status-current-attr dim
setw -g window-status-bg green
setw -g window-status-fg black
setw -g window-status-attr reverse

# Info on left (I don&#39;t have a session display for now)
set -g status-left &#39;&#39;

# \u8BBE\u7F6E\u662F\u5426\u5B89\u9759\u6A21\u5F0F
set-option -g visual-activity off
set-option -g visual-bell off
set-option -g visual-silence off
set-window-option -g monitor-activity off
set-option -g bell-action none

set -g default-terminal &quot;screen-256color&quot;

# The modes {
setw -g clock-mode-colour colour135
setw -g mode-attr bold
setw -g mode-fg colour196
setw -g mode-bg colour238

# }
# The panes { \u9762\u677F\u6837\u5F0F

set -g pane-border-bg colour235
set -g pane-border-fg colour238
set -g pane-active-border-bg colour236
set -g pane-active-border-fg colour51

# }
# The statusbar { \u72B6\u6001\u680F

set -g status-position bottom
set -g status-bg colour234
set -g status-fg colour137
set -g status-attr dim
set -g status-left &#39;&#39;
set -g status-right &#39;#[fg=colour233,bg=colour241,bold] %d/%m #[fg=colour233,bg=colour245,bold] %H:%M:%S &#39;
set -g status-right-length 50
set -g status-left-length 20

setw -g window-status-current-fg colour81
setw -g window-status-current-bg colour238
setw -g window-status-current-attr bold
setw -g window-status-current-format &#39; #I#[fg=colour250]:#[fg=colour255]#W#[fg=colour50]#F &#39;

setw -g window-status-fg colour138
setw -g window-status-bg colour235
setw -g window-status-attr none
setw -g window-status-format &#39; #I#[fg=colour237]:#[fg=colour250]#W#[fg=colour244]#F &#39;

setw -g window-status-bell-attr bold
setw -g window-status-bell-fg colour255
setw -g window-status-bell-bg colour1

# }
# The messages { \u6D88\u606F\u63D0\u793A

set -g message-attr bold
set -g message-fg colour232
set -g message-bg colour166

# }
</code></pre>
</div></li>
</ul>
<h3 id="\u53C2\u8003\u6587\u732E" tabindex="-1">\u53C2\u8003\u6587\u732E <a class="header-anchor" href="#\u53C2\u8003\u6587\u732E" aria-hidden="true">#</a></h3>
<p><a href="http://www.hamvocke.com/blog/a-guide-to-customizing-your-tmux-conf/" target="_blank" rel="noopener noreferrer">Making tmux Pretty and Usable</a></p>
`;export{e as __pageData,n as default};
