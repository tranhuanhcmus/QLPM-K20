using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using SunriseServerCore.Common.Enum;
using SunriseServerCore.Dtos;
using SunriseServer.Services.OrderService;  
using SunriseServerCore.Dtos.Order;

namespace SunriseServer.Controllers
{

    [ApiController]
    [Route("api/order")]
    public class OrderController : ControllerBase
    {

        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateOrder(CreateOrderDto createOrderDto)
        {
            var order = await _orderService.CreateOrder(createOrderDto);

            return Ok(new ResponseMessageDetails<OrderDto>("Order created successfully", order));
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _orderService.GetOrders();

            var response = new ResponseMessageDetails<List<OrderDto>>("Orders retrieved successfully", orders); 

            return Ok(new ResponseMessageDetails<List<OrderDto>>("Orders retrieved successfully", orders));  
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetOrder(int id)
        {
            var order = await _orderService.GetOrder(id);

            if (order == null)
            {
                return NotFound(new ResponseDetails(ResponseStatusCode.NotFound, "Order not found"));
            }

            return Ok(new ResponseMessageDetails<OrderDto>("Order details retrieved", order));
        }

        [HttpPut]
        [Authorize]  
        public async Task<IActionResult> UpdateOrder(UpdateOrderDto updateOrderDto)
        {
            var order = await _orderService.UpdateOrder(updateOrderDto);

            return Ok(new ResponseMessageDetails<OrderDto>("Order updated successfully", order));
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteOrder(int id) 
        {
            await _orderService.DeleteOrder(id);

            return NoContent();
        }
    }
}