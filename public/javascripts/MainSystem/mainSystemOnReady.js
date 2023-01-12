
let ws = null
window.onload = () => {

    try{
        ws = new WebSocket($(location).attr('href').replace("https", "wss"))
        let player = null    
        $(document).on('setPlayer',(e,data)=>{
            player=data
            let score=parseInt(localStorage.getItem('score'))
            if(score>=0)
            {
                player.setMoney(score)
            }
            localStorage.clear()
            $(".number").html(player.Level)
            player.start()
        })
        let listHtml =`
        <td id=water>
            水5$
            <br>
            <input type="button" id=water style="background-image:url('../../img/food/water.jpg');width:110px;height:110px;background-size:110px 110px" class="listBtn">
        </td>`
        $("#7 tbody").append(listHtml)
        $("#water").on('click',()=>{
            player.setMoney(-5)
            player.setTP(5)
        })
        $("#name").css("display","none")
        let id = $("#name").html()
        $("#name").html("")
        console.log("?")
        let jsonBuilder = new StringJsonBuilder(id)

        let foodListDialog=$(".mod-tab").dialog({title:'菜單',height:600,width:800,resizable:false,draggable:true,autoOpen:false});
        foodListDialog.prev(".ui-dialog-titlebar").css("background","#FFDEAD")
        foodListDialog.parent().css('padding','0em')
        foodListDialog.css("background","#FFDEAD")

        let potListDialog=$(".content2").dialog({title:'鍋內的食物',height:600,width:800,resizable:false,draggable:true,autoOpen:false});
        potListDialog.prev(".ui-dialog-titlebar").css("background","#FFDEAD")
        potListDialog.css("background","#FFDEAD")
        potListDialog.parent().css('padding','0em')

        $("#foodList").on('click',()=>{
            potListDialog.dialog('open') 
        })

        $("#buy").on('click',()=>{
            foodListDialog.dialog('open')
        })

        let foodListButtonArray = $('.tab')
        for(let i=0;i<foodListButtonArray.length;i++)
        {
            $(foodListButtonArray[i]).on('click',()=>{
                foodListButtonArray.removeClass('active')
                $(foodListButtonArray[i]).addClass('active')
                $('.panel').removeClass('active')
                $(`.content #${i+1}`).addClass('active')
            })
        }

        $(window).on('unload',(e)=>{
            
            if(player!=null)
            {   
                let game=false
                if(jsonBuilder.type=='minigame')game=true
                ws.send(jsonBuilder.
                    changeType('exit').
                    addData('value','exit').
                    addData('playerData',JSON.stringify(player)).
                    addData('isGaming',game).
                    build())
                ws.send(jsonBuilder.
                    changeType('changeOnline').
                    build())

            }

        })


        ws.onopen = () => {
            listenerStart(jsonBuilder)
            if(localStorage.getItem('valid')=='true')
            {
                ws.send(jsonBuilder.changeType('backToHotpot').build() )
                localStorage.removeItem('valid')
                alert(`你贏得了${localStorage.getItem('score')}元`)
            }
            json = jsonBuilder.changeType('getData').build()
            ws.send(json)
            ws.send(jsonBuilder.changeType('getMyFoodList').build())

         }
        
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

        $('#stealBtn').on('click',()=>{
            ws.send(jsonBuilder.changeType('steal').build())
        })

        $(".button.match").on('click',()=>{
            jsonBuilder.changeType('minigame')
            window.location.href='/minigame';
        })

        ws.onmessage = (e) => {
            let response = JSON.parse(e.data)
            let data = JSON.parse(response.data)
            $(document).trigger(response.type,data)
        }
        
    }
    catch(e){
        console.log(e)
    }
}