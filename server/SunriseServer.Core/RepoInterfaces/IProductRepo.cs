using SunriseServerCore.Models;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IProductRepo : IRepository<Product>
    {
        List<Product> GetAllSpecial();
        Task<List<Product>> GetAllSpecialAsync();
        Task<List<Product>> GetByNameAsync(string name);        
        
        // -----------------//
        //    CRUD area     //
        // -----------------//
        Task<bool> DeleteProduct(int id);

    }
}