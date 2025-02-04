package com.dieg0407.expense_tracker.iam.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class LoginController {

    @GetMapping
    public String loginHome() {
        return "iam/login";
    }

    @PostMapping("/login")
    public ModelAndView login() {
        // For now, redirect to the dashboard regardless of whether the user exists or
        return new ModelAndView("redirect:/dashboard");
    }
}
