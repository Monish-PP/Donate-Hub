package com.donate_hub.donatehub.service.impl;

import com.donate_hub.donatehub.dto.*;
import com.donate_hub.donatehub.entity.DonatedItem;
import com.donate_hub.donatehub.entity.Donor;
import com.donate_hub.donatehub.entity.Drive;
import com.donate_hub.donatehub.entity.Recipient;
import com.donate_hub.donatehub.enums.ItemCategory;
import com.donate_hub.donatehub.enums.ItemStatus;
import com.donate_hub.donatehub.exception.BusinessRuleException;
import com.donate_hub.donatehub.exception.ResourceNotFoundException;
import com.donate_hub.donatehub.repository.DonatedItemRepository;
import com.donate_hub.donatehub.repository.DonorRepository;
import com.donate_hub.donatehub.repository.DriveRepository;
import com.donate_hub.donatehub.repository.RecipientRepository;
import com.donate_hub.donatehub.service.DonatedItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DonatedItemServiceImpl implements DonatedItemService {

    private final DonatedItemRepository donatedItemRepository;
    private final DriveRepository driveRepository;
    private final DonorRepository donorRepository;
    private final RecipientRepository recipientRepository;

    @Override
    @Transactional
    public DonatedItemResponse logItem(DonatedItemRequest request) {
        Drive drive = driveRepository.findById(request.getDriveId())
                .orElseThrow(() -> new ResourceNotFoundException("Drive not found with id: " + request.getDriveId()));

        Donor donor = donorRepository.findById(request.getDonorId())
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found with id: " + request.getDonorId()));

        DonatedItem item = new DonatedItem();
        item.setDescription(request.getDescription());
        item.setCategory(request.getCategory());
        item.setItemCondition(request.getCondition());
        item.setCollectedDate(request.getCollectedDate());
        item.setStatus(ItemStatus.COLLECTED);
        item.setDrive(drive);
        item.setDonor(donor);
        
        DonatedItem savedItem = donatedItemRepository.save(item);
        return mapToResponse(savedItem);
    }

    @Override
    public DonatedItemResponse getItemById(Long id) {
        DonatedItem item = donatedItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
        return mapToResponse(item);
    }

    @Override
    public List<DonatedItemResponse> getAllItems() {
        return donatedItemRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public DonatedItemResponse updateItem(Long id, DonatedItemRequest request) {
        DonatedItem item = donatedItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));

        Drive drive = driveRepository.findById(request.getDriveId())
                .orElseThrow(() -> new ResourceNotFoundException("Drive not found with id: " + request.getDriveId()));

        Donor donor = donorRepository.findById(request.getDonorId())
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found with id: " + request.getDonorId()));

        item.setDescription(request.getDescription());
        item.setCategory(request.getCategory());
        item.setItemCondition(request.getCondition());
        item.setCollectedDate(request.getCollectedDate());
        item.setDrive(drive);
        item.setDonor(donor);

        DonatedItem updatedItem = donatedItemRepository.save(item);
        return mapToResponse(updatedItem);
    }

    @Override
    @Transactional
    public void deleteItem(Long id) {
        if (!donatedItemRepository.existsById(id)) {
            throw new ResourceNotFoundException("Item not found with id: " + id);
        }
        donatedItemRepository.deleteById(id);
    }

    @Override
    @Transactional
    public DonatedItemResponse distributeItem(Long itemId, DistributionRequest request) {
        DonatedItem item = donatedItemRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + itemId));

        if (item.getStatus() != ItemStatus.COLLECTED) {
            throw new BusinessRuleException("Item cannot be distributed because it has not been collected or is already distributed.");
        }
        if (item.getStatus() == ItemStatus.DISTRIBUTED) {
            throw new BusinessRuleException("Item has already been distributed.");
        }

        Recipient recipient = recipientRepository.findById(request.getRecipientId())
                .orElseThrow(() -> new ResourceNotFoundException("Recipient not found with id: " + request.getRecipientId()));

        item.setRecipient(recipient);
        item.setDistributedDate(LocalDate.now());
        item.setStatus(ItemStatus.DISTRIBUTED);

        DonatedItem updatedItem = donatedItemRepository.save(item);
        return mapToResponse(updatedItem);
    }

    @Override
    public DriveSummaryResponse getDriveSummary(Long driveId) {
        Drive drive = driveRepository.findById(driveId)
                .orElseThrow(() -> new ResourceNotFoundException("Drive not found with id: " + driveId));

        long totalCollected = donatedItemRepository.countByDriveId(driveId);
        long totalDistributed = donatedItemRepository.countByDriveIdAndStatus(driveId, ItemStatus.DISTRIBUTED);
        long totalUndistributed = donatedItemRepository.countByDriveIdAndStatus(driveId, ItemStatus.COLLECTED);

        return new DriveSummaryResponse(
                drive.getId(),
                drive.getName(),
                totalCollected,
                totalDistributed,
                totalUndistributed
        );
    }

    @Override
    public List<DonatedItemResponse> getUndistributedItems() {
        return donatedItemRepository.findByStatusAndRecipientIsNull(ItemStatus.COLLECTED).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DashboardResponse getDashboardStats() {
        long totalDrives = driveRepository.count();
        long totalDonors = donorRepository.count();
        long totalItems = donatedItemRepository.count();
        long totalDistributed = donatedItemRepository.countByStatus(ItemStatus.DISTRIBUTED);
        long totalUndistributed = donatedItemRepository.countByStatus(ItemStatus.COLLECTED);

        return new DashboardResponse(
                totalDrives,
                totalDonors,
                totalItems,
                totalDistributed,
                totalUndistributed
        );
    }

    @Override
    public List<DonatedItemResponse> searchItems(ItemCategory category, LocalDate date) {
        List<DonatedItem> items;
        if (category != null && date != null) {
            items = donatedItemRepository.findAll().stream()
                    .filter(i -> i.getCategory() == category && i.getCollectedDate().equals(date))
                    .collect(Collectors.toList());
        } else if (category != null) {
            items = donatedItemRepository.findByCategory(category);
        } else if (date != null) {
            items = donatedItemRepository.findByCollectedDate(date);
        } else {
            items = donatedItemRepository.findAll();
        }

        return items.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private DonatedItemResponse mapToResponse(DonatedItem item) {
        DonatedItemResponse response = new DonatedItemResponse();
        response.setId(item.getId());
        response.setDescription(item.getDescription());
        response.setCategory(item.getCategory());
        response.setItemCondition(item.getItemCondition());
        response.setCollectedDate(item.getCollectedDate());
        response.setStatus(item.getStatus());
        response.setDistributedDate(item.getDistributedDate());
        
        if (item.getDrive() != null) {
            response.setDriveId(item.getDrive().getId());
        }
        if (item.getDonor() != null) {
            response.setDonorId(item.getDonor().getId());
        }
        if (item.getRecipient() != null) {
            response.setRecipientId(item.getRecipient().getId());
        }
        return response;
    }
}
