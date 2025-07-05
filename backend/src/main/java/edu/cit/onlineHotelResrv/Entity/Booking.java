package edu.cit.onlineHotelResrv.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
public class Booking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "hotel_id", nullable = false)
    private Long hotelId;
    
    @Column(name = "hotel_name", nullable = false)
    private String hotelName;
    
    @Column(name = "check_in_date", nullable = false)
    private LocalDate checkInDate;
    
    @Column(name = "check_out_date", nullable = false)
    private LocalDate checkOutDate;
    
    @Column(name = "booking_code", nullable = false, unique = true)
    private String bookingCode;
    
    @Column(name = "guest_first_name", nullable = false)
    private String guestFirstName;
    
    @Column(name = "guest_last_name", nullable = false)
    private String guestLastName;
    
    @Column(name = "guest_email", nullable = false)
    private String guestEmail;
    
    @Column(name = "guest_phone")
    private String guestPhone;
    
    @Column(name = "number_of_guests", nullable = false)
    private Integer numberOfGuests;
    
    @Column(name = "number_of_rooms", nullable = false)
    private Integer numberOfRooms;
    
    @Column(name = "total_amount", nullable = false)
    private Double totalAmount;
    
    @Column(name = "payment_mode")
    private String paymentMode;
    
    @Column(name = "special_requests")
    private String specialRequests;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private BookingStatus status;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public Booking() {
        this.createdAt = LocalDateTime.now();
        this.status = BookingStatus.PENDING;
        this.bookingCode = generateBookingCode();
    }
    
    private String generateBookingCode() {
        String timestamp = String.valueOf(System.currentTimeMillis());
        String random = String.valueOf((int)(Math.random() * 1000));
        return "BK" + timestamp.substring(timestamp.length() - 6) + random;
    }
    
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public Long getHotelId() {
        return hotelId;
    }
    
    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }
    
    public String getHotelName() {
        return hotelName;
    }
    
    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }
    
    public LocalDate getCheckInDate() {
        return checkInDate;
    }
    
    public void setCheckInDate(LocalDate checkInDate) {
        this.checkInDate = checkInDate;
    }
    
    public LocalDate getCheckOutDate() {
        return checkOutDate;
    }
    
    public void setCheckOutDate(LocalDate checkOutDate) {
        this.checkOutDate = checkOutDate;
    }
    
    public String getGuestFirstName() {
        return guestFirstName;
    }
    
    public void setGuestFirstName(String guestFirstName) {
        this.guestFirstName = guestFirstName;
    }
    
    public String getGuestLastName() {
        return guestLastName;
    }
    
    public void setGuestLastName(String guestLastName) {
        this.guestLastName = guestLastName;
    }
    
    public String getGuestEmail() {
        return guestEmail;
    }
    
    public void setGuestEmail(String guestEmail) {
        this.guestEmail = guestEmail;
    }
    
    public String getGuestPhone() {
        return guestPhone;
    }
    
    public void setGuestPhone(String guestPhone) {
        this.guestPhone = guestPhone;
    }
    
    public Integer getNumberOfGuests() {
        return numberOfGuests;
    }
    
    public void setNumberOfGuests(Integer numberOfGuests) {
        this.numberOfGuests = numberOfGuests;
    }
    
    public Integer getNumberOfRooms() {
        return numberOfRooms;
    }
    
    public void setNumberOfRooms(Integer numberOfRooms) {
        this.numberOfRooms = numberOfRooms;
    }
    
    public Double getTotalAmount() {
        return totalAmount;
    }
    
    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }
    
    public String getPaymentMode() {
        return paymentMode;
    }
    
    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }
    
    public String getSpecialRequests() {
        return specialRequests;
    }
    
    public void setSpecialRequests(String specialRequests) {
        this.specialRequests = specialRequests;
    }
    
    public BookingStatus getStatus() {
        return status;
    }
    
    public void setStatus(BookingStatus status) {
        this.status = status;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public String getBookingCode() {
        return bookingCode;
    }
    
    public void setBookingCode(String bookingCode) {
        this.bookingCode = bookingCode;
    }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
} 