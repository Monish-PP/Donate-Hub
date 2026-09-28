package com.donate_hub.donatehub.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class DriveResponse {
    private Long id;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
}
