using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;
using SunriseServerCore.Dtos.Cart;
using SunriseServerCore.Dtos;
using SunriseServerCore.Dtos.Product;

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

        public async Task<int> AddToCart(int accountId, ProductWithQuantityDto cartDto)
        {
            var result = await _unitOfWork.CartRepo.AddToCartAsync(accountId, cartDto);
            return result;
        }

        public async Task<List<ProductWithQuantityDto>> GetCart(int accountId)
        {
            var prodIdList = await _unitOfWork.CartRepo.GetCart(accountId);
            var prodList = await _unitOfWork.CartRepo.GetListProduct(string.Join(',', prodIdList.Select(x => x.Id)));
            
            var result = new List<ProductWithQuantityDto>();
            for (int i = 0; i < prodIdList.Count; i++)
            {
                result.Add(new ProductWithQuantityDto() {
                    Item = prodList[i],
                    Quantity = prodIdList[i].Quantity
                });
            }

            return result;
        }

        public async Task<int> DeleteProductInCart(DeleteProductCartDto deleteDto)
        {
            return await _unitOfWork.CartRepo.DeleteProductInCart(deleteDto);
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

        public async Task<int> UpdateAllCart(int accountId, List<ProductWithQuantityDto> updateDto)
        {
            var result = 0;
            try
            {
                result = await ClearCart(accountId);

                foreach (var item in updateDto)
                {
                    result = await AddToCart(accountId, item);
                }
            }
            catch (System.Exception)
            {
                throw;
            }

            return result;
        }
    }
}
