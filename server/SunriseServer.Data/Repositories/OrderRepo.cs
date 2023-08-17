using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SunriseServerCore.Models;  
using SunriseServerCore.RepoInterfaces;
using SunriseServerCore.Dtos.Order;
using SunriseServerData;

namespace SunriseServerData.Repositories
{
    public class OrderRepo : IOrderRepo
    {
        readonly DataContext _dataContext;

        public OrderRepo(DataContext dataContext)
        {
            _dataContext = context;  
        }

        public async Task<Order> AddOrderAsync(GetCartDto orderDto)
        {
            var builder = new StringBuilder("EXEC USP_AddOrder @OrderDetails");
            return await _dataContext.Set<Order>()
                                        .FromSqlRaw(builder.ToString(), orderDto)
                                        .FirstOrDefaultAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int orderId)
        {
            var builder = new StringBuilder($"EXEC USP_GetOrder {orderId}");
            return await _dataContext.Set<Order>()
                                .FromSqlRaw(builder.ToString())
                                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            var builder = new StringBuilder("EXEC USP_GetOrders");
            return await _dataContext.Set<Order>()
                                .FromSqlRaw(builder.ToString())
                                .ToListAsync();
        }

        public async Task UpdateOrderAsync(UpdateOrderDto orderDto)
        {
            var builder = new StringBuilder("EXEC USP_UpdateOrder @OrderDetails");
            await _dataContext.Database.ExecuteSqlRawAsync(builder.ToString(), orderDto);
        }

        public async Task DeleteOrderAsync(int orderId)
        {
            var builder = new StringBuilder($"EXEC USP_DeleteOrder {orderId}");
            await _dataContext.Database.ExecuteSqlRawAsync(builder.ToString());
        }
    }

}