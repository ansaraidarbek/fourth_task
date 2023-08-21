import MessageGenerator from "../components/MessageGenerator";

//object of variable names is reffered as object

/*
    pass empty props to messageGenerator
    pass initial template to messageGenerator 
    pass template with 1 if-then-else block to messageGenerator with required then condition
    pass template with 1 if-then-else block to messageGenerator with required else condition
    pass template with nested if-then-else block to messageGenerator with guranteed then condition inside guranteed then condition
    pass template with nested if-then-else block to messageGenerator with guranteed else condition inside guranteed then condition
    pass object with standart number of keys with initial, 1-if-then-else, nested if-then-else templates
    pass object with additional keys that must be ignored 
    pass object with lack of keys that should be interpreted as empty strings 
    pass object with strange template to check correct substituttion mechanism 
*/

describe(MessageGenerator, ()=>{
    it("pass empty props to messageGenerator ", ()=>{
        const text = MessageGenerator({}, {tree:[], maxId:0}, [])
        expect(text).toEqual("")
    });
});

describe(MessageGenerator, ()=>{
    it("pass initial template with empty object ", ()=>{
        const text = MessageGenerator({}, {tree:[{type:"text", id:1, info:"Every day is a beautiful day", autoselect:false}], maxId:1}, [])
        expect(text).toEqual("Every day is a beautiful day")
    });
});

describe(MessageGenerator, ()=>{
    it("pass template with 1 if-then-else block to messageGenerator with guranteed then condition ", ()=>{
        const text = MessageGenerator({}, { tree:[
                                                {type:"text", id:1, info:"Every day is a beautiful day ", autoselect:false},
                                                {   type:"block", 
                                                    id:2, 
                                                    cond:[
                                                        {type:"text", id:3, info:"Condition to made", autoselect:false}
                                                    ], 
                                                    statement1:[
                                                        {type:"text", id:4, info:"Then that should be executed", autoselect:false}
                                                    ], 
                                                    statement2:[
                                                        {type:"text", id:5, info:"Else that should not be executed", autoselect:false}
                                                    ]},
                                                {type:"text", id:6, info:" but everything fine", autoselect:false}
                                                ], 
                                            maxId:6}, [])
        expect(text).toEqual("Every day is a beautiful day Then that should be executed but everything fine")
    });
});

describe(MessageGenerator, ()=>{
    it("pass template with 1 if-then-else block to messageGenerator with guranteed else condition ", ()=>{
        const text = MessageGenerator({}, { tree:[
                                                {type:"text", id:1, info:"Every day is a beautiful day ", autoselect:false},
                                                {   type:"block", 
                                                    id:2, 
                                                    cond:[
                                                        {type:"text", id:3, info:"", autoselect:false}
                                                    ], 
                                                    statement1:[
                                                        {type:"text", id:4, info:"Then that should be executed", autoselect:false}
                                                    ], 
                                                    statement2:[
                                                        {type:"text", id:5, info:"Else that should not be executed", autoselect:false}
                                                    ]},
                                                {type:"text", id:6, info:" but everything fine", autoselect:false}
                                                ], 
                                            maxId:6}, [])
        expect(text).toEqual("Every day is a beautiful day Else that should not be executed but everything fine")
    });
});

describe(MessageGenerator, ()=>{
    it("pass template with nested if-then-else block to messageGenerator with guranteed then condition inside guranteed then condition", ()=>{
        const text = MessageGenerator({}, { tree:[
                                                {type:"text", id:1, info:"Every day is a beautiful day ", autoselect:false},
                                                {   type:"block", 
                                                    id:2, 
                                                    cond:[
                                                        {type:"text", id:3, info:"Condition to made", autoselect:false}
                                                    ], 
                                                    statement1:[
                                                        {type:"text", id:4, info:"Then that should be executed", autoselect:false},
                                                        {   type:"block", 
                                                            id:7, 
                                                            cond:[
                                                                {type:"text", id:8, info:"Condition to made", autoselect:false}
                                                            ], 
                                                            statement1:[
                                                                {type:"text", id:9, info:"Then that should be executed", autoselect:false}
                                                            ], 
                                                            statement2:[
                                                                {type:"text", id:10, info:"Else that should not be executed", autoselect:false}
                                                            ]},
                                                        {type:"text", id:11, info:" nested fine", autoselect:false}
                                                    ], 
                                                    statement2:[
                                                        {type:"text", id:5, info:"Else that should not be executed", autoselect:false}
                                                    ]},
                                                {type:"text", id:6, info:" but everything fine", autoselect:false}
                                                ], 
                                            maxId:11}, [])
        expect(text).toEqual("Every day is a beautiful day Then that should be executedThen that should be executed nested fine but everything fine")
    });
});

describe(MessageGenerator, ()=>{
    it("pass template with nested if-then-else block to messageGenerator with guranteed else condition inside guranteed then condition", ()=>{
        const text = MessageGenerator({}, { tree:[
                                                {type:"text", id:1, info:"Every day is a beautiful day ", autoselect:false},
                                                {   type:"block", 
                                                    id:2, 
                                                    cond:[
                                                        {type:"text", id:3, info:"Condition to made", autoselect:false}
                                                    ], 
                                                    statement1:[
                                                        {type:"text", id:4, info:"Then that should be executed", autoselect:false},
                                                        {   type:"block", 
                                                            id:7, 
                                                            cond:[
                                                                {type:"text", id:8, info:"", autoselect:false}
                                                            ], 
                                                            statement1:[
                                                                {type:"text", id:9, info:"Then that should be executed", autoselect:false}
                                                            ], 
                                                            statement2:[
                                                                {type:"text", id:10, info:"Else that should not be executed", autoselect:false}
                                                            ]},
                                                        {type:"text", id:11, info:" nested fine", autoselect:false}
                                                    ], 
                                                    statement2:[
                                                        {type:"text", id:5, info:"Else that should not be executed", autoselect:false}
                                                    ]},
                                                {type:"text", id:6, info:" but everything fine", autoselect:false}
                                                ], 
                                            maxId:11}, [])
        expect(text).toEqual("Every day is a beautiful day Then that should be executedElse that should not be executed nested fine but everything fine")
    });
});

describe(MessageGenerator, ()=>{
    it("pass object with all default keys", ()=>{
        const text = MessageGenerator(  {firstname:"Boris", secondname: "Nikolayevich", company:"MAT", position:"senior actor"}, 
                                        {tree:[{type:"text", id:1, info:"His name is {firstname}, secondname is {secondname}, company is {company}, position is {position}", autoselect:false}], maxId:1}, 
                                        ["firstname", "secondname", "company", "position"])
        expect(text).toEqual("His name is Boris, secondname is Nikolayevich, company is MAT, position is senior actor")
    });
});

describe(MessageGenerator, ()=>{
    it("pass object with additional keys that must be ignored ", ()=>{
        const text = MessageGenerator(  {firstname:"Boris", secondname: "Nikolayevich", company:"MAT", position:"senior actor", age:"50"}, 
                                        {tree:[{type:"text", id:1, info:"His name is {firstname}, secondname is {secondname}, company is {company}, position is {position}, his age is {age}", autoselect:false}], maxId:1}, 
                                        ["firstname", "secondname", "company", "position"])
        expect(text).toEqual("His name is Boris, secondname is Nikolayevich, company is MAT, position is senior actor, his age is {age}")
    });
});

describe(MessageGenerator, ()=>{
    it("pass object with lack of keys that should be interpreted as empty strings ", ()=>{
        const text = MessageGenerator(  {secondname: "Nikolayevich", position:"senior actor"}, 
                                        {tree:[{type:"text", id:1, info:"His name is {firstname}, secondname is {secondname}, company is {company}, position is {position}", autoselect:false}], maxId:1}, 
                                        ["firstname", "secondname", "company", "position"])
        expect(text).toEqual("His name is , secondname is Nikolayevich, company is , position is senior actor")
    });
});

describe(MessageGenerator, ()=>{
    it("pass object with strange template to check correct substituttion mechanism ", ()=>{
        const text = MessageGenerator(  {experience: "20+years"}, 
                                        {tree:[{type:"text", id:1, info:"His experience is {exp{experience}erience}", autoselect:false}], maxId:1}, 
                                        ["experience"])
        expect(text).toEqual("His experience is {exp20+yearserience}")
    });
});