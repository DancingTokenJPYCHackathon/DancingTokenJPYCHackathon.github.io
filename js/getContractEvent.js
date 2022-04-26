const throwMoneyFactoryAddress = "0x6d837f431d7592F36e4b3146256eB301D017af4a"

let throwMoneyFactoryContract
let signerPool
let PoolContract
let filter
let chatCounter = 0
let chatData

let streamerAddress
let _amountEther

async function getContractEvent (_streamerAddress, _data) {
    provider = await ethers.getDefaultProvider("rinkeby", {etherscan: "KAAQMZSEM8PAUDKX7BP26EAEM85A7SG5G6"})

    throwMoneyFactoryContract = await new ethers.Contract(throwMoneyFactoryAddress, abi_ThrowMoneyFactory, provider)
    signerPool = await throwMoneyFactoryContract.getPool(_streamerAddress)

    PoolContract = await new ethers.Contract(signerPool, abi_ThrowMoneyPool, provider)
    filter = PoolContract.filters.MoneySent(null, signerPool, null, null, null)

    PoolContract.on(filter, (_senderAddr, _reciveAddr, _message, _alias, _amount) => {
      chatCounter++
      _amountEther = Math.round(ethers.utils.formatEther(_amount))
      chatData = {
        Id: chatCounter,
        alias: _alias,
        amount: _amountEther,
        message: _message,
        effect: null,
      }

      _data.value.push(chatData)
    })
}
