package com.donate_hub.donatehub.controller;

import com.donate_hub.donatehub.dto.RecipientRequest;
import com.donate_hub.donatehub.dto.RecipientResponse;
import com.donate_hub.donatehub.service.RecipientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipients")
@RequiredArgsConstructor
public class RecipientController {

    private final RecipientService recipientService;

    @PostMapping
    public ResponseEntity<RecipientResponse> createRecipient(@Valid @RequestBody RecipientRequest request) {
        return new ResponseEntity<>(recipientService.createRecipient(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipientResponse> getRecipientById(@PathVariable Long id) {
        return ResponseEntity.ok(recipientService.getRecipientById(id));
    }

    @GetMapping
    public ResponseEntity<List<RecipientResponse>> getAllRecipients() {
        return ResponseEntity.ok(recipientService.getAllRecipients());
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipientResponse> updateRecipient(@PathVariable Long id, @Valid @RequestBody RecipientRequest request) {
        return ResponseEntity.ok(recipientService.updateRecipient(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecipient(@PathVariable Long id) {
        recipientService.deleteRecipient(id);
        return ResponseEntity.noContent().build();
    }
}
