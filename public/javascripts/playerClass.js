class Player
{
    constructor(name,id,ws)
    {
        this.name=name
        this.id=id
        this.ws=ws
    }
    getMoney(money)
    {
        let dataJson=JSON.stringify({value:money})
        let request =JSON.stringify({type:"getMoney",id:this.id,data:dataJson}) 
        this.ws.send(request)
    }
}