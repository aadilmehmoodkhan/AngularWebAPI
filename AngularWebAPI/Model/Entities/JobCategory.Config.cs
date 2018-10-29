using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Entities
{
	public class JobCategoryConfig : IEntityTypeConfiguration<JobCategory>
	{
		public void Configure(EntityTypeBuilder<JobCategory> builder)
		{
			builder.ToTable("JobCategory");
			builder.Property(o => o.JobId).IsRequired();
			builder.Property(o => o.CategoryId).IsRequired();
		}
	}
}
