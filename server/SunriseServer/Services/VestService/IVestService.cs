using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

namespace SunriseServer.Services.VestService
{
    public interface IVestService
    {
        string GetMyName();
        //asynchronous operation that produces a result of Vest type
        Task<List<Product>> GetAll();
        Task<Vest> AddVest(Vest jk);
        List<VestProduct> GetVestByName(string Vestname);
        VestDetail GetVestDetailById(int id);

        Task<Vest> GetVestById(int id);
        Task<Vest> UpdateVest(Vest jk);
        Task<Vest> GetVestByCategory(string cate);
        Task<Vest> GetVestByColor(string color);
        Task<Vest> GetVestByFabric(string fabric);
        Task<bool> AddVest(AddVest av);

        void SaveChanges();
    }
}
