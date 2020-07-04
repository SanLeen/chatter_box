<template>
    <div id="function-bar">
        <div class="avatar press-effect" @click="sendPicture">P</div>
        <div id="typewriter">
            <input autofocus="autofocus"
                   v-model="writeContent"
                   @keypress.enter.exact="sendMessage">
        </div>
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
            insertEnter() { // 插入换行
                this.writeContent += '\n';
                console.log('✅', this.writeContent);
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
        position: absolute;
        bottom: 0;
        width: 100%;
        z-index: 999;
        background: rgba(17, 17, 17, 0.5);
        border-radius: 1em 1em 0 0;
        backdrop-filter: saturate(180%) blur(20px);
        color: $color-black;
        display: flex;
        padding: $spacing-normal 0;

        > #typewriter {
            flex: 1;
            margin: 0 $spacing-normal;
            display: flex;

            > input {
                flex: 1;
                width: 100%;
                font-size: 1em;
                color: $color-white;
                padding: $spacing-normal $spacing-normal 0 $spacing-normal;
                background: transparent;
                border: none;
                border-bottom: 2px $color-yellow solid;
                transition: border-bottom-width 200ms;

                &:focus {
                    border-bottom-width: 3px
                }
            }
        }

        > .avatar {
            cursor: pointer;
            width: $spacing-normal*7;
            height: $spacing-normal*7;
            border-radius: 50%;
            background: $color-yellow;
            margin: 0 $spacing-normal;
            font-weight: normal;
            display: flex;
            justify-content: center;
            align-items: center;
            @extend .copy-unable;
        }
    }
</style>
