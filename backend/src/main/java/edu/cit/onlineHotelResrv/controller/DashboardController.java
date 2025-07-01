package edu.cit.onlineHotelResrv.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    @GetMapping("/hotelpage")
    public String userDashboard() {
        return "User Dashboard";
    }

    @GetMapping("/admin/dashboard")
    public String adminDashboard() {
        return "Admin Dashboard";
    }

    @GetMapping("/receptionist/dashboard")
    public String receptionistDashboard() {
        return "Receptionist Dashboard";
    }

    @GetMapping("/reservation/dashboard")
    public String reservationDashboard() {
        return "Reservation Staff Dashboard";
    }

    @GetMapping("/accounting/dashboard")
    public String accountingDashboard() {
        return "Accounting Dashboard";
    }
}