class Player
{
    constructor(name,id,hp,sp,tp,money,level,exp,unlocked,ws)
    {
        this.Name=name
        this.ID=id
        this.HealthyPoint=hp
        this.SatPoint=sp
        this.ThirstyPoint=tp
        this.Money=money
        this.Level=level
        this.Exp=exp
        this.Unlocked=unlocked
        this.ws=ws
        this.start()
    }
    start(){
        setInterval(()=>{
            this.SatPoint-=1;
        },5000)
    }
    setMoneyRequest(money)
    {

        let jsonBuilder = new stringJsonBuilder('setMoney')
        let request = jsonBuilder.addData('value',Money).build()
        this.ws.send(request)
    }
    setMoney(money)
    {
        this.Money+=money
    }
}