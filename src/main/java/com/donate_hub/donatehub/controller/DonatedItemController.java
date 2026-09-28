package com.donate_hub.donatehub.controller;

import com.donate_hub.donatehub.dto.DistributionRequest;
import com.donate_hub.donatehub.dto.DonatedItemRequest;
import com.donate_hub.donatehub.dto.DonatedItemResponse;
import com.donate_hub.donatehub.enums.ItemCategory;
import com.donate_hub.donatehub.service.DonatedItemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class DonatedItemController {

    private final DonatedItemService donatedItemService;

    @PostMapping
    public ResponseEntity<DonatedItemResponse> logItem(@Valid @RequestBody DonatedItemRequest request) {
        return new ResponseEntity<>(donatedItemService.logItem(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DonatedItemResponse> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(donatedItemService.getItemById(id));
    }

    @GetMapping
    public ResponseEntity<List<DonatedItemResponse>> getItems(
            @RequestParam(required = false) ItemCategory category,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        
        if (category != null || date != null) {
            return ResponseEntity.ok(donatedItemService.searchItems(category, date));
        }
        return ResponseEntity.ok(donatedItemService.getAllItems());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DonatedItemResponse> updateItem(@PathVariable Long id, @Valid @RequestBody DonatedItemRequest request) {
        return ResponseEntity.ok(donatedItemService.updateItem(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        donatedItemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{itemId}/distribute")
    public ResponseEntity<DonatedItemResponse> distributeItem(
            @PathVariable Long itemId, 
            @Valid @RequestBody DistributionRequest request) {
        return ResponseEntity.ok(donatedItemService.distributeItem(itemId, request));
    }

    @GetMapping("/undistributed")
    public ResponseEntity<List<DonatedItemResponse>> getUndistributedItems() {
        return ResponseEntity.ok(donatedItemService.getUndistributedItems());
    }
}
