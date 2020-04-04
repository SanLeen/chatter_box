<template>
    <div class="item">
        <div class="top">
            <div class="time">{{time | simpleYearDayDispLay}}</div>
        </div>
        <div class="bottom">
            <slot></slot>
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
        padding: $spacing-normal;
        padding-bottom: $spacing-big;

        > .top {
            margin: $spacing-normal 0;

            > .time {
                color: $color-shallow-gray;
                font-size: 0.8em;
                text-align: center;
            }
        }

        > .bottom {
        }
    }
</style>
