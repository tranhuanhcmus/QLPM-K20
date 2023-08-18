using Microsoft.EntityFrameworkCore;
using SunriseServerCore.Common.Helper;
using SunriseServerCore.Models;
using SunriseServerCore.RepoInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerData.Repositories
{
    public class AccountRepo : RepositoryBase<Account>, IAccountRepo
    {
        readonly DataContext _dataContext;
        public AccountRepo(DataContext dbContext) : base(dbContext)
        {
            _dataContext = dbContext;
        }

        public async Task<Account> GetByUsername(string email)
        {
            var builder = new StringBuilder($"dbo.USP_GetAccountDetailByEmail @Email = \'{email}\';");

            Console.WriteLine(builder.ToString());
            var result = await _dataContext.Account.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result.FirstOrDefault();
        }

        public override async Task<Account> GetByIdAsync(int id)
        {
            var builder = new StringBuilder($"dbo.USP_GetAccountById @Id = \'{id}\';");

            Console.WriteLine(builder.ToString());
            var result = await _dataContext.Account.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<int> GetNextAccountIdAsync()
        {
            var result = await _dataContext.Set<MyProcedureResult>()
                .FromSqlInterpolated($"DECLARE @Id INT;EXEC @Id = dbo.USP_GetNextColumnId 'Account', 'AccountID';SELECT @Id;")
                .ToListAsync();

            return (result.FirstOrDefault()).MyValue;
        }
    }
}
