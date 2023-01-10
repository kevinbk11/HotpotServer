
class StringJsonBuilder//Server
{
    constructor(type)
    {
        this.type=this.jsonType(type)
        this.data={}
    }
    jsonType(type){return(type+'Response')}
    addData(key,value)
    {
        this.data[key]=value
        return this
    }
    build()
    {
        return JSON.stringify({type:this.type,data:JSON.stringify(this.data)})
    }
    changeType(type)
    {
        this.type=this.jsonType(type)
        this.data={}
        return this
    }

}
module.exports=StringJsonBuilder