using SunriseServerData;
using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Cart;

namespace SunriseServer.Services.CartService
{
    public interface ICartService
    {
        Task<int> AddToCart(AddToCartDto cartDto);
        Task<List<GetRawCartDto>> GetCart(int accountId);
        Task<int> DeleteProductInCart(DeleteProductCartDto deleteDto);
        Task<int> ClearCart(int AccountId);
        Task<int> ChangeCartItemNum(ChangeItemNumDto itemDto);
    }
}
