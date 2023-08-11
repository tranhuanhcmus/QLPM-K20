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
        JacketDetail GetJacketDetailById(int id);
        Task<bool> AddJacket(float price, string image, string name, string description,
            byte discount, string fabricName, string color, string style, string fit, 
            string lapel, string sleeveButton, string pocket, string backStyle, string breastPocket);
        //List<Jacket> GetAllSpecialAsync();

    }
}