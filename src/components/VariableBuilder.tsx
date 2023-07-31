
import '../styles/VariableBuilder.css'

const VariableBuilder = ({varName, clicked} :{varName:string, clicked:Function}) => {
    return (<span className="vB_span" onClick={()=>clicked(varName)}>{"{"+varName+"}"}</span>)
}

export default VariableBuilder