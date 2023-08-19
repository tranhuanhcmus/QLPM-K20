// {
//   "name": "John Doe",
//   "height": 175,
//   
//   "age": 30,
//   "shoulder": 45,        ShoulderWidth DECIMAL(10, 2),
//   "sleeve_length": 60,   SleeveLength DECIMAL(10, 2),
//   "armhole": 25,         ArmCircumference DECIMAL(10, 2),
//   "chest": 100,          Chest DECIMAL(10, 2),
//   "waist": 80,           Waist DECIMAL(10, 2),
//   "jacket_length": 70,   FrontLength DECIMAL(10, 2),
//                          BackLength DECIMAL(10, 2),
//   "neck": 38,            Neck DECIMAL(10, 2),
//   "pants_waist": 85,     WaistOfPants DECIMAL(10, 2),
//   "hip": 95,             Hips DECIMAL(10, 2),
//   "crotch": 28,          BottomOfPants DECIMAL(10, 2),
//   "thigh": 55,           Thigh DECIMAL(10, 2),
//   "pants_length": 105    PantsLength DECIMAL(10, 2),
//                          PantsCircumference DECIMAL(10, 2),
//   "biceps": 30,
//   "weight": 70,          weight DECIMAL(10, 2),

// }


using SunriseServer.Common.Constant;

namespace SunriseServerCore.Models
{
    public class Measurement : ModelBase
    {
        public int AccountId { get; set; }

    }
}
