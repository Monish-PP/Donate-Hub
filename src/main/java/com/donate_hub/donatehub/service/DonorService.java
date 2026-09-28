package com.donate_hub.donatehub.service;

import com.donate_hub.donatehub.dto.DonorRequest;
import com.donate_hub.donatehub.dto.DonorResponse;

import java.util.List;

public interface DonorService {
    DonorResponse createDonor(DonorRequest request);
    DonorResponse getDonorById(Long id);
    List<DonorResponse> getAllDonors();
    DonorResponse updateDonor(Long id, DonorRequest request);
    void deleteDonor(Long id);
}
