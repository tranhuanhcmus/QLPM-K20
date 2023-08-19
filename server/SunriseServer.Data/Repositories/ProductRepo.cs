using System.Text;
using SunriseServerCore.Models;
using SunriseServerCore.RepoInterfaces;
using System.Data;
using SunriseServerCore.Models.Clothes;
using SunriseServer.Common.Constant;

namespace SunriseServerData.Repositories
{
    public class ProductRepo : RepositoryBase<Product>, IProductRepo
    {
        readonly DataContext _dataContext;
        
        public ProductRepo(DataContext dbContext) : base(dbContext)
        {
            _dataContext = dbContext;
        }
        
        public override async Task<Product> CreateAsync(Product p)
        {
            var result = await _dataContext.Product.ToListAsync();
            return result.FirstOrDefault();
        }

        public async Task<List<Product>> GetByNameAsync(string name)
        {
            if (name == "") return await GetAllSpecialAsync();
            var builder = new StringBuilder($"EXEC usp_SearchProduct {name};");

            var result = await _dataContext.Product.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result;
        }

        public override async Task<Product> GetByIdAsync(int id)
        {
            var builder = new StringBuilder($"dbo.USP_GetAccountById @Id = \'{id}\';");

            Console.WriteLine(builder.ToString());
            var result = await _dataContext.Product.FromSqlInterpolated($"EXECUTE({builder.ToString()})").ToListAsync();
            return result.FirstOrDefault();
        }

        public List<Product> GetAllSpecial()
        {
            return null;
        }

        public async Task<List<Product>> GetAllSpecialAsync()
        {
            return await _dataContext.Product.ToListAsync();
        }
        
        public async Task<string> GetProductType(int id) {
            Product product = await _dataContext.Product.FindAsync(id);

            return product != null ? product.Type : GlobalConstant.EmptyString;
        }

        public bool IsExist(int id, string type) {
            return _dataContext.Product.Where(p => p.ProductID == id  && p.Type == type ).ToList().FirstOrDefault() != null;
        }

        public async Task<List<Product>> GetByCategory(string category)
        {
            if (category.ToUpper() == GlobalConstant.All || category == "") 
                return await _dataContext.Product.ToListAsync();

            var allVest = await _dataContext.Product.Where(p => p.Type == category).ToListAsync();
            return allVest;
        }

        // -----------------//
        //    CRUD area     //
        // -----------------//

        public async Task<bool> DeleteProduct(int id) {

            try
            {
                Product product = await _dataContext.Product.FindAsync(id);
                _dataContext.Product.Remove(product);
                _dataContext.SaveChanges();
            }
            catch (DataException ex)
            {
                //Log the error (uncomment dex variable name and add a line here to write a log.
                throw new Exception("An error occurred while adding the Product.", ex);
            }
            return true;
        }

        public async Task<bool> UpdateProduct(Product productToUpdate) {
            // Retrieve the existing product entity from the database

            var existingProduct = await _dataContext.Product.FindAsync(productToUpdate.ProductID);
            

            if (existingProduct == null)
            {
                // Product not found, return false or handle it as needed
                return false; // or throw new NotFoundException("Product not found");
            }

            // Update the properties of the existing product entity
            existingProduct.Price = productToUpdate.Price;
            existingProduct.ImageFront = productToUpdate.ImageFront;
            existingProduct.ImageBack = productToUpdate.ImageBack;
            existingProduct.Name = productToUpdate.Name;
            existingProduct.Description = productToUpdate.Description;
            existingProduct.Discount = productToUpdate.Discount;
            existingProduct.Fabric = productToUpdate.Fabric;
            existingProduct.FabricName = productToUpdate.FabricName;
            existingProduct.Color = productToUpdate.Color;
            // not allow to update type of product

            // Mark the entity as modified
            _dataContext.Entry(existingProduct).State = EntityState.Modified;

            // Save the changes to the database
            await _dataContext.SaveChangesAsync();

            // Update successful
            return true;
        }

    }
}
