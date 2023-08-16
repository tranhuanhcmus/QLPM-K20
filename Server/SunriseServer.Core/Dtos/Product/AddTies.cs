using SunriseServer.Common.Constant;

namespace SunriseServerCore.Dtos
{
    public class AddTies: AddProduct
    {
        public string Style { get; set; }
        public decimal Size { get; set; }
                
        public AddTies() : base(GlobalConstant.TiesProduct) { }

    }
}
