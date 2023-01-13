const sql = require("./routes/game").sql
const StringJsonBuilder = require("./StringJsonBuilder")
const listener = require('./RequestEventListener')




const jsonBuilder=new StringJsonBuilder('error')

function execute(wss, ws, req) {

    try {

        let json = JSON.parse(req)
        let id = json.id
        let sqlCommand = `SELECT * FROM user WHERE id = ${id}`
        sql.query(sqlCommand,(err,rows)=>{
            if(rows.length==0){
                ws.send(jsonBuilder.
                addData('value',false).
                build())
            }
            else 
            {
                listener.trigger(json.type,wss,ws,json)
            }
        })
        /*switch (json.type) {
            case "food":{
                    let food = getFood(data.foodid)
                    if(food.money<=data.playerMoney)
                    {
                        food.queueID=queueID
                        food.startCountDown()
                        hotpot.push(food)
                        sqlCommand = `INSERT hotpot VALUE('${queueID}',${data.foodid},${food.needTime},0,${id})`
                        queueID++
                        ws.send(jsonBuilder.changeType('food').
                                addData('success',true).
                                addData('money',food.money).
                                build())
                        sql.query(sqlCommand)
                        sqlCommand = `UPDATE userstatus SET Money=Money-${food.money} WHERE id=${id}`
                        sql.query(sqlCommand)
                    }
                    else
                    {
                        ws.send(jsonBuilder.changeType('food').
                                addData('success',false).
                                build())
                    }
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
                            if(k!='Exp')sqlCommand+=','
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
                break
            }
            case 'eat':{
                console.log('getEat')
                hotpot[data.queueID].eat()
            }
        }*/
    } catch(e) {
        console.log(e)
    }
}
module.exports = execute