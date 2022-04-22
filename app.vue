<script setup>
const abi_ThrowMoneyFactory = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "__error_message",
				"type": "string"
			}
		],
		"name": "ErrorLog",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "__sender_address",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "__pool_address",
				"type": "address"
			}
		],
		"name": "PoolCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "getPool",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "newThrowMoneyPool",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const abi_ThrowMoneyPool = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_throwMoneyFactoryAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "__error_message",
				"type": "string"
			}
		],
		"name": "ErrorLog",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "__senderAddr",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "__reciveAddr",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "__message",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "__alias",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "__amount",
				"type": "uint256"
			}
		],
		"name": "MoneySent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "approveJpycFromContract",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_senderAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_senderAlias",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "emitMoneySent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getname",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getsymbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "jpyc",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "jpycAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_reciveAddr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_message",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_senderAlias",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "sendJpyc",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "throwMoneyFactory",
		"outputs": [
			{
				"internalType": "contract IThrowMoneyFactory",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const address = ref('')
const walletAddress = ref('')

const data = ref([])


let provider
const throwMoneyFactoryAddress = "0x85841E40736Feb76de69DDA89e05760c4aB54E28"
let throwMoneyFactoryContract
let signerPool
let PoolContract
let filter
let chatCounter = 0
let chatData

let streamerAddress
let _amountEther


async function handleSubmit  () {
    console.log('clicked!')

    provider = await ethers.getDefaultProvider("rinkeby", {etherscan: "KAAQMZSEM8PAUDKX7BP26EAEM85A7SG5G6"})
    streamerAddress = address.value
    address.value = ''
	walletAddress.value = streamerAddress

    throwMoneyFactoryContract = await new ethers.Contract(throwMoneyFactoryAddress, abi_ThrowMoneyFactory, provider)
    signerPool = await throwMoneyFactoryContract.getPool(streamerAddress)

    PoolContract = await new ethers.Contract(signerPool, abi_ThrowMoneyPool, provider)
    filter = PoolContract.filters.MoneySent(null, signerPool, null, null, null)

    PoolContract.on(filter, (_senderAddr, _reciveAddr, _message, _alias, _amount) => {
      chatCounter++
	  _amountEther = ethers.utils.formatEther(_amount)
      chatData = {
        alias: _alias,
        amount: _amountEther,
        message: _message,
      }

      data.value.push(chatData)
    })
}

</script>
<template>
  <div>
    <Html>
        <Title>OSHIサポ!</Title>
        <Meta name="description" content="Encourage people directly!"></Meta>
    </Html>
    <!-- form -->
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-item">
        <p class="form-item__label">ウォレット アドレスを入力してください</p>
        <input type="text" class="form-item__input" v-model="address" placeholder="your wallet address" required>
      </div>
      <button class="btn btn--start" id="start_chat" type="submit">
        配信スタート!
      </button>
    </form>

    <!-- content -->
    <section class="container" v-if="data">

      <div class="container__title">
        Your Wallet Address 👉  {{ walletAddress }}
      </div>

      <!-- output data -->
      <div class="content-box">

        {{ data }}

      </div>
    </section>
  </div>
</template>

<style lang="scss">
@use '@/assets/css/style';

$border-radius: 4px;
$padding: 8px;

.form {
  margin: 0 auto;
  width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
}

.form-item {
  margin-bottom: $padding;

  &__label {
    margin-bottom: $padding;
  }

  &__input {
    width: 100%;
    padding: 8px;
    border: 1px solid style.$color-secondary;
    border-radius: $border-radius;
  }
}

.btn {
  margin: 0 auto;
  background: style.$color-secondary;
  border-radius: $border-radius;
  transition: all 0.2s;
  padding: 10px 20px;
  font-size: 0.8rem;

  &--start {
    display: inline-block;
    transition: all 0.2s;

    &::before {
      content: '';
      display: inline-block;
      background-image: url(./assets/img/oshi-icon.png);
      width: 24px;
      height: 16px;
      background-size: contain;
      vertical-align: middle;

      transition: all 0.2s;
    }
  }

    &:hover {
        background-color: style.$color-accent;
    }
    &:hover::before {
      transform: translateY(-3px);
    }
}
.container {
  margin-top: 24px;

  &__title {
    text-align: center;
    margin-bottom: $padding;
  }
}

.content-box {
  background: #fafafa;
  padding: 30px 20px;
  max-width: 480px;
  min-height: 40vh;
  
}

</style>
