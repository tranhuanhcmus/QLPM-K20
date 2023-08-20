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
            addBody.Armhole = postBody.Armhole;
            addBody.Chest = postBody.Chest;
            addBody.Crotch = postBody.Crotch;
            addBody.Hip = postBody.Hip;
            addBody.Jacket_length = postBody.Jacket_length;
            addBody.Neck = postBody.Neck;
            addBody.Pants_circum = postBody.Pants_circum;
            addBody.Pants_length = postBody.Pants_length;
            addBody.Pants_waist = postBody.Pants_waist;
            addBody.Shoulder = postBody.Shoulder;
            addBody.Sleeve_length = postBody.Sleeve_length;
            addBody.Thigh = postBody.Thigh;
            addBody.Waist = postBody.Waist;

            _uow.BodyRepo.Delete(accountId);
            var result = await _uow.BodyRepo.CreateAsync(addBody);
            await _uow.SaveChangesAsync();
            return result;
        }
    }
}
