using SunriseServer.Common.Constant;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Net;
using System.Xml.Linq;

namespace SunriseServerCore.Models
{
    public class Account : ModelBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AccountId { get; set; }
        public string Username { get; set; } = "Guest 1";
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string Phone { get; set; } = "0908070633";
        public string Email { get; set; } = string.Empty;
        public string Address { get; set; } = "TP.HCM";
        public string UserRole { get; set; } = GlobalConstant.User;
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime TokenCreated { get; set; }
        public DateTime TokenExpires { get; set; }
    }
}
