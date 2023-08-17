using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

namespace SunriseServer.Services.PantsService
{
    public interface IPantsService
    {
        string GetMyName();
        //asynchronous operation that produces a result of Pants type
        Task<List<Product>> GetAll();
        List<PantsProduct> GetPantsByName(string Pantsname);
        PantsDetail GetPantsDetailById(int id);
        Task<Pants> GetPantsById(int id);
        Task<Pants> UpdatePants(Pants jk);
        Task<Pants> GetPantsByCategory(string cate);
        Task<Pants> GetPantsByColor(string color);
        Task<Pants> GetPantsByFabric(string fabric);

        Task<bool> DeletePants(int pantsId);
        Task<bool> AddPants(AddPants ap);
        void SaveChanges();
    }
}
