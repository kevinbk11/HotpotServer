class Food
{
    constructor(name,money,level,needTime,exp,healHP,healSP,minusHP,dieTime,foodID)
    {
        this.name=name
        this.money=money
        this.level=level
        this.needTime=needTime
        this.exp=exp
        this.healHP=healHP
        this.healSP=healSP
        this.minusHP=minusHP
        this.dieTime=dieTime
        this.foodID=foodID
    }
}
function getFood(foodID)
{
    let porkSlices = new Food('豬肉片',10,1,15,1,5,2,1,120,1)
    let beefSlices = new Food('牛肉片',15,1,15,1,6,1,1,120,2)
    let shrimp = new Food('蝦子',10,1,15,1,5,1,1,120,3)
    let clams = new Food('蛤俐',10,1,30,1,5,1,1,120,4)
    let friedTofuSkin = new Food('炸豆皮',5,1,30,1,5,2,1,120,5)
    let frozenTofu = new Food('凍豆腐',5,1,40,1,5,1,1,120,6)
    let Yendumpling = new Food('燕餃',5,1,42,1,5,1,1,120,7)
    let kamaboko = new Food('魚板',5,1,43,1,5,1,1,120,8)
    let goldMushroom = new Food('金針菇',10,1,52,1,5,2,1,120,9)
    let mushroom = new Food('香菇',5,1,54,1,5,1,1,120,10)
    let cabbage = new Food('高麗菜',10,1,40,1,5,2,1,120,11)
    let fishdumpling = new Food('魚餃',5,2,40,2,6,1,1,120,12)
    let meatBalls = new Food('貢丸',10,3,44,2,5,1,1,120,13)
    let crabStick = new Food('蟳味棒',5,4,32,2,5,1,1,120,14)
    let drumstick = new Food('雞腿肉',15,5,51,2,5,1,1,120,15)
    let CuttlefishAndShrimpPaste = new Food('花枝蝦漿',10,6,56,1,5,1,1,120,16)
    let pigBloodCake = new Food('米血糕',10,7,49,1,5,1,1,120,17)
    let eggdumpling = new Food('蛋餃',5,8,53,1,5,1,1,120,18)
    let smallfishball = new Food('小魚丸',10,9,26,1,5,1,1,120,19)
    let Crocodile = new Food('鱷魚肉',20,10,28,1,5,1,1,120,20)
    let quadOilTofu = new Food('四角油豆腐',10,11,27,1,5,1,1,120,21)
    let fishTofu = new Food('魚豆腐',5,12,37,1,5,1,1,120,22)
    let goldenFishBall = new Food('黃金魚丸',5,13,36,1,5,1,1,120,23)
    let CuttlefishPaste = new Food('花枝漿',5,14,14,1,5,1,1,120,24)
    let squad = new Food('魷魚',20,15,20,1,5,1,1,120,25)
    let quailEgg = new Food('鵪鶉蛋',5,16,31,1,5,1,1,120,26)
    let whiteCabbage = new Food('小白菜',10,17,22,1,5,1,1,120,27)
    let waterSpinach = new Food('空心菜',10,18,34,1,5,1,1,120,28)
    let spinach = new Food('菠菜',10,19,26,1,5,1,1,120,29)
    let lycosa = new Food('狼蛛',50,20,37,1,5,1,1,120,30)
    let shrimpPaste = new Food('蝦仁漿',10,21,23,1,5,1,1,120,31)
    let kingOysterMushroom = new Food('杏鮑菇',10,22,33,1,5,1,1,120,32)
    let ChMei = new Food('大陸妹',10,23,41,1,5,1,1,120,33)
    let sweetPotatoLeave = new Food('地瓜葉',10,24,42,1,5,1,1,120,34)
    let frog = new Food('青蛙肉',30,25,44,1,5,1,1,120,35)
    let NabeyakiEggNoodles  = new Food('鍋燒意麵',10,26,29,1,5,1,1,120,36)
    let egg = new Food('雞蛋',10,27,31,1,5,1,1,120,37)
    let sharkPaste = new Food('鯊魚漿',10,28,26,1,5,1,1,120,38)
    let wideWinterNoodles = new Food('寬冬粉',10,29,16,1,5,1,1,120,39)
    let quail = new Food('鵪鶉',30,30,50,1,5,1,1,120,40)
    let milkFish = new Food('虱目魚',20,31,30,1,5,1,1,120,41)
    let WinterNoodles = new Food('冬粉',10,32,48,1,5,1,1,120,42)
    let crab = new Food('螃蟹',30,33,42,1,5,1,1,120,43)
    let sheep = new Food('羊肉',15,34,34,1,5,1,1,120,44)
    let ostrich = new Food('鴕鳥肉',30,35,31,1,5,1,1,120,45)
    let chickenNoodles = new Food('雞絲麵',10,36,39,1,5,1,1,120,46)
    let princeNoodles = new Food('王子麵',10,37,26,1,5,1,1,120,47)
    let locust = new Food('蝗蟲',15,38,27,1,5,1,1,120,48)
    let mantis = new Food('螳螂',10,39,25,1,5,1,1,120,49)
    let mealworms = new Food('麵包蟲',5,40,18,1,5,1,1,120,50)
    let wuKuoFish = new Food('吳郭魚',30,41,45,1,5,1,1,120,51)
    let udon = new Food('讚崎烏龍麵',20,42,46,1,5,1,1,120,52)
    let tadpole = new Food('蝌蚪',20,43,35,1,5,1,1,120,53)
    
    let foodarr = [porkSlices, beefSlices, shrimp, clams, friedTofuSkin, frozenTofu, Yendumpling, kamaboko, goldMushroom, mushroom, cabbage, fishdumpling, meatBalls, crabStick, drumstick , CuttlefishAndShrimpPaste, pigBloodCake, eggdumpling, smallfishball, Crocodile, quadOilTofu, fishTofu, goldenFishBall, CuttlefishPaste , squad, quailEgg , whiteCabbage, waterSpinach, spinach, lycosa, shrimpPaste, kingOysterMushroom, ChMei , sweetPotatoLeave ,frog, NabeyakiEggNoodles, egg , sharkPaste, wideWinterNoodles, quail,milkFish, WinterNoodles, crab, sheep, ostrich, chickenNoodles, princeNoodles, locust, mantis, mealworms, wuKuoFish, udon, tadpole]
    return foodarr[foodID-1]
}