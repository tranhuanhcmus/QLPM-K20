

namespace SunriseServer.Services.RoomService
{
    public class RoomService : IRoomService
    {
        private readonly UnitOfWork _unitOfWork;

        public RoomService(UnitOfWork uof)
        {
            _unitOfWork = uof;
        }

        public async Task<List<HotelRoomService>> GetHotelServices(int id)
        {
            var servicesList = await _unitOfWork.HotelRoomServiceRepo.GetHotelServiceAsync(id);
            return servicesList;
        }

        public async Task<List<HotelRoomFacility>> GetHotelFacility(int id)
        {
            var servicesList = await _unitOfWork.HotelRoomFacilityRepo.GetHotelFacilityAsync(id);
            return servicesList;
        }

    }
}
