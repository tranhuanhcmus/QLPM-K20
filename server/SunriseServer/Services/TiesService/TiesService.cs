using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

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

        public Task<List<Product>> GetAll() => _unitOfWork.TiesRepo.GetAllSpecial();
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

        public Task<bool> AddTies(AddTies at) {
                return _unitOfWork.TiesRepo.AddTies(at);
            }


        public void SaveChanges()
        {
            _unitOfWork.SaveChanges();
        }


    }
}
