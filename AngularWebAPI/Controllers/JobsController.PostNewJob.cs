using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Controllers
{
    public class JobsControllerPostNewJob
    {
		public string Title { get; set; }
		public string Details { get; set; }
		public decimal? HourlyRate { get; set; }
		public decimal? FixedPrice { get; set; }

		public int[] Skills { get; set; }
		public int[] Categories { get; set; }

		public string PostedByUserName { get; set; }

		public (bool validated, string[] errorMessages) Validate()
		{
			if (HourlyRate == null && FixedPrice == null)
			{
				return (false, new string[] { "HourlyRate and FixedPrice both values cannot be set to null" });
			}
			return (true, null);
		}
	}
}
