using SunriseServerCore.Models;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IProductRepo : IRepository<Product>
    {
        List<Product> GetAllSpecial();
        Task<List<Product>> GetAllSpecialAsync();
        Task<List<Product>> GetByNameAsync(string name);   
        Task<string> GetProductType(int id);     
        
        // -----------------//
        //    CRUD area     //
        // -----------------//
        Task<bool> DeleteProduct(int id);
        
        Task<bool> UpdateProduct(Product productToUpdate);

        Task<List<Product>> GetByCategory(string category);


    }
}