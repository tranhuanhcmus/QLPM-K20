using SunriseServer.Services;
using SunriseServerCore.Models;
using SunriseServerData;
namespace SunriseServer.Services.BookingService
{
    public class BookingService : IBookingService
    {
        private readonly UnitOfWork _unitOfWork;

        public BookingService(UnitOfWork uof)
        {
            _unitOfWork = uof;
        }

        public async Task<BookingAccount> AddBooking(BookingAccount booking)
        {
            var result = await _unitOfWork.BookingRepo.CreateAsync(booking);
            await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public async Task<BookingAccount> DeleteBooking(int id)
        {
            var result = _unitOfWork.BookingRepo.Delete(id);
            await _unitOfWork.SaveChangesAsync();

            return result;
        }

        public async Task<List<BookingAccount>> GetAllBookings()
        {
            var listBookingAccounts = await _unitOfWork.BookingRepo.GetAllAsync();
            return listBookingAccounts.ToList();
        }

        public async Task<BookingAccount> UpdateBooking(int id, BookingAccount request)
        {
            var result = await _unitOfWork.BookingRepo.UpdateAsync(request);
            await _unitOfWork.SaveChangesAsync();

            return result;
        }
    }
}
