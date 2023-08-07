using SunriseServer.Services.BaseService;
using SunriseServerCore.Models;
using SunriseServerData;

namespace SunriseServer.Services.AccountService
{
    public interface IAccountService : IServiceBase
    {
        string GetMyName();
        Task<Account> AddAccount(Account acc);
        Task<Account> GetByUsername(string username);
        Task<Account> GetById(int id);
        Task<Account> UpdateAccount(Account acc);
    }
}
