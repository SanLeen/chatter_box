package leensamziv.chatterbox.bean;

public class SelfInfo {
    String id;
    String avatar;
    String hostAddress;
    String hostName;

    public SelfInfo(String id, String avatar, String hostAddress, String hostName) {
        this.id = id;
        this.avatar = avatar;
        this.hostAddress = hostAddress;
        this.hostName = hostName;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getHostAddress() {
        return hostAddress;
    }

    public void setHostAddress(String hostAddress) {
        this.hostAddress = hostAddress;
    }

    public String getHostName() {
        return hostName;
    }

    public void setHostName(String hostName) {
        this.hostName = hostName;
    }
}
