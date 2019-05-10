/**
 * TODO: then return new PromiseA()
 *
 * reference:
 * [Promise/A+](https://promisesaplus.com/)
 *
 * test:
 * `npm i -g promises-aplus-tests`
 * `promises-aplus-tests Promise.js`
 *
 */

class PromiseA {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallback = []
    this.onRejectedCallback = []

    let resolve = v => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = v

        this.onFulfilledCallback.forEach(fn => fn())
      }
    }

    let reject = v => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = v

        this.onRejectedCallback.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  thenA(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    }

    if (this.state === 'rejected') {
      onRejected(this.reason)
    }

    if (this.state === 'pending') {
      this.onFulfilledCallback.push(() => onFulfilled(this.value))
      this.onRejectedCallback.push(() => onRejected(this.reason))
    }
  }
}

// test
const p = new PromiseA((res, rej) => {
  console.log('....')
  setTimeout(() => {
    res('a')
    console.log('res ...p:', p)
  }, 2000)
})

p.thenA(res => {
  console.log('then...', res)
})
