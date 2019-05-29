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
        position: absolute;
        width: 100%;
        z-index: 999;

        display: flex;
        align-items: center;
        justify-content: center;

        > .state-dot {
            perspective: 120px;

            &.connected > .coin {
                border-color: green;
            }

            &.disconnected > .coin {
                border-color: red;
                animation: spin 1.5s ease-in-out infinite;
            }

            > .coin {
                cursor: pointer;
                @extend .copy-unable;
                color: $color-white;
                background: rgba(17, 17, 17, 0.8);
                margin-top: $spacing-normal;
                width: $spacing-normal*5;
                height: $spacing-normal*5;
                border-radius: 50%;
                border: 4px solid #3cefff;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    @keyframes spin {
        to {
            transform: rotateY(540deg);
        }
    }
</style>
