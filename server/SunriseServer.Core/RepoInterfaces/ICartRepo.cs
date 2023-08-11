using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Cart;

namespace SunriseServerCore.RepoInterfaces
{
    public interface ICartRepo
    {
        Task<int> AddToCartAsync(AddToCartDto cartDto);
        Task<IEnumerable<GetCartDto>> GetCart(int accountId);
        Task<int> DeleteProductInCart(DeleteProductCartDto deleteDto);
    }
}
