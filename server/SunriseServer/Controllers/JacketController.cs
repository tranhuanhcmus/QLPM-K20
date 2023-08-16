using Microsoft.AspNetCore.Mvc;
using SunriseServer.Services.JacketService;
using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

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
        public ActionResult<Product> GetAll()
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

        //[HttpDelete("/{productId}"), Authorize(Roles = GlobalConstant.Admin)]
        [HttpDelete("/{jacketId}")]
        public ActionResult<bool> DeleteJacket(int jacketId)
        {
            bool result = _jacketService.DeleteJacket(jacketId);
            if (!result)
                return NotFound("Can not delete, please try again");

            return Ok("Delete Successfully");

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
        public async Task<ActionResult<bool>> AddJacket(AddJacket aj)
        {
            bool result = await _jacketService.AddJacket(aj);
           
            if (!result)
                return NotFound("Can not insert, please try again");

            return Ok("Add Successfully");

        }
    }
}
