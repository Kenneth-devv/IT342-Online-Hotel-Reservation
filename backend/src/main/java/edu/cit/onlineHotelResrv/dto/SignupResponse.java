package edu.cit.onlineHotelResrv.dto;

public class SignupResponse {
    private String message;
    private boolean success;

    public SignupResponse(String message, boolean success) {
        this.message = message;
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return success;
    }
}