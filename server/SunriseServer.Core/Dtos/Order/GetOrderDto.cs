namespace SunriseServerCore.Dtos.Order
{
    public class GetOrderDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime OrderDate { get; set; }
    }
}