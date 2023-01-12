function listenerStart(jsonBuilder)
{
    let player=null

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
        if(data.success)
        {
            
            player=new Player(data.Name,data.ID,data.HealthyPoint,data.SatPoint,data.ThirstyPoint,data.Money,data.Level,data.Exp,data.Unlocked,ws)
            $('.money').html(`${data.Money}$`)
            $(document).trigger('setPlayer',player)
            let unlocked=[]
            let foodArr = getFoodArray()
            for(let i = 0;i<foodArr.length;i++)
            {
                if(foodArr[i].level<=player.Level)
                {
                    if(foodArr[i].type==7)foodArr[i].type=6
                    unlocked.push(foodArr[i])
                }
            }
            for(let type=1;type<=6;type++)
            {
                let foodListHtml = ""
                let count =0
                for(let i = 0;i<unlocked.length;i++)
                { 
                    if(unlocked[i].type!=type)continue
                    if(count==0)foodListHtml+='<tr>'
                    let food = unlocked[i]
                    foodListHtml+=`<td>${food.name}${food.money}$<br><input class="listBtn" id="food${food.foodID}" type='button' style="background-image:url('../../img/food/food${food.foodID}.jpg');background-size: 110px 110px;width:110px;height:110px"><br>煮${food.needTime}秒</td>`
                    count++
                    if(count==6){
                        foodListHtml+='</tr>'
                        count=0
                    }
                }
                if(count!=0)foodListHtml+='</tr>'
                $(`.mod-tab .content #${type} tbody`).append(foodListHtml)
                for(let i = 0;i<unlocked.length;i++)
                {
                    if(unlocked[i].type!=type)continue
                    $(`.mod-tab .content #food${i+1}`).on('click',()=>{
                        console.log(player.Money)
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
            if(localStorage.getItem('valid')=='true')
            {
                ws.send(jsonBuilder.changeType('backToHotpot').build())
            }
            else
            {
                window.location.href='/'
                alert("你已登入")     
            }
            localStorage.removeItem('id')
            localStorage.removeItem('valid')
        }
    })
    $(document).on('getPotFoodResponse',(e,data)=>{

    })
    $(document).on('foodResponse',(e,data)=>{
        if(data.success)
        {
            player.setMoney(-data.money)
            let listHtml =`
            <td id=potFood_td${data.queueID-1}>
                ${data.name}
                <br>
                <input type="button" id=potFood${data.queueID-1} style="background-image:url('../../img/food/food${data.foodID}.jpg');width:100px;height:100px;background-size:100px 100px" class="listBtn">
            <br>
            <p id=time${data.queueID-1}>煮了0秒</p>
            </td>`
            
            let line = $('.content2 #potTableBody tr').length
            if($(`.content2 #potTableBody #l${line} td`).length==6)
            {
                line++
                $('.content2 #potTableBody').append(`<tr id=l${line}></tr>`)
            }
            $('.content2 #potTableBody tr').last().append(listHtml)
            $(`#potFood${data.queueID-1}`).on('click',()=>{

                ws.send(jsonBuilder.changeType('eat').
                        addData('queueID',data.queueID-1).
                        build())

                let father = $(`#potFood${data.queueID-1}`).parent().parent()
                let lastEle = father
                let nextEle =father.next()
                $(`#potFood_td${data.queueID-1}`).remove()
                while(nextEle.length!=0)
                {
                    nextEle.children().first().appendTo(lastEle)
                    lastEle=nextEle
                    console.log(nextEle)
                    nextEle=nextEle.next()
                }
                if(lastEle.children().length==0)
                {
                    if(father.parent().children().length!=1)lastEle.remove()
                }
                /*$(`#potFood${data.queueID-1}`).parent().parent().last().children().first().appendTo($(`#potFood${data.queueID-1}`).parent().parent())
                $(`#potFood_td${data.queueID-1}`).remove()*/

            })
        }
        else
        {
            alert("你沒錢了乞丐，去找工作賺錢。")
        }
    })
    $(document).on('getMyFoodListResponse',(e,data)=>{
        let listHtml = '<tr id=l1>'
        let total=0
        let line=1
        for(let i =0;i<data.food.length;i++)
        {
            let foodArray=getFoodArray()
            let food = foodArray[data.food[i].foodID-1]
            listHtml+=`
                    <td id=potFood_td${data.food[i].queueID}>
                        ${food.name}
                        <br>
                        <input type="button" id=potFood${data.food[i].queueID} style="background-image:url('../../img/food/food${food.foodID}.jpg');width:100px;height:100px;background-size:100px 100px" class="listBtn">
                        <br>
                        <p id=time${data.food[i].queueID}>煮了${data.food[i].nowTime}秒</p>
                    </td>
                    <br>`
            total++
            if(total==6)
            {
                total=0
                line++
                listHtml+= `</tr><tr id=l${line}>`
            }
        }

        $('.content2 #potTableBody').append(listHtml)
        for(let i =0;i<data.food.length;i++)
        {
            $(`#potFood${data.food[i].queueID}`).on('click',()=>{
                ws.send(jsonBuilder.changeType('eat').
                addData('queueID',data.food[i].queueID).
                build())
                let father = $(`#potFood${data.food[i].queueID}`).parent().parent()
                let lastEle = father
                let nextEle =father.next()
                $(`#potFood_td${data.food[i].queueID}`).remove()
                while(nextEle.length!=0)
                {
                    nextEle.children().first().appendTo(lastEle)
                    lastEle=nextEle
                    console.log(nextEle)
                    nextEle=nextEle.next()
                }
                if(lastEle.children().length==0)
                {
                    if(father.parent().children().length!=1)lastEle.remove()
                }

                //$(`.content2 #potTableBody #l${i/6+2} td`).first().appendTo($(`.content2 #potTableBody #l${i/6+1}`))
            })
        }
    
    })
    $(document).on('foodTimeUpdateResponse',(e,data)=>{
        $(`#time${data.queueID}`).html(`煮了${data.nowTime}秒`)
        if(data.nowTime==120)$(`#potFood_td${data.queueID}`).remove()
    })

    $(document).on('eatResponse',(e,data)=>{
        let food = getFoodArray()[data.foodID-1]
        player.setHP(food.healHP)
        player.setSP(food.healSP)
    })

    $(document).on('stealResponse',(e,data)=>{
        if(data.success)alert(`你偷吃了${data.stealWhos}的${data.stealWhat}!!`)
        else alert('目前火鍋裡面沒有食物!')
    })

    $(document).on('getStealResponse',(e,data)=>{
        let father = $(`#potFood${data.queueID}`).parent().parent()
        let lastEle = father
        let nextEle =father.next()
        $(`#potFood_td${data.queueID}`).remove()
        while(nextEle.length!=0)
        {
            nextEle.children().first().appendTo(lastEle)
            lastEle=nextEle
            console.log(nextEle)
            nextEle=nextEle.next()
        }
        if(lastEle.children().length==0)
        {
            if(father.parent().children().length!=1)lastEle.remove()
        }
    })
}
