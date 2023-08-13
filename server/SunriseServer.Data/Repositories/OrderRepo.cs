using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SunriseServerCore.Models;  
using SunriseServerCore.RepoInterfaces;
using SunriseServerData;

namespace SunriseServerData.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataContext _context;

        public OrderRepository(DataContext context)
        {
            _context = context;  
        }

        public async Task<Order> AddOrderAsync(Order order)
        {
            var builder = new StringBuilder("EXEC USP_AddOrder @OrderDetails");
            return await _context.Set<Order>()
                                        .FromSqlRaw(builder.ToString(), order)
                                        .FirstOrDefaultAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int orderId)
        {
            var builder = new StringBuilder($"EXEC USP_GetOrder {orderId}");
            return await _context.Set<Order>()
                                .FromSqlRaw(builder.ToString())
                                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            var builder = new StringBuilder("EXEC USP_GetOrders");
            return await _context.Set<Order>()
                                .FromSqlRaw(builder.ToString())
                                .ToListAsync();
        }

        public async Task UpdateOrderAsync(Order order)
        {
            var builder = new StringBuilder("EXEC USP_UpdateOrder @OrderDetails");
            await _context.Database.ExecuteSqlRawAsync(builder.ToString(), order);
        }

        public async Task DeleteOrderAsync(int orderId)
        {
            var builder = new StringBuilder($"EXEC USP_DeleteOrder {orderId}");
            await _context.Database.ExecuteSqlRawAsync(builder.ToString());
        }
    }

}