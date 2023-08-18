namespace SunriseServerCore.Models
{
    public class OrderDetail : ModelBase
    {
        public int Orders { get; set; }
        public int Product { get; set; }
        public int NumberOfOrder { get; set; }
        public float Price { get; set; }
    }
}