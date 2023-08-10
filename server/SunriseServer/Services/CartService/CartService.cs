using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;
using SunriseServerCore.Dtos.Cart;

namespace SunriseServer.Services.CartService
{
    public class CartService : ICartService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UnitOfWork _unitOfWork;
        public CartService(IHttpContextAccessor httpContextAccessor, UnitOfWork unitOfWork)
        {
            _httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        public async Task<int> AddToCart(AddToCartDto cartDto)
        {
            var result = await _unitOfWork.CartRepo.AddToCartAsync(cartDto);
            return result;
        }

        public async Task<IEnumerable<GetCartDto>> GetCart(int accountId)
        {
            return await _unitOfWork.CartRepo.GetCart(accountId);
        }

        public async Task<int> ClearCart(int AccountId)
        {
            var result = await _unitOfWork.CartRepo.ClearCartAsync(AccountId);
            return result;
        }

        // ChangeItemNumDto
        public async Task<int> ChangeCartItemNum(ChangeItemNumDto itemDto)
        {
            var result = await _unitOfWork.CartRepo.ChangeCartItemNumAsync(itemDto);
            return result;
        }
    }
}
