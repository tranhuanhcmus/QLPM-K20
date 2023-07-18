using SunriseServerCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IHotelRoomFacilityRepo : IRepository<HotelRoomFacility>
    {
        Task<List<HotelRoomFacility>> GetHotelFacilityAsync(int id);
    }

    public interface IHotelRoomServiceRepo : IRepository<HotelRoomService>
    {
        Task<List<HotelRoomService>> GetHotelServiceAsync(int id);
    }
}
