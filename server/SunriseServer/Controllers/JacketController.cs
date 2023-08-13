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
        // [HttpGet("{name}")]
        // public ActionResult<JacketProduct> GetJacketByNameOrDescription(string name)
        // {
        //     var result = _jacketService.GetJacketByName(name);
        //     if (result is null)
        //         return NotFound("Jacket not found");

        //     return Ok(result);
        // }
        // get detail by nid
        [HttpGet("{id}")]
        public ActionResult<JacketDetail> GetJacketById(int id)
        {
            var result = _jacketService.GetJacketDetailById(id);
            if (result is null)
                return NotFound("Jacket not found");

            return Ok(result);
        }
        // get by category ??
        // insert one - just for admin
        //[HttpGet("Add-Jacket"), Authorize(Roles = GlobalConstant.Admin)]
        // important note
        // fabric name and other components must use dropdown, does not allow free input -> wrong.
        [HttpPost("Add-Jacket")]
        public async Task<ActionResult<bool>> AddJacket(float price, string image, string name, string description,
            byte discount, string fabricName, string color, string style, string fit, 
            string lapel, string sleeveButton, string pocket, string backStyle, string breastPocket)
        {
            bool result = await _jacketService.AddJacket(price,image,name,description,discount,fabricName,color, style, fit, lapel, pocket, sleeveButton, backStyle, breastPocket);
           
            if (!result)
                return NotFound("Can not insert, please try again");

            return Ok("Add Successfully");

        }
    }
}
