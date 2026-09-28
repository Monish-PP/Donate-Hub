package com.donate_hub.donatehub.dto;

import com.donate_hub.donatehub.enums.ItemCategory;
import com.donate_hub.donatehub.enums.ItemCondition;
import com.donate_hub.donatehub.enums.ItemStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DonatedItemResponse {
    private Long id;
    private String description;
    private ItemCategory category;
    private ItemCondition itemCondition;
    private LocalDate collectedDate;
    private ItemStatus status;
    private LocalDate distributedDate;
    private Long driveId;
    private Long donorId;
    private Long recipientId;
}
