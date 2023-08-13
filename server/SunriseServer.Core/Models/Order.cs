using SunriseServer.Common.Constant;

namespace SunriseServerCore.Models
{
    public class Order : ModelBase
    {
        public int AccountId { get; set; }
        public double TotalPrice { get; set; }
        public int MethodId { get; set; }
        public DateTime TimeOrder { get; set; }
        public DateTime? TimeDone { get; set; }
        public string Status { get; set; }
    }
}