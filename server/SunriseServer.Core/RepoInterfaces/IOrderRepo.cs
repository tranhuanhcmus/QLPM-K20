using SunriseServerCore.Models;

namespace SunriseServerCore.RepoInterfaces 
{
    public interface IOrderRepository
    {
        Task<Order> GetOrderByIdAsync(int orderId);
        Task<IEnumerable<Order>> GetOrdersAsync();
        Task<Order> AddOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(int orderId);
    }
}