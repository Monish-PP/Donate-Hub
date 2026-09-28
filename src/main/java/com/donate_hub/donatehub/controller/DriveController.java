package com.donate_hub.donatehub.controller;

import com.donate_hub.donatehub.dto.DriveRequest;
import com.donate_hub.donatehub.dto.DriveResponse;
import com.donate_hub.donatehub.dto.DriveSummaryResponse;
import com.donate_hub.donatehub.service.DonatedItemService;
import com.donate_hub.donatehub.service.DriveService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drives")
@RequiredArgsConstructor
public class DriveController {

    private final DriveService driveService;
    private final DonatedItemService donatedItemService;

    @PostMapping
    public ResponseEntity<DriveResponse> createDrive(@Valid @RequestBody DriveRequest request) {
        return new ResponseEntity<>(driveService.createDrive(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DriveResponse> getDriveById(@PathVariable Long id) {
        return ResponseEntity.ok(driveService.getDriveById(id));
    }

    @GetMapping
    public ResponseEntity<List<DriveResponse>> getAllDrives() {
        return ResponseEntity.ok(driveService.getAllDrives());
    }

    @PutMapping("/{id}")
    public ResponseEntity<DriveResponse> updateDrive(@PathVariable Long id, @Valid @RequestBody DriveRequest request) {
        return ResponseEntity.ok(driveService.updateDrive(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDrive(@PathVariable Long id) {
        driveService.deleteDrive(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{driveId}/summary")
    public ResponseEntity<DriveSummaryResponse> getDriveSummary(@PathVariable Long driveId) {
        return ResponseEntity.ok(donatedItemService.getDriveSummary(driveId));
    }
}
