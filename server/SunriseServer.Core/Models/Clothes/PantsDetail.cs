using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class PantsDetail: ModelBase
    {
        public PantsComponent Component { get; set; }

        public Product Products { get; set; }

        public PantsDetail() {
        }
        
        public PantsDetail(Product p) {
            Products = p;
        }

        public PantsDetail(PantsComponent component){
            Component = component;
        }
    }
}
