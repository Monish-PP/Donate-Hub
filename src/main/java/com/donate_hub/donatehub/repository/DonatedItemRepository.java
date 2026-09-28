package com.donate_hub.donatehub.repository;

import com.donate_hub.donatehub.entity.DonatedItem;
import com.donate_hub.donatehub.enums.ItemCategory;
import com.donate_hub.donatehub.enums.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface DonatedItemRepository extends JpaRepository<DonatedItem, Long> {
    List<DonatedItem> findByStatusAndRecipientIsNull(ItemStatus status);
    
    long countByDriveId(Long driveId);
    
    long countByDriveIdAndStatus(Long driveId, ItemStatus status);
    
    long countByStatus(ItemStatus status);
    
    List<DonatedItem> findByCategory(ItemCategory category);
    
    List<DonatedItem> findByCollectedDate(LocalDate date);
}
