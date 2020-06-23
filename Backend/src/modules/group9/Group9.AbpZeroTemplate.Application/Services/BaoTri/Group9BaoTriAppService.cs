using System.Linq;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;
using GSoft.AbpZeroTemplate.Helpers;
using GSoft.AbpZeroTemplate.Sessions;
using Group9.AbpZeroTemplate.Application.Share.Group9.Dto;
using Microsoft.AspNetCore.Builder;
using Abp.Application.Services;
using Abp.Runtime.Session;
using System.Threading.Tasks;
using GSoft.AbpZeroTemplate.Sessions;
using GSoft.AbpZeroTemplate.Sessions.Dto;

namespace Group9.AbpZeroTemplate.Web.Core.Cars
{
    public interface IGroup9BaoTriAppService : IApplicationService
    {
        IDictionary<string, object> Group9BaoTri_Update(Group9BaoTriDto input);
        Group9BaoTriDto Group9BaoTri_ById(int id);
        IDictionary<string, object> Group9BaoTri_Insert(Group9BaoTriDto input);
        IDictionary<string, object> Group9BaoTri_Delete(int id);
        List<Group9BaoTriDto> Group9BaoTri_Search(Group9BaoTriDto input);
        List<int> Group9BaoTri_ListMaTaiXe();
        List<int> Group9BaoTri_ListMaXe();
    }
    public class Group9BaoTriAppService : BaseService, IGroup9BaoTriAppService
    {
        public Group9BaoTriAppService()
        {
             
        }

        public Group9BaoTriDto Group9BaoTri_ById(int id)
        {
            return procedureHelper.GetData<Group9BaoTriDto>("Group9BaoTri_ById", new
            {
                Ma = id
            }).FirstOrDefault();
        }

        public IDictionary<string, object> Group9BaoTri_Delete(int id)
        {
            return procedureHelper.GetData<dynamic>("Group9BaoTri_Delete", new
            {
                Ma = id
            }).FirstOrDefault();
        }

        public IDictionary<string, object> Group9BaoTri_Insert(Group9BaoTriDto input)
        {
            return procedureHelper.GetData<dynamic>("Group9BaoTri_Insert", input).FirstOrDefault();
        }

        public List<int> Group9BaoTri_ListMaTaiXe()
        {
            return procedureHelper.GetData<dynamic>("Group9BaoTri_ListMaTaiXe", new
            {
            }).FirstOrDefault();
        }

        public List<int> Group9BaoTri_ListMaXe()
        {
            return procedureHelper.GetData<dynamic>("Group9BaoTri_ListMaXe", new
            {
            }).FirstOrDefault();
        }

        public List<Group9BaoTriDto> Group9BaoTri_Search(Group9BaoTriDto input)
        {
            return procedureHelper.GetData<Group9BaoTriDto>("Group9BaoTri_Search", input);
        }

     
        public IDictionary<string, object> Group9BaoTri_Update(Group9BaoTriDto input)
        {
            return procedureHelper.GetData<dynamic>("Group9BaoTri_Update", input).FirstOrDefault();
        }
    }
} 
