using System.Data;
using System.Text;
using Microsoft.Data.SqlClient;
using SunriseServerCore.Models.Clothes;
using SunriseServerCore.RepoInterfaces;
using SunriseServerCore.Dtos;
using SunriseServerCore.Models;
using SunriseServer.Common.Constant;


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

        public async Task<List<Product>> GetAllSpecial()
        {
            var allVest = await _dataContext.Product.Where(p => p.Type == GlobalConstant.PantsProduct).ToListAsync();
            return allVest;
        }

        public PantsDetail GetPantsDetailById(int id)
        {
            Pants PantsInfor = _dataContext.Pants.Find(id);
            // check if not found
            if (PantsInfor == null) return null;

            Product productInfor = _dataContext.Product.Find(id);

            PantsDetail result = new PantsDetail(productInfor);


            var builder = new StringBuilder();
            builder.Append($"EXEC USP_GetDetailPantsByID {id};");
            PantsComponent component = _dataContext.Set<PantsComponent>()
                .FromSqlInterpolated($"EXECUTE({builder.ToString()});")
                .ToList().FirstOrDefault();

            result.Component = component;

            return result;
        }

        public async Task<bool> AddPants(AddPants ap)
        {
            try
            {
                var connection = _dataContext.Database.GetDbConnection();
                await connection.OpenAsync(); // Open the connection

                var cmd = connection.CreateCommand();
                cmd.CommandText = "dbo.usp_InsertPants";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = _dataContext.Database.GetDbConnection();

                cmd.Parameters.Add(new SqlParameter("@p_Price", SqlDbType.Float) { Value = ap.Price });
                cmd.Parameters.Add(new SqlParameter("@p_Image", SqlDbType.VarChar, 100) { Value = ap.Image });
                cmd.Parameters.Add(new SqlParameter("@p_Name", SqlDbType.VarChar, 100) { Value = ap.Name });
                cmd.Parameters.Add(new SqlParameter("@p_Description", SqlDbType.Text) { Value = ap.Description });
                cmd.Parameters.Add(new SqlParameter("@p_Discount", SqlDbType.TinyInt) { Value = ap.Discount });
                cmd.Parameters.Add(new SqlParameter("@p_FabricName", SqlDbType.VarChar, 100) { Value = ap.FabricName });
                cmd.Parameters.Add(new SqlParameter("@p_color", SqlDbType.VarChar, 100) { Value = ap.Color });
                cmd.Parameters.Add(new SqlParameter("@p_Type", SqlDbType.VarChar, 20) { Value = ap.Type });
                cmd.Parameters.Add(new SqlParameter("@p_Pocket", SqlDbType.VarChar, 100) { Value = ap.Pocket });
                cmd.Parameters.Add(new SqlParameter("@p_Fit", SqlDbType.VarChar, 100) { Value = ap.Fit });
                cmd.Parameters.Add(new SqlParameter("@p_Cuff", SqlDbType.VarChar, 100) { Value = ap.Cuff });
                cmd.Parameters.Add(new SqlParameter("@p_Fastening", SqlDbType.VarChar, 100) { Value = ap.Fastening });
                cmd.Parameters.Add(new SqlParameter("@p_Pleats", SqlDbType.VarChar, 100) { Value = ap.Pleats });

                await cmd.ExecuteNonQueryAsync();
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the pants.", ex);
            }
        }



    }
}
