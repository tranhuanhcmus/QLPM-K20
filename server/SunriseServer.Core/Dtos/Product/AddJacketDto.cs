using SunriseServer.Common.Constant;

namespace SunriseServerCore.Dtos
{
    public class AddJacketDto: AddProductDto
    {
        public string Style { get; set; }
        public string Fit { get; set; }
        public string Lapel { get; set; }
        public string SleeveButton { get; set; }
        public string BackStyle { get; set; }
        public string BreastPocket { get; set; }
        public string Pocket { get; set; }
        
        
        public AddJacketDto() : base(GlobalConstant.VestProduct) { }

    }
}
