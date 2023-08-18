using SunriseServerCore.Models;

namespace SunriseServerCore.RepoInterfaces 
{
    public interface IOrderRepo
    {
        Task<Order> GetOrderByIdAsync(int id);
        Task<List<Order>> GetOrdersAsync();
        Task<Order> AddOrderAsync(Order order);
        Task<Order> UpdateOrderAsync(int id, Order order);
        Task<int> DeleteOrderAsync(int id);
    }
}