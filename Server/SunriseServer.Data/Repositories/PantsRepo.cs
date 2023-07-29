﻿using Microsoft.EntityFrameworkCore;
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
    public class PantsRepo : RepositoryBase<Pants>, IPantsRepo
    {
        readonly DataContext _dataContext;
        public PantsRepo(DataContext dbContext) : base(dbContext)
        {
            _dataContext = dbContext;
        }

        public override async Task<Pants> CreateAsync(Pants jk)
        {
            var result = await _dataContext.Pants.ToListAsync();
            return result.FirstOrDefault();
        }

        public List<PantsProduct> GetByName(string name)
        {
            var product = _dataContext.Product.FromSqlRaw("CALL usp_SearchProduct({0})", name).ToList();

            var allPants = product.Join(_dataContext.Pants,
                p => p.ProductID,
                j => j.PantsID,
                (products, pants) => new PantsProduct
                {
                    PantsData = pants,
                    ProductData = products
                }).ToList();

            return allPants;
        }

        public override async Task<Pants> GetByIdAsync(int id)
        {
            var builder = new StringBuilder($"dbo.USP_GetAccountById @Id = \'{id}\';");

            Console.WriteLine(builder.ToString());
            var result = await _dataContext.Pants.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<List<PantsProduct>> GetAllSpecial()
        {
            var allVest = await _dataContext.Pants.Join(_dataContext.Product,
                v => v.PantsID,
                p => p.ProductID,
                (pants, product) => new PantsProduct
                {
                    PantsData = pants,
                    ProductData = product
                }).ToListAsync();

            return allVest;
        }

    }
}
