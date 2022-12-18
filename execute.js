let loginPlayer = []

function execute(wss, ws, req) {
    try {
        let json = JSON.parse(req)
        let data = JSON.parse(json.data)
            //向資料庫查找該hash
            //若查詢不到，則回傳錯誤
        if (data.hash != "hash") {
            ws.send(JSON.stringify({ type: 'errorResponse', 'data': false }))
            return
        }
        switch (json.type) {
            case "food":
                {
                    //取得sql上該玩家的資料
                    //判斷能不能買
                    //如果能買 return購買的結果
                    ws.send(JSON.stringify({ type: 'buyFoodResponse', 'data': false }))
                    break;
                }
            case "talk":
                {
                    let talkData = JSON.parse(json.data)
                    wss.clients.forEach(client => {
                        client.send(JSON.stringify({ type: 'talkResponse', 'data': talkData.value }))
                    })
                    console.log('test')
                    break;
                }
            case "getMoney":
                {
                    ws.send(JSON.stringify({ type: 'geyMoneyResponse', 'data': true }))
                    break;
                }
            case "getData":
                {
                    console.log(loginPlayer)
                    console.log(data.hash)
                    console.log("---")

                    for (let i = 0; i < loginPlayer.length; i++) {

                        if (loginPlayer[i] == data.hash) {
                            ws.send(JSON.stringify({ type: json.type + 'Response', 'data': false }))
                            return
                        }
                    }
                    console.log("hi")
                    loginPlayer.push(data.hash)
                    ws.send(JSON.stringify({ type: json.type + 'Response', 'data': true }))

                }
        }

        console.log(json)
    } catch {

    }
}
module.exports = execute