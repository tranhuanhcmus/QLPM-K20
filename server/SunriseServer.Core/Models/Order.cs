namespace SunriseServerCore.Models
{
    public class Order : ModelBase
    {
        public int OrderId { get; set; }
        public int Customer { get; set; }
        public float TotalPrice { get; set; }
        public string PaymentMethod { get; set; }
        public string Address { get; set; }
        public DateTime TimeOrder { get; set; }
        public DateOnly TimeDone { get; set; }
        public OrderDetail[] OrderDetails { get; set; }
        public string Status { get; set; }
    }
}