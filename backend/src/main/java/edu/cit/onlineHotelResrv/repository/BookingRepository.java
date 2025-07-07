package edu.cit.onlineHotelResrv.repository;

import edu.cit.onlineHotelResrv.Entity.Booking;
import edu.cit.onlineHotelResrv.Entity.BookingStatus;
import edu.cit.onlineHotelResrv.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByUserOrderByCreatedAtDesc(User user);
    
    List<Booking> findByHotelIdOrderByCreatedAtDesc(Long hotelId);
    
    List<Booking> findByStatusOrderByCreatedAtDesc(String status);
    
    List<Booking> findByUserAndStatusOrderByCreatedAtDesc(User user, String status);
    
    @Query("SELECT b FROM Booking b WHERE b.hotelId = :hotelId AND " +
           "((b.checkInDate BETWEEN :startDate AND :endDate) OR " +
           "(b.checkOutDate BETWEEN :startDate AND :endDate) OR " +
           "(b.checkInDate <= :startDate AND b.checkOutDate >= :endDate))")
    List<Booking> findConflictingBookings(@Param("hotelId") Long hotelId, 
                                         @Param("startDate") LocalDate startDate, 
                                         @Param("endDate") LocalDate endDate);
    
    @Query("SELECT b FROM Booking b WHERE b.hotelId = :hotelId AND " +
           "b.checkInDate >= :startDate AND b.checkOutDate <= :endDate")
    List<Booking> findByHotelAndDateRange(@Param("hotelId") Long hotelId,
                                         @Param("startDate") LocalDate startDate,
                                         @Param("endDate") LocalDate endDate);
    
    long countByHotelIdAndStatus(Long hotelId, String status);
    
    @Query("SELECT b FROM Booking b WHERE b.createdAt >= :startDate ORDER BY b.createdAt DESC")
    List<Booking> findRecentBookings(@Param("startDate") java.time.LocalDateTime startDate);
    
    List<Booking> findAllByOrderByCreatedAtDesc();
    
    List<Booking> findByCheckOutDateGreaterThanEqualOrderByCheckInDateAsc(LocalDate date);
    
    List<Booking> findByCheckOutDateLessThanOrderByCheckOutDateDesc(LocalDate date);
    
    List<Booking> findByHotelIdAndCheckOutDateGreaterThanEqualOrderByCheckInDateAsc(Long hotelId, LocalDate date);
    
    List<Booking> findByHotelIdAndCheckOutDateLessThanOrderByCheckOutDateDesc(Long hotelId, LocalDate date);
    
    List<Booking> findByHotelIdAndStatusOrderByCreatedAtDesc(Long hotelId, BookingStatus status);
} 