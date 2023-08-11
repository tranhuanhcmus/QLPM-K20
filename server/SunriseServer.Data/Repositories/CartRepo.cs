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

    }
}
