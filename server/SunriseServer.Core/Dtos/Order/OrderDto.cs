namespace SunriseServerCore.Dtos.Order
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public double TotalPrice { get; set; }
        public int PaymentMethodId { get; set; }
        public DateTime OrderDate { get; set; } 
        public string Status { get; set; }
    }

    public class CreateOrderDto
    {
        public int AccountId { get; set; }
        public double TotalPrice { get; set; }
        public int PaymentMethodId { get; set; } 
        public string ShippingAddress { get; set; }
    }

    public class UpdateOrderDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
    }
}