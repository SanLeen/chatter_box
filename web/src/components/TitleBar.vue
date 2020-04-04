<template>
    <div id="title-bar">
        <div class="state-dot"
             :class="($store.state.serverConnected?'connected':'disconnected')">
            <div class="coin">
                {{$store.state.onlineCount}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TitleBar"
    }
</script>

<style lang="scss" scoped>
    #title-bar {
        @extend .copy-unable;
        position: absolute;
        padding: $spacing-normal 0;
        padding-top: 0;
        width: 100%;
        z-index: 999;

        display: flex;
        align-items: center;
        justify-content: center;

        > .state-dot {
            &.connected > .coin {
                background: $color-yellow;
                animation: breath 1s ease-in-out infinite alternate;
            }

            &.disconnected > .coin {
                background: #f10031;
                border-top-left-radius: 1em;
                border-top-right-radius: 1em;
                animation: spin 5s ease-in-out infinite;
            }

            > .coin {
                transition: all 0.5s;
                cursor: pointer;
                color: $color-black;
                font-weight: normal;
                padding: $spacing-normal $spacing-big;
                border-radius: 0 0 1em 1em;
                backdrop-filter: saturate(180%) blur(20px);
            }
        }
    }
</style>
