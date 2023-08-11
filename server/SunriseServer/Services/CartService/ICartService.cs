using SunriseServerData;
using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Cart;

namespace SunriseServer.Services.CartService
{
    public interface ICartService
    {
        Task<int> AddToCart(AddToCartDto cartDto);
        Task<IEnumerable<GetCartDto>> GetCart(int accountId);
    }
}
