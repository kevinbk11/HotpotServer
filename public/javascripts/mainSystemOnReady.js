let ws=null
let id=null
let player = null
class stringJsonBuilder
{
    constructor(type)
    {
        this.type=type
        this.data={}
    }
    addData(key,value)
    {
        this.data[key]=value
        return this
    }
    build()
    {
        return JSON.stringify({type:this.type,'id':id,data:JSON.stringify(this.data)})
    }
    changeType(type)
    {
        this.type=type
        this.data={}
        return this
    }
}
let jsonBuilder = new stringJsonBuilder('')


window.addEventListener('beforeunload',(e)=>{
    e.preventDefault();
    e.returnValue="hi";
    let playerData = JSON.stringify(player)
})

$(window).on('unload',(e)=>{
    ws.send(jsonBuilder.
        changeType('exit').
        addData('value','exit').
        addData('playerData',JSON.stringify(player)).
        build())    

})

window.onload = () => {
    ws = new WebSocket($(location).attr('href').replace("https", "wss"))

    id = $("#name").html()
    $("#name").html("name")
    ws.onopen = () => {
        json = jsonBuilder.changeType('getData').build()
        ws.send(json)
     }

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
                        player=new Player(data.Name,id,data.HealthyPoint,data.SatPoint,data.ThirstyPoint,data.Money,data.Level,data.Exp,ws)
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