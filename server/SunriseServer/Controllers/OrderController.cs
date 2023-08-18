using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServerCore.Dtos;
using SunriseServer.Services.OrderService;
using SunriseServer.Common.Constant;
using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Order;
using System.Security.Claims;

namespace SunriseServer.Controllers
{

    [ApiController]
    [Route("api/order")]
    public class OrderController : ControllerBase
    {

        private readonly IHttpContextAccessor _httpContext;
        private readonly IOrderService _orderService;

        public OrderController(IHttpContextAccessor httpContext, IOrderService orderService)
        {
            _httpContext = httpContext;
            _orderService = orderService;
        }

        [HttpGet(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<List<GetOrderDto>>> GetOrder()
        {
            var id = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);
            if (id == 0)
            {
                return NotFound("Cannot find user, please login again!");
            }

            try {
                var result = await _orderService.GetAccountOrders(id);

                if (result == null) {
                    return NotFound("Order not found");
                }

                return Ok(result);
            }
            catch (Exception e) {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("all"), Authorize(Roles = GlobalConstant.Admin)] // check
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

        [HttpPost(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseMessageDetails<int>>> AddOrder(AddOrderDto order)
        {
            try {
                var userId = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);
                var result = await _orderService.AddOrder(userId, order);

                if (result == 0) {
                    return NotFound("Cannot add order");
                }

                return Ok(new ResponseMessageDetails<int>("Order created successfully", result));
            }
            catch (Exception e) {
                return BadRequest($"Cannot create order: {e.Message}");
            }
        }

        [HttpPut(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<IActionResult> UpdateOrderuser(UserUpdateOrderDto orderDto)
        {
            try {
                var accountId = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);
                if (accountId == 0)
                {
                    return NotFound("Cannot find user, please login again!");
                }

                var result = await _orderService.UpdateOrderUser(accountId, orderDto);

                if (result == 0) {
                    return NotFound("Cannot update order");
                }

                return Ok(new ResponseMessageDetails<int>("Order updated successfully", result));
            }
            catch (Exception e) {
                return BadRequest($"Cannot update order: {e.Message}");
            }
        }

        [HttpDelete(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseMessageDetails<int>>> DeleteOrder(int orderId)
        {
            var accountId = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);
            if (accountId == 0)
            {
                return NotFound("Cannot find user, please login again!");
            }

            try {
                var result = await _orderService.DeleteOrder(accountId, orderId);
                if (result == 0)
                {
                    return BadRequest("Delete order failed");
                }

                return Ok(new ResponseMessageDetails<int>("Delete order successfully", 1));
            }
            catch (Exception e) {
                return BadRequest($"Cannot delete order: {e.Message}");
            }
        }
    }
}