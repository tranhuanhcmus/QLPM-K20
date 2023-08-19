using SunriseServerData;
using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Cart;
using SunriseServerCore.Dtos;

namespace SunriseServer.Services.CartService
{
    public interface ICartService
    {
        Task<int> AddToCart(AddToCartDto cartDto);
        Task<List<ProductWithQuantityDto>> GetCart(int accountId);
        Task<int> DeleteProductInCart(DeleteProductCartDto deleteDto);
        Task<int> ClearCart(int AccountId);
        Task<int> ChangeCartItemNum(ChangeItemNumDto itemDto);
    }
}
