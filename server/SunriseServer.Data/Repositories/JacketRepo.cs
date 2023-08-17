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

        public List<Product> GetAllSpecial()
        {
            var allJacket = _dataContext.Product.Where(p => p.Type == GlobalConstant.JacketProduct).ToList();
            return allJacket;
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
        public JacketDetail GetJacketDetailById(int id)
        {
            Jacket jacketInfor = _dataContext.Jacket.Find(id);
            // check if not found
            if (jacketInfor == null) return null;

            Product productInfor = _dataContext.Product.Find(id);

            JacketDetail result = new JacketDetail(productInfor);


            var builder = new StringBuilder();
            builder.Append($"EXEC USP_GetDetailJacketByID {id};");
            JacketComponent component = _dataContext.Set<JacketComponent>()
                .FromSqlInterpolated($"EXECUTE({builder.ToString()});")
                .ToList().FirstOrDefault();

            result.Component = component;

            return result;

        }

        // -----------------//
        //    CRUD area     //
        // -----------------//
        
        
        public async Task<bool> AddJacket(AddJacket aj)
        {
            try
            {
                var connection = _dataContext.Database.GetDbConnection();
                await connection.OpenAsync(); // Open the connection

                string type = "Jacket";
                var cmd =connection.CreateCommand();
                cmd.CommandText = "dbo.usp_InsertJacket";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = _dataContext.Database.GetDbConnection();
                
                cmd.Parameters.Add(new SqlParameter("@p_Price", SqlDbType.Float) { Value = aj.Price });
                cmd.Parameters.Add(new SqlParameter("@p_Image", SqlDbType.VarChar, 100) { Value = aj.Image });
                cmd.Parameters.Add(new SqlParameter("@p_Name", SqlDbType.VarChar, 100) { Value = aj.Name });
                cmd.Parameters.Add(new SqlParameter("@p_Description", SqlDbType.Text) { Value = aj.Description });
                cmd.Parameters.Add(new SqlParameter("@p_Discount", SqlDbType.TinyInt) { Value = aj.Discount });
                cmd.Parameters.Add(new SqlParameter("@p_FabricName", SqlDbType.VarChar, 100) { Value = aj.FabricName });
                cmd.Parameters.Add(new SqlParameter("@p_color", SqlDbType.VarChar, 100) { Value = aj.Color });
                cmd.Parameters.Add(new SqlParameter("@p_Type", SqlDbType.VarChar, 20) { Value = type });
                cmd.Parameters.Add(new SqlParameter("@p_Style", SqlDbType.VarChar, 100) { Value = aj.Style });
                cmd.Parameters.Add(new SqlParameter("@p_Fit", SqlDbType.VarChar, 100) { Value = aj.Fit });
                cmd.Parameters.Add(new SqlParameter("@p_Lapel", SqlDbType.VarChar, 100) { Value = aj.Lapel });
                cmd.Parameters.Add(new SqlParameter("@p_SleeveButton", SqlDbType.VarChar, 100) { Value = aj.SleeveButton });
                cmd.Parameters.Add(new SqlParameter("@p_Pocket", SqlDbType.VarChar, 100) { Value = aj.Pocket });
                cmd.Parameters.Add(new SqlParameter("@p_BackStyle", SqlDbType.VarChar, 100) { Value = aj.BackStyle });
                cmd.Parameters.Add(new SqlParameter("@p_BreastPocket", SqlDbType.VarChar, 100) { Value = aj.BreastPocket });

                await cmd.ExecuteNonQueryAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the jacket.", ex);
            }
        }


        public async Task<bool> DeleteJacket(int id) {

            try
            {
                Jacket jacket = await _dataContext.Jacket.FindAsync(id)?? throw new DataException("404 - Jacket not found");
                _dataContext.Jacket.Remove(jacket);
                _dataContext.SaveChanges();
            }
            catch (DataException ex)
            {
                //Log the error (uncomment dex variable name and add a line here to write a log.
                throw new Exception("An error occurred while removing the jacket.", ex);
            }
            return true;
        }

        



        
        

    }
}
