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
					Skills = SqliteAppDbContext.Skills.OrderBy(o => o.Name).ToArray(),
					Categories = SqliteAppDbContext.Categories.OrderBy(o => o.Name).ToArray()
				};
			});
		}

		public async Task<JobsControllerGetLatestJobs> GetLatestJobs(int itemsPerPage = 10, int pageNo = 1)
		{
			var allSkills = SqliteAppDbContext.Skills.ToArray();
			var allCategories = SqliteAppDbContext.Categories.ToArray();

			return await Task.Run(() =>
				new JobsControllerGetLatestJobs
				{
					TotalJobCount = SqliteAppDbContext.JobCategories.Count(),
					PageSize = itemsPerPage,
					PageNo = pageNo,
					Data = SqliteAppDbContext.Jobs
					.Join(SqliteAppDbContext.Users, j => j.PostedBy, u => u.Id, (j, u) => new { job = j, u.FullName })
					.GroupJoin(SqliteAppDbContext.JobProposals, j => j.job.Id, p => p.JobId, (job, p) => new { Job = job.job, job.FullName, ProposalCount = p.Count() })
					.GroupJoin(SqliteAppDbContext.JobSkills, j => j.Job.Id, s => s.JobId, (j, s) => new { Job = j.Job, j.FullName, j.ProposalCount, JobSkills = s.Select(o => new { o.SkillId }) })
					.GroupJoin(SqliteAppDbContext.JobCategories, j => j.Job.Id, c => c.JobId, (j, c) => new { Job = j.Job, j.FullName, j.ProposalCount, j.JobSkills, JobCategories = c.Select(o => new { o.CategoryId }) })
					.Select(o => new JobsControllerGetLatestJobs.Record
					{
						JobID = o.Job.Id,
						Title = o.Job.Title,
						Details = o.Job.Details,
						CreatedOn = o.Job.CreatedOn,
						PostedBy = o.FullName,
						HourlyRate = o.Job.HourlyRate,
						FixedPrice = o.Job.FixedPrice,
						ProposalCount = o.ProposalCount,
						Skills = allSkills.Where(s => o.JobSkills.Select(s1 => s1.SkillId).Contains(s.Id)),
						Categories = allCategories.Where(c => o.JobCategories.Select(c1 => c1.CategoryId).Contains(c.Id))
					})
					.OrderByDescending(o => o.JobID).Skip((pageNo - 1) * itemsPerPage).Take(itemsPerPage)
				}
			);
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
