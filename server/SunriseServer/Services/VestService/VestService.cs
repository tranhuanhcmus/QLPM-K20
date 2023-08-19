using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

namespace SunriseServer.Services.VestService
{
    public class VestService : IVestService
    {
        //private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UnitOfWork _unitOfWork;
        public VestService(UnitOfWork unitOfWork)
        {
            //_httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        public Task<List<Product>> GetAll() => _unitOfWork.VestRepo.GetAllSpecial();
        //public Task<Vest> GetAll()
        //{
        //    return _unitOfWork.VestRepo.GetAll();
        //}
        public VestDetail GetVestDetailById(int id)
        {
            return _unitOfWork.VestRepo.GetVestDetailById(id);

        }

        public async Task<ImageDto> GetImageByCustom(string fabric, VestComponent vest) {
            return await _unitOfWork.VestRepo.GetImageByCustom(fabric,vest);
        }

        //----------------------------------------------------------------
        // for admin (CRUD)
        //----------------------------------------------------------------
        public async Task<bool> DeleteVest(int VestId) {
            // delete both Vest infor and product

            bool j = await _unitOfWork.VestRepo.DeleteVest(VestId);
            if (!j) return false; 

            bool p = await _unitOfWork.ProductRepo.DeleteProduct(VestId);
            if (!p) return false; 
            
            return true;
        }

        public async Task<bool> UpdateVest(Product productToUpdate, VestComponent vestToUpdate) {
            bool isVestUpdated = await _unitOfWork.VestRepo.UpdateVest(productToUpdate.ProductID, vestToUpdate);
            if (!isVestUpdated) return false;

            bool isProductUpdated = await _unitOfWork.ProductRepo.UpdateProduct(productToUpdate);
            return isProductUpdated;
        }

        public async Task<Vest> AddVest(Vest jk)
        {
            return await _unitOfWork.VestRepo.CreateAsync(jk);

        }
        public List<VestProduct> GetVestByName(string Vestname)
        {
            return _unitOfWork.VestRepo.GetByName(Vestname);
        }
        public async Task<Vest> GetVestById(int id)
        {
            return null;

        }
        public async Task<Vest> UpdateVest(Vest jk)
        {
            return null;

        }
        public async Task<Vest> GetVestByCategory(string cate)
        {
            return null;

        }
        public async Task<Vest> GetVestByColor(string color)
        {
            return null;

        }
        public async Task<Vest> GetVestByFabric(string fabric)
        {
            return null;

        }
        public string GetMyName()
        {
            return null;

        }
        
        // ----------------------------------------- //
        // this area for insert, update and delete   //
        // ----------------------------------------- //

        public Task<bool> AddVest(AddVest av) {
                return _unitOfWork.VestRepo.AddVest(av);
            }


        public void SaveChanges()
        {
            _unitOfWork.SaveChanges();
        }


    }
}
