package com.donate_hub.donatehub.controller;

import com.donate_hub.donatehub.dto.DashboardResponse;
import com.donate_hub.donatehub.service.DonatedItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DonatedItemService donatedItemService;

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboardStats() {
        return ResponseEntity.ok(donatedItemService.getDashboardStats());
    }
}
