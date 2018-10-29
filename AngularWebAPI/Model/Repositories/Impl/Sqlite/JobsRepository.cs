using AngularWebAPI.Controllers;
using AngularWebAPI.Model.Context;
using AngularWebAPI.Model.Entities;
using AngularWebAPI.Model.Repositories.Abstract;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace AngularWebAPI.Model.Repositories.Impl.Sqlite
{
	public class JobsRepository : IJobsRepository
	{
		public JobsRepository(SqliteAppDbContext sqliteAppDbContext, UserManager<AppUser> userManager)
		{
			SqliteAppDbContext = sqliteAppDbContext;
			UserManager = userManager;
		}

		public SqliteAppDbContext SqliteAppDbContext { get; }
		public UserManager<AppUser> UserManager { get; }

		public async Task<JobsControllerGetAllSkillsAndCategories> GetAllSkillsAndCategories()
		{
			return await Task.Run(() =>
			{
				return new JobsControllerGetAllSkillsAndCategories
				{
					Skills = SqliteAppDbContext.Skills.ToArray(),
					Categories = SqliteAppDbContext.Categories.ToArray()
				};
			});
		}

		public async Task<int> PostNewJob(JobsControllerPostNewJob newJob)
		{
			int newJobId = 0;
			var userId = UserManager.Users.SingleOrDefault(o => o.UserName == newJob.PostedByUserName).Id;
			var job = new Entities.Job
			{
				Title = newJob.Title,
				Details = newJob.Details,
				CreatedOn = DateTime.Now,
				PostedBy = userId,
				FixedPrice = newJob.FixedPrice,
				HourlyRate = newJob.HourlyRate
			};

			SqliteAppDbContext.Jobs.Add(job);
			await SqliteAppDbContext.SaveChangesAsync();

			foreach (var skill in newJob.Skills)
			{
				SqliteAppDbContext.JobSkills.Add(new JobSkill { JobId = job.Id, SkillId = skill });
			}
			foreach (var category in newJob.Categories)
			{
				SqliteAppDbContext.JobCategories.Add(new JobCategory { JobId = job.Id, CategoryId = category });
			}

			await SqliteAppDbContext.SaveChangesAsync();
			newJobId = job.Id;
			return newJobId;
		}
	}
}
