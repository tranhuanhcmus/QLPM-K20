using SunriseServerCore.Models.Clothes;
using SunriseServerCore.RepoInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerData.Repositories
{
    public class BodyRepo : RepositoryBase<BodyMeasurement>, IBodyRepo
    {
        readonly DataContext _dataContext;

        public BodyRepo(DataContext dbContext) : base(dbContext) {
            _dataContext = dbContext;
        }

        public async Task<BodyMeasurement> GetAllMesurement(int accountId)
        {
            var builder = new StringBuilder($"dbo.USP_GetBodyMeasurement @AccountId = \'{accountId}\';");

            Console.WriteLine(builder.ToString());

            var result = await _dataContext.BodyMeasurement.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result.FirstOrDefault();
        }
    }
}
