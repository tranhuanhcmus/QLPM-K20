using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class PantsDetail: ModelBase
    {
        public int PantsId { get; set; }
        public string Pocket { get; set; }
        public string Fit { get; set; }
        public string Cuff { get; set; }
        public string Fastening { get; set; }
        public string Pleats { get; set; }

        public Product Products { get; set; }
    }
}
