
using System;

namespace Group9.AbpZeroTemplate.Application.Share.Group9.Dto
{
  public class Group9XeDto
  {
        public int Xe_MaLoaiXe { get; set; }
        public string Xe_Ten { get; set; }
        public string Xe_BienSo { get; set; }
        public double Xe_Gia { get; set; }
        public string Xe_Mau { get; set; }
        public string Xe_NguoiTao { get; set; }
        public int SoLuong { get; set; }

        public DateTime? Xe_NgayBaoTri { get; set; }
    }
}
