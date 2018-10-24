using AngularWebAPI.Model.Context;
using AngularWebAPI.Model.Entities;
using AngularWebAPI.Model.Repositories.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Repositories.Impl.Sqlite
{
	public class UserRepository : IUserRepository
	{
		public UserRepository(SqliteAppDbContext sqliteAppDbContext)
		{
			SqliteAppDbContext = sqliteAppDbContext;
		}

		public SqliteAppDbContext SqliteAppDbContext { get; }

		public async Task<AppUser> GetUserByUserName(string userName)
		{
			return await Task.Run(() => SqliteAppDbContext.Users.SingleOrDefault(o => o.UserName == userName));
		}

		public async Task<int> WriteChanges()
		{
			return await SqliteAppDbContext.SaveChangesAsync();
		}
	}
}
