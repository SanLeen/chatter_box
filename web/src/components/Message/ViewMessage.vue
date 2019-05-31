<template>
    <div class="message"
         :style="{flexDirection:item.self?'row-reverse':'row'}">
        <div class="avatar" :class="{'flip-horizontal':!item.self}">{{item.avatar}}</div>
        <div class="divider"></div>
        <div class="content">
            <div class="host-address" :style="{textAlign:item.self?'right':'left'}">
                {{item.hostAddress}}
            </div>
            <div class="message-stand" :style="{flexDirection:item.self?'row-reverse':'row'}">
                <div v-if="item.flag === messageFlag.MESSAGE" class="text">{{item.content}}</div>
                <div v-if="item.flag === messageFlag.BINARY_PIC">
                    <img v-if="item.loadDone" :src="item.binary">
                    <div v-else class="binary-loading"></div>
                </div>
            </div>
        </div>
        <div class="divider"></div>
        <div class="avatar fake-avatar"></div>
    </div>
</template>

<script>
    import MessageFlag from "../../util/MessageFlag";

    export default {
        name: "ViewMessage",
        props: {
            item: Object
        },
        computed: {
            messageFlag: function () {
                return MessageFlag;
            }
        },
    }
</script>

<style lang="scss" scoped>
    .message {
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

            > .message-stand {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-start;

                > .text {
                    word-break: break-all;
                    border-radius: 2px;
                    background: $color-gray;
                    padding: $spacing-normal*1.5;
                }

                img {
                    max-height: 300px;
                    max-width: 150px;
                }

                .binary-loading {
                    margin: $spacing-normal;
                    border: 3px solid $color-gray;
                    border-top-color: $color-yellow;
                    border-radius: 50%;
                    width: 3em;
                    height: 3em;
                    animation: spin 1.5s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            }
        }

        > .fake-avatar {
            opacity: 0;
        }
    }
</style>
