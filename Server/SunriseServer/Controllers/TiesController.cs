using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServer.Services.TiesService;
using SunriseServerCore.Models.Clothes;
using System.Data;

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
        public async Task<ActionResult<TiesDetail>> GetAll()
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

        [HttpPost("Add-Ties")]
        public async Task<ActionResult<bool>> AddTies(float price, string image, string name, string description,
                byte discount, string fabricName, string color, decimal size, string style)
        {
            bool result = await _tiesService.AddTies(price, image, name, description, discount, fabricName, color, size, style);

            if (!result)
                return NotFound("Cannot insert ties, please try again");

            return Ok("Add Successfully");
        }


    }
}
