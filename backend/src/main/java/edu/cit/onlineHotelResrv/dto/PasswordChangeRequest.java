package edu.cit.onlineHotelResrv.dto;

public class PasswordChangeRequest {
    private String currentPassword;
    private String newPassword;

    // Default constructor
    public PasswordChangeRequest() {}

    // Constructor with parameters
    public PasswordChangeRequest(String currentPassword, String newPassword) {
        this.currentPassword = currentPassword;
        this.newPassword = newPassword;
    }

    // Getters and setters
    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
} 