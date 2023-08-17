using SunriseServerData;
using SunriseServerCore.Models;

namespace SunriseServer.Services.OrderService  
{
    public interface IOrderService
    {
        Task<Order> AddOrder(Order order);
        Task<Order> GetOrder(int orderId);
        Task<List<Order>> GetOrders();
        Task<Order> UpdateOrder(Order order);
        Task<int> DeleteOrder(int orderId);
    }
}