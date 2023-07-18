using SunriseServer.Services;
using SunriseServerCore.Models;
using SunriseServerData;
namespace SunriseServer.Services.HotelService
{
    public class HotelService : IHotelService
    {
        private readonly UnitOfWork _unitOfWork;

        public HotelService(UnitOfWork uof)
        {
            _unitOfWork = uof;
        }

        public async Task<Hotel> AddHotel(Hotel hotel)
        {
            var result = await _unitOfWork.HotelRepo.CreateAsync(hotel);
            // await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public async Task<Hotel> DeleteHotel(int id)
        {
            var result = _unitOfWork.HotelRepo.Delete(id);
            await _unitOfWork.SaveChangesAsync();

            return result;
        }

        public async Task<List<Hotel>> GetAllHotels()
        {
            var listHotels = await _unitOfWork.HotelRepo.GetAllAsync();
            return listHotels.ToList();
        }

        public async Task<Hotel> GetSingleHotel(int id)
        {
            var hotel = await _unitOfWork.HotelRepo.GetByIdAsync(id);

            if (hotel is null)
                return null;

            return hotel;
        }

        public async Task<Hotel> UpdateHotel(int id, Hotel request)
        {
            var result = await _unitOfWork.HotelRepo.UpdateAsync(request);
            await _unitOfWork.SaveChangesAsync();

            return result;
        }
    }
}
