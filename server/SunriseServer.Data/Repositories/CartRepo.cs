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


namespace SunriseServerData.Repositories
{
    public class CartRepo : ICartRepo
    {
        readonly DataContext _dataContext;

        public CartRepo(DataContext dataContext) {
            _dataContext = dataContext;
        }

        // giỏ hàng: thêm sp, giảm sl, xóa sp, clear giỏ hàng (clear all), lấy giỏ hàng, cập nhật giỏ hàng (put) (Cường)

        public async Task<int> AddToCartAsync(AddToCartDto cartDto)
        {
            var builder = new StringBuilder("DECLARE @result INT = 0;\n");
            builder.Append($"EXEC @result = USP_AddToCart {cartDto.Product}, {cartDto.Customer}, {cartDto.NumberOfProduct};\n");
            builder.Append($"SELECT @result;");

            Console.WriteLine(builder.ToString());

            var result = await _dataContext.Set<MyProcedureResult>()
                .FromSqlInterpolated($"EXECUTE({builder.ToString()});")
                .ToListAsync();
            
            return (result.FirstOrDefault()).MyValue;
        }

        public async Task<IEnumerable<GetCartDto>> GetCart(int accountId)
        {
            var builder = new StringBuilder();
            builder.Append($"EXEC USP_GetCart {accountId};");

            Console.WriteLine(builder.ToString());

            return await _dataContext.Set<GetCartDto>()
                .FromSqlInterpolated($"EXECUTE({builder.ToString()});")
                .ToListAsync();
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
