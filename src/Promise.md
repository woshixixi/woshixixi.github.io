# Promise

## 定义

本质上是一种对象，该对象绑定了两个回调函数，分别为成功和失败的回调函数
Promise 有三种状态：

    1.  pending 初始状态
    2.  fulfilled 成功状态
    3.  rejected 失败状态

pending 状态经过 Promise 对象的触发，变成 fulfilled 或者是 rejected 状态，然后被 Promise 的 then 方法的参数函数进行处理。 具体细则可见 MDN[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise]

## 用法

then 的两个参数分别为 resolve 和 reject 的返回的结果

```
const promise1 = new Promise((resolve, reject) => {
  console.log("new paromise1")
  resolve("sucess")
})

promise1
  .then((ares, arej) => {
    console.log("promise-then-success", ares, arej)
    return "promise-2"
  })
  .then((bres, brej) => {
    console.log("promise2-then-then", bres, brej)
  })
  .catch(e => console.log("catch..", e))

/** 输出
 * new paromise1
 * promise-then-success sucess undefined
 * promise2-then-then promise-2 undifined
 */
```

## 实现

### 解析

    1. promise 有三个状态
    2. promise then 后返回 promise
    3. promise

### 构造函数

1.  promise 有状态变化，promise 接收一个 executor 的参数,executor 是带有 resolve 和 reject 两个参数的函数 。
2.  Promise 构造函数执行时立即调用 executor 函数， resolve 和 reject 函数被调用时，分别将 promise 的状态改为 fulfilled（完成）或 rejected（失败）。
3.  executor 内部通常会执行一些异步操作，一旦完成，可以调用 resolve 函数来将 promise 状态改成 fulfilled，或者在发生错误时将它的状态改为 rejected。
    因此，该构造函数应该包含：

```
function Prom(executor) {
  this.status = "pending"

  const resolve = res => {
    this.status = "fulfilled"
    return res
  }

  const reject = rej => {
    this.status = "rejected"
    return rej
  }

  executor(resolve,reject)  //立即调用executor函数
}
```

这样 运行代码 ：

```
const p = new Prom((res, rej) => {
  console.log("newP")
  res("succ")
})


/** 输出
 * newP
 */
```

### then()

构造函数构造出来的实例有.then 方法，因此使用 prototype 来构建

```
Prom.prototype.then = (resolve, reject) => {}
```
