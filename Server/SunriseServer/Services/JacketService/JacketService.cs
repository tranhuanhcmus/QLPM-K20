using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;
using SunriseServerCore.Models.Clothes;
using System.Threading.Tasks;

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
        public List<JacketProduct> GetAllSpecial() => _unitOfWork.JacketRepo.GetAllSpecial();

        public async Task<List<Product>> GetAllSpecial3()
        {
            return await _unitOfWork.ProductRepo.GetAllSpecialAsync();
        }
        //public Task<Jacket> GetAll()
        //{
        //    return _unitOfWork.JacketRepo.GetAll();
        //}


        public async Task<Jacket> AddJacket(Jacket jk)
        {
            return await _unitOfWork.JacketRepo.CreateAsync(jk);

        }
        public List<JacketProduct> GetJacketByName(string jacketname)
        {
            return _unitOfWork.JacketRepo.GetByName(jacketname);
        }

        public async Task<Jacket> GetJacketById(int id)
        {
            return null;

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
