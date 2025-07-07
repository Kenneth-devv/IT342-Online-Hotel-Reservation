package edu.cit.onlineHotelResrv.controller;

import edu.cit.onlineHotelResrv.Entity.Booking;
import edu.cit.onlineHotelResrv.Entity.BookingStatus;
import edu.cit.onlineHotelResrv.Entity.User;
import edu.cit.onlineHotelResrv.dto.BookingResponse;
import edu.cit.onlineHotelResrv.repository.BookingRepository;
import edu.cit.onlineHotelResrv.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.ArrayList;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hotel-manager")
public class HotelManagerController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingResponse>> getHotelBookings(Authentication authentication) {
        try {
            User hotelManager = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Check if user has HOTEL_MANAGER or ADMIN role
            boolean isHotelManager = hotelManager.getRoles().stream()
                    .anyMatch(role -> role.getName().equals("HOTEL_MANAGER") || role.getName().equals("ADMIN"));

            if (!isHotelManager) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            // Filter bookings by hotel manager's assigned hotel
            Long hotelId = hotelManager.getHotelId();
            if (hotelId == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(List.of()); // Hotel manager not assigned to any hotel
            }

            List<Booking> bookings = bookingRepository.findByHotelIdOrderByCreatedAtDesc(hotelId);

            List<BookingResponse> responses = bookings.stream()
                    .map(booking -> new BookingResponse(
                        booking.getId(),
                        booking.getBookingCode(),
                        booking.getHotelId(),
                        booking.getHotelName(),
                        booking.getCheckInDate(),
                        booking.getCheckOutDate(),
                        booking.getGuestFirstName(),
                        booking.getGuestLastName(),
                        booking.getGuestEmail(),
                        booking.getGuestPhone(),
                        booking.getNumberOfGuests(),
                        booking.getNumberOfRooms(),
                        booking.getTotalAmount(),
                        booking.getPaymentMode(),
                        booking.getSpecialRequests(),
                        booking.getStatus().toString(),
                        booking.getCreatedAt()
                    ))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/bookings/current")
    public ResponseEntity<List<BookingResponse>> getCurrentBookings(Authentication authentication) {
        try {
            User hotelManager = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean isHotelManager = hotelManager.getRoles().stream()
                    .anyMatch(role -> role.getName().equals("HOTEL_MANAGER") || role.getName().equals("ADMIN"));

            if (!isHotelManager) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            // Filter by hotel manager's assigned hotel
            Long hotelId = hotelManager.getHotelId();
            if (hotelId == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(List.of());
            }

            // Get current and future bookings for the specific hotel (excluding cancelled)
            LocalDate today = LocalDate.now();
            List<Booking> allCurrentBookings = bookingRepository.findByHotelIdAndCheckOutDateGreaterThanEqualOrderByCheckInDateAsc(hotelId, today);
            List<Booking> currentBookings = allCurrentBookings.stream()
                .filter(booking -> booking.getStatus() != BookingStatus.CANCELLED)
                .collect(Collectors.toList());

            List<BookingResponse> responses = currentBookings.stream()
                    .map(booking -> new BookingResponse(
                        booking.getId(),
                        booking.getBookingCode(),
                        booking.getHotelId(),
                        booking.getHotelName(),
                        booking.getCheckInDate(),
                        booking.getCheckOutDate(),
                        booking.getGuestFirstName(),
                        booking.getGuestLastName(),
                        booking.getGuestEmail(),
                        booking.getGuestPhone(),
                        booking.getNumberOfGuests(),
                        booking.getNumberOfRooms(),
                        booking.getTotalAmount(),
                        booking.getPaymentMode(),
                        booking.getSpecialRequests(),
                        booking.getStatus().toString(),
                        booking.getCreatedAt()
                    ))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/bookings/past")
    public ResponseEntity<List<BookingResponse>> getPastBookings(Authentication authentication) {
        try {
            User hotelManager = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean isHotelManager = hotelManager.getRoles().stream()
                    .anyMatch(role -> role.getName().equals("HOTEL_MANAGER") || role.getName().equals("ADMIN"));

            if (!isHotelManager) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            // Filter by hotel manager's assigned hotel
            Long hotelId = hotelManager.getHotelId();
            if (hotelId == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(List.of());
            }

            // Get past bookings for the specific hotel (including cancelled)
            LocalDate today = LocalDate.now();
            List<Booking> allPastBookings = bookingRepository.findByHotelIdAndCheckOutDateLessThanOrderByCheckOutDateDesc(hotelId, today);
            List<Booking> cancelledBookings = bookingRepository.findByHotelIdAndStatusOrderByCreatedAtDesc(hotelId, BookingStatus.CANCELLED);
            
            // Combine past bookings with cancelled bookings (avoiding duplicates)
            Set<Long> pastBookingIds = allPastBookings.stream().map(Booking::getId).collect(Collectors.toSet());
            List<Booking> pastBookings = new ArrayList<>(allPastBookings);
            for (Booking cancelledBooking : cancelledBookings) {
                if (!pastBookingIds.contains(cancelledBooking.getId())) {
                    pastBookings.add(cancelledBooking);
                }
            }

            List<BookingResponse> responses = pastBookings.stream()
                    .map(booking -> new BookingResponse(
                        booking.getId(),
                        booking.getBookingCode(),
                        booking.getHotelId(),
                        booking.getHotelName(),
                        booking.getCheckInDate(),
                        booking.getCheckOutDate(),
                        booking.getGuestFirstName(),
                        booking.getGuestLastName(),
                        booking.getGuestEmail(),
                        booking.getGuestPhone(),
                        booking.getNumberOfGuests(),
                        booking.getNumberOfRooms(),
                        booking.getTotalAmount(),
                        booking.getPaymentMode(),
                        booking.getSpecialRequests(),
                        booking.getStatus().toString(),
                        booking.getCreatedAt()
                    ))
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/bookings/{id}/status")
    public ResponseEntity<BookingResponse> updateBookingStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request,
            Authentication authentication) {
        try {
            User hotelManager = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean isHotelManager = hotelManager.getRoles().stream()
                    .anyMatch(role -> role.getName().equals("HOTEL_MANAGER") || role.getName().equals("ADMIN"));

            if (!isHotelManager) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Booking booking = bookingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            booking.setStatus(BookingStatus.valueOf(request.getStatus()));
            Booking updatedBooking = bookingRepository.save(booking);

            BookingResponse response = new BookingResponse(
                updatedBooking.getId(),
                updatedBooking.getBookingCode(),
                updatedBooking.getHotelId(),
                updatedBooking.getHotelName(),
                updatedBooking.getCheckInDate(),
                updatedBooking.getCheckOutDate(),
                updatedBooking.getGuestFirstName(),
                updatedBooking.getGuestLastName(),
                updatedBooking.getGuestEmail(),
                updatedBooking.getGuestPhone(),
                updatedBooking.getNumberOfGuests(),
                updatedBooking.getNumberOfRooms(),
                updatedBooking.getTotalAmount(),
                updatedBooking.getPaymentMode(),
                updatedBooking.getSpecialRequests(),
                updatedBooking.getStatus().toString(),
                updatedBooking.getCreatedAt()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BookingResponse("Error updating booking status: " + e.getMessage()));
        }
    }

    @PutMapping("/bookings/{id}/payment")
    public ResponseEntity<BookingResponse> confirmPayment(
            @PathVariable Long id,
            @RequestBody PaymentConfirmationRequest request,
            Authentication authentication) {
        try {
            User hotelManager = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean isHotelManager = hotelManager.getRoles().stream()
                    .anyMatch(role -> role.getName().equals("HOTEL_MANAGER") || role.getName().equals("ADMIN"));

            if (!isHotelManager) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Booking booking = bookingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            booking.setPaymentMode(request.getPaymentMethod());
            booking.setStatus(BookingStatus.CONFIRMED);
            Booking updatedBooking = bookingRepository.save(booking);

            BookingResponse response = new BookingResponse(
                updatedBooking.getId(),
                updatedBooking.getBookingCode(),
                updatedBooking.getHotelId(),
                updatedBooking.getHotelName(),
                updatedBooking.getCheckInDate(),
                updatedBooking.getCheckOutDate(),
                updatedBooking.getGuestFirstName(),
                updatedBooking.getGuestLastName(),
                updatedBooking.getGuestEmail(),
                updatedBooking.getGuestPhone(),
                updatedBooking.getNumberOfGuests(),
                updatedBooking.getNumberOfRooms(),
                updatedBooking.getTotalAmount(),
                updatedBooking.getPaymentMode(),
                updatedBooking.getSpecialRequests(),
                updatedBooking.getStatus().toString(),
                updatedBooking.getCreatedAt()
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BookingResponse("Error confirming payment: " + e.getMessage()));
        }
    }

    public static class StatusUpdateRequest {
        private String status;

        public StatusUpdateRequest() {}

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }

    @GetMapping("/hotel-info")
    public ResponseEntity<HotelInfoResponse> getHotelInfo(Authentication authentication) {
        try {
            User hotelManager = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean isHotelManager = hotelManager.getRoles().stream()
                    .anyMatch(role -> role.getName().equals("HOTEL_MANAGER") || role.getName().equals("ADMIN"));

            if (!isHotelManager) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            Long hotelId = hotelManager.getHotelId();
            if (hotelId == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            // Get hotel name from bookings or use a default based on hotel ID
            List<Booking> hotelBookings = bookingRepository.findByHotelIdOrderByCreatedAtDesc(hotelId);
            String hotelName;
            
            if (!hotelBookings.isEmpty()) {
                // Get the most common hotel name from all bookings for this hotel
                Map<String, Long> hotelNameCounts = hotelBookings.stream()
                    .collect(Collectors.groupingBy(Booking::getHotelName, Collectors.counting()));
                
                hotelName = hotelNameCounts.entrySet().stream()
                    .max(Map.Entry.comparingByValue())
                    .map(Map.Entry::getKey)
                    .orElse("Unknown Hotel");
            } else {
                // Fallback to hotel ID mapping if no bookings exist
                hotelName = getHotelNameById(hotelId);
            }

            HotelInfoResponse response = new HotelInfoResponse(hotelId, hotelName);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Helper method to get the correct hotel name based on hotel ID
    private String getHotelNameById(Long hotelId) {
        if (hotelId == null) {
            return "Unknown Hotel";
        }
        
        switch (hotelId.intValue()) {
            case 1:
                return "Grand Hyatt Manila";
            case 3:
                return "Shangri-La at the Fort";
            case 5:
                return "Luxurious Grand Hotel Cebu";
            default:
                return "Hotel " + hotelId;
        }
    }

    @PutMapping("/update-hotel-names")
    public ResponseEntity<String> updateHotelNames(Authentication authentication) {
        try {
            User user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            boolean isAdmin = user.getRoles().stream()
                    .anyMatch(role -> role.getName().equals("ADMIN"));

            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            // Update all bookings with correct hotel names
            List<Booking> allBookings = bookingRepository.findAll();
            int updatedCount = 0;

            for (Booking booking : allBookings) {
                String correctHotelName = getHotelNameById(booking.getHotelId());
                if (!correctHotelName.equals(booking.getHotelName())) {
                    booking.setHotelName(correctHotelName);
                    bookingRepository.save(booking);
                    updatedCount++;
                }
            }

            return ResponseEntity.ok("Updated " + updatedCount + " bookings with correct hotel names");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating hotel names: " + e.getMessage());
        }
    }

    public static class HotelInfoResponse {
        private Long hotelId;
        private String hotelName;

        public HotelInfoResponse(Long hotelId, String hotelName) {
            this.hotelId = hotelId;
            this.hotelName = hotelName;
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
    }

    public static class PaymentConfirmationRequest {
        private String paymentMethod;

        public PaymentConfirmationRequest() {}

        public String getPaymentMethod() {
            return paymentMethod;
        }

        public void setPaymentMethod(String paymentMethod) {
            this.paymentMethod = paymentMethod;
        }
    }
} 