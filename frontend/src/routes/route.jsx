import { Routes , Route } from "react-router-dom";
import Authentication from "../components/authentication";


function Routing(){
    return(
        <Routes>
 
         <Route path="/validation" element={<Authentication/>} />
  
        </Routes>
    )
}

export default Routing;