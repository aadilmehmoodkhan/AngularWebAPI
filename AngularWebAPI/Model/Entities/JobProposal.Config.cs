using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Entities
{
	public class JobProposalConfig : IEntityTypeConfiguration<JobProposal>
	{
		public void Configure(EntityTypeBuilder<JobProposal> builder)
		{
			builder.ToTable("JobProposal");
			builder.Property(o => o.CoverLetter).IsRequired().HasMaxLength(4000);
			builder.Property(o => o.PostedBy).IsRequired();
			builder.Property(o => o.JobId).IsRequired();
			builder.Property(o => o.Accepted).IsRequired();
		}
	}
}
