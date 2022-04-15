import"./app.d36d7bad.js";const e='{"title":"Shadowsocks \u642D\u5EFA","description":"","frontmatter":{"date":"2014-12-06T12:10:23.000Z","tags":["shadowsocks","proxy"]},"headers":[{"level":2,"title":"\u642D\u5EFA\u73AF\u5883","slug":"\u642D\u5EFA\u73AF\u5883"},{"level":2,"title":"\u5B89\u88C5nodejs\u73AF\u5883","slug":"\u5B89\u88C5nodejs\u73AF\u5883"},{"level":2,"title":"\u5B89\u88C5shadowsocks","slug":"\u5B89\u88C5shadowsocks"},{"level":2,"title":"\u914D\u7F6Econfig\u6587\u4EF6","slug":"\u914D\u7F6Econfig\u6587\u4EF6"},{"level":2,"title":"\u542F\u52A8shadowsocks","slug":"\u542F\u52A8shadowsocks"},{"level":2,"title":"\u672C\u5730\u5BA2\u6237\u7AEF,\u51C6\u5907\u5F00\u59CB\u7FFB X \u5427","slug":"\u672C\u5730\u5BA2\u6237\u7AEF-\u51C6\u5907\u5F00\u59CB\u7FFB-x-\u5427"},{"level":2,"title":"\u914D\u7F6EPAC File","slug":"\u914D\u7F6Epac-file"},{"level":2,"title":"\u603B\u7ED3","slug":"\u603B\u7ED3"},{"level":2,"title":"Trouble Shooting","slug":"trouble-shooting"},{"level":2,"title":"Else","slug":"else"}],"relativePath":"blog/2014-12-06-shadowsocks.md","createTime":1649686573000,"lastUpdated":1647786576000}';var n=()=>`<h1 id="shadowsocks-\u642D\u5EFA" tabindex="-1">Shadowsocks \u642D\u5EFA <a class="header-anchor" href="#shadowsocks-\u642D\u5EFA" aria-hidden="true">#</a></h1>
<blockquote>
<p>\u8FD9\u4E24\u5929\u75AF\u72C2\u7684\u627E\u7FFB X \u5DE5\u5177,\u5404\u79CD\u63D2\u4EF6\u3001VPN \u7B49,\u6700\u7EC8\u51B3\u5B9A\u642D\u4E2A shadowsocks.(\u4E3B\u8981\u662F\u670B\u53CB\u641E\u4E86\u534A\u5E74\u7684\u514D\u8D39<code>Microsoft Azure</code>\u5E10\u53F7)</p>
</blockquote>
<h2 id="\u642D\u5EFA\u73AF\u5883" tabindex="-1">\u642D\u5EFA\u73AF\u5883 <a class="header-anchor" href="#\u642D\u5EFA\u73AF\u5883" aria-hidden="true">#</a></h2>
<p><code>Microsoft Azure</code>\u5E73\u53F0\u4E0A\u7684<code>Ubuntu Server 14.10</code>\u865A\u62DF\u673A</p>
<h2 id="\u5B89\u88C5nodejs\u73AF\u5883" tabindex="-1">\u5B89\u88C5<code>nodejs</code>\u73AF\u5883 <a class="header-anchor" href="#\u5B89\u88C5nodejs\u73AF\u5883" aria-hidden="true">#</a></h2>
<p>\u7531\u4E8E\u4F7F\u7528\u7684\u662F<code>shadowsocks-nodejs</code>,\u6240\u4EE5\u9996\u5148\u5F53\u7136\u662F\u8981\u5B89\u88C5<code>nodejs</code>\u73AF\u5883\u5566.</p>
<p>\u4F7F\u7528<code>apt-get</code>\u5B89\u88C5:</p>
<div class="language-bash"><pre><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> nodejs
</code></pre>
</div><p>\u6216\u81EA\u5DF1\u4E0B\u8F7D\u6E90\u7801\u5B89\u88C5:</p>
<div class="language-bash"><pre><code>$ <span class="token function">wget</span> http://nodejs.org/dist/vXXX/node-vXXX.tar.gz
$ <span class="token function">tar</span> xf node-vXXX.tar.gz
$ <span class="token builtin class-name">cd</span> node-vXXX/
$ ./configure
$ <span class="token function">make</span> -j2 <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre>
</div><p>\u5B89\u88C5<code>npm</code>\u6A21\u5757\u7BA1\u7406\u5668:</p>
<div class="language-bash"><pre><code>$ <span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token function">npm</span>
</code></pre>
</div><h2 id="\u5B89\u88C5shadowsocks" tabindex="-1">\u5B89\u88C5<code>shadowsocks</code> <a class="header-anchor" href="#\u5B89\u88C5shadowsocks" aria-hidden="true">#</a></h2>
<p>\u4F7F\u7528<code>npm</code>\u5B89\u88C5:</p>
<div class="language-bash"><pre><code>$ <span class="token function">npm</span> <span class="token function">install</span> shadowsocks
$ <span class="token builtin class-name">cd</span> node_modules/shadowsocks
</code></pre>
</div><p>\u4F7F\u7528<code>git</code>\u4E0B\u8F7D\u6E90\u7801(\u8BF7\u5148\u5B89\u88C5<code>git</code>\u54E6):</p>
<div class="language-bash"><pre><code>$ <span class="token function">git</span> clone git://github.com/clowwindy/shadowsocks-nodejs.git
$ <span class="token builtin class-name">cd</span> shadowsocks-nodejs
</code></pre>
</div><h2 id="\u914D\u7F6Econfig\u6587\u4EF6" tabindex="-1">\u914D\u7F6E<code>config</code>\u6587\u4EF6 <a class="header-anchor" href="#\u914D\u7F6Econfig\u6587\u4EF6" aria-hidden="true">#</a></h2>
<p>\u4F7F\u7528<code>vim</code>\u6216\u5176\u5B83\u7F16\u8F91\u5DE5\u5177\u4FEE\u6539<code>cnfig.json</code>\u6587\u4EF6:</p>
<div class="language-bash"><pre><code><span class="token punctuation">{</span>
    <span class="token string">"server"</span><span class="token builtin class-name">:</span><span class="token string">"my_server_ip"</span>, //\u670D\u52A1\u5668\u5730\u5740
    <span class="token string">"server_port"</span>:8388, //\u670D\u52A1\u5668\u63A5\u53E3
    <span class="token string">"local_port"</span>:1080, //\u672C\u5730\u63A5\u53E3
    <span class="token string">"password"</span><span class="token builtin class-name">:</span><span class="token string">"barfoo!"</span>, //\u5BC6\u7801
    <span class="token string">"timeout"</span>:600, //\u8D85\u65F6\u65F6\u5E38
    <span class="token string">"method"</span><span class="token builtin class-name">:</span><span class="token string">"table"</span> //\u52A0\u5BC6\u65B9\u5F0F
<span class="token punctuation">}</span>
</code></pre>
</div><p>\u7136\u540E\u9047\u5230\u4E00\u4E2A\u5947\u8469\u95EE\u9898,\u5C06<code>server</code>\u8BBE\u7F6E\u4E3A\u516C\u7F51\u5730\u5740\u65F6\u4E0D\u77E5\u9053\u4E3A\u4EC0\u4E48\u4F1A\u62A5\u9519,\u6240\u4EE5\u4E4B\u540E\u6539\u4E3A\u4E86<code>0.0.0.0</code>\u624D\u641E\u5B9A\u4E86.</p>
<p>\u5728<code>Azure</code>\u4E2D\u7AEF\u53E3\u9700\u8981\u81EA\u5DF1\u6DFB\u52A0,\u6709\u4E9B\u5176\u4ED6\u7684\u4E91\u5E73\u53F0\u5E94\u8BE5\u4E5F\u662F,\u6240\u4EE5\u9700\u8981\u6CE8\u610F\u7AEF\u53E3\u95EE\u9898</p>
<h2 id="\u542F\u52A8shadowsocks" tabindex="-1">\u542F\u52A8<code>shadowsocks</code> <a class="header-anchor" href="#\u542F\u52A8shadowsocks" aria-hidden="true">#</a></h2>
<p>\u4F7F\u7528<code>nodejs</code>\u542F\u52A8<code>shadowsocks</code>:</p>
<div class="language-bash"><pre><code>$ <span class="token function">nohup</span> <span class="token function">node</span> bin/ssserver <span class="token operator">&amp;</span>
</code></pre>
</div><p>\u82E5\u662F\u6CA1\u6709\u95EE\u9898,OK,\u57FA\u672C\u53EF\u4EE5\u7B97\u662F\u5927\u529F\u544A\u6210,\u53EF\u4EE5\u8FDB\u5165\u4E0B\u4E00\u6B65\u4E86~ \u4E5F\u53EF\u4EE5\u5C06<code>shadowsocks</code>\u52A0\u5165\u5230\u5F00\u673A\u81EA\u542F,\u6CA1\u548B\u73A9<code>linux</code>,\u4E5F\u5C31\u6CA1\u9AD8\u5174\u7814\u7A76~</p>
<h2 id="\u672C\u5730\u5BA2\u6237\u7AEF-\u51C6\u5907\u5F00\u59CB\u7FFB-x-\u5427" tabindex="-1">\u672C\u5730\u5BA2\u6237\u7AEF,\u51C6\u5907\u5F00\u59CB\u7FFB X \u5427 <a class="header-anchor" href="#\u672C\u5730\u5BA2\u6237\u7AEF-\u51C6\u5907\u5F00\u59CB\u7FFB-x-\u5427" aria-hidden="true">#</a></h2>
<p>\u5BA2\u6237\u7AEF\u53EF\u9009\u62E9\u4F7F\u7528\u521A\u521A<code>clone</code>\u7684<code>shadowsocks-nodejs</code>,\u4E5F\u53EF\u4F7F\u7528\u5176\u5B83\u7684\u5BA2\u6237\u7AEF</p>
<p><a href="http://shadowsocks.cn/clients.html" target="_blank" rel="noopener noreferrer">\u5176\u5B83\u5BA2\u6237\u7AEF\u4E0B\u8F7D\u5730\u5740:http://shadowsocks.cn/clients.html</a></p>
<p><code>shadowsocks-gui for Windows</code>: \u4E0B\u8F7D\u5B8C\u6BD5\u540E\u89E3\u538B\u76F4\u63A5\u6253\u5F00\u5982\u56FE,\u7136\u540E\u8F93\u5165\u4F60\u7684\u670D\u52A1\u5668\u516C\u7F51\u5730\u5740\u3001\u7AEF\u53E3\u53F7\u3001\u5BC6\u7801\u4EE5\u53CA\u672C\u5730\u7AEF\u53E3\u53F7\u5373\u53EF.</p>
<p><img src="http://zxspace.qiniudn.com/blog/2014-12-6-img-0.png" alt="gui"></p>
<p><code>shadowsocks-nodejs client</code>: \u4E0B\u8F7D\u8FD8\u662F\u548C\u4E0A\u9762\u7684<code>git</code>\u4E0B\u8F7D<code>shadowsocks</code>\u4E00\u6837:</p>
<div class="language-bash"><pre><code>$ <span class="token function">npm</span> <span class="token function">install</span> shadowsocks
$ <span class="token builtin class-name">cd</span> node_modules/shadowsocks
</code></pre>
</div><p>\u7136\u540E\u4FEE\u6539<code>cnfig</code>\u6587\u4EF6,\u4E00\u6837\u540C\u4E0A</p>
<p>\u6700\u540E\u542F\u52A8\u5BA2\u6237\u7AEF:</p>
<div class="language-bash"><pre><code>$ <span class="token function">node</span> bin/sslocal
</code></pre>
</div><h2 id="\u914D\u7F6Epac-file" tabindex="-1">\u914D\u7F6E<code>PAC File</code> <a class="header-anchor" href="#\u914D\u7F6Epac-file" aria-hidden="true">#</a></h2>
<p>\u53F3\u952E<code>shadowsocks-gui</code>\u5C0F\u56FE\u6807,\u9009\u62E9<code>Edit PAC File</code>\u7136\u540E\u4F1A\u770B\u5230\u4E00\u6BB5<code>javascript</code>\u4EE3\u7801(\u5E94\u8BE5\u662F...),\u7136\u540E\u5C31\u628A\u4F60\u60F3\u8981\u4EE3\u7406\u7684\u7F51\u7AD9\u6DFB\u52A0\u5230\u4E0A\u9762\u7684\u5217\u8868\u91CC\u5427,\u6BD4\u5982<code>,&quot;google.com&quot;:1</code></p>
<p><code>nodejs</code>\u5BA2\u6237\u7AEF\u6CA1\u627E\u5230\u8FD9\u529F\u80FD\u5728\u54EA~(\u57FA\u672C\u7528\u7684<code>gui</code>,\u61D2\u5F97\u627E,\u563F\u563F)</p>
<h2 id="\u603B\u7ED3" tabindex="-1">\u603B\u7ED3 <a class="header-anchor" href="#\u603B\u7ED3" aria-hidden="true">#</a></h2>
<p><code>shadowsocks</code>\u603B\u4F53\u6765\u8BF4\u8FD8\u662F\u6BD4\u8F83\u5BB9\u6613\u642D\u5EFA\u7684,\u6548\u679C\u4E5F\u5F88\u4E0D\u9519,\u901F\u5EA6\u55D6\u55D6\u7684,\u4E0D\u8FC7\u4E0D\u77E5\u9053\u4E3A\u4EC0\u4E48\u611F\u89C9\u4E0D\u7A33\u5B9A,\u5076\u5C14\u4F1A\u8FDE\u4E0D\u4E0A,\u800C\u4E14\u5BA2\u6237\u7AEF\u9694\u4E00\u6BB5\u65F6\u95F4\u9700\u8981\u91CD\u542F\u4E00\u4E0B\u624D\u80FD\u6B63\u5E38~\u4E5F\u4E0D\u77E5\u9053\u662F\u4E0D\u662F\u7531\u4E8E\u6211\u81EA\u5DF1\u673A\u5668\u7F51\u7EDC\u4E0D\u592A\u7A33\u5B9A\u7684\u7F18\u6545,\u53CD\u6B63\u73A9\u73A9\u8FD8\u662F\u5F88\u597D\u7684~</p>
<p><a href="https://github.com/clowwindy/shadowsocks" target="_blank" rel="noopener noreferrer">shadowsocks github \u5730\u5740</a></p>
<h2 id="trouble-shooting" tabindex="-1">Trouble Shooting <a class="header-anchor" href="#trouble-shooting" aria-hidden="true">#</a></h2>
<p>\u4F7F\u7528<code>zsh</code>\u65F6\u9700\u6CE8\u610F\u4F7F\u7528<code>nohup node bin/ssserver &amp;</code>\u7136\u540E<code>exit</code>\u9000\u51FA\u65F6 zsh \u4F1A\u68C0\u6D4B\u5F53\u524D\u7684<code>jobs</code>\u7136\u540E\u5C06\u5176\u9000\u51FA,\u6240\u4EE5\u4F7F\u7528<code>zsh</code>\u542F\u52A8\u9700\u8981\u6CE8\u610F<code>disown</code>\u4E00\u4E0B,\u5177\u4F53\u7684\u6709\u4E09\u79CD\u65B9\u5F0F(!\u548C|\u597D\u50CF\u662F zsh \u7279\u6709\u7684\u65B9\u5F0F):</p>
<div class="language-bash"><pre><code>$ <span class="token function">nohup</span> <span class="token function">node</span> bin/ssserver <span class="token operator">&amp;</span><span class="token operator">!</span>
$ <span class="token function">nohup</span> <span class="token function">node</span> bin/ssserver <span class="token operator">&amp;</span><span class="token operator">|</span>
$ <span class="token function">nohup</span> <span class="token function">node</span> bin/ssserver <span class="token operator">&amp;</span> disown
</code></pre>
</div><p><a href="http://stackoverflow.com/questions/19302913/exit-zsh-but-leave-running-jobs-open" target="_blank" rel="noopener noreferrer">stackoverflow \u5730\u5740</a></p>
<p><code>centos</code>\u9ED8\u8BA4\u9632\u706B\u5899\u53EF\u80FD\u4F1A\u5BFC\u81F4\u7AEF\u53E3\u65E0\u6CD5\u8BBF\u95EE,\u53EF\u4EE5\u4FEE\u6539<code>iptables</code>\u89C4\u5219,\u6216\u8005\u76F4\u63A5\u6E05\u9664\u89C4\u5219,\u6E05\u9664\u4F7F\u7528<code>iptables -F</code>,\u7136\u540E<code>iptables -A INPUT -p tcp --dport 8388 -j ACCEPT</code>\u6DFB\u52A0\u7AEF\u53E3\u5230<code>iptables</code></p>
<p><a href="https://github.com/shadowsocks/shadowsocks/issues/133" target="_blank" rel="noopener noreferrer">issuse \u5730\u5740</a></p>
<h2 id="else" tabindex="-1">Else <a class="header-anchor" href="#else" aria-hidden="true">#</a></h2>
<div class="hidden">
  <h3>\u9510\u901FXX\u7248</h3>
  <ul>
    <li>
      <h4>\u83B7\u53D6</h4>
      {% highlight shell %}
        wget -q -O- http://file.idc.wiki/get.php?serverSpeeder | bash -
      {% endhighlight %}
    </li>
    <li>
      <h4>\u5B89\u88C5</h4>
      {% highlight shell %}
        bash serverSpeeder_setup.sh
      {% endhighlight %}
    </li>
  </ul>
  <a href="https://www.233.wiki/2016/02/21/124.html">\u539FBlog\u5730\u5740</a>
</div>
`;export{e as __pageData,n as default};
