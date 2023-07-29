﻿using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using SunriseServerData;

namespace SunriseServer.Services.JacketService
{
    public interface IJacketService
    {
        string GetMyName();
        //asynchronous operation that produces a result of Jacket type
        List<Jacket> GetAll();
        List<JacketProduct> GetAllSpecial();
        bool AddJacket(Product p, string Style,
                   string fit, string lapel, string pocket, string sleeveButton, string backStyle, string breastPocket);
        List<JacketProduct> GetJacketByName(string jacketname);
        Task<Jacket> GetJacketById(int id);
        Task<Jacket> UpdateJacket(Jacket jk);
        Task<Jacket> GetJacketByCategory(string cate);
        Task<Jacket> GetJacketByColor(string color);
        Task<Jacket> GetJacketByFabric(string fabric);

        Task<List<Product>> GetAllSpecial3();

        void SaveChanges();
    }
}
