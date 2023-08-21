import { useState, useRef, useEffect, useContext} from 'react';
import '../styles/MessagePreview.css'
import {mainBlock} from './TemplateStructure'
import MessageGenerator from './MessageGenerator'
import {WindowState, StateContext} from './StateContext';

interface MessagePreviewProps {
    arrVarNames:string[]; //👈️ required 
    readonly template:mainBlock; //👈️ required readonly
}

/*Done
    create variables and setVariables as useState in order to imatain inputs 
    make ref to readonly textArea
    obtain window from StateContext context
    create useEffect that will resize the textarea according to its inner value when ref is chanfed
    create inputChanged function that will detect any change inside inputs and apply them on textArea
    create resizeTextArea that will take ref and change its inner height
 */

const MessagePreview = ({arrVarNames,template}:MessagePreviewProps) =>{
    const [variables, setVariables] = useState<{[key:string]:string}>(arrVarNames.reduce((o, key) => ({ ...o, [key]: ''}), {}))
    const textArea = useRef<HTMLTextAreaElement>(null)
    const {setWindow} = useContext(StateContext)

    useEffect(()=>{
        if(textArea.current!== null){
            ResizeTextArea()
        }
    }, [textArea])

    const inputChanged = (key:string, value:string) =>{
        /*  setVariables according to key and new value  
            call message generator in order to obtain new text for textArea
            reseize the text area
        */
        setVariables(oldValues => ({...oldValues, [key]:value}))
        if(textArea.current!==null){
            textArea.current.value = MessageGenerator(variables, template, arrVarNames)
            ResizeTextArea()
        }
    }

    const ResizeTextArea = ()=>{
        //change textArea height according to its scrollHeight
        if(textArea.current !== null){
            textArea.current.style.height = "0";
            let textFontSize = 12
            let NumberOfRows = Math.floor(textArea.current.scrollHeight/textFontSize) - 1
            textArea.current.style.height = (NumberOfRows*textFontSize) + "px"
        }else{
            console.log("textArea is null")
        }
        //Note: I have used math.floor because for me scroll height returned float which automatically increased the height, however I wanted to keep it beautiful 
    }

    // return components and close buttonwith onCLick event that will change the window to MessageEditor
    return (
        <div className="mP">
            <h1>Message Preview</h1>
            <textarea ref={textArea} className="mP_preview" readOnly value={MessageGenerator({...variables, age:"50"}, template, arrVarNames)}></textarea>
            <div className='mP_variables'>
                <span>Variables:</span>
                <div className="mP_variablesCont">
                {Object.keys(variables).map((key) =>{
                    return  <InputBuilder key={key} name={key} value={variables[key]} inputChanged={inputChanged}  />
                })}
                </div>
            </div>
            <button className="mP_button" onClick={()=>setWindow("MessageEditor" as WindowState)}>Close</button>
        </div>
    )
}


const InputBuilder = ({name, value, inputChanged}:{name:string, value:string, inputChanged:Function})=> {
    return (<div key={name} className="mP_variable">
                            <label htmlFor={"mP_" + name}>{name}</label>
                            <input type="text" id={"mP_" + name} placeholder={name} autoComplete='off' value={value} onChange={e => inputChanged(name, e.target.value)} />
                        </div>);
}

export default MessagePreview