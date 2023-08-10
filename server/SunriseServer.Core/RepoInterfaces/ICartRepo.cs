using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Cart;

namespace SunriseServerCore.RepoInterfaces
{
    public interface ICartRepo
    {
        Task<int> AddToCartAsync(AddToCartDto cartDto);
    }
}
