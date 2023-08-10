using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Models.Clothes
{
    public class Jacket: ModelBase
    {
        public int JacketId { get; set; }
        public int Style { get; set; }
        public int Fit { get; set; }
        public int Lapel { get; set; }
        public int SleeveButton { get; set; }
        public int BackStyle { get; set; }
        public int BreastPocket { get; set; }
        public int Pocket { get; set; }

        /*
        JacketID int auto_increment primary key,
        Style int,
        Fit int,
        Lapel int,
        SleeveButton int,
        BackStyle int,
        BreastPocket int,
	    Pocket int
         */
    }
}
