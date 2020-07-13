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
using System;

namespace Group9.AbpZeroTemplate.Web.Core.Cars
{
    public interface IGroup9HoatDongTaiXeAppService : IApplicationService
    {
        IDictionary<string, object> HOATDONGTAIXE_Group9Update(Group9HoatDongTaiXeDto input);
        Group9HoatDongTaiXeDto HOATDONGTAIXE_Group9ById(int id);
        IDictionary<string, object> HOATDONGTAIXE_Group9Insert(Group9HoatDongTaiXeDto input);
        IDictionary<string, object> HOATDONGTAIXE_Group9Delete(int id);
        List<Group9HoatDongTaiXeDto> HOATDONGTAIXE_Group9Search(Group9HoatDongTaiXeDto input);
        List<Group9HoatDongTaiXeDto> HOATDONGTAIXE_Group9SearchAll();
        List<Group9HoatDongTaiXeDto> HOATDONGTAIXE_Group9Tracking(int ma, DateTime tuNgay, DateTime denNgay);
        List<Group9LichTrinhDto> HOATDONGTAIXE_Group9SearchAllLichTrinh();
        Group9LichTrinhDto HOATDONGTAIXE_Group9SearchByIdLichTrinh(int id);
        List<Group9LichTrinhDto> HOATDONGTAIXE_Group9SearchLichTrinh(Group9LichTrinhDto input);
    }
    public class Group9HoatDongTaiXeAppService : BaseService, IGroup9HoatDongTaiXeAppService
    {
        public Group9HoatDongTaiXeAppService()
        {
             
        }

        public Group9HoatDongTaiXeDto HOATDONGTAIXE_Group9ById(int id)
        {
            return procedureHelper.GetData<Group9HoatDongTaiXeDto>("HOATDONGTAIXE_Group9ById", new
            {
                Ma = id
            }).FirstOrDefault();
        }

        public IDictionary<string, object> HOATDONGTAIXE_Group9Delete(int id)
        {
            return procedureHelper.GetData<dynamic>("HOATDONGTAIXE_Group9Delete", new
            {
                Ma = id
            }).FirstOrDefault();
        }

        public IDictionary<string, object> HOATDONGTAIXE_Group9Insert(Group9HoatDongTaiXeDto input)
        {
            return procedureHelper.GetData<dynamic>("HOATDONGTAIXE_Group9Insert", input).FirstOrDefault();
        }

        public List<Group9HoatDongTaiXeDto> HOATDONGTAIXE_Group9Search(Group9HoatDongTaiXeDto input)
        {
            return procedureHelper.GetData<Group9HoatDongTaiXeDto>("HOATDONGTAIXE_Group9Search", input);
        }

        public List<Group9HoatDongTaiXeDto> HOATDONGTAIXE_Group9SearchAll()
        {
            return procedureHelper.GetData<Group9HoatDongTaiXeDto>("HOATDONGTAIXE_Group9SearchAll", new { });
        }

        public List<Group9LichTrinhDto> HOATDONGTAIXE_Group9SearchAllLichTrinh()
        {
            return procedureHelper.GetData<Group9LichTrinhDto>("HOATDONGTAIXE_Group9SearchAllLichTrinh", new { });
        }

        public Group9LichTrinhDto HOATDONGTAIXE_Group9SearchByIdLichTrinh(int id)
        {
            return procedureHelper.GetData<Group9LichTrinhDto>("HOATDONGTAIXE_Group9SearchByIdLichTrinh", new
            {
                Ma = id
            }).FirstOrDefault();
        }

        public List<Group9LichTrinhDto> HOATDONGTAIXE_Group9SearchLichTrinh(Group9LichTrinhDto input)
        {
            return procedureHelper.GetData<Group9LichTrinhDto>("HOATDONGTAIXE_Group9SearchLichTrinh", input);

        }

        public List<Group9HoatDongTaiXeDto> HOATDONGTAIXE_Group9Tracking(int ma, DateTime tuNgay, DateTime denNgay)
        {
            return procedureHelper.GetData<Group9HoatDongTaiXeDto>("HOATDONGTAIXE_Group9Tracking", new { 
                MaLichTrinh = ma,
                HoatDongTaiXe_TuNgay = tuNgay,
                HoatDongTaiXe_DenNgay = denNgay
            });
        }

        public IDictionary<string, object> HOATDONGTAIXE_Group9Update(Group9HoatDongTaiXeDto input)
        {
            return procedureHelper.GetData<dynamic>("HOATDONGTAIXE_Group9Update", input).FirstOrDefault();
        }
    }
} 
