namespace SunriseServer.Services.ProductService
{
    public class ProductService : IProductService
    {
        //private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UnitOfWork _unitOfWork;
        public ProductService(UnitOfWork unitOfWork)
        {
            //_httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        public List<Product> GetAll() => (List<Product>)_unitOfWork.ProductRepo.GetAll();
        
        public Task<List<Product>> GetByName(string name) {
            return _unitOfWork.ProductRepo.GetByNameAsync(name);
        }
        public async Task<Product> AddProduct(Product jk)
        {
            return await _unitOfWork.ProductRepo.CreateAsync(jk);

        }
        public async Task<List<Product>> GetProductByName(string Productname)
        {
            return await _unitOfWork.ProductRepo.GetByNameAsync(Productname);
        }
        public async Task<Product> GetProductById(int id)
        {
            return null;

        }
        public async Task<Product> UpdateProduct(Product jk)
        {
            return null;

        }
        public async Task<List<Product>> GetByCategory(string category)
        {
            return await _unitOfWork.ProductRepo.GetByCategory(category);

        }

        public async Task<string> GetProductType(int id) {
            return await _unitOfWork.ProductRepo.GetProductType(id);
        }    

        public async Task<Product> GetProductByColor(string color)
        {
            return null;

        }
        public async Task<Product> GetProductByFabric(string fabric)
        {
            return null;

        }



        public void SaveChanges()
        {
            _unitOfWork.SaveChanges();
        }


    }
}
