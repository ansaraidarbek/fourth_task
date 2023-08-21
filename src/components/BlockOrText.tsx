import TextAreaBuilder from './TextAreaBuilder';
import BlockAreaBuilder from './BlockAreaBuilder';
import {textBlock, condBlock} from './TemplateStructure'

// this component checks the type of element in structure either
// and returns the components associated with it 

interface BlockOrTextProps {  
  structure:(textBlock|condBlock)[];//👈️ required
}

const BlockOrText = ({structure}:BlockOrTextProps) =>{
    return <>
          {structure.map((elem:(textBlock|condBlock))=>{
              return (elem.type === "text")
              ?<TextAreaBuilder key = {elem.id} structure={elem as textBlock}/>
              :<BlockAreaBuilder key = {elem.id} structure={elem as condBlock}/>
              })
          }
          </>
}

export default BlockOrText