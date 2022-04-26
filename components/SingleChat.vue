<script setup>
const props = defineProps(['chat'])
</script>

<template>
<div class="chat" :class="{emphasis: chat.amount >= 100}">
    <p class="chat__alias">
        {{ chat.alias }}
    </p>

    <p class="chat__amount">
        <span class="chat__amount--text">{{ chat.amount }}</span><span class="chat__amount--sybl"> JPYC</span>
    </p>
    <p class="chat__message">
        {{ chat.message }}
    </p>
</div>
</template>

<style lang="scss" scoped>
@use '@/assets/css/style';

.chat {
    margin-bottom: 16px;
    padding: 8px 16px 0px 16px;
    border-radius: 4px;
    
    &__alias {
        display: inline-block;
        color: #555555;
        margin-right: 8px;
    }

    &__amount {
        margin-bottom: 4px;
        display: inline-block;
        color: #555555;
        float: right;

        &--text {
            font-size: 18px;
            font-family: monospace;
            color: style.$color-text;
        }
        &--sybl {
            font-size: 12px;
        }
    }
    &__message {
        padding-bottom: 8px;
    }

}

// if more than 1000JPYC
.chat.emphasis {
    background: #E8E7FF;
    box-shadow: 2px 2px 4px rgba(28, 6, 49, 0.2);

    & .chat__amount {
        &--text {
            font-weight: bold;
        }
    }
}

</style>
