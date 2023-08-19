using SunriseServer.Common.Constant;

namespace SunriseServerCore.Dtos
{
    public class AddTiesDto: AddProductDto
    {
        public string Style { get; set; }
        public decimal Size { get; set; }
                
        public AddTiesDto() : base(GlobalConstant.TiesProduct) { }

    }
}
