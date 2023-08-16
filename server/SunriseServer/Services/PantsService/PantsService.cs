﻿using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

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

        public Task<List<Product>> GetAll() => _unitOfWork.PantsRepo.GetAllSpecial();
        //public Task<Pants> GetAll()
        //{
        //    return _unitOfWork.PantsRepo.GetAll();
        //}
        public Task<bool> AddPants(AddPants ap) {
                return _unitOfWork.PantsRepo.AddPants(ap);
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
