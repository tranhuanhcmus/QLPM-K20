using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
//using SunriseServer.Dtos;
using SunriseServer.Services.JacketService;
using SunriseServerCore.Models.Clothes;
using System.Data;
using System.Xml.Linq;

namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JacketController : ControllerBase
    {
        readonly IJacketService _jacketService;
        private readonly ILogger<JacketController> _logger;

        public JacketController(IJacketService jacketService, ILogger<JacketController> logger)
        {
            _jacketService = jacketService;
            _logger = logger;
        }


        [HttpGet("All-Jacket")]
        public ActionResult<JacketProduct> GetAll()
        {
            var result = _jacketService.GetAllSpecial();
            if (result is null)
            {
                _logger.LogInformation("No jackets found");
                return NotFound("No jackets found");
            }

            _logger.LogInformation("Retrieved jackets successfully");
            return Ok(result);
        }

        // get by name
        [HttpGet("{name}")]
        public ActionResult<JacketProduct> GetJacketByNameOrDescription(string name)
        {
            var result = _jacketService.GetJacketByName(name);
            if (result is null)
                return NotFound("Jacket not found");

            return Ok(result);
        }
        // get detail by nid
        [HttpGet("id/{id}")]
        public ActionResult<JacketDetail> GetJacketById(int id)
        {
            var result = _jacketService.GetJacketDetailById(id);
            if (result is null)
                return NotFound("Jacket not found");

            return Ok(result);
        }
        // get by category ??
        // insert one - just for admin
        [HttpGet("Add-Jacket"), Authorize(Roles = GlobalConstant.Admin)]
        public ActionResult<JacketProduct> AddJacket(Product p, string Style,
            string fit, string lapel, string pocket, string sleeveButton, string backStyle, string breastPocket)
        {
            var result = _jacketService.AddJacket(p, Style, fit, lapel, pocket, sleeveButton, backStyle, breastPocket);
           
            if (result == false)
                return NotFound("Jacket not found");

            return Ok(result);

        }
    }
}
