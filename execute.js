


let loginPlayer = []
let hotpot = []
class Food
{
    constructor(name,id,time)
    {
        this.name=name
        this.id=id
        this.time=time
        this.startCountDown()  
    }
    async startCountDown()
    {
        let p = new Promise(sol=>{
            let id = setInterval(()=>{
                console.log(`${this.name+":"+this.id}:${--this.time}`)
                if(this.time==0){
                    clearInterval(id)
                    sol("end")
                }
            },1000)
        })
        p.then(()=>{
            hotpot.shift()
            console.log(hotpot)
        })
    }
}
function execute(wss, ws, req) {
    function jsonType(type){return(type+'Response')}
    try {
        let json = JSON.parse(req)
        let data = JSON.parse(json.data)
        console.log(json.hash)
        if (json.hash != "hash") {
            ws.send(JSON.stringify({ type: jsonType('error'), 'data': false }))
            return
        }
        switch (json.type) {
            case "food":
                {
                    let value = JSON.parse(data.value)
                    //取得sql上該玩家的資料
                    //判斷能不能買
                    //如果能買 return購買的結果
                    //ws.send(JSON.stringify({ type: 'buyFoodResponse', 'data': false }))
                    hotpot.push(new Food(value.name,value.id,value.time))
                    break;
                }
            case "talk":
                {
                    let talkData = JSON.parse(json.data)
                    wss.clients.forEach(client => {
                        client.send(JSON.stringify({ type: jsonType('talk'), 'data': talkData.value }))
                    })
                    console.log('test')
                    break;
                }
            case "getMoney":
                {
                    ws.send(JSON.stringify({ type: jsonType('getMoney'), 'data': true }))
                    break;
                }
            case "getData":
                {
                    for (let i = 0; i < loginPlayer.length; i++) {
                        if (loginPlayer[i] == data.hash) {
                            ws.send(JSON.stringify({ type: jsonType('getData'), 'data': false }))
                            return
                        }
                    }
                    console.log("hi")
                    loginPlayer.push(data.hash)
                    ws.send(JSON.stringify({ type: jsonType('getData'), 'data': true }))

                }
        }

        console.log(json)
    } catch {

    }
}
module.exports = execute