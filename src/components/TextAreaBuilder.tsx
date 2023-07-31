import '../styles/TextAreaBuilder.css'

const TextAreaBuilder = ({history, autoselect, updateText, id}:{history:Function, autoselect:boolean, updateText:Function, id:number}) =>{
    
    const textChange = (target:HTMLTextAreaElement) =>{
        target.style.height = "0";
        target.style.height=(textAreaResize(target.scrollHeight))+"px"

        updateText(target.value, id)
    }

    const textFocus = (text:React.SyntheticEvent<HTMLTextAreaElement, Event>) =>{
        const target = text.target as HTMLTextAreaElement;
        textChange(target)
        history(target)
    }

    const textAreaResize = (target:number)=>{
        let textFontSize = 12
        let NumberOfRows = Math.floor(target/textFontSize) - 1
        return NumberOfRows*textFontSize
    }


    
    return ( <textarea className='tAB_textarea' autoFocus = {autoselect} onChange={(e) => textChange(e.target)} onFocus={(e)=>textFocus(e)}></textarea>)

    /*
        value = {text} 
    */
}

export default TextAreaBuilder