type Action = {
    oldPos:number,
    curId:number,
    stateActive:boolean,
  }
  
class Storage{
curTextArea:HTMLTextAreaElement|undefined
action:Action

constructor(){
    this.curTextArea = undefined
    this.action = {oldPos:0, curId:0, stateActive:false}
}

updateCurTextArea(elem:HTMLTextAreaElement){
    this.curTextArea = elem
}

updateAction({oldPos, curId}:{oldPos:number, curId:number}){
    this.action.oldPos = oldPos
    this.action.curId = curId
    this.action.stateActive = true
}

clearAction(){
    this.action = {oldPos:0, curId:0, stateActive:false}
}
}

export default Storage
  