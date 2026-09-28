package com.donate_hub.donatehub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DriveSummaryResponse {
    private Long driveId;
    private String driveName;
    private long totalCollected;
    private long totalDistributed;
    private long totalUndistributed;
}
