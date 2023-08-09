using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using SunriseServerData;

namespace SunriseServer.Services.VestService
{
    public interface IVestService
    {
        string GetMyName();
        //asynchronous operation that produces a result of Vest type
        Task<List<VestProduct>> GetAll();
        Task<Vest> AddVest(Vest jk);
        List<VestProduct> GetVestByName(string Vestname);
        VestDetail GetVestDetailById(int id);

        Task<Vest> GetVestById(int id);
        Task<Vest> UpdateVest(Vest jk);
        Task<Vest> GetVestByCategory(string cate);
        Task<Vest> GetVestByColor(string color);
        Task<Vest> GetVestByFabric(string fabric);
        Task<bool> AddVest(float price, string image, string name, string description,
            byte discount, string fabricName, string color, string style, string vType, 
            string lapel, string edge, string breastPocket, string frontPocket);

        void SaveChanges();
    }
}
