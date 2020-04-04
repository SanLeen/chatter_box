<template>
    <message-body class="message-body" :time="item.time">
        <view-text
                v-if="item.flag === messageFlag.MESSAGE || item.flag === messageFlag.BINARY_PIC"
                :item="item">
        </view-text>
        <view-notification
                v-if="item.flag === messageFlag.NOTIFICATION">
            {{item.content}}
        </view-notification>
    </message-body>
</template>

<script>
    import MessageFlag from "../../util/MessageFlag";
    import MessageBody from "./MessageBody";
    import ViewNotification from "./ViewNotification";
    import ViewText from "./ViewText";

    export default {
        name: "MessageItem",
        components: {ViewText, ViewNotification, MessageBody},
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
