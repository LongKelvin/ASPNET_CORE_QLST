using System.Linq;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;
using GSoft.AbpZeroTemplate.Helpers;
using GSoft.AbpZeroTemplate.Sessions;
using Group6.AbpZeroTemplate.Application.Share.Group6.Dto;
using Microsoft.AspNetCore.Builder;
using Abp.Application.Services;
using Abp.Runtime.Session;
using System.Threading.Tasks;
using GSoft.AbpZeroTemplate.Sessions;
using GSoft.AbpZeroTemplate.Sessions.Dto;

namespace Group6.AbpZeroTemplate.Web.Core.Cars
{
    public interface IGroup6CarAppService : IApplicationService
    {
        IDictionary<string, object> Xe_Group6Update(Group6UpdateCarDto input);
        string test();
    }
    public class Group6XeAppService : BaseService, IGroup6CarAppService
    {
        public Group6XeAppService()
        {

        }
        public IDictionary<string, object> Xe_Group6Update(Group6UpdateCarDto input)
        {
            return procedureHelper.GetData<dynamic>("Xe_Group6Update", input).FirstOrDefault();
        }
        public string test()
        {
            return "Group6 Config success!";
        }

    }
}