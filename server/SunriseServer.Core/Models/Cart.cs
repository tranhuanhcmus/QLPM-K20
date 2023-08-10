using SunriseServer.Common.Constant;

namespace SunriseServerCore.Models
{
    public class Cart : ModelBase
    {
        public int ID  { get; set; }
        public int Customer { get; set; }
        public int Product { get; set; }
        public int NumberOfProduct { get; set; }
    }
}
