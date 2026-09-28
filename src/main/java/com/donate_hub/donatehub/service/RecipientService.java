package com.donate_hub.donatehub.service;

import com.donate_hub.donatehub.dto.RecipientRequest;
import com.donate_hub.donatehub.dto.RecipientResponse;

import java.util.List;

public interface RecipientService {
    RecipientResponse createRecipient(RecipientRequest request);
    RecipientResponse getRecipientById(Long id);
    List<RecipientResponse> getAllRecipients();
    RecipientResponse updateRecipient(Long id, RecipientRequest request);
    void deleteRecipient(Long id);
}
