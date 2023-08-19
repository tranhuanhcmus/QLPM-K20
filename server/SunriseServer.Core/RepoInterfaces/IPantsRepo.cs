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

        Task<ImageDto> GetImageByCustom(string fabric, PantsComponent pants);

        // -----------------//
        //    CRUD area     //
        // -----------------//
        Task<bool> AddPants(AddPantsDto ap);

        Task<bool> DeletePants(int id);

        Task<bool> UpdatePants(int pantsId, PantsComponent updatedPants);


    }
}