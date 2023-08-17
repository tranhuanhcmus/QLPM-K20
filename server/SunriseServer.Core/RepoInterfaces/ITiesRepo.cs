using SunriseServerCore.Dtos;
using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;

namespace SunriseServerCore.RepoInterfaces
{
    public interface ITiesRepo : IRepository<Ties>
    {
        Task<List<Product>> GetAllSpecial();
        List<TiesDetail> GetByName(string name);
        TiesDetail GetTiesDetailById(int id);

        // -----------------//
        //    CRUD area     //
        // -----------------//
        
        Task<bool> AddTies(AddTies at);
        
        Task<bool> DeleteTies(int id);

    }
}