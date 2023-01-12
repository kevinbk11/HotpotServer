const eventList = require('./RequestEvent')

class RequestEventListener
{
    constructor()
    {
        this.eventSet={}
    }
    on(eventName,eventHandler)
    {
        this.eventSet[eventName]=eventHandler
    }
    trigger(eventName,wss,ws,json)
    {
        let data = JSON.parse(json.data)
        let id = json.id
        this.eventSet[eventName](wss,ws,data,id)
    }
}

let listener = new RequestEventListener()
for(e in eventList)
{
    console.log(eventList[e])
    listener.on(e,eventList[e])
}
module.exports=listener