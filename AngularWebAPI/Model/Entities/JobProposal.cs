using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Entities
{
    public class JobProposal
    {
		public int Id { get; set; }
		public string CoverLetter { get; set; }
		public long PostedBy { get; set; }
		public int JobId { get; set; }
		public bool Accepted { get; set; }
		public DateTime AcceptedOn { get; set; }
	}
}
