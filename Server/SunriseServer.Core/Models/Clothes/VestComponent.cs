using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class VestComponent: ModelBase
    {
        public string Style { get; set; }
        public string Type { get; set; }
        public string Lapel { get; set; }
        public string Edge { get; set; }
        public string BreastPocket { get; set; }
        public string FrontPocket { get; set; }

        public void AutoFillEmpty()
        {
            Style = string.IsNullOrWhiteSpace(Style) ? "Not specified" : Style;
            Type = string.IsNullOrWhiteSpace(Type) ? "Not specified" : Type;
            Lapel = string.IsNullOrWhiteSpace(Lapel) ? "Not specified" : Lapel;
            Edge = string.IsNullOrWhiteSpace(Edge) ? "Not specified" : Edge;
            BreastPocket = string.IsNullOrWhiteSpace(BreastPocket) ? "Not specified" : BreastPocket;
            FrontPocket = string.IsNullOrWhiteSpace(FrontPocket) ? "Not specified" : FrontPocket;
        }


    }
}
