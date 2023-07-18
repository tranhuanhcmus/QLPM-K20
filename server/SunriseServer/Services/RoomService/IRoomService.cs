using SunriseServerCore.Models;

namespace SunriseServer.Services.RoomService
{
    public interface IRoomService
    {
        Task<List<HotelRoomService>> GetHotelServices(int id);
        Task<List<HotelRoomFacility>> GetHotelFacility(int id);
    }
};