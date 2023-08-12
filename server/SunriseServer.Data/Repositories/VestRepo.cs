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

        public async Task<bool> AddVest(float price, string image, string name, string description,
            byte discount, string fabricName, string color, string style, string vType, 
            string lapel, string edge, string breastPocket, string frontPocket)
        {
            try
            {
                var connection = _dataContext.Database.GetDbConnection();
                await connection.OpenAsync(); // Open the connection

                string type = "Vest";
                var cmd = connection.CreateCommand();
                cmd.CommandText = "dbo.usp_InsertVest";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = _dataContext.Database.GetDbConnection();

                cmd.Parameters.Add(new SqlParameter("@p_Price", SqlDbType.Float) { Value = price });
                cmd.Parameters.Add(new SqlParameter("@p_Image", SqlDbType.VarChar, 100) { Value = image });
                cmd.Parameters.Add(new SqlParameter("@p_Name", SqlDbType.VarChar, 100) { Value = name });
                cmd.Parameters.Add(new SqlParameter("@p_Description", SqlDbType.Text) { Value = description });
                cmd.Parameters.Add(new SqlParameter("@p_Discount", SqlDbType.TinyInt) { Value = discount });
                cmd.Parameters.Add(new SqlParameter("@p_FabricName", SqlDbType.VarChar, 100) { Value = fabricName });
                cmd.Parameters.Add(new SqlParameter("@p_color", SqlDbType.VarChar, 100) { Value = color });
                cmd.Parameters.Add(new SqlParameter("@p_Type", SqlDbType.VarChar, 20) { Value = type });
                cmd.Parameters.Add(new SqlParameter("@p_Style", SqlDbType.VarChar, 100) { Value = style });
                cmd.Parameters.Add(new SqlParameter("@p_vType", SqlDbType.VarChar, 100) { Value = vType });
                cmd.Parameters.Add(new SqlParameter("@p_Lapel", SqlDbType.VarChar, 100) { Value = lapel });
                cmd.Parameters.Add(new SqlParameter("@p_Edge", SqlDbType.VarChar, 100) { Value = edge });
                cmd.Parameters.Add(new SqlParameter("@p_BreastPocket", SqlDbType.VarChar, 100) { Value = breastPocket });
                cmd.Parameters.Add(new SqlParameter("@p_FrontPocket", SqlDbType.VarChar, 100) { Value = frontPocket });

                await cmd.ExecuteNonQueryAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the vest.", ex);
            }
        }


    }


}
