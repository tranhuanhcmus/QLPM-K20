using Microsoft.AspNetCore.Mvc;
using SunriseServer.Services.VestService;
using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VestController : ControllerBase
    {
        readonly IVestService _vestService;

        public VestController(IVestService vestService, ILogger<VestController> logger)
        {
            _vestService = vestService;
        }


        [HttpGet("All-Vest")]
        public async Task<ActionResult<Product>> GetAll()
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
        [HttpGet("{id}")]
        public ActionResult<VestDetail> GetVestById(int id)
        {
            var result = _vestService.GetVestDetailById(id);
            if (result is null)
                return NotFound("Vest not found");

            return Ok(result);
        }
        // get by category ??
        // insert one - just for admin
        // [HttpGet("{name}")]
        // public ActionResult<VestProduct> GetVestByNameOrDescription(string name)
        // {
        //     var result = _vestService.GetVestByName(name);
        //     if (result is null)
        //         return NotFound("Vest not found");

        //     return Ok(result);
        // }

        [HttpDelete("/Vest/{vestId}")]
        public async Task<ActionResult<bool>> DeleteVest(int vestId)
        {
            bool result = await _vestService.DeleteVest(vestId);
            if (!result)
                return NotFound("Can not delete, please try again");

            return Ok("Delete Successfully");

        }

        [HttpPost("Add-Vest")]

        public async Task<ActionResult<bool>> AddVest(AddVest av)
        {
            bool result = await _vestService.AddVest(av);

            if (!result)
                return NotFound("Cannot insert vest, please try again");

            return Ok("Add Successfully");
        }


    }
}
