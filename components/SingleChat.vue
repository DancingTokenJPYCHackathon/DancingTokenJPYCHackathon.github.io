<script setup>
import { computed } from "@vue/reactivity"
const props = defineProps(['chat'])

const emphasisType = computed({
    get () {
    let className = ""
    if (props.chat.amount >= 50000) {
        className = "emphasis4"
    } else if (props.chat.amount >=20000) {
        className = "emphasis3"
    } else if (props.chat.amount >=10000) {
        className = "emphasis2"
    } else if (props.chat.amount >=5000) {
        className = "emphasis1"
    } else if (props.chat.amount >=1000) {
        className = "emphasis0"
    }

    return className
    }
})

</script>

<template>
<Transition name="chat" appear>
<div class="chat" :class="emphasisType">
    <div class="chat-top">
    <p class="chat__alias">
        {{ chat.alias }}
    </p>
    <p class="chat__amount">
        <span class="chat__amount--text">{{ chat.amount }}</span><span class="chat__amount--sybl"> JPYC</span>
    </p>
    </div>

    <p class="chat__message">
        {{ chat.message }}
    </p>
</div>
</Transition>
</template>

<style lang="scss" scoped>
@use '@/assets/css/style';

.chat-enter-active {
    transition: all 0.3s ease-in;
}

.chat-enter-to {
    opacity: 1;
}

.chat-enter-from {
    opacity: 0;
}

.chat {
    margin-bottom: 24px;
    padding: 12px 16px 0px 16px;
    border-radius: 4px;
    
    &__alias {
        color: #555555;
        text-align: center;
        font-size: 18pt;
        padding-bottom: 4px;
    }

    &__amount {
        margin-left: 10px;
        margin-bottom: 8px;
        color: #555555;

        &--text {
            font-size: 24pt;
            font-family: monospace;
            color: style.$color-text;
        }
        &--sybl {
            font-size: 16pt;
        }
    }
    &__message {
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: 18pt;
    }

}

.chat-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

// color scheme is made by referencing here
// https://material.io/design/color/the-color-system.html#tools-for-picking-colors

// if more than 1000JPYC
.chat.emphasis0 {
    background: #E8E7FF;
    box-shadow: 2px 2px 4px rgba(28, 6, 49, 0.2);
}

// if more than 5000JPYC
.chat.emphasis1 {
    background: #B388FF;
    box-shadow: 2px 2px 4px rgba(28, 6, 49, 0.2);

    & .chat__alias {
        color: black;
    }
}

// if more than 10000JPYC
.chat.emphasis2 {
    background: #1DE9B6;
    box-shadow: 2px 2px 4px rgba(28, 6, 49, 0.2);

    & .chat__amount {
        &--text {
            font-weight: bold;
        }
    }

    & .chat__message {
        background: #A7FFEB;
        position: relative;
        width: calc(100% + 32px);
        left: -16px;
        padding: 8px 16px;
        border-radius: 0px 0px 4px 4px;
    }
}

// if more than 20000JPYC
.chat.emphasis3 {
    background: #FFA000;
    box-shadow: 2px 2px 4px rgba(28, 6, 49, 0.2);

    & .chat__alias {
        color: black;
    }

    & .chat__amount {
        &--text {
            font-weight: bold;
        }
    }

    & .chat__message {
        background: #FFC107;
        position: relative;
        width: calc(100% + 32px);
        left: -16px;
        padding: 8px 16px;
        border-radius: 0px 0px 4px 4px;
    }
}

// if more than 50000JPYC
.chat.emphasis4 {
    background: #D32F2F;
    box-shadow: 2px 2px 4px rgba(28, 6, 49, 0.2);
    color: #F5F5F5;

    & .chat__alias {
        color: #FBE9E7;
    }

    & .chat__amount {
        color: #FBE9E7;
        &--text {
            color: #FBE9E7;
            font-weight: 800;
        }
    }

    & .chat__message {
        background: #E57373;
        position: relative;
        width: calc(100% + 32px);
        left: -16px;
        padding: 8px 16px;
        border-radius: 0px 0px 4px 4px;
    }
}

</style>
