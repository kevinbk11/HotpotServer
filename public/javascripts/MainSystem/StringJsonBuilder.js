class StringJsonBuilder//Client
{
    constructor(id)
    {
        this.type=""
        this.data={}
        this.id=id
    }
    addData(key,value)
    {
        this.data[key]=value
        return this
    }
    build()
    {
        return JSON.stringify({type:this.type,'id':this.id,data:JSON.stringify(this.data)})
    }
    changeType(type)
    {
        this.type=type
        this.data={}
        return this
    }
}