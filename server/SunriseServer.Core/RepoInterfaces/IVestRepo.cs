using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IVestRepo : IRepository<Vest>
    {
        Task<List<VestProduct>> GetAllSpecial();
        List<VestProduct> GetByName(string name);
        VestDetail GetVestDetailById(int id);

        // func to insert, delete, or update
        Task<bool> AddVest(float price, string image, string name, string description,
            byte discount, string fabricName, string color, string style, string vType, 
            string lapel, string edge, string breastPocket, string frontPocket);
        
        
    }
}