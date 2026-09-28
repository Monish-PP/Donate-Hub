package com.donate_hub.donatehub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import com.donate_hub.donatehub.repository.DonorRepository;
import com.donate_hub.donatehub.repository.DriveRepository;
import com.donate_hub.donatehub.entity.Donor;
import com.donate_hub.donatehub.entity.Drive;
import java.time.LocalDate;

@SpringBootApplication
public class DonatehubApplication {

	public static void main(String[] args) {
		SpringApplication.run(DonatehubApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(DonorRepository donorRepo, DriveRepository driveRepo) {
		return args -> {
			if (donorRepo.count() == 0) {
				Donor donor = new Donor();
				donor.setName("Dummy Donor");
				donor.setEmail("dummy@example.com");
				donor.setPhone("1234567890");
				donorRepo.save(donor);
			}
			if (driveRepo.count() == 0) {
				Drive drive = new Drive();
				drive.setName("Initial Drive");
				drive.setDescription("Default testing drive");
				drive.setStartDate(LocalDate.now());
				drive.setEndDate(LocalDate.now().plusDays(30));
				driveRepo.save(drive);
			}
		};
	}

}
