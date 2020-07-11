import {HttpRegExp} from "../configs/consts";

export const readText = s => {
    let newS = s.replace( // 过滤链接
        HttpRegExp,
        "链接"
    );
    window.speechSynthesis.speak(
        new SpeechSynthesisUtterance(newS)
    );
};
