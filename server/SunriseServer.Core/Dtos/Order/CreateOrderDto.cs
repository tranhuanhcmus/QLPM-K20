namespace SunriseServerCore.Dtos.Order
{
    public class CreateOrderDto
    {
        public int AccountId { get; set; }
        public double TotalPrice { get; set; }
        public int PaymentMethodId { get; set; }
        public DateTime TimeOrder { get; set; }
        public string Status { get; set; }
    }
}