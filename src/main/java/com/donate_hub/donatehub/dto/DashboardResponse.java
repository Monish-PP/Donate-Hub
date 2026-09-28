package com.donate_hub.donatehub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardResponse {
    private long totalDrives;
    private long totalDonors;
    private long totalDonatedItems;
    private long totalDistributedItems;
    private long totalUndistributedItems;
}
