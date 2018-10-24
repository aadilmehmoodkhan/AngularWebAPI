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
		}
	}
}
