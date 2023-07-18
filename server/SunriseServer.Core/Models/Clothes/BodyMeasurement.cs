using SunriseServer.Common.Constant;

namespace SunriseServerCore.Models.Clothes
{
    public class BodyMeasurement : ModelBase
    {
        public int Customer { get; set; }
        public double ShoulderWidth { get; set; }
        public double SleeveLength { get; set; }
        public double ArmCircumference { get; set; }
        public double Chest { get; set; }
        public double Waist { get; set; }
        public double FrontLength { get; set; }
        public double BackLength { get; set; }
        public double Neck { get; set; }
        public double WaistOfPants { get; set; }
        public double Hips { get; set; }
        public double BottomOfPants { get; set; }
        public double Thigh { get; set; }
        public double PantsLength { get; set; }
        public double PantsCircumference { get; set; }
    }
}
