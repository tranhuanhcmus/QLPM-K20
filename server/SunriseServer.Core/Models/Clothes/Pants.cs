using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class Pants: ModelBase
    {
        public int PantsID { get; set; }
        public int Fit { get; set; }
        public int Pleats { get; set; }

        public int Fastening { get; set; }
        public int Cuff { get; set; }
        public int Pocket { get; set; }

    }
}
