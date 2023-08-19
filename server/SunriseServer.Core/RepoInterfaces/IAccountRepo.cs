using SunriseServerCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IAccountRepo : IRepository<Account>
    {
        Task<Account> GetByUsername(string username);
    }
}
