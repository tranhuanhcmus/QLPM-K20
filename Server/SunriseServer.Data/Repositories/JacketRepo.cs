using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Bcpg;
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
    public class JacketRepo : RepositoryBase<Jacket>, IJacketRepo
    {
        readonly DataContext _dataContext;
        public JacketRepo(DataContext dbContext) : base(dbContext)
        {
            _dataContext = dbContext;
        }

        public override async Task<Jacket> CreateAsync(Jacket jk)
        {
            var result = await _dataContext.Jacket.ToListAsync();
            return result.FirstOrDefault();
        }

        public List<JacketProduct> GetByName(string name)
        {
            var product = _dataContext.Product.FromSqlRaw("CALL usp_SearchProduct({0})", name).ToList();

            var allJacket = product.Join(_dataContext.Jacket,
                p => p.ProductID,
                j => j.JacketId,
                (products, jacket) => new JacketProduct
                {
                    JacketData = jacket,
                    ProductData = products
                }).ToList();

            return allJacket;
        }

        public override async Task<Jacket> GetByIdAsync(int id)
        {
            var builder = new StringBuilder($"dbo.USP_GetAccountById @Id = \'{id}\';");
            var result = await _dataContext.Jacket.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result.FirstOrDefault();
        }

        public List<JacketProduct> GetAllSpecial()
        {
            //var query = from j in _dataContext.Jacket
            //            join p in _dataContext.Product on j.JacketId equals p.ProductID
            //            select new
            //            {
            //                JacketData = j, // Select all columns from Jacket table
            //                ProductData = p // Select all columns from Product table
            //            };

            var allJacket = _dataContext.Jacket.Join(_dataContext.Product,
                j => j.JacketId,
                p => p.ProductID,
                (jacket, product) => new JacketProduct
                {
                    JacketData = jacket,
                    ProductData = product
                }).ToList();

            return allJacket;
        }

    }
}
