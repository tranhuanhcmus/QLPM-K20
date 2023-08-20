using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SunriseServer.Common.Constant;
using SunriseServerCore.Dtos;
using SunriseServer.Services.AccountService;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using SunriseServerCore.Common.Helper;

namespace SunriseServer.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        readonly IConfiguration _configuration;
        readonly IAccountService _accService;
        private readonly UnitOfWork _unitOfWork;

        public AuthController(IConfiguration configuration, IAccountService accService, UnitOfWork unitOfWork)
        {
            _configuration = configuration;
            _accService = accService;
            _unitOfWork = unitOfWork;
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
            var acc = await _accService.GetByUsername(request.Email);

            if (acc != null)
            {
                return BadRequest("Username exists");
            }

            acc = new Account();
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            acc.AccountId = await _accService.GetNextAccountId();
            acc.Email = request.Email;
            acc.PasswordHash = Helper.ByteArrayToString(passwordHash);
            acc.PasswordSalt = Helper.ByteArrayToString(passwordSalt);
            acc.UserRole = GlobalConstant.Admin;

            var token = CreateToken(acc, GlobalConstant.Admin);
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, acc);
            await _accService.AddAccount(acc);
            return Ok(new {
                message = "Register successfully",
                token
            });
        }

        [HttpPost("register")]
        public async Task<ActionResult<ResponseMessageDetails<string>>> Register(LoginDto request)
        {
            if (request.Password.Length < 6)
                return BadRequest("Password is too weak, must be greater than 6 characters");

            var acc = await _accService.GetByUsername(request.Email);

            if (acc != null)
            {
                return BadRequest("Email exists");
            }

            acc = new Account();
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
            acc.AccountId = await _accService.GetNextAccountId();
            acc.Email = request.Email;
            acc.PasswordHash = Helper.ByteArrayToString(passwordHash);
            acc.PasswordSalt = Helper.ByteArrayToString(passwordSalt);
            acc.UserRole = GlobalConstant.User;

            var token = CreateToken(acc, GlobalConstant.User);
            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, acc);
            await _accService.AddAccount(acc);
            return Ok(new {
                message = "Register successfully",
                token
            });
        }

        [HttpPost("login")]
        public async Task<ActionResult<ResponseMessageDetails<string>>> Login(LoginDto request)
        {
            var account = await _accService.GetByUsername(request.Email);

            if (account == null)
            {
                return NotFound();
            }

            if (account.Email != request.Email ||
                !VerifyPasswordHash(request.Password, Helper.StringToByteArray(account.PasswordHash), Helper.StringToByteArray(account.PasswordSalt)))
            {
                return BadRequest("Wrong credentials");
            }

            string token = CreateToken(account, account.UserRole);

            var refreshToken = GenerateRefreshToken();
            SetRefreshToken(refreshToken, account);

            return Ok(new {
                message = "Register successfully",
                token
            });
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
            await _unitOfWork.SaveChangesAsync();
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
                new Claim(ClaimTypes.Name, acc.Email),
                new Claim(ClaimTypes.Role, role),
                new Claim(ClaimTypes.NameIdentifier, $"{acc.AccountId}"),
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
