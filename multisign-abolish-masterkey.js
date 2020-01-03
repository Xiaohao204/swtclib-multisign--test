var Remote = require("swtc-lib").Remote;
var remote = new Remote({ server: 'wss://ws.jingtumzs.com' })
const from = { address: 'jJRWUSb4AcpWuY1cBcHNySjiXWu5vxc2Py', secret: 'ssFVsmL197sTKMsegcyERTmMTxxVc' }

//设置废除主密钥
const tx = remote.buildAccountSetTx({
    account: from.address,
    type: 'property',
    set_flag: 4
})

remote.connectPromise()
    .then( async () => {
		await tx._setSequencePromise()
		console.log(tx.tx_json)
		let result = await tx.submitPromise(from.secret)
		console.log(result)
		remote.disconnect()
    })
    .catch(console.error)