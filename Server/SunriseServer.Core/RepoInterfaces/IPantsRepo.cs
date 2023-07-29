using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IPantsRepo : IRepository<Pants>
    {
        Task<List<PantsProduct>> GetAllSpecial();
        List<PantsProduct> GetByName(string name);

    }
}