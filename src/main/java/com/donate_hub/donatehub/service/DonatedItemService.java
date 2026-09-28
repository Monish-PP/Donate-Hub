package com.donate_hub.donatehub.service;

import com.donate_hub.donatehub.dto.*;
import com.donate_hub.donatehub.enums.ItemCategory;

import java.time.LocalDate;
import java.util.List;

public interface DonatedItemService {
    DonatedItemResponse logItem(DonatedItemRequest request);
    DonatedItemResponse getItemById(Long id);
    List<DonatedItemResponse> getAllItems();
    DonatedItemResponse updateItem(Long id, DonatedItemRequest request);
    void deleteItem(Long id);
    
    DonatedItemResponse distributeItem(Long itemId, DistributionRequest request);
    
    DriveSummaryResponse getDriveSummary(Long driveId);
    
    List<DonatedItemResponse> getUndistributedItems();
    
    DashboardResponse getDashboardStats();
    
    List<DonatedItemResponse> searchItems(ItemCategory category, LocalDate date);
}
