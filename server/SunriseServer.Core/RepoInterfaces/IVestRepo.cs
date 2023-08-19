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

        Task<ImageDto> GetImageByCustom(string fabric, VestComponent vest);

        // -----------------//
        //    CRUD area     //
        // -----------------//
        Task<bool> AddVest(AddVest av);
        Task<bool> DeleteVest(int id);
        Task<bool> UpdateVest(int vestId, VestComponent updatedVest);
       
        
    }
}