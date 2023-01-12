function listenerStart(jsonBuilder)
{
    let player=null
    console.log('start')
    $(document).on('errorResponse',()=>{
        alert("error")
        $(document).href('/')
    })
    $(document).on('changeOnlineResponse',(e,data)=>{
        $('#online').text(data.online)
    })
    $(document).on('talkResponse',(event,data)=>{
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
    })
    $(document).on('getDataResponse',(event,data)=>{
        console.log('get')
        if(data.success)
        {
            player=new Player(data.Name,data.ID,data.HealthyPoint,data.SatPoint,data.ThirstyPoint,data.Money,data.Level,data.Exp,data.Unlocked,ws)
            $(document).trigger('setPlayer',player)
            console.log($('.money').html(`${data.Money}$`))
            let unlocked=[]
            let foodArr = getFoodArray()
            for(let i = 0;i<foodArr.length;i++)
            {
                if(foodArr[i].level<=player.Level)
                {
                    unlocked.push(foodArr[i])
                }
            }
            for(let type=1;type<=7;type++)
            {
                let foodListHtml = ""
                for(let i = 0;i<unlocked.length;i++)
                { 
                    if(unlocked[i].type!=type)continue
                    if(i%2==0)
                    {
                        foodListHtml+="<tr>"
                    }
                    let food = unlocked[i]
                    foodListHtml+=`<td>${food.name}${food.money}$<br><input id="food${food.foodID}" type='button' style="background-image:url('../../img/food/food${food.foodID}.jpg');background-size: 100px 100px;width:100px;height:100px"><br>煮${food.needTime}秒</td>`
                    if(i%2==1)
                    {
                        foodListHtml+="</tr>"
                    }
                }
                $(`.mod-tab .content #${type} tbody`).append(foodListHtml)
                for(let i = 0;i<unlocked.length;i++)
                {
                    if(unlocked[i].type!=type)continue
                    $(`.mod-tab .content #food${i+1}`).on('click',()=>{
                        ws.send(jsonBuilder.changeType('food').
                                addData('foodid',i+1).
                                addData('playerMoney',player.Money).
                                build())
                    })
                }
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
    })
    $(document).on('getPotFoodResponse',(e,data)=>{

    })
    $(document).on('foodResponse',(e,data)=>{
        if(data.success)
        {
            player.setMoney(-data.money)
            $('.money').html(`${player.Money}$`)
        }
        else
        {
            alert("你沒錢了乞丐，去找工作賺錢。")
        }
    })
}
