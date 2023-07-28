using Microsoft.EntityFrameworkCore;
using SunriseServerCore.Common.Helper;
using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using SunriseServerCore.RepoInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerData.Repositories
{
    public class VestRepo : RepositoryBase<Vest>, IVestRepo
    {
        readonly DataContext _dataContext;
        public VestRepo(DataContext dbContext) : base(dbContext)
        {
            _dataContext = dbContext;
        }

        public override async Task<Vest> CreateAsync(Vest jk)
        {
            var result = await _dataContext.Vest.ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<Vest> GetByName(string name)
        {
            var result = await _dataContext.Vest.ToListAsync();
            return result.FirstOrDefault();
        }

        public override async Task<Vest> GetByIdAsync(int id)
        {
            var builder = new StringBuilder($"dbo.USP_GetAccountById @Id = \'{id}\';");

            Console.WriteLine(builder.ToString());
            var result = await _dataContext.Vest.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result.FirstOrDefault();
        }

        public List<VestProduct> GetAllSpecial()
        {
            //var query = from j in _dataContext.Vest
            //            join p in _dataContext.Product on j.JacketId equals p.ProductID
            //            select new
            //            {
            //                JacketData = j, // Select all columns from Vest table
            //                ProductData = p // Select all columns from Product table
            //            };

            var allJacket = _dataContext.Vest.Join(_dataContext.Product,
                v => v.VestID,
                p => p.ProductID,
                (jacket, product) => new VestProduct
                {
                    VestData = jacket,
                    ProductData = product
                }).ToList();

            return allJacket;
        }

    }
}
