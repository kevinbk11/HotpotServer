class Player
{
    constructor(name,id,hp,sp,tp,money,level,exp,ws)
    {
        this.name=name
        this.id=id
        this.hp=hp
        this.sp=sp
        this.tp=tp
        this.money=money
        this.level=level
        this.exp=exp
        this.ws=ws
    }
    setMoneyRequest(money)
    {

        let jsonBuilder = new stringJsonBuilder('setMoney')
        let request = jsonBuilder.addData('value',money).build()
        this.ws.send(request)
    }
    setMoney(money)
    {
        this.money+=money
    }
}