using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IProductRepo : IRepository<Product>
    {
        List<Product> GetAllSpecial();
        Task<List<Product>> GetAllSpecialAsync();
    }
}