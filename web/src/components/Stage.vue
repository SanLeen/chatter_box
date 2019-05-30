<template>
    <div id="stage" ref="stage" class="auto-scroll">
        <div v-for="(item, index) in getMsgList" :key="index">
            <message-item :item="item"></message-item>
        </div>
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
                setTimeout(
                    () => this.scrollIntoBottom(),
                    100
                );
            }
        },
        methods: {
            scrollIntoBottom() {
                let stageElement = document.getElementById('stage');
                if (stageElement.childElementCount > 0) {
                    stageElement.children[stageElement.childElementCount - 1].scrollIntoView(
                        {behavior: 'smooth', block: 'start'}
                    )
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #stage {
        flex: 1;
    }
</style>
