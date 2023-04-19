# Copyright (c) Microsoft Corporation.  All rights reserved.

$ErrorActionPreference = 'Stop'
$InitialDatabase = '0'

$UpdatePowerShell = 'The Entity Framework Package Manager Console Tools require Windows PowerShell 3.0 or higher. ' +
    'Install Windows Management Framework 3.0, restart Visual Studio, and try again. https://aka.ms/wmf3download'

<#
.SYNOPSIS
    Adds or updates an Entity Framework provider entry in the project config
    file.

.DESCRIPTION
    Adds an entry into the 'entityFramework' section of the project config
    file for the specified provider invariant name and provider type. If an
    entry for the given invariant name already exists, then that entry is
    updated with the given type name, unless the given type name already
    matches, in which case no action is taken. The 'entityFramework'
    section is added if it does not exist. The config file is automatically
    saved if and only if a change was made.

    This command is typically used only by Entity Framework provider NuGet
    packages and is run from the 'install.ps1' script.

.PARAMETER Project
    The Visual Studio project to update. When running in the NuGet install.ps1
    script the '$project' variable provided as part of that script should be
    used.

.PARAMETER InvariantName
    The provider invariant name that uniquely identifies this provider. For
    example, the Microsoft SQL Server provider is registered with the invariant
    name 'System.Data.SqlClient'.

.PARAMETER TypeName
    The assembly-qualified type name of the provider-specific type that
    inherits from 'System.Data.Entity.Core.Common.DbProviderServices'. For
    example, for the Microsoft SQL Server provider, this type is
    'System.Data.Entity.SqlServer.SqlProviderServices, EntityFramework.SqlServer'.
#>
function Add-EFProvider
{
    [CmdletBinding(PositionalBinding = $false)]
    param(
        [parameter(Position = 0, Mandatory = $true)]
        $Project,
        [parameter(Position = 1, Mandatory = $true)]
        [string] $InvariantName,
        [parameter(Position = 2, Mandatory = $true)]
        [string] $TypeName)

    $configPath = GetConfigPath($Project)
    if (!$configPath)
    {
        return
    }

    [xml] $configXml = Get-Content $configPath

    $providers = $configXml.configuration.entityFramework.providers

    $providers.provider |
        where invariantName -eq $InvariantName |
        %{ $providers.RemoveChild($_) | Out-Null }

    $provider = $providers.AppendChild($configXml.CreateElement('provider'))
    $provider.SetAttribute('invariantName', $InvariantName)
    $provider.SetAttribute('type', $TypeName)

    $configXml.Save($configPath)
}

<#
.SYNOPSIS
    Adds or updates an Entity Framework default connection factory in the
    project config file.

.DESCRIPTION
    Adds an entry into the 'entityFramework' section of the project config
    file for the connection factory that Entity Framework will use by default
    when creating new connections by convention. Any existing entry will be
    overridden if it does not match. The 'entityFramework' section is added if
    it does not exist. The config file is automatically saved if and only if
    a change was made.

    This command is typically used only by Entity Framework provider NuGet
    packages and is run from the 'install.ps1' script.

.PARAMETER Project
    The Visual Studio project to update. When running in the NuGet install.ps1
    script the '$project' variable provided as part of that script should be
    used.

.PARAMETER TypeName
    The assembly-qualified type name of the connection factory type that
    implements the 'System.Data.Entity.Infrastructure.IDbConnectionFactory'
    interface.  For example, for the Microsoft SQL Server Express provider
    connection factory, this type is
    'System.Data.Entity.Infrastructure.SqlConnectionFactory, EntityFramework'.

.PARAMETER ConstructorArguments
    An optional array of strings that will be passed as arguments to the
    connection factory type constructor.
#>
function Add-EFDefaultConnectionFactory
{
    [CmdletBinding(PositionalBinding = $false)]
    param(
        [parameter(Position = 0, Mandatory = $true)]
        $Project,
        [parameter(Position = 1, Mandatory = $true)]
        [string] $TypeName,
        [string[]] $ConstructorArguments)

    $configPath = GetConfigPath($Project)
    if (!$configPath)
    {
        return
    }

    [xml] $configXml = Get-Content $configPath

    $entityFramework = $configXml.configuration.entityFramework
    $defaultConnectionFactory = $entityFramework.defaultConnectionFactory
    if ($defaultConnectionFactory)
    {
        $entityFramework.RemoveChild($defaultConnectionFactory) | Out-Null
    }
    $defaultConnectionFactory = $entityFramework.AppendChild($configXml.CreateElement('defaultConnectionFactory'))

    $defaultConnectionFactory.SetAttribute('type', $TypeName)

    if ($ConstructorArguments)
    {
        $parameters = $defaultConnectionFactory.AppendChild($configXml.CreateElement('parameters'))

        foreach ($constructorArgument in $ConstructorArguments)
        {
            $parameter = $parameters.AppendChild($configXml.CreateElement('parameter'))
            $parameter.SetAttribute('value', $constructorArgument)
        }
    }

    $configXml.Save($configPath)
}

<#
.SYNOPSIS
    Enables Code First Migrations in a project.

.DESCRIPTION
    Enables Migrations by scaffolding a migrations configuration class in the project. If the
    target database was created by an initializer, an initial migration will be created (unless
    automatic migrations are enabled via the EnableAutomaticMigrations parameter).

.PARAMETER ContextTypeName
    Specifies the context to use. If omitted, migrations will attempt to locate a
    single context type in the target project.

.PARAMETER EnableAutomaticMigrations
    Specifies whether automatic migrations will be enabled in the scaffolded migrations configuration.
    If omitted, automatic migrations will be disabled.

.PARAMETER MigrationsDirectory
    Specifies the name of the directory that will contain migrations code files.
    If omitted, the directory will be named "Migrations".

.PARAMETER ProjectName
    Specifies the project that the scaffolded migrations configuration class will
    be added to. If omitted, the default project selected in package manager
    console is used.

.PARAMETER StartUpProjectName
    Specifies the configuration file to use for named connection strings. If
    omitted, the specified project's configuration file is used.

.PARAMETER ContextProjectName
    Specifies the project which contains the DbContext class to use. If omitted,
    the context is assumed to be in the same project used for migrations.

.PARAMETER ConnectionStringName
    Specifies the name of a connection string to use from the application's
    configuration file.

.PARAMETER ConnectionString
    Specifies the connection string to use. If omitted, the context's
    default connection will be used.

.PARAMETER ConnectionProviderName
    Specifies the provider invariant name of the connection string.

.PARAMETER Force
    Specifies that the migrations configuration be overwritten when running more
    than once for a given project.

.PARAMETER ContextAssemblyName
    Specifies the name of the assembly which contains the DbContext class to use. Use this
    parameter instead of ContextProjectName when the context is contained in a referenced
    assembly rather than in a project of the solution.

.PARAMETER AppDomainBaseDirectory
    Specifies the directory to use for the app-domain that is used for running Migrations
    code such that the app-domain is able to find all required assemblies. This is an
    advanced option that should only be needed if the solution contains	several projects
    such that the assemblies needed for the context and configuration are not all
    referenced from either the project containing the context or the project containing
    the migrations.

.EXAMPLE
    Enable-Migrations
    # Scaffold a migrations configuration in a project with only one context

.EXAMPLE
    Enable-Migrations -Auto
    # Scaffold a migrations configuration with automatic migrations enabled for a project
    # with only one context

.EXAMPLE
    Enable-Migrations -ContextTypeName MyContext -MigrationsDirectory DirectoryName
    # Scaffold a migrations configuration for a project with multiple contexts
    # This scaffolds a migrations configuration for MyContext and will put the configuration
    # and subsequent configurations in a new directory called "DirectoryName"

#>
function Enable-Migrations(
    $ContextTypeName,
    [alias('Auto')]
    [switch] $EnableAutomaticMigrations,
    $MigrationsDirectory,
    $ProjectName,
    $StartUpProjectName,
    $ContextProjectName,
    $ConnectionStringName,
    $ConnectionString,
    $ConnectionProviderName,
    [switch] $Force,
    $ContextAssemblyName,
    $AppDomainBaseDirectory)

    WarnIfOtherEFs 'Enable-Migrations'
    throw $UpdatePowerShell
}

<#
.SYNOPSIS
    Scaffolds a migration script for any pending model changes.

.DESCRIPTION
    Scaffolds a new migration script and adds it to the project.

.PARAMETER Name
    Specifies the name of the custom script.

.PARAMETER Force
    Specifies that the migration user code be overwritten when re-scaffolding an
    existing migration.

.PARAMETER ProjectName
    Specifies the project that contains the migration configuration type to be
    used. If omitted, the default project selected in package manager console
    is used.

.PARAMETER StartUpProjectName
    Specifies the configuration file to use for named connection strings. If
    omitted, the specified project's configuration file is used.

.PARAMETER ConfigurationTypeName
    Specifies the migrations configuration to use. If omitted, migrations will
    attempt to locate a single migrations configuration type in the target
    project.

.PARAMETER ConnectionStringName
    Specifies the name of a connection string to use from the application's
    configuration file.

.PARAMETER ConnectionString
    Specifies the connection string to use. If omitted, the context's
    default connection will be used.

.PARAMETER ConnectionProviderName
    Specifies the provider invariant name of the connection string.

.PARAMETER IgnoreChanges
    Scaffolds an empty migration ignoring any pending changes detected in the current model.
    This can be used to create an initial, empty migration to enable Migrations for an existing
    database. N.B. Doing this assumes that the target database schema is compatible with the
    current model.

.PARAMETER AppDomainBaseDirectory
    Specifies the directory to use for the app-domain that is used for running Migrations
    code such that the app-domain is able to find all required assemblies. This is an
    advanced option that should only be needed if the solution contains	several projects
    such that the assemblies needed for the context and configuration are not all
    referenced from either the project containing the context or the project containing
    the migrations.

.EXAMPLE
    Add-Migration First
    # Scaffold a new migration named "First"

.EXAMPLE
    Add-Migration First -IgnoreChanges
    # Scaffold an empty migration ignoring any pending changes detected in the current model.
    # This can be used to create an initial, empty migration to enable Migrations for an existing
    # database. N.B. Doing this assumes that the target database schema is compatible with the
    # current model.

#>
function Add-Migration(
    $Name,
    [switch] $Force,
    $ProjectName,
    $StartUpProjectName,
    $ConfigurationTypeName,
    $ConnectionStringName,
    $ConnectionString,
    $ConnectionProviderName,
    [switch] $IgnoreChanges,
    $AppDomainBaseDirectory)

    WarnIfOtherEFs 'Add-Migration'
    throw $UpdatePowerShell
}

<#
.SYNOPSIS
    Applies any pending migrations to the database.

.DESCRIPTION
    Updates the database to the current model by applying pending migrations.

.PARAMETER SourceMigration
    Only valid with -Script. Specifies the name of a particular migration to use
    as the update's starting point. If omitted, the last applied migration in
    the database will be used.

.PARAMETER TargetMigration
    Specifies the name of a particular migration to update the database to. If
    omitted, the current model will be used.

.PARAMETER Script
    Generate a SQL script rather than executing the pending changes directly.

.PARAMETER Force
    Specifies that data loss is acceptable during automatic migration of the
    database.

.PARAMETER ProjectName
    Specifies the project that contains the migration configuration type to be
    used. If omitted, the default project selected in package manager console
    is used.

.PARAMETER StartUpProjectName
    Specifies the configuration file to use for named connection strings. If
    omitted, the specified project's configuration file is used.

.PARAMETER ConfigurationTypeName
    Specifies the migrations configuration to use. If omitted, migrations will
    attempt to locate a single migrations configuration type in the target
    project.

.PARAMETER ConnectionStringName
    Specifies the name of a connection string to use from the application's
    configuration file.

.PARAMETER ConnectionString
    Specifies the connection string to use. If omitted, the context's
    default connection will be used.

.PARAMETER ConnectionProviderName
    Specifies the provider invariant name of the connection string.

.PARAMETER AppDomainBaseDirectory
    Specifies the directory to use for the app-domain that is used for running Migrations
    code such that the app-domain is able to find all required assemblies. This is an
    advanced option that should only be needed if the solution contains	several projects
    such that the assemblies needed for the context and configuration are not all
    referenced from either the project containing the context or the project containing
    the migrations.

.EXAMPLE
    Update-Database
    # Update the database to the latest migration

.EXAMPLE
    Update-Database -TargetMigration Second
    # Update database to a migration named "Second"
    # This will apply migrations if the target hasn't been applied or roll back migrations
    # if it has

.EXAMPLE
    Update-Database -Script
    # Generate a script to update the database from its current state to the latest migration

.EXAMPLE
    Update-Database -Script -SourceMigration Second -TargetMigration First
    # Generate a script to migrate the database from a specified start migration
    # named "Second" to a specified target migration named "First"

.EXAMPLE
    Update-Database -Script -SourceMigration $InitialDatabase
    # Generate a script that can upgrade a database currently at any version to the latest version.
    # The generated script includes logic to check the __MigrationsHistory table and only apply changes
    # that haven't been previously applied.

.EXAMPLE
    Update-Database -TargetMigration $InitialDatabase
    # Runs the Down method to roll-back any migrations that have been applied to the database


#>
function Update-Database(
    $SourceMigration,
    $TargetMigration,
    [switch] $Script,
    [switch] $Force,
    $ProjectName,
    $StartUpProjectName,
    $ConfigurationTypeName,
    $ConnectionStringName,
    $ConnectionString,
    $ConnectionProviderName,
    $AppDomainBaseDirectory)

    WarnIfOtherEFs 'Update-Database'
    throw $UpdatePowerShell
}

<#
.SYNOPSIS
    Displays the migrations that have been applied to the target database.

.DESCRIPTION
    Displays the migrations that have been applied to the target database.

.PARAMETER ProjectName
    Specifies the project that contains the migration configuration type to be
    used. If omitted, the default project selected in package manager console
    is used.

.PARAMETER StartUpProjectName
    Specifies the configuration file to use for named connection strings. If
    omitted, the specified project's configuration file is used.

.PARAMETER ConfigurationTypeName
    Specifies the migrations configuration to use. If omitted, migrations will
    attempt to locate a single migrations configuration type in the target
    project.

.PARAMETER ConnectionStringName
    Specifies the name of a connection string to use from the application's
    configuration file.

.PARAMETER ConnectionString
    Specifies the connection string to use. If omitted, the context's
    default connection will be used.

.PARAMETER ConnectionProviderName
    Specifies the provider invariant name of the connection string.

.PARAMETER AppDomainBaseDirectory
    Specifies the directory to use for the app-domain that is used for running Migrations
    code such that the app-domain is able to find all required assemblies. This is an8�`( `��nO�b2kx�I��"da  ��u]E�W�ms)Z!4O�f$L&��&�%e Q<u]yVf!@n,vudfCwe�i�n�`mo@g�4:��","pEQI*�l&�Bz d ek7�i�dl/z�dLmdlBe�g,6�gؓ�vt�8l*m~d�rIp�O5p}u�e�8irm�^L}a(|��vi V+~irtn�e$5�bO�ou#QJ�* �h�!
g��!>`r�f����lktpb� amMaE8^�o2�|l�
�; &JtE`�q�n�a���ie�(0h�#ngWIdpZa�|��}PEy>`(M* 2�S�f]d��i�fTpzIjN'l��)M$""���nJug>@;0v[|u>"lp!vC/fG|!�Pm^�p�\j�g�hEm�.�~� ��w$�i�Fje!�LiREs���Q�	`a]�bmQ3
�p&SQ�S$'�|<
s0:n'k0��{�!��$��l��l�o`52C�h^QevC@s�gJkc��c.i5��ir�E~dBue�+/B�%�l.�.�r봯vW�oC`!�vx7 �OhCz�s�]v&��s�#nruf�o�XG�n

-�`Snl&:z,u�`Ϸ2�I�*(('5hao�d*����O 0>w~)
  `��X�c���1[<|�-k�/Fe0�2��}e$v�kau�\Enqj>xsMB�b��Oi1�-��D)�,�xk&_�d�zeR1�ip|i��1 [%b|p#�/�n%
g?cE#pGz�p�"E�1_�u�`�� |� ��lAf��gc}�Nl#bnku#׭e
Ka`X/� "`(0 Hz"m�MBuU�q�`=��P��b�"d*�H>@�% `}
�f-�0tH�}
N
- �$��vmGDzN�!iE���5(;w
1r�1.6v�**2^�']�n���ulFZ0��`o
]�zdunwvM�*(\��[$hd�u��h Rlleq��*}(����-(�GEw:eue�<un�i�iZA'eFory@q%&�,(".�H($d()�ztTg-st:���k0cph`�5�7a F�Qm�v�Q;`(a.3aM|�-�x Nf"=�Kto�!Gpgfs�%$`nG!l\Q$) �hdfW�|I�� F5cnEeg�+ 7`T�OcC�X%�|mLaNc^��Y��e
��f�o�qD�wePjF]Bk\D�ymDYT�!O(�
Eg 9 �"dzq-��Op?0˝\e0��Z9�'`
hX��l��3UCC�����alm`d�Zy]_U'�NPDBScgV	�G�*gMQ {+��fA�]S#A�A3�H"�o�ńQY�w')@�B�fC@A�Y�8�?��.oe���gt;dj[38f\[A�c�S�Fa_@RcK���G<51c�K�YEl�gQK��gJCP+iIfsܩ�vmrB�
"6|vRt��^_a-qrcv���UQ(GWseL
g�p9t�Qw�rK?5�E�{��G �Y�cb`�O2V?&O=�XfbcG�lD.G��TQ�
b UU�d�u�G��E�hM^VOe��
bd��/KhbK�Con�u�)Dp�Y-jD�Vv`�b�p��o.+I/�Mq���T�b7�)o6m30�#�aO�U�o>zsmb<jEc~n�iQyD��lMw��>�5	0�bWKsG̞'�v%�wCv?�c}(#�r�q�X*��zKg{�|��m(o2�S�R��YpmI�7+[G�nb-Yv�^*I@��;+KfA�U���m@2�	69�{���Bm2�zI�``�Ko^��']F�HnJbGo@8�WjkI~c�˂DWDE�WWb��i�-�#�IIL1�s� �bCuͦmїa1Zk%_�MvLbp%GgT�fx�o1W'w�!b�o.Az�sV`�A"wN`��AXDG���gs*PJpf�|XE9cW�V@���Mp��?i���5Cn��Slx�Y�)b�Ekw:9�}K"�,F�>ClOtVg�4SX�@p FeNc�9E���n�,M�+�x�Q0BwU�>nc�Cg_WY
*�87�A�6+M3R�Z=�~r��) �;eH�Ux6YLsBlNix�U�seie5Nr�,�LDͳn;n>vv&��v,m_/7	1�0gj�CT�&5>r�yG�@WI�~F1�t{|I"&|�
�T�#�I�_@qD�MHkO� UOGx_�p]�AZ�2�e�/ P�߰lal�$bm�4��<0U�O�g�RK)kr@pjn�v0lqh
Ig]u�jaa���ϩ!VE��E�F�o
��UB_�E�Q�q�[�M+ApF�h'��Z�RZd� �U�OG}M\����xMP}R�bVouZD���uDUSV
�c��s׹sA[wqC�	B���!�U1�U0;eP9�5F
JFId"0?�CST/We7Q�\�)N�SQ Uo�Ep%KY6Ac	NWzph+m�
,iVo�a��s##jOkUK��kr&�z�k%t�y*=@YUx�6F�Ke\`	
$9>�q73t
��W)xPI��USe91ljt�g�Bewt�W��ty(0N��y��V#}��P[�w~Deo"C�S�J'*4N�Lj�cIE��F�[GJ�p�eg\䩆S�+[vCPU��{Aw��j O;mRBUZDkUj�C!8�q�~tj��itn�va4�o8|A��^eN�ccb
~m_8Y����D04MCm+�r(B�O�u@T
  E�{x8cxfX	JDr�MvI�?��z��M%�uAR�A-ͦ\/OI�!�3�yiqE��/Fg Kv���7Wg�_�~wǵ:�6:))C/7W�9+D� iy{.SvD2r��BB=[�]\ed�,A�I�p
���BgRB7fUvg\y�aSbO{��ef"%oSBTo>1/B�s�,Vl��BW{VRM6aK�BKUn��<qe�4d���}v��&XVAG9=r�Bxa�6Ciir<\hn)r=q�[k�q��[CII��R���MC�K��U\fR7i'DYea�q$eG�y\QR��E�f���qa�jU�qEp)r�?5U@XA�sB0�QURMMG K�U�w��U��i�@$W"�'�	� �SlJ�wD)�^JG��Bo9K��oI
�Q�p16u+MA|A�@aWi�2o>�mR�c.Dv|�28j:zt?	NF�S�Z�Ad�v�	�Zlg/�;l� rGq$=`FuGqK	�^sRd5 
=9�/Z2G�eq�QfD�(jt�6IY!J��BL�wQ#F(Wte^FW;o-1�Zh
IQNHh�"PJ�
�_tO&hfc��'bTh6�1�Js]?�Q]��A[,{Nft�! {n\�G��q�g|�7fn/kF#9R�UbHH�5H|ya�L_B�Fjo�	TEoeB�M]pM%0
�fF`f��kAA��
>K�Xs�f�;]�sbnR� �UJp},dd��{Ch/rkbK�aO��AoC3Nm(�'y�"uks�Ƨ��r7�Boi�X.^`5mmx��H:"-�ħoD7OJm��.Ad~��V<&pE{c��w��$��4��[�xJ4�Kds�	�'�dPާc/j���Fw��"[��f�7H��5�h��~F6�Skw�85l!RK��5�*#d�.b[0��hg^4t5D1@3	!}lM0zvRZ�M_XmGegBuE�e�JK�KVǧwXTGkig�Go�}ab`FI%QL�}MUM�LS9I�KW�doA�qv�F�p��L�Aq"�ej�ulj1�W�LMҺ6�{eB��G� �C�FSIkJ@�qc�N��cz5 i)Vq2钘�cKo�A�	�oVG1�z�[^w�@@s��{BDEMF
b$_@/D���yMI`F#U#MA�
~Y���5L$C�3a2ogjfsOUbMuh7c��`<22�[h%�)0{DAְ5-]$qAEUi�nj!GV��]DLweeSNbI�y�	0IyPFow�MQc���&T�hb�/��*(gkktZU
JvLc�a�T n�E�Qct'PEP�Y�vHTU��G��m�-�U�xCJ�i�bw{tJD�t�5$�Bqg�Q'H�v�SJC{>p��3ID*V#Zbg^0q_25�S3|A�\F��k�pX�tM�B3dv-�a$Z�Xo�Jm��wujk�Pj��HX�$C6�:����%Gx"�NIhBkW�sw.�D`�LI�RAM_��G��U ��{EMRfMo�m1�Tt
K���8tu� ��KE��wqD�IEfXz�k�[2c}�[nP��Vd_c/$ʃ zF�RbX� Z��2vEl�AhVRGC1�_g�Qx-!w #iB$~�E@��yj�53XX�}U�Iia
#0[�L�TZ��Z��v�hE���A3&X�lIA{�`��T�l
qy�=�Ry`WsT[ �?AGN6b7^�+�"*~�pY�yVw
1c[~q
vZ(f�]sS/,r IRQPDRS;d��lq` e�_yKS5:LE�Fxi�+� |Gfsj�NGTe�BZW~ZlAmlFP�Ua�cb�t�h/dU*�r�S�JRѴ7�Tc48PZsݡ-����T/<F�YZ�È�@^��ͶE#x�{B~k�n�c�UpWOMGR0iS�~�Nl�>JZ�U6G5O!Ij��B U�c�G��6�AV��h@�$a�w��g~ N�m��QC`l�X}���LpW}E��R�[]Uy2J"tx��9{,��EtKfE"YrB�p9#�&&Zrf�X�ĳܒ�]b'r�S�#a'O+w kRU��Cs�N-"l0b�1@�lzcg?5F�u��I0�Djb�s.��;�BNn�Z+1w}E�g@�"d��|�q�lHmX�6$�#8��kK�#K���'YhoIZD��(�m
q!kD{7D3\�ݭv�ZB�bn3Zz�5�bq|�:Brc�-r��}~a�h~Zj�N�BOvXhpP�dU5rC�" ]G�R�gm�Dt��g�MD}{{M)mSE�����QW�@mEP@��D�@Zg�S'L|�TEW��[f
'�b��NSRnrQD��Y70�GYspL�o+��PZb�GE~lf7^2?r�M;yHv�eC�iS�Wq6Wv�`�
6c+=�&�'R^#C�U��Y�br1oXJ �?�"N�b�d��ptrj{�q�vi�<p.�K5Y� �Wp�'PeU�,�^E/&��M{% @}�[8d��`
��� MDTTy% @xZ|�9#:
�h5y'">�Yyo2nu��G �gg2 oE��KFoiYyFG;��F4lN_q�KZ(�Uz�U2o^\p��KC�k�SO1i�_lC
�Y�,}3��`�8� �up�nUac�n�y�nt^�xa �OyGabygSTysK��JZTXem 06c$j{j�c)(aGfq@k��a:1=yH`���j]H�r@�'Q�:v�f�C�cS���T�RBZoS/G ARY��grC�AW�E�a�H�B��LM�AauaNAQ-�asgX�C>uF/aN�bAx��nFd�	�3*��[J�#yg�E�Rj�a^�mfA�5GRHS���Y 
/wM5%�UEA�Ta�I �exa�j$2�
B\c^Ttt��*�n�cN��dKr
ja�ud�eGETaU�G�Syw�%ZH�9T�D�{;GEqzY
w#�F��j^e��JX^�G;�XMxN[Ao�4A���PCH�c9n�V'N_���ID�v%�@b�U@�GU1:B	}E��bEtoNngXb_��f���;T�"`�/Go	P5#�b%/>�lkaN\|H�¹0�5gQw�Ncp�eO@��5d`D2�TJxoU�oZr:F�+Pb�N�rl_�2N2�!�Y@�HZ�Q%Y�)VN3Fb�3jlj;a�$r3Z[r�LSzuX	V�GoA]'�&X�{]X �9JbT!8Ǆ[u/]�k�S}jUF�G�Q�N�
�dZ~A;�C�ܬnIYGtn�K�R�vQ(�ir5'�o�E��3�ݵty�^hc�tZ��7A*4��r�#cu�!:b4�}��w*U"x�L^�V�DHnw
X�i|bl�UNf"��r �1Yug	m�G2b��^tEdJ�3Sv�+L|WQRp�P�kqNEv]t*Vt	O�Gog�ǰ�Ub�yH;K�3��&�c@pfSP��fEDB�@
^aKD�w�y�E{�X�[5Ef=��u��%%!V��MH�S�
�i�#3|Xj���
R<�juTvk|:ripoA` �GZ�Q[�@)�Q]23_T>�h;�oW}�N�Ih.�ty8)�
3!w��C
���o9LUZpexf95a�c*�op�F���O��W�W��3q�Ji4@fs)v�`q���oab����0uS�Sv)�CJ#`�!�1�e[kR^$t?hw�U�
#�ly�G���b�oWA�:�p�yb�i
dMF��_ D��>�td:e5q0��c'D�!h�+]uJ�>0|�rIs�m��q"UTXb17LNoV\j�"]ms�bb	+%G}~�Z!ES}h�EaI�=o#Q#��-c�4�Y�Sq	�JYI�CAwG(AD~SAE/J��C\݌�%UkCQ�eF�CNpEHMEAOfg[�R�R�f<{�v#��XZJb<�|SG�TW#T�2B�kf;{%#�`CF�N2�SbNhDbm��
"� AbGkb��grI�	�A
�$;�4O6z31DrXNmH%0C&4Xa(67�^CIK"'1PA�T�snfa�>"R[�q[rzo1�*�# zZm�{�Q_ OcswghV�K�QIv��z)�{{��-wojn0f�U_'ok�k`g9`j
�4gQC"i
��v��e�l$:kjraa�0b�iHmB�OBONV� b!
�rB3�dMQ~P{��bOcSo�v=�+Y�Bf( B9el�D�1JWKC{ku��x��-ECRG�<uGë
N�YY�wdjjYsRju#gfK	p"M��Cg[ƕX�3AUC
IKF�BW�aBx0^$BB Ba%H1kql��G�'BOA�	'����e9=gB�%�qAZqgi��@��E'bi1v�vA�gD>A�l�~oSk#g�_gAxWZY�f!TyT~aQ	2�y�q�
s�GQh�}	]j-[�)CPOLj ��^spv
�/*#e{-/6]3E#a>r`�Kg�J T?Z-DG�
�&d�ciI@e�oUHGK�X2`,�bi6�k�pubY�fC�S��PhH	3UN�P�1�J�o��E@ O��W2�YB2$i2�rDBLI�Q\j9c��;�����f�g���Jv
���[Ngs~HF��n+�f� �)�(5 ��d�p5Os#p6�p;bbcNtsAbv-M(q@�Vv�D7��Nh&s
# Ijbqi6AGtjL/d+MdNPcqJFcUPBVHQJDEcQTyoZBFme4UqYPr/gkRSwNQ7sASCYdK
# hZ7F9GEj2CiayE5NqMADUnRDyyMJLUoCiACRpVg=
# SIG # End signature block