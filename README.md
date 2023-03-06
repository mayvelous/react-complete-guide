# React Complete Guide

Learning Reactjs, Hooks, Redux, React Routing, Animations, Next.js

## App 1: Expense Tracker

Basic expense tracker app to study components, states, styling and debugging

<img src="app1.png" width="250">

## App 2: Course Goals Input

Practice basic states and validation

<img src="app2.png" width="250">

## App 3: User Age Form

Practice more form input with modal box validation, learn custom wrapper, Fragment, React `Portal` & `Ref`s

<img src="app3.png" width="250">

## App 4: Login admin

Learn `useEffect` (eg. use to store data in browser storage, send http requests, set & manage timers),
`useReducer` (for more complex state eg. if you got multiple states, multiple ways of changing it or dependencies to other states and need more powerful state management)
`useContext` (to manage site wide state, create a context `React.createContext(...)` and use `ctx.Provider` to wrap the consuming components and consume it using `ctx.Consumer` or `useContext` hook)
useRef with `React.forwardRef` component func to use `useImperativeHandle` (I'm lost there)

<img src="app4.png" width="250">

Context limitation:

- React context is NOT optimised for high frequency changes
- should not be used to replace ALL component communications and props

## App 5: Food Order

Practicing what we've learn so far in a slighter bigger app.

<img src="app5.png" width="250">

## How React works behind the scene

- React is a JS library for building user interfaces, manages components, states. React is all about components - uses components to updates user interfaces
- ReactJS does not know anything about the browser/web, it only knows how to work with components and states, props, ctx etc.
- React determines how the component tree looks like and what it should look like. (Virtual snapshots)
- ReactDOM is interface to the web; receives the differences (ie. required changes) and then manipulates the real DOM
- ReactDOM works with the real DOM and responsible for bringing up what the user sees
- Whenever state, props, or context of a component changes, that component function is re-executed and re-evaluated by React
- Re-Evaluating Components !== Re-Rendering the DOM
- Changes to the real DOM are only made for differences between evaluations
- Virtual DOM Diffing - finding out the difference between two snapshots of previous and current evaluation results

## Error Boundaries

- To pass errors between components since try-catch cannot be used
- Must use class based component to create `ErrorBoundary` component and implements `componentDidCatch` lifecycle method
- Cannot add to functional component and there's no equivalent to functional component at the moment
- `componentDidCatch` lifecycle method will be trigger whenever a child component throws an error

```
import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false }; // or whatever state you want
  }

  componentDidCatch(error) {
    // Do whatever you want with the error eg. log it or send it somewhere
    this.setState({ hasError: true })
  }

  // return children so we can wrap ErrorBoundary around the components
  // which should be protected by that component
  render() {
    if(this.state.hasError) {
      return <p>Something went wrong</p>
    }
    return this.props.children;
  }
}
```

## App 6: Movies

Try out a simple HTTP GET and POST integration via test endpoints.

## Custom Hooks

- Outsource stateful logic into reusable functions. Unlink regular functions, custom hooks can use other React hooks and React state
- name the custom hooks with `use` prefix eg. `useCounter`
- states created in a custom hooks are independent to calling components and not shared across components
- can call the custom hooks as any other functional components

## App 7: Tasks with custom hook
