using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Seekr.Models.DTO;
using Seekr.Repositories.Interface;
using System.Security.Claims;

namespace Seekr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ITokenRepository _tokenRepository;
        public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
        {
            _userManager = userManager;
            _tokenRepository = tokenRepository;
        }



        [HttpPost]
        [Route("login")]

        public async Task<IActionResult> Login(LoginRequestDTO loginReq)
        {
            //Check email
            var identityUserEmailCheck = await _userManager.FindByEmailAsync(loginReq.Email);// if email exists it'll gimme the IdentityUser
            //Check password
            if (identityUserEmailCheck is not null)
            {
                var checkPassword = await _userManager.CheckPasswordAsync(identityUserEmailCheck, loginReq.Password);
                //returning roles and credientials of the particular user
                if (checkPassword)
                {
                    var roles = await _userManager.GetRolesAsync(identityUserEmailCheck);
                    var JWT = _tokenRepository.CreateToken(identityUserEmailCheck, roles.ToList());
                    var response = new LoginResponseDTO
                    {
                        Email = loginReq.Email,
                        Roles = roles.ToList()
                    };

                    // setting token as http only cookie
                    Response.Cookies.Append("jwt_token", JWT, new CookieOptions
                    {
                        HttpOnly = true,
                        Secure = true,
                        SameSite = SameSiteMode.None,
                        Expires = DateTime.UtcNow.AddMinutes(15)
                    });
                    return Ok(response);
                }
            }
            ModelState.AddModelError("", "Email or Password Incorrect");
            return ValidationProblem(ModelState);
        }

        [HttpPost]
        [Route("register")]

        public async Task<IActionResult> Register(RegisterRequestDTO regReqest)
        {
            // Create IdetityUser Object
            var user = new IdentityUser
            {
                UserName = regReqest.Email?.Trim(),
                Email = regReqest.Email?.Trim(),
            };
            //Seed the user to the database
            var result = await _userManager.CreateAsync(user, regReqest.Password);
            if (result.Succeeded)
            {
                //Add Role to user Reader

                //When the user register with the credientials he has only "User" role, need not get Admin ie. "Administrator" role.
                result = await _userManager.AddToRoleAsync(user, "User");
                if (result.Succeeded)
                {
                    return Ok();
                }
                else
                {
                    // sending list of errors
                    if (result.Errors.Any())
                    {
                        foreach (var error in result.Errors)
                        {
                            ModelState.AddModelError(" ", error.Description);
                        }
                    }
                }
            }
            else
            {
                // sending list of errors
                if (result.Errors.Any())
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(" ", error.Description);
                    }
                }
            }
            return ValidationProblem(ModelState);
        }

        [Authorize]
        [HttpGet]
        [Route("me")]

        public async Task<IActionResult> UserDetails ()
        {
           if(User.Identity is null ||  !User.Identity.IsAuthenticated)
           {
                return Unauthorized();

           }
            var response = new LoginResponseDTO
            {
                Email = User.FindFirst(ClaimTypes.Email)?.Value,
                Roles = User.FindAll(ClaimTypes.Role).Select(x => x.Value).ToList()
            };
            return Ok(response);
        }


        [HttpPost]
        [Authorize]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            // when logs out, overrite the same cookie by setting its expiration date to a past date
            Response.Cookies.Append("jwt_token","", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Lax,
                Expires = DateTime.UtcNow.AddDays(-1) // just set to past date
            });
            return Ok();
        }
    } 
}
