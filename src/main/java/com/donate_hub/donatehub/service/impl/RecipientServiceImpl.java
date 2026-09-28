package com.donate_hub.donatehub.service.impl;

import com.donate_hub.donatehub.dto.RecipientRequest;
import com.donate_hub.donatehub.dto.RecipientResponse;
import com.donate_hub.donatehub.entity.Recipient;
import com.donate_hub.donatehub.exception.ResourceNotFoundException;
import com.donate_hub.donatehub.repository.RecipientRepository;
import com.donate_hub.donatehub.service.RecipientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipientServiceImpl implements RecipientService {

    private final RecipientRepository recipientRepository;

    @Override
    public RecipientResponse createRecipient(RecipientRequest request) {
        Recipient recipient = new Recipient();
        recipient.setOrganizationName(request.getOrganizationName());
        recipient.setContactPerson(request.getContactPerson());
        recipient.setEmail(request.getEmail());
        recipient.setPhone(request.getPhone());
        recipient.setAddress(request.getAddress());

        Recipient savedRecipient = recipientRepository.save(recipient);
        return mapToResponse(savedRecipient);
    }

    @Override
    public RecipientResponse getRecipientById(Long id) {
        Recipient recipient = recipientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipient not found with id: " + id));
        return mapToResponse(recipient);
    }

    @Override
    public List<RecipientResponse> getAllRecipients() {
        return recipientRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public RecipientResponse updateRecipient(Long id, RecipientRequest request) {
        Recipient recipient = recipientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recipient not found with id: " + id));

        recipient.setOrganizationName(request.getOrganizationName());
        recipient.setContactPerson(request.getContactPerson());
        recipient.setEmail(request.getEmail());
        recipient.setPhone(request.getPhone());
        recipient.setAddress(request.getAddress());

        Recipient updatedRecipient = recipientRepository.save(recipient);
        return mapToResponse(updatedRecipient);
    }

    @Override
    public void deleteRecipient(Long id) {
        if (!recipientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Recipient not found with id: " + id);
        }
        recipientRepository.deleteById(id);
    }

    private RecipientResponse mapToResponse(Recipient recipient) {
        RecipientResponse response = new RecipientResponse();
        response.setId(recipient.getId());
        response.setOrganizationName(recipient.getOrganizationName());
        response.setContactPerson(recipient.getContactPerson());
        response.setEmail(recipient.getEmail());
        response.setPhone(recipient.getPhone());
        response.setAddress(recipient.getAddress());
        return response;
    }
}
