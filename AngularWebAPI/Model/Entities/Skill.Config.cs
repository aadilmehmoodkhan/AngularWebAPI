using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Entities
{
	public class SkillConfig : IEntityTypeConfiguration<Skill>
	{
		public void Configure(EntityTypeBuilder<Skill> builder)
		{
			builder.ToTable("Skill");
			builder.Property(o => o.Name).IsRequired().HasMaxLength(100);
		}
	}
}
