using AngularWebAPI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Controllers
{
    public class JobsControllerGetAllSkillsAndCategories
    {
		public Skill[] Skills { get; set; }
		public Category[] Categories { get; set; }
	}
}
