using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Entities
{
	public class JobSkillConfig : IEntityTypeConfiguration<JobSkill>
	{
		public void Configure(EntityTypeBuilder<JobSkill> builder)
		{
			builder.ToTable("JobSkill");
			builder.Property(o => o.JobId).IsRequired();
			builder.Property(o => o.SkillId).IsRequired();
		}
	}
}
