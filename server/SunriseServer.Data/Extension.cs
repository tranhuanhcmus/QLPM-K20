using Microsoft.Extensions.DependencyInjection;
using SunriseServerCore.RepoInterfaces;
using SunriseServerData.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerData
{
    public static class Extension
    {
        public static IServiceCollection AddUnitOfWork(this IServiceCollection services, Action<DbContextOptionsBuilder> optionsAction) 
        {
            services.AddDbContext<DataContext>(optionsAction);
            services.AddScoped<IHotelRepo, HotelRepo>();
            services.AddScoped<IHotelRoomServiceRepo, RoomServiceRepo>();
            services.AddScoped<UnitOfWork>();
            return services;
        }

        public static IServiceCollection AddServicesData(this IServiceCollection services)
        {
            return services;
        }
    }
}
