using SunriseServer.Common.Helper;
using SunriseServerCore.Models.Clothes;
using SunriseServerData;
using System.Text;

namespace SunriseServer.Services.BodyService
{
    public class BodyService : IBodyService
    {
        private UnitOfWork _uow;

        public BodyService(UnitOfWork uow) {
            _uow = uow;
        }

        public async Task<BodyMeasurement> GetAllMesurement(int accountId)
        {
            return await _uow.BodyRepo.GetAllMesurement(accountId);
        }

        public async Task<BodyMeasurement> PostAllMesurement(PostBodyMeasureMentDto postBody, int accountId)
        {
            var addBody = new BodyMeasurement();
            addBody.Customer = accountId;
            addBody.ShoulderWidth = postBody.ShoulderWidth;
            addBody.SleeveLength = postBody.SleeveLength;
            addBody.ArmCircumference = postBody.ArmCircumference;
            addBody.Chest = postBody.Chest;
            addBody.Waist = postBody.Waist;
            addBody.FrontLength = postBody.FrontLength;
            addBody.BackLength = postBody.BackLength;
            addBody.Neck = postBody.Neck;
            addBody.WaistOfPants = postBody.WaistOfPants;
            addBody.Hips = postBody.Hips;
            addBody.BottomOfPants = postBody.BottomOfPants;
            addBody.Thigh = postBody.Thigh;
            addBody.PantsLength = postBody.PantsLength;
            addBody.PantsCircumference = postBody.PantsCircumference;

            _uow.BodyRepo.Delete(accountId);
            var result = await _uow.BodyRepo.CreateAsync(addBody);
            await _uow.SaveChangesAsync();
            return result;
        }
    }
}
