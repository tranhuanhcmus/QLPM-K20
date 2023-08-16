using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

namespace SunriseServer.Services.TiesService
{
    public interface ITiesService
    {
        string GetMyName();
        //asynchronous operation that produces a result of Ties type
        Task<List<Product>> GetAll();
        List<TiesDetail> GetTiesByName(string Tiesname);
        TiesDetail GetTiesDetailById(int id);

        Task<Ties> GetTiesById(int id);
        Task<Ties> UpdateTies(Ties jk);
        Task<Ties> GetTiesByCategory(string cate);
        Task<Ties> GetTiesByColor(string color);
        Task<Ties> GetTiesByFabric(string fabric);
        Task<bool> AddTies(AddTies at);

        void SaveChanges();
    }
}
