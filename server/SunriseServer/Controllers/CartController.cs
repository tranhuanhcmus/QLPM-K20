using System.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServerCore.Dtos;
using SunriseServer.Services.CartService;
using SunriseServerCore.Common.Enum;
using SunriseServerCore.Dtos.Cart;
using System.Security.Claims;
using SunriseServer.Common.Helper;


namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContext;
        readonly ICartService _cartService;

        public CartController(IHttpContextAccessor httpContext, ICartService cartService)
        {
            _httpContext = httpContext;
            _cartService = cartService;
        }

        [HttpGet(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<List<GetCartDto>>> GetCart()
        {
            // try
            // {
                var userId = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);
                var result = await _cartService.GetCart(userId);

                var result2 = result.ToList();
                var finalResult = new List<GetCartDto>();
                foreach (var item in result2) // note: chuyen data tu cac attribute vao 1 obj moi
                {
                    var myItem = new ProductDto() {};
                    Console.WriteLine("Vo co lo: ", item.Name, item.Image);
                    SetPropValueByReflection.AddYToX(myItem, item);
                    var tempDto = new GetCartDto() {
                        Item = myItem,
                        Quantity = item.Quantity
                    };
                    finalResult.Append(tempDto);
                }

                if (result.Count() == 0)
                    return NotFound("No item in cart");

                return Ok(result);
            // }
            // catch (Exception e)
            // {
            //     return BadRequest($"Cannot find cart {e.Message}");
            // }
        }

        [HttpPost(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseMessageDetails<int>>> AddToCart(AddToCartDto cartDto)
        {
            var result = -1;
            try
            {
                var userId = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);

                if (userId == 0)
                {
                    return BadRequest("Cannot find user, please login again!");
                }

                cartDto.Customer = userId;
                result = await _cartService.AddToCart(cartDto);
            } catch(Exception)
            {
                return BadRequest("Cannot add item to cart");
            }
            
            if (result == -1)
                return NotFound("Cannot add product to cart.");

            return Ok(new ResponseMessageDetails<int>("Add to cart successfully", result));
        }

        [HttpDelete("item"), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseDetails>> DeleteProductInCart(int productId)
        {
            try
            {
                var userId = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);

                if (userId == 0)
                {
                    return BadRequest("Cannot find user, please login again!");
                }

                var result = await _cartService.DeleteProductInCart(new DeleteProductCartDto()
                {
                    AccountId = userId,
                    ProductId = productId
                });

                if (result == 0)
                    return NotFound("Cannot delete product from your cart");

                return Ok(new ResponseDetails(ResponseStatusCode.Ok, "Delete item successfully"));
            }
            catch
            {
                return BadRequest("Cannot delete item from cart");
            }
        }
        
        [HttpPut("item-num"), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseMessageDetails<int>>> ChangeCartItemNum(ChangeItemNumDto itemDto)
        {
            var userId = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);

            if (userId == 0)
            {
                return BadRequest("Cannot find user, please login again!");
            }

            itemDto.AccountId = userId;
            var result = await _cartService.ChangeCartItemNum(itemDto);
            
            if (result == -1)
                return NotFound("Cannot change cart item number.");

            return Ok(new ResponseMessageDetails<int>("Change cart item number successfully", result));
        }

        [HttpDelete(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseMessageDetails<int>>> ClearCart()
        {
            var userId = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);

            if (userId == 0)
            {
                return BadRequest("Cannot find user, please login again!");
            }

            var result = await _cartService.ClearCart(userId);
            
            if (result == 0)
                return NotFound("Cannot clear cart.");

            return Ok(new ResponseMessageDetails<int>("Clear cart successfully", result));
        }

    }
}
