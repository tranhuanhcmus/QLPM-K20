using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using SunriseServerData;

namespace SunriseServer.Services.VestService
{
    public interface IVestService
    {
        string GetMyName();
        //asynchronous operation that produces a result of Vest type
        List<Vest> GetAll();
        List<VestProduct> GetAllSpecial();
        Task<Vest> AddVest(Vest jk);
        Task<Vest> GetVestByName(string jacketname);
        Task<Vest> GetVestById(int id);
        Task<Vest> UpdateVest(Vest jk);
        Task<Vest> GetVestByCategory(string cate);
        Task<Vest> GetVestByColor(string color);
        Task<Vest> GetVestByFabric(string fabric);

        void SaveChanges();
    }
}
