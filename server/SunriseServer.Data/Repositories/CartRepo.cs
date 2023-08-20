using Microsoft.Identity.Client;
using SunriseServerCore.Models;
using SunriseServerCore.RepoInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SunriseServer.Common.Helper;
using SunriseServerCore.Dtos.Cart;
using SunriseServerCore.Dtos;
using System.Security.Cryptography.X509Certificates;
using SunriseServerCore.Dtos.Product;

namespace SunriseServerData.Repositories
{
    public class CartRepo : ICartRepo
    {
        readonly DataContext _dataContext;

        public CartRepo(DataContext dataContext) {
            _dataContext = dataContext;
        }

        public async Task<int> AddToCartAsync(int accountId, ProductWithQuantityDto cartDto)
        {
            var builder = new StringBuilder("DECLARE @result INT = 0;\n");
            builder.Append($"EXEC @result = USP_AddToCart @Customer={accountId}, @Product={cartDto.Item.Id}, @NumberOfProduct={cartDto.Quantity};\n");
            builder.Append($"SELECT @result;");

            Console.WriteLine(builder.ToString());

            var result = await _dataContext.Set<MyProcedureResult>()
                .FromSqlInterpolated($"EXECUTE({builder.ToString()});")
                .ToListAsync();
            
            return (result.FirstOrDefault()).MyValue;
        }

        public async Task<int> ClearCartAsync(int AccountId)
        {
            var result = await _dataContext.Database
                .ExecuteSqlInterpolatedAsync($"EXECUTE USP_ClearCart @Customer={AccountId};");
            
            return result;
        }

        public async Task<int> ChangeCartItemNumAsync(ChangeItemNumDto itemDto)
        {
            var result = await _dataContext.Database
                .ExecuteSqlInterpolatedAsync($"EXEC USP_ChangeCartItemNum @Customer={itemDto.AccountId}, @Product={itemDto.ProductId}, @NumChange={itemDto.Number};");
            
            return result;
        }
        
        // USP_GetProd
        public async Task<List<Product>> GetListProduct(string productId)
        {
            var prod = await _dataContext.Set<Product>()
                .FromSqlInterpolated($"EXEC USP_GetProd {productId};")
                .ToListAsync();
            
            return prod;
        }

        public async Task<List<GetRawCartDto>> GetCart(int accountId)
        {
            var builder = new StringBuilder();
            builder.Append($"EXEC USP_GetCart {accountId};");

            var result = await _dataContext.Set<GetRawCartDto>()
                .FromSqlInterpolated($"EXECUTE({builder.ToString()});")
                .ToListAsync();
            
            return result;
        }

        public async Task<int> DeleteProductInCart(DeleteProductCartDto deleteDto)
        {
            var builder = new StringBuilder();
            builder.Append($"EXEC USP_DeleteProductInCart {deleteDto.AccountId}, {deleteDto.ProductId};");

            Console.WriteLine(builder.ToString());

            return await _dataContext.Database.ExecuteSqlInterpolatedAsync($"EXECUTE({builder.ToString()});");
        }
    }
}
