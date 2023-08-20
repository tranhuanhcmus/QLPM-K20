using System.Text;
using SunriseServerCore.Dtos.Fabric;
using SunriseServerCore.Models;
using SunriseServerCore.RepoInterfaces;

namespace SunriseServerData.Repositories
{
    public class FabricRepo : IFabricRepo
    {
        readonly DataContext _dataContext;

        public FabricRepo(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<GetFabricDto>> GetFabricByIdAsync(int fabricId)
        {
            return await _dataContext.Set<GetFabricDto>()
                    .FromSqlInterpolated($"EXEC USP_GetFabricById @FabricID={fabricId}")
                    .ToListAsync();
        }

        public async Task<List<Fabric>> GetFabricsAsync()
        {
            var builder = new StringBuilder("EXEC USP_GetAllFabrics");
            return await _dataContext.Set<Fabric>()
                                .FromSqlRaw(builder.ToString())
                                .ToListAsync();
        }


        public async Task<int> AddFabricAsync(AddFabricDto fabricDto)
        {
            var builder = new StringBuilder("EXEC USP_CreateFabric ");
            builder.Append($"@FabricName=\'{fabricDto.FabricName}\', ");
            builder.Append($"@Material=\'{fabricDto.Material}\', ");
            builder.Append($"@Price=\'{fabricDto.Price}\', ");
            builder.Append($"@Style=\'{fabricDto.Style}\', ");
            builder.Append($"@Image=\'{fabricDto.Image}\', ");
            builder.Append($"@Category=\'{fabricDto.Category}\', ");
            builder.Append($"@Inventory=\'{fabricDto.Inventory}\';");

            Console.WriteLine(builder.ToString());
            
            return  await _dataContext.Database.ExecuteSqlInterpolatedAsync($"EXECUTE({builder.ToString()});");
        }

        public async Task<int> UpdateFabricAsync(UpdateFabricDto fabricDto)
        {

            var builder = new StringBuilder("EXEC USP_UpdateFabric ");
            builder.Append($"@FabricID=\'{fabricDto.FabricID}\', ");
            builder.Append($"@FabricName=\'{fabricDto.FabricName}\', ");
            builder.Append($"@Material=\'{fabricDto.Material}\', ");
            builder.Append($"@Price=\'{fabricDto.Price}\', ");
            builder.Append($"@Style=\'{fabricDto.Style}\', ");
            builder.Append($"@Image=\'{fabricDto.Image}\', ");
            builder.Append($"@Category=\'{fabricDto.Category}\', ");
            builder.Append($"@Inventory=\'{fabricDto.Inventory}\';");

            Console.WriteLine(builder.ToString());
            
            return  await _dataContext.Database.ExecuteSqlInterpolatedAsync($"EXECUTE({builder.ToString()});");
        }

        public async Task<int> DeleteFabricAsync(int fabricId)
        {
return await _dataContext.Database
                .ExecuteSqlInterpolatedAsync($"EXEC DeleteOrder @FabricID={fabricId};");
        }
    }
}