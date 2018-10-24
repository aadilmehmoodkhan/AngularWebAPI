using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebAPI.Controllers
{
	public class AuthControllerSignup
	{
		[Required]
		public string Email { get; set; }
		[Required, MaxLength(100)]
		public string FullName { get; set; }
		[Required, MinLength(4)]
		public string UserName { get; set; }
		[Required, MinLength(4), MaxLength(10)]
		public string Password { get; set; }
	}
}
