<template>
    <div class="item">
        <div class="top">
            <slot></slot>
        </div>
        <div class="bottom">
            <div class="time">{{new Date(time).toLocaleString()}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MessageBody",
        props: {
            time: Number
        }
    }
</script>

<style lang="scss" scoped>
    .item {
        display: flex;
        flex-direction: column;
        padding: $spacing-normal*1.5 $spacing-normal;

        > .top {
        }

        > .bottom {
            margin: $spacing-normal*0.6 0 $spacing-normal 0;

            > .time {
                color: $color-shallow-gray;
                font-size: 0.8em;
                text-align: center;
            }
        }
    }
</style>
