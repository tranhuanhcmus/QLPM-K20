namespace SunriseServerCore.Dtos.Order
{
    public class UpdateOrderDto
    {
        public int Id { get; set; }
        public double TotalPrice { get; set; }
        public int PaymentMethodId { get; set; }
        public DateTime TimeOrder { get; set; }
        public DateTime TimeDone { get; set; }
        public string Status { get; set; }
    }
}