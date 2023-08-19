
namespace SunriseServerCore.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public double Price { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Discount { get; set; }
        public int Fabric { get; set; }
        public string FabricName { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
    }
}