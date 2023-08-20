using SunriseServer.Common.Constant;

namespace SunriseServerCore.Models.Clothes
{
    public class BodyMeasurement : ModelBase
    {
        public int Customer { get; set; }
        public decimal ShoulderWidth { get; set; }
        public decimal SleeveLength { get; set; }
        public decimal ArmCircumference { get; set; }
        public decimal Chest { get; set; }
        public decimal Waist { get; set; }
        public decimal FrontLength { get; set; }
        public decimal BackLength { get; set; }
        public decimal Neck { get; set; }
        public decimal WaistOfPants { get; set; }
        public decimal Hips { get; set; }
        public decimal BottomOfPants { get; set; }
        public decimal Thigh { get; set; }
        public decimal PantsLength { get; set; }
        public decimal PantsCircumference { get; set; }
        public decimal Weight { get; set; }
        public int Point { get; set; }
    }

    public class PostBodyMeasureMentDto
    {
        public decimal ShoulderWidth { get; set; }
        public decimal SleeveLength { get; set; }
        public decimal ArmCircumference { get; set; }
        public decimal Chest { get; set; }
        public decimal Waist { get; set; }
        public decimal FrontLength { get; set; }
        public decimal BackLength { get; set; }
        public decimal Neck { get; set; }
        public decimal WaistOfPants { get; set; }
        public decimal Hips { get; set; }
        public decimal BottomOfPants { get; set; }
        public decimal Thigh { get; set; }
        public decimal PantsLength { get; set; }
        public decimal PantsCircumference { get; set; }
    }
}
