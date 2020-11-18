import React, {useReducer} from 'react';

//custom  reusable function that makes Context Provider for us
export default (reducer, actions, initialState) => {
  const Context = React.createContext()

  const Provider = ({children}) => {
    //builds reducer out of initial state and reducer passed in args
    const [state, dispatch] = useReducer(reducer, initialState);
    //init boundActions object t
    //o hold action object
    const boundActions = {}
    //clever code to put all actions in context
    for(let key in actions) {
      boundActions[key] = actions[key](dispatch);  
    }
     //return JSX with context provider and values being dynamic and make it available to all chldren
     return (
      <Context.Provider value={{state, ...boundActions}}>
        {children}
      </Context.Provider>

    )
  }
  
  return {Context, Provider}
}