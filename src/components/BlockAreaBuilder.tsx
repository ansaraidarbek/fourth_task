import BlockOrText from './BlockOrText';
import "../styles/BlockAreaBuilder.css"
import {condBlock} from './TemplateStructure'
import UpdateContext from './UpdateContext'
import {useContext} from 'react'

// condBLock responsible for if-then-else structure
/** take deleteBlock function from UpdateContext and pass structure id in order to delete condBlock (MessageEditor's deleteBlock)*/

interface BlockAreaProps{
  structure:condBlock//👈️ required
}

const  BlockAreaBuilder = ({structure}:BlockAreaProps) =>{
    const {deleteBlock}  = useContext(UpdateContext)
    return (<div className='bAB_blocks' id={""+structure.id}>
      <button className="bAB_blocks_delete" onClick={()=>deleteBlock(structure.id)}>DeleteBlock</button>
      <div className="bAB_block">
        <div className="bAb_blockLeft">
          <span>If</span>
        </div>
        <div className="bAB_block_texts">
            <BlockOrText structure={structure.cond}/>
        </div>
      </div>
      <div className="bAB_block">
        <div className="bAb_blockLeft">
        <span >Then</span>
        </div>
        <div className="bAB_block_texts">
            <BlockOrText structure={structure.statement1}/>
        </div>
      </div>
      <div className="bAB_block">
        <div className="bAb_blockLeft">
        <span >Else</span>
        </div>
        <div className="bAB_block_texts">
            <BlockOrText structure={structure.statement2}/>
        </div>
      </div>
    </div>);
  }

export default BlockAreaBuilder