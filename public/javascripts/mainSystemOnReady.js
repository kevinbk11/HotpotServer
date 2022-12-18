window.onload = () => {

    let ws = new WebSocket($(location).attr('href').replace("https", "wss"))
    let hash = $("#name").html()
    let data = {
        value: "name",
        'hash': hash
    }
    let json = JSON.stringify({
        type: "getData",
        'data': JSON.stringify(data)
    })
    $("#name").html("name")
    let player = new Player("name", hash, ws)

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
            'hash': hash
        }
        data = JSON.stringify(data)
        let json = { type: 'talk', 'data': data }
        ws.send(JSON.stringify(json))
    })
    $("#getmoney").on('click', () => {
        player.getMoney(50)
    })
    let foodButtonArray = $(".food")
    for (let i = 0; i < foodButtonArray.length; i++) {
        foodButtonArray[i].addEventListener('click', () => {
            let data = {
                type: 'food',
                data: foodButtonArray[i].id
            }
            ws.send(JSON.stringify(data))
        })
    }
    ws.onopen = () => { ws.send(json) }

    ws.onmessage = (e) => {
        let response = JSON.parse(e.data)

        switch (response.type) {
            case "talkResponse":
                {
                    console.log(response.data)
                    $("#content").append(response.data + "<br>")
                    break
                }
            case "errorResponse":
                {
                    alert("請不要使用主控台。")
                    break
                }
            case "getDataResponse":
                {
                    if (!response.data) alert("你已經在某處登入了")
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