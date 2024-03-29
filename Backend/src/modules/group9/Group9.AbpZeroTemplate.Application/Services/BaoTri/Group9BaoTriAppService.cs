﻿using System.Linq;
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
        IDictionary<string, object> BAOTRI_Group9Update(Group9BaoTriDto input);
        Group9BaoTriDto BAOTRI_Group9ById(int id);
        IDictionary<string, object> BAOTRI_Group9Insert(Group9BaoTriDto input);
        IDictionary<string, object> BAOTRI_Group9Delete(int id);
        List<Group9BaoTriDto> BAOTRI_Group9Search(Group9BaoTriDto input);
        List<Group9BaoTriDto> BAOTRI_Group9SearchAll();

    }
    public class Group9BaoTriAppService : BaseService, IGroup9BaoTriAppService
    {
        public Group9BaoTriAppService()
        {
             
        }

        public Group9BaoTriDto BAOTRI_Group9ById(int id)
        {
            return procedureHelper.GetData<Group9BaoTriDto>("BAOTRI_Group9ById", new
            {
                Ma = id
            }).FirstOrDefault();
        }

        public IDictionary<string, object> BAOTRI_Group9Delete(int id)
        {
            return procedureHelper.GetData<dynamic>("BAOTRI_Group9Delete", new
            {
                Ma = id
            }).FirstOrDefault();
        }

        public IDictionary<string, object> BAOTRI_Group9Insert(Group9BaoTriDto input)
        {
            return procedureHelper.GetData<dynamic>("BAOTRI_Group9Insert", input).FirstOrDefault();
        }

        public List<Group9BaoTriDto> BAOTRI_Group9Search(Group9BaoTriDto input)
        {
            return procedureHelper.GetData<Group9BaoTriDto>("BAOTRI_Group9Search", input);
        }

        public List<Group9BaoTriDto> BAOTRI_Group9SearchAll()
        {
            return procedureHelper.GetData<Group9BaoTriDto>("BAOTRI_Group9SearchAll", new { });
        }

        public IDictionary<string, object> BAOTRI_Group9Update(Group9BaoTriDto input)
        {
            return procedureHelper.GetData<dynamic>("BAOTRI_Group9Update", input).FirstOrDefault();
        }
    }
} 
