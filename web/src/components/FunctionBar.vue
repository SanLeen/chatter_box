<template>
    <div id="function-bar">
        <form id="typewriter" action="javascript:return true">
            <input type="text" v-model="writeContent" @keypress="typewriterPress">
        </form>
        <div class="avatar" @click="sendMessage">{{$store.state.userInfo.avatar}}</div>
    </div>
</template>

<script>
    export default {
        name: "FunctionBar",
        data() {
            return {
                writeContent: ''
            }
        },
        methods: {
            typewriterPress($event) {
                if ($event.key === 'Enter') {
                    this.sendMessage();
                }
                return true;
            },
            sendMessage() {
                if (this.writeContent.trim()) {
                    this.$socketServer.webSocket.send(this.writeContent.trim());
                    this.writeContent = '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #function-bar {
        color: $color-black;
        background: $color-gray;
        display: flex;

        > #typewriter {
            flex: 1;
            margin: 0 $spacing-normal;
            display: flex;

            > input {
                flex: 1;
                width: 100%;
                font-size: 1em;
                color: $color-white;
                padding: $spacing-normal;
                background: transparent;
                border: none;
                border-bottom: 2px $color-yellow solid;

                &:focus {
                }
            }
        }

        > .avatar {
            cursor: pointer;
            width: $spacing-normal*8;
            height: $spacing-normal*8;
            border-radius: 50%;
            background: $color-yellow;
            margin: $spacing-normal;
            display: flex;
            justify-content: center;
            align-items: center;
            @extend .copy-unable;

            &:hover {
                animation: spin 1.5s ease-in-out infinite;
            }
        }
    }
</style>
