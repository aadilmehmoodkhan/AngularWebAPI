using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AngularWebAPI.Model.Entities;
using AngularWebAPI.Model.Repositories.Abstract;
using AngularWebAPI.Model.Util;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AngularWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
		private SignInManager<AppUser> SignInManager { get; }
		public UserManager<AppUser> UserManager { get; }
		public IUserRepository UserRepository { get; }

		public AuthController(
			SignInManager<AppUser> signInManager, 
			UserManager<AppUser> userManager,
			IUserRepository userRepository)
		{
			SignInManager = signInManager;
			UserManager = userManager;
			UserRepository = userRepository;
		}

		[HttpPost]
		[Route("login")]
		public async Task<IActionResult> Login([FromBody] AuthControllerLogin model)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest();
			}
			var signInResult = await SignInManager.PasswordSignInAsync(model.UserName, model.Password, false, false);
			if (signInResult.Succeeded)
			{
				return Ok();
			}
			return Unauthorized();
		}

		[HttpPost]
		[Route("signup")]
		public async Task<IActionResult> Signup([FromBody] AuthControllerSignup model)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ApiResponse<object>.Create(null, ResponseType.Error, "Invalid request"));
			}

			var newUser = new AppUser { Email = model.Email, FullName = model.FullName, UserName = model.UserName };
			var createUserResult = await UserManager.CreateAsync(newUser, model.Password);
			if (createUserResult.Succeeded)
			{
				await SignInManager.SignInAsync(newUser, false);
				return Ok(ApiResponse<AppUser>.Create(newUser, ResponseType.Success, "User signup successfull"));
			}
			return BadRequest(ApiResponse<string[]>.Create(createUserResult.Errors.Select(o => o.Description).ToArray(), ResponseType.Error));
		}

		[HttpPost]
		[Authorize]
		[Route("signout")]
		public async Task Signout()
		{
			await SignInManager.SignOutAsync();
		}

		[HttpGet]
		[Authorize]
		[Route("profile")]
		public async Task<IActionResult> GetProfile()
		{
			var model = new AuthControllerProfile(await UserRepository.GetUserByUserName(User.Identity.Name));
			return Ok(ApiResponse<AuthControllerProfile>.Create(model, ResponseType.Success));
		}

		[HttpPut]
		[Authorize]
		[Route("profile")]
		public async Task<IActionResult> ProfileUpdate([FromBody] AuthControllerProfile model)
		{
			if (ModelState.IsValid)
			{
				var user = await UserRepository.GetUserByUserName(User.Identity.Name);
				if (user != null)
				{
					user.FullName = model.FullName ?? user.FullName;
					user.Age = model.Age ?? user.Age;
					user.DOB = model.DOB ?? user.DOB;
					user.Bio = model.Bio ?? user.Bio;

					await UserRepository.WriteChanges();
					return Ok(ApiResponse<object>.Create(null, ResponseType.Success, "Profile saved successfully"));
				}
			}
			return BadRequest(ApiResponse<object>.Create(null, ResponseType.Error, "Invalid request"));
		}

    }
}
