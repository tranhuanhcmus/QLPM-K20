using SunriseServerCore.Models;
using SunriseServerData;

namespace SunriseServer.Services.AccountService
{
    public interface IAccountService
    {
        string GetMyName();
        Task<Account> AddAccount(Account acc);
        Task<Account> GetByUsername(string username);
        Task<Account> GetById(int id);
        Task<Account> UpdateAccount(Account acc);
        Task<int> GetNextAccountId();
    }
}
