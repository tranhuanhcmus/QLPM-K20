using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SunriseServer.Common.Constant;
using SunriseServer.Dtos;
using SunriseServer.Services.AccountService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using SunriseServerCore.Common.Helper;

namespace SunriseServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly IAccountService _accService;

        public AuthController(IConfiguration configuration, IAccountService accService)
        {
            _configuration = configuration;
            _accService = accService;
        }

        [HttpGet, Authorize]
        public ActionResult<string> GetMe()
        {
            var userName = _accService.GetMyName();
            return Ok(userName);
        }

        [HttpPost("register-admin")]
        public async Task<ActionResult<ResponseMessageDetails<string>>> RegisterAdmin(LoginDto request)
        {
            var acc = await _accService.GetByUsername(request.Username);

            if (acc != null)
            {
                return BadRequest("Username exists");
            }

            acc = new Account();
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            acc.Username = request.Username;
            acc.PasswordHash = Helper.ByteArrayToString(passwordHash);
            acc.PasswordSalt = Helper.ByteArrayToString(passwordSalt);
            acc.UserRole = GlobalConstant.Admin;

            var token = CreateToken(acc, GlobalConstant.Admin);
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, acc);
            await _accService.AddAccount(acc);
            return Ok(new ResponseMessageDetails<string>("Register admin successfully", token));
        }

        [HttpPost("register")]
        public async Task<ActionResult<ResponseMessageDetails<string>>> Register(LoginDto request)
        {
            var acc = await _accService.GetByUsername(request.Username);

            if (acc != null)
            {
                return BadRequest("Username exists");
            }

            acc = new Account();
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            acc.Username = request.Username;
            acc.PasswordHash = Helper.ByteArrayToString(passwordHash);
            acc.PasswordSalt = Helper.ByteArrayToString(passwordSalt);
            acc.UserRole = GlobalConstant.User;

            var token = CreateToken(acc, GlobalConstant.User);
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, acc);
            await _accService.AddAccount(acc);
            return Ok(new ResponseMessageDetails<string>("Register user successfully", token));
        }

        [HttpPost("login")]
        public async Task<ActionResult<ResponseMessageDetails<string>>> Login(LoginDto request)
        {
            var account = await _accService.GetByUsername(request.Username);

            if (account == null)
            {
                return NotFound();
            }

            if (account.Username != request.Username ||
                !VerifyPasswordHash(request.Password, Helper.StringToByteArray(account.PasswordHash), Helper.StringToByteArray(account.PasswordSalt)))
            {
                return BadRequest("Wrong credentials");
            }

            string token = CreateToken(account, account.UserRole);

            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, account);

            return Ok(new ResponseMessageDetails<string>("Login user successfully", token));
        }

        [HttpPost("refresh-token"), Authorize]
        public async Task<ActionResult<ResponseMessageDetails<string>>> RefreshToken()
        {
            var acc = await _accService.GetByUsername(User.Identity.Name);
            var refreshToken = Request.Cookies["refreshToken"];

            if (!acc.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (acc.TokenExpires < DateTime.Now)
            {
                return Unauthorized("Token expired.");
            }

            string token = CreateToken(acc, acc.UserRole);
            var newRefreshToken = GenerateRefreshToken();
            SetRefreshToken(newRefreshToken, acc);
            _accService.SaveChanges();
            return Ok(new ResponseMessageDetails<string>("Refresh token successfully", token));
        }

        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.Now.AddDays(7),
                Created = DateTime.Now
            };

            return refreshToken;
        }

        private void SetRefreshToken(RefreshToken newRefreshToken, Account acc)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = newRefreshToken.Expires
            };
            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            acc.RefreshToken = newRefreshToken.Token;
            acc.TokenCreated = newRefreshToken.Created;
            acc.TokenExpires = newRefreshToken.Expires;
        }

        private string CreateToken(Account acc, string role)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, acc.Username),
                new Claim(ClaimTypes.Role, role)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
