
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


window.addEventListener('beforeunload',(e)=>{
    e.preventDefault();
    e.returnValue="hi";
})



window.onload = () => {

    try{
        let ws = new WebSocket($(location).attr('href').replace("https", "wss"))
        let player = null
        let id = $("#name").html()
        let jsonBuilder = new StringJsonBuilder(id)

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
            json = jsonBuilder.changeType('getData').build()
            ws.send(json)
         }

        $("#name").html("name")

        $("#submit").on('click', () => {
            json=jsonBuilder.
            changeType('talk').
            addData('value',$("#msg").val())
            ws.send(json.build())
        })
    
        $("#getmoney").on('click', () => {
            player.setMoneyRequest(50)
        })
    
        let foodButtonArray = $(".food")
        let foodId=0
    
        for (let i = 0; i < foodButtonArray.length; i++) {
            foodButtonArray[i].addEventListener('click', () => {
                let json = jsonBuilder.
                changeType('food').
                addData('name',i).
                addData('id',foodId).
                addData('time',5).
                build()
                foodId++
                player.SatPoint++
                ws.send(json)
            })
        }
    
        ws.onmessage = (e) => {
    
            let response = JSON.parse(e.data)
            let data = JSON.parse(response.data)
            switch (response.type) {
    
                case "talkResponse":
                    {
                        $("#content").append(data.value + "<br>")
                        break
                    }
                case "errorResponse":
                    {
                        alert("error")
                        break
                    }
                case "getDataResponse":
                    {
    
                        if(data.success)
                        {
                            player=new Player(data.Name,data.ID,data.HealthyPoint,data.SatPoint,data.ThirstyPoint,data.Money,data.Level,data.Exp,data.Unlocked,ws)
                            $("#name").html(data.Name)
                        }
                        else
                        {
                            alert("你已登入")
                        }
                        break
                    }
                case 'setMoneyResponse':
                    {
                        player.setMoney(data.value)
                    }
            }
    
        }
    }
    catch{

    }

}