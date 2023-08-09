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

        public VestController(IVestService vestService, ILogger<VestController> logger)
        {
            _vestService = vestService;
            _logger = logger;
        }


        [HttpGet("All-Vest")]
        public async Task<ActionResult<VestProduct>> GetAll()
        {
            var result = await _vestService.GetAll();
            if (result is null)
            {
                return NotFound("No Vest found");
            }

            return Ok(result);
        }

        // get by id
        // get detail by nid
        [HttpGet("id/{id}")]
        public ActionResult<VestDetail> GetVestById(int id)
        {
            var result = _vestService.GetVestDetailById(id);
            if (result is null)
                return NotFound("Vest not found");

            return Ok(result);
        }
        // get by category ??
        // insert one - just for admin
        [HttpGet("{name}")]
        public ActionResult<VestProduct> GetVestByNameOrDescription(string name)
        {
            var result = _vestService.GetVestByName(name);
            if (result is null)
                return NotFound("Vest not found");

            return Ok(result);
        }

    }
}
