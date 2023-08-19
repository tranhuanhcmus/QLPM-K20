using SunriseServer.Common.Constant;


namespace SunriseServerCore.Dtos
{
    public class AddPantsDto: AddProductDto
    {
        public string Pocket { get; set; }
        public string Fit { get; set; }
        public string Cuff { get; set; }
        public string Fastening { get; set; }
        public string Pleats { get; set; }

        public AddPantsDto() : base(GlobalConstant.PantsProduct) { }
    }
}
