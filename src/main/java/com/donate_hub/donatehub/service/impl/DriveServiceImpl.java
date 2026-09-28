package com.donate_hub.donatehub.service.impl;

import com.donate_hub.donatehub.dto.DriveRequest;
import com.donate_hub.donatehub.dto.DriveResponse;
import com.donate_hub.donatehub.entity.Drive;
import com.donate_hub.donatehub.exception.BusinessRuleException;
import com.donate_hub.donatehub.exception.ResourceNotFoundException;
import com.donate_hub.donatehub.repository.DriveRepository;
import com.donate_hub.donatehub.service.DriveService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriveServiceImpl implements DriveService {

    private final DriveRepository driveRepository;

    @Override
    public DriveResponse createDrive(DriveRequest request) {
        validateDriveDates(request);

        Drive drive = new Drive();
        drive.setName(request.getName());
        drive.setDescription(request.getDescription());
        drive.setStartDate(request.getStartDate());
        drive.setEndDate(request.getEndDate());

        Drive savedDrive = driveRepository.save(drive);
        return mapToResponse(savedDrive);
    }

    @Override
    public DriveResponse getDriveById(Long id) {
        Drive drive = driveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Drive not found with id: " + id));
        return mapToResponse(drive);
    }

    @Override
    public List<DriveResponse> getAllDrives() {
        return driveRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DriveResponse updateDrive(Long id, DriveRequest request) {
        validateDriveDates(request);

        Drive drive = driveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Drive not found with id: " + id));

        drive.setName(request.getName());
        drive.setDescription(request.getDescription());
        drive.setStartDate(request.getStartDate());
        drive.setEndDate(request.getEndDate());

        Drive updatedDrive = driveRepository.save(drive);
        return mapToResponse(updatedDrive);
    }

    @Override
    public void deleteDrive(Long id) {
        if (!driveRepository.existsById(id)) {
            throw new ResourceNotFoundException("Drive not found with id: " + id);
        }
        driveRepository.deleteById(id);
    }

    private void validateDriveDates(DriveRequest request) {
        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new BusinessRuleException("Start date must not be after end date.");
        }
    }

    private DriveResponse mapToResponse(Drive drive) {
        DriveResponse response = new DriveResponse();
        response.setId(drive.getId());
        response.setName(drive.getName());
        response.setDescription(drive.getDescription());
        response.setStartDate(drive.getStartDate());
        response.setEndDate(drive.getEndDate());
        return response;
    }
}
