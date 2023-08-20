using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Cart;
using SunriseServerCore.Dtos.Product;


namespace SunriseServerCore.RepoInterfaces
{
    public interface ICartRepo
    {
        Task<int> AddToCartAsync(int accountId, ProductWithQuantityDto cartDto);
        Task<List<Product>> GetListProduct(string productId);
        Task<List<GetRawCartDto>> GetCart(int accountId);
        Task<int> DeleteProductInCart(DeleteProductCartDto deleteDto);
        Task<int> ClearCartAsync(int AccountId);
        Task<int> ChangeCartItemNumAsync(ChangeItemNumDto itemDto);
    }
}
