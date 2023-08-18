using SunriseServerData;
using SunriseServerCore.Models;

namespace SunriseServer.Services.OrderService  
{
    public interface IOrderService
    {
        Task<Order> AddOrder(Order order);
        Task<Order> GetOrder(int id);
        Task<List<Order>> GetOrders();
        Task<Order> UpdateOrder(int id, Order order);
        Task<int> DeleteOrder(int id);
    }
}