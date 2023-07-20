namespace SunriseServerCore.Models
{
    public class PaymentMethod
    {
        public int AccountId { get; set; }
        public int MethodId { get; set; }
        public string CardHolder { get; set; } = string.Empty;
        public string CardNumber { get; set; } = string.Empty;
        public DateOnly ExpiryDate { get; set; }
    }
}
