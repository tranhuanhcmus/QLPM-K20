using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;
using SunriseServerCore.Models.Clothes;
using System.Threading.Tasks;

namespace SunriseServer.Services.TiesService
{
    public class TiesService : ITiesService
    {
        //private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UnitOfWork _unitOfWork;
        public TiesService(UnitOfWork unitOfWork)
        {
            //_httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        public Task<List<TiesDetail>> GetAll() => (Task<List<TiesDetail>>)_unitOfWork.TiesRepo.GetAllSpecial();
        //public Task<Ties> GetAll()
        //{
        //    return _unitOfWork.TiesRepo.GetAll();
        //}
        public TiesDetail GetTiesDetailById(int id)
        {
            return _unitOfWork.TiesRepo.GetTiesDetailById(id);

        }


        public async Task<Ties> AddTies(Ties jk)
        {
            return await _unitOfWork.TiesRepo.CreateAsync(jk);

        }
        public List<TiesDetail> GetTiesByName(string Tiesname)
        {
            return _unitOfWork.TiesRepo.GetByName(Tiesname);
        }
        public async Task<Ties> GetTiesById(int id)
        {
            return null;

        }
        public async Task<Ties> UpdateTies(Ties jk)
        {
            return null;

        }
        public async Task<Ties> GetTiesByCategory(string cate)
        {
            return null;

        }
        public async Task<Ties> GetTiesByColor(string color)
        {
            return null;

        }
        public async Task<Ties> GetTiesByFabric(string fabric)
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

        public Task<bool> AddTies(float price, string image, string name, string description,
            byte discount, string fabricName, string color, decimal size, string style) {
                return _unitOfWork.TiesRepo.AddTies(price, image, name, description, discount, fabricName, color, size, style);
            }


        public void SaveChanges()
        {
            _unitOfWork.SaveChanges();
        }


    }
}
