using System.Text.Json.Serialization;
using SunriseServerCore.Dtos.Product;

namespace SunriseServerCore.Dtos.Cart
{
    public class CartDto
    {
        public int ID  { get; set; }
        public int Customer { get; set; }
        public int Product { get; set; }
        public int NumberOfProduct { get; set; }
    }

    public class AddToCartDto
    {
        [JsonIgnore]
        public int Customer { get; set; }
        public int Product { get; set; }
        public int NumberOfProduct { get; set; } = 1;
    }

    public class ChangeItemNumDto
    {
        [JsonIgnore]
        public int AccountId { get; set; }
        public int ProductId { get; set; }
        public int Number { get; set; } = 1;
    }

    public class InputChangeItemNumDto
    {
        public int ProductId { get; set; }
        public int Number { get; set; } = 1;
    }

    public class UpdateCartDto
    {
        public int Customer { get; set; }
        public int Product { get; set; }
        public int NumberOfProduct { get; set; } = 1;
    }

    public class UpdateCartAllDto
    {
        public List<ProductWithQuantityDto> prod;
    }
}
