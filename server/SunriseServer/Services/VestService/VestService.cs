﻿using SunriseServerCore.Dtos;
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
