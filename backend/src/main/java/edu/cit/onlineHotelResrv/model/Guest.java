package edu.cit.onlineHotelResrv.model;

import jakarta.persistence.*;

@Entity
@Table(name = "guests")
public class Guest extends User {
    private String address;
    private String identificationNumber;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIdentificationNumber() {
        return identificationNumber;
    }

    public void setIdentificationNumber(String identificationNumber) {
        this.identificationNumber = identificationNumber;
    }
}
