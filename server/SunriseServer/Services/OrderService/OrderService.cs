using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;
using SunriseServerCore.Dtos.Order;


namespace SunriseServer.Services.OrderService
{
    public class OrderService : IOrderService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UnitOfWork _unitOfWork;

        public OrderService(IHttpContextAccessor httpContextAccessor, UnitOfWork unitOfWork)
        {
            _httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> AddOrder(int accountId, AddOrderDto order)
        {
            return await _unitOfWork.OrderRepo.AddOrderAsync(accountId, order);
        }

        public async Task<List<GetOrderDto>> GetAccountOrders(int accountId)
        {
            return await _unitOfWork.OrderRepo.GetAccountOrderByIdAsync(accountId);
        }

        public async Task<List<Order>> GetOrders()
        {
            return await _unitOfWork.OrderRepo.GetOrdersAsync();
        }

        public async Task<int> UpdateOrderUser(int accountId, UserUpdateOrderDto orderDto)
        {
            return await _unitOfWork.OrderRepo.UpdateOrderUserAsync(accountId, orderDto);
        }

        public async Task<int> DeleteOrder(int accountId, int orderId)
        {            
            return await _unitOfWork.OrderRepo.DeleteOrderAsync(accountId, orderId);
        }
    }
}