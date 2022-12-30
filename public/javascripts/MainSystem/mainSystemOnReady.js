class StringJsonBuilder
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
function FoodArr()
{
    let cabbage = new Food(1,'高麗菜',50,60)
    let pork = new Food(2,'豬肉',80,30)
    let beef = new Food(3,'牛肉',100,15)
    let meatball = new Food(4,'貢丸',30,60)
    let goldenMushroom = new Food(5,'金針菇',40,60)
    let foodArr = [cabbage,pork,beef,meatball,goldenMushroom]
    return foodArr
}

window.addEventListener('beforeunload',(e)=>{
    e.preventDefault();
    e.returnValue="hi";
})



window.onload = () => {

    try{
        let ws = new WebSocket($(location).attr('href').replace("https", "wss"))
        let randomNumber= Math.floor(Math.random()*10000)
        let player = null
        let name = $("#name").html()

        let jsonBuilder = new StringJsonBuilder(randomNumber)

        $(window).on('unload',(e)=>{
            ws.send(jsonBuilder.
                changeType('exit').
                addData('value','exit').
                addData('playerData',JSON.stringify(player)).
                build())    
        
        })

        document.oncontextmenu = ()=> {
            window.event.returnValue = false;
        }
    
        document.onkeydown = ()=> {
            if (event.keyCode == 123) { // Prevent F12
                return false;
            } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
                return false;
            }
        }
    

        ws.onopen = () => {
            ws.send(jsonBuilder.
                changeType('set').
                addData('randomID',randomNumber).
                addData('name',name).
                build())
        
         }

        
        $("#chatBox").on('keyup',(e)=>{if(e.key=="Enter")$("#chatSubmit").click()})
        $("#chatSubmit").on('click', () => {
            let chatBox = $("#chatBox")
            if(chatBox.val()!="")
            {
                json=jsonBuilder.
                changeType('talk').
                addData('value',chatBox.val()).
                addData('player',player.Name)
                ws.send(json.build())
                chatBox.val("");
            }

        })

    
        ws.onmessage = (e) => {
    
            let response = JSON.parse(e.data)
            let data = JSON.parse(response.data)
            switch (response.type) {
                case "talkResponse":{
                        $("#content").append(data.player + ":" + data.value + "<br>")
                        break
                    }
                case "errorResponse":{
                        alert("error")
                        break
                    }
                case "getDataResponse": {
    
                        if(data.success)
                        {
                            player=new Player(data.Name,data.ID,data.HealthyPoint,data.SatPoint,data.ThirstyPoint,data.Money,data.Level,data.Exp,data.Unlocked,ws)
                        }
                        else
                        {
                            alert("你已登入")
                        }
                        break
                    }
                case 'setMoneyResponse':{
                        player.setMoney(data.value)
                    }
                case 'setResponse':{
                    jsonBuilder.id=data.id
                    json = jsonBuilder.changeType('getData').build()
                    ws.send(json)
                }
            }
    
        }
    }
    catch{

    }

}