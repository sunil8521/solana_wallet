import { useContext } from "react"
import {contextVal} from "./Context"
const ContextAccesser = () => {
    const val=useContext(contextVal)
    return val;
  
}

export default ContextAccesser
