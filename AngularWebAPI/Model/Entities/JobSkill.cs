using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Entities
{
    public class JobSkill
    {
		public int Id { get; set; }
		public int JobId { get; set; }
		public int SkillId { get; set; }
	}
}
