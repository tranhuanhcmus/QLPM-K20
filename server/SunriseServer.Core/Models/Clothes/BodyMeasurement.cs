using SunriseServer.Common.Constant;

namespace SunriseServerCore.Models.Clothes
{
    public class BodyMeasurement : ModelBase
    {
        public int Customer { get; set; }
        public decimal Armhole { get; set; } = 1;
        public decimal Chest { get; set; } = 1;
        public decimal Crotch { get; set; } = 1;
        public decimal Hip { get; set; } = 1;
        public decimal Jacket_length { get; set; } = 1;
        public decimal Neck { get; set; } = 1;
        public decimal Pants_circum { get; set; } = 1;
        public decimal Pants_length { get; set; } = 1;
        public decimal Pants_waist { get; set; } = 1;
        public decimal Shoulder { get; set; } = 1;
        public decimal Sleeve_length { get; set; } = 1;
        public decimal Thigh { get; set; } = 1;
        public decimal Waist { get; set; } = 1;
    }

    public class PostBodyMeasureMentDto
    {
        public decimal Armhole { get; set; } = 1;
        public decimal Chest { get; set; } = 1;
        public decimal Crotch { get; set; } = 1;
        public decimal Hip { get; set; } = 1;
        public decimal Jacket_length { get; set; } = 1;
        public decimal Neck { get; set; } = 1;
        public decimal Pants_circum { get; set; } = 1;
        public decimal Pants_length { get; set; } = 1;
        public decimal Pants_waist { get; set; } = 1;
        public decimal Shoulder { get; set; } = 1;
        public decimal Sleeve_length { get; set; } = 1;
        public decimal Thigh { get; set; } = 1;
        public decimal Waist { get; set; } = 1;
    }
}
