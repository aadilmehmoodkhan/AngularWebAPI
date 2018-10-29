using AngularWebAPI.Model.Entities;
using AngularWebAPI.Model.Repositories.Abstract;
using AngularWebAPI.Model.Util;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize]
	public class JobsController : ControllerBase
    {
		public JobsController(IJobsRepository jobsRepository)
		{
			JobsRepository = jobsRepository;
		}

		public IJobsRepository JobsRepository { get; }

		[HttpGet]
		[Route("list/{pageNo:int}")]
		public async Task<IActionResult> GetLatestPostedJobsPage(int pageNo)
		{
			throw new NotImplementedException();
		}

		[HttpGet, Route("skillsAndCategories")]
		public async Task<JobsControllerGetAllSkillsAndCategories> GetAllSkillsAndCategories()
		{
			return await JobsRepository.GetAllSkillsAndCategories();
		}

		[HttpPost]
		[Route("post")]
		public async Task<IActionResult> PostNewJob(JobsControllerPostNewJob model)
		{
			var validateModel = model.Validate();
			if (!validateModel.validated)
			{
				Array.ForEach(validateModel.errorMessages, error => ModelState.AddModelError("Model", error));
			}
			if (!ModelState.IsValid)
			{
				var errors = ModelState.Values.SelectMany(o => o.Errors).Select(o => o.ErrorMessage).ToArray();
				return BadRequest(ApiResponse<string[]>.Create(errors, ResponseType.Error, "Invalid data"));
			}

			model.PostedByUserName = User.Identity.Name;
			var newJobId = await JobsRepository.PostNewJob(model);
			if(newJobId > 0)
			{
				return Ok(ApiResponse<int>.Create(newJobId, ResponseType.Success));
			}
			return BadRequest(ApiResponse<object>.Create(null, ResponseType.Error, "Unable to post job"));
		}
    }
}
