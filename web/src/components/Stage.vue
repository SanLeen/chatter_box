<template>
    <div id="stage" ref="stage" class="auto-scroll">
        <div class="item" v-for="(item, index) in getMsgList" :key="index">
            <div class="top">
                <div class="message"
                     v-if="item.flag === messageFlag.MESSAGE"
                     :style="{flexDirection:item.self?'row-reverse':'row'}">
                    <div class="avatar">{{item.avatar}}</div>
                    <div class="divider"></div>
                    <div class="content">
                        <div class="host-address" :style="{textAlign:item.self?'right':'left'}">
                            {{item.hostAddress}}
                        </div>
                        <div class="message" :style="{flexDirection:item.self?'row-reverse':'row'}">
                            <div class="text">{{item.content}}</div>
                        </div>
                    </div>
                    <div class="divider"></div>
                    <div class="avatar fake-avatar"></div>
                </div>
                <div class="notification"
                     v-if="item.flag === messageFlag.NOTIFICATION">
                    {{item.content}}
                </div>
            </div>
            <div class="bottom">
                <div class="time">{{new Date(item.time).toLocaleString()}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import MessageFlag from "../util/MessageFlag";

    export default {
        name: "Stage",
        computed: {
            getMsgList: function () {
                return this.$store.state.msgList;
            },
            messageFlag: function () {
                return MessageFlag;
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

        > .item {
            display: flex;
            flex-direction: column;
            padding: $spacing-normal*1.5 $spacing-normal;

            > .top {
                > .message {
                    display: flex;

                    > .avatar {
                        background: $color-yellow;
                        width: $spacing-normal*8;
                        height: $spacing-normal*8;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        @extend .copy-unable;
                    }

                    > .divider {
                        width: $spacing-normal;
                    }

                    > .content {
                        color: $color-white;
                        flex: 1;
                        display: flex;
                        flex-direction: column;

                        > .host-address {
                            font-size: 0.8em;
                        }

                        > .message {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;

                            > .text {
                                border-radius: 2px;
                                background: $color-gray;
                                padding: $spacing-normal*1.5;
                            }
                        }
                    }

                    > .fake-avatar {
                        opacity: 0;
                    }
                }

                > .notification {
                    color: $color-white;
                    opacity: 0.3;
                    font-size: 0.8em;
                    text-align: center;
                }
            }

            > .bottom {
                margin: $spacing-normal*0.6 0 $spacing-normal 0;

                > .time {
                    color: $color-yellow;
                    opacity: 0.3;
                    font-size: 0.8em;
                    text-align: center;
                }
            }
        }
    }
</style>
