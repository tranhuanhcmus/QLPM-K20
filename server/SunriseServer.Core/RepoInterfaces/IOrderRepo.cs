using SunriseServerCore.Models;

namespace SunriseServerCore.RepoInterfaces 
{
    public interface IOrderRepo
    {
        Task<Order> GetOrderByIdAsync(int orderId);
        Task<List<Order>> GetOrdersAsync();
        Task<Order> AddOrderAsync(Order order);
        Task<Order> UpdateOrderAsync(Order order);
        Task<int> DeleteOrderAsync(int orderId);
    }
}