using System.Linq;
using System.Linq.Dynamic.Core;
using System.Collections.Generic;
using GSoft.AbpZeroTemplate.Helpers;
using GSoft.AbpZeroTemplate.Sessions;
using Microsoft.AspNetCore.Builder;
using Abp.Application.Services;
using Abp.Runtime.Session;
using System.Threading.Tasks;
using GSoft.AbpZeroTemplate.Sessions;
using GSoft.AbpZeroTemplate.Sessions.Dto;
using Abp.Notifications;
using Abp.Domain.Repositories;
using GSoft.AbpZeroTemplate.Authorization.Users;

namespace Group9.AbpZeroTemplate.Web.Core.Cars
{
    public class Group9HangDto
    {
        public int? Ma { get; set; }
        public string Hang_MaHang { get; set; }
        public string Hang_TenHang { get; set; }
    }
}
