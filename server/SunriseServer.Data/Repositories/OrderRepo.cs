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
            var builder = new StringBuilder("EXEC USP_AddOrder @customer, @PaymentMethod, @TimeOrder, @TimeDone, @Status, @Address, @orderDetail");
            var result = await _dataContext.Set<Order>()
                .FromSqlRaw(builder.ToString(),
                    new
                    {
                        order.Customer,
                        order.PaymentMethod,
                        order.TimeOrder,
                        order.TimeDone,
                        order.Status,
                        order.Address,
                        order.OrderDetails
                    })
                .FirstOrDefaultAsync();
            return result.OrderId != -1 ? result : null;
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            var builder = new StringBuilder($"EXEC USP_GetOrderById {id}");
            return await _dataContext.Set<Order>()
                                .FromSqlRaw(builder.ToString())
                                .FirstOrDefaultAsync();
        }

        public async Task<List<Order>> GetOrdersAsync()
        {
            var builder = new StringBuilder("EXEC USP_GetAllOrders");
            return await _dataContext.Set<Order>()
                                .FromSqlRaw(builder.ToString())
                                .ToListAsync();
        }

        public async Task<Order> UpdateOrderAsync(int id, Order order)
        {
            var builder = new StringBuilder("EXEC USP_UpdateOrder @OrderId, @customer, @PaymentMethod, @TimeOrder, @TimeDone, @Status, @Address, @orderDetail");
            var result = await _dataContext.Set<Order>()
                .FromSqlRaw(builder.ToString(),
                    new
                    {
                        id,
                        order.Customer,
                        order.PaymentMethod,
                        order.TimeOrder,
                        order.TimeDone,
                        order.Status,
                        order.Address,
                        order.OrderDetails
                    })
                .FirstOrDefaultAsync();
            return result.OrderId != -1 ? result : null;
        }

        public async Task<int> DeleteOrderAsync(int id)
        {
            var builder = new StringBuilder($"EXEC USP_DeleteOrder {id}");
            return await _dataContext.Database.ExecuteSqlRawAsync(builder.ToString());
        }
    }
}
