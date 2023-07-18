using SunriseServerCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IBookingRepo : IRepository<BookingAccount>
    {
        Task<IEnumerable<BookingAccount>> GetAllAsync(int accountId);
    }
}
