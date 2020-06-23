using Abp.Authorization;
using Abp.Configuration.Startup;
using Abp.Localization;
using GSoft.AbpZeroTemplate;

namespace Group9.AbpZeroTemplate.Application
{
    public class Group9AuthorizationProvider : AuthorizationProvider
    {
        private readonly bool _isMultiTenancyEnabled;

        public Group9AuthorizationProvider(bool isMultiTenancyEnabled)
        {
            _isMultiTenancyEnabled = isMultiTenancyEnabled;
        }

        public Group9AuthorizationProvider(IMultiTenancyConfig multiTenancyConfig)
        {
            _isMultiTenancyEnabled = multiTenancyConfig.IsEnabled;
        }

        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            //COMMON PERMISSIONS (FOR BOTH OF TENANTS AND HOST)

            var pages = context.GetPermissionOrNull("Pages") ?? context.CreatePermission("Pages", L("Pages"));
            var Group9 = pages.CreateChildPermission("Pages.Group9", L("Group9"));


            var demoModels = pages.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Car, L("Car"));
            demoModels.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Car_Add, L("Create"));
            demoModels.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Car_Update, L("Edit"));
            demoModels.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Car_View, L("View"));
            demoModels.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Car_Delete, L("Delete"));
            demoModels.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Car_Approve, L("Approve"));

            var baoTri = pages.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Car_Maintenance_Notify, L("Maintain-Cars"));
            baoTri.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Car_Maintenance_Notify_Add, L("Create"));
            baoTri.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Car_Maintenance_Notify_Update, L("Edit"));
            baoTri.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Car_Maintenance_Notify_View, L("View"));
            baoTri.CreateChildPermission(Group9PermissionsConst.Pages_Administration_Car_Maintenance_Notify_Delete, L("Delete"));
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, AbpZeroTemplateConsts.LocalizationSourceName);
        }
    }
}
