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

        public override async Task<Vest> GetByIdAsync(int id)
        {
            var builder = new StringBuilder($"dbo.USP_GetAccountById @Id = \'{id}\';");

            Console.WriteLine(builder.ToString());
            var result = await _dataContext.Vest.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<List<VestProduct>> GetAllSpecial()
        {
            var allVest = await _dataContext.Vest.Join(_dataContext.Product,
                v => v.VestID,
                p => p.ProductID,
                (vest, product) => new VestProduct
                {
                    VestData = vest,
                    ProductData = product
                }).ToListAsync();

            return allVest;
        }

        public List<VestProduct> GetByName(string name)
        {
            var product = _dataContext.Product.FromSqlRaw("CALL usp_SearchProduct({0})", name).ToList();

            var allVest = product.Join(_dataContext.Vest,
                p => p.ProductID,
                j => j.VestID,
                (products, vest) => new VestProduct
                {
                    VestData = vest,
                    ProductData = products
                }).ToList();

            return allVest;
        }

    }
}
