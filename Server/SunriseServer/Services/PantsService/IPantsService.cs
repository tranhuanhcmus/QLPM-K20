using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using SunriseServerData;

namespace SunriseServer.Services.PantsService
{
    public interface IPantsService
    {
        string GetMyName();
        //asynchronous operation that produces a result of Pants type
        Task<List<PantsProduct>> GetAll();
        Task<Pants> AddPants(Pants jk);
        List<PantsProduct> GetPantsByName(string Pantsname);
        PantsDetail GetPantsDetailById(int id);
        Task<Pants> GetPantsById(int id);
        Task<Pants> UpdatePants(Pants jk);
        Task<Pants> GetPantsByCategory(string cate);
        Task<Pants> GetPantsByColor(string color);
        Task<Pants> GetPantsByFabric(string fabric);

        void SaveChanges();
    }
}
