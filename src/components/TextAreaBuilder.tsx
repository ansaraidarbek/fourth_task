import '../styles/TextAreaBuilder.css'
import {useRef, useEffect, useContext} from 'react'
import {textBlock} from './TemplateStructure'
import UpdateContext from './UpdateContext'


// textBlock responsible for textArea
/*Done
    create ref to textArea
    obtain setHistory and updateText from Update context (MessageEditor's setHistory and updateText)
    create useEffect that will resize textarea each time it is created , with ref dependency
    create textChange function that will be called whenever textarea onChange is triggered 
    create textFocus that that will be called whenever textarea onFocus is triggered 
    create function resizeTextArea that will change inner height of textarea according to its inner value
*/

interface TextAreaProps{
    structure:textBlock,//👈️ required
}

const TextAreaBuilder =({ structure}:TextAreaProps)=>{
    
    const textArea = useRef<HTMLTextAreaElement>(null)
    const {setHistory,updateText}  = useContext(UpdateContext)
    
    useEffect(()=>{
        /*Whenever textArea created with existing value, selectionStart and selectionEnd should be changed */
        if(textArea.current!== null){
            ResizeTextArea()
            textArea.current.selectionStart = textArea.current.value.length
            textArea.current.selectionEnd = textArea.current.value.length
        }
    }, [textArea])

    const textChange = (newText:string) =>{
        ResizeTextArea()
        updateText(newText, structure.id)
    }

    const textFocus = (target:HTMLTextAreaElement) =>{
        /*If current value is longer than of structure.length, meaning new variable was added, call textChange */
        //call setHistory meaning textarea was changed
        if(target.value.length !== structure.info.length){
            textChange(target.value)
        }else{
            ResizeTextArea()
        }
        setHistory(target)
        //Note* sometimes it is possible that target length and structure info lenght are same, however resize is needed, happens when new item is deleted and adde 
    }

    const ResizeTextArea = ()=>{
        //change textArea height according to its scrollHeight
        if(textArea.current !== null){
            textArea.current.style.height = "0";
            let textFontSize = 12
            let NumberOfRows = Math.floor((textArea.current.scrollHeight)/textFontSize) - 1
            textArea.current.style.height = (NumberOfRows*textFontSize) + "px"
        }
        //Note: I have used math.floor because for me scroll height returned float which automatically increased the height, however I wanted to keep it beautiful 
    }
    
    return ( <textarea 
                ref={textArea} 
                className='tAB_textarea' 
                id={""+structure.id} 
                value={structure.info} 
                autoFocus = {structure.autoselect} 
                onChange={(e) => textChange(e.target.value)} 
                onFocus={(e)=>textFocus(e.target)}>
            </textarea>)
}

export default TextAreaBuilder