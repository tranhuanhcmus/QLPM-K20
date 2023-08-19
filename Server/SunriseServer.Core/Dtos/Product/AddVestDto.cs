using SunriseServer.Common.Constant;

namespace SunriseServerCore.Dtos
{
    public class AddVestDto: AddProductDto
    {
        public string Style { get; set; }
        public string VType { get; set; }
        public string Lapel { get; set; }
        public string Edge { get; set; }
        public string BreastPocket { get; set; }
        public string FrontPocket { get; set; }

        public AddVestDto() : base(GlobalConstant.VestProduct) { }

    }
}
