using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IJacketRepo : IRepository<Jacket>
    {
        Task<Jacket> GetByName(string name);
        List<JacketProduct> GetAllSpecial();
        //List<Jacket> GetAllSpecialAsync();

    }
}