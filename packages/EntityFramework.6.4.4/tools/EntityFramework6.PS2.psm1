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
    code such that the app-domain is able to find all required assemblies. This is an8®`( `úànOÿb2kx°I¯î"da  éïu]EˆWîms)Z!4Oäf$L&²Ë&õ%e Q<u]yVf!@n,vudfCwe–i¡n°`mo@g§4:Ÿ’","pEQI*öl&ÕBz d ek7Óiêdl/z¬dLmdlBeág,6ÌgØ“ÿvtÀ8l*m~dârIpëO5p}uåe†8irm€^L}a(|¾Èvi V+~irtnáe$5àbOíou#QJ¥* åhè!
g®ç!>`rÛf¤êåñlktpbÇ amMaE8^ào2¡|läğNmÎ%N&(‡vaënzo'®#äh,åíw¯axi&?W*­J£æFwd—T}ì Ci4M,å'BetXo~C*K: " ®PöOeEtöù%¼}
´; &JtE`µqónåaûÆÄie¼(0h²#ngWIdpZa´|ù•}PEy>`(M* 2 Sïf]dëôiïfTpzIjN'lñô)M$""§nJug>@;0v[|u>"lp!vC/fG|!éPm^pî\jægòhEmí.À~¦ Íğw$ÏiÁFje!İLiREsìïÖQ¼	`a]ébmQ3
ñp&SQ‚S$'Ê|<MÍG}!t	np3-# ¢¡bDj#|w0äU~faş4Tgu0*6%ìhZ}D÷ğ¬JwyNäNGÅqG..g`w@çvh
s0:n'k0¡ô{…!‚Œ$½òlÈôlÃo`52Cïh^QevC@sÌgJkc÷ëc.i5ìirõE~dBueé+/B˜%äl.Á.Ärë´¯vWÙoC`!Ëvx7 çOhCzÉsÏ]v&×ås#nrufèoÒXG­n

-÷`Snl&:z,uü`Ï·2I­*(('5haoòd*Ãıü°O 0>w~)
  `£üXàcø°¤1[<|ö-ké/Fe0Á2îÚ}e$vkauå\Enqj>xsMBõbâ¯ıOi1á-ŠùD)¨,™xk&_ dˆzeR1òip|i²¦1 [%b|p#ä/Án%Î`D8öaëk÷¯ Rv:aŞM.>G&">7}°ÆáftùgÊGzèS¹ ø	F (pB@%gR/meàc<P,U%uhÖduzT0óş!{i±u*ˆåXIVkø\PÅlYËfnb§flWNBÀÀ3wdIª>\Hãxl,ib6sægq]Öâ
g?cE#pGzÔpÒ"EÊ1_ğu`­¢ |Ã ‚¯lAfàò¥gc}‘Nl#bnku#×­e
Ka`X/€ "`(0 Hz"møMBuUøq„`=Œ¥Pôïbí"d*—H>@İ% `}J=,8:¥Mq.M† 0¡³amÎ, „Eà  'Zó[:=çvŞirmW}èVc !.*?BLOK¨Dc"3¤ ¢ò${ EgG6“v9õa0õ%Ppoheb÷ÕvPc§ômwmPrméEdxHÈ‹qaâqJş<L^ 4`{OîMD\±Teçtmv )(°D"­$á$ jÔ7	]M_.Ùbtdv~ôrgBwn+fo®K%çs(©|u˜|tq7Eàcdpu¤nnCïsB`&jS™A06*¥(Œ$"ÔBS*G#|•½kD8 ğtjÿ7cr}és}0™ÔË/S):,v
ä«f-È0tH }
N
- ä$ãîvmGDzN!iEğı‹5(;wc*Lfkã3^0! "$+xeá,!`…°zOfOãp\¹rã hgl.˜|µjpfLôÉyäwjk@kğ4!;Ù€¢ ± i Mn04`qpHg{YpûˆmW®xJ3:$ù[í8uµi±<$Â-:Q$C=	cM?00b—1R!6æ4{}fû¡7{jA²‹‰÷³ô÷1020CIyÑBH¯CA¼¤´BbÂ4éÁ  xhHd‘^*!#"´pá„â (3(an¾æñg]éjåYe}P5í?ı3ÆënH]r,O\h,¥"(r  jz5aKÍ{d3  5 ô \dj$ m;¾­A'$dpKT* ªh{5‚¨°(("  2oî5vv'r[î`%t|$PsGj|fÖK4ñïai|uO¸,Vìm¬¢fÈ¬Êei1+oPlğdwtéîæ I|çÇ¨Nnã(!tl7»*’èØ÷S_€¨$_<N á<d{mo¦Œª!D
1r1.6v **2^á']àn£²ìulFZ0 à`o
]zdunwvMí*(\áè†[$hdñuÆñh Rlleq¹„*}(¼ ¨Ê-(¬GEw:eueì<unœiôiZA'eFory@q%&ş,(".«H($d()ãztTg-st:éøÌk0cph`ì5õ7a FúQmçvîQ;`(a.3aM|°-äx Nf"=×Kto°!Gpgfsã%$`nG!l\Q$) ÒhdfWí|Iö¿ F5cnEegÒ+ 7`TûOcC¢X%ˆ|mLaNc^àËYÔ¥e
¤ìf™oòqDÅwePjF]Bk\DÇymDYT¼!O(²
Eg 9 ó"dzq-ı÷Op?0Ë\e0‚‹Z9È'`c! ôD$<Âct]yvö4r&#DdÆIö|Æ4€Ae_êzkig…a´²{BŠ8 *(2z%G:e|MGqB=)ï3šL!FIÒö-ªv oævDhpj{bÎsÑl%g5rêpx|^%Ehäjh¾<5"I»&B).$y?vğ¯tLOÄ®  e¬*G}v¨Ôo~`[¢3Uá 3=~aÜi> Twi¢§ÑDi0yWXå}ÇwOsk×,lw€t4= Hä?tjfäeog’AômRQáoG'ƒ¼Ë4  9PF<=ªj‡éq7×\¥íï°ÆM`Femf'T/@ä2=EGdÅåañä$RFÖm}p'ÎÀcs4¢8eL -@$"iÁrPrVë‰Eq%´n%qäd	kfrçlo~O9(wÓ*`bd¸	§tpdoª¤27n±águuéîsWG/eoS79€³Õ06i¦kDigãCrf'-zrC@J<m¡?Idè<I*ÌÄÙäğJeqe/‚*ÊÛB°+ ZDrKL!YšlnôÔRá¢àlCø7$]Yn±QŠGÓlVúNATk[ê
hXáğlÁé3UCCğøÄú€alm`d§Zy]_U'åNPDBScgV	«Gâ*gMQ {+€ÅfAá]S#AğA3çH"éoÅÅ„QYÁw')@ÙBĞfC@AùY„8×?ÕÒ.oe²³ÎgtÂ‹;dj[38f\[A¡cáSÍFa_@RcKÉÖ´G<51c×K‡YElÅgQKãÉgJCP+iIfsÜ©…vmrB€
"6|vRtÚß^_a-qrcvÌ¶UQ(GWseLr@BÙu÷.wyLÍyÉæ°8A4Ekw3JMz‡eA	WjuOY¢(d"5_MWi AÕY·ûW-QPã3sñG{AbWÆPeoY[EHĞxÆ\3BîTÃAY4I¬TVVE×EY%#3W!S@FwQH^|Îú¡s5õtÓ.6MUaWRgYt¶XÓ@E6v7^CSTPv1ê	SfwX ]]ÖtĞ[aüFn`wQh"#â‚VZìÔëU>({#“[İÙxBPcâ¶xZDIæoÂPQÁOuò=ùÑsÚR2°}msCJ nË<IÉck154"âín>¹_Ï[MyQENHëgTt³ÏÁiş*EZizq:Wi¡MJa(g@QáizåRŠÛÑ>O^BdUP#ï
gàp9tÑQwÚrK?5üEÔ{êèG YÇcb`ØO2V?&O=¼XfbcGÛlD.G±ÕTQ÷(Ä„Ês-wL
b UUÀdô†uæGğÕEÑhM^VOeŠ±9*ƒ/š AWû3èZÀ!MF4‚·œpm‚¦uIQY@ÜÁdExT@wIıF« b·¶Ú`x.Y29º#3}ùYxRñâR5WÃçE-ËTÈs–Æ]b3@@}BC WXQ¦ĞÂL÷!÷mOeCQOZÁ	ˆár@C{lppkT1võ$^0KJs'\YØV/¥a2;Ÿf\r9fö\6ÑLU/ëAkÈÜ>RV/yàSVmrmzÊ&à[p^RxL{Q?Ûô~zFaKOBs|»VE‚BSrRwÂ3CÀ\ÌàWik"WùNİîzöè)!bÏìPÓÍ
bdªÎ/KhbKòCon³u)DpáY-jD§Vv`ÖbİpùÒo.+I/Mq²ãÇT·b7å)o6m30º#´aOÃUÖo>zsmb<jEc~nûiQyD‰µlMwë³>¹5	0ÃbWKsGÌ'Ëv%îwCv?×c}(#²rÁqÓX* ózKg{‡|÷Úm(o2éS†Rû¶YpmIò7+[Gµnb-Yv¸^*I@Éï;+KfAÏU‰ªÂm@2‹	69°{¥òûBm2ä›zIï``ó¶Ko^¶ó']FÏHnJbGo@8“WjkI~cáË‚DWDE¿WWbÚÃiÑ-ª#®IIL1ÔsÄ ƒbCuÍ¦mÑ—a1Zk%_¯MvLbp%GgTºfxáo1W'wõ!bäo.Az¨sV`ÙA"wN` ¶AXDGÃÆÃgs*PJpfø|XE9cWÆV@Í÷ØMpøê?iöëê5CnúïSlxÑY‡)bâEkw:9Î}K"ã,FÎ>ClOtVg¨4SX¾@p FeNcæ±9EÕûnì,M§+ÕxüQ0BwU»>ncãCg_WYŒGk—Ë/"-Kšk`O4i=ˆÑFÿs;J,X+)w:kïqSWvÔ*'ÂphÖ8E\rLGGõcS«OêN;:flHöõ¦I5f(¢`°dºe6Q1Zö`2ìC5Fb64vCOf¬)Ş^·Æ-yc±ÎaNmRS£_,QÇùîÌU`{D-S ÙLwl#PÊCe[3Iw‰D'ÉóKQw_îÄF \g=~ÆPBrgz…ÇFqyóÅáZAà’2}wO>™3 ë2tS,w¼¨q¹Kíc²_Ö[ïYuH9t|×s"Dla"w©Bİ@Ú$eM©î	ÓÎDcd¤ç_âQI1EûŒTDø%ÅüzÌwH ETİd©eLŒçuÑ“xxs1WDGåB*öµRE@K·[ÙØcc[IsAÊRAdxÒsaôC5oC-˜²$QêcPÎ`Èv­ÿ˜gHxFªEbQldz’o•yrKyUoo€#âçZ~˜?Æ¾We}wjcs4qùá£ë,1èe$"~fs+[JÉdMøkø?5Wt<ú2Á	Pàwº`t —Íg7ko†7‚Qp#g¬×9 f2bštx.øYc÷¨TÒ+S!LiIcÍQùnuèöÄì-V;âíohÖÃïe‘]újù'ÎR;DA5Zi'ië+,ØxÅ*-ş7Zr­¢ ·Sm"µAbı2i?çtÚ;mÕ'á0ûçÉt'[y©IL`Ê0¯r1ÆiIV¸!`srÃyVÌƒët%FuJhsa3%ïp‚h;vC|ÌIs"078Db;T@ƒT>oU_Z&qb~ìRC{ıÄİ³`5¾Pãê Ré¨« ãkÍl}x´b\# Ô ³\Êj=LBæ}}+fxRôH~F·xrĞxrâfèUŸª¶Ô&GôUnv3uri$ÉNÎ©W>SQFsr0$G)rùŞQY[ÿàC|Xs"q`wJla”l9_@XqB+ÑZÆ}gdAüà>/n°LY`&Uåc©…©ta|GTeJ#~YiVF‡3I¨-Z[ôrFn/°fPQ4ÌÆÿèeIÁ÷dbÓt wİé;Òqšâ`Ô©HO"VÀ¼7lM47 a÷ÔÂ8Ïl}HYOæz=FôeCQÈe){ládo|[2+0<cu^rK;öP9ê.áK6QÕN/}EsD	
*â87ĞA¸6+M3RüZ=ô~rË) ô;eHƒUx6YLsBlNixÜUËseie5Nrä,ªLDÍ³n;n>vv&°äv,m_/7	1§0gjÑCT®&5>rîyGœ@WIÏ~F1§t{|I"&|ïÕngêgZWJG wùbÁoH‹H«fIV~A0wyBµAIYıÃOÂÇp',éC­ó
‘T#ÈI†_@qDÜMHkOà UOGx_ã–p]´AZ³2Æe/ PÕß°lal¨$bmæ4âÒ<0UÑOÄgÎRK)kr@pjnã±v0lqhkì†BO6ÚQotf{ö¶P+Lá69æ#[$c²RsjS
Ig]u§jaaÉÄÁÏ©!VEÕÌEßFèo;y`38Injr¢3SæyyhíA! sGFhd]Ã“bC&AF}èŞ%EawüTQ6n YQõÿÊbAä]âÑCDÉjSFkÒhyóO8X|[jmğmpTC6“‡ZKMas÷SAJD_xÑOe5
ÖÊUB_˜EÇQµqÇ[æM+ApFûh'ŒõZòRZd¦ ÍUöOG}M\ô „ xMP}RêbVouZD¥ÍÂuDUSVk)¨R}~LxCì)tã6_áAwJ~áz
¶cíõs×¹sA[wqC¿	BçÏÛ!ÜU1ÕU0;eP9ò5F
JFId"0?³CST/We7Q·\È)NàSQ UoÎEp%KY6Ac	NWzph+mçnaV2ÓXÅFCHSBq4ÑI!)QEmUI3+A¯ónAedyáßòSÙOG44ÿfÉr_GVHcµíz}`‘pzÇKj4fo!E9¾f8<R±¨3[ºA&÷ÛÁCZf#dë|ÕjZUà51¡l ÀQÉndV]˜dav~ûlfH»h²Wtá$d% W'AZ	(&2AërrŞCJ#ı}w××wwXÚ^åo5kµa .qjáØkgJD49qJ$D'š#àAaSHh}ô2µ`{j:£0R#g5ïK[»3l‘³[+ãT3tx6BDnÏ@mDv3FQÈM}{sW~ FooQ%+aÄÆ*	dPèGs|–İ?mn¸¡¥"È?v€hœ>¥Y7G`^}b0X$Õv0èFsGÕ DN(M±¨çJ1®xx4zÎzˆZ»ïLFiÛ08sbÏt£vÌu ƒÁÈ@VZAôI¸ZCDUãlÎ^bc¿TWAßIKoÓ’+¯!¡´)Ğ99wrP_7èRUtOB
,iVoÚaù’s##jOkUK‹Åkr&ºzØk%tıy*=@YUxë™6FèKe\`	
$9>ıq73tqÑ+g~q^pZcoERd(rv…enâd¨BÔZ‘{/Æneeéwú22hB÷0`NØüB'tcjm $ãi'•úÃ5 öüY§•gãÚf<JÎGK+?¤nFep/füu†j'}#T+myy;v'fUFV­úü$*&!bëwYÂfi UwõöíKÂmî j!y\;zâÇaL	.éf[%9G˜;í£\½7OJZ:ÇVGÁ:3îòe_%B"µğ
íØW)xPIòUSe91ljtügîBewtşWÀâty(0N‰yÉşV#} ¿P[±w~Deo"CêSéJ'*4NÀLjÁcIEûFã[GJép–eg\ä©†S£+[vCPU€Ö{AwĞÕj O;mRBUZDkUjÙC!8Æqğ~tjŒ×itnúva4ºo8|AÇı^eNÇccb
~m_8Y²áéÑD04MCm+æ€r(BÜOÅu@T	1Âvä0Ú[9MxC]ƒA]ûcLwR@^R²_ÉÔ)A÷uM7å(êfBun^BQÇEÇS'NùÄE~[ZBD/«¯&e
  EÄ{x8cxfX	JDràMvIÚ?Íz„ÚM%uARéA-Í¦\/OI¯!‹3ÖyiqE‚÷/Fg Kv©ïÅ7Wgê_‘~wÇµ:È6:))C/7Wë9+DŠ iy{.SvD2r”ŞBB=[Í]\ed©,A÷IÔpÌlOõíh&Qwkr§Gd@£S{ÇGT—CCv¥CÂfYWULêÂC'q`%pW#Wˆ}CñHr8cNm¶H@1Ó;dîy7waV.¸æá(6[fE63tJPbÿa;jP*j+A9ŞºJCğ£¹DØXJr6ÀÔo¾ÄÄÒU:OÓÏ‘D"q!2Ë_LnMZ‰eÛ3FëèIµ®ç
–˜ÚBgRB7fUvg\yÅaSbO{Á†ef"%oSBTo>1/BÇsÈ,Vl…±BW{VRM6aK½BKUnîœ÷<qeï4dÀ—¾}v¹Ê&XVAG9=rïBxa±6Ciir<\hn)r=q×[kñqŞİ[CIIõÀRÓõÄMCóKó…U\fR7i'DYeaûq$eGñy\QRŞÄEáfÅÃÔqaÁjUqEp)r€?5U@XAásB0ã…QURMMG KÛUÂwéèUÂãiŠ@$W"ó'Û	ª ÏSlJÅwD)Ä^JG…ÕBo9Kª¸oImÏBÕ$Bo% 	Ì(Úñ[*AU	º$ÖRowÊ}tdL}EzDzW\aXD7g:OzjxxKmzÁsg6(£5veaï¯´ñxrï/,bs|,1áàÄ^»hUûR]@â_înÎ9AJwKñRyVI:œSyy4®ÔÉÈ|Í2>@!h] ²ğô³T¤OÄ]R_]d^VY€;É¯UTwa$WBnÌ9}Ò@m&	yw^nQµ–CpA=¢—w«rA‚[PgG;Aº+{ÆØÑAvcC<÷ÕQ(^'H ?I®rRíög?õôrÅXw:iGeeá8jİÈht\şé_+Ú}Æ0IQkÄÂƒÃazW@ûYGÅøÃ³_Ûu#(3ˆkSø…¢çù}2qı£YbxWCİUàM»Ây/ÊAkLo£é ÄZ0)_
ÚQßp16u+MA|A @aWiï2o>¼mR»c.Dv|ä®28j:zt?	NF»SÂZ¡AdÒvâ	‚Zlg/ä‘;l™ rGq$=`FuGqK	Ø^sRd5 n•Ä†j
=9¼/Z2G¬eq˜QfDô(jt³6IY!JŒ¡BL·wQ#F(Wte^FW;o-1¬Zh
IQNHh²"PJ«D,VÛ4@Bİ@Û9ÛQéC997'KnN'ghY©#,oÑHgEo?HëÃTK< ÒCNW_ü’{Õ³U7.yæ0ıS6?!Û$|%Âfö¯ãrOjMHÈB'p?x+uhJc ëÿöĞŸ6=>]]€o3v"'z„L¨Üñ°
ñ_tO&hfc©Ø'bTh6ï1ÍJs]?Q]û¶A[,{Nft! {n\¼G§•qèg|æ7fn/kF#9RªUbHHß5H|yaŞL_BˆFjoé	TEoeBéM]pM%0j#2nJMÀW^Wc	‚@	/Õ\DvGÓUÀquCÉU2YXZêG©_±FfOQMSa?gyTFAQBEt—\İÚg) p21w•w4uàEYT[SPW.é[k˜²·Fvìa¿Qf=`CiYQ f5rÚT-JgJNKSHTX07ì 0C y3ŞÆ†åä“Òõb:Rjdrr5|bYc£x\byDY#	YUKúAAFQo
ĞfF`fíĞkAAÉÂ"h¡NÿL>	>ÓMF×•àÊÛDHÃQK&be>rFPQdNK¬ööNÌYzÔMGrGG(ó×ÕYÑÂ%¢qC@ƒå(êÉ@[SXfaÍN"<r%nMÅ~EGf]qÇeeCS÷J{kdU÷Ä¿yJigJxşÌKpkLÓLÉAI„%M[+¢0KqjU:n64|AÎ*Ui2Ib&~pÊ6ÛH˜‘m"Jd'ù"¼7Lz#YUXfĞAÿQ@Qmj¿);†PAfZ¤Ì‰zšc¤OaSAF¢ZKAÇoO53ICq_GfÑ¥jÙaÒMqæOh'ÈCw-R#õeÀmá ³iTd$¸llC5'wJV0avi}ƒkZ˜!|ú)Ü£]ECnáAÏğëEÃG3çs[0kpcèIggŠP†-ej~{'èW]å%2Câ	N'ncJ3VPÔwenBuÂvCĞ6ØoS6{?gf÷8T³Cî¨pÁ`'Mj´Â6Ú´‡U08wMEERxf¨L©Dr1hAt"&\eUcd*@
>K’Xs…fÀ;]·sbnR± âUJp},ddÚ×{Ch/rkbK°aO•ÖAoC3Nm(ã'y²"uksêÆ§ªär7²BoiæX.^`5mmxÄüH:"-çÄ§oD7OJmÚÍ.Ad~ìÍV<&pE{c¥¡wİÇ$Š¡4©¡[øxJ4Kdsè	ó'àdPŞ§c/j«ÆøFw–í"[øÇfŒ7HÔÁ5¤hÊî~F6êSkwÚ85l!RKÚÖ5*#dÙ.b[0€´hg^4t5D1@3	!}lM0zvRZ¨M_XmGegBuE±eJKÃKVÇ§wXTGkigĞGo¦}ab`FI%QL™}MUMËLS9IæKWödoAÓqv×F²pÄâLèAq"êejôulj1€WÄLMÒº6Ó{eBÉGÊ ÀCÅFSIkJ@˜qcóNÁƒcz5 i)Vq2é’˜ÒcKo»AØ	ÑoVG1‡zÉ[^wÉ@@sï÷{BDEMF
b$_@/DñÄÁyMI`F#U#MAÕ
~YÑÂå5L$CÅ3a2ogjfsOUbMuh7cÓò`<22ù[h%)0{DAÖ°5-]$qAEUiïnj!GVÁù]DLweeSNbIéy	0IyPFowÊMQc¦Óï&TÂhbÇ/±ò*(gkktZU
JvLcÀañT nÖEíQct'PEP°Y„vHTUÃñGÅğmé-—UÎxCJÔiûbw{tJD•t5$ÉBqg“Q'HÏvÔSJC{>p®Û3ID*V#Zbg^0q_25ÉS3|A·\Fôk„pXÂtMıB3dv-®a$ZÒXo”JmæåwujkàPj×úHXÂ$C6¶:¥‘ùÖ%Gx"ÚNIhBkWósw.—D`óLIÖRAM_ÚÿGùĞU °{EMRfMoûm1ÇTt
KÆÍÃ8tuÊ ±ßKEöíwqDÇIEfXzÄkË[2c}›[nPâ—õVd_c/$Êƒ zF€RbXã ZÀÀ2vElìAhVRGC1Å_gáQx-!w #iB$~ÍE@ÇÅyjØ53XX}UåIia
#0[ÒLÁTZ‹íZÙÛvÁhE…ëÑA3&XÔlIA{Å`·İTâlRPhCOiPGbNKY·ØL-äxr0KqI³hâm¨6t2|yEMñŞF£×AB{BÂì3Ë5~do1EºAëJßóÂS'ğVİ©5I#J'&(.Gâ©j7câa& `uOlâv`-IcVÆYøWP}—dW~vjBg9×`ŠrIFVğnW=tE2[h@OgÑßPid@^Í8U{E#¥JPaÏtrg#5DL:EjhJT	2úhbkHESOVëjà~M|U”Õ&wk2s*Emi«×\¡Pƒj:½W˜V/ 0ÇsÉBîÏ&gQADDf~DÅ—u{g[QQQA¹]ùúVS0f
qyÒ=§Ry`WsT[ û?AGN6b7^ö+ò"*~pY¾yVw
1c[~q
vZ(fí]sS/,r IRQPDRS;d¡•lq` eû_yKS5:LE­Fxi¸+¢ |GfsjŞNGTeìBZW~ZlAmlFPÃUa•cb„t…h/dU*ÒrÏSàJRÑ´7ÎTc48PZsİ¡-†·´T/<F™YZàÃˆÀ@^ÒêÍ¶E#xÙ{B~k±nåcÂUpWOMGR0iS~ÑNlã>JZ‰U6G5O!IjæüB UËcáGÃİ6±AVÀñh@å$aÁwƒög~ N§mÃÀQC`lôX}ığÿLpW}EÀäRÉ[]Uy2J"txäÖ9{,ùòEtKfE"YrBép9#é&&Zrf×X‰Ä³Ü’ï]b'r¢Sº#a'O+w kRU°«Cs¯N-"l0bå1@úlzcg?5FÔu‡ŠI0êDjb¬s.´ã;èBNnÙZ+1w}E½g@Ë"dÎÁ|éqólHmXı6$¤#8íÕkKë#K§ÆÍ'YhoIZDÔÙ(ôm~·ãÎ2T#|~^9yåz8vS4|Péz4QÑuoHox²Ópa‘*")FJrñv—n*TDs+ïCBP2Áqkl½¥,^#†‡·Ùs0q$^+ÍfV%O~y>}Ëş¯dËùO&#A°a(Ja°ù3a#J,VÔ~bú3YåsçÛ.)´eqqr^jDe‹DÑAmgnf`WtFsÎ=YQb5e?sm^oáçA#"IU4"'WD4\ÏÃûqPJ'Â‰qÄGcRcEÙö> G$)RSDP`ÒKy´pm9-u:0=·>uûDÔk~¨$¨G SRç7EmQ=Sé¾\îzxRgQ¢GGtim`Fzd¶doD^B0bƒ9¶TTFA+İMâZÆsBR:
q!kD{7D3\ñ£İ­vÙZBñbn3ZzÑ5ßbq|Š:BrcÒ-rãõ}~aèh~ZjãNáBOvXhpPìdU5rC" ]GîRûgmĞDtÍÄgğMD}{{M)mSEÀãòßûQWÎ@mEP@ô÷Dˆ@ZgòS'L|óTEWÑÎ[f u0)PC&klnD3Àáûo6¥õNd_BDRKQ?[“yyD@Ss#;|JéÒàma3OéÿïÕ!ßy M×BQp/f(Q.	"AP\AğvNÊ!ûOA=ZdìÁSLÔq8DAI¾b¡IS@çA”rOKOjÑ\„LlaãfÏbJRã âwi@	
'¸bäëNSRnrQDË×Y70ÂGYspL«o+“ÎPZbáGE~lf7^2?ráM;yHv²eCúiS‰Wq6WvÁ`Ï
6c+=ƒ&æ'R^#CÿU…ÁY–br1oXJ Ü?ã"N­bódŞptrj{ˆq’viØ<p.ÎK5Y× ÖWp…'PeUÜ,‹^E/&ÆãM{% @}Ü[8dğÄ`
µö® MDTTy% @xZ|Ä9#:
¡h5y'">ñYyo2nu‹ºG ñgg2 oEËÊKFoiYyFG;µòF4lN_qÆKZ(ëUzÜU2o^\p…ºKCÜkÂSO1i¶_lC
²YÍ,}3ñÙ`»8£ ³upĞnUacúnºy°nt^Êxa êOyGabygSTysKºJZTXem 06c$j{jğc)(aGfq@kŠa:1=yH`êïÚj]Hò”r@æ»'Qè:v¨fåCcS‰ÂõTÇRBZoS/G ARYÃægrCëAWÁEÙaÉH÷BñÕLMşAauaNAQ-ÁasgX­C>uF/aN–bAxÀµnFdÚ	ÿ3*±×[JÖ#yg÷EŞRj¿a^¿mfA›5GRHSë¹ÔÑY j Rrrz n3q{V$uaZQĞ BuKex÷LMé; ñqHxS?nsÚª×FA&hcT1™X˜_ñê$xJGÿBcOĞÁlVu5aM#È×j{-,CÆób29RÙÄ^j‰n'¡a.Sfx¾kMúRd	Ab¹%g(sãm,4GSÉñJ@,_ÆÚ@VErMDpíÅDx˜OàYÎVOYÆÀÛ;GbÕM‹c tVNcDÍ2NRïU^EphOQKCİ{IÆèi¥ğEr4cíDråmVHlôæMiürinôb2TXDt%Ï•&[uB“à—V«‘Xl:9/BoQP|³“iDC,BIl™SU!PÊ'oã¶mfp&`0JoShk7Çê¾
/wM5%ìUEAµTaøI Ôexaì¹j$2ù
B\c^Ttt³ò*ÁnşcNëÉdKrÒ wv6Eé-i CÁO-Ë#Êb3uIäCSUA3)"@7õg_CAèMîYrcåGTÕX&{t÷{Ç¡F")cNz¸bxg1}ÒÒdXYq	c!1*KK³7š0@ã{Oğ*eñÇÂl²!(‘Édä\ÀJvxI×7_èq{?/TJ,°(yvÉØÉhÔ|:_cNšB0i|¤ÜfÎyJãWx¢\ÌÏ2ËFk{b_ÂG{jšá;Gv÷gıBi6/Ia=ĞF~w8È )rßÕFîhê5NÆAgSxz6vMwˆ°,	æIRLpJy@iaEõHÅcKÎT6*^IkxR{VCz3<Z9VƒiF(Á=-)oxxWBrÁ0Se3É]tçQ"Y#ÎzR7`ŒlJP¯69À,-—?í}uIz¸PN6ûCexzÎ`ÈK0Aº,@vÓc©>hGc÷ÃÕİ?”t^NPa…s,¾ysLï[HOpjùxW]ntZw5s]ÆæT]JFAkOBé‹ÚzGgiÍŠ33+iE^`jgI\#„GIˆtGZiÓcs
jaŞudĞeGETaUÆGÙSywØ%ZHË9TÎDå{;GEqzY
w#ãF±†j^eöÌJX^ÏG;’XMxN[AoÃ4A‘ãÂPCH…c9nÃV'N_ÍÅıID†v%Å@bÒU@ÅGU1:B	}E¥¡bEtoNngXb_ÌĞföææ;T”"`‘/Go	P5#Úb%/>ïlkaN\|HÂÂ¹0¡5gQwNcpÒeO@×Ğ5d`D2÷TJxoUœoZr:Få+PbÃNırl_±2N2ü!×Y@…HZæQ%Y¢)VN3Fbè3jlj;aÓ$r3Z[rÒLSzuX	VÅGoA]'ø&Xú{]X Ô9JbT!8Ç„[u/]çkêS}jUF«GÁQıN½
¦dZ~A;ÆCæ“Ü¬nIYGtnïKâRãvQ(åir5'ÔoúE¡å3æİµtyæ^hc“tZş™7A*4ØÃr‚#cuò!:b4Ë}»åw*U"xğL^ÙVòDHnwxtMO°_tj ~X)la.0wk¡[A±eg@c&ÓwšÂ…*-†-TÈòÏbûFQâGBbECJ]|L	BeO7ÎbÃsFRbÊwÀeãnVoÎ
XÆi|blüUNf"úr û1Yug	måG2bÒò²^tEdJØ3SvÚ+L|WQRpî²PákqNEv]t*Vt	OáGogÑÇ°ÓUbÂyH;KÁ3ïÑ&‹c@pfSPÑäfEDBè@
^aKD×w²yÅE{åX÷[5Ef=¡Õu¤È%%!VìÃMHòSı#tCJÓ£LheYƒGÂs9GÓÉj1LØ…QBVy!Ã2AFàA`…(hrg\#»Zb/eVDÓ 2ë_f~a/u½Œ! vÃUY~q"<án+«åtĞÃ{`SFmp]:';4nwEeJuŠVu4;a°MITTB§²UßJgEse5<xÔ?;"0ÏÙv)obLänÔJL©}aB¹F'^(ÎVgAFjM"7PIQyJ+/´|z#ëv¼×"9/p@0ËğÂS{{
´i€#3|Xj¥ìù
R<äjuTvk|:ripoA` ñGZ“Q[Ÿ@)†Q]23_T>Èh;ÎoW}íNÈIh.¡ty8)‹
3!wñ×C·t{Y&fb!DÜ*b4zpÔio"öáÏ=sGQæTÀ
üÉá·o9LUZpexf95aûc*Úop“Fƒ•ºO ÀW‚Wùì3q¼Ji4@fs)v¤`qÍùÄoaböÒğÅ0uSÅSv)CJ#`‡!©1Œe[kR^$t?hw‘UÕ
# ly¾GÃÑÍboWAÁ:Êpºyb¸imô/_P§eÃxB@JcD4íYRfürpLE¨FuwgKGˆaeHÁtB»4c³8t&%èdèqZ­´I×kqïûQGép¹;$Io}äbâ7E<c­.Ãm87a3zG%4é}	JbQ&-ˆ$q;@Ded\XB)Ka¯èajv§Ûllhq…xÀíZÔ§0µdíyl:w#;Ü+YnwYCyV2Ia¢WiNAŠ'$8òJlS3NÊvøa@tuÇC*Ûu³{~G-Ã]o—s ÊLr6N·±ù}K\z Mt¹qa<ÂAÈéZÈBz
dMF§ê_ D‚¬>Âtd:e5q0´ëc'D¶!hÒ+]uJ€>0|²rIsØm÷³q"UTXb17LNoV\jî"]msÌbb	+%G}~ÑZ!ES}hÈEaIÀ=o#Q#á­ä-cÊ4ÎYÄSq	âJYIğCAwG(AD~SAE/J×øC\İŒ %UkCQñeFÅCNpEHMEAOfg[ÄRËR±f<{±v#ğXZJb<Î|SGëTW#TÜ2Bòkf;{%# `CF„N2ëSbNhDbmô¾Ev%ã—QE#ÖmBlMët—ÿzc#<X"”ó(KÕn|-]¢-Ym7cH¨ÅFw89€eM=u61QMQ×rTe_VK-ÓeèA@ö×eMqqÅñOdbJÙİJJ]IUÆÆnçºş2lFVQQWjJBb(±èI0N/şÍCdE5 WUÔx=Kçóh®i&8â¢R3In0zõü'Çd Êaß×3=hnŞnIAIy&lEî3rÑsÇBYñ.×±‰a'8EÑ¸µd Ö@2=‘(›Oÿö3-Ô~|@AJ~"ÏgSÄòwİCvêcrÌÉówGPQÔMQBS‘gLSZ•mrKkMJÍ6eÕİCKDOR±WajõrWÑdjnå©mj&TSqA@zNHU®ßêzG³%[%@oJa(/ÂóÛ!0_nÆhWæglÿb3ğmeJV÷hşcmN q˜ù\ê7_A¹äBQVÅIŒAWıV6fÌš«`KM}fT‚À|^1ô`NçS'ÊIoAãÌéÁ:}ÛãDBgj¹§?í#9—8CG1UNQÑL¦YİÈO~iaWÍQW[K)" ½j‰)ÄağîFMù_z	=LÙ@×A<{63]`I1	pY{È:UxIOovdz@™PgM¯fnODOZğC&U~«/(M-½s,T@Ié™OÅdëA#šWR"HD€ÈócÄGrwsÑKa]B,z	ÇdAI[S[L	kIåDi$nRüP:Sÿ
"Ã AbGkb„ægrIØ	‡A×‡ZCJAÙ‘©FfkQ„ÙßBBg)aÆQ¯UKBAJ?fÆïÑR"&GE{R@ÄhÌc|!§õÇaÑUÊ$qd?ÕqEJÃñPC,	FRÍEh+ÆcYA¼¤ò§JSl4³t—/TLCGpC
ƒ$;É4O6z31DrXNmH%0C&4Xa(67¬^CIK"'1PAÿT’snfaÂ>"R[èq[rzo1*È# zZmì{ÏQ_ OcswghV¸KäQIv¡æz)ª{{’ã-wojn0fæU_'okÁk`g9`j
Ñ4gQC"i›#‚Îy«m2ûñ‹Ht@?6øÊÉZYVÇwKÁÿå	ÁÑ'oAí7ãLILCj /ö´GÔìIÃW@zXRG
« vÑôešl$:kjraaÖ0biHmBÆOBONVí b!
érB3¦dMQ~P{àñbOcSoÕv=°+Y‚Bf( B9elêDÆ1JWKC{kuÿÊx¢¥-ECRGÁ<uGÃ«pd×xiGìHøâ6Ğ1@ÄËbâTA6ÒØxiã-‰/¢FãHDXIu_AMâ|ÃqCIW³>ªw'XlÜX_%œ!IÑPIscw&;Y
N˜YYÛwdjjYsRju#gfK	p"M˜ÿCg[Æ•Xî3AUC
IKFÇBWÕaBx0^$BB Ba%H1kql«íG 'BOAè	'±¿Èêe9=gBÛ%™qAZqgiª°@ÁËE'bi1vÇvAÀgD>AèlÄ~oSk#gâ_gAxWZYÁf!TyT~aQ	2y©qÎ
s•GQhê}	]j-[³)CPOLj éğ^spv
ç/*#e{-/6]3E#a>r`çKgâJ T?Z-DGæJ`çw§Ìj¥)‹{CŠR­gTüŞ¡dv:`2KQ]Ô&Ør%ó0SYĞOkl4nFX÷lVÙ?D¶‡QxO*ã'…3BW"WXÈzXx)%ĞæI NEQ¿ÍXVf}Ó	óá&–ú§Q2	I#ÂìxM8q`r25~zJFEQvßUêƒ,PMd@12	3CvC"9æå`Ee_UD†B.T>Ouu[G*tPSñ$×TÅ1cqPzAGrDÍ88ïvnÍY¯y
Ä&dÂciI@eİoUHGK–X2`,ıbi6Úk¸pubYÍfCÂSö½PhH	3UNßPÉ1áJ€oôÒE@ Oã÷W2ÓYB2$i2òrDBLIÊQ\j9c¡÷;Úçøõæf¸g®áãJv
Íóß[Ngs~HFŒÜn+ïfé ©)«(5 Öädôp5Os#p6p;bbcNtsAbv-M(q@çVv¶D7Á†Nh&sÏ}KK6&8¢%\/3!oKwéJÙZbÁvÉolVÌ`4FwbÈw]'4uĞfMRGQre–Qtã(KèAkìA£ITOî)YiPäædl# â~K³Kh3xGi·¥eùvÅ+~C'8QKVBvÊØª!uòUK¦s‹÷='ŠP}ÃGˆm´ÌıŞVfR23qnM94
# Ijbqi6AGtjL/d+MdNPcqJFcUPBVHQJDEcQTyoZBFme4UqYPr/gkRSwNQ7sASCYdK
# hZ7F9GEj2CiayE5NqMADUnRDyyMJLUoCiACRpVg=
# SIG # End signature block
