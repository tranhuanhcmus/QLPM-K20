using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using SunriseServerData;

namespace SunriseServer.Services.TiesService
{
    public interface ITiesService
    {
        string GetMyName();
        //asynchronous operation that produces a result of Ties type
        Task<List<TiesDetail>> GetAll();
        Task<Ties> AddTies(Ties jk);
        List<TiesDetail> GetTiesByName(string Tiesname);
        TiesDetail GetTiesDetailById(int id);

        Task<Ties> GetTiesById(int id);
        Task<Ties> UpdateTies(Ties jk);
        Task<Ties> GetTiesByCategory(string cate);
        Task<Ties> GetTiesByColor(string color);
        Task<Ties> GetTiesByFabric(string fabric);
        Task<bool> AddTies(float price, string image, string name, string description,
            byte discount, string fabricName, string color, decimal size, string style);

        void SaveChanges();
    }
}
