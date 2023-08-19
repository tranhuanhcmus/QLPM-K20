using SunriseServerCore.Dtos;
using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IJacketRepo : IRepository<Jacket>
    {
        List<JacketProduct> GetByName(string name);
        List<Product> GetAllSpecial();
        JacketDetail GetJacketDetailById(int id);
        Task<ImageDto> GetImageByCustom(string fabric, JacketComponent jacket);

        // -----------------//
        //    CRUD area     //
        // -----------------//
        Task<bool> AddJacket(AddJacketDto aj);
        //List<Jacket> GetAllSpecialAsync();
        Task<bool> DeleteJacket(int id);

        Task<bool> UpdateJacket(int jacketId, JacketComponent updatedJacket);

    }
}