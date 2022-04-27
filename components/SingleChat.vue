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
<div class="chat" :class="emphasisType">
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
.chat.emphasis0 {
    background: #E8E7FF;
    box-shadow: 2px 2px 4px rgba(28, 6, 49, 0.2);
}

// if more than 5000JPYC
.chat.emphasis1 {
    background: #B388FF;
    box-shadow: 2px 2px 4px rgba(28, 6, 49, 0.2);
}

// if more than 10000JPYC
.chat.emphasis2 {
    background: #03DAC6;
    box-shadow: 2px 2px 4px rgba(28, 6, 49, 0.2);
    color: #F5F5F5;

    & .chat__alias {
        color: #F5F5F5;
    }

    & .chat__amount {
        color: #F5F5F5;
        &--text {
            color: #F5F5F5;
            font-weight: bold;
        }
    }
}

// if more than 20000JPYC
.chat.emphasis3 {
    background: #FFF176;
    box-shadow: 2px 2px 4px rgba(28, 6, 49, 0.2);

    & .chat__amount {
        &--text {
            font-weight: bold;
        }
    }
}

// if more than 50000JPYC
.chat.emphasis4 {
    background: #F44336;
    box-shadow: 2px 2px 4px rgba(28, 6, 49, 0.2);
    color: #F5F5F5;

    & .chat__alias {
        color: #F5F5F5;
    }

    & .chat__amount {
        color: #F5F5F5;
        &--text {
            color: #F5F5F5;
            font-weight: bold;
        }
    }
}

</style>
