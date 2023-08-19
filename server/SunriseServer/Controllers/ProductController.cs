using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
using SunriseServerCore.Dtos;
using SunriseServer.Services.ProductService;
using SunriseServer.Services.JacketService;
using SunriseServer.Services.VestService;
using SunriseServer.Services.PantsService;
using SunriseServerCore.Models;
using SunriseServer.Services.TiesService;


namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        readonly IProductService _productService;
        readonly IJacketService _jacketService;
        readonly IVestService _vestService;
        readonly IPantsService _pantsService;
        readonly ITiesService _tiesService;

        public ProductController( IProductService productService,
            IJacketService jacketService, IVestService vestService,
                IPantsService pantsService, ITiesService tiesService)
        {
            _productService = productService;
            _jacketService = jacketService;
            _vestService = vestService;
            _pantsService = pantsService;
            _tiesService = tiesService;
        }



        [HttpGet("All-Product")]
        public ActionResult<Product> GetAll()
        {
            var result = _productService.GetAll();
            if (result is null)
            {
                return NotFound("No Products found");
            }

            return Ok(result);
        }

        [HttpGet("Category")]
        public async Task<ActionResult<List<Product>>> GetByProductType(string type)
        {
            var result = await _productService.GetByCategory(type);
            if (result is null)
                return NotFound("Product category not found");

            return Ok(result);
        }

        [HttpGet("Name")]

        public async Task<ActionResult<List<Product>>> GetByName(string name)
        {
            var result = await _productService.GetByName(name);
            if (result is null)
                return NotFound("Product not found");

            return Ok(result);
        }

        // get by name
       
        // get detail by nid
        [HttpGet("id/{id}")]
        public ActionResult<Product> GetProductById(int id)
        {
            var result = _productService.GetProductById(id);
            if (result is null)
                return NotFound("Product not found");

            return Ok(result);
        }


        [HttpGet("Detail/{id}")]
        public async Task<ActionResult<ModelBase>> GetDetailProductById(int id)
        {
            string type = await _productService.GetProductType(id);
            if (type == GlobalConstant.EmptyString)
                return NotFound("Product not found");

            // this is switch case to return the product details with the product id and type;
            return type.ToUpper() switch
            {
                GlobalConstant.JacketProduct => (ActionResult<ModelBase>)_jacketService.GetJacketDetailById(id),
                GlobalConstant.VestProduct => (ActionResult<ModelBase>)_vestService.GetVestDetailById(id),
                GlobalConstant.TiesProduct => (ActionResult<ModelBase>)_tiesService.GetTiesDetailById(id),
                GlobalConstant.PantsProduct => (ActionResult<ModelBase>)_pantsService.GetPantsDetailById(id),
                _ => (ActionResult<ModelBase>)NotFound("Product not found"),
            };
        }
        
        
    }
}
