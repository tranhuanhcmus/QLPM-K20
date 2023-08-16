namespace SunriseServerCore.Dtos
{
    public class AddProduct
    {
       public double Price { get; set; } = 0;
        public string Image { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public byte Discount { get; set; }
        public int Fabric { get; set; }
        public string FabricName { get; set; }
        public string Color { get; set; }

        public readonly string Type ;
        public AddProduct(string type)
        {
            Type = type;
        }
    }
}