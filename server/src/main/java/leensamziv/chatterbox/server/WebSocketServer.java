package leensamziv.chatterbox.server;

import com.google.gson.Gson;
import leensamziv.chatterbox.bean.ChatObject;
import leensamziv.chatterbox.bean.SelfInfo;
import leensamziv.chatterbox.bean.SocketMessageObject;
import leensamziv.chatterbox.bean.SocketMessageType;
import leensamziv.chatterbox.config.ServerEndpointConfigurator;
import leensamziv.chatterbox.util.AvatarUtil;
import leensamziv.chatterbox.util.WebsocketUtil;
import org.springframework.stereotype.Component;
import org.springframework.util.DigestUtils;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.net.InetAddress;
import java.nio.ByteBuffer;
import java.util.Date;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@ServerEndpoint(value = "/socketServer", configurator = ServerEndpointConfigurator.class)
public class WebSocketServer {
    private static int onlineCount = 0;

    private static CopyOnWriteArraySet<WebSocketServer> webSocketSet = new CopyOnWriteArraySet<>();

    private Session session;
    private SelfInfo selfInfo;

    @OnOpen
    public void onOpen(Session session, EndpointConfig endpointConfig) {
        this.session = session;
        Object hostAddress = endpointConfig.getUserProperties().get(ServerEndpointConfigurator.IP_HEADER);
        if (hostAddress == null) {
            InetAddress inetAddress = WebsocketUtil.getRemoteAddress(session).getAddress();
            hostAddress = inetAddress.getHostAddress();
        }
        this.selfInfo = new SelfInfo(
                session.getId(),
                AvatarUtil.getRandom(),
                hostAddress.toString(),
                "unknown"
        );
        maintainServer(true);
    }

    @OnClose
    public void onClose() {
        maintainServer(false);
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        this.logEvent(message);
        this.sendGroupMessage(
                new SocketMessageObject(
                        SocketMessageType.MESSAGE,
                        new ChatObject(this.selfInfo, message)
                ),
                SocketMessageType.UNKNOWN
        );
    }

    @OnMessage
    public void onMessage(ByteBuffer message, Session session) throws IOException {
        String md5 = DigestUtils.md5DigestAsHex(message.array());
        //文件预告信息
        String fileNotice = new Gson().toJson(
                new SocketMessageObject(
                        SocketMessageType.BINARY_NOTICE,
                        new ChatObject(this.selfInfo, md5)
                )
        );
        this.logEvent(md5);
        for (WebSocketServer item : webSocketSet) {
            item.sendMessage(fileNotice);
            item.sendBinaryMessage(message);
        }
    }

    /**
     * 维护人员服务
     *
     * @param isJoin 是否为加入
     */
    public void maintainServer(boolean isJoin) {
        if (isJoin) {
            webSocketSet.add(this);
            addOnlineCount();
            this.sendSelfInfo();
        } else {
            webSocketSet.remove(this);
            subOnlineCount();
        }
        this.sendOnlineCountData();
        this.sendOnlineChangeMessage(isJoin);
        System.out.printf(
                "%d [%s/%s/%d]%s\n",
                new Date().getTime(),
                this.selfInfo.getHostAddress(),
                this.selfInfo.getHostName(),
                getOnlineCount(),
                (isJoin ? "join" : "out")
        );
    }

    /**
     * 发送人数变化通知
     *
     * @param isJoin 是否为加入
     */
    public void sendOnlineChangeMessage(boolean isJoin) {
        try {
            this.sendGroupMessage(
                    new SocketMessageObject(
                            SocketMessageType.USER_ACTIVE,
                            new ChatObject(this.selfInfo, isJoin)
                    ),
                    SocketMessageType.UNKNOWN
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 发送在线总人数数据
     */
    public void sendOnlineCountData() {
        try {
            this.sendGroupMessage(
                    new SocketMessageObject(SocketMessageType.USER_COUNT, getOnlineCount()),
                    SocketMessageType.UNKNOWN
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 发送个人资料
     */
    public void sendSelfInfo() {
        try {
            this.sendMessage(
                    new Gson().toJson(
                            new SocketMessageObject(SocketMessageType.SELF_INFO, this.selfInfo)
                    )
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 事件日志打印
     *
     * @param message 信息
     */
    public void logEvent(String message) {
        System.out.printf(
                "%d [%s/%s/%s]\n",
                new Date().getTime(),
                this.selfInfo.getHostAddress(),
                this.selfInfo.getAvatar(),
                message
        );
    }


    /**
     * 群发文本消息
     *
     * @param message      消息体
     * @param exceptUserId 不发送消息用户id
     * @throws IOException 异常
     */
    public void sendGroupMessage(SocketMessageObject message, String exceptUserId) throws IOException {
        for (WebSocketServer item : webSocketSet) {
            if (!item.session.getId().equals(exceptUserId)) {
                item.sendMessage(new Gson().toJson(message));
            }
        }
    }

    public void sendMessage(String message) throws IOException {
        this.session.getBasicRemote().sendText(message);
    }

    public void sendBinaryMessage(ByteBuffer message) throws IOException {
        this.session.getBasicRemote().sendBinary(message);
    }

    public static synchronized int getOnlineCount() {
        return WebSocketServer.onlineCount;
    }

    public static synchronized void addOnlineCount() {
        WebSocketServer.onlineCount++;
    }

    public static synchronized void subOnlineCount() {
        WebSocketServer.onlineCount--;
    }
}
