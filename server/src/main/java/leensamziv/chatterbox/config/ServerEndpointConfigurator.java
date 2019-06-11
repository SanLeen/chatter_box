package leensamziv.chatterbox.config;

import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;
import java.util.List;

// https://stackoverflow.com/questions/53186007/forwarding-user-ip-through-nginx-at-websocket
public class ServerEndpointConfigurator extends ServerEndpointConfig.Configurator {
    public static String IP_HEADER = "X-Real-IP";

    @Override
    public void modifyHandshake(ServerEndpointConfig sec, HandshakeRequest request, HandshakeResponse response) {
        List<String> result = request.getHeaders().get(IP_HEADER.toLowerCase());
        if (result != null && result.size() > 0) {
            sec.getUserProperties().put(IP_HEADER, result.get(0));
        }
    }
}
