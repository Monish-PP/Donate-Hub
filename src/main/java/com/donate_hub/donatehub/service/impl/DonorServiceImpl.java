package com.donate_hub.donatehub.service.impl;

import com.donate_hub.donatehub.dto.DonorRequest;
import com.donate_hub.donatehub.dto.DonorResponse;
import com.donate_hub.donatehub.entity.Donor;
import com.donate_hub.donatehub.exception.ResourceNotFoundException;
import com.donate_hub.donatehub.repository.DonorRepository;
import com.donate_hub.donatehub.service.DonorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DonorServiceImpl implements DonorService {

    private final DonorRepository donorRepository;

    @Override
    public DonorResponse createDonor(DonorRequest request) {
        Donor donor = new Donor();
        donor.setName(request.getName());
        donor.setEmail(request.getEmail());
        donor.setPhone(request.getPhone());

        Donor savedDonor = donorRepository.save(donor);
        return mapToResponse(savedDonor);
    }

    @Override
    public DonorResponse getDonorById(Long id) {
        Donor donor = donorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found with id: " + id));
        return mapToResponse(donor);
    }

    @Override
    public List<DonorResponse> getAllDonors() {
        return donorRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DonorResponse updateDonor(Long id, DonorRequest request) {
        Donor donor = donorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Donor not found with id: " + id));

        donor.setName(request.getName());
        donor.setEmail(request.getEmail());
        donor.setPhone(request.getPhone());

        Donor updatedDonor = donorRepository.save(donor);
        return mapToResponse(updatedDonor);
    }

    @Override
    public void deleteDonor(Long id) {
        if (!donorRepository.existsById(id)) {
            throw new ResourceNotFoundException("Donor not found with id: " + id);
        }
        donorRepository.deleteById(id);
    }

    private DonorResponse mapToResponse(Donor donor) {
        DonorResponse response = new DonorResponse();
        response.setId(donor.getId());
        response.setName(donor.getName());
        response.setEmail(donor.getEmail());
        response.setPhone(donor.getPhone());
        return response;
    }
}
