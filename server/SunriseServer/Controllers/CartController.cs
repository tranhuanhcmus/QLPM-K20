using System.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServer.Dtos;
using SunriseServer.Services.CartService;
using SunriseServerCore.Common.Enum;
using SunriseServerCore.Dtos.Cart;

namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/cart")]
    public class CartController : ControllerBase
    {
        readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpPost("")] // , Authorize(Roles = GlobalConstant.User)
        public async Task<ActionResult<ResponseMessageDetails<int>>> GetCurrentAccount(AddToCartDto cartDto)
        {
            var result = await _cartService.AddToCart(cartDto);
            
            if (result == -1)
                return NotFound("Cannot add product to cart.");

            return Ok(new ResponseMessageDetails<int>("Add to cart successfully", result));
        }

    }
}
