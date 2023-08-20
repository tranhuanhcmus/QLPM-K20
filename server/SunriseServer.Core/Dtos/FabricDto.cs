using SunriseServerCore.Models;

namespace SunriseServerCore.Dtos.Fabric
{
    public class GetFabricDto : ModelBase
    {
        public int FabricID { get; set; }
        public string FabricName { get; set; }
        public string Material { get; set; }
        public double Price { get; set; }
        public string Color { get; set; }
        public string Style { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public int Inventory { get; set; }
    }

    public class AddFabricDto
    {
        public string FabricName { get; set; }
        public string Material { get; set; }
        public float Price { get; set; }
        public string Color { get; set; }
        public string Style { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public int Inventory { get; set; }
    }
    public class UpdateFabricDto
    {
        public int FabricID { get; set; }
        public string FabricName { get; set; }
        public string Material { get; set; }
        public float Price { get; set; }
        public string Color { get; set; }
        public string Style { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }
        public int Inventory { get; set; }
    }

}