using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Entities
{
	public class AppUser : IdentityUser<long>
	{
		public string FullName { get; set; }

		public int? Age { get; set; }
		public string Bio { get; set; }
		public DateTime? DOB { get; set; }
	}
}
