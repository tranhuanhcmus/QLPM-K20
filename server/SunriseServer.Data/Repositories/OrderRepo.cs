using SunriseServerCore.Models;
using SunriseServerCore.RepoInterfaces;
using System.Text;

namespace SunriseServerData.Repositories
{
    public class OrderRepo : IOrderRepo
    {
        readonly DataContext _dataContext;

        public OrderRepo(DataContext dataContext)
        {
            _dataContext = dataContext;  
        }

        public async Task<Order> AddOrderAsync(Order order)
        {
            var builder = new StringBuilder("EXEC USP_AddOrder @OrderDetails");
            return await _dataContext.Set<Order>()
                                        .FromSqlRaw(builder.ToString(), order)
                                        .FirstOrDefaultAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int orderId)
        {
            var builder = new StringBuilder($"EXEC USP_GetOrder {orderId}");
            return await _dataContext.Set<Order>()
                                .FromSqlRaw(builder.ToString())
                                .FirstOrDefaultAsync();
        }

        public async Task<List<Order>> GetOrdersAsync()
        {
            var builder = new StringBuilder("EXEC USP_GetOrders");
            return await _dataContext.Set<Order>()
                                .FromSqlRaw(builder.ToString())
                                .ToListAsync();
        }

        public async Task<Order> UpdateOrderAsync(Order order)
        {
            var builder = new StringBuilder("EXEC USP_UpdateOrder @OrderDetails");
            return await _dataContext.Set<Order>()
                                .FromSqlRaw(builder.ToString(), order)
                                .FirstOrDefaultAsync();
        }

        public async Task<int> DeleteOrderAsync(int orderId)
        {
            var builder = new StringBuilder($"EXEC USP_DeleteOrder {orderId}");
            return await _dataContext.Database.ExecuteSqlRawAsync(builder.ToString());
        }
    }

}