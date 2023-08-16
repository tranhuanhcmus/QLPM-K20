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

    }
}
