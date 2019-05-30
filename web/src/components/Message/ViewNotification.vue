<template>
    <div class="notification">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ViewNotification",
    }
</script>

<style lang="scss" scoped>
    .notification {
        color: $color-shallow-gray;
        font-size: 0.8em;
        text-align: center;
    }
</style>
