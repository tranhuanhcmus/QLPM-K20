using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServer.Services.JacketService;
using SunriseServerCore.Models.Clothes;
using System.Data;

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


        [HttpGet("All-jacket")]
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

        // get by id
        // get by category ??
        // insert one - just for admin


    }
}
