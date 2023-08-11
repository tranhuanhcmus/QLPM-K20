using System.ComponentModel.DataAnnotations.Schema;

namespace SunriseServerCore.Models
{
    [NotMapped]
    public class MyProcedureResult : ModelBase
    {  
        public int MyValue { get; set; } = 0;
    }
}