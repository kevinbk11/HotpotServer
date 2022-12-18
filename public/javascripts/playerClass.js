class Player
{
    constructor(name,hash,ws)
    {
        this.name=name
        this.hash=hash
        this.ws=ws
    }
    getMoney(money)
    {
        let dataJson=JSON.stringify({value:money,hash:this.hash})
        let request =JSON.stringify({type:"getMoney",data:dataJson}) 
        this.ws.send(request)
    }
}