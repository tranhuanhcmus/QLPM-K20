using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using SunriseServerData;

namespace SunriseServer.Services.ProductService
{
    public interface IProductService
    {
        List<Product> GetAll();
    
        Task<Product> GetProductById(int id);
        Task<List<Product>> GetByName(string name);

        Task<Product> GetProductByCategory(string cate);
        Task<Product> GetProductByColor(string color);
        Task<Product> GetProductByFabric(string fabric);

        void SaveChanges();
    }
}
