using Abp.AspNetCore.Mvc.Controllers;
using Abp.Dependency;
using Group6.AbpZeroTemplate.Application.Share.Group6.Dto;
using Group6.AbpZeroTemplate.Web.Core.Cars;
using GSoft.AbpZeroTemplate.Sessions.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group6.AbpZeroTemplate.Application.Controllers
{
  [Route("api/[controller]/[action]")]
  public class Group6XeController : AbpController
  {
        private readonly IGroup6CarAppService Group6AppService;

        public Group6XeController(IGroup6CarAppService Group6AppService)
        {
          this.Group6AppService = Group6AppService;
        }

        [HttpPost]
        public IDictionary<string, object> Xe_Group6Update([FromBody]Group6UpdateCarDto input)
        {
            return Group6AppService.Xe_Group6Update(input);
        }

        [HttpGet]
        public string test()
        {
            return Group6AppService.test();
        }
  }
}
