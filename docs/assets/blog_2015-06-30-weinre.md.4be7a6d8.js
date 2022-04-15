import"./app.d36d7bad.js";const d='{"title":"Weinre","description":"","frontmatter":{"date":"2015-06-30T14:20:00.000Z","tags":["\u8C03\u8BD5","\u79FB\u52A8\u7AEF"]},"headers":[{"level":2,"title":"\u5B89\u88C5","slug":"\u5B89\u88C5"},{"level":2,"title":"\u7ED3\u6784","slug":"\u7ED3\u6784"},{"level":2,"title":"\u539F\u7406","slug":"\u539F\u7406"},{"level":2,"title":"\u914D\u7F6E","slug":"\u914D\u7F6E"},{"level":2,"title":"\u8FD0\u884C","slug":"\u8FD0\u884C"},{"level":2,"title":"\u811A\u672C","slug":"\u811A\u672C"},{"level":2,"title":"\u8C03\u8BD5","slug":"\u8C03\u8BD5"},{"level":2,"title":"\u9762\u677F","slug":"\u9762\u677F"}],"relativePath":"blog/2015-06-30-weinre.md","createTime":1649686573000,"lastUpdated":1647786576000}';var o=()=>`<h1 id="weinre" tabindex="-1">Weinre <a class="header-anchor" href="#weinre" aria-hidden="true">#</a></h1>
<blockquote>
<p><code>weinre</code>\u5168\u540D<code>web inspector remote</code>,\u5C31\u662F<code>web</code>\u8FDC\u7A0B\u8C03\u8BD5\u5DE5\u5177,\u53EF\u4EE5\u8FDC\u7A0B\u8C03\u8BD5\u9875\u9762,\u6D4F\u89C8\u5668\u7AEF\u5176\u5B9E\u7528\u5904\u4E0D\u5927,\u79FB\u52A8\u7AEF\u5374\u610F\u4E49\u975E\u51E1,\u6BD5\u7ADF\u79FB\u52A8\u7AEF\u53EF\u6CA1\u6709<code>Chrome Console</code>\u7B49\u8C03\u8BD5\u5DE5\u5177\u5B58\u5728\u7684.</p>
</blockquote>
<h2 id="\u5B89\u88C5" tabindex="-1">\u5B89\u88C5 <a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a></h2>
<p>\u4F7F\u7528<code>npm</code>\u80FD\u591F\u5F88\u5BB9\u6613\u7684\u5C06<code>weinre</code>\u5B89\u88C5\u5230\u673A\u5668\u4E0A</p>
<div class="language-bash"><pre><code><span class="token function">sudo</span> <span class="token function">npm</span> -g <span class="token function">install</span> weinre
</code></pre>
</div><h2 id="\u7ED3\u6784" tabindex="-1">\u7ED3\u6784 <a class="header-anchor" href="#\u7ED3\u6784" aria-hidden="true">#</a></h2>
<p><code>weinre</code>\u4E3B\u8981\u5305\u542B\u4E09\u5C42\u7ED3\u6784:</p>
<ul>
<li>target: \u8C03\u8BD5\u7684\u76EE\u6807\u9875\u9762,\u9700\u5728\u9875\u9762\u4E2D\u5D4C\u5165\u811A\u672C</li>
<li>client: \u8C03\u8BD5\u7528\u7684\u9875\u9762,\u7528\u4E8E\u8C03\u8BD5\u9875\u9762</li>
<li>agent: \u642D\u5EFA\u4E86<code>weinre</code>\u7684\u670D\u52A1\u7AEF,\u7528\u4E8E\u548C<code>target</code>&amp;<code>client</code>\u901A\u4FE1</li>
</ul>
<h2 id="\u539F\u7406" tabindex="-1">\u539F\u7406 <a class="header-anchor" href="#\u539F\u7406" aria-hidden="true">#</a></h2>
<p><code>weinre</code>\u4E3B\u8981\u4F7F\u7528<code>webSocket</code>\u901A\u4FE1\u6765\u8FDE\u63A5\u8C03\u8BD5\u9875\u9762\u548C\u88AB\u8C03\u8BD5\u9875\u9762,<code>target</code>\u4E2D\u5D4C\u5165<code>weinre</code>\u8C03\u8BD5\u811A\u672C\u540E\u4F1A\u5411\u670D\u52A1\u7AEF\u53D1\u8D77<code>webSocket</code>\u8BF7\u6C42, \u6253\u5F00<code>client</code>\u9875\u9762\u540E,<code>client</code>\u4E5F\u4F1A\u50CF\u670D\u52A1\u7AEF\u53D1\u8D77\u8BF7\u6C42,\u5982\u6B64\u901A\u8FC7<code>agent</code>\u4FBF\u80FD\u6210\u529F\u4E0E<code>target</code>\u8FDB\u884C\u901A\u4FE1.</p>
<h2 id="\u914D\u7F6E" tabindex="-1">\u914D\u7F6E <a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a></h2>
<p><code>~/.weinre/server.properties</code>\u4E2D\u6709\u7740<code>weinre</code>\u7684\u4E3B\u8981\u914D\u7F6E:</p>
<ul>
<li>boundHost: \u76D1\u542C\u7684<code>host</code>,\u53EF\u8BBE\u7F6E\u4E3A<code>-all-</code>\u5373\u53EF\u76D1\u542C\u6240\u6709</li>
<li>httpPort: \u76D1\u542C\u7684\u7AEF\u53E3\u53F7</li>
<li>reuseAddr: <code>May be needed if you restart your server frequently.</code>\u5F53\u4F60\u9891\u7E41\u7684\u91CD\u542F\u670D\u52A1\u5668\u662F\u53EF\u80FD\u4F1A\u7528\u5230,\u597D\u50CF\u662F\u81EA\u52A8\u5360\u7528\u7AEF\u53E3\u53F7\u7684\u610F\u601D?\u4E0D\u6E05\u695A</li>
<li>readTimeout: \u53D1\u9001\u4FE1\u606F\u5230<code>target</code>\u6216<code>client</code>\u65F6\u7684<code>Timeout</code></li>
<li>deathTimeout: <code>target</code>\u6216<code>client</code>\u65E0\u54CD\u5E94\u5B58\u6D3B\u65F6\u95F4\u7684<code>Timeout</code></li>
</ul>
<h2 id="\u8FD0\u884C" tabindex="-1">\u8FD0\u884C <a class="header-anchor" href="#\u8FD0\u884C" aria-hidden="true">#</a></h2>
<p>\u53EF\u4EE5\u76F4\u63A5\u5C06\u914D\u7F6E\u5F53\u4F5C\u53C2\u6570\u8FD0\u884C\u65F6\u52A0\u8F7D</p>
<div class="language-bash"><pre><code>weinre -boundHost <span class="token function">host</span> -httpPort port
</code></pre>
</div><h2 id="\u811A\u672C" tabindex="-1">\u811A\u672C <a class="header-anchor" href="#\u811A\u672C" aria-hidden="true">#</a></h2>
<p>\u8FD0\u884C<code>weinre</code>\u540E\u6253\u5F00\u6D4F\u89C8\u5668\u540E\u53EF\u770B\u5230<code>weinre</code>\u7684\u4ECB\u7ECD,\u5728<code>Target Script</code>\u4E2D\u53EF\u4EE5\u770B\u5230\u5982\u4F55\u5411<code>target</code>\u4E2D\u5D4C\u5165\u811A\u672C.\u811A\u672C\u540E\u7684\u951A\u70B9\u90E8\u5206\u4E3A<code>id</code>\u6807\u8BC6,\u5728\u53EF\u4EE5\u5728<code>client</code>\u9875\u9762\u4E2D\u52A0\u5165\u540C\u6837\u7684<code>id</code>\u6765\u67E5\u770B\u5BF9\u5E94<code>id</code>\u7684<code>target</code>.(\u6CE8\u610F\u4E0D\u8981\u5FD8\u8BB0\u6DFB\u52A0 id,\u4E0D\u7136\u53EF\u80FD\u6CA1\u6CD5\u6210\u529F,\u540C\u4E8B\u6CA1\u52A0\u6210\u529F\u4E86,\u6211\u6CA1\u52A0\u6B7B\u6D3B\u770B\u4E0D\u5230,\u4E0D\u77E5\u9053\u4E3A\u5565)</p>
<p>\u4E5F\u53EF\u4EE5\u4F7F\u7528\u6807\u7B7E\u7684\u65B9\u5F0F\u4E3A<code>target</code>\u6DFB\u5165\u811A\u672C\u542F\u52A8<code>weinre</code>,\u5728<code>Target Bookmarklet</code>\u53EF\u4EE5\u770B\u5230\u63CF\u8FF0,\u7136\u5E76\u5375,\u56E0\u4E3A\u624B\u673A\u4E0A\u6CA1\u7528\u554A...</p>
<h2 id="\u8C03\u8BD5" tabindex="-1">\u8C03\u8BD5 <a class="header-anchor" href="#\u8C03\u8BD5" aria-hidden="true">#</a></h2>
<p>\u9875\u9762\u5D4C\u5165\u811A\u672C\u540E\u6253\u5F00\u9875\u9762,\u7136\u540E\u6253\u5F00\u5BF9\u5E94\u7684\u8C03\u8BD5\u9875\u9762<code>http://host:port/client/#id</code>,\u53EF\u4EE5\u770B\u5230<code>Remote</code>\u4E2D\u7684<code>targets</code>\u548C<code>clients</code>\u5217\u8868, \u8FD8\u6709<code>Server Properties</code>\u7684\u914D\u7F6E,\u5728<code>targets</code>\u4E2D\u70B9\u51FB\u9700\u8981\u8C03\u8BD5\u7684\u9875\u9762\u9009\u4E2D,\u5C31\u53EF\u4EE5\u968F\u610F\u8C03\u8BD5\u4E86,\u6548\u679C\u8FD8\u662F\u76F8\u5F53\u4E0D\u9519\u7684.</p>
<h2 id="\u9762\u677F" tabindex="-1">\u9762\u677F <a class="header-anchor" href="#\u9762\u677F" aria-hidden="true">#</a></h2>
<p>\u8C03\u8BD5\u4E3B\u8981\u5305\u62EC 6 \u4E2A\u9762\u677F:\u4E3B\u8981\u662F\u4E0A\u9762\u8BF4\u5230\u7684<code>Remote</code>\u4EE5\u53CA\u5176\u5B83\u4E94\u4E2A\u540C\u6837\u53EF\u4EE5\u5728<code>chrome</code>\u63A7\u5236\u53F0\u770B\u5230\u7684\u9762\u677F :<code>Elements</code>\u3001<code>Resources</code>\u3001<code>Network</code>\u3001<code>Timeline</code>\u3001<code>Console</code>\u7B49,\u529F\u80FD\u548C<code>chrome</code>\u63A7\u5236\u53F0\u4E2D\u76F8\u5DEE\u4E0D\u591A,\u4E0D\u7EC6\u8BF4.</p>
<blockquote>
<p>\u6BD4\u8F83\u86CB\u75BC\u7684\u662F<code>weinre</code>\u5BF9\u7F51\u901F\u7684\u8981\u6C42\u6BD4\u8F83\u9AD8,\u6CA1\u529E\u6CD5,\u8FD9\u662F\u80AF\u5B9A\u7684,\u6240\u4EE5\u5076\u5C14\u4F1A\u51FA\u73B0\u4E0D\u591F\u5B9E\u65F6\u7B49\u73B0\u8C61.</p>
</blockquote>
`;export{d as __pageData,o as default};
