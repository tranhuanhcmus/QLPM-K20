using SunriseServerData;
using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Order;

namespace SunriseServer.Services.OrderService  
{
    public interface IOrderService
    {
        Task<int> AddOrder(int accountId, AddOrderDto order);
        Task<List<GetOrderDto>> GetAccountOrders(int accountId);
        Task<List<Order>> GetOrders();
        Task<int> UpdateOrderUser(int accountId, UserUpdateOrderDto orderDto);
        Task<int> DeleteOrder(int accountId, int orderId);
    }
}