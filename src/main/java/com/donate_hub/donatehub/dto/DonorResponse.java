package com.donate_hub.donatehub.dto;

import lombok.Data;

@Data
public class DonorResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
}
