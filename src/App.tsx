import './App.css';
import './styles/BlockAreaBuilder.css'
import { useState } from 'react';
import VariableBuilder from './components/VariableBuilder';
import TextAreaBuilder from './components/TextAreaBuilder';



function App() {

  const arrFunction:string[] = [ "firstname", 'secondname', 'company', 'position']
  const [textareaInfo, setTextareaInfo] = useState<HTMLInputElement|undefined>(undefined)
  const [texts, setTexts] = useState(new Map())
  // const [arr, setArr] = useState([0,1,2,3,4,5,6])
  function varClick(varName:string){
    if(textareaInfo !== undefined){
      if(textareaInfo.selectionStart != null && textareaInfo.selectionEnd != null){
        if( textareaInfo.selectionStart != null && textareaInfo.value.length <= textareaInfo!.selectionStart){
          textareaInfo.value = textareaInfo.value+"{"+varName+"}"
        }else{
          const newText = textareaInfo.value.substring(0, textareaInfo.selectionStart)
              + "{"+varName+"}"
              + textareaInfo.value.substring(textareaInfo.selectionEnd, textareaInfo.value.length);
          let oldPos = textareaInfo.selectionStart
          textareaInfo.value = newText
          let newPos = oldPos+varName.length+2
          textareaInfo.selectionStart = newPos
          textareaInfo.selectionEnd = newPos
        }
      }else{
        console.log("somehow selectionStart or selectionEnd is null")
      }
    }
    textareaInfo?.focus()
  }

  const setHistory = (elem:HTMLInputElement|undefined) =>{
    if(elem !== textareaInfo){
      setTextareaInfo(elem)
    }
  }

  // const coolectTexts = (text:string, id:number)=>{
  //   setTexts(oldtext => [...oldtext, text])
  //   console.log(texts)
  // }

  const updateText = (text:string, id:number)=>{
    setTexts(oldMap => oldMap.set(id, text))
  }



  const doSmth = () =>{
    // setArr((oldArr) => oldArr.filter((_, index) => index !== oldArr.length-1))
    // console.log(arr)
    console.log(texts)
  }

  return (
    <div className='App'>
      <div className='App_first'>
        {arrFunction.map((elem) => {
          return <VariableBuilder varName = {elem} clicked = {varClick} key = {elem} />
        })}
      </div>
      {/* {arr.map((e)=>{
        return <TextAreaBuilder key = {e} history = {setHistory} autoselect = {true} updateText= {updateText} id={e}/>
      })} */}
      <TextAreaBuilder history = {setHistory} autoselect = {true} updateText= {updateText} id={0}/>
      <div className='bAB_blocks'>
        <div className="bAB_block">
          <div className="bAb_blockLeft">
            <span>If</span>
            <button className="bAB_blocks_delete">DeleteBlock</button>
          </div>
          <div className="bAB_block_texts">
            <TextAreaBuilder history = {setHistory} autoselect = {true} updateText= {updateText} id={0}/>
          </div>
        </div>
        <div className="bAB_block">
          <span className="bAb_blockLeft">Then</span>
          <div className="bAB_block_texts">
            <TextAreaBuilder history = {setHistory} autoselect = {true} updateText= {updateText} id={0}/>
          </div>
        </div>
        <div className="bAB_block">
          <span className="bAb_blockLeft">Else</span>
          <div className="bAB_block_texts">
            <TextAreaBuilder history = {setHistory} autoselect = {true} updateText= {updateText} id={0}/>
            <TextAreaBuilder history = {setHistory} autoselect = {true} updateText= {updateText} id={0}/>
          </div>
        </div>
      </div>
      <TextAreaBuilder history = {setHistory} autoselect = {false} updateText={updateText} id={1}/>
      <button onClick={() =>doSmth()}>CheckText</button>
    </div>
  );
}

export default App;
