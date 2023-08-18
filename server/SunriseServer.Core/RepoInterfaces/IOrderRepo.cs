using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Order;

namespace SunriseServerCore.RepoInterfaces 
{
    public interface IOrderRepo
    {
        Task<GetOrderDto> GetOrderByIdAsync(int orderId);
        Task<List<GetOrderDto>> GetAccountOrderByIdAsync(int accountId);
        Task<List<Order>> GetOrdersAsync();
        Task<int> AddOrderAsync(int accountId, AddOrderDto order);
        Task<int> UpdateOrderUserAsync(int accountId, UserUpdateOrderDto orderDto);
        Task<int> DeleteOrderAsync(int accountId, int orderId);
    }
}