
const sql = require("./routes/game").sql
class Food
{
    constructor(name,money,level,needTime,exp,healHP,healSP,minusHP,dieTime,foodID)
    {
        this.queueID
        this.nowTime=0
        this.foodID=foodID
        this.name=name
        this.money=money
        this.level=level
        this.needTime=needTime
        this.exp=exp
        this.healHP=healHP
        this.healSP=healSP
        this.minusHP=minusHP
        this.dieTime=dieTime
        this.isEaten=false
        this.listener = require('./RequestEventListener')
        this.wss = require('./app').wss
        this.intervalID
        this.who
    }
    async startCountDown()
    {
        this.p = new Promise(sol=>{
            this.intervalID = setInterval(()=>{
                this.nowTime++
                sql.query(`UPDATE hotpot SET nowTime = ${this.nowTime} WHERE queueID = ${this.queueID}`)
                if(this.nowTime==120){
                    sql.query(`DELETE FROM hotpot WHERE queueID = ${this.queueID}`)
                    clearInterval(this.intervalID)
                }
                this.listener.trigger('foodTimeUpdate',wss,null,{'data':JSON.stringify({nowTime:this.nowTime,queueID:this.queueID})})
            },1000)
        })
    }
    eat()
    {
        sql.query(`DELETE FROM hotpot WHERE queueID = ${this.queueID}`)
        clearInterval(this.intervalID)

        return this
    }

}
function getFood(foodID)
{
    let porkSlices = new Food('豬肉片',10,1,15,1,5,2,50,120,1,1)
    let beefSlices = new Food('牛肉片',15,1,15,1,6,1,50,120,2,1)
    let shrimp = new Food('蝦子',10,1,15,1,5,1,90,120,3,2)
    let clams = new Food('蛤俐',10,1,30,1,5,1,90,120,4,2)
    let friedTofuSkin = new Food('炸豆皮',5,1,30,1,5,2,10,120,5,5)
    let frozenTofu = new Food('凍豆腐',5,1,40,1,5,1,10,120,6,5)
    let Yendumpling = new Food('燕餃',5,1,42,1,5,1,10,120,7,5)
    let kamaboko = new Food('魚板',5,1,43,1,5,1,10,120,8,5)
    let goldMushroom = new Food('金針菇',10,1,52,1,5,2,10,120,9,3)
    let mushroom = new Food('香菇',5,1,54,1,5,1,10,120,10,3)
    let cabbage = new Food('高麗菜',10,1,40,1,5,2,0,120,11,3)
    let fishdumpling = new Food('魚餃',5,2,40,2,6,1,10,120,12,5)
    let meatBalls = new Food('貢丸',10,3,44,2,5,1,0,120,13,5)
    let crabStick = new Food('蟳味棒',5,4,32,2,5,1,1,120,14,5)
    let drumstick = new Food('雞腿肉',15,5,51,2,5,1,50,120,15,1)
    let CuttlefishAndShrimpPaste = new Food('花枝蝦漿',10,6,56,1,5,1,50,120,16,5)
    let pigBloodCake = new Food('米血糕',10,7,49,1,5,1,10,120,17,5)
    let eggdumpling = new Food('蛋餃',5,8,53,1,5,1,10,120,18,5)
    let smallfishball = new Food('小魚丸',10,9,26,1,5,1,10,120,19,5)
    let Crocodile = new Food('鱷魚肉',20,10,28,1,5,1,50,120,20,1)
    let quadOilTofu = new Food('四角油豆腐',10,11,27,1,5,1,10,120,21,5)
    let fishTofu = new Food('魚豆腐',5,12,37,1,5,1,10,120,22,5)
    let goldenFishBall = new Food('黃金魚丸',5,13,36,1,5,1,10,120,23,5)
    let CuttlefishPaste = new Food('花枝漿',5,14,14,1,5,1,50,120,24,5)
    let squad = new Food('魷魚',20,15,20,1,5,1,90,120,25,2)
    let quailEgg = new Food('鵪鶉蛋',5,16,31,1,5,1,0,120,26,1)
    let whiteCabbage = new Food('小白菜',10,17,22,1,5,1,0,120,27,3)
    let waterSpinach = new Food('空心菜',10,18,34,1,5,1,0,120,28,3)
    let spinach = new Food('菠菜',10,19,26,1,5,1,0,120,29,3)
    let lycosa = new Food('狼蛛',50,20,37,1,5,1,1,120,30,7)
    let shrimpPaste = new Food('蝦仁漿',10,21,23,1,5,1,50,120,31,5)
    let kingOysterMushroom = new Food('杏鮑菇',10,22,33,1,5,1,10,120,32,3)
    let ChMei = new Food('大陸妹',10,23,41,1,5,1,0,120,33,3)
    let sweetPotatoLeave = new Food('地瓜葉',10,24,42,1,5,1,0,120,34,3)
    let frog = new Food('青蛙肉',30,25,44,1,5,1,50,120,35,1)
    let NabeyakiEggNoodles  = new Food('鍋燒意麵',10,26,29,1,5,1,10,120,36,4)
    let egg = new Food('雞蛋',10,27,31,1,5,1,15,120,37,5)
    let sharkPaste = new Food('鯊魚漿',10,28,26,1,5,1,50,120,38,5)
    let wideWinterNoodles = new Food('寬冬粉',10,29,16,1,5,1,10,120,39,4)
    let quail = new Food('鵪鶉',30,30,50,1,5,1,50,120,40,1)
    let milkFish = new Food('虱目魚',20,31,30,1,5,1,90,120,41,2)
    let WinterNoodles = new Food('冬粉',10,32,48,1,5,1,10,120,42,4)
    let crab = new Food('螃蟹',30,33,42,1,5,1,90,120,43,2)
    let sheep = new Food('羊肉',15,34,34,1,5,1,50,120,44,1)
    let ostrich = new Food('鴕鳥肉',30,35,31,1,5,1,50,120,45,1)
    let chickenNoodles = new Food('雞絲麵',10,36,39,1,5,1,0,120,46,4)
    let princeNoodles = new Food('王子麵',10,37,26,1,5,1,0,120,47,4)
    let locust = new Food('蝗蟲',15,38,27,1,5,1,30,120,48,7)
    let mantis = new Food('螳螂',10,39,25,1,5,1,30,120,49,7)
    let mealworms = new Food('麵包蟲',5,40,18,1,5,1,30,120,50,7)
    let wuKuoFish = new Food('吳郭魚',30,41,45,1,5,1,90,120,51,2)
    let udon = new Food('讚崎烏龍麵',20,42,46,1,5,1,10,120,52,4)
    let tadpole = new Food('蝌蚪',20,43,35,1,5,1,50,120,53,7)
    
    let foodarr = [porkSlices, beefSlices, shrimp, clams, friedTofuSkin, frozenTofu, Yendumpling, kamaboko, goldMushroom, mushroom, cabbage, fishdumpling, meatBalls, crabStick, drumstick , CuttlefishAndShrimpPaste, pigBloodCake, eggdumpling, smallfishball, Crocodile, quadOilTofu, fishTofu, goldenFishBall, CuttlefishPaste , squad, quailEgg , whiteCabbage, waterSpinach, spinach, lycosa, shrimpPaste, kingOysterMushroom, ChMei , sweetPotatoLeave ,frog, NabeyakiEggNoodles, egg , sharkPaste, wideWinterNoodles, quail,milkFish, WinterNoodles, crab, sheep, ostrich, chickenNoodles, princeNoodles, locust, mantis, mealworms, wuKuoFish, udon, tadpole]
    return foodarr[foodID-1]
}
module.exports={'Food':Food,'getFood':getFood}