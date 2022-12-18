function execute(ws, data) {
    try {
        let json = JSON.parse(data)
        switch (json.command) {
            case "buy":
                {
                    //取得sql上該玩家的資料
                    break
                }
            default:
                {
                    console.log("default")
                }
        }
    } catch {

    }
}
module.exports = execute