using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class JacketComponent
    {
        public string Style { get; set; }
        public string Fit { get; set; }
        public string Lapel { get; set; }
        public string SleeveButton { get; set; }
        public string BackStyle { get; set; }
        public string BreastPocket { get; set; }
        public string Pocket { get; set; }

        public void AutoFillEmpty()
        {
            Style = string.IsNullOrWhiteSpace(Style) ? "Not specified" : Style;
            Fit = string.IsNullOrWhiteSpace(Fit) ? "Not specified" : Fit;
            Lapel = string.IsNullOrWhiteSpace(Lapel) ? "Not specified" : Lapel;
            SleeveButton = string.IsNullOrWhiteSpace(SleeveButton) ? "Not specified" : SleeveButton;
            BackStyle = string.IsNullOrWhiteSpace(BackStyle) ? "Not specified" : BackStyle;
            BreastPocket = string.IsNullOrWhiteSpace(BreastPocket) ? "Not specified" : BreastPocket;
            Pocket = string.IsNullOrWhiteSpace(Pocket) ? "Not specified" : Pocket;
        }

    }
}
