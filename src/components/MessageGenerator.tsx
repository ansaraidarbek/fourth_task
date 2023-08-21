import {mainBlock, textBlock, condBlock} from './TemplateStructure'


/*Done
    create defaultObject from arrVarNames passed to messageGenerator
    update values of defaultObject form variableObject passed to messageGenerator
    create function createText that will recursively collect all text inside textBlock info field and concatenate it with Final text
    create function substituteText that for each keyin default Object, will replace all occurances of given variable name inside the string with variable value
 */
const MessageGenerator = (values:{[key:string]:string}, template:mainBlock, arrVarNames:string[])=>{
    const defaultObject:{[key:string]:string} = arrVarNames.reduce((prev, key) => ({ ...prev, [key]: ""}), {}) 

    Object.keys(defaultObject).forEach((key)=> {
        if(values.hasOwnProperty(key)){
            defaultObject[key] = values[key];
        }
    })

    const createText = (elems:(textBlock|condBlock)[]) =>{
        // create text 
        // for each element inside elems either 
            // append substituteText(textElem) to text 
            //create if then else structure 
            //with text passed as return statement of createText(children)
        // create text will always return string!
        let text:string = ""
        for(let i=0; i<elems.length; i++){
            if(elems[i].type === 'text'){
                const textElem = elems[i] as textBlock
                text += substituteText(textElem.info)
            }else{
                const condElem = elems[i] as condBlock
                if (createText(condElem.cond)){
                    text += createText(condElem.statement1)
                }else{
                    text += createText(condElem.statement2)
                }
            }
        }
        return text
    }

    const substituteText = (text:string) =>{
        //for each key in defaultObject, call replace all method on text, where each occurance of {key} should be changed by its value
        for (const key in defaultObject){
            const elem = defaultObject[key].replaceAll("{", "[|]")
            text = text.replaceAll("{"+key+"}", elem)
        }
        text = text.replaceAll("[|]", "{")
        return text
    }

    return createText(template.tree)
}

export default MessageGenerator