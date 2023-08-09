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
using System.Xml.Linq;

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
        public bool AddOne(Product p, string Style,
                   string fit, string lapel, string pocket, string sleeveButton, string backStyle, string breastPocket)
        {
            var result = _dataContext.Jacket.FromSqlRaw($"CALL usp_InsertJacket({p.Price}, {p.Image}, {p.Name}," +
                $"{p.Description}, {p.Discount}, {p.FabricName}, {p.color},{p.Type}, {Style}, {fit}, {lapel}," +
                $"{sleeveButton}, {pocket}, {backStyle}, {breastPocket} )").ToList();
            return true;
        }

        public override async Task<Jacket> GetByIdAsync(int id)
        {
            var builder = new StringBuilder($"dbo.USP_GetAccountById @Id = \'{id}\';");
            var result = await _dataContext.Jacket.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result.FirstOrDefault();
        }
        public JacketDetail GetJacketDetailById(int id)
        {
            Jacket jacketInfor = _dataContext.Jacket.Find(id);
            // check if not found
            if (jacketInfor == null) return null;

            JacketDetail result = new JacketDetail();
            // assign product info and jacket id
            result.Products = _dataContext.Product.Find(id);
            result.JacketId = jacketInfor.JacketId;

            // declare output parameters, here is the jacket's component
            var jStyleOut = new SqlParameter("@jStyleOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var jFitOut = new SqlParameter("@jFitOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var jLapelOut = new SqlParameter("@jLapelOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var jSleeveButtonOut = new SqlParameter("@jSleeveButtonOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var jBackStyleOut = new SqlParameter("@jBackStyleOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var jBreastPocketOut = new SqlParameter("@jBreastPocketOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var jPocketOut = new SqlParameter("@jPocketOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };

            // execute the stored procedure
            _dataContext.Database.ExecuteSqlRaw("EXEC dbo.USP_GetDetailJacketByID " +
                $"@jStyle = {jacketInfor.Style}, @jFit = {jacketInfor.Fit}, @jLapel = {jacketInfor.Lapel}, " +
                $"@jSleeveButton = {jacketInfor.SleeveButton}, @jBackStyle = {jacketInfor.BackStyle}, " +
                $"@jPocket = {jacketInfor.Pocket}, @jBreastPocket = {jacketInfor.BreastPocket}, " +
                $"@jStyleOut = @jStyleOut OUTPUT, @jFitOut = @jFitOut OUTPUT, @jLapelOut = @jLapelOut OUTPUT, " +
                $"@jSleeveButtonOut = @jSleeveButtonOut OUTPUT, @jBackStyleOut = @jBackStyleOut OUTPUT, " +
                $"@jPocketOut = @jPocketOut OUTPUT, @jBreastPocketOut = @jBreastPocketOut OUTPUT",
                jStyleOut, jFitOut, jLapelOut, jSleeveButtonOut, jBackStyleOut, jPocketOut, jBreastPocketOut);

            // assign output parameter values to result object
            result.Style = (string)jStyleOut.Value;
            result.Fit = (string)jFitOut.Value;
            result.Lapel = (string)jLapelOut.Value;
            result.SleeveButton = (string)jSleeveButtonOut.Value;
            result.BackStyle = (string)jBackStyleOut.Value;
            result.Pocket = (string)jPocketOut.Value;
            result.BreastPocket = (string)jBreastPocketOut.Value;

            return result;
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
