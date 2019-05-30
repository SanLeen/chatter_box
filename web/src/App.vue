<template>
    <div id="app">
        <title-bar></title-bar>
        <stage></stage>
        <function-bar></function-bar>
    </div>
</template>

<script>
    import TitleBar from "./components/TitleBar";
    import Stage from "./components/Stage";
    import FunctionBar from "./components/FunctionBar";

    export default {
        name: 'app',
        components: {FunctionBar, Stage, TitleBar},
        mounted() {
            document.addEventListener('paste', $event => {
                if (!($event.clipboardData && $event.clipboardData.items)) {
                    return;
                }
                for (let item of $event.clipboardData.items) {
                    if (item.kind === "file") {
                        let reader = new FileReader();
                        reader.onload = loadEvent => {
                            let blob = loadEvent.target.result;
                            this.$socketServer.webSocket.send(blob);
                        };
                        reader.readAsArrayBuffer(item.getAsFile());
                    }
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    #app {
        display: flex;
        flex-direction: column;
        height: 100%;
        color: $color-yellow;
        background: $color-black;
    }
</style>
