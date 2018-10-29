using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Entities
{
	public class JobConfig : IEntityTypeConfiguration<Job>
	{
		public void Configure(EntityTypeBuilder<Job> builder)
		{
			builder.ToTable("Job");
			builder.Property(o => o.Title).IsRequired().HasMaxLength(500);
			builder.Property(o => o.Details).IsRequired().HasMaxLength(4000);
			builder.Property(o => o.CreatedOn).IsRequired();
			builder.Property(o => o.PostedBy).IsRequired();
		}
	}
}
