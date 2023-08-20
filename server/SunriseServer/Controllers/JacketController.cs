using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServer.Services.JacketService;
using SunriseServerCore.Dtos;
using SunriseServerCore.Models.Clothes;

namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/jacket")]
    public class JacketController : ControllerBase
    {
        readonly IJacketService _jacketService;

        public JacketController(IJacketService jacketService)
        {
            _jacketService = jacketService;
        }


        [HttpGet("all")]
        public ActionResult<List<Product>> GetAll()
        {
            var result = _jacketService.GetAllSpecial();
            if (result is null)
            {
                return NotFound("No jackets found");
            }

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
        [HttpGet("")]
        public ActionResult<JacketDetail> GetJacketById(int id)
        {
            var result = _jacketService.GetJacketDetailById(id);
            if (result is null)
                return NotFound("Jacket not found");

            return Ok(result);
        }

        [HttpGet("get-image-custom")]
        public async Task<ActionResult<ImageDto>> GetJacketImageByCustom(string fabric,[FromQuery] JacketComponent jacket)
        {
            if (string.IsNullOrWhiteSpace(fabric))
                return BadRequest("Please ennter the Fabric ");
            jacket.AutoFillEmpty();

            
            var result = await _jacketService.GetImageByCustom(fabric, jacket);
            if (result is null)
                return NotFound("Image not found");

            return Ok(result);
        }


        //[HttpDelete("/{productId}"), Authorize(Roles = GlobalConstant.Admin)]
        [HttpDelete("")]
        public async Task<ActionResult<bool>> DeleteJacket(int jacketId)
        {
            bool result = await _jacketService.DeleteJacket(jacketId);
            if (!result)
                return NotFound("Can not delete, please try again");

            return Ok("Delete Successfully");

        }

        
        
        [HttpPost("add")]
        public async Task<ActionResult<bool>> AddJacket(AddJacketDto aj)
        {
            bool result = await _jacketService.AddJacket(aj);
           
            if (!result)
                return NotFound("Can not insert, please try again");

            return Ok("Add Successfully");

        }

        [HttpPut("update")]
        public async Task<ActionResult<bool>> UpdateJacket(JacketDetail jacketToUpdate) {

            jacketToUpdate.Products.Type = GlobalConstant.JacketProduct;
            bool result = await _jacketService.UpdateJacket(jacketToUpdate.Products,jacketToUpdate.Component);
           
            if (!result)
                return NotFound("Can not Update, please try again");

            return Ok("Update Successfully");
        }
    }
}
