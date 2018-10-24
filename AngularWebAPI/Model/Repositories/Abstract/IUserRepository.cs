using AngularWebAPI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Repositories.Abstract
{
	public interface IUserRepository
	{
		Task<AppUser> GetUserByUserName(string userName);
		Task<int> WriteChanges();
	}
}
