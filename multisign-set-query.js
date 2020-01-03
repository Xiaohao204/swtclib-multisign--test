const Remote = require("swtc-lib").Remote

let remote = new Remote({
    server: 'wss://ws.jingtumzs.com'
})


// 测试设置多签列表和查询
remote.connectPromise()
    .then(async (server_info) => {
        console.log(server_info)
        let data = {
            account: "jJRWUSb4AcpWuY1cBcHNySjiXWu5vxc2Py",
            threshold: 4,
            lists: [{
                account: "jpVGSdiFZPcU9nPQSSJtiySgVSa74YStBr",
                weight: 3
            }, {
                account: "jM8pS4Gqi6Ba5fomRgyRbmMfq3eTvFDKNm",
                weight: 1
            }, {
                account: "jf4AikypokGhNbAtYXim8XMXhCs5JRta8A",
                weight: 2
            }]
        }
        let secret = "ssFVsmL197sTKMsegcyERTmMTxxVc"

        let tx = remote.buildSignerListTx(data)
        console.log("设置数据: ", JSON.stringify(tx.tx_json, null, 2))

        let result = await tx.submitPromise(secret)
        console.log("设置结果: ", JSON.stringify(result, null, 2))

        let request = remote.requestSignerList({ account: "jJRWUSb4AcpWuY1cBcHNySjiXWu5vxc2Py" })
        let result1 = await request.submitPromise()
        console.log("查询结果:", JSON.stringify(result1, null, 2))

        remote.disconnect()
    })
    .catch((error) => console.error("error: ", error))