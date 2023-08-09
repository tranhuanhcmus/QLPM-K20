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

        public VestController(IVestService vestService, ILogger<VestController> logger)
        {
            _vestService = vestService;
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

        [HttpPost("Add-Vest")]

        public async Task<ActionResult<bool>> AddVest(float price, string image, string name, string description,
            byte discount, string fabricName, string color, string style, string vType, 
            string lapel, string edge, string breastPocket, string frontPocket)
        {
            bool result = await _vestService.AddVest(price, image, name, description, discount, fabricName, color, style, vType, lapel, edge, breastPocket, frontPocket);

            if (!result)
                return NotFound("Cannot insert vest, please try again");

            return Ok("Add Successfully");
        }


    }
}
