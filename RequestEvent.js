let loginPlayer = []
let ingame=[]
let hotpot = []
const sql = require("./routes/game").sql
const Food = require("./Food").Food
const getFood = require("./Food").getFood 
const StringJsonBuilder = require("./StringJsonBuilder")
const jsonBuilder=new StringJsonBuilder('error')
let queueID=0
//先取得火鍋資料庫的食材，為了方便就放這
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

function removeFoodFromHotpot(food)
{
    for(let i=0;i<hotpot.length;i++)
    {
        if(hotpot[i].queueID==food.queueID)
        {
            hotpot.splice(i,1)
        }
    }
}


function getData(wss,ws,data,id)
{
    console.log('trig')
    for (let i = 0; i < loginPlayer.length; i++) {
        if (loginPlayer[i] == id) {
            ws.send(jsonBuilder.
                changeType('getData').
                addData('success',false).
                build())
            return
        }
    }
    for (let i = 0; i < ingame.length; i++) {
        if (ingame[i] == id) {
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
            addData('online',loginPlayer.length+ingame.length).
            build())
    })
}

function food(wss,ws,data,id)
{
    let food = getFood(data.foodid)
    console.log(food)
    console.log(data.playerMoney)
    if(food.money<=data.playerMoney)
    {
        food.queueID=queueID
        food.startCountDown()
        food.who=id
        hotpot.push(food)
        sqlCommand = `INSERT hotpot VALUE('${queueID}',${data.foodid},${food.needTime},0,${id})`
        queueID++
        ws.send(jsonBuilder.changeType('food').
                addData('success',true).
                addData('money',food.money).
                addData('queueID',queueID).
                addData('name',food.name).
                addData('foodID',food.foodID).
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
                if(k=='ws' || k=='Name' || k=='ID' || k=='isNotStarving')continue;
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
    if(data.isGaming)
    {
        ingame.push(id)
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
    for(let i =0;i<hotpot.length;i++)
        if(hotpot[i].queueID==data.queueID)
        {
            let food = hotpot[i].eat()
            removeFoodFromHotpot(food)
            ws.send(jsonBuilder.changeType('eat').
                    addData('foodID',food.foodID).
                    build())
        }


}
function getMyFoodList(wss,ws,data,id)
{
    sqlCommand=`SELECT * FROM hotpot WHERE who=${id}`
    sql.query(sqlCommand,(err,rows)=>{
        if(err)console.log(err)
        ws.send(jsonBuilder.changeType('getMyFoodList').
                addData('food',rows).build())
    })
}
function foodTimeUpdate(wss,ws,data,id)
{
    wss.clients.forEach(client=>{
    client.send(jsonBuilder.changeType('foodTimeUpdate').
                addData('queueID',data.queueID).
                addData('nowTime',data.nowTime).
                build())
    })
}
function steal(wss,ws,data,id)
{
    if(hotpot.length==0)
    {
        ws.send(jsonBuilder.changeType('steal').
        addData('success',false).build())
        return
    }
    function getRandom(x){
        return Math.floor(Math.random()*x);
    };
    let r = getRandom(hotpot.length)
    let food = hotpot[r].eat()
    removeFoodFromHotpot(food)
    ws.send(jsonBuilder.changeType('eat').
    addData('foodID',food.foodID).
    build())
    sql.query(`SELECT * FROM user WHERE id = ${food.who}`,(err,player)=>{
        ws.send(jsonBuilder.changeType('steal').
                addData('success',true).
                addData('stealWhos',player[0]['nickname']).
                addData('stealWhat',food.name).
                build())
        wss.clients.forEach(client=>{
            client.send(jsonBuilder.changeType('getSteal').
                        addData('queueID',food.queueID)
                        .build())
        })
    })

}

function backToHotpot(wss,ws,data,id)
{
    for(let i=0;i<ingame.length;i++)
    {
        if(ingame[i]==id)
        {
            ingame.splice(i,i+1)
        }
    }
}

module.exports={
    'getData':getData,
    'changeOnline':changeOnline,
    'food':food,
    'talk':talk,
    'exit':exit,
    'report':report,
    'getPotFood':getPotFood,
    'eat':eat,
    'getMyFoodList':getMyFoodList,
    'foodTimeUpdate':foodTimeUpdate,
    'steal':steal,
    'backToHotpot':backToHotpot}