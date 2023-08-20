using SunriseServerData;
using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Cart;
using SunriseServerCore.Dtos.Product;

namespace SunriseServer.Services.CartService
{
    public interface ICartService
    {
        Task<int> AddToCart(int accountId, ProductWithQuantityDto cartDto);
        Task<List<ProductWithQuantityDto>> GetCart(int accountId);
        Task<int> DeleteProductInCart(DeleteProductCartDto deleteDto);
        Task<int> ClearCart(int AccountId);
        Task<int> ChangeCartItemNum(ChangeItemNumDto itemDto);
        Task<int> UpdateAllCart(int accountId, List<ProductWithQuantityDto> updateDto);
    }
}
