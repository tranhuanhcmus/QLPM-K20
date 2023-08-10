using System.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServerCore.Dtos;
using SunriseServer.Services.CartService;
using SunriseServerCore.Common.Enum;
using SunriseServerCore.Dtos.Cart;
using System.Security.Claims;

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

        [HttpPost("")] // , Authorize(Roles = GlobalConstant.User)
        public async Task<ActionResult<ResponseMessageDetails<int>>> AddToCart(AddToCartDto cartDto)
        {
            var result = await _cartService.AddToCart(cartDto);
            
            if (result == -1)
                return NotFound("Cannot add product to cart.");

            return Ok(new ResponseMessageDetails<int>("Add to cart successfully", result));
        }

        [HttpGet(""), Authorize(Roles = GlobalConstant.User)]
        public async Task<ActionResult<ResponseMessageDetails<GetCartDto>>> GetCart()
        {
            try
            {
                var userId = Convert.ToInt32(_httpContext.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value);
                var result = await _cartService.GetCart(userId);

                if (result.Count() == 0)
                    return NotFound("No item in cart");

                return Ok(new ResponseMessageDetails<IEnumerable<GetCartDto>>("Get cart successfully", result));
            }
            catch
            {
                return BadRequest("Cannot find cart");
            }
        }
        [HttpPut("item-num")] // , Authorize(Roles = GlobalConstant.User)
        public async Task<ActionResult<ResponseMessageDetails<int>>> ChangeCartItemNum(ChangeItemNumDto itemDto)
        {
            var result = await _cartService.ChangeCartItemNum(itemDto);
            
            if (result == -1)
                return NotFound("Cannot change cart item number.");

            return Ok(new ResponseMessageDetails<int>("Change cart item number successfully", result));
        }

        [HttpDelete("")] // , Authorize(Roles = GlobalConstant.User)
        public async Task<ActionResult<ResponseMessageDetails<int>>> ClearCart(int AccountId)
        {
            var result = await _cartService.ClearCart(AccountId);
            
            if (result == 0)
                return NotFound("Cannot clear cart.");

            return Ok(new ResponseMessageDetails<int>("Clear cart successfully", result));
        }

    }
}
