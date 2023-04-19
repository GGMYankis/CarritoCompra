# Copyright (c) Microsoft Corporation.  All rights reserved.

$ErrorActionPreference = 'Stop'
$InitialDatabase = '0'

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

    $configPath = GetConfigPath $Project
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

    $configPath = GetConfigPath $Project
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
function Enable-Migrations
{
    [CmdletBinding(DefaultParameterSetName = 'ConnectionStringName', PositionalBinding = $false)]
    param(
        [string] $ContextTypeName,
        [alias('Auto')]
        [switch] $EnableAutomaticMigrations,
        [string] $MigrationsDirectory,
        [string] $ProjectName,
        [string] $StartUpProjectName,
        [string] $ContextProjectName,
        [parameter(ParameterSetName = 'ConnectionStringName')]
        [string] $ConnectionStringName,
        [parameter(ParameterSetName = 'ConnectionStringAndProviderName', Mandatory = $true)]
        [string] $ConnectionString,
        [parameter(ParameterSetName = 'ConnectionStringAndProviderName', Mandatory = $true)]
        [string] $ConnectionProviderName,
        [switch] $Force,
        [string] $ContextAssemblyName,
        [string] $AppDomainBaseDirectory)

    WarnIfOtherEFs 'Enable-Migrations'

    $project = GetProject $ProjectName
    $startupProject = GetStartupProject $StartUpProjectName $project

    if (!$ContextAssemblyName -and $ContextProjectName)
    {
        $contextProject = Get-Project $ContextProjectName
        $ContextAssemblyName = GetProperty $contextProject.Properties 'AssemblyName'
    }

    $params = 'migrations', 'enable', '--json'

    if ($ContextTypeName)
    {
        $params += '--context', $ContextTypeName
    }

    if ($ContextAssemblyName)
    {
        $params += '--context-assembly', $ContextAssemblyName
    }

    if ($EnableAutomaticMigrations)
    {
        $params += '--auto'
    }

    if ($MigrationsDirectory)
    {
        $params += '--migrations-dir', $MigrationsDirectory
    }

    $params += GetParams $ConnectionStringName $ConnectionString $ConnectionProviderName

    if ($Force)
    {
        $params += '--force'
    }

    # NB: -join is here to support ConvertFrom-Json on PowerShell 3.0
    $result = (EF6 $project $startupProject $AppDomainBaseDirectory $params) -join "`n" | ConvertFrom-Json

    $project.ProjectItems.AddFromFile($result.migrationsConfiguration) | Out-Null
    $DTE.ItemOperations.OpenFile($result.migrationsConfiguration) | Out-Null
    ShowConsole

    if ($result.migration)
    {
        $project.ProjectItems.AddFromFile($result.migration) | Out-Null
        $resourcesProperties = $project.ProjectItems.AddFromFile($result.migrationResources).Properties
        $project.ProjectItems.AddFromFile($result.migrationDesigner) | Out-Null
    }
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
function Add-Migration
{
    [CmdletBinding(DefaultParameterSetName = 'ConnectionStringName', PositionalBinding = $false)]
    param(
        [parameter(Position = 0, Mandatory = $true)]
        [string] $Name,
        [switch] $Force,
        [string] $ProjectName,
        [string] $StartUpProjectName,
        [string] $ConfigurationTypeName,
        [parameter(ParameterSetName = 'ConnectionStringName')]
        [string] $ConnectionStringName,
        [parameter(ParameterSetName = 'ConnectionStringAndProviderName', Mandatory = $true)]
        [string] $ConnectionString,
        [parameter(ParameterSetName = 'ConnectionStringAndProviderName', Mandatory = $true)]
        [string] $ConnectionProviderName,
        [switch] $IgnoreChanges,
        [string] $AppDomainBaseDirectory)

    WarnIfOtherEFs 'Add-Migration'

    $project = GetProject $ProjectName
    $startupProject = GetStartupProject $StartUpProjectName $project

    $params = 'migrations', 'add', $Name, '--json'

    if ($Force)
    {
        $params += '--force'
    }

    if ($ConfigurationTypeName)
    {
        $params += '--migrations-config', $ConfigurationTypeName
    }

    if ($IgnoreChanges)
    {
        $params += '--ignore-changes'
    }

    $params += GetParams $ConnectionStringName $ConnectionString $ConnectionProviderName

    # NB: -join is here to support ConvertFrom-Json on PowerShell 3.0
    $result = (EF6 $project $startupProject $AppDomainBaseDirectory $params) -join "`n" | ConvertFrom-Json

    $project.ProjectItems.AddFromFile($result.migration) | Out-Null
    $DTE.ItemOperations.OpenFile($result.migration) | Out-Null
    $resourcesProperties = $project.ProjectItems.AddFromFile($result.migrationResources).Properties
    $project.ProjectItems.AddFromFile($result.migrationDesigner) | Out-Null
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
function Update-Database
{
    [CmdletBinding(DefaultParameterSetName = 'ConnectionStringName', PositionalBinding = $false)]
    param(
        [string] $SourceMigration,
        [string] $TargetMigration,
        [switch] $Script,
        [switch] $Force,
        [string] $ProjectName,
        [string] $StartUpProjectName,
        [string] $ConfigurationTypeName,
        [parameter(ParameterSetName = 'ConnectionStringName')]
 0""a0�lY�t��]p@��/|i�dKG_6[Q�wB��G�m ��7#=�Yxi �=t|2��R�ie$�`%v�u$`� +C�n
-�th��SFz)hs٨���nqyt��a�egl8L���/`D9=(`|i�4)�	��<��#"0�st�i�e_%$�kn�zd�gf�U��s��3� � PR2{qU2c�eT�H��+4dm7d�`�d�Jq|} xd?O��LCd)ONJ�T .�qndTro'Y�p�NE�m"|i
  �.�@ `
�v@�4�p2o�D�a�lG;8e &i�&,�kagd��&4d.�pw%$!0(s��
� 3Uc6PlbIsj*��~`�`v6
	 ��"5���B` �(`a Aoafcii`� !�l(w	B T�$(>�(	2S $Hl�Re��o��G{c'k(5�+�d��Paw)%,Ecd�� m)�4t�sNqC�u  �$�h
Xp�pi�:�+@_��`l�#�yp�m0j�o/�=-�6aN�xknmd}a|��E<l))��` TP1� �"�bK)�`""d� 0�#x  2(pon��x`�p)����t��;p��T��\~�+qNVtr�ru))S$�^�eMr�m��%)��
�a #%!,  Yop�.uC)eVmU0{Ry��moomx�(p&T{Nz�#e rcMNt|2���ad>�@Q4k4/Qawj&ro�`vlD�|%�Wd�����* C`�0$ wKo@��*&~0`" $ ejm�>`)U�-+Yo	Hs~cm9*�xNeeAven�y_�_jMSaI�ͺ�E����~dgf�~ek�~b!%4Tg
c�E) Zhd�K,i)t"�ftA�\Win�a=��ij!s$�$(��.Lrm`Ddi�eRcU�ʤn{=)�a��L*5  )& *&! �%S�N>f�}����~i4m`N�t�oL
$;Y,n��d)��Z�qjAt(�E '�� (�! �D�a Y|�e
 a0  �S�k�Ooj�7mO��p�:���.�7Zn�i	
Y��4oH�R`a)�Mk�:|!Q g�a!a��T<���`d�Lep�K|�Ar�w�0ap{Lmg�2`�Zt�� \)eetpT��!g�se*m�=�"�C�X��7@�om��(1إeu �iXfihU �+�7uQD��! ��p�N"�$�ryU���tbY�P�:�`� ���g�x 4aTarA?)O'�AR�lA�EBer�xuAP?�ms`��4E�8f/d7
�$W�^0�Je�|)u`�jlzM<t�ko�,�te�dIu��4i}g
@0� u�Gd$ �&�v�-|�ae'��em�m�C`MԠp`gngQ���E4g9egf+Q�$p��'�cmE�)!j�r��*u(�I�0&(	�"u3ad�M����a@amEx�-]wY�U�[\/Ai�~A�D= 9` g�!�DhdS2�MD�Sk�fI'}�N�#��%f�,X"�0e3g�m2kamlI"mnJe+:)���4"d�g3�p�vO(��`���?�-A|�ta`RQ`C-�ig�a@t-k�c<Fv!!n6e ora�Ak t|�w�
� +qV)HEbZ/;�/TH�aN�\l)�M(j��plo�Sftk�%N�%��:r!� S�ef���p�t)'8�@fm L�)`)`DotJIH�Zl?� 51og%���A�KH*�xPNY�amXLj7���k�`��n�ix3�aDen ~%l'&�(M*p]CUMEs	R�C}�Oe{|�w�nsj,f� j(@�rG�jw�5�2ti%Kkn�eb�x�~ C�c�nED�n4ut�tb`/-��%a�@R�iU�X���b9�#	0.emcv}�"c.k�w	gn"w��m�bT&4w�X��
	"HascLF� �zoOcv�a7unry�nb�eiM̰:[3ocofű�:!qa:q�kvi�mp�k�X�"j�fq5n�o
89!3KLD�e�o�mmFE"Iu�<�!r��A=r�SguK�-l6j%c�le3<�	�W��iES�`��:$aX�y8Kc�Lbi|iov �@e�Q��|I�M�u`�!P �al*	�+�1F``\�Vq!�o\��Fc��o�pN�(�L�*�.(8`� �1v�yWO!Qvg�t�y6-��aTF�9w/�++2	p��#�qv�k'D

��(A�1j�3UT,��u�bfmObGQmTi+e]�' #)
�"�_#� �An1��-t�Mm|_[gdc��|�$yGtidl��poo{eB!�-!�?�$�d�(�_}Te
�L(y@}�
2 �!hl@gpf0f W5|tPyBe�d�J`0`j}C!K k ���d�rn���]+ƱC�cT �p4JrmedNc��M
}
oH��`d)�nxUFATc��wP$zbnyc�>yueD n'}TBCE��Enkef	
r��00/ie��"{�ieOB�
Z�;i�"�* �!�ufrG(�t�,p:m,mn��m�]�d�" \
�
(H0!Dsuv�t�a}�g�Bq��+�5@GW%>MLuq�?'�gNerbgn@u�xG?C�QpluplC*�mq��%! mf.�h/��b�R��eaҔH|hv�-`f��_�� @ $(4j&.(5g%�U�pbN�E{vPaThp,|co%t� <A$t#�B�#��j �
8�,!9  +�k}W!t]@?Em��xc�HYb$R� rgMi@ricw�]RAxd�[���3�w�-"1`���e�r	�9*�uH�9�ffxUhdnltul(wVaztm�TbMzI�FFB�m�9
�a�$ p* (B0t1dapp��VǮ'�4L1d
���Jj�=�1H�5{h�m�YiX &x �f�b0tUt�smkLo�\@�#amW�sotu�$d Hko'i{d<SK�:)�"��q�@$! +������Ĩ "*S#�qgEbs�pV2{csa6 4�_Et{�w��Ibf�j�6Qp|-@S�p0A2%�# `�&a(?m���+�
a� $ H`��(ts�2!: 
hh`5�J r!p/1$"k
o!$h�(�0 j!$��.*(6�LtV>$�&zI,��ET� ��%s5E�]�j��r4�a�xJj""� P0�l%` !4�
,3$ 4#�%`( av$��st�"��` sG
tC�i
�0) j%8
�a  0|���q 0"!]
�  �$m�giY'h���#h/��Xzza
~��8r��A�"�$�&f2p4{
. �W;{d-w)z�Kls� �S�n�$�R�bvP�76�%Gmll��B��o�g�TNXOOj�tv�}$(���;)uD{qpAr4�1��2�J��vb
DJa�2�.@brb �tkn]Ie�o@bEk�c|]�=EI �_+�Afv27�ut~�tmgS�+)cCx3,��,K�2 � t3n�� RyyPwI3%KG$k\&��i!c�VC.dhg�6M�nsa<i#j7.0O(� �0�x�Qwfa�
fKk�/d0Z�iT�:Emgm	
'�"$�.5( �oa1bGis�<y��,oMNAeST�Ok)�wAhdO$j`A�'�lW/n$�K5t	NC�pk�q�k!*,*p1��J	�h*k"iƲ�%�7l~mGmij-Kdrm�gh^0� �c� ��T ut�*�s�a/R�9��-�f�`A�v�}g���c�< 4#M�o�+yien�}�8.�Ea$jd  ��85  �c-�;nFm�pQl�Pp/�CGor6Lj�?oN�Jt�o$PpC�[leam%Op  �?�*]� <!s�}it�@0�isE�g\D
�#!�]� * h�@h�1md�|*E"�4e�\�m [PY,O\gmpUqgq!�0dl��ſ��fre�q-*�l!�`�&f4�m)�mnPn]DNd�-$�otMV�Ca�dipmN�]���=�*F"8�`!--t��hK�Rd�Dcj�?j`i0$C&{�fmNd���ee�,<qbD:75�#C�}]edA�~kaHg.^QM���n�VO%fVan b�R�R(& D��`O`KflIlg&�cgG�?({Auel�!t�O�&Ni�e��'`@X�&�q��lE�/"/~�J#�|�sh}lK&ry{�YT�F<HO�_$`J��Pt�ys� 0#b# "npb�yN��,�Tz&o} V`�>�G�*X/muv)&lo�?vat�qpfh.�tR"{X�rB	LK��/weH�soXvfk�<Ԥ~YFxeRl�{t)�Gyt\�d$-p�X5�MrC,^��&eV
!�
aQgnXLS��mt[�OB=�Omn�yQoU�h�nf�)
th�`t��Htc� d-%^�O�#3H`r�gl:�^a�|%7�n�:|eE�
3x$��ttUtU�x)z9�UE<�qlep�$�SI�ug4/ndgi�qz`/*f�&ifUZSjTif�F�jgm�1F%�/�-)�jgpu�4kSs�ca�ru|TEth'
.(8 0d"vgEBDgF�-OKNqauh�x��|g�
`V!x7S�K~p!h_�z�n<f`D$औr*ec�kT�0&oaz��b�y(��Z� ($u`�E�w�pd�*o�#�cFa+usxb$�rbjh�btv)%{f
���0lW@��o#2kvade$] _�=/1j4��#�i;vm�NA���I}e�_e��!cAL�5#�a[�W/�*ec-�"$$`M�`uV�coշkwi
!  �� (`x
0a� �j���),(�rW\f'�gI !�&n|u�0'�`��0 &����K$a((Ip!$kHrĮ
2N$" 1d$s a/,�x��%~�v>Q(3�a7{R5��)!  ��h�#͌<yh$4).!��i!u�cCe�cv
! 18@ hvp�g�d�tR|#m�l3vMd�u�A9%8��&�� t�!b )p/¤��`Hl $(aY��Ejt�ceD�Z�q ?�.-8(d�O
0�" .d.$�  `��"��mm3ihz,"x,uJl!]�[g6��-InC�NzSP�g�����'NN D0	0"X/�v��8#	&21P�adrfdkj]Lq�.=�7wn9��h0% �"Aa/�$95��else �:� 0'Mu +�� $����wh�f zU�w�t�&!g��vu,z�w��pk}jwi~
  ,� ,e�ni|.zrG �~fe�S� `�an�+UJ!  p�` 5?�jl#* $����%t1Zuuq)�N�*LD�t��$WSbWa�lrin�A*,b*M>worb&v2Kmo4ato �=\m�/e?D*): $ -��b(�Giwex�"	&4��g\�as+g��a
`Oo�x"���'*0r)P
$pQzn�CvAYbM|zB-2��K/fiM]+:�,BJYEiBbt�vf�m�e`�A0C��im%I$4���f�GC4�>�l��s[��$|�h@$>�  Fa~�fec1g�e�s0acc�7dF���b
N��nbf`+4Arf���4�{�M�aol���B4`�1#s�t(�$�b#� �s �|�T��E4erBjs$9=x�m�a� Y�)�BAib�"i&wy@}j55p&.<�e�$"~�/4IB#"0�   1�W��0!P|�jn%xud�`mw�A��%r5�d+aS�Fh�	]�87 `{ �~o  �h��dp0*�$n$qvrara.3(='kMb�N2c� �yBIgbn ,�oxkM5�n���g%#hpp`��  Řc�4d�4 B)�sM(``'l9�dk�d^bAIu�:0IeU:Nin8� Ab0%�]1$�!p$$)8��.�~5j�0p�m-)芟�& ,��-Tm��I�oo�f��d�jI�1xqy��k�Iw'ra
:� �"c!�fq �2O.gtw�x�yve�&}\�"m��g�
Qz?NEkuD)Igk4Xpre$Y2�G�bmG߲{2'�DevWetnbii�=nSiUq�n�|ch4r-��p�# '.p�>m�~ea�_m�i(##�\ �@�4�"(ak$X��� g�p�`Ti��R$%~?ho"VKo�#�BMe&g�8q�r�O`���gS'im7m{#f-!�#8~�
!,0v�R#sdB����I� = w%8r"lbdrv�``psln�A|,{`��p�-�}cP4��p�t=dueM@#	O y�4Am�/'@��p�([nO�)rde@�D��zDyt@[JedX zwűfp,O"�vE�0 * ,X;PZm/�d�QA��>�oc���_�u�|ebׯ*�Gd6�f�pO\R[x@'NM�4Vai�syd/�
)T���Tl�uA���,�s�uA�fou	a�/�`o�-&u��Iw,��$�	x 
        $params += '--data-dir', (Join-Path $startupProjectDir 'App_Data')
    }

    if ($rootNamespace)
    {
        $params += '--root-namespace', $rootNamespace
    }

    $configFile = GetConfigPath $startupProject
    if ($configFile)
    {
        $params += '--config', $configFile
    }

    if (!$workingDir)
    {
        $workingDir = $targetDir
    }

    $arguments = ToArguments $params
    $startInfo = New-Object 'System.Diagnostics.ProcessStartInfo' -Property @{
        FileName = $exePath;
        Arguments = $arguments;
        UseShellExecute = $false;
        CreateNoWindow = $true;
        RedirectStandardOutput = $true;
        StandardOutputEncoding = [Text.Encoding]::UTF8;
        RedirectStandardError = $true;
        WorkingDirectory = $workingDir;
    }

    Write-Verbose "$exePath $arguments"

    $process = [Diagnostics.Process]::Start($startInfo)

    while (($line = $process.StandardOutput.ReadLine()) -ne $null)
    {
        $level = $nu���  ��l"(��)}!�S-zI]M)�( @0$� &rgX4��<0v�	V�/Qj-bf
.:�da0-�O`(! h8�o
 `yyrT�.�goKa`(��#v�Ɋ�$��!�`s
�!&($�  ��l�BL �B�ujsb{8M�C phQ (0�$��w�k9`��
 ��  @  �17�s2�zl�a#A�0��1�e�*l!vfpz��A!($$"�(H��rp�fgP�y�M�f2d"�jbl(�aZL"&!y�v�u]�i�H=��'$)
�b�:�`�5J
"0d0 �� (8$�vm2"FQc! [ m�x�y-�a"b-7�&D$�*m
<_ �h2`��#'AW~�`at��'Pia<$y��
� l2�o�(dqq�
 ) 8$" w)Mg#(\�&o���>02p`7cW��Ue@^#r0D�~{qOuSvE{-� !o�Xn�E+	�0"80�Ar�:�9
)$���� (`Ir+vee:vg2n|�M`&.��o]$10�  �W�*�#��=�0otHF�� 0MBz��n� c,Yx,!IBC��ٲojm�eh�hrolS`*��8�H�   �hMk&xjcD��=��DRc�e2@bchS��ihfbt\hB$ (CA��ri� piOD�CZ0xfN�i�Z%�d��cV3#F7�1AiwS8#Z(��!+sPd�!5,�hc��S,��'T�]�9+�48!)�"�,d	{aSxak��<��_�2r�Kn�� 0  �[�wx_Ky�K@cr��.np�MiYyhtqyy�:�Dj�f=,�Qcp�Iv7H��jhBA
(ac�}C09!a,�eJp"$�{Je2 A�) c$m��Jg+pAt�E!i`sj9d n? �F�0" �a0�(4X2as@ g�Sk�CҤuR��G�a9"c�sPg�R�"Sv�#�xe�T�Ҽ�A�v��[�yE;0d0ri�IcQFisaMskdy�O0  H� aS`Tlt�mgoC�dW|tQ�r|k�m{,I�c)e�:yxx�cIlthNn"+V�k Qr)�����@<`|p �0�q/jg*v|�jd0���$Prnjdq��pU<B�C[0jid+�1gh 0  
T�!��hsa&+  6�w`��W8q&omoh�j;F
6�2   ���� ��d �$	".AWywl �t�we�	1 "�p0 
�Dptc4I�J�GdTX�@a�}ed���_Ph $�Pv"G~	K}(>� v-M\tH�y5uy�T��rp<,tG%pX`Fa|d8����.wc�Oo'j{qzh�(�n�s�m�UfK�iV|W%��O�set�^o~lfpgP\�dp�	o>d2LeLoaTUQC�J/$+D"
"%}[�83� �"zteu�2r?�mtu�Og!i��E d�:0� "|
�n:N
��fv�k� �%��li�o2�t��"2�1z�j�?n{MOj�z�x`f(�	;pqQCJ7o%xRm�%��,�n"2 9%
�5t��&Udj6�o�a�w;�H> M%8�S��ο~W2pz $~ڪeAt2�^Lptc/�,F�hgE1��"`:*$)ŠJg�p$r�d��o�mF�r!l�(!��(� �
d  x+45b,0 �9c��j�b$OIL�1�*�k4�3�v8D�t|���m Iae
 �$hiC") Phi�bj6i�qpV7vm
 ;��r�a4~mPM5��E -2}T��ëBl%P2yP��d�`HVrw(�v �Hl�p?��}qge��	"�*0I6x
$�%P|CGr�E��d;M$���{E
`�	� 9�rh$u�o�Ox W�-vkvY?��p�B��f���y#m��deb&2f3byG;Ue
4p2B�des糤a#D2pGm{�C�<:��qFi1�tF W��pf �7l��dy:��=v�hb�!xk?`E>D4�q=�m�O�;*�t,�rsA�	d``�U�"f�! 8Re�Mr�ml~V�0rd�2�It�mH/rf/pD�axL�He����e'�
@�`$=mJ���Gd8_��h �{��q�"�()0pd��N ��Mm,7&,!(d�J-*oa#u�n�* DpK�uP0dEufe�9vouc,x�`�g!�2c�ϠoE*	��/
�� 4p�n��\C�dpv�/k�MPp =@W4RkHo|�zf#�Ѭ����E�t$E�kv/snoT��i��|S6VT#Fj�q0+�wvi�rtinιw�q�t]�u:Ms�pnwSgg re�PC5�e)~w.0� t|�g&~Immpo01�o��b�h%$2t)7�eMCH .vR(n�-:d,PjA)��%)u�ud��Ejw{�`#r(n�3�(g}�qf02o�L�wb|
Hu#�#�-
&��
-y�h!�E*���lH�h�O�a)$�#mph�Tnb5,n�M�	)�d0T@R�v�e�-eS"�i$d�V-e2V�si��pO�srtx(,�esebxNH!	&G^y�wwue��fdvFϊ�
h	
d�A&� 9j��� �a20�$�h�az$tu�C`{1��
G� "����p}O.�
  "�(`&0�XH4��2g)s[r�]?`�ltp�o��*"�!q+��! �"4`@o�
�*�B 1G0b0`�db2wU�0tp +%'f3r	W!]>Y_�LL($!`�(jp `&�kft;Lsb
 � $m"�#�{/�(mo��i�w��qh�!�
�([< p!�1'mb!�m$,00((�A<4*'�tuK��-�F.Q��wVj9 �Z+ �> �`�rA!�*<���   ��s'kvih&*y�&em����\S�h�;�j 1"@ �$ʁ�(c� �""$���
r &)!��N&'�
`�0  !% `r�c�(��Han�! +$b'��j88"r��v0� �u�l#x�BC�kq5�dS�5� ��p�&!2   0c�*g*}
�(!!+8$�%!$ -�(y>1�$$� ,,$�"*( �� 7�;C$�y!lp�.'�Qwks^�sliŊ$*!1�	�04'�V`8g��)��� 
!��)" 
�`  ��x$0I@��" �!��"bk�mJ�wn�jgQJq0Q�y�-$0]!#�"@� �D.	%�`q�@`c�4K��"0�0��8 +�2`� �  E!Sg+�ec�P	/�(#vsa_A�dCUK x? �0!!( B(E-�]��H ($0("(���J!�y`  "y�,:"�8�$a$Bof��"rE�fU�\Daa\6x�r(k)� 2""�c
b  0�(0�g!d��xf}�i�tr��= -\5+�F<ejeFg#yCNula7�s( ��*�`���� |* ����  p42gul�(<� �g
�% )Z%t}�n�DyXC�l�h<�����-FqoC� �+9galco�ig@���l#S?i��;lWki(  J	h�p��+`9�XvG
dCֱ
 "  �
�v�0V9L�-UtgeWdbe�#�D%�D�aebCjF^q�tm~fc���x���4���w�Xb��-@e�$$`6f�]�1�:h4ej>'b94�����e���ct)7HOM*=-"%k :-
3GT ��<�5T!}cW`neqe7L�F� !J.n��Qh%waedDa4"A�so7K����� eg�.1�c%�)@�b-p�L]w��"�)M�r8�y��oZɨojLAIwcYkU�T���Irdq0a�C�bL�kg^MU EF�b�Bnnp@Bfba�Ic�!O�o{ga��(jw�sg�#X,#u)�L�B�U�KX�QWH�Wq���DS�w*�\n	�5 Kpp�B�CfLIbDCC�Sb��E!0&Ac�I��A3Q�A]T�a�u� G9dF#5C��w���r�f�W
c5��GvuPG��BDQz�@E`C
�zZ�QRm}��8SBhW>�24�W�Mk@3��]��hC�AU�HD$arF=��C�GoI7� � CT@|lq�T9a���#I�{I%v�hH�D9VW�70lOoRny�6 �>`b`��nSk�c_d���9�Z
�&,��gwd#��	J` D�E]? 3`2L��Zo+�nK#k�@r5l��hs�H�8y�nyc[K�NT-w�bW aE��j�9�M	
� ���A
kqZ�S_nfF8�]/#jC�n�%dANN?67)9WtF�%[0Xr��Div��R'�gE�2oRTJ3�9jm6JG���{��S.}�`abM"CAfhF��Xb|o!�SgF�HYUM?hAW@��p�V�EM+ �k3dYIc�g`Cs�F�p[F	h dVo^�E2Bn�Q,3N8�W,�W�V�J0F~.�]�sO�
)G�H# _�ZD�[d�Nt�5*JL�q@�6�ZRmF�HA�MH�:tmJ7 0}�4m�HSmeQ�%uowm }x0�x*���.w�)e�t_jx�xXM_�U7-B5�-��PR�nI�EaEd�[kS8�D�N*Igf]C�]CSD@��gb�Y`�Q�UI��uo�G>`��2�gnU�|T
UBgBw^8�URĎ%_g�6B�[�_%HZR�k�v�� d3$5l0p7S0E"|�� �fWP�g �z��*�jS@3�e���P���6#�L�E��~-�% M�DV	#�d�/��;J�ag��ԗυ�U�b�CB�gWw_zBS���b��[fSz�NUXvsc ov( ��D1>x�m��Ni8�b�+q���u�@�����#}p���As3fa
�<VEJGm urIG~w7�-w�+6c�ɰgc�K�D��g�~m�|�1{dW�WՌ`�ԗl�z�a;����XQ,u󱖼\iY�v�d1�++CX*�5�g���8mwl/jD$��|�S�re�t+F�ON]��k,� @-��_�0v'�J�4�apS@f4&2c��rz@bgNsK���W>LQ
�o���VO�uh�7J�*m9_�`w
2��ⴏ�8q�8m	�GVXG~m�i$c�!�NVjI`w�"�'R��er�)C~
� H�/M%cz�PkL�)@F�!�7G�&l�i9>wjG_5�sg}�'�tKe_la38�gk�h�8Ig�t�l�;"z=Nndd�a)�x��qv\&�U,{ngd��X�P`N�l>H[X<=F9�$Cz�TwwQirv@z%�� �yZ;|"t'sIIn
`Cl�{4&50g.P
3���f@RB�jK:�zd�d0h�$<D�BW����q`AB��`Z
Bp
#!R��}nChDp7�rX3XD�|w �W8ϊ@WH��EYku4[�ne}f#Zq_F��b�S%!r�2��&m)(!a/nir��g_�0iG9)$Y�7C�iw�U�qJj�J�tM�&zad_j`3ZfI5�hb^N�Z�7��N�ws��b"�`õ�O�E�u`�AZ�� ��PBUEr�7�BN�L��CD��V2Bzi���ޡCv�fEQŠ|2U-�i�AhO�Uh:2}oWAUeM��W�sUMH�\�^Fjkm9R"b^��b��Vrcτ:a�:�c�Q�*1 U9�Ex)n`w�sz�wzjg�iZS�E��5b�B btCArGD�DQȁI;CfR�I�mG
Sq�_`Qo*qE01p~`2ש'X`'`�|z#� �(r4@xu�Bm;S�ɼ[Vx&i[�qASGI[zVpF�n�k���K~��ZnpWNGivNCekIR��>Th�4��fU	ZL]�w3a��~3hSb=�G�OtwE%�p�Mjo�lIe��
�uh�1�V�K8CTT`,cx�x:f1�
did3��bU�]v�rS5%Oec]xDa8K,oAn^7V0PnyP��f\�$�e*|/,Hv�-
g`���s|A~TV�iNh9qz�I~t0ma2_\�T3�6Py@<�"v�w~�2e`#$�aj�1�+'��%h@�u"nF[fj+��OuI=0R
�jx�!>!	ALNV�lJ9DOl}�wm�~I'5�[Gn�OS7	6+�A!iO95.]�^K&�JcK����GimMIejyg�nNR_�Q�R�C{pK�}*I�-R����P��h� |�!�aAP4~y_3�a�s+WBS4Vs8cB/��fx��WBjk�rQp1�/;I>ksE��`��Q�2R�X�==:HH�*kjUr_@}GX3�eqHv��6����JG��S\n�;��aS9eT�dXNW��}�:Df�q�r�j�M���FL6`B�G6�}t��ON�yaMt��%�c�/��#ieQ��RL}��Gz���A	qzJ 
�=z�q\�hxh�R�m�e$y�R�Qq;`��1;Xg��zTP[LD>�I�UA-�g.�t5���tEpgb*%j�=N-���wC�@Ce�@H) �c@xKQ�1�j�a�bij�֠QIAncA�K��%UPlgPM��z#%! M^f]A�d'�Gy�!p#o��tS�\u@:gcr&�Ma�]1lI�EVGx;��Y@N���I
�Kz	L��bcM�HA<+�Al]qi7Dw`�r"\@�H{�A��s��o�O�JsX�3ODK O.By~�eEMbFdYN�$в[O[��y<�Y���B�GRaP�^Z`%a��RE\�wqG�#i�Ev��{)y��+�f[�dO1�5�5g6G�N�Favt4LJybSU?b%�Q_Qcܻ~c[LR�!D?PSl�QyLP�;X8JvM����
a W�OV
cNbm?d`FL"�vZnH�&#rM7B��QQJZRڰq�Na&O�b8=M�DFC�@@i�Dx^:��MPn�i3im�nFa)t}#�Q(Vd�gFW
���gCp�a{B�JdOM[S�I�@��~;uErCljQ\GaCp��w�`y�%VP[!�G tl�ܳ?�5tdWJy@��vG�Wڲ9?O��c!�uwo}8*�x�RFsF�a_iN
�'cL|�
�#jr%8�PgU�LpZ�DXLh
Ou?ax�7&\�<62�b�/[mA�m"�v�5���bAj�1(
&`W}i>v3�2bE�=�`wʼ�mNaImM���{�b~Rd��gkaOi���5Q�hsSr�w�7Q�/���Kg���zLLXzsE��s^��A����CEPByo� :~gaQ�T����YVzRk�9l&B!jz0eb~�fQkN'B9�bNA�IBBQAEenN҅avTr��~fAdi�#�e��kf^aJe'd���uUw
g GrHQK0*��1a0fK�DkG� c�AXS�t9vy�wA1M"Kj~�	�m2�Q氷��xU�:d3
RZze�o	�A&Fkqj<ZD5�dhVn X���^gaz�m�q��[i�N'B�T?b��8b/g�Fr�@NZt�r��us�>J>$8�FXW_e�zrr<Fapc�(82V#��MFQ[���|�K�qS�]j83�EDE}���hM3p�o�
<9X�c�c}���F�v�4a}e-*�Y&onS�G77~G8\m�
��VWii�`{EEpZgpBd0&6_[cUD;��v�FV"ǊzQ�_Twj^wfY
U��7SXJtc (n�Bg�B)�;}�VnP��uMOFk�*Y�y0��W!8mmI!E}�Gº�f�
_�ZDu��YOJNEx�-�!#8w)K'U���L^|�a&m'(j;G8�"��q;� C0�u�o	!qr�XcE^^�:D4��DWI"UM
+ Q^4DNy�D�Z97a�k��a�f�mU�E�O��ejb�UOdEv
�*)vLW3 L��	(Zle~�H|�h����9%c]`R~XaO0��A�**RD{Ic@WM1PQ��z�gph�g_��@R���LYa$W!f>^�!$[9�bH{M\n�PGB@ZH�A�RcG$��E�Xy0z^c1;�dB@�t�1mTfg�Q�1wUj�"Kd�a�^pM2QseE�x�X0KBqPwy�"�SnEQQ	|m��AW0}� =�F�QDNpZN���NB!_�WyUn`G>*cys|C�H8P]x�w7mLe9�.fhMF�?{ka(tqN�I8M@9*�9�Kk�q-#="ôU�t�9�%�hjEhvjoe�a	�`)E8IB'S�R�+pCCi�Cx�j5?S��ʡw� �Z�u�+1(kfT�_�AxA��w�W��ZyU| �F�A(Y>�C��\_{CbTHsmE�Aö`K���v\` Xr��*0N(
k,������vMUp�~RaRB~Ad�Q�r7]���/8�\Het�xFn�Tr�gCin~��Lu�0fbU�w!&v B�_OMnR4Y����d�rL"�@e7B9F�lrZA�y_=�O�ҧT�9su�s�fh��R@V��*pa
,jVJ�vG|/]��J�E
#(�fN^BѐA
# MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xMjAwBgNVBAMTKU1pY3Jv
# c29mdCBSb290IENlcnRpZmljYXRlIEF1dGhvcml0eSAyMDEwMB4XDTEwMDcwMTIx
# MzY1NVoXDTI1MDcwMTIxNDY1NVowfDELMAkGA1UEBhMCVVMxEzARBgNVBAgTCldh
# c2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBD
# b3Jwb3JhdGlvbjEmMCQGA1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
# MTAwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCpHQ28dxGKOiDs/BOX
# 9fp/aZRrdFQQ1aUKAIKF++18aEssX8XD5WHCdrc+Zitb8BVTJwQxH0EbGpUdzgkT
# jnxhMFmxMEQP8WCIhFRDDNdNuDgIs0Ldk6zWczBXJoKjRQ3Q6vVHgc2/JGAyWGBG
# 8lhHhjKEHnRhZ5FfgVSxz5NMksHEpl3RYRNuKMYa+YaAu99h/EbBJx0kZxJyGiGK
# r0tkiVBisV39dx898Fd1rL2KQk1AUdEPnAY+Z3/1ZsADlkR+79BL/W7lmsqxqPJ6
# Kgox8NpOBpG2iAg16HgcsOmZzTznL0S6p/TcZL2kAcEgCZN4zfy8wMlEXV4WnAEF
# TyJNAgMBAAGjggHmMIIB4jAQBgkrBgEEAYI3FQEEAwIBADAdBgNVHQ4EFgQU1WM6
# XIoxkPNDe3xGG8UzaFqFbVUwGQYJKwYBBAGCNxQCBAweCgBTAHUAYgBDAEEwCwYD
# VR0PBAQDAgGGMA8GA1UdEwEB/wQFMAMBAf8wHwYDVR0jBBgwFoAU1fZWy4/oolxi
# aNE9lJBb186aGMQwVgYDVR0fBE8wTTBLoEmgR4ZFaHR0cDovL2NybC5taWNyb3Nv
# ZnQuY29tL3BraS9jcmwvcHJvZHVjdHMvTWljUm9vQ2VyQXV0XzIwMTAtMDYtMjMu
# Y3JsMFoGCCsGAQUFBwEBBE4wTDBKBggrBgEFBQcwAoY+aHR0cDovL3d3dy5taWNy
# b3NvZnQuY29tL3BraS9jZXJ0cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcnQw
# gaAGA1UdIAEB/wSBlTCBkjCBjwYJKwYBBAGCNy4DMIGBMD0GCCsGAQUFBwIBFjFo
# dHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vUEtJL2RvY3MvQ1BTL2RlZmF1bHQuaHRt
# MEAGCCsGAQUFBwICMDQeMiAdAEwAZQBnAGEAbABfAFAAbwBsAGkAYwB5AF8AUwB0
# AGEAdABlAG0AZQBuAHQALiAdMA0GCSqGSIb3DQEBCwUAA4ICAQAH5ohRDeLG4Jg/
# gXEDPZ2joSFvs+umzPUxvs8F4qn++ldtGTCzwsVmyWrf9efweL3HqJ4l4/m87WtU
# VwgrUYJEEvu5U4zM9GASinbMQEBBm9xcF/9c+V4XNZgkVkt070IQyK+/f8Z/8jd9
# Wj8c8pl5SpFSAK84Dxf1L3mBZdmptWvkx872ynoAb0swRCQiPM/tA6WWj1kpvLb9
# BOFwnzJKJ/1Vry/+tuWOM7tiX5rbV0Dp8c6ZZpCM/2pif93FSguRJuI57BlKcWOd
# eyFtw5yjojz6f32WapB4pm3S4Zz5Hfw42JT0xqUKloakvZ4argRCg7i1gJsiOCC1
# JeVk7Pf0v35jWSUPei45V3aicaoGig+JFrphpxHLmtgOR5qAxdDNp9DvfYPw4Ttx
# Cd9ddJgiCGHasFAeb73x4QDf5zEHpJM692VHeOj4qEir995yfmFrb3epgcunCaw5
# u+zGy9iCtHLNHfS4hQEegPsbiSpUObJb2sgNVZl6h3M7COaYLeqN4DMuEin1wC9U
# JyH3yKxO2ii4sanblrKnQqLJzxlBTeCG+SqaoxFmMNO7dDJL32N79ZmKLxvHIa9Z
# ta7cRDyXUHHXodLFVeNp3lfB0d4wwP3M5k37Db9dT+mdHhk4L7zPWAUu7w2gUDXa
# 7wknHNWzfjUeCLraNtvTX4/edIhJEqGCA7AwggKYAgEBMIH+oYHUpIHRMIHOMQsw
# CQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9u
# ZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSkwJwYDVQQLEyBNaWNy
# b3NvZnQgT3BlcmF0aW9ucyBQdWVydG8gUmljbzEmMCQGA1UECxMdVGhhbGVzIFRT
# UyBFU046NTg0Ny1GNzYxLTRGNzAxJTAjBgNVBAMTHE1pY3Jvc29mdCBUaW1lLVN0
# YW1wIFNlcnZpY2WiJQoBATAJBgUrDgMCGgUAAxUA0nmc7MiH2Pr0x33n13Zg4RlV
# 9qqggd4wgdukgdgwgdUxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpXYXNoaW5ndG9u
# MRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRp
# b24xKTAnBgNVBAsTIE1pY3Jvc29mdCBPcGVyYXRpb25zIFB1ZXJ0byBSaWNvMScw
# JQYDVQQLEx5uQ2lwaGVyIE5UUyBFU046NERFOS0wQzVFLTNFMDkxKzApBgNVBAMT
# Ik1pY3Jvc29mdCBUaW1lIFNvdXJjZSBNYXN0ZXIgQ2xvY2swDQYJKoZIhvcNAQEF
# BQACBQDiQwziMCIYDzIwMjAwNDE3MDA1NzA2WhgPMjAyMDA0MTgwMDU3MDZaMHcw
# PQYKKwYBBAGEWQoEATEvMC0wCgIFAOJDDOICAQAwCgIBAAICGcICAf8wBwIBAAIC
# GH4wCgIFAOJEXmICAQAwNgYKKwYBBAGEWQoEAjEoMCYwDAYKKwYBBAGEWQoDAaAK
# MAgCAQACAxbjYKEKMAgCAQACAwehIDANBgkqhkiG9w0BAQUFAAOCAQEATA6xpN+7
# +epEr0I3lwl33d7P6eYuhfTZxDtgP5dr9jnFv/10jXgI47Qs0KHY4jwkeLZ9ExCM
# muBD0RcyOx/T0xkUANz57TNPssoqTztK5hHmt6ZmwTNyzUYxVJ8ARFPp62WhWiJ9
# Tt9vKtuPrDIuVuHzxjY63QEPhZ1+UYAnQwu+DT1XPG1rikQOEXBM9MkzTgD/8AxY
# prHt87u+g7MObUd0t1sAyJI+0lzgJRlqeEAw5pW4CfkzGfEGXPgT/HfjWVIc176l
# C0ntYiOma8s4znFps5hAgnxSApopGy9c9QuuNuOfiSNa3/L5ws6RYulq/qHTuifW
# gZ90UMQ7TrA2VjGCAvUwggLxAgEBMIGTMHwxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
# EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYDVQQKExVNaWNyb3Nv
# ZnQgQ29ycG9yYXRpb24xJjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
# QSAyMDEwAhMzAAABBQc56lnzVb8qAAAAAAEFMA0GCWCGSAFlAwQCAQUAoIIBMjAa
# BgkqhkiG9w0BCQMxDQYLKoZIhvcNAQkQAQQwLwYJKoZIhvcNAQkEMSIEIEIjFCBe
# 4MtXOBW+4EQjXEL8OLx5+eGw0ZT8w0o9gW4DMIHiBgsqhkiG9w0BCRACDDGB0jCB
# zzCBzDCBsQQU0nmc7MiH2Pr0x33n13Zg4RlV9qowgZgwgYCkfjB8MQswCQYDVQQG
# EwJVUzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwG
# A1UEChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1NaWNyb3NvZnQg
# VGltZS1TdGFtcCBQQ0EgMjAxMAITMwAAAQUHOepZ81W/KgAAAAABBTAWBBS6OC+C
# 8E5t3KIl3SZn6YRcv4X++TANBgkqhkiG9w0BAQsFAASCAQBtzHRroeehPY5IFmFC
# 0CCu+fgjt2iyDYX1P1rHZUyU1YseSFj4GEaOj5vSW2VKxlJzVl0C5/xZjQCZ73+j
# xRFZaUKSVkh5rPDV7++x6wUcCYAfj+b0QwRh5XH3HYMB8HUwusbG2WRnZCpjmrB6
# EQfRZcvyWiD+Lcc+QXgt0/JyOEtVpMIfwWclbYX3wltt9H3Q1PXQy5pf26A5Yu6Q
# 58h3xsTXCXyJZ3jUrP6qImMS4KrsXrgh6OQWczyL3E+dzOm2OvF8QfErkK0ooXGh
# zbodmkxNfq4WhN/BpRMKsRi8QdURQ1q3qLB2GJ4JjgLBzkhXvEtWD1xqF9AINmTe
# 3n5C
# SIG # End signature block