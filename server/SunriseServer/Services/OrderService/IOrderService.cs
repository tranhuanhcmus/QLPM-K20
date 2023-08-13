using SunriseServerData;
using SunriseServerCore.Models;

namespace SunriseServer.Services.OrderService  
{
    public interface IOrderService
    {
        Task<Order> CreateOrder(Order order);
        Task<Order> GetOrder(int orderId);
        Task<IEnumerable<Order>> GetOrders();
        Task<Order> UpdateOrder(Order order);
        Task DeleteOrder(int orderId);
    }
}