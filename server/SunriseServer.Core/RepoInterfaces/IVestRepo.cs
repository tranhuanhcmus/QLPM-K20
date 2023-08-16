using SunriseServerCore.Dtos;
using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IVestRepo : IRepository<Vest>
    {
        Task<List<Product>> GetAllSpecial();
        List<VestProduct> GetByName(string name);
        VestDetail GetVestDetailById(int id);

        // func to insert, delete, or update
        Task<bool> AddVest(AddVest av);
        
        
    }
}