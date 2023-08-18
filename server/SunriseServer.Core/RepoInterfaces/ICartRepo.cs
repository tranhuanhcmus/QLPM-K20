﻿using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Cart;

namespace SunriseServerCore.RepoInterfaces
{
    public interface ICartRepo
    {
        Task<int> AddToCartAsync(AddToCartDto cartDto);
        Task<List<GetRawCartDto>> GetCart(int accountId);
        Task<int> DeleteProductInCart(DeleteProductCartDto deleteDto);
        Task<int> ClearCartAsync(int AccountId);
        Task<int> ChangeCartItemNumAsync(ChangeItemNumDto itemDto);
    }
}
