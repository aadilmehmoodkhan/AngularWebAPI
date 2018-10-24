using AngularWebAPI.Model.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Controllers
{
    public class AuthControllerProfile
    {
		public AuthControllerProfile()
		{

		}

		public AuthControllerProfile(AppUser appUser)
		{
			FullName = appUser.FullName;
			Age = appUser.Age;
			DOB = appUser.DOB;
			Bio = appUser.Bio;
		}

		[MinLength(4), MaxLength(100)]
		public string FullName { get; set; }
		public int? Age { get; set; }
		public DateTime? DOB { get; set; }
		public string Bio { get; set; }
	}
}
