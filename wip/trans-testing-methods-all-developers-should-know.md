# 【译】十五个开发者必须知道的测试方法

在软件领域，有许多技术概念和术语定义。无论是在学习新的主题还是在变换工作时，使用不同的术语都可能会让人感到困惑。

软件测试就存在这样的问题。随着现代技术公司逐步采用持续集成，他们的 DevOps 逐渐成熟，对测试和测试自动化的重视程度也越来越高。这里有关于最常见的上层软件测试类型的参考，可以帮助你不用迷失在各种不同方法的迷雾中。

## 单元测试

单元测试是一种专注于审查单个 "单元" 或代码片段的测试方法。

单元测试的主要目标是确定逻辑的完整性 -- 一段代码做了它应该做的事。

一般来说，人们会把单个方法或功能作为单元进行测试，根据代码的大小和复杂程度，也会测试类。它们被隔离测试，随后任何典型的依赖关系都被存根或模拟了。

这方面的一个例子是，如果你有一个从数据库获取数据的函数。然而，由于这是一个单元测试，你不会使用一个真正的数据库：你会调用一个存根的端点，它返回你通常期望从数据库得到的数据。这样一来，被测试的唯一功能就是这段代码，或者说是单元。

大多数语言都有至少一个单元测试框架推荐给自己（例如，Java → JUnit，Python → PyUnit 或 PyTest，JavaScript → Mocha、Jest、Karma，等等）。

## 集成测试

集成测试是一种专注于一起审核多个组件的测试方法。

集成测试的主要目标是确保组件或单元之间关系的完整性和数据的流动。

通常，人们会先运行单元测试来测试各个单元的逻辑完整性。然后，他们将运行集成测试，以确保这些单元之间的交互行为符合预期。继续上面的例子，在这种情况下，集成测试是针对真实数据库运行相同的测试。对于真实的数据库，你有更多的场景和行为需要考虑。

"集成测试 "是一个广泛的术语，包括任何涉及多个组件的测试。随后，可以使用大量的技术和框架，包括上面在单元测试中使用的那些技术和框架，或者单独的、基于行为的框架（下一节列出的例子）。

## 端到端测试（E2E，系统）

系统测试，或端到端（E2E）测试，侧重于从端到端审核系统的行为。

端到端测试的主要目标是确保整个应用程序或系统作为一个单元的行为是我们所期望的，而不考虑内部工作情况。

实质上，单元和集成测试是典型的 "白盒"（例如，内部结构是已知的），而 E2E 测试是典型的 "黑盒"（例如，我们只验证输入和输出的组合）。一个 E2E 测试的例子可能是一个普通的用户故事，如 "获取用户的数据"。输入可能是一个简单的 GET 请求到一个特定的路径，然后我们验证返回的输出是我们期望的。系统如何在下面获取这些数据并不重要。

正如你所看到的，E2E 测试只能检查整体行为，所以这就是为什么单元和集成测试是必要的。有可能虽然输出是正确的，但内部获得结果的方式是不正确的，而 E2E 测试不会抓住这一点。

对于 E2E 测试，你通常使用基于行为的框架。你可能会使用 Cucumber, Postman, SoapUI, Karate, Cypress, Katalon 等框架。请注意，很多 API 测试框架被用于 E2E 测试，因为 API 通常是你与应用程序进行程序性交互的方式。

## 验收测试

验收测试通常是开发周期的一个阶段。

验收测试的主要目标是验证一个给定的产品或功能是否按照客户或内部利益相关者（如产品经理）规定的规格开发。

在验收测试中，也可以有多个阶段，如 α-测试或 β-测试。随着软件开发领域向敏捷流程的发展，用户验收测试也变得不那么死板，而是更具有协作性。

值得注意的是，虽然验收测试可以验证应用程序的行为是否符合用户的要求，但它并不能验证系统的完整性。用户验收测试的另一个注意事项是，一个人能够想出的角落案例和场景是有限的--这就是为什么之前的自动化测试方法很重要，因为每一个用例和场景都是被编纂的。

## 白盒测试（结构性，透明盒）

白盒（也叫结构性或透明盒）测试描述了测试或方法，其中被测软件的细节和内部工作原理是已知的。

因为你知道函数、方法、类，它们是如何工作的，以及它们是如何联系在一起的，所以你通常更有能力去审查代码的逻辑完整性。

例如，你可能知道某种语言处理某些操作的方式有一个怪癖。你可以为其编写特定的测试，否则你就不知道在黑盒情况下编写这些测试。

单元测试和集成测试通常是白盒。

## 黑盒测试（功能、行为、封闭盒子）

相比之下，黑盒（也称为功能、行为或封闭盒）测试描述了任何测试或方法，其中不知道被测试软件的细节和内部工作原理。

由于你不知道任何细节，你不能真正创建针对特定利基场景的测试用例，或强调系统中的特定逻辑。

你唯一知道的是，对于一个请求或给定的输入，预期会有某种行为或输出。因此，黑盒测试主要测试系统的行为。端到端的测试通常是黑盒的。

## 灰盒测试

灰盒测试只是黑盒和白盒的一个混合组合。

灰盒测试采用了黑盒测试的轻松和简单（如输入 → 输出），并针对白盒测试的特定代码相关系统。

灰盒测试存在的原因是黑盒测试和白盒测试本身可能会错过重要的功能。

黑盒测试只测试你在给定的输入下得到一定的输出。它并不测试内部组件的完整性--你可能纯粹是偶然得到正确的输出。白盒测试侧重于单个单元的完整性以及它们如何共同运作，但它有时不足以发现整个系统或多组件的缺陷。通过将这两种类型结合在一起，灰盒测试可以包括更复杂的场景，以真正验证一个应用程序的结构和逻辑是否健全。

## 手动测试

不言自明 - 手工测试是用户手动指定输入或与系统互动的测试。他们也可以手动评估结果。

这种测试方法通常是缓慢和容易出错的。许多软件行业在采用敏捷原则的同时，已经转向自动化测试。

现在，用户可能会手动测试一个测试版的产品，以检查验收、边缘案例和利基方案。

## 静态测试

静态测试描述了任何没有执行实际代码的测试方法或方式。

这实际上包括与他人一起审查代码，手动验证函数、类等的逻辑和完整性。

就像手工测试一样，静态测试可能很慢，而且容易出错，一般来说，静态测试是作为第一道防线来捕捉非常明显的问题。

许多公司在工程师的工作被合并到主分支之前都会进行代码审查。这些代码审查是为了节省时间，抓住低垂的果实。

## 动态测试

动态测试描述了任何测试的方法或方式，其中代码正在实际执行中。

一般来说，前面提到的所有测试方法都是动态的，除了手动和有时验收。你通常在运行自动化脚本或使用框架来执行系统的输入。

## UI/视觉测试（浏览器测试）

UI 或浏览器测试描述了专门审查用户界面组件的完整性和行为的测试。

通常在使用一个网站时，某些动作会导致某些状态。UI 测试验证这些动作是否正确发生。例如，你实现某些 CSS 的方式可能会在 Firefox 中损坏，但在 Chrome 中不会。浏览器测试可以检查这一点。

有很多流行的浏览器测试框架，如 Selenium, Cypress, TestCafe, SauceLabs, Katalon Studio, Browsersync, Robot 等。

## 烟雾测试

烟雾测试只是指一个较小的检查子集，以合理地验证一个系统是否工作。

它只是选择和运行一组非详尽的测试，以审查核心功能。

这方面的一个例子可能是只测试几个用户流，比如上面的 "获取用户数据"。这不是详尽的，但由于你的大多数应用程序包括用户登录，提出请求，并从某处获取数据，这一个或几个测试可以给你合理的信心，你的系统是功能和工作。

通常情况下，烟雾测试是在用户期望变化不会对整体逻辑和功能产生任何重大影响时进行的。每次运行所有的测试套件是很昂贵和费时的，所以烟雾测试是作为一种廉价的安全措施，可以更频繁地运行。

## 回归测试

回归测试是一种测试方法，以验证是否有任何以前的功能特性突然损坏（或回归）。

这通常包括运行所有单元、集成和系统测试的全部内容，以确保没有功能意外改变。我们都知道，有时软件会以最奇怪的方式发生故障。

回归测试通常很耗时，而且可能非常昂贵，这就是为什么有时人们会运行烟雾测试来代替，特别是如果最近的变化在逻辑上不会影响整个系统。

通常，当人们建立 CI/CD 时，他们几乎在每次提交时都会运行烟雾测试，而回归测试可能会在设定的时间间隔或在大型功能上运行，以确保没有问题的持续集成。

## 负载测试

负载测试是指测试一个应用程序对不断增加的需求的反应。

这包括测试突然涌入的请求或用户，可能会给系统带来意想不到的压力。负载测试通常是作为安全测试的一部分，以确保应用程序及其系统不会被 DDOS 攻击。

负载测试也是为了验证一个系统在任何时候能够处理的最大数据量。它对于帮助团队确定有效的 HA（高可用性）实施和扩展公式是不可或缺的。

## 渗透测试

渗透测试（或笔测试）是安全测试的一种形式，涉及验证一个应用程序的安全性的稳健性。

一个应用程序可以被破坏的每一种方式（跨站脚本、未被授权的输入、缓冲区溢出攻击等）都被利用，以检查系统如何处理它。笔测试是确保公司不成为严重漏洞的受害者的一个重要部分。

总结正如你所看到的，在软件测试中使用了很多不同的术语，其中许多经常重叠或互换使用（但不正确）。

通过了解这些术语的确切含义并知道它们所包含的内容，你将能够理解人们在谈论什么，并根据你的需要深入挖掘。你甚至可能现在就能纠正他们。

> 原文链接： [15 testing methods all developers should know](https://circleci.com/blog/testing-methods-all-developers-should-know/)