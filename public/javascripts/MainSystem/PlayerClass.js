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
        $(".bar.sp").css("width",`${this.SatPoint}%`)
        $(".bar.hp").css("width",`${this.HealthyPoint}%`)
        $(".bar.wp").css("width",`${this.ThirstyPoint}%`)
        setInterval(()=>{
            if(this.SatPoint!=0)this.SatPoint-=1;
            $(".bar.sp").css("width",`${this.SatPoint}%`)
        },30000)
        setInterval(()=>{
            if(this.ThirstyPoint!=0)this.ThirstyPoint-=1;
            $(".bar.wp").css("width",`${this.ThirstyPoint}%`)
        },20000)
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