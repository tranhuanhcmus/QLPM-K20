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
        public int Customer { get; set; }
        public int Product { get; set; }
        public int NumberOfProduct { get; set; } = 1;
    }

    public class UpdateCartDto
    {
        public int Customer { get; set; }
        public int Product { get; set; }
        public int NumberOfProduct { get; set; } = 1;
    }
}
