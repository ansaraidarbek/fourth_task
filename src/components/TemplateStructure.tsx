//Here is the structure of template where main is the root 

export type mainBlock = {
    tree:(textBlock|condBlock)[],
    maxId:number
  }

export type textBlock = {
    type:"text",
    id:number,
    info:string
    autoselect:boolean,
} 

export type condBlock = {
    type:"block",
    id:number,
    cond:(textBlock|condBlock)[],
    statement1:(textBlock|condBlock)[],
    statement2:(textBlock|condBlock)[],
}