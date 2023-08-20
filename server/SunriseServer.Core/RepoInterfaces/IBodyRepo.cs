using SunriseServerCore.Models;
using SunriseServerCore.Models.Clothes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.RepoInterfaces
{
    public interface IBodyRepo : IRepository<BodyMeasurement>
    {
        Task<BodyMeasurement> GetAllMesurement(int accountId);
    }
}
