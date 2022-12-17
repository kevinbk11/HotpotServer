function execute(ws,data)
{
    try{
        let json=JSON.parse(data)
        switch(json.command)
        {
            case "buy":
            {
                ws.send("bye")
                break
            }
            default:
            {
                console.log("default")
            }
        }
    }
    catch{
        ws.send("請不要擅自發送資料")
    }
}
module.exports=execute