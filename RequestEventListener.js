const eventList = require('./RequestEvent')

class RequestEventListener
{
    constructor()
    {
        this.eventSet={}
    }
    on(eventName,eventHandler)
    {
        if(this.eventSet[eventName]==null)
        {
            this.eventSet[eventName]=eventHandler
            console.log(this.eventSet[eventName])
        }

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
    listener.on(e,eventList[e])
}

module.exports=listener