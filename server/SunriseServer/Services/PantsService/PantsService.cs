using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;
using SunriseServerCore.Models.Clothes;
using System.Threading.Tasks;

namespace SunriseServer.Services.PantsService
{
    public class PantsService : IPantsService
    {
        //private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UnitOfWork _unitOfWork;
        public PantsService(UnitOfWork unitOfWork)
        {
            //_httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        public Task<List<PantsProduct>> GetAll() => (Task<List<PantsProduct>>)_unitOfWork.PantsRepo.GetAllSpecial();
        //public Task<Pants> GetAll()
        //{
        //    return _unitOfWork.PantsRepo.GetAll();
        //}
        public Task<bool> AddPants(float price, string image, string name, string description,
            byte discount, string fabricName, string color, string fit, 
            string cuff, string fastening, string pleats, string pocket) {
                return _unitOfWork.PantsRepo.AddPants(price, image, name, description, discount, fabricName, color, fit, cuff, fastening, pleats, pocket);
            }

        public PantsDetail GetPantsDetailById(int id)
        {
            return _unitOfWork.PantsRepo.GetPantsDetailById(id);

        }
        public async Task<Pants> AddPants(Pants jk)
        {
            return await _unitOfWork.PantsRepo.CreateAsync(jk);

        }
        public List<PantsProduct> GetPantsByName(string Pantsname)
        {
            return _unitOfWork.PantsRepo.GetByName(Pantsname);
        }
        public async Task<Pants> GetPantsById(int id)
        {
            return null;

        }
        public async Task<Pants> UpdatePants(Pants jk)
        {
            return null;

        }
        public async Task<Pants> GetPantsByCategory(string cate)
        {
            return null;

        }
        public async Task<Pants> GetPantsByColor(string color)
        {
            return null;

        }
        public async Task<Pants> GetPantsByFabric(string fabric)
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
