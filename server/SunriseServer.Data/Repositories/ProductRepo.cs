using System.Text;
using SunriseServerCore.Models;
using SunriseServerCore.RepoInterfaces;
using System.Data;

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
            var result = await _dataContext.Product.ToListAsync();
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
            return await _dataContext.Product.FromSqlInterpolated($"select ProductID, Price, Image, Name, Description, Discount, Fabric, FabricName, Color, Type from Product;")
                .ToListAsync();
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

    }
}
