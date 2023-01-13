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
        this.isNotStarving=true
        this.needExp=this.Level*5
    }
    start(){ 
        $(".bar.sp").css("width",`${this.SatPoint}%`)
        $(".bar.hp").css("width",`${this.HealthyPoint}%`)
        $(".bar.wp").css("width",`${this.ThirstyPoint}%`)
        setInterval(()=>{
            if(this.SatPoint!=0)this.setSP(-1)
            if(this.SatPoint==0 && this.isNotStarving)
            {
                this.isNotStarving=false
                let id = setInterval(()=>{
                    if(this.HealthyPoint!=0 && this.SatPoint==0)
                    {
                        this.setHP(-20)
                        $(".bar.hp").css("width",`${this.HealthyPoint}%`)
                    }
                },10000)
                let id2=setInterval(()=>{
                    if(this.SatPoint!=0)
                    {
                        clearInterval(id)
                        clearInterval(id2)
                        this.isNotStarving=true
                    }
                },100)
            }
            $(".bar.sp").css("width",`${this.SatPoint}%`)
        },20000)
        setInterval(()=>{
            if(this.ThirstyPoint!=0)this.setTP(-1)
            $(".bar.wp").css("width",`${this.ThirstyPoint}%`)
        },10000)
    }
    die()
    {
        alert("你被送往醫院，並且扣除身上25%的金錢")
        this.setMoney(-(this.Money)*0.25)
        this.setHP(100)
        this.setSP(100)
        this.setTP(100)
    }
    eat(food)
    {
        this.setHP(food.healHP)
        this.setSP(food.healSP)
        this.setTP(-2)
        this.Exp+=food.exp
        if(this.Exp>=this.needExp)
        {
            this.levelUp()
        }
    }
    levelUp()
    {

        this.Level++
        this.needExp=this.Level*5
        this.Exp=0
        alert(`你現在是等級${this.Level}，目前等級所需的經驗值為${this.needExp}`)
        this.update()
        $('.number').html(this.Level)
    }
    update()
    {
        let jsonBuilder = new StringJsonBuilder(this.ID)
        let json = jsonBuilder.changeType('update').addData('playerData',JSON.stringify(this)).build()
        this.ws.send(json)
    }
    setHP(hp)
    {
        this.HealthyPoint+=hp
        $(".bar.hp").css("width",`${this.HealthyPoint}%`)
        if(this.HealthyPoint>100)this.HealthyPoint=100
        if(this.HealthyPoint<=0){
            this.HealthyPoint=0
            this.SatPoint=0
            this.ThirstyPoint=0
            this.die()
        }
        this.update()
    }
    setSP(sp)
    {
        this.SatPoint+=sp
        $(".bar.sp").css("width",`${this.SatPoint}%`)
        if(this.SatPoint>100)this.SatPoint=100
        this.update()
    }
    setTP(tp)
    {
        this.ThirstyPoint+=tp
        $(".bar.wp").css("width",`${this.ThirstyPoint}%`)
        if(this.ThirstyPoint>100)this.ThirstyPoint=100
        this.update()
    }
    setMoney(money)
    {
        this.Money+=money
        this.Money=Math.floor(this.Money)
        $(".money").html(this.Money+"$")
        this.update()
    }
}