using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Entities
{
    public class Job
    {
		public int Id { get; set; }
		public string Title { get; set; }
		public string Details { get; set; }
		public DateTime CreatedOn { get; set; }
		public long PostedBy { get; set; }

		public ICollection<JobCategory> Categories { get; set; }
		public ICollection<JobSkill> Skills { get; set; }
		public ICollection<JobProposal> Proposals { get; set; }

		public decimal? HourlyRate { get; set; }
		public decimal? FixedPrice { get; set; }
	}
}
