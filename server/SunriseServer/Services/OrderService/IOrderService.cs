using SunriseServerData;
using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Order;

namespace SunriseServer.Services.OrderService  
{
    public interface IOrderService
    {
        Task<int> AddOrder(int accountId, GetOrderDto order);
        Task<List<GetOrderDto>> GetAccountOrders(int accountId);
        Task<List<GetOrderDto>> GetOrders();
        Task<int> UpdateOrderUser(int accountId, GetOrderDto orderDto);
        Task<int> DeleteOrder(int accountId, int orderId);
    }
}