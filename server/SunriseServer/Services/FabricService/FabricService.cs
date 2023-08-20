using Microsoft.EntityFrameworkCore;
using SunriseServerData;
using SunriseServerCore.Models;
using System.Security.Claims;
using SunriseServerCore.Dtos.Fabric;


namespace SunriseServer.Services.FabricService
{
    public class FabricService : IFabricService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UnitOfWork _unitOfWork;

        public FabricService(IHttpContextAccessor httpContextAccessor, UnitOfWork unitOfWork)
        {
            _httpContextAccessor = httpContextAccessor;
            _unitOfWork = unitOfWork;
        }

        public async Task<List<Fabric>> GetFabrics()
        {
            return await _unitOfWork.FabricRepo.GetFabricsAsync();
        }

        public async Task<IEnumerable<GetFabricDto>> GetFabricById(int fabricId)
        {
            return await _unitOfWork.FabricRepo.GetFabricByIdAsync(fabricId);
        }

        public async Task<int> AddFabric(AddFabricDto fabricDto)
        {
            return await _unitOfWork.FabricRepo.AddFabricAsync(fabricDto);
        }

        public async Task<int> UpdateFabric(UpdateFabricDto fabricDto)
        {
            return await _unitOfWork.FabricRepo.UpdateFabricAsync(fabricDto);
        }

        public async Task<int> DeleteFabric(int fabricId)
        {            
            return await _unitOfWork.FabricRepo.DeleteFabricAsync(fabricId);
        }
    }
}