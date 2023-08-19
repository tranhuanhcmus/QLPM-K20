using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;
using SunriseServerCore.Dtos.Order;
using SunriseServerCore.Dtos;
using SunriseServer.Common.Helper;


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

        public async Task<int> AddOrder(int accountId, GetOrderDto order)
        {
            return await _unitOfWork.OrderRepo.AddOrderAsync(accountId, order);
        }

        public async Task<List<GetOrderDto>> GetAccountOrders(int accountId)
        {
            var result = await _unitOfWork.OrderRepo.GetAccountOrderByIdAsync(accountId);
            
            for (int index = 0; index < result.Count; index++)
            {
                var prodIdList = await _unitOfWork.OrderRepo.GetOrderItemByIdAsync(result[index].OrderId);
                var prodList = await _unitOfWork.CartRepo.GetListProduct(string.Join(',', prodIdList.Select(x => x.ProductId)));
                var OrderItem = new List<ProductWithQuantityDto>();

                for (int i = 0; i < prodIdList.Count; i++)
                {
                    OrderItem.Add(new ProductWithQuantityDto() {
                        Item = prodList[i],
                        Quantity = prodIdList[i].Quantity,
                    });
                }

                result[index].OrderItem = OrderItem;
            }

            return result;
        }

        public async Task<List<GetOrderDto>> GetOrders()
        {
            var idList = await _unitOfWork.OrderRepo.GetOrdersAsync();

            var result = new List<GetOrderDto>();
            for (int index = 0; index < idList.Count; index++)
            {
                var item = new GetOrderDto() {
                    OrderItem = new List<ProductWithQuantityDto>()
                };

                var orderinfo = await _unitOfWork.OrderRepo.GetOrderInfoByIdAsync(idList[index]);
                var prodIdList = await _unitOfWork.OrderRepo.GetOrderItemByIdAsync(idList[index]);
                var prodList = await _unitOfWork.CartRepo.GetListProduct(string.Join(',', prodIdList.Select(x => x.ProductId)));
                var OrderItem = new List<ProductWithQuantityDto>();

                for (int i = 0; i < prodIdList.Count; i++)
                {
                    item.OrderItem.Add(new ProductWithQuantityDto() {
                        Item = prodList[i],
                        Quantity = prodIdList[i].Quantity,
                    });
                }

                SetPropValueByReflection.AddYToX(item, orderinfo);
                result.Add(item);
            }

            return result;
        }

        public async Task<int> UpdateOrderUser(int accountId, GetOrderDto orderDto)
        {
            return await _unitOfWork.OrderRepo.UpdateOrderUserAsync(accountId, orderDto);
        }

        public async Task<int> DeleteOrder(int accountId, int orderId)
        {            
            return await _unitOfWork.OrderRepo.DeleteOrderAsync(accountId, orderId);
        }
    }
}