USE DbPratice
Go
-------------------[dbo].[Group9BaoTri_Insert] 6/17/2020----------------
create or alter proc [dbo].[BAOTRI_Group9Insert]
	@Baotri_MaBaoTri        varchar(20) NULL,
	@BaoTri_NoiBaoTri       nvarchar(max) NULL ,
	@BaoTri_NgayXuatXuong   datetime NULL ,
	@BaoTri_ThanhTien       bigint NULL ,
	@BaoTri_TinhTrangBaoTri varchar(1) NULL ,
	@BaoTri_MaXe            int NULL ,
	@BaoTri_MaTaiXe         int NULL ,
	@BaoTri_NguoiTao        nvarchar(50) NULL ,
	@BaoTri_NgayTao         datetime NULL ,
	@Baotri_NguoiDuyet      varchar(15) NULL,
	@BaoTri_NgayDuyet      datetime NULL ,
	@BaoTri_TrangThai       varchar(1) NULL ,
	@BaoTri_GhiChu          nvarchar(max) NULL 
as

if(exists(select * from BaoTri where Baotri_MaBaoTri = @Baotri_MaBaoTri))
begin
	select '1' as Result, N'Đề xuất đã tồn tại trong hệ thống' as ErrorDesc
	return
end
else

begin transaction
begin try

	INSERT INTO [dbo].[BaoTri]
    ( 
		[Baotri_MaBaoTri] ,
		[BaoTri_NoiBaoTri]     ,
		[BaoTri_NgayXuatXuong]   ,
		[BaoTri_ThanhTien]    ,
		[BaoTri_TinhTrangBaoTri] ,
		[BaoTri_MaXe]             ,
		[BaoTri_MaTaiXe]          ,
		[BaoTri_NguoiTao]       ,
		[BaoTri_NgayTao]    ,
		[Baotri_NguoiDuyet]    ,
		[BaoTri_NgayDuyet],
		[BaoTri_TrangThai]      ,
		[BaoTri_GhiChu])
	VALUES
    (   
		@BaoTri_MaBaoTri,
		@BaoTri_NoiBaoTri     ,
		@BaoTri_NgayXuatXuong  ,
		@BaoTri_ThanhTien       ,
		'C',
		@BaoTri_MaXe           ,
		@BaoTri_MaTaiXe      ,
		@BaoTri_NguoiTao   ,
		GetDate()         ,
		@Baotri_NguoiDuyet,
		@BaoTri_NgayDuyet      ,
		'N'    ,
		@BaoTri_GhiChu)
	declare @Ma int = SCOPE_IDENTITY()
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch
go
-------------------[dbo].[Group9BaoTri_Update] 6/17/2020----------------

create or alter proc [dbo].[BAOTRI_Group9Update]
    @Ma int = NULL,
	@Baotri_MaBaoTri        varchar(20) NULL,
	@BaoTri_NoiBaoTri       nvarchar(max) NULL ,
	@BaoTri_NgayXuatXuong   datetime NULL ,
	@BaoTri_ThanhTien       bigint NULL ,
	@BaoTri_TinhTrangBaoTri varchar(1) NULL ,
	@BaoTri_MaXe            int NULL ,
	@BaoTri_MaTaiXe         int NULL ,
	@BaoTri_NguoiTao        nvarchar(50) NULL ,
	@BaoTri_NgayTao         datetime NULL ,
	@Baotri_NguoiDuyet      varchar(15) NULL,
	@BaoTri_NgayDuyet      datetime NULL ,
	@BaoTri_TrangThai       varchar(1) NULL ,
	@BaoTri_GhiChu          nvarchar(max) NULL 

as

if(not exists(select * from BaoTri where Ma = @Ma))
begin
	select '1' as Result, N'Dữ liệu không tồn tại trong hệ thống' as ErrorDesc
	RETURN
end
begin transaction
begin try

	UPDATE [dbo].[BaoTri]
	   SET [BaoTri_MaBaoTri] = @Baotri_MaBaoTri
		  ,[BaoTri_NgayDuyet] = @BaoTri_NgayDuyet
		  ,[BaoTri_NguoiDuyet] = @BaoTri_NguoiDuyet
		  ,[BaoTri_NoiBaoTri] = @BaoTri_NoiBaoTri
		  ,[BaoTri_NgayXuatXuong] = @BaoTri_NgayXuatXuong
		  ,[BaoTri_ThanhTien] = @BaoTri_ThanhTien 
		  ,[BaoTri_TinhTrangBaoTri] = @BaoTri_TinhTrangBaoTri
		  ,[BaoTri_MaXe] = @BaoTri_MaXe
		  ,[BaoTri_MaTaiXe] = @BaoTri_MaTaiXe
		  ,[BaoTri_NguoiTao] = @BaoTri_NguoiTao
		  ,[BaoTri_NgayTao] = @BaoTri_NgayTao
		  ,[BaoTri_TrangThai] = @BaoTri_TrangThai
		  ,[BaoTri_GhiChu] = @BaoTri_GhiChu 
	WHERE Ma = @Ma
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch

go
-------------------[dbo].[Group9BaoTri_ById] 6/17/2020----------------

create or alter proc [dbo].[BAOTRI_Group9ById]
    @Ma int = NULL
as
begin
select *
from BaoTri
where Ma = @Ma and BaoTri_TrangThai = 'N'
end
go
-------------------[dbo].[Group9BaoTri_SearchAll] 6/17/2020----------------
create or alter proc [dbo].[BAOTRI_Group9SearchAll]
as
begin
select *
from BaoTri
where BaoTri_TrangThai = 'N'
end
go
-------------------[dbo].[Group9BaoTri_Search] 6/17/2020----------------
create or alter proc [dbo].[BAOTRI_Group9Search] 
 @Ma int = NULL,
 	@Baotri_MaBaoTri        varchar(20) NULL,
	@BaoTri_NoiBaoTri       nvarchar(max) NULL ,
	@BaoTri_NgayXuatXuong   datetime NULL ,
	@BaoTri_ThanhTien       bigint NULL ,
	@BaoTri_TinhTrangBaoTri varchar(1) NULL ,
	@BaoTri_MaXe            int NULL ,
	@BaoTri_MaTaiXe         int NULL ,
	@BaoTri_NguoiTao        nvarchar(50) NULL ,
	@BaoTri_NgayTao         datetime NULL ,
	@Baotri_NguoiDuyet      varchar(15) NULL,
	@BaoTri_NgayDuyet      datetime NULL ,
	@BaoTri_TrangThai       varchar(1) NULL ,
	@BaoTri_GhiChu          nvarchar(max) NULL 
	as
begin
	select * from BaoTri
	where (@Ma is null or Ma = @Ma)
	and (@Baotri_MaBaoTri is null or Baotri_MaBaoTri = @Baotri_MaBaoTri)
	and (@BaoTri_NgayDuyet is null or BaoTri_NgayDuyet = @BaoTri_NgayDuyet)
	and (@BaoTri_NguoiDuyet is null or BaoTri_NguoiDuyet = @BaoTri_NguoiDuyet)
	and (@BaoTri_NoiBaoTri is null or BaoTri_NoiBaoTri = @BaoTri_NoiBaoTri)
	and (@BaoTri_NgayXuatXuong is null or BaoTri_NgayXuatXuong = @BaoTri_NgayXuatXuong)
	and (@BaoTri_ThanhTien is null or BaoTri_ThanhTien = @BaoTri_ThanhTien)
	and (@BaoTri_TinhTrangBaoTri is null or BaoTri_TinhTrangBaoTri = @BaoTri_TinhTrangBaoTri)
	and (@BaoTri_MaXe is null or BaoTri_MaXe = @BaoTri_MaXe)
	and (@BaoTri_MaTaiXe is null or BaoTri_MaTaiXe = @BaoTri_MaTaiXe)
	and (@BaoTri_NguoiTao is null or BaoTri_NguoiTao = @BaoTri_NguoiTao)
	and (@BaoTri_NgayTao is null or BaoTri_NgayTao = @BaoTri_NgayTao)
	and (@BaoTri_TrangThai is null or BaoTri_TrangThai = @BaoTri_TrangThai)
	and (@BaoTri_GhiChu is null or BaoTri_GhiChu = @BaoTri_GhiChu)
	and (BaoTri_TrangThai = 'N')

end
go
-------------------[dbo].[Group9BaoTri_Delete] 6/17/2020----------------
create or alter proc [dbo].[BAOTRI_Group9Delete] @Ma int = NULL
as

if(exists(select * from BaoTri where BaoTri_TinhTrangBaoTri = 'A' and Ma = @Ma))
begin
	select '1' as Result, N'Xe đã được duyệt không được xóa' as ErrorDesc
	return
end
begin transaction
begin try
	update BaoTri set BaoTri_TrangThai = 'X' where Ma = @Ma
commit transaction
	select '0' as Result, N'' as ErrorDesc, @Ma as Ma
end try
begin catch

rollback transaction

end catch
go
-------------------[dbo].[Group9BaoTri_App] 6/17/2020----------------

create or alter Proc [dbo].[BAOTRI_Group9App] @Id int = NULL,@CheckerId varchar(15)
as
begin transaction
begin try
	update BaoTri 
	set BaoTri_TinhTrangBaoTri = 'A', Baotri_NguoiDuyet = @CheckerId, BaoTri_NgayDuyet = GetDate()
	where Ma = @Id
commit transaction
	select '0' as Result, N'' as ErrorDesc, @id as Ma
end try
begin catch

rollback transaction

end catch