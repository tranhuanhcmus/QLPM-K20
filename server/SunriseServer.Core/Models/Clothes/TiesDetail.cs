using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class TiesDetail: ModelBase
    {
        public TiesComponent Component { get; set; }

        public Product Products { get; set; }

        public TiesDetail() {
        }
        
        public TiesDetail(Product p) {
            Products = p;
        }

        public TiesDetail(TiesComponent component){
            Component = component;
        }
    }
}
