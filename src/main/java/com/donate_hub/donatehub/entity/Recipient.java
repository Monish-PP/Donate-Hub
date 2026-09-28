package com.donate_hub.donatehub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recipients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Recipient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String organizationName;

    private String contactPerson;

    private String email;

    private String phone;

    private String address;

    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    private List<DonatedItem> donatedItems = new ArrayList<>();
}
