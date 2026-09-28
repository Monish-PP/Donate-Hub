package com.donate_hub.donatehub.dto;

import lombok.Data;

@Data
public class RecipientResponse {
    private Long id;
    private String organizationName;
    private String contactPerson;
    private String email;
    private String phone;
    private String address;
}
