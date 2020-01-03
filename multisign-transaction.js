var Remote = require("swtc-lib").Remote;
var remote = new Remote({ server: 'wss://ws.jingtumzs.com' })
const from = { address: 'jJRWUSb4AcpWuY1cBcHNySjiXWu5vxc2Py' }
const a1 = { secret: 'shw4HnzC9d8nwF88Fu6hLzBX63Q3x', address: 'jpVGSdiFZPcU9nPQSSJtiySgVSa74YStBr' }
const a2 = { secret: 'snBbJS6FNu7aNGzJLh7h9aHk4h5zm', address: 'jM8pS4Gqi6Ba5fomRgyRbmMfq3eTvFDKNm' }
const a3 = { secret: 'shDRQpvX1o9WtVVY48ksWPKFe78RB', address: 'jf4AikypokGhNbAtYXim8XMXhCs5JRta8A' }

let to = 'jPWMW47mvE9io8bs22eBhMADgAD88upzCX'

// 设置多签名转账
remote.connectPromise()
    .then(async () => {

        // 创建支付交易
        let tx = remote.buildPaymentTx({ account: from.address, to, amount: remote.makeAmount(1) })
        tx.addMemo('multisigned payment test')

        // 设置sequence
        await tx._setSequencePromise()
        console.log(`需要设置足够的燃料支持多签交易tx.setFee()`)

        tx.setFee(19999) // 燃料
        console.log("设置交易数据: ", JSON.stringify(tx.tx_json, null, 2))

        tx = tx.multiSigning(a1)
        console.log("首次签名后数据: ", JSON.stringify(tx.tx_json, null, 2))

        // tx.tx_json 需要依次传递给不同的多签方
        let tx_json = tx.tx_json
        // 然后重组成tx
        let tx2 = remote.buildMultisignedTx(tx_json)

        // tx.setFee(100) // 燃料
        tx2.multiSigning(a2)
        console.log("第二次签名后数据: ", JSON.stringify(tx2.tx_json, null, 2))

        tx2.multiSigned()
        console.log("签名完成后数据: ", JSON.stringify(tx2.tx_json, null, 2))

        let result = await tx2.submitPromise() // multisign submit does not need any secret
        console.log("交易结果: ", JSON.stringify(result, null, 2))

        remote.disconnect()
    }).catch(error => {
        console.log(error)
    })