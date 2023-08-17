using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;

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

        public async Task<Order> AddOrder(Order order)
        {
            return await _unitOfWork.OrderRepo.AddOrderAsync(order);
        }

        public async Task<Order> GetOrder(int orderId)
        {
            return await _unitOfWork.OrderRepo.GetOrderByIdAsync(orderId);
        }

        public async Task<List<Order>> GetOrders()
        {
            return await _unitOfWork.OrderRepo.GetOrdersAsync();
        }

        public async Task<Order> UpdateOrder(Order order)
        {
            return await _unitOfWork.OrderRepo.UpdateOrderAsync(order);
        }

        public async Task<int> DeleteOrder(int orderId)
        {            
            return await _unitOfWork.OrderRepo.DeleteOrderAsync(orderId);
        }
    }
}