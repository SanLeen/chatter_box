<template>
    <div id="stage" ref="stage" class="auto-scroll">
        <div class="wedge-top"></div>
        <div v-for="(item, index) in getMsgList" :key="index">
            <message-item :item="item"></message-item>
        </div>
        <div class="wedge-bottom"></div>
    </div>
</template>

<script>
    import MessageItem from "./Message/MessageItem";

    export default {
        name: "Stage",
        components: {MessageItem},
        computed: {
            getMsgList: function () {
                return this.$store.state.msgList;
            }
        },
        watch: {
            getMsgList: function () {
                this.$nextTick(() => this.scrollIntoBottom());
            }
        },
        methods: {
            scrollIntoBottom() {
                let stageElement = document.getElementById('stage');
                stageElement.lastChild.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        }
    }
</script>

<style lang="scss" scoped>
    #stage {
        flex: 1;
        display: flex;
        flex-direction: column;

        > .wedge-top {
            flex: 1;
            margin-top: 2em;
        }

        > .wedge-bottom {
            margin-bottom: 2.5em;
        }
    }
</style>
