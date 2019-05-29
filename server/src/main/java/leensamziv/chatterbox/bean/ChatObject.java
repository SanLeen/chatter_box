package leensamziv.chatterbox.bean;

public class ChatObject {
    SelfInfo sender;
    Object content;

    public ChatObject(SelfInfo sender, Object content) {
        this.sender = sender;
        this.content = content;
    }
}
