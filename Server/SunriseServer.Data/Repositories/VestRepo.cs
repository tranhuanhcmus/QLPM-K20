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

        public VestDetail GetVestDetailById(int id)
        {
            Vest vestInfo = _dataContext.Vest.Find(id);
            // check if not found
            if (vestInfo == null) return null;

            VestDetail result = new VestDetail();
            // assign product info and vest id
            result.Products = _dataContext.Product.Find(id);
            result.VestId = vestInfo.VestID;

            // declare output parameters, here are the vest's components
            var vStyleOut = new SqlParameter("@vStyleOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var vTypeOut = new SqlParameter("@vTypeOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var vLapelOut = new SqlParameter("@vLapelOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var vEdgeOut = new SqlParameter("@vEdgeOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var vBreastPocketOut = new SqlParameter("@vBreastPocketOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };
            var vFrontPocketOut = new SqlParameter("@vFrontPocketOut", SqlDbType.NVarChar, 100) { Direction = ParameterDirection.Output };

            // execute the stored procedure
            _dataContext.Database.ExecuteSqlRaw("EXEC dbo.USP_GetDetailVestByID " +
                $"@vStyle = {vestInfo.Style}, @vType = {vestInfo.Type}, @vLapel = {vestInfo.Lapel}, " +
                $"@vEdge = {vestInfo.Edge}, @vBreastPocket = {vestInfo.BreastPocket}, " +
                $"@vFrontPocket = {vestInfo.FrontPocket}, " +
                $"@vStyleOut = @vStyleOut OUTPUT, @vTypeOut = @vTypeOut OUTPUT, @vLapelOut = @vLapelOut OUTPUT, " +
                $"@vEdgeOut = @vEdgeOut OUTPUT, @vBreastPocketOut = @vBreastPocketOut OUTPUT, " +
                $"@vFrontPocketOut = @vFrontPocketOut OUTPUT",
                vStyleOut, vTypeOut, vLapelOut, vEdgeOut, vBreastPocketOut, vFrontPocketOut);

            // assign output parameter values to result object
            result.Style = (string)vStyleOut.Value;
            result.Type = (string)vTypeOut.Value;
            result.Lapel = (string)vLapelOut.Value;
            result.Edge = (string)vEdgeOut.Value;
            result.BreastPocket = (string)vBreastPocketOut.Value;
            result.FrontPocket = (string)vFrontPocketOut.Value;

            return result;
        }

    }
}
