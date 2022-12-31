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
        let player = null
        let id = $("#name").html()
        let jsonBuilder = new StringJsonBuilder(id)

        $(window).on('unload',(e)=>{
            ws.send(jsonBuilder.
                changeType('exit').
                addData('value','exit').
                addData('playerData',JSON.stringify(player)).
                build())
            ws.send(jsonBuilder.
                changeType('changeOnline').
                build())
        
        })


        ws.onopen = () => {
            json = jsonBuilder.changeType('getData').build()
            ws.send(json)

         }

        $("#name").html("name")

        $("#chatBox").on('keyup',(e)=>{
            if(e.key=='Enter'){
                $("#chatSubmit").trigger('click')
            }
        })


        $("#chatSubmit").on('click', () => {
            let chatBox = $("#chatBox")
            if(chatBox.val()!="")
            {
                json=jsonBuilder.
                changeType('talk').
                addData('value',chatBox.val()).
                addData('name',player.Name)
                ws.send(json.build())
                chatBox.val("")
            }

        })

    
        ws.onmessage = (e) => {
    
            let response = JSON.parse(e.data)
            let data = JSON.parse(response.data)
            switch (response.type) {
                case "talkResponse":
                    {
                        $("#content").append(`<a class=${data.name} style="color:#3366BB;margin:0px 0px 0px 15px">${data.name}</a>`)
                        $("#content").append(`<a>:${data.value}<a><br>`)
                        

                        if($(`.${data.name}`).length==1)
                        {
                            $("#content").append(`
                            <div id="${data.name}Dialog" class=dialog title="對${data.name}玩家的操作">
                                <input type="button" class=ui-button value="檢舉" id=btn1 style="width:75px">
                                <br>
                                <input type="button" class=ui-button value="公投" id=btn2 style="width:75px">
                            </div>`)
                            $(`#${data.name}Dialog`).dialog({height:150,width:200,resizable:false,draggable:false,autoOpen:false})
                            $(`#${data.name}Dialog`).append(`<div class=dialog id=report title="檢舉">你確定要送出檢舉嗎?</>`)
                            $(`#${data.name}Dialog #report`).dialog({height:200,width:400,autoOpen:false,buttons:{
                                '是':()=>{
                                    alert(`已送出對${data.name}玩家的檢舉。`)
                                    $("#report").dialog('close')
                                },
                                '否':()=>{
                                    $("#report").dialog('close')
                                },
                            }})
                            $(`#${data.name}Dialog #btn1`).on('click',()=>{
                                $("#report").dialog('open')
                            })
                        }
                        $(`.${data.name}`).last().on('click',(e)=>{
                            $(".dialog").dialog('close')
                            $(`#${data.name}Dialog`).dialog('open')
                            $(`#${data.name}Dialog`).dialog("option","position",{ my: "left top", at: "left bottom", of: e})
                           
                        })
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
                            ws.send(jsonBuilder.
                                changeType('changeOnline').
                                build())
                        }
                        else
                        {
                            alert("你已登入")
                            window.location.href='/'
                        }
                        break
                    }
                case 'setMoneyResponse':
                    {
                        player.setMoney(data.value)
                        break;
                    }
                case 'changeOnlineResponse':
                    {
                        $('#online').text(data.online)
                    }
            }
    
        }
    }
    catch{

    }

}
