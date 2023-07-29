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
        List<JacketProduct> GetByName(string name);
        List<JacketProduct> GetAllSpecial();
        bool AddOne(Product p, string Style,
                   string fit, string lapel, string pocket, string sleeveButton, string backStyle, string breastPocket);
        //List<Jacket> GetAllSpecialAsync();

    }
}