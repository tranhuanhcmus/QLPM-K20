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
using Microsoft.Data.SqlClient;

namespace SunriseServerData.Repositories
{
    public class HotelRepo : RepositoryBase<Hotel>, IHotelRepo
    {
        readonly DataContext _dataContext;
        public HotelRepo(DataContext dbContext) : base(dbContext) 
        {
            _dataContext = dbContext;
        }

        public override async Task<IEnumerable<Hotel>> GetAllAsync()
        {
            var result = await _dataContext.Hotel.FromSqlInterpolated($"USP_GetAllHotel").ToListAsync();
            return result;
        }

        public override async Task<Hotel> GetByIdAsync(int id)
        {
            var result = await _dataContext.Hotel.FromSqlInterpolated($"USP_GetHotelById @Id = {id}").ToListAsync();
            return result.FirstOrDefault();
        }

        public override async Task<Hotel> CreateAsync(Hotel entity)
        {           
            var builder = new StringBuilder(@"
                DECLARE @result INT
                EXEC @result = dbo.USP_AddHotel ");
            builder.Append($"@Name = \'{entity.Name}\', ");
            builder.Append($"@HotelType = \'{entity.HotelType}\', ");
            builder.Append($"@ProvinceCity = \'{entity.ProvinceCity}\', ");
            builder.Append($"@Address = \'{entity.Address}\', ");
            builder.Append($"@Stars = {entity.Stars}, ");
            builder.Append($"@Rating = {entity.Rating}, ");
            builder.Append($"@Description = \'{entity.Description}\', ");
            builder.Append($"@Image = \'{entity.Image}\';\n");

            builder.Append($"EXEC USP_GetHotelById @Id = @result");

            var result = await _dataContext.Hotel.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result.FirstOrDefault();
        }

        // Task<TModel> UpdateAsync(TModel entity);

        // TModel Delete(int id);
    }
}
