
let ws = null
window.onload = () => {
    ws = new WebSocket($(location).attr('href').replace("https", "wss"))
    try{
        let player = null
        $(document).on('setPlayer',(e,data)=>{
            player=data
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
            listenerStart(jsonBuilder)
            json = jsonBuilder.changeType('getData').build()
            ws.send(json)

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

        $(".button.match").on('click',()=>{
            /*$.get("index2.html", function(html_string){
                $('head').html(html_string)
                $('body').html(html_string)
            },'html'); */

        })

        ws.onmessage = (e) => {
            let response = JSON.parse(e.data)
            let data = JSON.parse(response.data)
            console.log(response.type)
            $(document).trigger(response.type,data)
        }
        
    }
    catch(e){
        console.log(e)
    }
}