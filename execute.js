function execute(wss,ws,req)
{
    try{
        let json=JSON.parse(req)
        let data = JSON.parse(json.data)
        //向資料庫查找該hash
        //若查詢不到，則回傳錯誤
        if(data.hash!="hash")
        {
            ws.send(JSON.stringify({type:'errorResponse','data':false}))
            return
        }
        switch(json.type)
        {
            case "food":
            {
                //取得sql上該玩家的資料
                //判斷能不能買
                //如果能買 return購買的結果
                ws.send(JSON.stringify({type:'buyFoodResponse','data':false}))
                break;
            }
            case "talk":
            {
                let talkData=json.data
                wss.clients.forEach(client=>{
                    client.send(JSON.stringify({type:'talkResponse','data':talkData}))
                })
                console.log('test')
                break;
            }
            case "getMoney":
            {
                ws.send(JSON.stringify({type:'geyMoneyResponse','data':true}))
                break;
            }
        }

        console.log(json)
    }
    catch{

    }
}
module.exports=execute