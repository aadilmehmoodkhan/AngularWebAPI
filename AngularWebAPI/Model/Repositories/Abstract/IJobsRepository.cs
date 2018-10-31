using AngularWebAPI.Controllers;
using AngularWebAPI.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Repositories.Abstract
{
    public interface IJobsRepository
    {
		Task<int> PostNewJob(JobsControllerPostNewJob newJob);
		Task<JobsControllerGetAllSkillsAndCategories> GetAllSkillsAndCategories();
		Task<JobsControllerGetLatestJobs> GetLatestJobs(int itemsPerPage = 10, int pageNo = 1);
    }
}
