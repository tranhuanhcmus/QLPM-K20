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

        // -----------------//
        //    CRUD area     //
        // -----------------//
        Task<bool> AddJacket(AddJacket aj);
        //List<Jacket> GetAllSpecialAsync();
        Task<bool> DeleteJacket(int id);


    }
}