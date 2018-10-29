using AngularWebAPI.Model.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Context
{
	public class SqliteAppDbContext : IdentityDbContext<AppUser, AppRole, long>
	{
		public SqliteAppDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
		{

		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

			builder.ApplyConfiguration<AppUser>(new AppUserConfig());
			builder.ApplyConfiguration<Job>(new JobConfig());
			builder.ApplyConfiguration<Skill>(new SkillConfig());
			builder.ApplyConfiguration<Category>(new CategoryConfig());
			builder.ApplyConfiguration<JobProposal>(new JobProposalConfig());
			builder.ApplyConfiguration<JobCategory>(new JobCategoryConfig());
			builder.ApplyConfiguration<JobSkill>(new JobSkillConfig());
		}

		public DbSet<Job> Jobs { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<Skill> Skills { get; set; }
		public DbSet<JobProposal> JobProposals { get; set; }
		public DbSet<JobCategory> JobCategories { get; set; }
		public DbSet<JobSkill> JobSkills { get; set; }
	}
}
