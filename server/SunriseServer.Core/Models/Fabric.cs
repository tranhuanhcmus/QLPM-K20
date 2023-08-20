using SunriseServer.Common.Constant;

namespace SunriseServerCore.Models
{
    public class Fabric : ModelBase
    {
        // basic info
        public int FabricID { get; set; }
        public float Price { get; set; } = 0;
        public string FabricName { get; set; } = string.Empty;
        public string Material { get; set; } = string.Empty;
        public string Image { get; set; }
        public int Inventory { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Style { get; set; }
        public string Color { get; set; }

    }
}
