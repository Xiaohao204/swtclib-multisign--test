var Remote = require("swtc-lib").Remote;
var remote = new Remote({ server: 'wss://ws.jingtumzs.com' })
const from = { address: 'jJRWUSb4AcpWuY1cBcHNySjiXWu5vxc2Py' }
const a1 = { secret: 'shw4HnzC9d8nwF88Fu6hLzBX63Q3x', address: 'jpVGSdiFZPcU9nPQSSJtiySgVSa74YStBr' }
const a2 = { secret: 'snBbJS6FNu7aNGzJLh7h9aHk4h5zm', address: 'jM8pS4Gqi6Ba5fomRgyRbmMfq3eTvFDKNm' }
const a3 = { secret: 'shDRQpvX1o9WtVVY48ksWPKFe78RB', address: 'jf4AikypokGhNbAtYXim8XMXhCs5JRta8A' }
const log_json = object => console.log(JSON.stringify(object, '', 2))

//设置激活主密钥
const tx = remote.buildAccountSetTx({
    account: from.address,
    type: 'property',
    clear_flag: 4
})

remote.connectPromise()
    .then( async () => {
		// 设置sequence
		await tx._setSequencePromise()
		log_json(tx.tx_json)
		console.log(`需要设置足够的燃料支持多签交易tx.setFee()`)
		tx.setFee(20000)  // 燃料
		log_json(tx.tx_json)
        tx.multiSigning(a1)
        tx.multiSigning(a2)
		log_json(tx.tx_json)
        tx.multiSigned()
		log_json(tx.tx_json)
		let result = await tx.submitPromise() // multisign submit does not need any secret
		console.log(result)
		log_json(result.tx_json)
		remote.disconnect()
    })
    .catch(console.error)