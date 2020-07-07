Create table HoatDongTaiXe(
[Ma] int NOT NULL IDENTITY(1,1) primary key,
[HoatDongTaiXe_MaLichTrinh] int null,
[HoatDongTaiXe_KmThucTe] float null,
[HoatDongTaiXe_TrangThai] varchar(1) NULL ,
[HoatDongTaiXe_NguoiTao]  nvarchar(50) NULL ,
[HoatDongTaiXe_NgayTao]   datetime NULL ,
[HoatDongTaiXe_NhienLieu] float null,
[HoatDongTaiXe_KmUocTinh] float null
)

go
-------------------[dbo].[HOATDONGTAIXE_Insert] 6/27/2020----------------
create proc [dbo].[HOATDONGTAIXE_Group9Insert]
    @HoatDongTaiXe_MaLichTrinh int null,
@HoatDongTaiXe_KmThucTe float null,
@HoatDongTaiXe_TrangThai varchar(1) NULL ,
@HoatDongTaiXe_NguoiTao  nvarchar(50) NULL ,
@HoatDongTaiXe_NgayTao   datetime NULL ,
@HoatDongTaiXe_NhienLieu float null,
@HoatDongTaiXe_KmUocTinh float null

as

if(exists(select * from HoatDongTaiXe where HoatDongTaiXe_MaLichTrinh= @HoatDongTaiXe_MaLichTrinh and HoatDongTaiXe_TrangThai = 'N'))
begin
	select '1' as Result, N' ? t?n t?i trong h? th?ng' as ErrorDesc
	return
end
else

begin transaction
begin try

	INSERT INTO [dbo].[HoatDongTaiXe]
    ( 
	[HoatDongTaiXe_MaLichTrinh],
[HoatDongTaiXe_KmThucTe],
[HoatDongTaiXe_TrangThai] ,
[HoatDongTaiXe_NguoiTao]  ,
[HoatDongTaiXe_NgayTao]   ,
[HoatDongTaiXe_NhienLieu] ,
[HoatDongTaiXe_KmUocTinh]     )
	VALUES(   
@HoatDongTaiXe_MaLichTrinh,
@HoatDongTaiXe_KmThucTe,
@HoatDongTaiXe_TrangThai,
@HoatDongTaiXe_NguoiTao,
@HoatDongTaiXe_NgayTao,
@HoatDongTaiXe_NhienLieu,
@HoatDongTaiXe_KmUocTinh)
	declare @Ma int = SCOPE_IDENTITY()
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch
go
-------------------[dbo].[HOATDONGTAIXE_Update] 6/27/2020----------------

create proc [dbo].[HOATDONGTAIXE_Group9Update]
    @Ma int = NULL,
     @HoatDongTaiXe_MaLichTrinh int null,
@HoatDongTaiXe_KmThucTe float null,
@HoatDongTaiXe_TrangThai varchar(1) NULL ,
@HoatDongTaiXe_NguoiTao  nvarchar(50) NULL ,
@HoatDongTaiXe_NgayTao   datetime NULL ,
@HoatDongTaiXe_NhienLieu float null,
@HoatDongTaiXe_KmUocTinh float null

as

if(not exists(select * from HoatDongTaiXe where Ma = @Ma))
begin
	select '1' as Result, N'D? li?u khng t?n t?i trong h? th?ng' as ErrorDesc
	RETURN
end
begin transaction
begin try

	UPDATE [dbo].[HoatDongTaiXe]
	   SET [HoatDongTaiXe_KmThucTe]= @HoatDongTaiXe_KmThucTe,
[HoatDongTaiXe_TrangThai] = @HoatDongTaiXe_TrangThai,
[HoatDongTaiXe_NguoiTao] = @HoatDongTaiXe_NguoiTao,
[HoatDongTaiXe_NgayTao]= @HoatDongTaiXe_NgayTao,
[HoatDongTaiXe_NhienLieu] = @HoatDongTaiXe_NhienLieu,
[HoatDongTaiXe_KmUocTinh] = @HoatDongTaiXe_KmUocTinh
	WHERE Ma = @Ma
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch
go

-------------------[dbo].[HOATDONGTAIXEBaoTri_ById] 6/27/2020----------------

create proc [dbo].[HOATDONGTAIXE_Group9ById]
    @Ma int = NULL
as
begin
select *
from HoatDongTaiXe
where Ma = @Ma and HoatDongTaiXe_TrangThai = 'N'
end
go
-------------------[dbo].[HOATDONGTAIXE_SearchAll] 6/27/2020----------------
create proc [dbo].[HOATDONGTAIXE_Group9SearchAll]
as
begin
select *
from HoatDongTaiXe
where HoatDongTaiXe_TrangThai = 'N'
end
go
-------------------[dbo].[HOATDONGTAIXE_Search] 6/27/2020----------------
create proc [dbo].[HOATDONGTAIXE_Group9Search] 
    @Ma int = NULL,
     @HoatDongTaiXe_MaLichTrinh int null,
@HoatDongTaiXe_KmThucTe float null,
@HoatDongTaiXe_TrangThai varchar(1) NULL ,
@HoatDongTaiXe_NguoiTao  nvarchar(50) NULL ,
@HoatDongTaiXe_NgayTao   datetime NULL ,
@HoatDongTaiXe_NhienLieu float null,
@HoatDongTaiXe_KmUocTinh float null

as
begin
	select * from HoatDongTaiXe
	where (@Ma is null or Ma = @Ma)
	and (@HoatDongTaiXe_MaLichTrinh is null or HoatDongTaiXe_MaLichTrinh= @HoatDongTaiXe_MaLichTrinh)
	and (@HoatDongTaiXe_KmThucTe is null or HoatDongTaiXe_KmThucTe = @HoatDongTaiXe_KmThucTe)
	and (@HoatDongTaiXe_TrangThai = 'N')
	and (@HoatDongTaiXe_NguoiTao  is null or @HoatDongTaiXe_NguoiTao = @HoatDongTaiXe_NguoiTao)
	and (@HoatDongTaiXe_NgayTao is null or HoatDongTaiXe_NgayTao = @HoatDongTaiXe_NgayTao)
	and (@HoatDongTaiXe_NhienLieu is null or HoatDongTaiXe_NhienLieu = @HoatDongTaiXe_NhienLieu)
	and (@HoatDongTaiXe_KmUocTinh is null or HoatDongTaiXe_KmUocTinh = @HoatDongTaiXe_KmUocTinh)

end
go
-------------------[dbo].[HOATDONGTAIXE_Delete] 6/27/2020----------------
create proc [dbo].[HOATDONGTAIXE_Group9Delete] @Ma int = NULL
as
begin transaction
begin try
	update HoatDongTaiXe set HoatDongTaiXe_TrangThai = 'X' where Ma = @Ma
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch
