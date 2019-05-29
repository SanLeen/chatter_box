package leensamziv.chatterbox.bean;

import java.util.Date;

public class SocketMessageObject {
    long time;
    int type;
    Object message;

    public SocketMessageObject(int type, Object message) {
        this.time = new Date().getTime();
        this.type = type;
        this.message = message;
    }
}
