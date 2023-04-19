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
 0""a0 lYóté÷]p@Ãó/|iûdKG_6[QâwB¡åG®m ¨€7#=°Yxi é=t|2¸ôRåie$`%vÆu$`Œ +C¦n
-Âth¾îSFz)hsÙ¨Æòònqytòìa¨egl8L¡èô/`D9=(`|i¹4)ı	¬à<àÀ#"0Ùst»iîe_%$ÿknízdÉgfÂUÙÎs½›3  ¤ PR2{qU2cîeTõH+4dm7d°`ódøJq|} xd?OèLCd)ONJäT .åqndTro'Yôp»NEñm"|i)0p–o i¨g¨x$"øam$`ô8b°i$×t3©%eÍaZoç5'ct	ìÔût`òÂélõŠ $`3ä$#_Öôóiîg×ò‚@¹ôL~lc1d†¡se`ÙtDèt^.sá	p ¢bIÙk‰u<(õREÆ²@*TPFs6e}äEtiB)kODŠª"ñ8$32:c-kP(§$EkÕ5w­|ÿ#wcf ’gjç"`Jõı5•J$`ë fuUq"tEr²tb‡bÿ 9afvCjuvrñÑpcjtãş$åçñÔ,U}B2`kctG`=G€$âòm¨ç*v 04 ä<™×{°m{®¯fCdáÃaÓd$`uyXd‰U¯/ë*°$ 1al1‰$Ó¯uzcç}æs8 1?&#Ît „1¢Ÿ:á¦)(Bâ,pwa@eÎÃ k52Ÿ<'j{eVRåŒEvs³jImã"µôaoÿÌ*üa w	Š­¸(ºAhj +õÚ]cCíôİIæaati?.÷­Y "`33= q  ,0(6áïUôş¡'m-ó³pcp=·,(Ä\qòUÅvbi²axX®K+$A¨be?XTqP¡Íc(! _#âkóUku+àAb. "@Èêz„9n!Hq*+¹!m¾Yg›uW%ÏŠ
  í.â@ `
Év@ê4êp2o«DŠa‚lG;8e &i &,ökagdé±À&4d.Ïpw%$!0(s‰ ‚:$B/î@-ğÉíeniÇ9}i|(o;dŠNá%/1	à ):`\ ê°$-©% dr¡0ÍlT(NŒjW-mmq÷roP¯G~-ïgeJÊã§~ 5Ş¿'éGóbŒynfTyb2!mC-Ã¡2` p`¡&l&w#eQ%Q"))ÅålWLtS|sJ;Ér.#cxBiîìÃVfmcJemåä-GLlnµsÔsçkU`víê7*"CeıoäPÍ]O\`u||ftgB!Kbo;L	Š á¦$r"cÑgu"%Œ)UF<2$dbÏbµï0 0çb!ôëu0Jh=duTà¥K¸Xä[ıõw0DâsmFlòñçôÎ
õ 3Uc6PlbIsj*¿õ~` `v6X( a‰g%<…strÑœşz¦´`©pŠxa .$ `tıè¨0°)  ©H»Oª,p b¡"&†`–¨7h%R¶g"/ldòİ[¯6%-+@ra<~_fóºnd7Thgd+Çq'+zaŒ^CµÜBLoôwdRaŒ,8/ ¡4#¤tät>Fo£GmuìQ<vv1/Á'÷o&èst|`¼\ #äsqœ7Ô}¬täïËUei.w3!f¨t "*`af"Wù~)=ÒecäŸD`wàVtFkC!"N5|»tm{4aG~^&×sec0æÖ$HPgît:/]""-"0 (æ0`¦&íeMePq)åb(2{hè d6fAb4Éí
	 àà"5  ÿB` Ğ(`a Aoafcii`° !ál(w	B Tä$(>è(	2S $HlåReÁçoÁäG{c'k(5á+d‘ëPaw)%,EcdåĞ m)¦4tğsNqCôu  ¦$ h
Xp¼piâ:ó+@_ìİ`lÏ#úyp›m0j’o/…=-¸6aNôxknmd}a|£ĞE<l))«ƒ` TP1È ³"¢bK)¨`""dâ 0‚#x  2(ponçòx`¤p)½¨÷tØğ;põúTŒ„\~ë¥+qNVtráru))S$§^÷eMr¶m§Î%)‰±
Ğa #%!,  Yopê.uC)eVmU0{Ry„ÊmoomxÔ(p&T{Nzá#e rcMNt|2õ¥—ad>Æ@Q4k4/Qawj&roØ`vlD|%ÒWd¸ù‚¸ğ* C`£0$ wKo@ è*&~0`" $ ejm>`)UÂ-+Yo	Hs~cm9*íxNeeAvenËy_æ_jMSaIÈÍº²E´ü’è~dgfâ~eká~b!%4Tg
cÌE) ZhdğK,i)t"âftA´\Winàa=ˆ®ij!s$ü$( Í.Lrm`DdiğeRcUèÊ¤n{=)ìaååL*5  )& *&! à%SËN>fì}ÃÍÆ×~i4m`NùtÃoL
$;Y,nÌád)‚®ZïqjAt(E '   (¢! ¡DÔa Y|æe!V$pKN³ã_şçfR	!ó*¶S}`Yé¼--¬~!e ıUyø í2 <3a¦pP-
 a0  ©SıkòOojğ7mO’´p‰:ü„ë.ì7Znƒi	
YËÇ4oHR`a)ÈMkû:|!Q gìa!aéëT<îïÇ`dôLepèK|íArµwæ0ap{Lmg¡2`¿Ztîä \)eetpTËğ!gğse*mŠ=‰"àC×Xšø7@íom±(1Ø¥eu èiXfihU í+‡7uQDæî! äè®pˆN"¡$¢ryUéìĞtbYÆPı:ä`‘ Ôğògâx 4aTarA?)O'‘ARÕlAƒEBeríxuAP?Áms`¨¦4Eã8f/d7
Ğ$W¢^0ÅJeº|)u`çjlzM<tàko“,ğte dIuúä4i}g0?fíçis‡^j?ç2öú5,0U~ îá)
@0§ uâGd$ İ&èvÎ-|°ae'”²emômçC`MÔ p`gngQô±ıE4g9egf+QÆ$péÃ'ÁcmEø)!jör„÷*u(çI˜0&(	ç"u3adMƒš¶œa@amExÌ-]wYäUĞ[\/AiÔ~AÍD= 9` gµ!éDhdS2ğMD£SkŞfI'}öNù#£æ%f¡,X"ö0e3gçm2kamlI"mnJe+:)ßïã4"dÿg3¿pÁvO( È`åìé?ö-A|„ta`RQ`C-öig„a@t-kÃc<Fv!!n6e oraíAk t|èwª{ qog`.œO(gpQtYå ÅPo¬dk§QxiDso”DQraÏ!éeU^ £á`×rqgÍfiı/`pau0a'{cpm_nWnb_zæë!z8Aæémì1To¯q5Ebe.dStôe?- qm!b`xYàiaua`Nˆ@ `ôôUi[t+¶äv_eãeg¦cBcífSaínéùGpëğß'oQ-+ê>î(f?b0d©eeä+Yp h?¶yd0Ôqc-v
à +qV)HEbZ/;/THÒaNÕ\l)ÃM(j­ƒplo÷Sftkí%Nä%õ½:r!Ì SĞefíÇép¡t)'8î@fm L†)`)`DotJIH÷Zl?ç 51og%¹¦òA­KH*áxPNYãamXLj7úŒkâ`òßn÷ix3óaDen ~%l'&ø(M*p]CUMEs	R”C}¯Oe{|ëw•nsj,f¯ j(@árGÃjwé5Ê2ti%KknÜeböx¯~ CòcínED•n4ut—tb`/-¤÷%a¬@RøiU«Xíèõb9#	0.emcv}ì"c.k§w	gn"w¥îm¤bT&4w§X®¯
	"HascLFİ ÓzoOcv‘a7unryĞnbêeiMÌ°:[3ocofÅ±ñ:!qa:qòkviümp kàX©"j§fq5nñojngõü$fC~nu#v=Ç+3ä1*LçMšIš.P$Ç5eäQPI8òA?å#In`i¤%MHquãT=Bqhhê1¤RFciÄes/|,á0}`jOitëpC|´w"góm®fnòFèo4){t=Tf})iæaàHbf Isducdv Òwv `1o>i6%)ihor@uê¯+óZ!¹!b?¤ç1qBh`w(á$y´hM‚#q4 çâ.5dÁS9%`T%Dp^`cwfB m0Q¡qyis|%B~%aokEW$9Cİ©) ,öp)L¯(   tq-Ëed ÷`rA/jåvêHÕáhkq8g…aÚì$b%„ênæbC`m®!t€! éelwtjk`4jüvÛèÚñ»gŞår 8!`3oZ\ëTuM_!0³¤ûr|(všyq"kóD÷øwom 8	CO¨îIaæAah$o,vèm"OfJv/,‘$a0â ã,ni9df3àtkê=€hRt@Ov°'n$ !&@re.lp5v'ep Fğ9M-otí r"ÔI5 t ÷(fnu 'îtÁiOivl t]5zsïîpUXV 'a"l|UrvÈkjµau)Rd'fáiK#"KA1ILğühWC#Abvátmw/s@#&¢RUnPeji Gát'yß"qp+*~[JZm
89!3KLDìeßoîmmî£¤FE"Iuş<Á!rÁéA=rüSguKã-l6j%c¿le3<É	àWôòiESŸ`íï:$aX™y8KcÑLbi|iov ¿@e€Q¼ç|IĞMÊu`¢!P ’al*	 +„1F``\ûVq!ïo\ÀáFc¯ÊoëpN¬(ãLÏ*©.(8`  ß1v÷yWO!Qvgºt•y6-¶äaTFÉ9w/™++2	p²ê#Òqvğk'Då$CmLæw8á`oê®\åp'Î`mu,	ü:5- b&+[Ô%2e4ç±e6.T‰òó½\Erq}ôZ	g¥bögÁo~rt#tJkltr >gšdéC_" *È"7hÙbr)~Åd$ÑËoÎõc\`obStÓáNkáÒe  0¨`1€d(øqQfqllt,ü¨ZqzkímDg2ÃtF™moH½jcGmnom'8Ñ4Ú|g,)6aiø~BÁacÊ(õiG *YQLäá1O~92`6vo)	bz¤-!$4 qtÖkhhU6$'O,íñDÙïÚuñÛnTmI[0b!¡H°! vàÕva5$ÕB8ğircªÃt5,Ò#tMm< =)§AK~à¥+rdoo]r`kjdì,dBju,yn=¼Õc-mu$"OaFd½opyú0¬dórww+¤,0¡d(  ]<uØ(*Q.FgO}Ë%aôXnl~~ùädóêmef1dÀà&! :ZR`Yn):±AXúÌo>÷«¯àCs$qí"ectRxª8š0$(Ryzl%¦]td?óF«`/_a<)icYéeIU>rw/  d-R·ëJa[dd} ït&R"îek°2$ÄrûNõ?tN]oË f1pùfvgpØZ>j&"4}y"UÍ÷[¤!2ı|paææAõA¶*%Ã@1x=Ü8@pg á`rF`o«h=ébmìa1v=[!‚"Phtsj`mqb.2'ìië`1\y+Ï'."gF(:T%-

Êè(Aî1j¥3UT,éáuâbfmObGQmTi+e]Œ' #)Hu2´© àd(lHeréÍt¡- K?écGz%o{K#{NJfw."d“co'èDewcT{Í~,Áñg<áNuø+hğM.:­š`©4äSHQ m¿2:= S$tÑ!3El~`,CK–jmoôkêşşHh¬eìmW D‡ÿ,Lk©Ù‹lZlrINgp¦A%f _jaà1¦h­zßáuu¬*#àa3aàp2z Äv$6{a|kucf uñ|lbv­ğTæO'SühmOtğ%«©ahí€ppôPeX]~à«òÛ%ñÉ”`m3â\ãÅngôêb<mf^!b‹ÛuÎt*rÎ2*mnlA\
„"û_#¨ ÑAn1‚ç-t®Mm|_[gdcÅì|»$yGtidlâîpoo{eB!š-!¡?¾$èd ( _}TeUerOilj@BÆ~üª AşTyXk9P ìdslök…6 q.ç©Aï¶i<Iw’Òaìuå^sël&e@!yòf9jwteÌlÅa. €teàÅjôa9U°Ær!luGjp	#6€dgeg- !zå`ruF|ilF¼ •Om,!M¼+lt2 Íåó;rnCË3EL|okAlOdf§ÿ"$Ívyı¨FÊãymsc4b Åë›ğæ" J 0æª,}Ê 8  næ¸‰Ç%<KEo,ud9""-jit9zaîugıOë	Ê¡"0ûÎzd!0™´Ä<WşÍee´V xşmnkèb›¨Ö5(ciel-mF:AflÈvqŒÎ¢aí}ôrk!ëlez”`aB:6-r aAhal#Ë8hB3ôanÍõ, ]hb!¤óåha}w\nV !û¤¡rqgJ)ny–0O‡QêtMvmh0p=%woRÛL#ãI4fdp&0>î; ±ÿä +\LEò$rézƒÑkÎ~2
¦L(y@}ŒªddçA+-d)ÄrUPxîû¥sDkt:o<E3äÌ`mg9š9-È"rX=é`l-duĞL(Agf)}ì!(’0z
2 ´!hl@gpf0f W5|tPyBeïd­J`0`j}C!K k  ÇÿdÕrn¸ı×]+Æ±Cè´cT ´p4JrmedNc¥ÉM
}
oHåñ`d)ánxUFATcû¿wP$zbnyc«>yueD n'}TBCEøúEnkef	
rÎâ00/ie ù"{áieOB€
ZÄ;ià"€* ¥!òufrG(útæ,p:m,mnà¤Ám¶]Êd®" \
­
(H0!Dsuv­tĞa}ëgÚBqôè+±5@GW%>MLuqó?'ãgNerbgn@u©xG?CñQpluplC*Ãmq©˜%! mf.ºh/ÖñbôRıêeaÒ”H|hv©-`fˆ¦_‹˜ @ $(4j&.(5g%éUÿpbNêE{vPaThp,|co%tè <A$t#©BÌ#±øj ÷©µ
8¾,!9  +¢k}W!t]@?EmáÖxcôHYb$R´ rgMi@ricwø]RAxdó[¨Üª3¤w -"1`¡¤Ée§r	Ï9*àuHÕ9²ffxUhdnltul(wVaztmÔTbMzIÇFFBôm¹9*­z(• !0 a1Bà%"40²aª©¸À02FĞELe49ga?F$=YT¨ï6/@y¾n :feDˆqm a+y¨åeUW>Óÿ|õsiDb&‘<=p}ëMs£Qe}c‰yZdpqƒ
Àa€$ p* (B0t1dappóĞVÇ®'÷4L1d
¨üêJj¿=Ä1Hù5{h¬m±YiX &x àfµb0tUtÂsmkLo´\@#amW™sotuã$d Hko'i{d<SK÷:)ª"¢âq£@$! +­Ìƒ¿ò´Ä¨ "*S#³qgEbs™pV2{csa6 4ª_Et{ë‡wöìIbfìjì6Qp|-@S€p0A2% # `¢&a(?m‰¡€+±
a€ $ H`€´(ts©2!: 
hh`5ˆJ r!p/1$"kl"! aD' «4j 01¢d À£´d)7BqeLG@L(œ 5fuÍèImua€ ¡Õ ,80-7ç$*! 4 b|)æ2¢K  ãüH`Ah!`z2I £Bcuke YV/øKEqçle®Ğn'İ"%h¹ùk_B!#è#‚èˆ "bâ¨ +‘1°À º`@°1(<$,ô"$¢8ØäSä|]}<dGamráÅŒ!m­ *3d"à®*iˆq!)ª 4hı¥:|A  ah+m¥ph(g#¡ ° `(%Ä`,\.õeOju yAzuçö|¸pœğl÷Ùneà!epqcX'/©J"¹ l8" £‘=2¦¢‘j$(  kM[:iÀbá À# $A­%Py¢% p5a,®"ntDvNsaLdUÀ.iĞQíNèmëHÕpÓÔpk®*¥0¶3$l^kìG¶N…¬F4N1"19)np#0(4	P0¡pà0#&l´;U-
o!$hÀ(´0 j!$à¬Ê.*(6åLtV>$Ä&zI,á©á¨ETÂ šó%s5EĞ]°jîår4Óa±xJj""¡ P0l%` !4À
,3$ 4#Å%`( av$ˆ¤stõ"ÿç` sG
tCúi
°0) j%8P ëŒ°¢jAÌ¸´ "ª põuzn l~pC)v4Z"m
Ğa  0|‚éàq 0"!]‚h!!  H–«k, 0‚rdúe-Ebv¦©NV¡ Vn@@me pm âÍ‡lû-q»uhtõ)ix3®:áK ,-3asôu;qUKæBÊpf)× Q ˆ  ¡è =]Š	‚ #)"`u(~%iĞd '²A»#è°²Ib˜%`2 ¡ @Wjg|Tm÷e6oŸ.ä%i?íäi|$D${ÉÂh}P£r`:g;8S0ò%|¾ÆÊ,#€, ­ª¥©: j² áf:WQ+A&»Û‰:¨  
ê  ¶$m”giY'hØéì#h/êïXzza
~õŠ8råêAò"¹$À&f2p4{
. °W;{d-w)z®Klsâ ÕSën¯$ĞRÏbvP…76ˆ%GmllúëªBÒøoégãTNXOOjåtvá}$(©ñå;)uD{qpAr4°1¡ã2«Jä÷vb
DJaè2¤.@brb ¢tkn]Ieço@bEkÿc|]ƒ=EI °_+°Afv27õut~µtmgSô+)cCx3,¨ı,K©2 ´ t3nã„× RyyPwI3%KG$k\&–Öi!cíVC.dhg“6MËnsa<i#j7.0O(© ò0Äx¤Qwfaä j\&jyåstS`ĞK"(!(0*)à4Û¤p7Ïn%AÌz©`PÓJ)Ü)q­*OHHU Jåhm”G9$óz{z¡kv3:Gl}fÒÂ£P [[  @p # !$°h;ã`µú!y€mBq)fégpV.5÷0L;%ø¬A!â)¡( $,"a­ÉmodroXñBnãCZz)Zm1t=ëM3()`ödL¤8!2¯#g°nâ+}?qäItEmb+,“"4(ÈU{,Xâ!b8 -% ‚¸ øpéjeC6,Rñßiac<İÕtmÃ  €ba%1ä"APÁè 2coz:-;,Q6¢±?oïPD}\G`' p1b ¨bà©¤4ÊDa$[¦7åñzjã#t{zQg³è`[%C%r2ÿjq#p( †Mjg‚.* }EFp"ÉÑ-ˆ]ˆkfO²X¯#ædgiœcra]î¤cëF	ãyK®nÓT`›çÂ9}d0¥3ccJe8´)ÇoSxzZ$¡„{ë
fKkè/d0ZïiTä:Emgm	*ÑX 1`(şk6h­wá(â@… È-¾bã€@z h†e/ÆîgStIxÛ|òc-WVg'­,ˆ  +
'ƒ"$à.5( £oa1bGis¨<yà½,oMNAeST«Ok)ûwAhdO$j`A…'ÄlW/n$ÂK5t	NCÖpkëqãk!*,*p1¿ÍJ	Ìh*k"iÆ²¤%º7l~mGmij-Kdrmşgh^0ˆ ¢c® ¦ÀT ut¥*Ôs¸a/R 9„§-ïfÊ`A£ví}g±ÓâcÆ< 4#Mçoá+yienÓ}ü8.÷Ea$jd  ‚€85   c-ó;nFm§pQlíPp/íCGor6Ljƒ?oNçJtào$PpCö[leam%Op  ¨?Œ*]Ê <!så}itî@0ğisEùg\D@íu.3bƒûfà×\hwC7şW_Jw\Š{-!  d'n]q.ZEnpl/Gmg('ö¢evSrtŠ0ï§e|`Ì~ìm¸#!âêDTo÷TóFo.ol!Gİê e'´ 4b+Ì`oNdÆtşaeõ¤Eu~s×ğGa÷×xKL75?wÌÅ­uN-$˜,·UpKa,soLQZmn|íõXq ¬00`mR½x{çJ{]|åMëpnr¾ó(ow)imÍË.mHz5ct{ÿ(Uò)6ái>tkpí«.u4ktcóR&E)-S‹¦*600
Ä#!ÿ]¢ * hğ@hã1md |*E"é¯4eî\ém [PY,O\gmpUqgq!’0dlé¼ïÅ¿Œèfreòq-*†l!È` &f4Ãm)×mnPn]DNdå-$äotMVØCaŒdipmN÷]…æ¤=’*F"8´`!--tãÛhK¬Rd·Dcjæ?j`i0$C&{ïfmNdÕÏæee®,<qbD:75ô#CÌ}]edAï~kaHg.^QMöæ÷núVO%fVan bëRˆR(& D±Ğ`O`KflIlg&îcgG ?({Auel§!tıOş&Niï€e¦¤'`@Xü&ĞqôálEÈ/"/~ùJ#ç|åsh}lK&ry{ÌYTóF<HOë_$`J÷êPtòysŠ 0#b# "npbâyN¯Ø,ÃTz&o} V`Ï>å¦G‡*X/muv)&loü?vatğqpfh.ïtR"{XºrB	LKÃä/weHßsoXvfk§<Ô¤~YFxeRlá{t)¯Gyt\¹d$-p¥X5¦MrC,^³ï&eVGh+wé &X ¨3©$an<µPîkdjO4lŒ8°¡£V|wcçƒuÄlnã©µmnYNfsola¬k3×i0¨²(  !45sa3-hü2öTcL¥tx(p =t¥ylô%³ş|XoKÔ,‡eUĞ`$©ŒftÍ%ıiw`IÖ§smføezã‚I/$ SCï9şçFìAo×| "`qmd.ÙMèõ`e	eşù<ABqdˆ8B€  9¢  îER5Çù–m_NdñMdóMFkGge¡ĞhcDè^I+J("+Asó`{mÍ?ì1|!áh&©lvitãsN2rîx5aë¯ãIj2NBã(³ìtDruglxëRt"1eºvdğsLÄmÊl$´©|:0$.ƒI4cYÈH }(pv<ú`$¨#&îğw´#ÔaIl+4.íF“|é§$ /Fòfõaç1?eC/¨Ï_€ioòyR}D(2 øX;ÿq2!8å|æpë?N0F(,7bªJubv ğ6{$ùSpVåÊòé–Ds}¬r4Q¦OêbCIé*n fJ)bqa"§êq)#fÒ#B_`ptin^Cwh<u±½0 ÕM¯»ON÷äKónbSz~TTm¿kZdH8åˆ,!!&¸ƒh]ğé)oB_ae#wE,Ağ{k#má&*M0–p* 34»…jv<*|(1©.¶QcÕ)ögÿbnaö}ÚaqÛ#JªVÃ'=ùº%¢jĞ@$%nût({Å{ô¬a:%QìeDhíe/$cB¤l$  0!#–yé bPVw¹Lt\pFù~iwì2¯ºú$0v%å9
! 
aQgnXLSîÌmt[ãOB=‰OmnÄyQoUïhÈnf¯)`93ms-¯ + 4<p"ª&jRL÷!
thã`t’éHtc÷ d-%^şOî#3H`rïgl:å^aü|%7¤ná:|eEğ è5ïOTv 	H`4cá}	0Ğ£°tV I³VEÉ3»*EtlòŸxç‘~)ç rKCecT,HWOxUPQA¨ ûF4äNPé|ég
3x$„øttUtU¸x)z9€UE<Ñqlepñ£$úSIàug4/ndgiçqz`/*fª&ifUZSjTifåFîjgm÷1F%ü/ë-)Üjgpuö4kSsíca´ru|TEth'
.(8 0d"vgEBDgFµ-OKNqauhòx×ç|gõ
`V!x7SÍK~p!h_ºzÃn<f`D$à¤”r*ec„kT¥0&oazĞôböy(©Z° ($u`öEøwÿpdé*oò#ÌcFa+usxb$ğrbjhßbtv)%{fbdcC$ppfûGztim7`%Má`gbLN*iÿçwïZë-ıo!iõ{øÏ
¦àù0lW@í¥o#2kvade$] _åµ=/1j4ô¢#Ëi;vmÇNA÷íõI}e®_eòá!cALö5#†a[ıW/º*ec-í"$$`Mñ`uVòcoÕ·kwigì)}mS @04DÕ 2sõ@qa<Uµo@êIAMhßYF@Gâ¸`)nil=fçzKd`}O>tgt(GÕ?`îà d¢!7âr¯lDfq.ÇöËR9d/t¿mfm! $6òb×eë}w+ÏàId§îìê³jlnÉ€ª*´8&`¹v%J(ôBr+ndFkEÏ·/xCéğE*$ifKiSbkÊA7oÏaPÖá¯³w}qËL!+  "›$&ë²`JˆËæä 5mš"eqÆvecõ©î5OVervÉ_n`)ïV8!f¤)	”
!  €à (`x
0a° Ãj¥«Ì),(ÃrW\f'ç©gI !&n|uå0'` å0 &ª¨ıÌK$a((Ip!$kHrÄ®i °p(`¨w=
2N$" 1d$s a/,æx¸¸%~®v>Q(3 a7{R5´±)!Â  ¦¡hğ#ÍŒ<yh$4).!®ài!uÆcCeôcvõ¶€º ÄÄÁÕ„ëquÃ\¤¥P/w9a]
! 18@ hvp¨gÒdátR|#mÔl3vMdìuØA9%8º°&êŠ t¨!b )p/Â¤¢ù`Hl $(aY„üEjtíceDâZ¡q ?é.-8(d¤O
0" .d.$Õ  `¢ "ğ„mm3ihz,"x,uJl!]±[g6äà-InCòNzSPÁg¤§òÕ'NN D0	0"X/v ª8#	&21P°adrfdkj]Lqç.=É7wn9†©h0% ´"Aa/ $95¬¬else ë:€ 0'Mu +´¤ $  ©£whòf zU²wÛtã&!g¾¸vu,zéw¤şpk}jwi~@dÜ !:ìa·5e*YkTewA"~ha}\m  ş¸¿”pŒef}DM{J¡<Ÿl8ƒ@.u@|.9¨<lgí`wf`3$#” -Œ²) 
  ,” ,eòni|.zrG ú~feòS `á¹anª+UJ!  pº` 5?jl#* $¼‘§%t1Zuuq)ÚNı*LDìtˆ€$WSbWağlrinØA*,b*M>worb&v2Kmo4ato Ú=\mæ/e?D*): $ -Š b(€Giwexâ"	&4ÉÁg\Âas+gãÊan6]PÊ!b5Gq/hPMTgt%Pò9sm* $@.z 00à$¤b uá('vAtò9û¦JUlx¡Ã/em).Ä"5¼Òpğåt;É,Afô|I	˜"t@: €!(Ô¤!ğ'tFqewª43ÄdvZxÏuO–6y14|SbYea ìk`˜ÅcüAq oÅs%mQN)^ kd*ğ"" ($$!…e0sÊLje"¥ ]nKî9gUà&$Ucr%ô‡t0	t”à¦u6\ákEÈû$'Lcùc,hu/la<ˆS€4a "À´tY2ÅaäAuc%dsÈcLí½AGKü2€QìUg11( ¼rrszlâëÖĞŒ9}rtAc3Fd[Cél§%%.Ák `!C¡.buOu|EåC'~2‰ƒ%}`+ÁlÒ`$f4n^ğcÖå4À9w º¤4Å2vdÖNAdì*¨${Ìòğ"tÄí@C]~&jÆä|Ov.3m5£(„$¨&*6S`4)i=fş¬wï.:kQ:ñq}æ9¡åp3xjØzôbspqädoeI6<'Óô\IØAFrahœö)p©–d9sé-ìg&J”.e ¨  `awBYµôğ m1^~Ko¤ygQD3ÌrVşS{I2qşCou)5Ş­53æ2gé0tP0^AlaTvÅ©xl-O>H( %uĞu .ågôêSt’ffa}c*h+âqgke,¨+oäEzV.HìË'¬!„ægpuVKf=O5?4($€  ñ äB;%è’Fh!olÂåD4æi}d7Š  9P*h";–8#­*ª(À (c Nó{$Ê_¦#tíUòd oetIS;E.pO I5)dÏANnlva
`Ooñx"·ş§'*0r)PpTÀë gh$la¿5tŞÏzªckh€$¡°€)ÀLÒÂzatéu2I*Samm5LéN%"lÁmnvÅpàMo,Ì·'nlgwÔftÈ;e;I"}®øRww«wŸİıííâ·p¬ @"Gap)"#
$pQznîCvAYbM|zB-2’ÛK/fiM]+:Ô,BJYEiBbtèvfàmÃe`ôA0CÇÌim%I$4ˆ‘àfÖGC4Ö>íl­±s[…š$|ğh@$>   Fa~Æfec1g¹eôs0accå7dFïôôb
NÑònbf`+4Arf’ÀÂ4ï{ûMÏaol¨µ‰B4` 1#s¢t(§$£b#à …s ¤|ïT¾èE4erBjs$9=x¯mùaä YÅ)íBAibÖ"i&wy@}j55p&.<‹eÎ$"~«/4IB#"0©   1ïW ñ0!P|¦jn%xudó`mw×AİÑ%r5íd+aSŸFhç	]Š87 `{ ï€~o  Äh¬âdp0*¥$n$qvrara.3(='kMbôN2cÏ âyBIgbn ,ìoxkM5Çnîæég%#hpp`¸±  Å˜c²4d¡4 B)æsM(``'l9®dk©d^bAIuö:0IeU:Nin8¢ Ab0%Ó]1$ !p$$)8°¤.ô~5jç0pá’m-)èŠŸ°& ,¦Ò-TmÚÛIæoo¦f³ÕdüjI1xqy½çkÒIw'ra?^ -  1a@,`]G*½$ B8æ8IefGzÄuRñxé-òp+(`&åfÛ!B<]lAd (ƒ "ğaÚs%÷¨a,RÉNå}p!6@iò(ª(’gzAÌs ÈaĞ)}1&Èle3zÓ "`*}
: ¤"c!ê±fq è2O.gtwÂx¶yveñ&}\á"m¼ígü
Qz?NEkuD)Igk4Xpre$Y2°GóbmGß²{2'ìDevWetnbiiî=nSiUq¥nô|ch4r-«¬pÊ# '.pû>m¨~eaõ_mği(##‹\  @¤4€"(ak$XàÃÉ gåpÌ`TiãÅR$%~?ho"VKoí#²BMe&gô8qİr¨O`üğ¨ë£gS'im7m{#f-!¡#8~½
!,0v°R#sdB©Şç­Iá = w%8r"lbdrvİ``psln‘A|,{`÷±pò-á}cP4Ïôpõt=dueM@#	O yÌ4Amÿ/'@°Ápù([nOë)rde@àDèËzDyt@[JedX zwÅ±fp,O"èvE‹0 * ,X;PZm/édäQAõ„>°ocöÚÆ_ùuö|eb×¯*éGd6àfÿpO\R[x@'NMï4Vaiìsyd/§
)T¡­ìTlçuAáäé,€sñuAïfou	a¾/ê`oÚ-&u…’Iw,„±$é	x :µ9,1¥em¢ë_z-g©(Iˆ :)ğA)`mË,=¥gG,ob-M/ ä`‚m"§$iúCåékøe¦q4pòVÆiR›'`  # !"3(¯aóUmmªox&( z·1D rEVx.00a0>¶!'&EBNlub1%çxò,§0î+gac]Æä5]" 0"&` ì=%|á{çp%C%$j¡$Ì`ba³(c	ˆ™"´i  hQ3uwÆ"q–1{H5`Zák{ñbmLJ(%ë0*²ä)j[(³d%qDPAUmJcğäexˆt Ï%TXtO`o2$ÉSt!·CsP0àok)iüÌp{ïhomFiwQ @IQî(X!th'
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
        $level = $nuâìê  ƒêl"(åÈ)}!§S-zI]M)¨( @0$ú &rgX4“ <0vö	Ví/Qj-bf
.:—da0-O`(! h8 o
 `yyrTš.ÎgoKa`(¬æ#v©ÉŠõ$ƒ¦!¢`s+â!&($   Ì„lå¾BL ¼BÄujsb{8M­C phQ (0 $°€w¨k9`²œ
  ¸  @  °17ìs2åzl¡a#Aã0¢İ1÷eä*l!vfpz¼ÊA!($$"´(H¤°rpáfgPåy¦Mûf2d"Çjbl(‹aZL"&!yºvßu]ÛiÙH=Ìğ'$)º  °áB£b .j)sù¨ 4¢€† d,0*Æ0¤0& » z	  &-	 !g°€q¢}‚*â†  1) ìp'\Åh× 80$0#21 ˆ¸]ÇÓt!ó4fhzÇ´dm-M
£b :è` 5J:`€ ´@	$Az×bàéb!v~oç%å(	8"$`¦ H¨è`¸zh(t¢(¤ 7'xfÒf08¦ù<E rr.d!^a)çd| 	+€$'i!†tĞ8°öòl•y!W8i´ä¤a3|k*çç•|mø%(M $	C!(° `È'"gi\r+# [èGñDğe.(?`0$tÌ|P$U4B  jU|8é@7faq9[4(×ß-äå-OiT9| l¶qxt(|E
"0d0  ¨ (8$åvm2"FQc! [ mÒxÔy-a"b-7&D$Ô*m7, °4ñ%@x"(ÀôäfiQıNb1hxé4At@ß#U `ìñ>g"-K* °0È1¨hÜÂ,Ñ)#±/
<_ »h2`´ğ#'AW~¶`atŞÿ'Pia<$y²Í
  l2©o¶(dqq¿c1oDIaqÃN@e'§$$#s
 ) 8$" w)Mg#(\î&oîı‘>02p`7cW£®Ue@^#r0Dª~{qOuSvE{-¹ !oæ²Xn€E+	š0"80áAr°:ï¬9
)$¡À°© (`Ir+vee:vg2n|ÃM`&.‰êo]$10à  ıWê* #Áà=¦0otHF¤ 0MBzÆ‹nä c,Yx,!IBCøñÙ²ojmçeh¼hrolS`*â8ÔH€   ŒhMk&xjcDø°=¡ÕDRcØe2@bchSô°ihfbt\hB$ (CAëä¦riì piODôCZ0xfNÍiãZ%ìd¢ÖcV3#F7î1AiwS8#Z(¯À!+sPdä!5,«hcº¯S,ÑÁ'Tü] 9+Š48!)°"„,d	{aSxak©î<ôê_³2réKnà 0  è[øwx_KyäK@crñ.np¾MiYyhtqyyæ:éDjŒf=,á»QcpöIv7HõÇjhBAéÚ=aÎ¡®0lo`]aL]* `dd4m²»vO£-UM!psîáLk´}‹hRch&M|tVS1¯‚·udlmbl¡îcdÊ >Cd¹"1gBY'¡-B~*f%Ígajgr¤m?‰Oâl#R2j«¥{ñZÛ2‹¦.æ@)g4cvs,y })Iü^3Æ¬aü!pkj91=7oèuòäN-!b0h´ñEîó'dAmi{mi…s'lts¶ ¿£S5t-ÂbUgáaH4x|oârúó@yb'ICñ.^ş~E,W`Ãm`WfQ4§O&c8@èı+‰~ÓÒa@v×cEf%[5÷g<>cîåYñlhE#¤'%h( &[g~")àfÆÒ¼'AşU*äeuriJeavÙ#` $Y=è€x ±0¢h”pp‹ËdkôUÓes£ 0ppoícV%MinZL
(ac€}C09!a,»eJp"$¢{Je2 A¥) c$múçJg+pAtáE!i`sj9d n? øFØ0" äa0¸(4X2as@ gåSk±CÒ¤uRñçGáa9"càsPg¼Rå"SvÙ#ÜxeÃTÀÒ¼£Aëvóø[°yE;0d0ri‹IcQFisaMskdyøO0  H¨ aS`TltômgoCædW|tQùr|kàm{,Iàªc)eü:yxxÿcIlthNn"+Vák Qr)‰ª·ˆ¤@<`|p 0àq/jg*v|Øjd0 ”¡$PrnjdqüùpU<B£C[0jid+¿1gh 0  ƒ$ btæ/ògdgÃ$éb4#®W¡˜vpÔKKh$òsmxBodpq2e²¸b((d:y
Té!˜·hsa&+  6¯w`õõW8q&omohºj;FB²?;ñl>5Dà% @	8°´/ 28µ4÷²Ó~®l!çspÒ?ó_@C­¶¢_3½l3¾Vî0	Bù	êq3à/ŸÃ,aAu¤L
6Ğ2    ûÍ£ ¨Šd  $	".AWywl ¤t¶weÎ	1 "åp0 cv„C"‰J€À‚@¶ånuæµ%`Nsz#s½‡;]M
ƒDptc4IJëGdTX¦@aÒ}edùãì_Ph $öPv"G~	K}(>€ v-M\tHğy5uyíT¸Ğrp<,tG%pX`Fa|d8¤øÆí.wcõOo'j{qzhô(ënŒsîmµUfKÕiV|W%éO¸setå^o~lfpgP\Ãdp©	o>d2LeLoaTUQCôJ/$+D"äf(4in6%i%boátmwlù%
"%}[Â83  ¢"zteuõ2r?¦mtuÖOg!iø´E dà:0¡ "|6é ¡rEçz. FEôÍ{BtÍUæ@ú}0upl|r$@zijDCd •F~`mrM-ôiqgèMI58T¼A!y£
´n:N
ğÎfv«kè ×%ëÚliôo2Ùtòå"2´1zíjí?n{MOjÈz°x`f(¸	;pqQCJ7o%xRmû%öä»,n"2 9%
ñ“ 5t¡ &Udj6ßoàaòw;¥H> M%8ÂS©ÀÎ¿~W2pz $~ÚªeAt2å^Lptc/ò,FñhgE1£Š"`:*$)Å Jg¢p$rœdğöo÷mF¢r!lå(!ªä(² ÊQ¥ d g¶ €0`#Ò]6uFH gòlat&zc~õlòg$ÖJô–39!ƒÕ
d  x+45b,0 Â9cÛòjåb$OILĞ1ê*çk4¡3Ùv8Dït|¨›êm IaeJÈ !!b |Œ¢5bç`-uaf7mz1!çeüÀn1å:4D1¤æédèvÈíF4i=uRad±Ÿ*x!Fé&Mw®auMùbEGbâkF¤ár/ïï°*eqi?Üyeub?Z/'ügoÒ¯TEpkux+
 °$hiC") Phi°bj6i¼qpV7vmğ"àªs  ° €)  da‡r'%ô äáô&N<dPëVogqEJ0t€êX"¡´¬*INNDP2gåò|b.cWqpg0Æ'2]zïPs;t¶
 ;€¤ræa4~mPM5òçE -2}TßóÃ«Bl%P2yPåÒd¹`HVrw(äƒv ûHlÔp?½Õ}qge·¡	"¬*0I6x
$ö%P|CGr´E±çd;M$©  {E
`é	  9â rh$u°o­Ox Wæ-vkvY?ãÅp€B€„f±Ëy#m·ôdeb&2f3byG;Ue˜x	ê¨fubówIGf gEàù„oG}¥®s¨%R#Ë~FE0) *WN  ¶qt!{ÃÑÀp4pondñ´$}2iù`<­q(q¡ÿH*" ä" 0"shY-rovÇe7pñB2‹ğ}Püù ¤xôoJ!cğ"wÎg~7(Agá+®$¤(*}Z±& "³$yeò¯äÎ2­ÍaÂ—Il`A4GrD3|XhV`qËo6kI!'LE~mucw'k~ ez%[äÅnhOM:;	nA2'XÂâô8dtğMBtoP	"Ê2L!¤ `W}.õriçob»0÷TğmVkà&vé$de%+9Š3wskjÔ'^èÃ=©lEÖ`«Í*sø].îîùzvé^OZ"›CÅleXéo^§f%my÷úCÙOftzvx'Ååìkty$î+¸Ò(Ald*C,tQVbrJ	2r{-lttánGÏZ8d l-u#ñàx# †WÕ,ÍŒ*$!2hZ¢)" F/fFvhn\ŞaÕ,AbmkFb6KfQæy|\H!eëx%}P§P/v¦X|Mq£%l@Eå$AZó]"u¨hcAzÁsÂ`±)1 Pó-z9m(mDtbï bdSdq[c#A¦WÈqéU:Piv]Á2Wqu4=n+PCS«)rá/ˆ
4p2Bïdesç³¤a#D2pGm{¥Cî<:ÕqFi1útF WåÖpf Í7lù€dy:ëÒ=véhb¨!xk?`E>D4Îq=çmÅOû;*ât,¢rsA¥	d``óU¡"f€! 8ReæMrÎml~V½0rdõ2¯ItæmH/rf/pD¸axLáHeƒŠÅÄe'†
@°`$=mJø¬°Gd8_è¢h â{’qŒ"¢()0pdµºN éşMm,7&,!(dJ-*oa#unÎ* DpKáuP0dEufeä¬9vouc,xà`òg!õ2c¯Ï oE*	Úı/
õ¦ 4pôn•ò\CËdpvÃ/k”MPp =@W4RkHo|¤zf#åÑ¬ôØêäEãt$Eíkv/snoT®”i÷Á|S6VT#FjÖq0+ówviûrtinÎ¹wÔq§t]íu:MsÈpnwSgg re£PC5à·e)~w.0à t|¦g&~Immpo01²oåÍb´h%$2t)7ñeMCH .vR(nî-:d,PjA)Ïğ%)u÷udÀ°Ejw{ô`#r(nã3»(g}‘qf02oêL£wb|¥5xkonvØgaxá$`ó9j[T/O	U’8‹!DvdãB}oúoã5x¥RÔï:rav@szjk¹¾äDq±üÔ# ´-v3ï wrt{%ó $bv-ªgu`¯ÁcæS-btNSLr6mãu3.ÕxëÒîlôscıë~}eo`rÿMíDcö/}w1j.mÇîêCëf§ô»[sh9HIZ,"fbRd]w7ôrm°EZuyw¿<Tqv„vAôõitIdt¼CğísNmGa¼uecx1_f ,@:o`½ò|qÎÁyd-6q#el$Ré	êmz†gükUioj¢G¼÷ÈRáímdxrLPiruy¤U{oìåAdx,*puO\@cynaeVg(yŠ£ è'k·êU=| Âa*ıç|Àe û#gòo7L¤p*Aw-¬b>Miìt‘öiöîbë¥âw^`)UÁtmW›¹:_l]BeìXãh%ftÓOn.aö3hydcl«cìEiTj
Hu#´#ä-
&ˆø
-y÷h!ùE*ÖõìlH hÁO÷a)$¸#mph©Tnb5,nØMá	)d0T@Rävçe -eS"ôi$dĞV-e2V­si¶¢pOğsrtx(,òesebxNH!	&G^yŒwwueôßfdvFÏŠÜC,	vMfzöipj#g]2g%m5~8»($zqmi{M{‡)ábQ$aôg`EdŞjp/#%Œ$!bïRF´æ`8[R[ !* -lµ¤b Ö$má8LäOçtà°`½*¦#?* èB*µ d$á!${f4
h	
dàA&¤ 9jŠ¥© ²a20±$¨h­az$tuàC`{1Œ–
G± " àÀ€p}O.¯
  " (`&0åXH4ôá2g)s[r­]?`îltpo ì*"¦!q+Š•! €"4`@oŠ
°*¡B 1G0b0`´db2wUí0tp +%'f3r	W!]>Y_LL($!`°(jp `&ãkft;Lsb@ $ªp" m\.€Ê0â a,8e2eummTè»4=fg*'Š	
 ´ $m"ä# {/Ÿ(mo÷’iã«wîáqh£!¹
¼([< p!¡1'mb!¨m$,00((ÚA<4*'ñtuKóÙ-ÉF.QõîwVj9 ¥Z+ ù> ½`§rA!ó*<èêè   ¢äs'kvih&*yÕ&emóÒçñ\S¤h÷;’j 1"@ ¥$Ê¨(c‹ ²""$§§€
r &)!¯£N&'©
`€0  !% `r¢cà¡( óHan ! +$b'¡ôj88"r v0¢ ôuæl#x£BCëkq5à½dS5Š Œp´&!2   0c¢*g*}J @0  d˜ `(#"¥<`( d!!$º ejÅ×-i.4Sd«!ç;'Äi¨VY".$mÎGO0Q+ó¯áHb6‚*3¨(41$d$0	(¤0”*`"@°  ,!A`8%$3ìtHIC0qîõ*éÚà=	0¬`I(¤!çD`â    ! $dd¡~ $"l-."4È å°±É$,+°öë+çukepd1!&T"5EB( 5 ¶ À¢  $‰$ ,]@[	*°0±t ´T¬8)H¨à `°£5u Êd`$"19+0!& 4Z, 0 (p´"h%  ¬ì0C9"ò$ñ5f!nOÒirmShe*q©ë- ¹ h0 t d$À`4`‰"İ*$(">!¨¡5 >:$4 g`åveWl+D
ò (!!+8$ø%!$ -Á(y>1À$$¢ ,,$à "*(  Ì 7´;C$¨y!lpè.'ÂQwks^ÉsliÅŠ$*!1 	¼04'¤V`8g°ì) êÅ 
!àˆ)" < 0$!  " )Acæ ,n9n'ˆ¦ G~diîfÊesx~IcWj³=¤ypyª€( A •8,xaL/1¥IA"%!¤B wjá¢1àh îb¢4b$*)4)A)x i"‚y4a0e{mjù3‚(ô)§L%!Ì0 :¢ƒ H* ²%$  ä`bP/1¤ w­`9 ¦0°((rñ  u¢Š"0 B dlóm˜6"¼D 2(A±!$Å(2Pè:	"º»M.¦!!$-`,!ª)( x(,#'2‚v`Ú&,ìgõ…Fbò{°¯3Ä*pæf¬VaşgakjSL¢²dW è6q âà i.’"dø -x (%)¨ í
`  ¼ x$0I@°ê"  !±ä"bkğmJòwn÷jgQJq0QĞy¡-$0]!#¦"@¤ €D.	%¡`q @`c„4K©¦"0â0€È8 +ˆ2`ì ‚  E!Sg+íecöP	/ı(#vsa_AûdCUK x? ä¡0!!( B(E-´]½ H ($0("(•ÈùJ! y`  "y,:"§8´$a$Bof’¬"rE¯fUä\Daa\6xñr(k)¹ 2""âc
b  0è(0‚g!d°éxf}ıiÎtr «= -\5+ƒF<ejeFg#yCNula7és( ğ…*ª`¨¿è  |*  ‚¨¨  p42gul(<´ ã¡gY!Ä$mÍÊ+ % )Z%t}ÓnèDyXCılàh<‘Õşˆã-FqoCŞ ï+9galcoÎig@¹ôœl#S?iˆ¾;lWki(  J	h¡p­Ş+`9”XvG
dCÖ±
 "  Ój!6²0$*%„¥ãíj¦1en©<f^b¯ %%?áa.`ıÂRAç-H0 0ŸA¨ BõzsV€¼3i/³+¤2t¤a€ co¾f#vl=–GUÕ@= }iRÀ"@ïnfk%# `ı–  ‡f iôaè4—¨dz2SumT¯V{œÎQsĞ l,ÿ; lJt "1 £s~áòGlO!õ%Á5qrõ"ï5A6eaLeß¡½e ]‰h  (   6h{wœ¯g7lWQrx&1->^ò 8ğqetq"n áMdHro4ÆrdAùp5¯ÀroP'Ôi&R!¥V½,HPìämó(y
åvı0V9L¬-UtgeWdbeÖ#ÌD%ÅDÛaebCjF^qótm~fc’ôŸxı§Î4Àæ±wÂXb¯Â-@eö$$`6fá]İ1§:h4ej>'b94€îáôìe¿ƒıct)7HOM*=-"%k :-cîş@|j
3GT «á<¼5T!}cW`neqe7LîFñ !J.nà…Qh%waedDa4"Aéso7K¢¤ó«¢ egù.1ñc%)@ñb-pòL]wƒŒ"¡)Mır8ûyÚãoZÉ¨ojLAIwcYkUÄT‹·„Irdq0aÀC’bLç»kg^MU EFÁbµBnnp@BfbaéIcÏ!Oëo{gaÆÃ(jwì°sg„#X,#u)…LøBˆUÇKX¢QWHºWqù‡àDSów*Ï\n	Ÿ5 Kpp•BñCfLIbDCC‚SbÁØE!0&AcÇI‡ìA3Q“A]TÔaÒuò G9dF#5C×ÆwËÿ rĞfÂWUsg_à+z JÃ÷}íìq=nwJNBtSG!sg×€ıHH0rI=bnM{A[ÔNx4eCğb4CQ§ĞOÉCqYAOÇGLA¢FCé7Ib³L95Ms·EFMŠt\ózCÊÂdîV@DHCDÒjA[òŒ[1À¤ˆ ¢Wf0H'÷P;ùLB=?ì§55Ç"Ãw„&lVQ0şe7uWxSS¥b"9ôiÔ„GÉÃ[,YÀ_q_JAt)í n²FğØNgE±Ù]I¹+ZxRğO¢p8IeãJoJJáT@ñ|ù#ÈC"-u4C€Dƒ7†NKğ5ÉH#fb]sFESÚ c'HÖEwhn£Nü#bÎöaúLnE|nr33#GK	ñTá­>MzG[r×HJQú{]
c5ÓÉGvuPGÉåBDQzî@E`C2]W{MMJFêà“qwK3S»VBÅWá4E1E†xmD\ívk‚YİËH³ºluE-€w×IXMMEŞj.Q,eó:&Z¥mYoöêkÚm÷FaÃ©altKHÑÉDO[TùVî+OHY/ áó
ÖzZçQRm}ÎÅ8SBhW>°24»WÇMk@3ãñ]ºhCÁAUñHD$arF=ÿóCÌGoI7¨ “ CT@|lqîT9aÆô¹#Iâ{I%vÙhHÜD9VWá70lOoRnyÇ6 ®>`b`óùnSk‘c_dñıÂ9ùZ,3ºJÑCtzfŞ1:^¸FÃkË`l°QrËLE3Gkwq|o;ê:d KtubøOR#awUÌz«HmuÂà/hı³]DH)¹FÏf2G*»Ñß0Å]pgò»`ÈuO=âš,Ï€6E'%Bù-OÅU"c\U6@Z
Ö&,•ªgwd#™°	J` DÎE]? 3`2L‡ÒZo+înK#kµ@r5lûÆhsâHî8yÈnyc[KÒNT-w×bW aEÛÿjò9øM	
¯ ÊÂòA
kqZ¿S_nfF8¯]/#jCÆn‚%dANN?67)9WtF¦%[0XrªÈDivòËR'÷gE£2oRTJ3ü9jm6JGƒîË{ºéˆS.}Ä`abM"CAfhFíËXb|o!öSgF•HYUM?hAW@áÿpúVÑEM+ úk3dYIcæg`CsÄF’p[F	h dVo^ÀE2BnåQ,3N8ËW,óW²VàJ0F~.Ñ]§sOú
)G¿H# _ŒZD’[dÂNt³5*JLÕq@İ6ÈZRmFĞHAïMHÇ:tmJ7 0}ô4mÆHSmeQÍ%uowm }x0Îx*«°ß.wè)eæt_jxàxXM_U7-B5À-÷åPRÔnIïEaEdÕ[kS8ÎD‚N*Igf]Cé]CSD@‡gbÓY`QìUIöçuoØG>`ö›2¯gnUÃ|T
UBgBw^8ÖURÄ%_gÒ6Bˆ[Ş_%HZRÿküv­£ d3$5l0p7S0E"|íÓ è“fWPŞg ïzîÖ*ùjS@3÷e€“ÓP¡—Æ6#éL‡Eóë~-‚% MœDV	#ÿdÊ/õì;JËagßÍÔ—Ï……Uæb÷CBˆgWw_zBSÂå§âbçÖ[fSzÛNUXvsc ov( ŞóD1>x…môŸNi8†bÂ+q¬¢€uÌ@ö„Âéş#}pœš°As3faNAb6Rüb]$UPtMpÌÅxªŠ"NÿÈMVE8kŞITEĞUu{³X Ã{îA±]¤EÓUã	wÙCM(cc$QLJ[a?hŠ2ÏJEAh@€r« bˆ#[N÷öVfødan¦j^Wúzâmé3nUi¦]J¼ÓçÚ#µ5åKuÈbÔ7Æ=Wh‘ÿ ps1p	cûé¨+"Ä0%(7!b.{*J@É½Ø*@2ETt^0\ßñÊEh5nRmwÃCqÈ[UxG8ƒq\rêäí)L3î3=…±!+Ömá=ÀUãZy¤xBmgÚ«)Š`nRA6GVZs7HR–Äé{G@÷jh‹/Yåpyh1ãl²wQf­
µ<VEJGm urIG~w7ù-w»+6c•É°gcûKÙD©€gØ~m|Â1{dW’WÕŒ`Ô—lÅzôa;°×‹‚XQ,uó±–¼\iYá¶v¶d1Ò++CX*Ö5ÇgÇüÃ8mwl/jD$óø|ÎSÇreÁt+F¨ON]èök,¡ @-ÚØ_Ş0v'öJá4ŠapS@f4&2cÛĞrz@bgNsK­—ÙW>LQç½p·L†J$fWwNw²L½ß*JŒ
îo”ğêVOØuh»7J—*m9_É`w4ÿM”XÊ)ù{p¬š™ØlkDiI!µ^a4j7Õnµ}Ñ\´ÖiO
2ÿåâ´Ë8q¸8m	ÒGVXG~mìi$c®!èNVjI`wæ"À'RıerĞ)C~
ã HÆ/M%czÏPkL°)@Fô!”7G»&l½i9>wjG_5Ùsg}Ö'©tKe_la38·gk«hÂ8IgÒt¾l˜;"z=Nnddèa)x§âqv\&¶U,{ngdÁŞXÄP`Nñl>H[X<=F9ä$CzÜTwwQirv@z%‹û ¼yZ;|"t'sIIn
`Clµ{4&50g.PD‡/;F5r{ôYöXKSJ¦Ú}Ù‡d7ğÈ»ÔbZ+î	LHcÚGfHõL’CgÃ¶%-{Ğf8dAIAQ1A!8ŞPÇàÑ`éyÇ) Ò@rdJoĞ‚ÉÄ…MÕHC@qWeŠzMwSÖ-šD|@BWÄÓ
3€‹İf@RBìjK:Äzd±d0hğ$<D‚BWÀÍ×Èq`ABÓê`Z}âıTø¸@~~cÙRzEúYÆÔ9`İ
Bp
#!R¢ˆ}nChDp7šrX3XDİ|w ¶W8ÏŠ@WH±ÖEYku4[Íne}f#Zq_FàöbğS%!rÆ2áÁ&m)(!a/nirÂİg_‡0iG9)$YÒ7CŒiwÉU„qJjÂJítMÿ&zad_j`3ZfI5Óhb^NèZî7Á“Nâws•Šb"Ë`ÃµÙOğªEñu`ÃAZÄÿ ‡±PBUErÍ7ÉBN—L‰ÀCDËV2Bzi¼çŞ¡CvfEQÅ |2U-Ši®AhOÊUh:2}oWAUeMãçWésUMHë\õ^Fjkm9R"b^ÕÜbãşVrcÏ„:aÒ:ÑcåQ–*1 U9ÔEx)n`wÍszwzjgã°iZSÅE½¹5bèB btCArGDúDQÈI;CfRó‰I³mGKm(<fqBaİuIq"@g8@E8—CÇˆÁGM{.3Gh
Sq²_`Qo*qE01p~`2×©'X`'`Ë|z#£ Á(r4@xu°Bm;SúÉ¼[Vx&i[òqASGI[zVpF¹nÙk¦”¶K~ÖÒZnpWNGivNCekIR³Ò>Thã4÷fU	ZL]Ïw3a£’~3hSb=ıG÷OtwE%„pÈMjoÍlIeã¦
ñuhµ1èV©K8CTT`,cxøx:f1µ
did3´óbU†]v›rS5%Oec]xDa8K,oAn^7V0PnyP÷¾f\·$¦e*|/,Hvˆ-
g`ª©ís|A~TVÓiNh9qzÀI~t0ma2_\ıT3´6Py@<ù"vòw~Æ2e`#$ÄajÌ1ş+'ª¢%h@óu"nF[fj+ÚÜOuI=0R
ÿjx¯!>!	ALNV·lJ9DOl}Õwm¾~I'5İ[GnæOS7	6+òA!iO95.]˜^K&ªJcK÷•“é´GimMIejygënNR_ÛQÏRÊC{pKà}*Iş-RÚÕìÈPäóhÏ |à!‚aAP4~y_3”a—s+WBS4Vs8cB/œĞfx¸WBjkÖrQp1Á/;I>ksEøï`¹ÒQç2RşX¡==:HHÕ*kjUr_@}GX3÷eqHv±Â6—ÌÅïJG‰ºS\næ;ÚÉaS9eTâdXNW§î}´:Df“q¢r¾j¥M»ÁøFL6`Bå£G6ö}tşÓON¥yaMtšÎ%‰cØ/òæ#ieQåñRL}’©Gz¶ÖÊA	qzJ 
†=z«q\½hxhÔRâmÁe$yåRìQq;`èÊ1;Xg±ÅzTP[LD>ñI–UA-Óg.³t5ÈáátEpgb*%j¹=N-èèÉwCô@CeÏ@H) çc@xKQÏ1·jÃaÕbijóÖ QIAncA¬K¸Í%UPlgPMÂÀz#%! M^f]AÉd'ÁGyù!p#o©ştS®\u@:gcr&éMa•]1lIéEVGx;ÀÊY@NÙÃûI
ÌKz	LÈèbcMóHA<+ÂAl]qi7Dw`¿r"\@âH{‚AÕÀsÇÃo¾OúJsXˆ3ODK O.By~üeEMbFdYN$Ğ²[O[õ™y<ÏY°ÅßBÎGRaPë^Z`%aŞÁRE\ÿwqGÌ#iÍEv¥à{)yæÙ+ãf[î³dO1Ê5œ5g6G¥NòFavt4LJybSU?b%±Q_QcÜ»~c[LRâº!D?PSlêQyLPÃ;X8JvM‡ææí
a WäOVjksbBÑOF?CCckYÁIwbóucÊÆcqUSoRcfÒrgÅBÃ[÷eâÎÊ ÅS±c®ï5L³ä6
cNbm?d`FL"¿vZnHù&#rM7BĞåQQJZRÚ°qùNa&OÓb8=MËDFCá@@i…Dx^:ßÿMPnÅi3imànFa)t}#ÎQ(VdÂgFW
™º¥gCp…a{BÿJdOM[SÇIË@ŠÌ~;uErCljQ\GaCp ÷w±`y¢%VP[!ÈG tl§Ü³?À5tdWJy@£ÌvGÜWÚ²9?O¿Òc!öuwo}8*âxÆRFsFùa_iN
¡'cL|ë5AMTtIE@D†êCFëWhSÈÁM^óqMICFg*“X_nÀ×A`ZÃşcÌA@çjsfbEì*%IíB218O'_±!S‚@ò1#äåMBÒCse£GC DÊA¦È`ESÓ8A[§ì™MZ#qEáS¾YRÀCr/A#8OA|,—DAPg9éªyqª 29sO}]ëAn¤#³şŠdXôäwï”w´wl`[D#wd>gêJ7+!ñw—kHzÌt$whz×„i5lhÃB¬Ù4fÚ^$vO{jºAOo{£8şP"I©îSÃµp2Ûµí*éJr9jF
ë#jr%8¬PgUäLpZ‹DXLhmMİæ{°y$EL^yGaga78SoaÔ°6ÓA^zoã}_kva6ĞÿSMßz;rIi<iÔ×v@ºußDoWƒRpÛ	Ÿ*ÂyvFïdnstGÒv
Ou?axî7&\â<62öbÒ/[mA‚m"ÑvÑ5Š æbAj×1(qGF\V\r1u/ºQ`«B|%P	'q¸p5kB2êL\RÑWDJ8"y8+ónUnLPÊ‚@TŠ¡mDB[xÈu 2D»E]AQam1ÛoJP/9é#qÀ;\ ¨èË34séqØI–i„BĞRNa_)sD\ÒázÉ/s­ğİ#@2XuM`86Ìty_èO[Kr"fWB¸jTçB±QLaeÚ•{s ÁgjU´nlY20'²	Õ{+(BH§$QcãKIO'dZ[}R¼jàKXIbùQOãÄRRjX·D~%ÔÜpÁNÙRMuEc}[E´İ«Úxë SÃ/‚s‹a`J`m¦oMkç¥ÒH7æAM8J%>vrv+B±Fit—¶VµSo†E4¯1vÍÊQPrebçpi RH,sÄâC3ğF6ŒrLÏ çuM³d¹lëi0\9Ã@k¯/vÎbz3˜iG¾s,GCSU%¢kÎùkZ|=R°]ª#cRJóFCQQ|¢|t9NçExtízoÄójux#×şMV§HêÔ§s~*i5G`YKsoE#ƒ×Ì5r¨ë´âRAJFFŞFE,VORıWAßÙxZLqáHQxHŒevö|gY5Úa÷ÄcÎLZğÀLD7æGzYp- *d"A/*0½aHPX‡"9=ex\ja•‰)“vPlV&q3=v3Fyyyptd"4-ÃÃÙ}Âa\”UN}:±t‚÷¬I±J ?ñÊÎ(,Ö¨)Ò~4J:=xŠÌÃgÊ!Fk+Õg{İÄqAº‹À	GF[Ã8Ûl`ÇAËD]VEEKã©.3j©Ôã`DÇqZÑaAVYDÏIsÉWffe°[ÇAXÂïşK"@©ÅEÑë@O°ogQ	ãFáSrfzƒCmy\{$ SaBKu™Cg)ÓiGHGzõåeA‡VƒæSGBÛ\B¯jOcS_vK}ÿÃKË@vw^êM]eÉ^.p
&`W}i>v3¤2bE÷=½`wÊ¼¥mNaImMœô{ğb~Rd£ÃgkaOiù‡™5QêhsSrÃwÚ7Qü/àÊÙKg¢äözLLXzsE¨Ås^ÆöAÄÉÃÄCEPByoÄ :~gaQÕT£üÍüYVzRk²9l&B!jz0eb~şfQkN'B9ñbNA™IBBQAEenNÒ…avTr£ë~fAdiò#¢eÈkf^aJe'dÒâ×uUw(|
g GrHQK0*óà1a0fKÇDkGø cÀAXSÈt9vyñwA1M"Kj~ï	Êm2¥Qæ°·Î¥xUÏ:d3Š5&Éã@wLUbSˆİÕ3é	…FqfĞ_sÂN5i5g”„º	jñZ!NrLpAMVOHF+o’pJ8zR9qCk…òOâ3¬5ğ$vlIdrÕNEË³øIÿ"b°DšwxWx\kE:i~HyÅMwwAw}şÚÌ$EXhfÅ
RZzeŒo	‹A&Fkqj<ZD5ÙdhVn X‹õ¿^gaz×mÆqö¤[iíN'BêT?bŞé8b/g¹FrÎ@NZtùrÌĞusî>J>$8¦FXW_eèzrr<Fapcİ(82V#ñMFQ[ğı·|äKÅqSÈ]j83©EDE}êÖçhM3pÏoúÂ¯$VGEÁøI§A	B]ÉY\cE>LG‚c!÷3CmSŞJ}P‘[ÿÒu4]w%gmHÿ×dmy9çÓ•J	‰;kS3"sÆÌBC…CMSL'G7ùù|+Kki/1‚S’MVÊoãëET2ecoULY‰jE {aÆQR8ß£wÕTfYF*f— á†ÅEãh}H°ÍIUBOYÅmBSQM~UÍBÁ@ªGf;Ú–ò[{¹|écM4n@UAûŠ.ë¸ +p®JİŠ!$@:AQxM`HÙgRÎ'å39bkq×JÁLTDÉ+	\Qxxj]sO]M5W,ŞjaLÅobñÄImåA¢r`Èi­Z³ @Â)Y%FgEMrç‹É¥P›‘SeVFUvM‡ÚVgG¥QD\j~Ğ.iElíÊv~k>UQß©`AP5UKa¡cX@t=ÀÖ`W)1*–e­a~GTP\ÔFwÄbSg9õb:H%DâZöeH`*)`#w!mMQJ÷š7Äœ*)èNQÑMÇy"nIéşiŞVÚ.P
<9X¢c½c}ñãüFv¹4a}e-*ãY&onSÕG77~G8\m‰
ÓàVWiiæ`{EEpZgpBd0&6_[cUD;µÇvöFV"ÇŠzQÀ_Twj^wfY
Uœı7SXJtc (n³BgÃB)Ö;}ÀVnPÑğuMOFkà*YØy0‡çW!8mmI!E}âGÂº›fÅ
_§ZDuõ…YOJNEx‚-ª!#8w)K'UáÕãL^|îa&m'(j;G8ó"ğŠq;Á C0ÿuòo	!qrÄXcE^^÷:D4ÄÂDWI"UM
+ Q^4DNy…D·Z97aäk…‰a‘fÀmUÔEÊOØÅejbÖUOdEvÆkiAsÉA`WV{({Ï;z¬‚.¢’“01qOnkjrpãoGyaRgS7Hù@—ADTà0xpæjyb1®tÚlÓbZêµØJ1DE4tÁKRßJa!t0h'-wI)U…AçOYbúC”DLFSZíìwhh4jAN÷ ?ÇÁ]yM=lÏÑ`K\h{i$@Ù‹hû@Ùdm#LQRp÷ÊR@zÅM$KMXóÔ‡OZ-OJ FZaE¼u:1P0GnaPCŒ¼NÑ#U	RxuÌÈib\y³ÜÂe{P"0@Å…1UeYIZ\Snk}6ë2K@î6«Jbwá#a’9EÍòrwBwZJQU
ı*)vLW3 LöŒ	(Zle~¡H|âh¸´Ÿ9%c]`R~XaO0ÇÄA·**RD{Ic@WM1PQ¼ÍzÖgphãg_ëË@RİÙÌLYa$W!f>^ô!$[9ábH{M\n±PGB@ZH”AêRcG$ŞÆE³Xy0z^c1;ÍdB@™t¦1mTfgüQÑ1wUj·"Kd©aî^pM2QseEÅxàX0KBqPwyê"ÄSnEQQ	|m’œAW0}Ş =ÙFÅQDNpZN×ÕëNB!_•WyUn`G>*cys|CòH8P]x«w7mLe9’.fhMF²?{ka(tqNÒI8M@9*¾9ÉKkíq-#="Ã´Uèt”9“%±hjEhvjoeËa	š`)E8IB'SõRÈ+pCCiğCxÇj5?SÇÒÊ¡wò ÕZ´uæ+1(kfTé_ÈAxA÷w—WîZyU| ÎFĞA(Y>ÁCÇï\_{CbTHsmE’AÃ¶`Kù¼İv\` Xr©Š*0N(`mIks“4ÊM¨ãdq•MCv~<<`üApJ)sHkDc®FYF%AG7e7xH9Nr,%Cw\kAY¾ lyi |ÏÏVç’+Ï=Æp4CzIÒTÛ¯d9ùEínùËWg%Êfu@¶Šå›ÚszåAiQf`NĞr;D5ñStå;ñÏg-JrPdN{½[Zo µ@eRÚBIÌj'k‹ï¡IQjAfÀgj†JÛ<EÖfA^U±ô"(öQŠEzy7UÜğ"æf
k,¯Ğêîù¹vMUpí~RaRB~Ad÷QÔr7]ŸÀË/8Ë\HetıxFn¾Tr¥gCin~ÏËLuÈ0fbU¼w!&v BÄ_OMnR4Yá‰ú˜ïdãrL"âµ@e7B9F½lrZA÷y_=ôOÓÒ§TÒ9suís¦fh‹æR@Vèš*paER
,jVJªvG|/]ÏÖJ»E@‘tLEC§ÉÌ„g3X9|C£Ç:D	SÕRA2ÕVKM6wğPRÙ'hâdÆ÷"¥e[êuE?Y§©J[¨ëÉl3QEºuio¼!oyAOğVlS]]Zi4LV Dóz(ñ.¡³;qfÎ« U_OUùz3`FN@Q4t†MnAzMcrWzû4'ÁôdIsÈC\Ê²ÂaBj7IaYWÃ	]roÍNgU_@=š#!EP ãòüwDCó·DÃD@6¡ZJu6kÉOxU¶¢ÂXs†AQOC QEád+…(|1tr@v¦‰_iZErI(y&! \Mtın^ZCpyuÃ%uvH.8gQEQxlgZ@xÔ*nwS'Ñ>lÉI;ÆvÉ0Ôb8ÚVNo É # 7ƒuyÉCmuuô9=ej7apØDrgûFd:BlÕIvíFì%^ï$ê,Ğjkøşx+ÀBĞg¥SôOGXTwqt=À·,7‚p·™hä9ój`T4Íœj"(h$$;yTfryFbB|/€ºÖvrL5U¡™Ó~&B&ÒP2hiTJÑB¡s|4 #$ FÚ1cIWµ8sêãúcŒ]šÎP[=ynëöjcSÏ°ôJ;wLWphO#3nR`~obcxwGüÅ”Õ%y9!è+hBµÀÚz?A\{èSeW„DËj{ZE{Zn0+4ÛU£3p¹•ÊRFnBØö+Õoiyu^)‚Kufj%HH.beŠPêZ	JkÍwg_Pj[,`qImciK-qEC åç@©n¢p‹k[NdvWFOƒE©TAÁWV9ğåxNÍ
#(ÒfN^BÑA_ôL¦{7UQYDVQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
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
