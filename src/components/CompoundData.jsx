import compoundData from "../data/compounds.json"
import { createContext } from "react"

const DataContext = createContext()

compoundData.forEach((obj, index) => {
  obj['id'] = index;
})

const DataProvider = (props) => {
  return (
    <DataContext.Provider value={compoundData}>
      {props.children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider}