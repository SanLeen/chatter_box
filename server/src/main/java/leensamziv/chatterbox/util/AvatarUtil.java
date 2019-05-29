package leensamziv.chatterbox.util;

import java.util.Random;

public class AvatarUtil {
    static String string = "🐱^🐶^🐭^🐹^🐰^🦊^🐻^🐼^🐨^🐯^🦁^🐮^🐷^🐵^🐔^🐧^🐤^🦆^🦅^🦉^🦇^🐺^🐗^🐴^🦄^🐝^🐛^🦋^🐌^🐞^🐜^🦟^🦗^🕷^🕸^🦂^🐢^🐍^🦎^🦖^🦕^🐙^🦑^🦐^🦞^🦀^🐡^🐠^🐟^🐬^🐳^🦈^🐊^🐅^🐆^🦓^🦍^🐘^🦛^🦏^🐫^🦒^🦘^🐃^🐂^🐄^🐎^🐖^🐏^🐑^🦙^🐐^🦌^🐕^🐩^🐈^🦃^🦚^🦜^🦢^🕊^🐇^🦝^🦡^🐁^🐿^🦔^🐉";
    static String[] array = string.split("\\^");

    public static String getRandom() {
        return array[new Random().nextInt(array.length)];
    }
}
