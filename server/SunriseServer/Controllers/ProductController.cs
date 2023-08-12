using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SunriseServer.Common.Constant;
//using SunriseServer.Dtos;
using SunriseServer.Services.ProductService;
using SunriseServerCore.Models.Clothes;
using System.Data;
using System.Xml.Linq;

namespace SunriseServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        readonly IProductService _productService;
        private readonly ILogger<ProductController> _logger;

        public ProductController(IProductService ProductService, ILogger<ProductController> logger)
        {
            _productService = ProductService;
            _logger = logger;
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
        
        
    }
}
