namespace SunriseServerCore.Models
{
    public class Order : ModelBase
    {
        public int OrderId  { get; set; }
        public int AccountId { get; set; }
        public string Address { get; set; }
        public DateTime TimeOrder { get; set; }
        public DateTime TimeDone { get; set; }
        public string Status { get; set; }
        public string PaymentMethod { get; set; }
        public double TotalPrice { get; set; }
    }
}