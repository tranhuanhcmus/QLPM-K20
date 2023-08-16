using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;


namespace SunriseServer.Services.JacketService
{
    public interface IJacketService
    {
        string GetMyName();
        //asynchronous operation that produces a result of Jacket type
        List<Jacket> GetAll();
        List<Product> GetAllSpecial();
        Task<bool> AddJacket(AddJacket aj);
        List<JacketProduct> GetJacketByName(string jacketname);
        Task<Jacket> GetJacketById(int id);
        JacketDetail GetJacketDetailById(int id);
        Task<Jacket> UpdateJacket(Jacket jk);
        Task<Jacket> GetJacketByCategory(string cate);
        Task<Jacket> GetJacketByColor(string color);
        Task<Jacket> GetJacketByFabric(string fabric);

        bool DeleteJacket(int jacketId);
        Task<List<Product>> GetAllSpecial3();

        void SaveChanges();
    }
}
