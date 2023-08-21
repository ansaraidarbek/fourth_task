# messageTemplate
This is an example of a message template tool. 
Let's assume that you want to create a mail delivery system, but sometimes you lack information, for example, position, company, gender, etc. However you dont have time to create different messages based on the information you have regarding each client. 
This message template will create dynamic messages that will change with the values of the variables that you need. 
Example 
    If ({position}) 
    then (because you work as a {position}) 
    else (but what is your position?)
Output
        Case 1 -->the  position is --> "developer" 
                    the message is --> ...because you work as a developer ...
        Case 2 --> position is --> ""
                    the message is --> ...but what is your position?...

# Here is a gif that shows the behaviour of this tool
![ezgif com-video-to-gif](https://github.com/ansaraidarbek/message_template/assets/88711794/bba4fd49-bf7c-4c49-aaf0-599ff378a758)

