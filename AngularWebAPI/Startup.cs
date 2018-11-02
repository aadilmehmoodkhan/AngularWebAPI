using AngularWebAPI.Model.Context;
using AngularWebAPI.Model.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AngularWebAPI;
using System;
using AngularWebAPI.Model.Repositories.Abstract;
using AngularWebAPI.Model.Repositories.Impl.Sqlite;
using NSwag.AspNetCore;
using NJsonSchema;

namespace AngularWebAPI
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddAuthentication().AddCookie();
			ConfigureIdentity(services);
			ConfigureRepositories(services);
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
		}

		private void ConfigureRepositories(IServiceCollection services)
		{
			services.AddTransient<IUserRepository, UserRepository>();
			services.AddTransient<IJobsRepository, JobsRepository>();
		}

		private void ConfigureIdentity(IServiceCollection services)
		{
			services.AddDbContext<SqliteAppDbContext>(options =>
			{
				options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
			});

			services
				.AddDefaultIdentity<AppUser>()
				.AddEntityFrameworkStores<SqliteAppDbContext>();

			services.Configure<IdentityOptions>(options => 
			{
				options.User.RequireUniqueEmail = true;
				options.Password.RequireDigit = false;
				options.Password.RequiredLength = 4;
				options.Password.RequireLowercase = false;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequireUppercase = false;
			});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
			}

            app.UseDefaultFiles();
			app.UseStaticFiles();
			app.UseAuthentication();

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action=Index}/{id?}");
			});
		}
	}
}
