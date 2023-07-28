using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServer.Services.VestService;
using SunriseServerCore.Models.Clothes;
using System.Data;

namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VestController : ControllerBase
    {
        readonly IVestService _vestService;
        private readonly ILogger<VestController> _logger;

        public VestController(IVestService jacketService, ILogger<VestController> logger)
        {
            _vestService = jacketService;
            _logger = logger;
        }


        [HttpGet("All-Vest")]
        public ActionResult<JacketProduct> GetAll()
        {
            var result = _vestService.GetAllSpecial();
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
