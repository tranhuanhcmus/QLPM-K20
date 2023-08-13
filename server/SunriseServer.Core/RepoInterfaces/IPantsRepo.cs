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

        PantsDetail GetPantsDetailById(int id);

        Task<bool> AddPants(float price, string image, string name, string description,
            byte discount, string fabricName, string color, string fit, 
            string cuff, string fastening, string pleats, string pocket);

    }
}