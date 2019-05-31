<template>
    <div id="function-bar">
        <div class="avatar press-effect" @click="sendPicture">P</div>
        <form id="typewriter" action="javascript:return true">
            <input type="text" v-model="writeContent" @keypress="typewriterPress">
        </form>
        <div class="avatar press-effect" @click="sendMessage">{{$store.state.userInfo.avatar}}</div>
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
                if (!this.$socketServer.isState(WebSocket.OPEN)) {
                    return;
                }
                if (this.writeContent.trim()) {
                    this.$socketServer.webSocket.send(this.writeContent.trim());
                    this.writeContent = '';
                }
            },
            sendPicture() {
                if (!this.$socketServer.isState(WebSocket.OPEN)) {
                    return;
                }
                let input = document.createElement('input');
                input.setAttribute('type', 'file');
                input.setAttribute('accept', 'image/*');
                input.style.display = 'none';
                input.onchange = $event => {
                    if ($event.target.files.length > 0) {
                        let file = $event.target.files[0];
                        let reader = new FileReader();
                        reader.onload = loadEvent => {
                            let blob = loadEvent.target.result;
                            this.$socketServer.webSocket.send(blob);
                            input.parentNode.removeChild(input);
                        };
                        reader.readAsArrayBuffer(file);
                    }
                };
                document.body.appendChild(input);
                input.click();
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
                margin-bottom: $spacing-normal;
                border-bottom: 2px $color-yellow solid;

                &:focus {
                }
            }
        }

        > .avatar {
            cursor: pointer;
            width: $spacing-normal*7;
            height: $spacing-normal*7;
            border-radius: 50%;
            background: $color-yellow;
            margin: $spacing-normal;
            display: flex;
            justify-content: center;
            align-items: center;
            @extend .copy-unable;
        }
    }
</style>
