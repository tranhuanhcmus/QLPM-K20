//  ----------------------------------------------------------------    
//
//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//                   Buddha Bless Us 
//                  No error - No Bug
//  ----------------------------------------------------------------    

global using SunriseServerCore.Models;
global using SunriseServerData;
using SunriseServer.Services.AccountService;
using SunriseServer.Services.JacketService;
using SunriseServer.Services.VestService;
using SunriseServer.Services.PantsService;
using SunriseServer.Services.ProductService;
using SunriseServer.Services.TiesService;

using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using SunriseServer.Services.CartService;
using SunriseServer.Services.OrderService;
using SunriseServer.Services.FabricService;
using SunriseServer.Services.BodyService;
using SunriseServer.Services.PaymentService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IJacketService, JacketService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IFabricService, FabricService>();
builder.Services.AddScoped<IVestService,VestService>();
builder.Services.AddScoped<IPantsService, PantsService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ITiesService, TiesService>();
builder.Services.AddScoped<IBodyService, BodyService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value!)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
builder.Services.AddCors(options => options.AddPolicy(name: "NgOrigins",
    policy =>
    {
        policy.WithOrigins("http://localhost:7256").AllowAnyMethod().AllowAnyHeader();
        policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
    }));

builder.Services.AddServicesData();
builder.Services.Configure<StripeSettings>(builder.Configuration.GetSection("StripeSettings"));
builder.Services.AddUnitOfWork(options => options.UseSqlServer(builder.Configuration.GetConnectionString("AZURE_CONNECTION_STRING")));
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("NgOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
