using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;
using SunriseServer.Services.BaseService;

namespace SunriseServer.Services.AccountService
{
    public class AccountService: IAccountService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UnitOfWork _unitOfWork;
        public AccountService(IHttpContextAccessor httpContextAccessor, UnitOfWork unitOfWork)
        {
            _httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        public async Task<Account> AddAccount(Account acc)
        {
            var result = await _unitOfWork.AccountRepo.CreateAsync(acc);
            await _unitOfWork.SaveChangesAsync();
            return result;
        }

        public string GetMyName()
        {
            var result = string.Empty;
            if (_httpContextAccessor.HttpContext != null)
            {
                result = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            }
            return result!;
        }

        public async Task<Account> GetByUsername(string username)
        {
            return await _unitOfWork.AccountRepo.GetByUsername(username);
        }

        public async Task<Account> GetByUsername(int id)
        {
            return await _unitOfWork.AccountRepo.GetByIdAsync(id);
        }

        public async Task<Account> UpdateAccount(Account acc)
        {
            return await _unitOfWork.AccountRepo.UpdateAsync(acc);
        }

        public async Task<Account> GetById(int id)
        {
            return await _unitOfWork.AccountRepo.GetByIdAsync(id);
        }
    }
}
