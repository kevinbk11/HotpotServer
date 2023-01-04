let loginPlayer = []
let hotpot = []
var sql = require("./routes/game").sql
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
                this.time--
                if(this.time==0){
                    sql.query(`DELETE FROM hotpot WHERE id = ${this.id}`)
                    clearInterval(id)
                    sol("end")
                }
            },1000)
        })
    }

}

let foodid=0
setInterval(()=>{

    for(let index=0;index<hotpot.length;index++)
    {
        if(hotpot[index]!=null){
            if(hotpot[index].time==0)delete hotpot[index]
            else{
                //console.log(`${hotpot[index].time}:${hotpot[index].id}`)
                sql.query(`UPDATE hotpot SET time = ${hotpot[index].time} WHERE id = ${hotpot[index].id}`)
            } 
        }
    }

},1000)
function jsonType(type){return(type+'Response')}
class stringJsonBuilder
{
    constructor(type)
    {
        this.type=jsonType(type)
        this.data={}
    }
    addData(key,value)
    {
        this.data[key]=value
        return this
    }
    build()
    {
        return JSON.stringify({type:this.type,data:JSON.stringify(this.data)})
    }
    changeType(type)
    {
        this.type=jsonType(type)
        this.data={}
        return this
    }
}
function execute(wss, ws, req) {
    try {

        let jsonBuilder=new stringJsonBuilder('error')
        let json = JSON.parse(req)
        let data = JSON.parse(json.data)
        let id = json.id

        let sqlCommand = `SELECT * FROM user WHERE id = ${id}`
        sql.query(sqlCommand,(err,rows)=>{
            if(rows.length==0){ws.send(jsonBuilder.
                addData('value',false).
                build())
            }
        })
        switch (json.type) {
            case "food":{
                    let food = new Food(data.name,foodid,data.time)
                    hotpot.push(food)
                    sqlCommand = `INSERT hotpot VALUE('${data.name}',${foodid},${data.time})`
                    sql.query(sqlCommand,(err,rows)=>{})
                    foodid++
                    break;
                }
            case "talk":{
                    let talkData = JSON.parse(json.data)
                    wss.clients.forEach(client => {
                        
                        client.send(jsonBuilder.
                            changeType('talk').
                            addData('value',talkData.value).
                            addData('name',talkData.name).
                            build()) 
                    })
                    break;
                }
            case "setMoney":{
                    sqlCommand = `UPDATE userstatus SET Money = Money + ${data.value} WHERE id = ${id};`
                    sql.query(sqlCommand,(err,rows)=>{})
                    ws.send(jsonBuilder.
                        changeType('setMoney').
                        addData('value',data.value).
                        build())
                    break;
                }
            case "getData":{
                    for (let i = 0; i < loginPlayer.length; i++) {
                        if (loginPlayer[i] == id) {
                            loginPlayer.push(id)
                            ws.send(jsonBuilder.
                                changeType('getData').
                                addData('success',false).
                                build())
                            return
                        }
                    }
                    loginPlayer.push(id)
                    sqlCommand = `SELECT * FROM userstatus WHERE id = ${id}`
                    sql.query(sqlCommand,(err,rows)=>{
                        jsonBuilder.changeType('getData').addData('success',true)
                        for(k in rows[0])
                        {
                            jsonBuilder.addData(k,rows[0][k])
                        }
                        json = jsonBuilder.build()
                        ws.send(json)
                    })
                    break;

                }
            case "exit":{
                for(let i = 0 ;i<loginPlayer.length;i++)
                {
                    if(loginPlayer[i]==id)
                    {
                        loginPlayer.splice(i,i+1)
                        player = JSON.parse(data.playerData)
                        sqlCommand = `UPDATE userstatus SET `
                        for(k in player)
                        {
                            if(k=='ws' || k=='Name' || k=='ID')continue;
                            sqlCommand+=(`${k}='${player[k]}'`)
                            if(k!='Unlocked')sqlCommand+=','
                            else sqlCommand+=" "
                        }
                        sqlCommand+=`WHERE ID = ${player.ID}`
                        sql.query(sqlCommand,(err,rows)=>{
                            if(err)console.log(err)

                        })
                    }
                }
                break
            }
            case "changeOnline":{
                console.log(loginPlayer)
                wss.clients.forEach(client=>{
                    client.send(jsonBuilder.
                        changeType('changeOnline').
                        addData('online',loginPlayer.length).
                        build())
                })
                break
            }
            case "report":{
                console.log(data.from+":"+data.to)
                break
            }
            case "getPotFood":{
                sqlCommand="SELECT * FROM hotpot"
                sql.query(sqlCommand,(err,rows)=>{
                    if(err)console.log(err)
                    ws.send(jsonBuilder.changeType('getPotFood').
                            addData('allFood',rows).build())
                })
            }
        }
    } catch(e) {
        console.log(e)
    }
}
module.exports = execute