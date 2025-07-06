Context:

The Context:
- ContextValue type
- createContext() - createContext<ContextValue| null>(null)
- custom hook - E.g. useTimersContext()
  - Do this so that every component calling this context don't have to check for null
- Context Provider
  - useReducer()
- export the Context Provider

Using the Context Provider:
- use it to wrap around the components that you want to make the context available to 

Using the Context in components (access & use the data stored in the Context)
- useContext() hook
  - need the Context object that was created by createContext() as an argument
  - E.g. useContext(TimersContext)
