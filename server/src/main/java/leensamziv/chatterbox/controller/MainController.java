package leensamziv.chatterbox.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/")
public class MainController {
    @GetMapping(value = "test")
    public String test() {
        return "hola world!";
    }
}
