<script setup>
//import { watch } from 'vue'

const address = ref('')
const walletAddress = ref('')
const isButtonDisabled = ref(false)
const isVisible = ref(true)

const data = ref([])

let streamerAddress

watch(() => data.value.length, () => {
  console.log("called function!")
  var container = document.querySelector(".content-box");
  if(container !== null){
    var scrollHeight = container.scrollHeight;
    container.scrollTop = scrollHeight;
    console.log(`scrollHeight is ${ scrollHeight }`)
  }
}, {flush: 'post'})

async function handleSubmit  () {
    console.log('clicked!')

    streamerAddress = address.value
    address.value = ''
    walletAddress.value = streamerAddress
    
    try {
      getContractEvent(streamerAddress, data)
      isVisible.value = false
    } catch (_error) {
      console.log(_error)
      console.log("配信開始に失敗しました、入力したウオレット アドレスが正しいか確認してください")
    }

    // getContractEvent に渡した data の中には以下の内容が組み込まれる (以下 ./js/getContractEvent.js より引用)
    /** 
      chatData = {
        Id: chatCounter, // DOM 上でチャットの番号を管理する為の ID
        alias: _alias, // 送金者のユーザー名 
        amount: _amountEther, // 送金者が送金した額
        chat: _chat, // 送金者のメッセージ内容
        effect: null, // エフェクトのデータ (これはまだ未確定なので使わなくていい)
      }
    **/
  isButtonDisabled.value = true

// 👇ダミーデータ
// dataに値がプッシュされればそれがreactiveに画面に反映されるはず
/**
  let dummyData = [
    {"Id":"id1", "alias": "akie", "amount": 100, "message": "Looooooooooove your streaming"},
    {"Id":"id2", "alias": "akie", "amount": 1000, "message": "Looooooooooove your streaming"},
    {"Id":"id3", "alias": "akie", "amount": 5000, "message": "Looooooooooove your streaming"},
    {"Id":"id4", "alias": "akie", "amount": 10000, "message": "Looooooooooove your streaming"},
    {"Id":"id5", "alias": "shohei", "amount": 20000, "message": "Wonderful streaming!!"},
    {"Id":"id6", "alias": "shohei", "amount": 50000, "message": "Wonderful streaming!!"},
    {"Id":"id7", "alias": "shohei", "amount": 15000, "message": "Wonderful streaming!!"},
    {"Id":"id8", "alias": "shohei", "amount": 30000, "message": "Wonderful streaming!!"},
    {"Id":"id9", "alias": "shohei", "amount": 6000, "message": "Wonderful streaming!!"},
    {"Id":"id10", "alias": "shohei", "amount": 3000, "message": "Wonderful streaming!!"}
  ]

  dummyData.forEach(_pushData => {
    data.value.push(_pushData)
  });
**/
   
}

</script>
<template>
  <div>
    <Html>
        <Title>OSHIサポ!</Title>
        <Meta name="description" content="Encourage people directly!"></Meta>
    </Html>
    <!-- form -->
    <form class="form" @submit.prevent="handleSubmit" v-show="isVisible">
      <div class="form-item">
        <p class="form-item__label">ウォレット アドレスを入力してください</p>
        <input type="text" class="form-item__input" v-model="address" placeholder="your wallet address" required>
      </div>
      <button :disabled="isButtonDisabled" class="btn btn--start" id="start_chat" type="submit">
        配信スタート!
      </button>
    </form>

    <!-- content -->
    <section class="container" v-show="!isVisible">

      <div class="container__title">
        👇 Live Chat
      </div>


      <!-- output data -->
      <div class="content-box" >
        <SingleChat v-for="chat in data" :key="chat.Id" :chat="chat"/>
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
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
}

.form-item {
  width: 100%;
  text-align: center;
  margin: auto;
  margin-bottom: $padding;

  &__label {
    margin-bottom: $padding;
  }

  &__input {
    width: 80%;
    padding: 8px;
    border: 1px solid style.$color-secondary;
    border-radius: $border-radius;
  }
}

.btn {
  margin: 0 auto;
  border: 1px solid style.$color-secondary;
  border-radius: $border-radius;
  transition: all 0.2s;
  padding: 10px 20px;
  font-size: 0.8rem;

  &--start {
    display: inline-block;
    width: 80%;
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
        border: 1px solid style.$color-accent;
    }
    &:hover::before {
      transform: translateY(-3px);
    }
}
.container {
  background: #fafafa;
  margin-top: 24px;
  bottom: 0px !important;
  right: 0px !important;
  position: fixed !important;
  border-radius: 8px 0 0 0;

  &__title {
    text-align: center;
    margin: $padding;
    font-size: 18px;

  }
}

.content-box {
  padding: 20px 20px;
  min-width: 400px;
  width: 30vw;
  height: 50vh;
  min-height: 300px;
  border-radius: 4px;
  overflow-y: scroll;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
}

</style>
