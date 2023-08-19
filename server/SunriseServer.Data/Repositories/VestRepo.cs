﻿using System.Data;
using System.Text;
using Microsoft.Data.SqlClient;
using SunriseServer.Common.Constant;
using SunriseServerCore.Dtos;
using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using SunriseServerCore.RepoInterfaces;

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

        public async Task<List<Product>> GetAllSpecial()
        {
            var allVest = await _dataContext.Product.Where(p => p.Type == GlobalConstant.VestProduct).ToListAsync();
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

            Product productInfor = _dataContext.Product.Find(id);

            VestDetail result = new VestDetail(productInfor);


            var builder = new StringBuilder();
            builder.Append($"EXEC USP_GetDetailVestByID {id};");
            VestComponent component = _dataContext.Set<VestComponent>()
                .FromSqlInterpolated($"EXECUTE({builder.ToString()});")
                .ToList().FirstOrDefault();

            result.Component = component;

            return result;
        }

        public async Task<ImageDto> GetImageByCustom(string fabric, VestComponent vest) 
        {
            var builder = new StringBuilder();
            builder.AppendFormat("EXEC USP_GetCustomVestImage @p_Fabric='{0}', @p_Style='{1}', @p_vType='{2}', @p_Lapel='{3}', @p_Edge='{4}', @p_BreastPocket='{5}', @p_FrontPocket='{6}';",
                fabric, vest.Style, vest.Type, vest.Lapel, vest.Edge, vest.BreastPocket, vest.FrontPocket);

            var result = await _dataContext.Set<ImageDto>()
                .FromSqlInterpolated($"EXECUTE({builder.ToString()});")
                .ToListAsync();
                
            return result.FirstOrDefault();
        }

        // -----------------//
        //    CRUD area     //
        // -----------------//
        
        public async Task<bool> DeleteVest(int id) {

            try
            {
                Vest vest = await _dataContext.Vest.FindAsync(id) ?? throw new DataException("404 - Vest not found");
                _dataContext.Vest.Remove(vest);
                _dataContext.SaveChanges();
            }
            catch (DataException ex)
            {
                //Log the error (uncomment dex variable name and add a line here to write a log.
                throw new Exception("An error occurred while removing the Vest.", ex);
            }
            return true;
        }

        public async Task<bool> UpdateVest(int vestId, VestComponent updatedVest)
        {
            // check if user entered wrong id
            ProductRepo pr = new ProductRepo(_dataContext);
            if (!pr.IsExist(vestId, GlobalConstant.VestProduct)) return false;
           
            var builder = new StringBuilder();
            builder.AppendFormat("EXEC USP_UpdateVest @vestId={0}, @p_Style='{1}', @p_vType='{2}', @p_Lapel='{3}', @p_Edge='{4}', @p_BreastPocket='{5}', @p_FrontPocket='{6}';",
                    vestId, updatedVest.Style, updatedVest.Type, updatedVest.Lapel, updatedVest.Edge, updatedVest.BreastPocket, updatedVest.FrontPocket);

            int result = await _dataContext.Database.ExecuteSqlInterpolatedAsync($"EXECUTE({builder.ToString()});");

            return result == 1;

        }
        public async Task<bool> AddVest(AddVestDto av)
        {
            try
            {
                var connection = _dataContext.Database.GetDbConnection();
                await connection.OpenAsync(); // Open the connection

                var cmd = connection.CreateCommand();
                cmd.CommandText = "dbo.usp_InsertVest";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Connection = _dataContext.Database.GetDbConnection();

                cmd.Parameters.Add(new SqlParameter("@p_Price", SqlDbType.Float) { Value = av.Price });
                cmd.Parameters.Add(new SqlParameter("@p_Image", SqlDbType.VarChar, 255) { Value = av.Image });
                cmd.Parameters.Add(new SqlParameter("@p_ImageFront", SqlDbType.VarChar, 255) { Value = av.Image });
                cmd.Parameters.Add(new SqlParameter("@p_ImageBack", SqlDbType.VarChar, 255) { Value = av.Image });
                cmd.Parameters.Add(new SqlParameter("@p_Name", SqlDbType.VarChar, 100) { Value = av.Name });
                cmd.Parameters.Add(new SqlParameter("@p_Description", SqlDbType.Text) { Value = av.Description });
                cmd.Parameters.Add(new SqlParameter("@p_Discount", SqlDbType.TinyInt) { Value = av.Discount });
                cmd.Parameters.Add(new SqlParameter("@p_FabricName", SqlDbType.VarChar, 100) { Value = av.FabricName });
                cmd.Parameters.Add(new SqlParameter("@p_color", SqlDbType.VarChar, 100) { Value = av.Color });
                cmd.Parameters.Add(new SqlParameter("@p_Type", SqlDbType.VarChar, 20) { Value = av.Type });
                cmd.Parameters.Add(new SqlParameter("@p_Style", SqlDbType.VarChar, 100) { Value = av.Style });
                cmd.Parameters.Add(new SqlParameter("@p_vType", SqlDbType.VarChar, 100) { Value = av.Type });
                cmd.Parameters.Add(new SqlParameter("@p_Lapel", SqlDbType.VarChar, 100) { Value = av.Lapel });
                cmd.Parameters.Add(new SqlParameter("@p_Edge", SqlDbType.VarChar, 100) { Value = av.Edge });
                cmd.Parameters.Add(new SqlParameter("@p_BreastPocket", SqlDbType.VarChar, 100) { Value = av.BreastPocket });
                cmd.Parameters.Add(new SqlParameter("@p_FrontPocket", SqlDbType.VarChar, 100) { Value = av.FrontPocket });

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
