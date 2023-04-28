# Cypress 之 intercept

Cypress 中的 intercept 主要用于对网络请求的 request 和 response 进行监听（spy）和修改（stub），功能非常强大，算是使用 Cypress 的必修课之一。

intercept 主要有三种用法：

1. 只用作监听
2. 监听并篡改 response
3. 监听、动态篡改 response、修改 request 等

## 监听

只用作监听语法如下：

```js
cy.intercept(url);
cy.intercept(method, url);
cy.intercept(routeMatcher);
```

此处 URL 支持三种格式：

-   普通的 URL 匹配: `cy.intercept('/users/info')`
-   Glob 匹配: `cy.intercept('/users/\*')`
-   正则匹配: `cy.intercept(/\/users\?\_limit=(3|5)$/)`

不过这里监听后其实没有什么实际用途，需要配合其它 API 使用才有意义。

首先是 as，as 用作为该 intercept 行为设置一个别名，用作后续使用：

```js
cy.intercept('/users/info').as('getUserInfo');
```

设置别名后便可将其用于后续的断言中，比如：

```js
cy.wait('@getUserInfo');
```

此时 Cypress 就会等待 `/users/info` 被调用后才会继续向下走，而如果一段时间内未调用则会超时错误（与默认的 timeout 时长相关）。

此外在 wait 时还可使用断言：

```js
// request 的 body 包含 user
cy.wait('@getUserInfo').its('request.body').should('include', 'user');
// response 的状态码为 500
cy.wait('@getUserInfo').its('response.statusCode').should('eq', 500);
// response body 中包含 id
cy.wait('@getUserInfo').its('response.body').should('include', 'id');
```

使用时需要通过 its 获取请求的对应字段，然后通过 should 进行断言。

## 注意事项

### 缓存

需要注意如果 API 请求被浏览器缓存了，那可能会出现拦截失败的情况。

### 重置

intercept 会在每个 test 时自动清空，所以不需要担心会影响到其它的测试用例。

## 参考链接

-   https://docs.cypress.io/api/commands/intercept
