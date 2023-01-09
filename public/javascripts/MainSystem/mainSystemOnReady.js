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





window.onload = () => {



    try{
        
        let ws = new WebSocket($(location).attr('href').replace("https", "wss"))
        let player = null
        let id = $("#name").html()
        $("#name").css("display","none")
        let foodListDialog=$(".mod-tab").dialog({title:'菜單',height:600,width:800,resizable:false,draggable:false,autoOpen:true});
        foodListDialog.prev(".ui-dialog-titlebar").css("background","#FFDEAD")
        console.log(foodListDialog.parent().css('padding','0em'))
        foodListDialog.css("background","#FFDEAD")
        //$('.mod-tab .content #1 tbody').append("<tr><td><input type='button' style='background-image:;width:100px;height:100px;'></td><td><input type='button' style='background-image:;width:100px;height:100px;'></td></tr>")
        let jsonBuilder = new StringJsonBuilder(id)
        console.log("?")
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
            
            /*ws.send(jsonBuilder.changeType('food').
                    addData('foodid',1).build())
            setTimeout(()=>{
                ws.send(jsonBuilder.changeType('eat').
                        addData('queueID',0).build())
                    },5000)*/
         }

        $("#name").html("")

        $("#chatBox").on('keyup',(e)=>{
            if(e.key=='Enter'){
                $("#chatSubmit").trigger('click')
            }
        })
        $("#inPotListBtn").on('click',()=>{
            ws.send(jsonBuilder.changeType('getPotFood').build())
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
        $(".button.match").on('click',()=>{

            $.get("index2.html", function(html_string){
                $('head').html(html_string)
                $('body').html(html_string)
            },'html'); 
            //post($(location).attr(href))
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
                            console.log(data.name)
                            $("#content").append(`
                            <div id="${data.name}Dialog" class=dialog title="對${data.name}玩家的操作">
                                <input type="button" class=ui-button value="檢舉" id=btn1 style="width:75px">
                                <br>
                                <input type="button" class=ui-button value="公投" id=btn2 style="width:75px">
                            </div>`)
                            $(`#${data.name}Dialog`).dialog({height:150,width:200,resizable:false,draggable:false,autoOpen:false})
                            $(`#${data.name}Dialog`).append(`<div class=dialog id=${data.name}Report title="檢舉">你確定要送出檢舉嗎?</>`)
                            $(`#${data.name}Dialog #${data.name}Report`).dialog({height:200,width:400,autoOpen:false,buttons:{
                                '是':()=>{
                                    $(`#${data.name}Report`).dialog('close')
                                    ws.send(jsonBuilder.changeType('report').
                                            addData('from',player.Name).
                                            addData('to',data.name).
                                            build())
                                    alert(`已送出對${data.name}玩家的檢舉。`)

                                },
                                '否':()=>{
                                    $(`#${data.name}Report`).dialog('close')
                                },
                            }})
                            $(`#${data.name}Dialog #btn1`).on('click',()=>{
                                $(`#${data.name}Report`).dialog('open')
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

                            let foodListHtml = ""
                            let unlocked=JSON.parse(data.Unlocked)
                            for(let i = 0;i<unlocked.length;i++)
                            {
                                if(i%2==0)
                                {
                                    foodListHtml+="<tr>"
                                }
                                let food = getFood(unlocked[i])
                                foodListHtml+=`<td>${food.name}<br><input id="food${food.foodID}" type='button' style="background-image:;width:100px;height:100px"></td>`
                                if(i%2==1)
                                {
                                    foodListHtml+="</tr>"
                                }
                            }
                            $('.mod-tab .content #1 tbody').append(foodListHtml)
                            for(let i = 0;i<unlocked.length;i++)
                            {
                                $(`.mod-tab .content #food${i+1}`).on('click',()=>{
                                    ws.send(jsonBuilder.changeType('food').
                                            addData('foodid',i+1).
                                            build())
                                })
                            }
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
                        break
                    }
                case 'getPotFoodResponse':
                    {
                        for(let i=0;i<data.allFood.length;i++)
                        {
                           //$("#foodList").append(``)
                        }

                    }
            }
    
        }
    }
    catch{
    }
}