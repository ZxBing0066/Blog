import"./app.d36d7bad.js";const r='{"title":"RxJS","description":"","frontmatter":{"date":"2016-09-12T11:05:28.000Z","ignoreInList":true},"headers":[{"level":3,"title":"\u4ECB\u7ECD","slug":"\u4ECB\u7ECD"},{"level":3,"title":"\u4F8B\u5B50","slug":"\u4F8B\u5B50"},{"level":3,"title":"\u53C2\u8003\u6587\u732E","slug":"\u53C2\u8003\u6587\u732E"}],"relativePath":"blog/2016-09-12-rxjs.md","createTime":1649686573000,"lastUpdated":1647786576000}';var l=()=>`<h1 id="rxjs" tabindex="-1">RxJS <a class="header-anchor" href="#rxjs" aria-hidden="true">#</a></h1>
<h3 id="\u4ECB\u7ECD" tabindex="-1">\u4ECB\u7ECD <a class="header-anchor" href="#\u4ECB\u7ECD" aria-hidden="true">#</a></h3>
<p><code>RxJS</code>\u662F\u4E00\u4E2A\u4F7F\u7528\u53EF\u89C2\u5BDF\u5E8F\u5217\u6765\u7F16\u5199\u5F02\u6B65\u548C\u4E8B\u4EF6\u9A71\u52A8\u7A0B\u5E8F\u7684\u5E93.\u5B98\u65B9\u7684\u8BDD\u662F\u53EF\u4EE5\u628A\u5B83\u5F53\u505A\u4E8B\u4EF6\u4E2D\u7684<code>lodash</code>.</p>
<blockquote>
<p>Think of RxJS as Lodash for events.</p>
</blockquote>
<p><code>ReactiveX</code>\u4F7F\u7528\u8FED\u4EE3\u5668\u6A21\u5F0F,\u89C2\u5BDF\u8005\u6A21\u5F0F\u548C\u96C6\u5408\u7684\u51FD\u6570\u5F0F\u7F16\u7A0B\u7ED3\u5408\u7684\u65B9\u5F0F\u6765\u521B\u9020\u4E86\u4E00\u4E2A\u7BA1\u7406\u4E8B\u4EF6\u5E8F\u5217\u7684\u5B8C\u7F8E\u89E3\u51B3\u65B9\u5F0F.</p>
<p><code>RxJS</code>\u7BA1\u7406\u5F02\u6B65\u4E8B\u4EF6\u81F3\u5173\u91CD\u8981\u7684\u51E0\u4E2A\u6982\u5FF5:</p>
<ul>
<li>Observable: \u4EE3\u8868\u5982\u4F55\u5904\u7406\u8C03\u7528\u672A\u6765\u7684\u503C\u548C\u4E8B\u4EF6</li>
<li>Observer:</li>
<li>Subscription:</li>
<li>Operators:</li>
<li>Subject:</li>
<li>Schedulers:</li>
</ul>
<h3 id="\u4F8B\u5B50" tabindex="-1">\u4F8B\u5B50 <a class="header-anchor" href="#\u4F8B\u5B50" aria-hidden="true">#</a></h3>
<p>\u5B9E\u8DF5\u51FA\u771F\u77E5,\u8BD5\u8BD5\u624D\u77E5\u9053,\u8BD5\u8BD5\u5C31\u8BD5\u8BD5</p>
<p>\u5148\u7167\u7740\u5B98\u65B9\u6587\u6863\u5199\u4E00\u4E2A\u5C0F\u4F8B\u5B50:</p>
<iframe width="100%" height="300" src="//jsfiddle.net/ZxBing0066/90y465xj/1/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<p>(\u2299o\u2299)\u2026 \u8BD5\u5B8C\u4E4B\u540E\u7B2C\u4E00\u611F\u89C9\u662F:\u5C3C\u739B,\u5751\u7239\u554A,\u611F\u89C9\u4E0D\u597D\u7528\u8FD8\u591A\u4E86\u597D\u4E9B\u4EE3\u7801. \u4E0D\u614C\u4F5C\u4E3A\u6846\u67B6\u603B\u662F\u4E00\u5B9A\u4EE3\u7801\u4F53\u79EF\u624D\u80FD\u663E\u793A\u51FA\u4ED6\u7684\u4F18\u52BF,\u8FD9\u70B9\u4EE3\u7801\u5B8C\u5168\u770B\u4E0D\u51FA\u6765\u5440,\u7EE7\u7EED\u8BD5:</p>
<iframe width="100%" height="300" src="//jsfiddle.net/ZxBing0066/90y465xj/2/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<p>\u6069,\u8FD9\u4E2A\u7EDF\u8BA1\u70B9\u51FB\u6570\u91CF\u7684 demo \u5C31\u611F\u89C9\u597D\u591A\u4E86,<code>scan</code>\u65B9\u6CD5\u7C7B\u4F3C<code>reduce</code>,\u4ED6\u63A5\u6536\u4E00\u4E2A\u51FD\u6570\u548C\u4E00\u4E2A\u9ED8\u8BA4\u503C,\u7136\u540E\u4F1A\u628A\u8FD4\u56DE\u503C\u4F20\u7ED9\u4E0B\u4E00\u4E2A\u56DE\u8C03.</p>
<p>\u518D\u6765\u4E00\u4E2A\u9AD8\u7AEF\u70B9\u7684,1 \u79D2\u5185\u6700\u591A\u53EA\u80FD\u89E6\u53D1\u4E00\u6B21\u70B9\u51FB\u4E8B\u4EF6,\u6069,\u8FD9\u91CC\u6709\u4E2A\u5751,\u5B98\u65B9\u6587\u6863\u4E2D\u4F7F\u7528\u7684\u662F<code>throttle</code>,\u53EF\u5176\u5B9E\u8FD9\u4E2A\u65B9\u6CD5\u63A5\u6536\u7684\u662F\u4E00\u4E2A\u51FD\u6570,\u6240\u4EE5\u8FD9\u91CC\u9700\u8981\u4F7F\u7528<code>throttleTime</code>,\u4E0D\u7136\u4F1A\u62A5\u9519: <code>Rx.min.js:formatted:9841Uncaught TypeError: this.durationSelector is not a function</code>.</p>
<iframe width="100%" height="300" src="//jsfiddle.net/ZxBing0066/90y465xj/3/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<p>\u518D\u6765\u770B\u4E00\u4E0B\u4ED6\u5C01\u88C5\u7684\u8FED\u4EE3\u5668\u6A21\u5F0F:</p>
<iframe width="100%" height="300" src="//jsfiddle.net/ZxBing0066/90y465xj/4/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
<p>\u989D,\u611F\u89C9\u5176\u5B9E\u4E5F\u6CA1\u5565,\u5C31\u662F<code>next</code>\u7684\u65F6\u5019\u8C03\u7528\u5BF9\u5E94\u7684\u56DE\u8C03.\u6CE8\u610F 5 \u5E76\u6CA1\u6709\u88AB\u6253\u5370,\u56E0\u4E3A complete \u5DF2\u7ECF\u88AB\u8C03\u7528.</p>
<p>\u518D\u770B\u770B\u6587\u6863,\u5404\u79CD\u65B9\u6CD5\u6EE1\u5929\u98DE,\u53EF\u4EE5\u4EFB\u610F\u5BF9\u4E8B\u4EF6\u505A\u5904\u7406,\u611F\u89C9\u8FD8\u662F\u540A\u540A\u7684,\u7B49\u7814\u7A76\u7814\u7A76\u518D\u8865\u5145.</p>
<h3 id="\u53C2\u8003\u6587\u732E" tabindex="-1">\u53C2\u8003\u6587\u732E <a class="header-anchor" href="#\u53C2\u8003\u6587\u732E" aria-hidden="true">#</a></h3>
<p><a href="http://reactivex.io/rxjs/manual/overview.html" target="_blank" rel="noopener noreferrer">RxJS Introduction</a></p>
`;export{r as __pageData,l as default};
