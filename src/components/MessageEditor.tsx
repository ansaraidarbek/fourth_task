import {useCallback, useEffect, useReducer, useContext, memo } from 'react';
import MessagePreview from './MessagePreview';
import "../styles/MessageEditor.css";
import BlockOrText from './BlockOrText';
import UpdateContext from './UpdateContext';
import Storage from './Storage';
import {mainBlock, textBlock, condBlock} from './TemplateStructure';
import {WindowState, StateContext} from './StateContext';

/*Done
    create instance of Storage class, to store last selected textarea, and activity information such as id and position
    create reducer function for useReducer hook, to maintain any change in the template
      In all the cases reducer will accept new template
    inside Message editor:
      create state and reducer with useReducer
      obtain window from StateContext component
      create useEffect with state dependency in order to activate any activity done
      create VarClick function in order to maintain the behaviour after Variable is clicked
      create setHistory function in order to memorize last selected textarea
      create three functions in order to delete, to add, and to update template items
      create function that will recursively search for targeted textBlock or condBlock and will force an activity
*/

interface MessageEditorProps {
  arrVarNames: string[]; // 👈️ required 
  template?: mainBlock; // 👈️ optional
  callbackSave:Function // 👈️ optional
}

const storage = new Storage()

const reducer = (state:mainBlock, action:{value:(textBlock|condBlock)[],type:string})=>{
    switch(action.type){
      case 'divide':
        return {tree:action.value, maxId:state.maxId+5}
      case 'delete':
        return {tree:action.value, maxId:state.maxId}
      default:
        return {tree:action.value, maxId:state.maxId}
    }
}

const MessageEditor = ({arrVarNames, template=JSON.parse('{"tree":[{"type":"text","autoselect":true,"id":1,"info":""}],"maxId":1}'), callbackSave}:MessageEditorProps) =>{

  const [state, dispatch] = useReducer(reducer, template)
  const {window, setWindow} = useContext(StateContext)

  useEffect (
    ()=>{
      if(storage.action.stateActive === true){
        let elem= document.getElementById(""+storage.action.curId)
        const target = elem as HTMLTextAreaElement
        
        target.selectionStart = storage.action.oldPos
        target.selectionEnd = storage.action.oldPos
        target.focus()
        storage.clearAction()
      }
    }, [state]
  )

  const varClick =useCallback((varName:string)=>{
    //create newString and newPos then change textarea value, selectionStart, selectionEnd
    if(storage.curTextArea !== undefined){
      let newPos = storage.curTextArea.selectionStart+varName.length+2
      const newText:string = storage.curTextArea.value.substring(0, storage.curTextArea.selectionStart)
      + "{"+varName+"}"
      + storage.curTextArea.value.substring(storage.curTextArea.selectionEnd, storage.curTextArea.value.length);
      storage.curTextArea.value = newText

      storage.curTextArea.value = newText
      storage.curTextArea.selectionStart = newPos
      storage.curTextArea.selectionEnd = newPos

      storage.curTextArea!.focus()
    }
  }, [])

  const setHistory = (elem:HTMLTextAreaElement|undefined) =>{
    //is target is new textArea change last selected textArea
    if(elem !== storage.curTextArea){
      storage.curTextArea = elem
    }
  }

  const updateText = (text:string, id:number)=>{
    const newMain = changeData(state.tree, id,"text", text)
    dispatch({value: newMain, type:"text"})
  }

  const deleteBlock = (id:number) =>{
    const newMain = changeData(state.tree, id, "delete", "")
    dispatch({value: newMain, type:"delete"})
  }

  const divideBLock = () =>{
    //obtain id from currently selected textArea 
    //call changeData 
    //dispatch newData
    if(storage.curTextArea !== undefined){
      let strId:string = storage.curTextArea.id 
      const newMain = changeData(state.tree, +strId, "divide", "")
      dispatch({value: newMain, type:"divide"})
    }
  }

  const changeData = (elem:(textBlock|condBlock)[], id:number, type:string ,text:string):(textBlock|condBlock)[] =>{
    /*
      Iterate through each elem in structure 
        If id is found 
          Then change array based on three conditions where
            divide will remove current textarea and substitute it with new three block {textBlock, condBlock, textBlock}
            delete will remove current condBlock and next textBlock, where contents of nextTextblock will be added to prevTextBLock
            default will change info field of textBLock 
        Else 
          If condBlock then we should iterate over its children
            changeData(cond), changeData(statement1), changeData(statement2)
        Item is allways somewhere inside this structure!
        In all cases changeData will either return array with lenght>1 meaning that element was found or array with lenght === 0 meaning that this block did not containt such element
     */
    for (let i =0; i<elem.length; i++){
      if(elem[i].id===id){
        let newElem:(textBlock|condBlock)[]
        switch(type){
          case('divide'):
            const currentBlock = elem[i] as textBlock
            let start = storage.curTextArea!.selectionStart
            let end = storage.curTextArea!.selectionEnd
            let fullText = currentBlock.info
            newElem = [...elem.slice(0, i),
                {"type":"text", "autoselect":(elem[i].id===1)?true:false, "id":elem[i].id, "info": fullText.slice(0, start)},
                {"type":"block", "id":state.maxId+1, "cond": [{"type":"text", "autoselect":false, "id":state.maxId+2, "info": ""}], "statement1": [{"type":"text", "autoselect":false, "id":state.maxId+3, "info": ""}], "statement2": [{"type":"text", "autoselect":false, "id":state.maxId+4, "info": ""}]},
                {"type":"text", "autoselect":false, "id":state.maxId+5, "info": fullText.slice(end)},
                ...elem.slice(i+1)]
              storage.updateAction({oldPos:start, curId:elem[i].id})
            // await new Promise(f => setTimeout(f, 3000));
            break
          case("delete"):
            const prevBlock = elem[i-1] as textBlock
            const nextBlock = elem[i+1] as textBlock
            let newText:string = prevBlock.info + nextBlock.info
            let oldPos = prevBlock.info.length
            newElem = [...elem.slice(0, i-1),
              {"type":"text", "autoselect":(elem[i-1].id===1)?true:false, "id":elem[i-1].id, "info":newText},
              ...elem.slice(i+2)]
              storage.updateAction({oldPos:oldPos, curId:elem[i-1].id})
            // await new Promise(f => setTimeout(f, 3000));
            break
          default:
            newElem = elem.map((el:textBlock|condBlock) => {
              if(el.id === id){
                return {...el, info : text}
              }
              return el
            })
        }
        return newElem
      }
      if(elem[i].type === "block"){
        const currentBlock = elem[i] as condBlock
        let newCond = changeData(currentBlock.cond, id, type, text)
        if(newCond.length>0){
          return [...elem.slice(0, i), {...currentBlock, cond: newCond }, ...elem.slice(i+1)]
        }
        let newStatement1 = changeData(currentBlock.statement1, id, type, text)
        if(newStatement1.length>0){
          return [...elem.slice(0, i), {...currentBlock, statement1: newStatement1}, ...elem.slice(i+1)]
        }
        let newStatement2 = changeData(currentBlock.statement2, id, type, text)
        if(newStatement2.length>0){
          return [...elem.slice(0, i), {...currentBlock, statement2: newStatement2 }, ...elem.slice(i+1)]
        }
      }
    }
    return []
  }

  //If window is messagePreview return MessagePreview component and pass setHistory, updateText, deleteBlock as context else MessageEditorComponents
  //Preview button will change window to MessagePreview
  //Close button will change window to none
  return (
      <>
      {(window==="MessagePreview")
        ?<MessagePreview
            arrVarNames={arrVarNames}
            template={state}
          />
        :<div className='mE'>
          <div className='mE_first'>
            {arrVarNames.map((elem:string) => {
              return <VariableBuilder varName = {elem} clicked = {varClick} key = {elem} />
            })}
          </div>
          <textarea onClick={() =>divideBLock()} className='mE_second' value="Click to add if-then-else block" readOnly></textarea>
          <UpdateContext.Provider value={{setHistory, updateText, deleteBlock}}>
            <BlockOrText structure={state.tree}/>
          </UpdateContext.Provider>
          <div className="mE_third">
          <button onClick={() =>setWindow("MessagePreview" as WindowState)}>Preview</button>
          <button onClick={() =>callbackSave(state)}>Save</button>
          <button onClick={() =>setWindow("none" as WindowState)}>Close</button>
          </div>
        </div>
      }
      </>
    );
}

export default MessageEditor

const VariableBuilder = memo(({varName, clicked} :{varName:string, clicked:Function}) => {
  return (<span className="mE_varSpan" onClick={()=>clicked(varName)}>{"{"+varName+"}"}</span>)
})

//Past ideas to detect new elem on page 
  // const addAction = (action:Action)=>{
  //     const timer = setInterval(()=>{
  //       const elem = document.getElementById(""+action.curId)
  //       if(elem){

  //         let prevTarget= document.getElementById(""+action.prevId)
  //         if(prevTarget){
  //           prevTarget.focus()
  //         }else{console.log("How it is possible that previous element is not found after addAction?")}

  //         clearInterval(timer)
  //       }
  //     }, 1)
  // }

  // const deleteAction = (action:Action)=>{
  //   const timer = setInterval(()=>{
  //     const prevElem = document.getElementById(""+action.prevId)
  //     if(!prevElem){
  //       let elem= document.getElementById(""+action.curId)
  //       const target = elem as HTMLTextAreaElement

  //       target.selectionStart = action.oldPos
  //       target.selectionEnd = action.oldPos
  //       target.focus()
  //       clearInterval(timer)
  //     }
  //   }, 1)
// }