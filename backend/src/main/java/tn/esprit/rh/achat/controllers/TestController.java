package tn.esprit.rh.achat.controllers;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/ping")
public class TestController {

    @GetMapping
    public String ping() {
        return "pong";
    }
}