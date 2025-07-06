package edu.cit.onlineHotelResrv.controller;

import edu.cit.onlineHotelResrv.Entity.Booking;
import edu.cit.onlineHotelResrv.Entity.BookingStatus;
import edu.cit.onlineHotelResrv.Entity.User;
import edu.cit.onlineHotelResrv.dto.BookingRequest;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@RequestBody BookingRequest request, 
                                                       Authentication authentication) {
        try {
            User user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (request.getCheckIn() == null || request.getCheckOut() == null) {
                return ResponseEntity.badRequest()
                        .body(new BookingResponse("Check-in and check-out dates are required"));
            }

            if (request.getCheckIn().isAfter(request.getCheckOut())) {
                return ResponseEntity.badRequest()
                        .body(new BookingResponse("Check-in date must be before check-out date"));
            }

            if (request.getCheckIn().isBefore(LocalDate.now())) {
                return ResponseEntity.badRequest()
                        .body(new BookingResponse("Check-in date cannot be in the past"));
            }

            List<Booking> conflictingBookings = bookingRepository.findConflictingBookings(
                request.getHotelId(), request.getCheckIn(), request.getCheckOut());
            
            if (!conflictingBookings.isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new BookingResponse("Hotel is not available for the selected dates"));
            }

            Booking booking = new Booking();
            booking.setUser(user);
            booking.setHotelId(request.getHotelId());
            booking.setHotelName(request.getHotelName());
            booking.setCheckInDate(request.getCheckIn());
            booking.setCheckOutDate(request.getCheckOut());
            booking.setGuestFirstName(request.getGuestDetails().getFirstName());
            booking.setGuestLastName(request.getGuestDetails().getLastName());
            booking.setGuestEmail(request.getGuestDetails().getEmail());
            booking.setGuestPhone(request.getGuestDetails().getPhone());
            booking.setNumberOfGuests(request.getNumberOfGuests() != null ? request.getNumberOfGuests() : 1);
            booking.setNumberOfRooms(request.getNumberOfRooms() != null ? request.getNumberOfRooms() : 1);
            booking.setTotalAmount(request.getTotalAmount());
            booking.setPaymentMode(request.getPaymentMode());
            booking.setSpecialRequests(request.getSpecialRequests());

            Booking savedBooking = bookingRepository.save(booking);

            BookingResponse response = new BookingResponse(
                savedBooking.getId(),
                savedBooking.getBookingCode(),
                savedBooking.getHotelId(),
                savedBooking.getHotelName(),
                savedBooking.getCheckInDate(),
                savedBooking.getCheckOutDate(),
                savedBooking.getGuestFirstName(),
                savedBooking.getGuestLastName(),
                savedBooking.getGuestEmail(),
                savedBooking.getGuestPhone(),
                savedBooking.getNumberOfGuests(),
                savedBooking.getNumberOfRooms(),
                savedBooking.getTotalAmount(),
                savedBooking.getPaymentMode(),
                savedBooking.getSpecialRequests(),
                savedBooking.getStatus().toString(),
                savedBooking.getCreatedAt()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BookingResponse("Error creating booking: " + e.getMessage()));
        }
    }

    @GetMapping("/user")
    public ResponseEntity<List<BookingResponse>> getUserBookings(Authentication authentication) {
        try {
            User user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Booking> bookings = bookingRepository.findByUserOrderByCreatedAtDesc(user);

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

    @GetMapping("/{id}")
    public ResponseEntity<BookingResponse> getBooking(@PathVariable Long id, 
                                                    Authentication authentication) {
        try {
            User user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Booking booking = bookingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            if (!booking.getUser().getId().equals(user.getId()) && 
                !user.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            BookingResponse response = new BookingResponse(
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
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(@PathVariable Long id, 
                                                       Authentication authentication) {
        try {
            User user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Booking booking = bookingRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Booking not found"));

            if (!booking.getUser().getId().equals(user.getId()) && 
                !user.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            if (booking.getStatus() == BookingStatus.CANCELLED || 
                booking.getStatus() == BookingStatus.COMPLETED) {
                return ResponseEntity.badRequest()
                        .body(new BookingResponse("Booking cannot be cancelled"));
            }

            booking.setStatus(BookingStatus.CANCELLED);
            bookingRepository.save(booking);

            return ResponseEntity.ok(new BookingResponse("Booking cancelled successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new BookingResponse("Error cancelling booking: " + e.getMessage()));
        }
    }

    @GetMapping("/hotel/{hotelId}")
    public ResponseEntity<List<BookingResponse>> getHotelBookings(@PathVariable Long hotelId,
                                                                Authentication authentication) {
        try {
            User user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            if (!user.getRoles().stream().anyMatch(role -> role.getName().equals("ADMIN"))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
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
} 