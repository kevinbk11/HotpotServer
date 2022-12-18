let ws=null
let id=null
function jsonStringMaker(type,data)
{
    let header = JSON.stringify({'type':type,'id':id,data:data})
    return header
}
window.addEventListener('beforeunload',(e)=>{
    e.preventDefault();
    e.returnValue="hi";
})
$(window).on('unload',(e)=>{
    let data = JSON.stringify({value:'exit'})
    let json = jsonStringMaker('exit',data)
    console.log(json)
    ws.send(json)
})
window.onload = () => {
    ws = new WebSocket($(location).attr('href').replace("https", "wss"))
    id = $("#name").html()
    $("#name").html("name")
    let player = new Player("name", id, ws)

    let data = {
        
    }
    let json = JSON.stringify({
        type: "getData",
        'id':player.id,
        'data': JSON.stringify(data)
    })
    
    ws.onopen = () => {ws.send(json) }
    document.oncontextmenu = function() {
        event.returnValue = false;
    }
    document.onkeydown = function() {
        if (window.event && window.event.keyCode == 123) {
            event.keyCode = 0;
            event.returnValue = false;
        }
    }
    $("#submit").on('click', () => {
        let data = {
            value: $("#msg").val(),
        }
        data = JSON.stringify(data)
        let json = { type: 'talk','id':player.id,'data': data }
        ws.send(JSON.stringify(json))
    })
    $("#getmoney").on('click', () => {
        player.getMoney(50)
    })
    let foodButtonArray = $(".food")
    let foodId=0
    for (let i = 0; i < foodButtonArray.length; i++) {
        foodButtonArray[i].addEventListener('click', () => {
            let data = {
                type: 'food',
                'id':player.id,
                data: JSON.stringify({value:JSON.stringify({name:i,'id':foodId,time:5})})
            }
            foodId++
            ws.send(JSON.stringify(data))
        })
    }


    ws.onmessage = (e) => {
        let response = JSON.parse(e.data)

        switch (response.type) {
            case "talkResponse":
                {
                    $("#content").append(response.data + "<br>")
                    break
                }
            case "errorResponse":
                {
                    alert("error")
                    break
                }
            case "getDataResponse":
                {
                    if(response.data.success)
                    {
                        $("#name").html(response.data.name)
                    }
                    else
                    {
                        alert("你已登入")
                    }
                }
        }

    }


    /*var formData = {
        choosedate :1,
        notes :  2,
        selEmp : 3
    };
    $("#x").click(()=>{
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : window.location + "/api/notes/save",
            data : JSON.stringify(formData),
            dataType : 'json',
            success : function(customer) {
                $("#postResultDiv").html("<p>" + 
                    "Post Successfully! <br>" +
                    "==>" + JSON.stringify(customer)+ "</p>"); 
            },
            error : function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        });
        $.ajax({
			type : "GET",
			url : window.location + "/api/notes/load",
			success: function(result){
				$('#getResultDiv #getToTable').empty();
				$('#getToTable').append("<tr><th>項次</th><th>日期</th><th>工作事項</th><th>負責人員</th></tr>");
				var custList = "";
				$.each(result, function(i, customer){										
					$('#getToTable').append("<tr><td>"+"No."+i+"</td><td>"+ customer.choosedate +"</td><td>"+ customer.notes +"</td><td>"+ customer.selEmp +"</td></tr>");					
				});
				console.log("Success: ", result);
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ", e);
			}
		});	
        
    })*/

}