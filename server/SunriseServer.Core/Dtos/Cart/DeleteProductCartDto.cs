using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SunriseServerCore.Dtos.Cart
{
    public class DeleteProductCartDto
    {
        public int AccountId { get; set; }
        public int ProductId { get; set; }
    }
}
