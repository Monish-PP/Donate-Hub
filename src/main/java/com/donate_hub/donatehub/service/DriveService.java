package com.donate_hub.donatehub.service;

import com.donate_hub.donatehub.dto.DriveRequest;
import com.donate_hub.donatehub.dto.DriveResponse;

import java.util.List;

public interface DriveService {
    DriveResponse createDrive(DriveRequest request);
    DriveResponse getDriveById(Long id);
    List<DriveResponse> getAllDrives();
    DriveResponse updateDrive(Long id, DriveRequest request);
    void deleteDrive(Long id);
}
