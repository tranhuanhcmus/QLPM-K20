namespace SunriseServer.Services.ProductService
{
    public interface IProductService
    {
        List<Product> GetAll();
    
        Task<Product> GetProductById(int id);
        Task<List<Product>> GetByName(string name);

        Task<Product> GetProductByColor(string color);
        Task<Product> GetProductByFabric(string fabric);

        Task<List<Product>> GetByCategory(string category);

        Task<string> GetProductType(int id);     


        void SaveChanges();
    }
}
