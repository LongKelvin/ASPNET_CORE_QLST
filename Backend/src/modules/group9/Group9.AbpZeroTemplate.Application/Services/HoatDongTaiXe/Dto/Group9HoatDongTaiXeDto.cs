﻿
using System;

namespace Group9.AbpZeroTemplate.Application.Share.Group9.Dto
{
  public class Group9HoatDongTaiXeDto
	{
		public int? Ma { get; set; }
		public int? HoatDongTaiXe_MaLichTrinh { get; set; }
		public double HoatDongTaiXe_KmThucTe { get; set; }
		public string HoatDongTaiXe_TrangThai { get; set; }
		public string HoatDongTaiXe_NguoiTao { get; set; }
		public DateTime HoatDongTaiXe_NgayTao { get; set; }
		public double? HoatDongTaiXe_NhienLieu { get; set; }
		public double? HoatDongTaiXe_KmUocTinh { get; set; }
	}
}
