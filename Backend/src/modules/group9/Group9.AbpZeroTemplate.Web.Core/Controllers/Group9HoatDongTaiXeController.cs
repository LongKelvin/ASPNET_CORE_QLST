﻿using Abp.AspNetCore.Mvc.Controllers;
using Abp.Dependency;
using Group9.AbpZeroTemplate.Application.Share.Group9.Dto;
using Group9.AbpZeroTemplate.Web.Core.Cars;
using GSoft.AbpZeroTemplate.Sessions.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Group9.AbpZeroTemplate.Application.Controllers
{
    [Route("api/[controller]/[action]")]
    public class Group9HoatDongTaiXeController : AbpController
    {
        private readonly IGroup9HoatDongTaiXeAppService Group9HoatDongTaiXeAppService;

        public Group9HoatDongTaiXeController(IGroup9HoatDongTaiXeAppService Group9HoatDongTaiXeAppService)
        {
            this.Group9HoatDongTaiXeAppService = Group9HoatDongTaiXeAppService;
        }


        [HttpPost]
        public IDictionary<string, object> HOATDONGTAIXE_Group9Insert([FromBody] Group9HoatDongTaiXeDto input)
        {
            return Group9HoatDongTaiXeAppService.HOATDONGTAIXE_Group9Insert(input);
        }
        [HttpPost]
        public IDictionary<string, object> HOATDONGTAIXE_Group9Delete(int id)
        {
            return Group9HoatDongTaiXeAppService.HOATDONGTAIXE_Group9Delete(id);
        }
        [HttpPost]
        public IDictionary<string, object> HOATDONGTAIXE_Group9Update([FromBody] Group9HoatDongTaiXeDto input)
        {
            return Group9HoatDongTaiXeAppService.HOATDONGTAIXE_Group9Update(input);
        }
        [HttpPost]
        public List<Group9HoatDongTaiXeDto> HOATDONGTAIXE_Group9Search([FromBody] Group9HoatDongTaiXeDto input)
        {
            return Group9HoatDongTaiXeAppService.HOATDONGTAIXE_Group9Search(input);
        }
        [HttpPost]
        public Group9HoatDongTaiXeDto HOATDONGTAIXE_Group9ById(int id)
        {
            return Group9HoatDongTaiXeAppService.HOATDONGTAIXE_Group9ById(id);
        }
        [HttpPost]

        public List<Group9HoatDongTaiXeDto> HOATDONGTAIXE_Group9SearchAll()
        {
            return Group9HoatDongTaiXeAppService.HOATDONGTAIXE_Group9SearchAll();
        }

    }
}