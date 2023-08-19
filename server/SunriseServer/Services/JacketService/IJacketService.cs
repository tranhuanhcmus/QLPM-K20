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
        Task<bool> AddJacket(AddJacketDto aj);
        List<JacketProduct> GetJacketByName(string jacketname);
        Task<Jacket> GetJacketById(int id);
        JacketDetail GetJacketDetailById(int id);
        Task<Jacket> GetJacketByCategory(string cate);
        Task<Jacket> GetJacketByColor(string color);
        Task<ImageDto> GetImageByCustom(string fabric, JacketComponent jacket);

        Task<Jacket> GetJacketByFabric(string fabric);

        Task<bool> DeleteJacket(int jacketId);
        Task<List<Product>> GetAllSpecial3();

        Task<bool> UpdateJacket(Product productToUpdate, JacketComponent jacketToUpdate);


        void SaveChanges();
    }
}
