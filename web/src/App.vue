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
