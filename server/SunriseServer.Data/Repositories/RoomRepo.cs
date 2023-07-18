using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using SunriseServerCore.RepoInterfaces;

namespace SunriseServerData.Repositories
{
    // IHotelRoomInfomationRepo
    public class RoomServiceRepo : RepositoryBase<HotelRoomService>, IHotelRoomServiceRepo
    {
        readonly DataContext _dataContext;
        public RoomServiceRepo(DataContext dbContext) : base(dbContext) 
        {
            _dataContext = dbContext;
        }

        public async Task<List<HotelRoomService>> GetHotelServiceAsync(int id)
        {
            var result = await _dataContext.HotelRoomServices.FromSqlInterpolated($"exec USP_GetHotelRoomService @Id={id};").ToListAsync();
            return result;
        }
    }

    public class HotelRoomFacilityRepo : RepositoryBase<HotelRoomFacility>, IHotelRoomFacilityRepo
    {
        readonly DataContext _dataContext;
        public HotelRoomFacilityRepo(DataContext dbContext) : base(dbContext) 
        {
            _dataContext = dbContext;
        }

        public async Task<List<HotelRoomFacility>> GetHotelFacilityAsync(int id)
        {
            var result = await _dataContext.HotelRoomFacilities.FromSqlInterpolated($"exec USP_GetHotelRoomFacility @Id={id};").ToListAsync();
            return result;
        }
    }
}
