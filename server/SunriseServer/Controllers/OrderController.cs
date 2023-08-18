using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServerCore.Dtos;
using SunriseServer.Services.OrderService;
using SunriseServerCore.Common.Enum;
using SunriseServerCore.Models;

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
        public async Task<ActionResult> AddOrder(Order order)
        {
            try {
                var result = await _orderService.AddOrder(order);

                if (result == null) {
                    return NotFound("Cannot add order");
                }

                return Ok(new ResponseMessageDetails<Order>("Order created successfully", result));
            }
            catch (Exception) {
                return BadRequest("Cannot add order");
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetOrders()
        {
            try {
                var result = await _orderService.GetOrders();

                if (result == null) {
                    return NotFound("Cannot get orders");
                }

                return Ok(new ResponseMessageDetails<List<Order>>("Orders retrieved successfully", result));
            }
            catch (Exception) {
                return BadRequest("Cannot get orders");
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetOrder(int id)
        {
            try {
                var result = await _orderService.GetOrder(id);

                if (result == null) {
                    return NotFound("Order not found");
                }

                return Ok(new ResponseMessageDetails<Order>("Order details retrieved", result));
            }
            catch (Exception) {
                return BadRequest("Cannot get order");
            }
        }

        [HttpPut("{id}")]
        [Authorize]  
        public async Task<IActionResult> UpdateOrder(int id, Order order)
        {
            try {
                var result = await _orderService.UpdateOrder(id, order);

                if (result == null) {
                    return NotFound("Cannot update order");
                }

                return Ok(new ResponseMessageDetails<Order>("Order updated successfully", result));
            }
            catch (Exception) {
                return BadRequest("Cannot update order");
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteOrder(int id) 
        {
            try {
                var result = await _orderService.DeleteOrder(id);

                return NoContent();
            }
            catch (Exception) {
                return BadRequest("Cannot get orders");
            }
        }
    }
}