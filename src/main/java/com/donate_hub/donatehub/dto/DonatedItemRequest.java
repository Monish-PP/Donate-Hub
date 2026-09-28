package com.donate_hub.donatehub.dto;

import com.donate_hub.donatehub.enums.ItemCategory;
import com.donate_hub.donatehub.enums.ItemCondition;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DonatedItemRequest {
    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Category is required")
    private ItemCategory category;

    @NotNull(message = "Condition is required")
    private ItemCondition condition;

    @NotNull(message = "Collected date is required")
    private LocalDate collectedDate;

    @NotNull(message = "Donor ID is required")
    private Long donorId;

    @NotNull(message = "Drive ID is required")
    private Long driveId;
}
