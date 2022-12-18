
let loginPlayer = []
let hotpot = []
var sql = require("./routes/login").sql
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


let foodid=0
function execute(wss, ws, req) {

    function jsonType(type){return(type+'Response')}
    try {
        let json = JSON.parse(req)
        let data = JSON.parse(json.data)
        let id = json.id

        let sqlCommand = `SELECT * FROM user WHERE id = ${id}`
        sql.query(sqlCommand,(err,rows)=>{
            if(rows.length==0)ws.send(JSON.stringify({type:jsonType('error'),data:false}))
        })
        switch (json.type) {
            case "food":{
                    let value = JSON.parse(data.value)
                    //取得sql上該玩家的資料
                    //判斷能不能買
                    //如果能買 return購買的結果
                    //ws.send(JSON.stringify({ type: 'buyFoodResponse', 'data': false }))
                    hotpot.push(new Food(value.name,foodid,value.time))
                    foodid++
                    break;
                }
            case "talk":{
                    let talkData = JSON.parse(json.data)
                    wss.clients.forEach(client => {
                        client.send(JSON.stringify({ type: jsonType('talk'), 'data': talkData.value }))
                    })
                    console.log('test')
                    break;
                }
            case "getMoney":{
                    ws.send(JSON.stringify({ type: jsonType('getMoney'), 'data': true }))
                    break;
                }
            case "getData":{
                    for (let i = 0; i < loginPlayer.length; i++) {
                        if (loginPlayer[i] == id) {
                            ws.send(JSON.stringify({ type: jsonType('getData'), 'data': ({success:false}) }))
                            return
                        }
                    }
                    loginPlayer.push(id)
                    sql.query(sqlCommand,(err,rows)=>{
                        ws.send(JSON.stringify({ type: jsonType('getData'), 'data': {success:true,name:rows[0].nickname} }))
                    })
                    break;

                }
            case "exit":{
                for(let i = 0 ;i<loginPlayer.length;i++)
                {
                    if(loginPlayer[i]==id)
                    {
                        console.log(loginPlayer)
                        loginPlayer.splice(i,i+1)
                    }
                }
            }
        }
    } catch {

    }
}
module.exports = execute