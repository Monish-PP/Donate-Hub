package com.donate_hub.donatehub.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DistributionRequest {
    @NotNull(message = "Recipient ID is required")
    private Long recipientId;
}
