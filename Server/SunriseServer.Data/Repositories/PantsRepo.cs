using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SunriseServerCore.Common.Helper;
using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using SunriseServerCore.RepoInterfaces;
using System;
using System.Collections.Generic;
using System.Data;
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

        public PantsDetail GetPantsDetailById(int id)
        {
            Pants pantsInfo = _dataContext.Pants.Find(id);
            // check if not found
            if (pantsInfo == null) return null;

            PantsDetail result = new PantsDetail();
            // assign product info and pants id
            result.Products = _dataContext.Product.Find(id);
            result.PantsId = pantsInfo.PantsID;

            // declare output parameters, here are the pants' components
            var pPocketOut = new SqlParameter("@pPocketOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var pFitOut = new SqlParameter("@pFitOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var pCuffOut = new SqlParameter("@pCuffOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var pFasteningOut = new SqlParameter("@pFasteningOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var pPleatsOut = new SqlParameter("@pPleatsOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };

            // execute the stored procedure
            _dataContext.Database.ExecuteSqlRaw("EXEC dbo.USP_GetDetailPantsByID " +
                $"@pPocket = {pantsInfo.Pocket}, @pFit = {pantsInfo.Fit}, @pCuff = {pantsInfo.Cuff}, " +
                $"@pFastening = {pantsInfo.Fastening}, @pPleats = {pantsInfo.Pleats}, " +
                $"@pPocketOut = @pPocketOut OUTPUT, @pFitOut = @pFitOut OUTPUT, @pCuffOut = @pCuffOut OUTPUT, " +
                $"@pFasteningOut = @pFasteningOut OUTPUT, @pPleatsOut = @pPleatsOut OUTPUT",
                pPocketOut, pFitOut, pCuffOut, pFasteningOut, pPleatsOut);

            // assign output parameter values to result object
            result.Pocket = (string)pPocketOut.Value;
            result.Fit = (string)pFitOut.Value;
            result.Cuff = (string)pCuffOut.Value;
            result.Fastening = (string)pFasteningOut.Value;
            result.Pleats = (string)pPleatsOut.Value;

            return result;
        }


    }
}
