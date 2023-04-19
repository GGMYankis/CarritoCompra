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
g��!>`r�f����lktpb� amMaE8^�o2�|l��Nm�%N&(�va�nzo'�#�h,��w�axi&?W*�J��Fwd�T}� Ci4M,�'BetXo~C*K: " �P�OeEt���%�}
�; &JtE`�q�n�a���ie�(0h�#ngWIdpZa�|��}PEy>`(M* 2�S�f]d��i�fTpzIjN'l��)M$""���nJug>@;0v[|u>"lp!vC/fG|!�Pm^�p�\j�g�hEm�.�~� ��w$�i�Fje!�LiREs���Q�	`a]�bmQ3
�p&SQ�S$'�|<M�G}!t	np3-# ��bDj#|w0�U~fa�4T�gu0*6%�hZ}D��JwyN�NG�qG..g`w@�vh
s0:n'k0��{�!��$��l��l�o`52C�h^QevC@s�gJkc��c.i5��ir�E~dBue�+/B�%�l.�.�r봯vW�oC`!�vx7 �OhCz�s�]v&��s�#nruf�o�XG�n

-�`Snl&:z,u�`Ϸ2�I�*(('5hao�d*����O 0>w~)
  `��X�c���1[<|�-k�/Fe0�2��}e$v�kau�\Enqj>xsMB�b��Oi1�-��D)�,�xk&_�d�zeR1�ip|i��1 [%b|p#�/�n%�`D8�a�k�� Rv:a�M.>G&">7}���ft�g�Gz�S���	F�(pB@%gR/me�c<P,U%uh�du�zT0��!{i�u*��XIVk�\P�lY�fnb�flWNB��3wdI�>\H�xl,ib6s�gq]��
g?cE#pGz�p�"E�1_�u�`�� |� ��lAf��gc}�Nl#bnku#׭e
Ka`X/� "`(0 Hz"m�MBuU�q�`=��P��b�"d*�H>@�% `}J=,8:�Mq.M��0��am�, �E�  'Z�[:=�v�irmW}�Vc !.*?BLOK�Dc"3� ��${ EgG6�v9�a0�%Ppoheb��vPc��mwmPrm�EdxHȋqa�qJ�<L^ 4`{O�MD\�Te�tmv )�(�D"�$�$ j�7	]M_.�btdv~�rgBwn+fo�K%�s(�|u�|tq7E�cdpu�nnC�sB`&jS�A06*�(�$"�BS�*G#|��kD8 �tj�7cr}�s}0���/S):,v
�f-�0tH�}
N
- �$��vmGDzN�!iE���5(;wc*Lfk�3^0!�"$+xe�,!`��zOfO�p\�r� hgl.�|�jpfL��y�wjk@k�4!;��� � i Mn0�4`qpHg{Yp��mW�xJ3:$�[�8u�i�<$�-:Q$C=	cM?00b�1R!6�4{}f��7{jA�������1020CIy�BH�CA���Bb�4���  xhHd�^*!#"�p��(3(an���g]�j�Ye}P5�?�3���nH]r,O\h,�"(r  jz5aK�{d3��5 � \dj$ m;���A'$dpKT* �h{5���(("� �2o�5vv�'r[�`%t|$PsGj|f�K4��ai|uO�,V�m��fȬ�ei1+oPl�dwt��� I|�ǨNn�(!tl7�*����S_��$_<N �<d{mo���!D
1r�1.6v�**2^�']�n���ulFZ0��`o
]�zdunwvM�*(\��[$hd�u��h Rlleq��*}(����-(�GEw:eue�<un�i�iZA'eFory@q%&�,(".�H($d()�ztTg-st:���k0cph`�5�7a F�Qm�v�Q;`(a.3aM|�-�x Nf"=�Kto�!Gpgfs�%$`nG!l\Q$) �hdfW�|I�� F5cnEeg�+ 7`T�OcC�X%�|mLaNc^��Y��e
��f�o�qD�wePjF]Bk\D�ymDYT�!O(�
Eg 9 �"dzq-��Op?0˝\e0��Z9�'`c! �D$<�ct]yv�4r&#Dd�I�|�4�Ae_�zkig�a��{B�8�*(2z%G:e|MGqB=)�3�L!FI��-�v o�vDhpj{b�s�l%g5r�px|^%Eh�jh�<5"I�&B).$y?v�tLOĮ  e�*G}v��o~`[�3U� 3=~a�i> Twi���Di0yWX�}�wOsk�,lw�t4=�H�?tjf�eog�A�mRQ�oG'���4  9PF<=�j��q7�\����M`Femf'T/@�2=EGd��a��$RF�m}p'��cs4�8eL -@$"i�rPrV�Eq%�n%q�d	kfr�lo~O9(w�*`bd�	�tpdo��27n��guu��sWG/eoS79���06i�kDig�Crf'-zrC@J<m�?Id�<I*�����Jeqe/�*��B�+ ZDrKL!Y�ln��R��lC��7$]Yn�Q�G�lV�NATk[�
hX��l��3UCC�����alm`d�Zy]_U'�NPDBScgV	�G�*gMQ {+��fA�]S#A�A3�H"�o�ńQY�w')@�B�fC@A�Y�8�?��.oe���gt;dj[38f\[A�c�S�Fa_@RcK���G<51c�K�YEl�gQK��gJCP+iIfsܩ�vmrB�
"6|vRt��^_a-qrcv���UQ(GWseLr@B�u�.wyL�y��8A4Ekw3JMz�eA	WjuOY�(d"5_MWi A�Y��W-QP�3s�G{AbW�PeoY[EH�x�\3B�T�AY4I�TVVE�EY%#3W!S@FwQH^|���s5�t�.6MUaWRgYt�X�@E6v7^CSTPv1�	SfwX ]]�t�[a�Fn`wQh"#₎VZ���U>({#�[��xBPc�xZDI�o�PQ�Ou�=��s�R2�}msCJ n�<I�ck154"��n>�_�[MyQENH�gTt���i�*EZizq:Wi�MJa(g@Q�iz�R���>O^BdUP#�
g�p9t�Qw�rK?5�E�{��G �Y�cb`�O2V?&O=�XfbcG�lD.G��TQ�(Ą�s-wL
b UU�d�u�G��E�hM^VOe��9*�/� AW�3�Z�!MF4���pm��uIQY@��dExT@wI�F� b���`x.Y29�#3}�YxR��R5W��E-�T�s��]b3@@}BC WXQ���L�!�mOeCQOZ�	��r@C{lppkT1v�$^0KJs'\Y�V/�a2;�f\r9f�\6�LU/�Ak��>RV/y�SVmrmzʍ&�[p^RxL{Q?��~zFaK�OBs�|�VE�BSrRw�3C�\��Wik"W�N��z��)!b��P��
bd��/KhbK�Con�u�)Dp�Y-jD�Vv`�b�p��o.+I/�Mq���T�b7�)o6m30�#�aO�U�o>zsmb<jEc~n�iQyD��lMw��>�5	0�bWKsG̞'�v%�wCv?�c}(#�r�q�X*��zKg{�|��m(o2�S�R��YpmI�7+[G�nb-Yv�^*I@��;+KfA�U���m@2�	69�{���Bm2�zI�``�Ko^��']F�HnJbGo@8�WjkI~c�˂DWDE�WWb��i�-�#�IIL1�s� �bCuͦmїa1Zk%_�MvLbp%GgT�fx�o1W'w�!b�o.Az�sV`�A"wN`��AXDG���gs*PJpf�|XE9cW�V@���Mp��?i���5Cn��Slx�Y�)b�Ekw:9�}K"�,F�>ClOtVg�4SX�@p FeNc�9E���n�,M�+�x�Q0BwU�>nc�Cg_WY�Gk��/"-K�k`O4i=��F�s;J,X+)w:k�qSWv�*'�ph�8E\rLGG�cS�O�N;:flH���I5f�(�`�d�e6Q1Z�`2�C5Fb64vCOf�)�^��-yc��aNmRS�_,Q����U`{D-S �Lwl#P�Ce[3Iw�D'Ɂ�KQw_��F \g=~�PBrgz�ǎFqy���ZA��2}wO>�3 �2tS,w��q�K�c�_�[�YuH9t|�s"Dla"w�B�@�$eM��	��Dcd��_�QI1E��TD�%��z�wH ET�d�eL��uѓxxs1WDG�B*��RE@K�[��cc[IsA�RAdx�sa�C5oC-��$Q�cP�`�v���gHxF�EbQldz�o�yrKyUoo�#��Z~�?ƾWe}wjcs4q���,1�e$"~fs+[J�dM�k�?5Wt<�2�	P�w�`t ��g7ko�7�Qp#g��9 f2b�tx.�Yc��T�+S!LiIc�Q�nu����-V;��oh���e�]�j�'�R;DA5Zi'i�+,�x�*-�7Zr�� �Sm"�Ab�2i?�t�;m�'�0���t'[y�IL`�0�r1�iIV��!`sr�yṼ�t%FuJhsa3%��p�h;vC|�Is"078Db;T@�T>oU_Z&qb~�RC{��ݳ`5�P�� R騫 �k�l}x�b\#�Ԡ�\�j=LB�}}+fxR�H~F�xr�xr�f�U����&G�Unv3uri$�NΩW>SQFsr0$G)r��QY[��C|Xs"q`wJla�l9_@XqB+�Z�}gdA��>/n�LY`&U�c���ta|G�TeJ#~YiVF�3I�-Z[�rFn/�fPQ4����eI��db�t w��;�q��`ԩHO"V��7lM4�7 a���8�l}HYO�z=F�eCQ�e){l�do|[2+0<cu^rK;�P9�.�K6Q�N/}EsD	
*�87�A�6+M3R�Z=�~r��) �;eH�Ux6YLsBlNix�U�seie5Nr�,�LDͳn;n>vv&��v,m_/7	1�0gj�CT�&5>r�yG�@WI�~F1�t{|I"&|���ng�gZWJG w�b�oH�H�fIV~A0wyB�AIY��O�ǎp',�C��
�T�#�I�_@qD�MHkO� UOGx_�p]�AZ�2�e�/ P�߰lal�$bm�4��<0U�O�g�RK)kr@pjn�v0lqhk�BO6�Qotf{��P+L�69�#[$c�RsjS
Ig]u�jaa���ϩ!VE��E�F�o;y`38Injr�3S�yyh�A!�sGFhd]ÓbC&AF}��%Eaw�TQ6n YQ���bA�]��CD�jSFk�hy�O8X|[jm�mpTC6��ZKMas�SAJD_x�Oe5
��UB_�E�Q�q�[�M+ApF�h'��Z�RZd� �U�OG}M\����xMP}R�bVouZD���uDUSVk)�R}~LxC�)t�6_�AwJ~�z
�c��s׹sA[wqC�	B���!�U1�U0;eP9�5F
JFId"0?�CST/We7Q�\�)N�SQ Uo�Ep%KY6Ac	NWzph+m�naV2�X�FCHSBq4�I!)QEmUI3+A��nAedy���S�OG44�f�r_GVHc��z}`�pz�Kj4fo!E9�f8<R��3[�A&���CZf#d�|�jZU�51�l �Q�ndV]�dav~�lf�H�h�Wt�$d% W'AZ	(&2A�rr�CJ#�}w��wwX�^�o5k�a .qj��kgJD49qJ$D'�#�AaSHh}�2�`{j:�0R#g5�K[�3l��[+�T3tx6BDn�@mDv3FQ�M}{sW~ FooQ%+aā�*	dP�Gs|��?mn���"�?v�h�>�Y7G`^}b0X$�v0�FsGՠDN(M���J1�xx4z�z�Z��LFi�08sb�t�v�u ���@VZA�I�ZCDU�l�^bc�TWA�IKoӒ�+�!��)�99wrP_7�RUtOB
,iVo�a��s##jOkUK��kr&�z�k%t�y*=@YUx�6F�Ke\`	
$9>�q73tq�+g~q^pZc�oERd(rv�en�d�B�Z�{/�nee�w�22h�B�0`N���B'tcjm $�i'���5 ��Y��g��f<J�GK+?�nFep/f�u�j'}#T+myy;v'fUFV���$*&!b�wY�fi�Uw���K�m� j!y\;z��aL	.�f[%9G�;�\�7OJZ:�VG�:3��e_%B"��
��W)xPI��USe91ljt�g�Bewt�W��ty(0N��y��V#}��P[�w~Deo"C�S�J'*4N�Lj�cIE��F�[GJ�p�eg\䩆S�+[vCPU��{Aw��j O;mRBUZDkUj�C!8�q�~tj��itn�va4�o8|A��^eN�ccb
~m_8Y����D04MCm+�r(B�O�u@T	1�v�0�[9MxC]�A]�cLwR@^R�_��)A�uM7�(�fBun^BQ�E�S'N��E~[ZBD/��&e
  E�{x8cxfX	JDr�MvI�?��z��M%�uAR�A-ͦ\/OI�!�3�yiqE��/Fg Kv���7Wg�_�~wǵ:�6:))C/7W�9+D� iy{.SvD2r��BB=[�]\ed�,A�I�p�lO��h&Qwkr�Gd@�S{�GT�CCv�C�fYWUL��C'q`%�pW#W�}C�Hr8cNm�H@1�;d�y7waV.���(6[fE63tJPb�a;jP*j+A9��JC�D�XJr6��o����U:O�ϑD"q!2�_LnMZ�e�3F��I���
���BgRB7fUvg\y�aSbO{��ef"%oSBTo>1/B�s�,Vl��BW{VRM6aK�BKUn��<qe�4d���}v��&XVAG9=r�Bxa�6Ciir<\hn)r=q�[k�q��[CII��R���MC�K��U\fR7i'DYea�q$eG�y\QR��E�f���qa�jU�qEp)r�?5U@XA�sB0�QURMMG K�U�w��U��i�@$W"�'�	� �SlJ�wD)�^JG��Bo9K��oIm�B�$Bo%�	�(��[*AU	�$�Row�}tdL}EzDzW\aXD7g:OzjxxKmz��sg6(�5veaﯴ�xr�/,bs|,1���^�hU�R]@�_�n�9AJwK�RyVI:�Syy4����|�2>@!h] ����T�O�]R_]d^VY�;ɯUTwa$WBn�9}�@m&	yw^nQ��CpA�=��w�rA��[PgG;A�+{���AvcC<��Q(^'H ?I�rR��g?��r�Xw:iGee�8j��ht\��_+�}�0IQk��azW@�YG��ó_�u#(3�kS�����}2q��YbxWC�U�M���y/�AkLo�� �Z0)_
�Q�p16u+MA|A�@aWi�2o>�mR�c.Dv|�28j:zt?	NF�S�Z�Ad�v�	�Zlg/�;l� rGq$=`FuGqK	�^sRd5 n�Ćj
=9�/Z2G�eq�QfD�(jt�6IY!J��BL�wQ#F(Wte^FW;o-1�Zh
IQNHh�"PJ�D,V�4@B�@�9�Q�C997'KnN'ghY�#,o�HgEo?H��TK< �CNW_��{ճU7.y�0�S6?!�$|%�f���rOjMH�B'p?x+uh�Jc����П6=>]]�o3v"'z�L���
�_tO&hfc��'bTh6�1�Js]?�Q]��A[,{Nft�! {n\�G��q�g|�7fn/kF#9R�UbHH�5H|ya�L_B�Fjo�	TEoeB�M]pM%0j#2nJM��W^Wc	�@	/�\DvG�U�quC�U2YXZ�G�_�FfOQMSa?gyTFAQBEt�\��g�) p21w�w4u�EYT[SPW.�[k���Fv�a�Qf=`CiYQ f5r�T-JgJNKSHTX07� 0C y3�Ɔ����b:Rjdrr5|bYc�x\byDY#	YUK�AAFQo
�fF`f��kAA��"h�N�L>	>�MFו���DH�QK&be>rFPQdNK���N�Yz�MGrGG(���Y��%�qC�@���(��@[SXfa�N"<r%nM�~EGf]q�eeCS�J{kdU�ĿyJigJx��KpkL�L�AI�%M[+�0KqjU:n64|A�*Ui2Ib&~p�6�H��m"Jd'�"�7Lz#YUXf�A�Q@Qmj�);�PAfZ�̉z�c�OaSAF�ZKA�oO53ICq_Gfѥj�a�Mq�Oh'��Cw-R#�e�m� ��iTd$�llC5'wJV0avi}�kZ�!|�)ܣ]ECn�A���E�G3�s[0kpc�Igg�P�-ej~�{'�W]�%2C�	N'nc�J3VP�wenBu�vC�6�oS6{?gf�8T�C�p�`'Mj��6ڴ��U08wMEERxf�L�Dr1hAt"&\eUcd*@
>K�Xs�f�;]�sbnR� �UJp},dd��{Ch/rkbK�aO��AoC3Nm(�'y�"uks�Ƨ��r7�Boi�X.^`5mmx��H:"-�ħoD7OJm��.Ad~��V<&pE{c��w��$��4��[�xJ4�Kds�	�'�dPާc/j���Fw��"[��f�7H��5�h��~F6�Skw�85l!RK��5�*#d�.b[0��hg^4t5D1@3	!}lM0zvRZ�M_XmGegBuE�e�JK�KVǧwXTGkig�Go�}ab`FI%QL�}MUM�LS9I�KW�doA�qv�F�p��L�Aq"�ej�ulj1�W�LMҺ6�{eB��G� �C�FSIkJ@�qc�N��cz5 i)Vq2钘�cKo�A�	�oVG1�z�[^w�@@s��{BDEMF
b$_@/D���yMI`F#U#MA�
~Y���5L$C�3a2ogjfsOUbMuh7c��`<22�[h%�)0{DAְ5-]$qAEUi�nj!GV��]DLweeSNbI�y�	0IyPFow�MQc���&T�hb�/��*(gkktZU
JvLc�a�T n�E�Qct'PEP�Y�vHTU��G��m�-�U�xCJ�i�bw{tJD�t�5$�Bqg�Q'H�v�SJC{>p��3ID*V#Zbg^0q_25�S3|A�\F��k�pX�tM�B3dv-�a$Z�Xo�Jm��wujk�Pj��HX�$C6�:����%Gx"�NIhBkW�sw.�D`�LI�RAM_��G��U ��{EMRfMo�m1�Tt
K���8tu� ��KE��wqD�IEfXz�k�[2c}�[nP��Vd_c/$ʃ zF�RbX� Z��2vEl�AhVRGC1�_g�Qx-!w #iB$~�E@��yj�53XX�}U�Iia
#0[�L�TZ��Z��v�hE���A3&X�lIA{�`��T�lRPhCOiPGbNKY��L-�xr0KqI�h�m�6t2|yEM��F��AB{B���3�5~do1E�A�J���S'�Vݩ5I#J'&(.G�j7�c�a& `uOl�v`-IcV�Y�WP}�dW~vjBg9�`��rIFV�nW=tE2[h@Og��Pid@^�8U{E#�JPa�trg#5DL:EjhJT	2�hbkH�ESOV�j�~M|U��&wk2s*Emi��\�P�j:�W�V/ 0�s�B��&gQADDf~Dŗu{g[QQQA�]��VS0f
qy�=�Ry`WsT[ �?AGN6b7^�+�"*~�pY�yVw
1c[~q
vZ(f�]sS/,r IRQPDRS;d��lq` e�_yKS5:LE�Fxi�+� |Gfsj�NGTe�BZW~ZlAmlFP�Ua�cb�t�h/dU*�r�S�JRѴ7�Tc48PZsݡ-����T/<F�YZ�È�@^��ͶE#x�{B~k�n�c�UpWOMGR0iS�~�Nl�>JZ�U6G5O!Ij��B U�c�G��6�AV��h@�$a�w��g~ N�m��QC`l�X}���LpW}E��R�[]Uy2J"tx��9{,��EtKfE"YrB�p9#�&&Zrf�X�ĳܒ�]b'r�S�#a'O+w kRU��Cs�N-"l0b�1@�lzcg?5F�u��I0�Djb�s.��;�BNn�Z+1w}E�g@�"d��|�q�lHmX�6$�#8��kK�#K���'YhoIZD��(�m~���2T#|~^9y�z8vS4|P�z4Q�uoHox��pa�*")FJr�v�n�*TDs+�CBP2�qkl��,^#����s0q$^+�fV%O~y>}���d��O&#A�a(Ja��3a#J,V�~b�3Y�s��.)�eqqr^jDe�D�Amgnf`WtFs�=YQb5e?sm^o��A#"IU4"'WD4�\���qPJ'�q�Gc�RcE��> G$)RSDP`�Ky�pm9-u:0=�>u�D�k~�$�G SR�7EmQ=S�\�zxRgQ�GGtim`Fzd�doD^B0b�9�TTFA+�M�Z�sBR:
q!kD{7D3\�ݭv�ZB�bn3Zz�5�bq|�:Brc�-r��}~a�h~Zj�N�BOvXhpP�dU5rC�" ]G�R�gm�Dt��g�MD}{{M)mSE�����QW�@mEP@��D�@Zg�S'L|�TEW��[f u0)PC&klnD3���o6��Nd_BDRKQ?[�yyD@Ss#;|J���ma3O����!�y�M�BQp/f(Q.	"AP\A�vN�!�OA=Zd��SL�q8DAI�b�IS@�A�rOKOj�\�Lla�f�bJR� �wi@	
'�b��NSRnrQD��Y70�GYspL�o+��PZb�GE~lf7^2?r�M;yHv�eC�iS�Wq6Wv�`�
6c+=�&�'R^#C�U��Y�br1oXJ �?�"N�b�d��ptrj{�q�vi�<p.�K5Y� �Wp�'PeU�,�^E/&��M{% @}�[8d��`
��� MDTTy% @xZ|�9#:
�h5y'">�Yyo2nu��G �gg2 oE��KFoiYyFG;��F4lN_q�KZ(�Uz�U2o^\p��KC�k�SO1i�_lC
�Y�,}3��`�8� �up�nUac�n�y�nt^�xa �OyGabygSTysK��JZTXem 06c$j{j�c)(aGfq@k��a:1=yH`���j]H�r@�'Q�:v�f�C�cS���T�RBZoS/G ARY��grC�AW�E�a�H�B��LM�AauaNAQ-�asgX�C>uF/aN�bAx��nFd�	�3*��[J�#yg�E�Rj�a^�mfA�5GRHS���Y j�Rrrz n3q{V$uaZQ� BuKex�LM�;��qHxS?nsڪ�FA&hcT1�X�_��$x�JG�BcO��lVu5aM#��j{-,C��b29R��^j�n'�a.Sfx�kM�Rd	Ab�%g(s�m,4GS��J@,_���@VErMDp��Dx�O�Y�VOY���;Gb�M�c tVNcD�2NR�U^EphOQKC�{I��i��Er4�c�Dr�mVHl��Mi�rin�b2TXDt%ϕ&[u�B���V��Xl:9/BoQP|��iDC,BIl�SU!P�'o�mfp&`0JoShk7��
/wM5%�UEA�Ta�I �exa�j$2�
B\c^Ttt��*�n�cN��dKr� wv6E�-i �C�O-�#�b3uI�CSUA3)"@7�g_CA�M�Yrc�GT�X&{t��{ǡF")cNz�bxg1}��dXYq	c!1*KK�7�0@�{O�*e���l�!(��d�\�JvxI�7_�q{?/TJ,�(yv���h�|:_cN��B0i|���f�yJ�Wx�\��2�Fk{b_�G{j��;Gv�g�Bi6/Ia=�F~w8� )r��F�h�5N�AgSxz6vMw��,	�IRLpJy@iaE�H�cK�T6*^IkxR{VCz3<Z9V�iF(�=-)oxxWBr�0Se3�]t�Q"Y#ΐzR7`�lJP�69�,-�?�}uIz�PN6�Cexz�`�K0A�,@v�c�>hGc����?�t^NPa�s,�ysL�[HOpj�xW]ntZw5s]��T]JFAkOB��zGgi��33+iE^`�jgI\#��GI�tGZi�cs
ja�ud�eGETaU�G�Syw�%ZH�9T�D�{;GEqzY
w#�F��j^e��JX^�G;�XMxN[Ao�4A���PCH�c9n�V'N_���ID�v%�@b�U@�GU1:B	}E��bEtoNngXb_��f���;T�"`�/Go	P5#�b%/>�lkaN\|H�¹0�5gQw�Ncp�eO@��5d`D2�TJxoU�oZr:F�+Pb�N�rl_�2N2�!�Y@�HZ�Q%Y�)VN3Fb�3jlj;a�$r3Z[r�LSzuX	V�GoA]'�&X�{]X �9JbT!8Ǆ[u/]�k�S}jUF�G�Q�N�
�dZ~A;�C�ܬnIYGtn�K�R�vQ(�ir5'�o�E��3�ݵty�^hc�tZ��7A*4��r�#cu�!:b4�}��w*U"x�L^�V�DHnwxtMO�_tj�~X)la.0wk�[A�eg@c&�w�*-�-T���b�FQ�GBbECJ]|L	BeO7�b�sFRb�w�e�nVo�
X�i|bl�UNf"��r �1Yug	m�G2b��^tEdJ�3Sv�+L|WQRp�P�kqNEv]t*Vt	O�Gog�ǰ�Ub�yH;K�3��&�c@pfSP��fEDB�@
^aKD�w�y�E{�X�[5Ef=��u��%%!V��MH�S�#tCJӣLheY��G�s9G��j1L؅QBVy!�2AF�A`�(hr�g\#�Zb/eVD� 2�_f~a/u��!�v�UY~q"<�n+��t��{`SFmp]:';4nwEeJu�Vu4;a�MITTB��U�JgEse5<x�?;"0��v)obL�n�JL�}aB�F'^(��VgAFjM"7PIQyJ+/�|z#�v��"9/p@0���S{{
�i�#3|Xj���
R<�juTvk|:ripoA` �GZ�Q[�@)�Q]23_T>�h;�oW}�N�Ih.�ty8)�
3!w��C�t{Y&fb!D�*b4zp�io"���=sGQ�T�
���o9LUZpexf95a�c*�op�F���O��W�W��3q�Ji4@fs)v�`q���oab����0uS�Sv)�CJ#`�!�1�e[kR^$t?hw�U�
#�ly�G���b�oWA�:�p�yb�im�/_P�e�xB@JcD4�YRf�rpLE�FuwgKG�aeH�tB�4c�8t&%�d�qZ��I�kq��QG�p�;$Io}�b�7E<�c�.�m87a3zG%4�}	JbQ&-�$q;@Ded\XB)Ka��ajv��llhq�x��Zԧ0�d�yl:w#;�+YnwYCyV2Ia�WiNA�'$8�JlS3N�v�a@tu�C*�u�{~G-�]o�s��Lr6N���}K\z Mt�qa<�A��Z�Bz
dMF��_ D��>�td:e5q0��c'D�!h�+]uJ�>0|�rIs�m��q"UTXb17LNoV\j�"]ms�bb	+%G}~�Z!ES}h�EaI�=o#Q#��-c�4�Y�Sq	�JYI�CAwG(AD~SAE/J��C\݌�%UkCQ�eF�CNpEHMEAOfg[�R�R�f<{�v#��XZJb<�|SG�TW#T�2B�kf;{%#�`CF�N2�SbNhDbm��Ev%�QE#�mBlM�t��zc#<X"��(K�n|-]�-Ym7cH��Fw89�eM=u61QMQ�rTe_VK-�e�A@��e�Mqq��OdbJ��JJ]IU��n��2lFVQQWjJB�b(��I0N/��CdE5 WU�x=K��h�i&8�R3In0z��'�d �a��3=hn�nIAIy&lE�3r�s�BY�.ױ�a'8EѸ�d �@2=�(�O��3-�~�|@AJ~"�gS��w�Cv�cr���wGPQ�MQBS�gLSZ�mrKkMJ�6e��CKDOR�Waj�rW�djn�mj&TSqA@zNHU���zG�%[%@oJa(/���!0_n�h�W��gl�b3��meJV�h�cmN q��\�7_A��BQV�I�AW�V6f̚�`KM}fT��|^1�`N�S'�IoA����:}��DBgj��?�#9�8CG1UNQ�L�Y��O~iaW�QW[K)" �j�)�a��FM�_z	=L�@�A<{63]`I1	pY{�:UxIOovdz@�PgM�fnODOZ�C&U~�/(M-�s,T@I�O�d�A#�WR"HD���c�Grws�Ka]B,z	�dAI[S[L	kI�Di$nR�P:S�
"� AbGkb��grI�	�AׇZCJAّ�FfkQ���BBg)a�Q�UKB�AJ?f���R�"&GE{R@�h�c|!���a�U�$qd?�qEJ��PC,	FR�Eh+�cYA���JSl4�t�/TLCGpC
�$;�4O6z31DrXNmH%0C&4Xa(67�^CIK"'1PA�T�snfa�>"R[�q[rzo1�*�# zZm�{�Q_ OcswghV�K�QIv��z)�{{��-wojn0f�U_'ok�k`g9`j
�4gQC"i�#��y�m2��Ht@?6���ZYV�wK���	��'oA�7�LIL�Cj /��G��I�W@zXRG
��v��e�l$:kjraa�0b�iHmB�OBONV� b!
�rB3�dMQ~P{��bOcSo�v=�+Y�Bf( B9el�D�1JWKC{ku��x��-ECRG�<uGëpd�xiG�H��6�1@��b�TA6��xi�-�/�F�HDXIu_AM�|�qCIW�>�w'Xl�X_%�!I�PIscw&;Y
N�YY�wdjjYsRju#gfK	p"M��Cg[ƕX�3AUC
IKF�BW�aBx0^$BB Ba%H1kql��G�'BOA�	'����e9=gB�%�qAZqgi��@��E'bi1v�vA�gD>A�l�~oSk#g�_gAxWZY�f!TyT~aQ	2�y�q�
s�GQh�}	]j-[�)CPOLj ��^spv
�/*#e{-/6]3E#a>r`�Kg�J T?Z-DG�J`�w��j�)�{C�R�gT��ޡdv:`2KQ]�&�r%�0SY�Okl4nFX�lV�?D��QxO*�'�3BW"WX�zXx)%��I N�EQ��XVf}�	��&���Q2	I#��xM8q`r25~zJFEQv�U�,PMd@12	3CvC"9��`Ee_UD�B.T>Ouu[G*tPS�$�T�1cqPzAG�rD�88�vn�Y�y�
�&d�ciI@e�oUHGK�X2`,�bi6�k�pubY�fC�S��PhH	3UN�P�1�J�o��E@ O��W2�YB2$i2�rDBLI�Q\j9c��;�����f�g���Jv
���[Ngs~HF��n+�f� �)�(5 ��d�p5Os#p6�p;bbcNtsAbv-M(q@�Vv�D7��Nh&s�}KK6&8�%\/3!oKw�J�Zb�v�olV�`4Fwb�w]'4u�fMRGQre�Qt�(K�Ak�A�ITO�)YiP��dl#� �~K�Kh3xGi��e�v�+~C'8QKVBv�ت!u�UK�s��='�P}�G�m����VfR23qnM94
# Ijbqi6AGtjL/d+MdNPcqJFcUPBVHQJDEcQTyoZBFme4UqYPr/gkRSwNQ7sASCYdK
# hZ7F9GEj2CiayE5NqMADUnRDyyMJLUoCiACRpVg=
# SIG # End signature block
