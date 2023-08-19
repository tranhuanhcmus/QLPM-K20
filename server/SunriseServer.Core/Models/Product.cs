using SunriseServer.Common.Constant;

namespace SunriseServerCore.Models
{
    public class Product : ModelBase
    {
        // basic info
        public int ProductID { get; set; }
        public double Price { get; set; } = 0;
        public string ImageFront { get; set; }
        public string ImageBack { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public byte Discount { get; set; }
        public int Fabric { get; set; }
        public string FabricName { get; set; }
        public string color { get; set; }
        public string Type { get; set; } = string.Empty;

    }
}
