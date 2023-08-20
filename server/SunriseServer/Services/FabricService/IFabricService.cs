using SunriseServerData;
using SunriseServerCore.Models;
using SunriseServerCore.Dtos.Fabric;

namespace SunriseServer.Services.FabricService  
{
    public interface IFabricService
    {
        Task<IEnumerable<GetFabricDto>> GetFabricById(int fabricId);
        Task<List<Fabric>> GetFabrics();
        Task<int> AddFabric(AddFabricDto fabricDto);
        Task<int> UpdateFabric(UpdateFabricDto fabricDto);
        Task<int> DeleteFabric(int fabricId);
    }
}