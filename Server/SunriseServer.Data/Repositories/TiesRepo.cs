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
    public class TiesRepo : RepositoryBase<Ties>, ITiesRepo
    {
        readonly DataContext _dataContext;
        public TiesRepo(DataContext dbContext) : base(dbContext)
        {
            _dataContext = dbContext;
        }
        

        public override async Task<Ties> CreateAsync(Ties jk)
        {
            var result = await _dataContext.Ties.ToListAsync();
            return result.FirstOrDefault();
        }

        public override async Task<Ties> GetByIdAsync(int id)
        {
            var builder = new StringBuilder($"dbo.USP_GetAccountById @Id = \'{id}\';");

            Console.WriteLine(builder.ToString());
            var result = await _dataContext.Ties.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<List<TiesDetail>> GetAllSpecial()
        {
            var allTies = _dataContext.Ties.Join(_dataContext.Product,
                j => j.TiesID,
                p => p.ProductID,
                (Ties, product) => new TiesDetail
                {
                    TiesID = Ties.TiesID,
                    Size = Ties.Size,
                    Style = Ties.Style,
                    Products = product
                }).ToList();

            return allTies;
        }

        public List<TiesDetail> GetByName(string name)
        {
            
            return null;
        }

        public TiesDetail GetTiesDetailById(int id)
        {
            Ties tiesInfor = _dataContext.Ties.Find(id);
            Product productInfor = _dataContext.Product.Find(id);
            if (tiesInfor == null) return null;
            TiesDetail result = new TiesDetail();
            result.Products = productInfor;
            result.TiesID = tiesInfor.TiesID;
            result.Size = tiesInfor.Size;
            result.Style = tiesInfor.Style;

            return result;
        }

        public async Task<bool> AddTies(float price, string image, string name, string description,
            byte discount, string fabricName, string color, decimal size, string style)
        {
            try
            {
                var connection = _dataContext.Database.GetDbConnection();
                await connection.OpenAsync(); // Open the connection

                string type = "Ties";
                var cmd = connection.CreateCommand();
                cmd.CommandText = "dbo.usp_InsertTies";
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
                cmd.Parameters.Add(new SqlParameter("@p_Size", SqlDbType.Decimal) { Value = size });
                cmd.Parameters.Add(new SqlParameter("@p_Style", SqlDbType.NVarChar, 100) { Value = style });

                await cmd.ExecuteNonQueryAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the ties.", ex);
            }
        }


    }


}
