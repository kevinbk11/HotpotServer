let loginPlayer = []
let hotpot = []
const sql = require("./routes/game").sql
const Food = require("./Food").Food
const getFood = require("./Food").getFood 
const StringJsonBuilder = require("./StringJsonBuilder")
const jsonBuilder=new StringJsonBuilder('error')
let queueID=0

sqlCommand='SELECT * FROM hotpot'
sql.query(sqlCommand,(err,rows)=>{
    for(let i = 0;i<rows.length;i++)
    {
        let foodID = rows[i].foodID
        let food=getFood(foodID)
        food.queueID=rows[i].queueID
        food.nowTime=rows[i].nowTime
        food.who=rows[i].who
        food.startCountDown()
        hotpot.push(food)
        if(rows[i].queueID>=queueID)queueID=rows[i].queueID+1
    }
})


function getData(wss,ws,data,id)
{
    console.log('trig')
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
}

function changeOnline(wss,ws,data,id)
{
    wss.clients.forEach(client=>{
        client.send(jsonBuilder.
            changeType('changeOnline').
            addData('online',loginPlayer.length).
            build())
    })
}

function food(wss,ws,data,id)
{
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
}

function talk(wss,ws,data,id)
{
    let talkData = data
    wss.clients.forEach(client => {
        
        client.send(jsonBuilder.
            changeType('talk').
            addData('value',talkData.value).
            addData('name',talkData.name).
            build()) 
    })
}

function exit(wss,ws,data,id)
{
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
}

function report(wss,ws,data,id)
{
    console.log(data.from+":"+data.to)
}

function getPotFood(wss,ws,data,id)
{
    sqlCommand="SELECT * FROM hotpot"
    sql.query(sqlCommand,(err,rows)=>{
        if(err)console.log(err)
        ws.send(jsonBuilder.changeType('getPotFood').
                addData('allFood',rows).build())
    })
}

function eat(wss,ws,data,id)
{
    console.log('getEat')
    hotpot[data.queueID].eat()
}

module.exports={'getData':getData,'changeOnline':changeOnline,'food':food,'talk':talk,'exit':exit,'report':report,'getPotFood':getPotFood,'eat':eat}