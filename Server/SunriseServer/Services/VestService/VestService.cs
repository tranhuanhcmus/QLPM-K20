using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;
using SunriseServerCore.Models.Clothes;
using System.Threading.Tasks;

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

        public List<Vest> GetAll() => (List<Vest>)_unitOfWork.VestRepo.GetAll();
        public List<VestProduct> GetAllSpecial() => _unitOfWork.VestRepo.GetAllSpecial();
        //public Task<Vest> GetAll()
        //{
        //    return _unitOfWork.VestRepo.GetAll();
        //}


        public async Task<Vest> AddVest(Vest jk)
        {
            return await _unitOfWork.VestRepo.CreateAsync(jk);

        }
        public async Task<Vest> GetVestByName(string jacketname)
        {
            return null;
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



        public void SaveChanges()
        {
            _unitOfWork.SaveChanges();
        }


    }
}
