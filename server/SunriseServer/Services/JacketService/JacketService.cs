using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

namespace SunriseServer.Services.JacketService
{
    public class JacketService : IJacketService
    {
        //private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UnitOfWork _unitOfWork;
        public JacketService(UnitOfWork unitOfWork)
        {
            //_httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        public List<Jacket> GetAll() => (List<Jacket>)_unitOfWork.JacketRepo.GetAll();
        public List<Product> GetAllSpecial() => _unitOfWork.JacketRepo.GetAllSpecial();

        public async Task<List<Product>> GetAllSpecial3()
        {
            return await _unitOfWork.ProductRepo.GetAllSpecialAsync();
        }
        //public Task<Jacket> GetAll()
        //{
        //    return _unitOfWork.JacketRepo.GetAll();
        //}

        //----------------------------------------------------------------
        // for admin (CRUD)
        //----------------------------------------------------------------
        public async Task<bool> DeleteJacket(int jacketId) {
            // delete both jacket infor and product

            bool j = await _unitOfWork.JacketRepo.DeleteJacket(jacketId);
            if (!j) return false; 

            bool p = await _unitOfWork.ProductRepo.DeleteProduct(jacketId);
            if (!p) return false; 
            
            return true;
        }


        public Task<bool> AddJacket(AddJacket aj)
        {
            return _unitOfWork.JacketRepo.AddJacket(aj);

        }
        public List<JacketProduct> GetJacketByName(string jacketname)
        {
            return _unitOfWork.JacketRepo.GetByName(jacketname);
        }

        public async Task<Jacket> GetJacketById(int id)
        {
            return null;

        }
        public JacketDetail GetJacketDetailById(int id)
        {
            return _unitOfWork.JacketRepo.GetJacketDetailById(id);

        }
        public async Task<Jacket> UpdateJacket(Jacket jk)
        {
            return null;

        }
        public async Task<Jacket> GetJacketByCategory(string cate)
        {
            return null;

        }
        public async Task<Jacket> GetJacketByColor(string color)
        {
            return null;

        }
        public async Task<Jacket> GetJacketByFabric(string fabric)
        {
            return null;

        }
        public string GetMyName()
        {
            return null;

        }



        public void SaveChanges()
        {
            _unitOfWork.SaveChanges();
        }

        
    }
}
