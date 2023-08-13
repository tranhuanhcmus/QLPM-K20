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

        public OrderService(UnitOfWork unitOfWork)
        {
            _httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        public async Task<Order> CreateOrder(Order order)
        {
            await _unitOfWork.OrderRepo.AddAsync(order);
            await _unitOfWork.CompleteAsync();

            return order;
        }

        public async Task<Order> GetOrder(int orderId)
        {
            return await _unitOfWork.OrderRepo.GetByIdAsync(orderId);
        }

        public async Task<IEnumerable<Order>> GetOrders()
        {
            return await _unitOfWork.OrderRepo.ListAllAsync();
        }

        public async Task<Order> UpdateOrder(Order order)
        {
            _unitOfWork.OrderRepo.Update(order);
            await _unitOfWork.CompleteAsync();

            return order;
        }

        public async Task DeleteOrder(int orderId)
        {
            var order = await GetOrder(orderId);
            _unitOfWork.OrderRepo.Delete(order);
            await _unitOfWork.CompleteAsync();
        }
    }
}