/**
 * Define state, action, reducer use pure redux
 * show how to use redux
 *
 * How to run:
 * 1. install redux
 * 2. run node use-redux.js
 */

const redux = require('redux')

// define initialState
const initialState = {
  todo: []
}

// define actions:
const addAction = data => ({
  type: 'add',
  data
})
const deleteAction = {
  type: 'delete'
}

// define reducer
const reducer1 = (preState = initialState, action) => {
  switch (action.type) {
    case 'add':
      preState.todo.push(action.data)
      return preState
    case 'delete':
      preState.todo.pop()
      return preState
    default:
      return initialState
  }
}

// define store
const store = redux.createStore(reducer1)

const showState = () => {
  const nowState = store.getState()
  console.log(nowState)
}

showState()
// { todo: [] }
store.dispatch(addAction('a'))
showState()
// { todo: ['a'] }
store.dispatch(addAction('b'))
showState()
// { todo: [ 'a', 'b' ] }
store.dispatch(deleteAction)
showState()
// { todo: [ 'a' ] }
