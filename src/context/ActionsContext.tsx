import * as React from "react";

interface Activation {
  active: boolean;
  setActive: React.SetStateAction<boolean>;
}
interface ActionsContext {
  search: Activation;
}

const actionsContext = React.createContext<ActionsContext | null>(null);

// const dispatch=()=>{

// }

// const ActionProvider = ({ children }: { children: React.ReactNode }) => {
//   const [searchActive, searchSetActive] = React.useState(false);
//   const [state,action]= React.useReducer(dispatch,{
//     sea
//   })

//   return <actionsContext.Provider></actionsContext.Provider>;
// };
