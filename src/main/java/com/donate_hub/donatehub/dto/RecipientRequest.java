package com.donate_hub.donatehub.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RecipientRequest {
    @NotBlank(message = "Organization name is required")
    private String organizationName;

    private String contactPerson;
    private String email;
    private String phone;
    private String address;
}
