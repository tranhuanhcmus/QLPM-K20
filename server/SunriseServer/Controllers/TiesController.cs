using Microsoft.AspNetCore.Mvc;
using SunriseServer.Services.TiesService;
using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TiesController : ControllerBase
    {
        readonly ITiesService _tiesService;

        public TiesController(ITiesService TiesService, ILogger<TiesController> logger)
        {
            _tiesService = TiesService;
        }


        [HttpGet("All-Ties")]
        public async Task<ActionResult<Product>> GetAll()
        {
            var result = await _tiesService.GetAll();
            if (result is null)
            {
                return NotFound("No Ties found");
            }

            return Ok(result);
        }

        // get by id
        // get detail by nid
        [HttpGet("{id}")]
        public ActionResult<TiesDetail> GetTiesById(int id)
        {
            var result = _tiesService.GetTiesDetailById(id);
            if (result is null)
                return NotFound("Ties not found");

            return Ok(result);
        }
        // get by category ??
        // insert one - just for admin
        // [HttpGet("{name}")]
        // public ActionResult<TiesProduct> GetTiesByNameOrDescription(string name)
        // {
        //     var result = _TiesService.GetTiesByName(name);
        //     if (result is null)
        //         return NotFound("Ties not found");

        //     return Ok(result);
        // }

        [HttpDelete("/Ties/{tiesId}")]
        public async Task<ActionResult<bool>> DeleteTies(int tiesId)
        {
            bool result = await _tiesService.DeleteTies(tiesId);
            if (!result)
                return NotFound("Can not delete, please try again");

            return Ok("Delete Successfully");

        }

        [HttpPost("Add-Ties")]
        public async Task<ActionResult<bool>> AddTies(AddTies at)
        {
            bool result = await _tiesService.AddTies(at);

            if (!result)
                return NotFound("Cannot insert ties, please try again");

            return Ok("Add Successfully");
        }


    }
}
