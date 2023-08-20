using SunriseServerCore.Models.Clothes;
using SunriseServerData;
using System.Text;

namespace SunriseServer.Services.BodyService
{
    public interface IBodyService
    {
        Task<BodyMeasurement> GetAllMesurement(int accountId);
        Task<BodyMeasurement> PostAllMesurement(PostBodyMeasureMentDto postBody, int accountId);
    }
}
