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
    var element = new Image;
    var devtoolsOpen = false;
    element.__defineGetter__("id", function() {
        devtoolsOpen = true; // This only executes when devtools is open.
    });
    setInterval(function() {
        devtoolsOpen = false;
        console.log(element);
        if (devtoolsOpen == true) {
            console.log("hi")
        } // else here if you like to see if dev tools are not open
    }, 1000);
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
    
        document.onkeydown = (e)=> {
            if (e.key == 'F12' || e.key=='F10' ||e.ctrlKey||e.shiftKey||e.key=='I') {
                return false;
        }}
    

        ws.onopen = () => {
            json = jsonBuilder.changeType('getData').build()
            ws.send(json)
         }

        $("#name").html("name")

        $("#chatSubmit").on('click', () => {
            json=jsonBuilder.
            changeType('talk').
            addData('value',$("#chatBox").val())
            ws.send(json.build())
        })

    
        ws.onmessage = (e) => {
    
            let response = JSON.parse(e.data)
            let data = JSON.parse(response.data)
            switch (response.type) {
                case "talkResponse":
                    {
                        $("#content").append(player.Name + ":" + data.value + "<br>")
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
                            $("#name").css("display","block")
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
