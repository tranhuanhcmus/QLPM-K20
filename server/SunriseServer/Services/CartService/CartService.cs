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
        
    }
}
