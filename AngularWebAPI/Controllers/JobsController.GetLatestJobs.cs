using AngularWebAPI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Controllers
{
    public class JobsControllerGetLatestJobs
    {
		public int TotalJobCount { get; set; }
		public int PageSize { get; set; }
		public int PageNo { get; set; }
		public IEnumerable<Record> Data { get; set; }

		public class Record
		{
			public int JobID { get; set; }
			public string Title { get; set; }
			public string Details { get; set; }
			public DateTime CreatedOn { get; set; }
			public string PostedBy { get; set; }
			public decimal? HourlyRate { get; set; }
			public decimal? FixedPrice { get; set; }
			public int ProposalCount { get; set; }

			public IEnumerable<Skill> Skills { get; set; }
			public IEnumerable<Category> Categories { get; set; }
		}
	}
}
