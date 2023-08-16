using System.Data;
using System.Text;
using Microsoft.Data.SqlClient;
using SunriseServer.Common.Constant;
using SunriseServerCore.Dtos;
using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using SunriseServerCore.RepoInterfaces;

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

        public async Task<List<Product>> GetAllSpecial()
        {
            var allTies = await _dataContext.Product.Where(p => p.Type == GlobalConstant.TiesProduct).ToListAsync();

            return allTies;
        }

        public List<TiesDetail> GetByName(string name)
        {
            
            return null;
        }

        public TiesDetail GetTiesDetailById(int id)
        {
            Ties tiesInfor = _dataContext.Ties.Find(id);
            if (tiesInfor == null) return null;

            Product productInfor = _dataContext.Product.Find(id);

            TiesDetail result = new(productInfor);
            TiesComponent component = new() {
                Style = tiesInfor.Style,
                Size = tiesInfor.Size
            };

            result.Component = component;

            return result;
        }

        public async Task<bool> AddTies(AddTies at)
        {
            try
            {
                var connection = _dataContext.Database.GetDbConnection();
                await connection.OpenAsync(); // Open the connection

                var cmd = connection.CreateCommand();
                cmd.CommandText = "dbo.usp_InsertTies";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = _dataContext.Database.GetDbConnection();

                cmd.Parameters.Add(new SqlParameter("@p_Price", SqlDbType.Float) { Value = at.Price });
                cmd.Parameters.Add(new SqlParameter("@p_Image", SqlDbType.VarChar, 100) { Value = at.Image });
                cmd.Parameters.Add(new SqlParameter("@p_Name", SqlDbType.VarChar, 100) { Value = at.Name });
                cmd.Parameters.Add(new SqlParameter("@p_Description", SqlDbType.Text) { Value = at.Description });
                cmd.Parameters.Add(new SqlParameter("@p_Discount", SqlDbType.TinyInt) { Value = at.Discount });
                cmd.Parameters.Add(new SqlParameter("@p_FabricName", SqlDbType.VarChar, 100) { Value = at.FabricName });
                cmd.Parameters.Add(new SqlParameter("@p_color", SqlDbType.VarChar, 100) { Value = at.Color });
                cmd.Parameters.Add(new SqlParameter("@p_Type", SqlDbType.VarChar, 20) { Value = at.Type });
                cmd.Parameters.Add(new SqlParameter("@p_Size", SqlDbType.Decimal) { Value = at.Size });
                cmd.Parameters.Add(new SqlParameter("@p_Style", SqlDbType.NVarChar, 100) { Value = at.Style });

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
