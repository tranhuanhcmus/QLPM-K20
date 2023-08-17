using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;
using SunriseServerCore.Models;


namespace SunriseServerCore.RepoInterfaces
{
    public interface IPantsRepo : IRepository<Pants>
    {
        Task<List<Product>> GetAllSpecial();
        List<PantsProduct> GetByName(string name);

        PantsDetail GetPantsDetailById(int id);

        // -----------------//
        //    CRUD area     //
        // -----------------//
        Task<bool> AddPants(AddPants ap);

        Task<bool> DeletePants(int id);


    }
}