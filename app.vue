<script setup>

const address = ref('')
const walletAddress = ref('')

const data = ref([])

let streamerAddress

async function handleSubmit  () {
    console.log('clicked!')

    streamerAddress = address.value
    address.value = ''
    walletAddress.value = streamerAddress
    
    getContractEvent(streamerAddress, data)   

    // getContractEvent に渡した data の中には以下の内容が組み込まれる (以下 ./js/getContractEvent.js より引用)
    /** 
      chatData = {
        Id: chatCounter, // DOM 上でチャットの番号を管理する為の ID
        alias: _alias, // 送金者のユーザー名 
        amount: _amountEther, // 送金者が送金した額
        message: _message, // 送金者のメッセージ内容
        effect: null, // エフェクトのデータ (これはまだ未確定なので使わなくていい)
      }
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
