using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Fabric;

namespace SunriseServerCore.RepoInterfaces 
{
    public interface IFabricRepo
    {
        Task<IEnumerable<GetFabricDto>> GetFabricByIdAsync(int fabricId);
        Task<List<GetFabricDto>> GetFabricsAsync();
        Task<int> AddFabricAsync(AddFabricDto fabricDto);
        Task<int> UpdateFabricAsync(UpdateFabricDto fabricDto);
        Task<int> DeleteFabricAsync(int fabricId);
    }
}