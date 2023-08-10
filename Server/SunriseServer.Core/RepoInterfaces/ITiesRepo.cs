using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.RepoInterfaces
{
    public interface ITiesRepo : IRepository<Ties>
    {
        Task<List<TiesDetail>> GetAllSpecial();
        List<TiesDetail> GetByName(string name);
        TiesDetail GetTiesDetailById(int id);

        // func to insert, delete, or update
        Task<bool> AddTies(float price, string image, string name, string description,
            byte discount, string fabricName, string color, decimal size, string style);
        
        
    }
}