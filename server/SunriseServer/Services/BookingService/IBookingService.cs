namespace SunriseServer.Services.BookingService
{
    public interface IBookingService
    {
        Task<List<BookingAccount>> GetAllBookings();
        Task<BookingAccount> AddBooking(BookingAccount hero);
        Task<BookingAccount> UpdateBooking(int id, BookingAccount request);
        Task<BookingAccount> DeleteBooking(int id);
    }
};

