using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class PantsComponent: ModelBase
    {
        public string Pocket { get; set; }
        public string Fit { get; set; }
        public string Cuff { get; set; }
        public string Fastening { get; set; }
        public string Pleats { get; set; }

        public void AutoFillEmpty()
        {
            Pocket = string.IsNullOrWhiteSpace(Pocket) ? "Not specified" : Pocket;
            Fit = string.IsNullOrWhiteSpace(Fit) ? "Not specified" : Fit;
            Cuff = string.IsNullOrWhiteSpace(Cuff) ? "Not specified" : Cuff;
            Fastening = string.IsNullOrWhiteSpace(Fastening) ? "Not specified" : Fastening;
            Pleats = string.IsNullOrWhiteSpace(Pleats) ? "Not specified" : Pleats;
        }

    }
}
