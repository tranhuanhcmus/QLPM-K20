using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServer.Services.PantsService;
using SunriseServerCore.Models.Clothes;
using System.Data;

namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PantsController : ControllerBase
    {
        readonly IPantsService _pantsService;
        private readonly ILogger<PantsController> _logger;

        public PantsController(IPantsService PantsService, ILogger<PantsController> logger)
        {
            _pantsService = PantsService;
            _logger = logger;
        }


        [HttpGet("All-Pants")]
        public async Task<ActionResult<PantsProduct>> GetAll()
        {
            var result = await _pantsService.GetAll();
            if (result is null)
            {
                return NotFound("No jackets found");
            }

            return Ok(result);
        }
        // get by name
        [HttpGet("{name}")]
        public ActionResult<PantsProduct> GetJacketByNameOrDescription(string name)
        {
            var result = _pantsService.GetPantsByName(name);
            if (result is null)
                return NotFound("Jacket not found");

            return Ok(result);
        }

        // get by id
        // get by category ??
        // insert one - just for admin


    }
}
