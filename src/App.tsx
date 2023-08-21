import './App.css';
import MessageEditor from './components/MessageEditor';
import { useState, useCallback } from 'react'
import {mainBlock} from './components/TemplateStructure'
import {WindowState,StateContext} from './components/StateContext';

/** Done
 *  create arrVarnames that will take string[] from localStorage
 *  create tempalte and setTemplate as useState where initial value is obtained from local storage
 *  create window and setWindow as useState to maintain current page view 
 *  create function that will switch currentWinodw
 */

const arrVarNames = JSON.parse(localStorage.getItem("arrVarNames")|| '["firstname","lastname","company","position"]')
function App() {

  const [template, setTemplate] = useState(JSON.parse(localStorage.getItem("template")||'{"tree":[{"type":"text","autoselect":true,"id":1,"info":""}],"maxId":1}'))
  const [window, setWindow] = useState("none" as WindowState)

  //append arrFunction from local storage

  const callbackSave = useCallback(
    async (elem:mainBlock)=>{
      localStorage.setItem("template", JSON.stringify(elem))
      setTemplate(elem)
      // await new Promise(f => setTimeout(f, 1));
    }, []
  )

  const switchPageState = ()=>{
      setWindow("MessageEditor")
  }

  /**
   *  if window is none show button which will have onclick event that will trigger change to MessageEditor view
   *  else show messageEditor and pass window as a context
   */
  return (
    <div className="App">
      { (window==="none") 
        ? <button className="App_button" onClick ={()=>switchPageState()}>
            Open Message Redactor
          </button> 
        : <StateContext.Provider value={{window, setWindow}}>
            <MessageEditor 
            arrVarNames={arrVarNames}
            template = {template||'{"main":[{"type":"text","autoselect":true,"id":1,"info":""}],"maxId":1}'}
            callbackSave = {callbackSave}
            /> 
          </StateContext.Provider>
      }
    </div>
  );
}

export default App;
  

  // const elemements = [{"type":"text", "autoselect":true, "id":"1", "info": ""}]
    // [{"type":"text", "autoselect":true, "id":"1", "info": ""},
    // {"type" : "block",
    // "id" : "2",
    // "cond" : [
    //           {"type":"text", "autoselect":false, "id":"2.1", "info": ""}, 
    //           {"type":"block", "id":"2.4", "cond": [{"type":"text", "autoselect":false, "id":"2.4.1", "info": ""}], "statement1": [{"type":"text", "autoselect":false, "id":"2.4.2", "info": ""}], "statement2": [{"type":"text", "autoselect":false, "id":"2.4.3", "info": ""}]}
    //         ],
    // "statement1" : [{"type":"text", "autoselect":false, "id":"2.2", "info": ""},{"type":"text", "autoselect":false, "id":"2.5", "info": ""}],
    // "statement2" : [{"type":"text", "autoselect":false, "id":"2.3", "info": ""}]},
    // {"type":"text", "autoselect":false, "id":"3", "info": ""}
    // ]
