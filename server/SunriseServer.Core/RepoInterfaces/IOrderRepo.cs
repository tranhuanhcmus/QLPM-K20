using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Order;

namespace SunriseServerCore.RepoInterfaces 
{
    public interface IOrderRepo
    {
        // Task<GetOrderDto> GetOrderByIdAsync(int orderId);
        Task<List<GetOrderDto>> GetAccountOrderByIdAsync(int accountId);
        Task<Order> GetOrderInfoByIdAsync(int orderId);
        Task<List<OrderDetail>> GetOrderItemByIdAsync(int orderId);
        Task<List<int>> GetOrdersAsync();
        Task<int> AddOrderAsync(int accountId, GetOrderDto order);
        Task<int> UpdateOrderUserAsync(int accountId, GetOrderDto orderDto);
        Task<int> DeleteOrderAsync(int accountId, int orderId);
    }
}