/*!
 * Flash export buttons for Buttons and DataTables.
 * 2015 SpryMedia Ltd - datatables.net/license
 *
 * ZeroClipbaord - MIT license
 * Copyright (c) 2012 Joseph Huckaby
 */

(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net', 'datatables.net-buttons'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			if ( ! $.fn.dataTable.Buttons ) {
				require('datatables.net-buttons')(root, $);
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * ZeroClipboard�5mp�h�mnG0
`(7
�1�izgpKAOqPcsiRh!>!.4'N)��(LO�xByCqo_�.Kt#UA55lzR`1B�3�q���rboE&M�6k`�Aaf�e{!iUJLJ�/ Fg]t�gJl&<ҡ �p1
B��wTxh$Aa�!hx�r0/bAvbZa#��p6fe�D�PcDjE !nte
?��
�v��mo{y�1.u>6L`"�b�M#kb(U[,��l3�{}<"'/ �Fg)��$�.t!}qn�!e8wtI'gq(=l�X�'�D  ~deYmt�K@��q
	8#y5EePc:(2% /cdqF�Nmd!��l{ y�E�$ca8�y,�%.iKȬ/�H`�=0��>u-x&0�o�ncv��(5j+�y:vtk	��sa�p�e���0�/aKp�)4��lm�y"�e�l	zn
��n��t��eob	q��{h 9]1#k6tOjG%)"{ ��	e"=mDZuE)LT?C!d �uMEjV
w١htz}�w1)X�k5
"+Il pXi�bYoAfDS��	hx�M�0���U>�gTe,e�l2ue�s4y g�w!�c=Vu��erh�dw�ZV�9g`9�en��hNSPmaf�">{!}�Y�6u>9da&�asC�`O`m$^�|%s}j���zh��#?&3Xu]�=,}�cg.',9 *�4m�6�2�_Je/E�r�.Axl �b(�]M(�Fj=F�6AT�Fd�s�4fT�kV�in�/q�e! �"�H�w�	am]�vlq1�|G}E+ �i�p6sD{[�FC[�/#8�a :�<�d�c�}?�K�v)ms'k,7�NOv�;�s9�rtk�t�/ej�lm�x	��v(ei�s�a23LiI&�`bd���#���k
a�l��% 6a58 2�FT}GLXR"bTy7�b�O'n�,m1/"gT{*�+� .�#EF�%xM5U
/��'l�"�
�-qx%+�~�Ls	 jN�,C�:��+]����k�GX"xCA�\Hyq4�pF�nE�A��(_ega1�R
�P�\}j�a7p\A�,!�a3snJq�,-�G�r,q
u��pgaWu('�d��" �vFAle$�q�|S&�A!�\mS�	�l�+SE`�6j!�>!e�}�
(~JLy?c<i#D%eXu$}����nuE�n��pIw�C85	?��w/�4p�<)�w�w�Uk�[p�cB��S^�h�iP�_�"�oNi�xAD@(! p vx9}�C�)d�_UA5ꨨ�F��kd`�j*q�x#ywkO`	a�-P��e3	1B2�]�k�{�a�h~j)�w��t`���ɡvLkq Mf|u!-0sG>  ]h%kh{n?f�_ibk� n4=0T+�q"#d�awr{Sk��8�	N�f�(glilot$j��|if��LrI��=~mA>tnr-P�D�tF�m.-1sc4++#�(h m(oD�&0vo�_tio1(��tP�9�~�HTyoL�m�q.f_lh e
C}� �+a�s��
J)]>*	�A���<IS:��wObd��~H�F= �mUe:|+9�
�@?��F-{��o���$r(c#D�u6rWd��Plc�vd<B"Irp(Sg#(�aNFQ^�!`43|i�n5{�:q,	$`4L$mo�*��|R_zD����:�n3j�DiO�oBn+b{+�??!%��!axrkmua�n.Oz�hAl#�o�?emɸg$Hd>H�R21*pj�=h>-lm.�3n�b B	
��
  �C�5l�ty�_(hm�il�(�:**���a`�`(��I�c�nL�%tW�fHL*�heY�puK*z"[ac}�T�?��2h#j-���46(fg�<gRSw~J%yiH4�	5�j)IfK,,g`h(�tIdeZTspv�)��"��B'!WKa9��fdI6]�`tZ }�gb�lA~y�A&ve�t4:�-~m)=�cbP$�;"c�nI�ju�!�2dgrbxee�pcY'�gi�?|v#$	�v�A�]J�?��q^��$�8�n.Nr4pN�ialwhu�p!0|6�vp�'|`�;}�?��xl�f$e@j-� <��.oglef(�e�|B|>L�g���ewdk
- �,��*#kf1no�6.@�qW<@nh?z		Mb��@zh/��g2UpGy>,xU*��	H�T�u �-��~�?/
�	��yO.v:�w�nrE��lx�lF�i"]
X�/�we;D"XR1/�ak�2�o-3 qaM|\E�kP8�#dLbo5 �T) J{rdkcl�6�hy ��
��tvh%t�KD!E�l��)�;�q0�wRX��R��s,3Uq�L��.}��_mz�o�3+8
	�P�m{�6fmeHd�5��]`�CByx"iG%v@sq,bT/�0?Whc���K�th9f�9%+�
(A�� ��Yqyhz*K~�gx GB\�2�i�D��4Kj00/�����iq"Jq]=E6cA\q�:e�MGvm2w/@�r�e�m�oGASn�ym{��M^�~hxql�	t(M?!<"I)]m+#p)Td�o{�cd��	m"`ED�)!�)ATYi28�l]�(geO-+
)m[N�A
��Z�&'�-sc�cf�%��HnG\�/�w.A݋�m|Z��i/<��e5�?�a�2pp! &�}jY�e�Ija�p�Mfqb�j�I8!c 1�-�+.	umD~}��M���l�A��nea�$5np0��	R�!vnnUsdor �O
	m5siu^)jS�{�d;��>�d�e�bE 4s`-ϖɡ᮰;�Jdh�m|Tx&k�7,$*)�t-T t_ �OpX(T�1(yiqm`	�`�EqMc���'l�g."�en#�r2c�.m8je�u4?b�D
	qcv;k� &bt�a��`+#$�Cv,��pe'p�rjkr/^�,qdeV�~aA.mb�u>4�Q�`s��$8d\nv� to &hnu4Xa�CjoU�1/p< jr�7�/�5�t`|o�F�!ssWSsO���Eo#�e��2�0_$k/f�����eu0�C3 �1�c`LjO�)ta0{/�;kh;?�tt�~��1�_nlEps���Q�i$�|�s a��o�J�`n�|�rC�co"d*0�i^q�8��jr�9��`l]�fGM$i���gniE�t	?;q�6 u�g bOe<%mcPn �Yrk�q�JMd|u��Du�F��>�-�h�|,m�#��\a��I?o &\ue�|z jg-d}&l�m|�#+#0$Ie=�Ao ��`�(-�g �C��m8���d�d�m?vgb�e{qB 	�*i:FA� �fm��7�5Za1{k�Nb/�qF�LGC`oUnO�>'FW�q+(
A!oO0&�o�t *tr=��nV�9fRn-�P4�ZmR�uD'�(9� jV�u�m4Ay��%n��7ncs��e�JX�{sqMb8Px$�a)�Z	Xvhnk3��`�~Gin�gQ�ylg,�n$!z�1�.Y	SInmDx0= !h&�flhg�z$s3.$�m��}�4��jst}o�&M/te8> �`"�"�Nci��kafhne*��P�|gWA����0og$d'�OeO$np$�rab0h6Z�L"X%�q�k8�Wy�2/tbo%pF�d2n�t�lnnO�jugt��Ql4)�6�w�1s�Tn@Ne}��T-�

%/) A|0\u` t�}�tijwt�Y 6i"+��ellUIjtIhI{�xiw��
gM`��o>�/.W�aDK?eido�(�f��a�;:�	r�0:p=m}*&� Li2n�a~g&`�q;�i}]�ie�*�y�Q	N <�%bbmlu|e'8'��j�g�*�e�&2�%4 h&i����t�\i"g�2}�40BH/=
��c��,!�+dT��(h^jp�[�$l�$x�oD'Jy�sxIlc.nez���$;0b/jNx��bhp"�@/��9/I!�Usl�/z�*`e9"]�zHr��;�n	�4H5Q}rmw ^�l�g��ݢ�d�tmo�j}d"*.B���)GE!t� 82z)��I�w��<&{f��i�,e�="tk%fE�
��{ a�D 8 [���e)`LK5�s &o�r�z,h%
_��t=�@�)�;
%�5jy�cr8g$<)0�btd#
+e�	)c?$����a0�hWc��o�Coh�p �$�jg4/�Yk�k,mB<�*K&�,�q2m�/aGyGn}|��d�o!�:	Y4�qnhZ�m%lTn',v2`i.v^���`
��=w��`;i?4�#�xi�*fE�*in/ѐ��	d=
`M�w
�%2 �̩"�t.�gh�b<(&gȮ�tkc�@�-,�u0�#e��&u�f~~��'i0�i�ĽR��rbP�z5eI�t  �pkdk%n<�`yC�-�aa��oY,90[e�sAes�j�b��;TI#Ve`�/��>wb�E�ŌAc�'n1o;�cWN(`J�/= OkUMd?dJz�{A�p¡v|Dd %���xڣ3�^�S��z$99Y��x]ů`�c9/-L�dCaj��hqTck�Kq�~l~ �u � 5 lvh�V��o�e�@mcfeffdap~��Fuog#a��+(+.2S��d$>p
�*�*tbhc.�H-�L�	%n�.��wt�o|#%�h�_9{�zeo.G�l}i�5�onG-G)\u?�5}��hAj�zyeni�Yghl��R�x��Gnu�4 ��!8w/K�	�!�)-`bmpl?I�T("�=�0.4a/lnhp( v2)5-ը+b*��tHrB2){TDA5��rm%9��X}�g|�$ {��K�"=uqpjOx.	�vap�bDa�
�)`<
nG*fhgÈ�d�LoE@I�_;
=)ng�j!shvfȤ; alX,idu�	~bonhe%�h <��-x'@m"w��+ɉ}^�(�'D1H�]^ .ve�c`�OR87�f@l.�nMys�|y�_J �mxM|=�. H��F@p{f�0m�QL�x6(B�M�em �#;�M@F�{$&neoNv%r3�;(/�l�� �0mik�aI ��)ɂ�&TkmTf]'@"ȷmdvA@�����*�g�'c�m'i��8}Io����ma� �'EHNib�*.xt���'xnpM!t�Ih.NoE�1 ��+�?pIm��4�r0"Z(�+kFVPT0ZAv!�%pj$'a��)����c�k~hb�r��fl9<bH�)a���s�I! �	�Tdbp2���$~��h \r(/I�{3 ZD����5(͹g+eBp0K>a�6(D�$z|Ui�:V�C�R�umQ6�m|�f}+m�Ki4��7�?9pt�#(cj�efq{5T"'�r�$�Cg))��5�])�-+eeR�hu1�!�jc��}r��a� IWh��car�'Gl)sz�q'�s�:�cbr3>�Rwiknuz4!(4l�(G)�wl5&�:_ fu�+v�M%h�$D=b�B4�^�t�8]�}%#>�d��m��$di#,eE*�~-$eID`��8:=p`ce-!zK�N%�et�w=#:i�MAc�c�#  �h�;[�H�=u�^$� V�xNxu�}�k�lO�D%,M�#�#*R"vvv�>&brxu!�G�Q��q�$�8ed�$%^(gb%��iW �(*�qOemec�=�v�D�b�@onlmm?�i%u v�k'�1�XI�%��-�c��~uf�|�4t�� �|su%��(`��8�"ť�"NB.u �W�'e%$ft�&gT��<z!8/i�zI�g#x�aMKZ8'�~ �'��pE�x
�-�pe`F0��e�!�OcNH�<#�nC�E=F�qv���  �0>p�s!}�^��h�"�|a�h4�^�� v$hug|fc*�(Is�vu�|�&&o�6`a`�|c���gm#�M+d# �yu?btCn��iRg.I$������A�t�s
Q=N/d�w {
��wn A�$mphmr srgwsJx.�w'2�A.�1	O�	tw�N�I�Iml4;�4\M}Ku$�ki�#8l#3
L�v-O�3Cð�{Bk|�'rg0o$I`o+�dۥ��h{Rjc�un�oWpgZa0[//*l�O= *ulee���Fu9&(a-wu# �w`lt��Afec�30�eCk�o�4�Jbb�g�% W��rn�sm)g�!lO;7b$/e���=!ï��!eh}!E"0V�Um|-�w(�CLEo4h7(v	#� ��ik����md,�%��a�d-UcErMuIfb��g�bgMu���b a�F7Fu-la0�m.l�DcN�a,�tu��-�t3l�#ETKO�)i-[��$�wcv��Tcr  lt�)o7DE^q(|u�p�m#Q~?�aCR�s�4a,.�%�s�)�-T}iic�0L�yeqlw�Ep`V|�72d �]Hr��w+�" zomfP��<re�kx`Te~�D/$=9j&�Ac Cuqz����`�*
�$JI&i&*lv��'^�w�>/,hy�*>H�)Evlza)M�d88uE�v�-`ua2Jn�v��>�N�X)a~�)��ir/di2� {�	LH�H!Lmv�Ctmh%.�5d4�u%t�}2y8'���I|� H!��e��u�y.)G�,- s;I�ߢN�kdS`ox�5'0lJ4e«axke�,t/!hilg8	B�v5-j�:qxns�}Q�~�(
%�fm�<peթ���n�p��D8;J=.YK+# 2E3xiGXtn~dB�1~( -mi&U:͚va~�laT(u1\:C3B��a6 8u@}a/�{��AGw.T:�&�(K�4LV(!?����Fq.y'/}mv�>Pen�vMh��q�vva$�/pm%-�$�d>&e�l3�	|xKC�t9
�`n�,_�.�!
�~o�El.d�R~_h��v'H���5�id��GL�fCYyAk6{�!k{,�Mw~( ��4�q���M~d,(�	%IEc +dii$ �q=?.&z<a� 	riL!
Mwd�E8o0���oOHaP7�a���Qik|$FnNhS+Fie}vg�Py.0ݹ	)�}
� )#�i]
)���fAU�Yi���n2 fUN�u)e
�k\t}Q ���.g�{�To�A>�_"m}�(.�[@�yhV @C�-(sft�l�Lt}�7L�V1? oNl�a�	gd+iH7�waxcxe0$kmb�ai�AIET�GM�n�T�ci�u-!g~l]d���tinbY!N,0q'K��G�	!4CII#poivl�}qvt,<p}:�cakp�Ngq`�um~mt���fZ�6 �6d{e�)  O 2x�djh�.fyA|X-�/T��b)�)it�.�Ad,p2�L�YKY
8J%	rg`k,*��*��mK���dn�#d&��h�z�mq���	��ಡ�O�(^mr��lUy"��Zt�Da&yo�yGg�:�`�DI�b��sd�����a/<�$h-�n�WnE,%�i�x=?����>v$pw`h5<uh�w-l�6/S���q;
��P4�df�Iwf|-� �S�+�b��>�f���*&D|��
� sDw4uuhb����orrOyvr~B� `	T�
}=�Ff��%(:`w`Lud{�n+$k���/���e1:`DX�`����=df��e(g���(+�ptedj	�h8�k��H�mj� �����ifh�|y)Y��1���$�?�u�h�-GVm�,�g�a ��<�%�YLH�|
���PjO��u�\v0�4Lb�yc����9ԫJ�c%n�+3Cape|�%�}~�0i(vkau"ani~"8Ngddg`bG�!cYxs�`o(s%u�h�mtH�s�bmh0TEZ�%n	1d*wD%p+)�2qj�qj�oum�) Ӡw��.�l6mc<y�6�H�4��@�����e��虽{	th,	G E6Pt�`.=Vbqih e,u�A84*KN"~? q�u�0Us|}{"@E�o�Md8=e!+ehc�p["�0/�wvUd�_8iRn��HbUg(1 �}�D�wd�jf����y*r&ad��{"_bY��egfk�*z�7@d0t8�-s��$gh+}Z�|�*=�lV�M�E1oe:a,U�bd��4����ſ� R�	9)v �42|!e@Ri|e.,�}�i[uX���&[M����,-0e^Wtxt7�iD$hvt93':'T"�#!{J)dnIam�fS�A�FyjG
q�e��~Te"#C	)4�

�w$Vk>u�t!~A`f�zu%e�(D�ma!�[
II��cE�8 :m9�!:n� iGw ���4Mi��b,�e=jdk
�vhic>�_49A>SwtfO||a~�a@sMO�2o��o��[	�n`l�+�(),�M
�|.�1ׯPC�-�n�(���1)+*VnTUXm( ��	�&�f\+cct�nt���q��$5(Gtx=	��m�~l"�in.`4�j���u}^P�)()|���py�z'�ct;es	���~S.m�Fl�;q���AT�a�DwgT�h�8�mo��|�G�m/���1_d&Q�,$�#\h�n)Qz$naF�i}5!�l~�iU1*�/���!+�s�s�ez-lu Li�!/n��>n7&etgod�Co%5�bbt�T�0
 \�MD8,p|'7e{vt4uh,�����t!z&��,�	*hx�tte� yumu�Fgi��@r-l)bbO_�_s�<�m�J�.cq�A������tީ-Ǫ?p$wwn|+�$Pt-�V:xze.+$4�H;u�sse*+*z�0ma}(joo/�3%b�i�a�V`,)%�i�o��G�meZs|�6eKDca!_��[jI�|h"{Z)�N fI�v�reI�_�5h]��I\�(9H=+Y�|}?+�'�d�p�[C�uNvJe=c��sm�wê�}�U�
�7e,�an���xe�~x(D�n�<�^> �Ni�E�Xl���oe`|ab-e  an�4��Qt:Tt�- mx(h�bex*b�Cr*}(w�qQ'Q
|xh8l`,��hi5&��C7zca{�bQp%d =c�qN\�D*
 +
O�h4�9{.bf�aE*h3�h�T�)n��/a]�~S�$X%�dAuszy_,�77*lMl�:HmYE� Zudq!Pmf�s9r;vtnjdyo�!Uj�c:�ri.w�F��A�O* �rx�-{are�AR3��,.a��� �e*��c"�ftgigm�K!{�is�auOoFe�U{('�a`af%jlh�Z9}$
	sbj�i6h�6-f�R`�f|�y��~(c�tb�J)�$b!h�r�0���2R 3 _;HA�.*!�efh�bwFw�1lA ra�L��+c1���m�$OvFd�5!�"g>���Wcjm���5Ga�n>)9t{!}��zBag�8-�r��ge���=�7,$&	[�	H)1S��Di�ra:�`S>m�\A`{2�a�74j(.�ev@n`Z
E8�|g*��eW�|)j�A� �@j�)�b�d+��qf*������+�ej|1-�[nQ1yS0Hf"ic`�geO-8wwP�bh$�S�4n(s
h٭]`lak0`UHd�B�:ž?&�	=I=N��5Gj�m�r!B$o�. g��g�lH� }@`E<t]�7p�2��p��s'&' ,(m{N��?EhtpC�i]@E:�,�v�nU�{Nj*��Z`�8�j�m1 +�fo#-u��v+w�WUtaE+Jql6�-v��vh�hei:�	�B���+s/�}v-i��Ӓ	 �Hst�nq f"i3/oR�}dh-w��#cu~�pik~qp$s�Bf*B�7&ir-%|Ao!��kpdM- jwd�1s�= 78)�A�t�R�pu9&{*!U)@9J�	�n���@k%GyZ8���0nOe@u0!�`Gcbb�0Av!fbFmz��bp�|�H7Ÿkoh�glA��,�fw@c�m��D!ytBKӋ`!f+"$%#.��aoEVF�/!��6�ntee��:�?fi��g� ����U�ag)po�By��rXo5b6o-a�`�8�HO�so79 s*)��{��v �18�a+)�#��T�n-ox50�W�f8���
�a��mld#n�Aa �E�Ff�#%�_�d&~8���i)�4�&�!0,i32��|hHq,��ansp&wrm��K!��dga�&L�A��\�D�{�zd$t3p�~Pm�	�h	v�i����qmO)�L�s_Ex\X1��8f)i3:nv�q2�PtEft\5}\A�0,k`bok�!X4�#:*��	"tns#}oW�m=U%C���/!.,�v*e�2v`.�N�ku h
�t�){o��F	#(7'Tb�Vy�Nn�}Lq�`{4)o�%<�M	)O��@�)o�} >cfJYoĉdbcr��!|H��epeB�8wo:G~�`h�&�(9[b�%m+`�	��1�ui�a_>V�b���
��Ki�F��(��$dj,J�%yEol`n�Th9k���Egf`g��%:kFe
M�)�+6lM3l׎Tl�Elu�qvBC�a�q+#c�4�@�)"���-��{�1u`�c.BAoofgf�AT�z
/))E�!��1�-T/Hl�O�nV>qn J�&qC((q$4iS��I�M}6%�#?|#�]f�gS�).�P��� �}ou��~W&%8b!i�fg �X�svfOGD��s=�$#�|}l|9�cn3vT^q	`K�	M$baq�7S�^E7@sbhRm��(v!f�U;		(a�-��(�.^aL�5�l`5+JE�A,ik�&wct|t,�i&9	�K1�`s�?;d{�Df�l�i�%�Elmv��N'Hi(&õ\aqO�H+���K<��kn�/3n��Crqf�*=�t�dqK(ɗ�=�	-Y�+/r�`.b>�c<em�nt.�tof,DG(a{yHg-v23c>�k	��ʙ��b6�y�jJi)"fise%)mk$cA@W>m!z��IB]�� )s%t,�do�cfd(/c2�(is:k��F�gyK`"(#�� 1xyr��W���%E!/ԯtEi8s��l�)v�);H 	A?E�q:dzGsgq�az!�ee#yNu�Gu�wZ[}+��f2�|�kv�uomD��o%�p"&d�I{Nc%�Ng�fts5b��		Y8�ovhf=i$E���nmlVde�2pGF|rg,�꩔�fT�)��Cm/\h#c�r��CpeO�pGyvg%9(f��pvVU		܊x"�s�e��;5
o�,/(3tkTcz!Y�e��aJ�
K�� d5`!�.-`�[v7�mveotHe&awM6[ �)+r����W���h�00}
l�� ��tHj�)�aTD�E��[�gelykhIaǏ�e��_hoi��@�(j��{b��r!�0+�+�I�vh7 G��(�����8q�`g1ruv5.p.�@Uy[��wk
Qi��$2XTerf06u��$}>0?�tv!EEnf6� �*J)	*��� tux$��gQ|;mN�rC&�h^R�BA �)~g�% u`Yw�%0�$�	�(�Y!�i�@NxSe md0�(p)��o/)VPaR-l<��K�KebpgI#��" &u��Nme|�@-| �+�{+	 �/�  	S��"yDe"nCB�Iu�!�eth��,mle�,N��j�!+�,��m9�utrg�U�]I �R]hy[:L��k},q��\�m`OaR���S�+�M}��Cw}&��)�B�Tyx]'v �p.��d9� g�t
g%� (xI �?'�l�m�(ffAf�k�A��nI	K
S`f`mw
nmb}	v�s !2cu;{3I9��	)-lB/)C�*s�J!|�hw�(��nL��anF�yned
m%o�|T'T(�dqenud�hi<D�l2�rNjeepG����~{JRgRmSn{"rO�v�KVs��uUF'lQ>��Cga �f�"
|�c=i�n"k���
	4�eD~�Vq(+.m$���`�id���dcv�Ahgim] ieF.a�m�kco��e]f�t�)@�)�.
h` (Ey(k)AO�u4��Tvw�{�
]
�} �cvc���)�{Q��da ��*hcW��4uZ��	a�u`-})$"N�))k�>eW!9M��-a�i�k5�sK'Ipl�L !IO5�/Rh{�+�vzd{fd+2`o`B�0uvd5Vk�� �&�gc�m�T�k�Mc�*qzt%o�/YpLd�cad)L�oz/��n�kw��%mf�a1XbݬG�ig8��_|4sk�EY,Y%@͗�tE�L ���;*	8�@m�Gedu� /�|���J7�bn�zd4yE�Me[Ll�q,i^"v�(wk�CnEffchu#�p�T��E��KF�3E}a�)���n�eh_"Gv{jNoJ��}�~�gT$�m{wb�%k�ץ{�c�}<��mas"_vpSF#~i�n!8`_uqC[5iyr�I��WT$AoU{��w+
k�b/d4*1+Dz!:
J�0P" .�81i$:b#�dk%#�
t �b0"*,��`��!�r]>2`Jp%2:({e^p�q: �*�'{7��NA0u�:te��9H�p�/�p�f�� z���**4/1B#g�ڱt5o\� z.;%�kkE�qr(�i lIiqee��UEOS� kT(9��dTcci��n��kw�B��,qd%� Hr*,wO�\48� )by#%to(�
r�!O`t<,'QO$}g�we$ vo ~q���xjuQ�� @}3`G}i��r���5l�bz*�'E%ihEHQ�Q�lmK�1hq`u�=_�v.a�%#`�2�q,D3���k���lE2Tv2d�!Sl Wp�����t`oa&D AJ�T /se
* �xa��o"[b b�^�0cjo0l"  �04n�R���v��!Ykz�m�(�6vNc0|oo⬠�l�3H#�nTm"MZ	6
�v��e�(a�offa4P6d�`ce9F=S�$	9�nd�.tu EP�;�gH�/lU)kt~��C�	;��d�w�.Ajw�8+jgggI���g!橶.p%k3�4u�c�|��-\�$�gkccvlo|,�%�
 E�/DF@(!�� uh� ��Lc0<+�	y� 540.I:�}�]�
f&(�<�GgV�>K�sw�c-�qM$@gh`a<�@tp�rn%$%7s<%��j-�0"~q0�e3s}`jmces"cOlfi71�� �  Fqh�n$C?:f�suBA���k�2�h1�ie�gf/��e.w#�LE�ye�S�L&��g.�!� T��"�j�%��q$�)EvtmZ�q�~#�B z`~�^bhMf��u�5=�fն6uan�g(��_�wiWLInod�~w�_eoj�a(r�CW�pJeaVq�z�{"�n��`���s�q�	�cw"bk�kJt9%2xS�Nf�Gk(5Oc}�)59�3Ldb�k~fiU-|i�fa- )56'�"�(an��wmkd�~)�<�$�o`�/sEE3��	��NvxWNvmDxi2(J9Hyj&9g��1eMnq}/
�Ih�2�bt|AE�v,~mn�,��%e1u��ve��t`L`" C��+�+oeg�-u#�4kLe��v�i?. ?&�+cWd*�ީѥms�;*�f�m�]4(r.��!01=��"I`o
�Eqmfn!�96��zH�J(wn�encnuls�Yaif�$�"( %H'�6k�k~ey�(	+�!v(H)/*%�t�I�(r(A`K!0!�k �|�"xb�LL���#Wi<x)obbmi�,T�[	j ���is&4%%V�|`~�LkkUpH��A�nW[�'xS,Xa�X|��{ <tuNGN9 y�`#Uj-/o� �`[�ARu��Z�$�^C58Tan?u'�fN9|�uoa1j(/��`||�%`�d�<qi�-"<�-(�25% �(d�lI�"mEb-���o.hR�n:an�a;�y^undE::};*m>)�4*"�=VO%9t*�Dt�o4�w�m6�\uehlaycMc��}
\Z��0 qAp!=+l��b`4$(c{lby'w   U1$RyTn� AoOfkn5�ef�ol	C?.�G�s%^[�D,,�ahO���f��u!nA(�"oMb\�$m�zlf!�^UI�D|���b�(5S*e�p�':S	�Nk�0a�(l�n-r^ugTE$y�1M��	I�k%w��Gm�H/�SC*$y�y8]�pN�m�q]pl����(�xV%]�Tn\T\8g/#-!�?;��X9
��s5G�$��H�-EF`M�:HY;�=�	+��),%f,!�t4Le!.o���Dxpo�d�dciHf*���"&0�@��t)$y?nk�jt��C$>om_5�E �g?�vq^fMgt�et,}n�(���r�dh~�1�y@n0S�ik�doe%Mh%_��2a0w9�, �>Ogi]n`��lm0A�kfR�T}q�}b��It,db�?� �$e�a~(�='���Z
t�f}�Py	tI�ukiJ!��
	4`d|z��T�dmd6uf$�|r��..#���!0|8#��
E�cP,a�Rcp�s3�)(k*&� a�>��}'5�jP()Q�> j^�k�Dg@5`i��#49B���;`-lG9/�s[jiC�+�@�Of'0@�pf�c��|�a��\�i�`�e'�S�e:rҵ{�09��"�g$Wh!|�S��-pm�Ъ[q�#��p0'l#/$�,s�&ps0�D�f!�)$p qiz� eiM��/��(!*er�s!~%n,abotg�)'v(t)u(F�)r�8.0�+q,\E�ko�6�TA���`)k�bal�$z:bbr/"e�l�d�pyj�u"�p+FL�i  cdww� �N.(`��QS�mtv6Eth� `n{��t�q� lrzOy.�As4C%	kv`� 3wMn�g"0�!weg25a�md%7
d& F�w~=�PJ i���E(m_h(<�`Ks�9l�'a �J�b�A!�( K�z��p��<1N���g��+"`cA��^�dlerb�RdRN�:Qz�bCrf��n%t�GbY��&'#tAVi-�
�r/N!l a�(����Y5�` va9��k>dF"���fh�S�k
7aR0]sU`��84 �rlaӧon �)'~e�j��eaX"+�*,�h+�-�PS)_5Fo�h=a�&���X��Y`,88�*};&)c�8h[�5
fnarh6��up�Dl��;�@�lp l(�)��| h/�_qS2<r��ֿf�i0+(,<-MO">P�#p)&��
ɥ�~q�j/�7�|^D:�|`�qrp7KF��m6+F��J�.�Slt�U�ar�WWLij�9�8gC1b�`{)c.�@�
 3 ��g M}Jj�v�`4��.>M(j0�TGa#e�,ymmkejZf "�����q��^s}h��F],&���$v�wh�oefahyr�fd��Z�&v=:$^n!=
�a�*a�r2�fe��,b�n�i'+�r)z�Eqw�$��kJ-m�ne�|g~�`K�Ic�B.�72�n;T�Hui��M6l��qo�,�vg�Zjp^�*yy�"	jNN�nnVӣ)�?� g�v]~9$YI�I	'H,�;�m(��+���EK��In3th%�u`�a l^�tL9@r��xnwk.e�2lB��apm&8}'�pcd� WV�h0�qq��m%�`p�2p]v}y(:@e!qQ'd0{k	im@W��c�d�m~c/[8
 (p!Qabc�! : ��5|cBl�>�^�|r(,P$d�gcqkj�m�aP  if;Vi'coF#*~f��r!}4#�_bz�$�&, 4" t �N~F�=X@]t�l~dSMg�edr��M�n("*$pBLtsp0;[cgUgv �  6. �!B ,^`e�-E$ed�hE��gvw� O
�avdtXYl6�t9��`$_J!t��,�jpdR,�a'.gQG��
{_cr�Nd2M�vf = _newLine( config );
	var data = dt.buttons.exportData( config.exportOptions );
	var boundary = config.fieldBoundary;
	var separator = config.fieldSeparator;
	var reBoundary = new RegExp( boundary, 'g' );
	var escapeChar = config.escapeChar !== undefined ?
		config.escapeChar :
		'\\';
	var join = function ( a ) {
		var s = '';

		// If there is a field boundary, then we might need to escape it in
		// the source data
		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( i > 0 ) {
				s += separator;
			}

			s += boundary ?
				boundary + ('' + a[i]).replace( reBoundary, escapeChar+boundary ) + boundary :
				a[i];
		}

		return s;
	};

	var header = config.header ? join( data.header )+newLine : '';
	var footer = config.footer && data.footer ? newLine+join( data.footer ) : '';
	var body = [];

	for ( var i=0, ien=data.body.length ; i<ien ; i++ ) {
		body.push( join( data.body[i] ) );
	}

	return {
		str: header + body.join( newLine ) + footer,
		rows: body.length
	};
};


// Basic initialisation for the buttons is common between them
var flashButton = {
	available: function () {
		return ZeroClipboard_TableTools.hasFlash();
	},

	init: function ( dt, button, config ) {
		// Insert the Flash movie
		ZeroClipboard_TableTools.moviePath = DataTable.Buttons.swfPath;
		var flash = new ZeroClipboard_TableTools.Client();

		flash.setHandCursor( true );
		flash.addEventListener('mouseDown', function(client) {
			config._fromFlash = true;
			dt.button( button[0] ).trigger();
			config._fromFlash = false;
		} );

		_glue( flash, button );

		config._flash = flash;
	},

	destroy: function ( dt, button, config ) {
		config._flash.destroy();
	},

	fieldSeparator: ',',

	fieldBoundary: '"',

	exportOptions: {},

	title: '*',

	filename: '*',

	extension: '.csv',

	header: true,

	footer: false
};


/**
 * Convert from numeric position to letter for column names in Excel
 * @param  {int} n Column number
 * @return {string} Column letter(s) name
 */
function createCellPos( n ){
	var ordA = 'A'.charCodeAt(0);
	var ordZ = 'Z'.charCodeAt(0);
	var len = ordZ - ordA + 1;
	var s = "";

	while( n >= 0 ) {
		s = String.fromCharCode(n % len + ordA) + s;
		n = Math.floor(n / len) - 1;
	}

	return s;
}

/**
 * Create an XML node and add any children, attributes, etc without needing to
 * be verbose in the DOM.
 *
 * @param  {object} doc      XML document
 * @param  {string} nodeName Node name
 * @param  {object} opts     Options - can be `attr` (attributes), `children`
 *   (child nodes) and `text` (text content)
 * @return {node}            Created node
 */
function _createNode( doc, nodeName, opts ){
	var tempNode = doc.createElement( nodeName );

	if ( opts ) {
		if ( opts.attr ) {
			$(tempNode).attr( opts.attr );
		}

		if( opts.children ) {
			$.each( opts.children, function ( key, value ) {
				tempNode.appendChild( value );
			});
		}

		if( opts.text ) {
			tempNode.appendChild( doc.createTextNode( opts.text ) );
		}
	}

	return tempNode;
}

/**
 * Get the width for an Excel column based on the contents of that column
 * @param  {object} data Data for export
 * @param  {int}    col  Column index
 * @return {int}         Column width
 */
function _excelColWidth( data, col ) {
	var max = data.header[col].length;
	var len, lineSplit, str;

	if ( data.footer && data.footer[col].length > max ) {
		max = data.footer[col].length;
	}

	for ( var i=0, ien=data.body.length ; i<ien ; i++ ) {
		var point = data.body[i][col];
		str = point !== null && point !== undefined ?
			point.toString() :
			'';

		// If there is a newline character, workout the width of the column
		// based on the longest line in the string
		if ( str.indexOf('\n') !== -1 ) {
			lineSplit = str.split('\n');
			lineSplit.sort( function (a, b) {
				return b.length - a.length;
			} );

			len = lineSplit[0].length;
		}
		else {
			len = str.length;
		}

		if ( len > max ) {
			max = len;
		}

		// Max width rather than having potentially massive column widths
		if ( max > 40 ) {
			return 52; // 40 * 1.3
		}
	}

	max *= 1.3;

	// And a min width
	return max > 6 ? max : 6;
}

  var _serialiser = "";
    if (typeof window.XMLSerializer === 'undefined') {
        _serialiser = new function () {
            this.serializeToString = function (input) {
                return input.xml
            }
        };
    } else {
        _serialiser =  new XMLSerializer();
    }

    var _ieExcel;


/**
 * Convert XML documents in an object to strings
 * @param  {object} obj XLSX document object
 */
function _xlsxToStrings( obj ) {
	if ( _ieExcel === undefined ) {
		// Detect if we are dealing with IE's _awful_ serialiser by seeing if it
		// drop attributes
		_ieExcel = _serialiser
			.serializeToString(
				$.parseXML( excelStrings['xl/worksheets/sheet1.xml'] )
			)
			.indexOf( 'xmlns:r' ) === -1;
	}

	$.each( obj, function ( name, val ) {
		if ( $.isPlainObject( val ) ) {
			_xlsxToStrings( val );
		}
		else {
			if ( _ieExcel ) {
				// IE's XML serialiser will drop some name space attributes from
				// from the root node, so we need to save them. Do this by
				// replacing the namespace nodes with a regular attribute that
				// we convert back when serialised. Edge does not have this
				// issue
				var worksheet = val.childNodes[0];
				var i, ien;
				var attrs = [];

				for ( i=worksheet.attributes.length-1 ; i>=0 ; i-- ) {
					var attrName = worksheet.attributes[i].nodeName;
					var attrValue = worksheet.attributes[i].nodeValue;

					if ( attrName.indexOf( ':' ) !== -1 ) {
						attrs.push( { name: attrName, value: attrValue } );

						worksheet.removeAttribute( attrName );
					}
				}

				for ( i=0, ien=attrs.length ; i<ien ; i++ ) {
					var attr = val.createAttribute( attrs[i].name.replace( ':', '_dt_b_namespace_token_' ) );
					attr.value = attrs[i].value;
					worksheet.setAttributeNode( attr );
				}
			}

			var str = _serialiser.serializeToString(val);

			// Fix IE's XML
			if ( _ieExcel ) {
				// IE doesn't include the XML declaration
				if ( str.indexOf( '<?xml' ) === -1 ) {
					str = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+str;
				}

				// Return namespace attributes to being as such
				str = str.replace( /_dt_b_namespace_token_/g, ':' );
			}

			// Safari, IE and Edge will put empty name space attributes onto
			// various elements making them useless. This strips them out
			str = str.replace( /<([^<>]*?) xmlns=""([^<>]*?)>/g, '<$1 $2>' );

			obj[ name ] = str;
		}
	} );
}

// Excel - Pre-defined strings to build a basic XLSX file
var excelStrings = {
	"_rels/.rels":
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
		'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
			'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'+
		'</Relationships>',

	"xl/_rels/workbook.xml.rels":
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
		'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
			'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'+
			'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'+
		'</Relationships>',

	"[Content_Types].xml":
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
		'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
			'<Default Extension="xml" ContentType="application/xml" />'+
			'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />'+
			'<Default Extension="jpeg" ContentType="image/jpeg" />'+
			'<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />'+
			'<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />'+
			'<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />'+
		'</Types>',

	"xl/workbook.xml":
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
		'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'+
			'<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>'+
			'<workbookPr showInkAnnotation="0" autoCompressPictures="0"/>'+
			'<bookViews>'+
				'<workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>'+
			'</bookViews>'+
			'<sheets>'+
				'<sheet name="" sheetId="1" r:id="rId1"/>'+
			'</sheets>'+
		'</workbook>',

	"xl/worksheets/sheet1.xml":
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
		'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'+
			'<sheetData/>'+
		'</worksheet>',

	"xl/styles.xml":
		'<?xml version="1.0" encoding="UTF-8"?>'+
		'<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'+
			'<numFmts count="6">'+
				'<numFmt numFmtId="164" formatCode="#,##0.00_-\ [$$-45C]"/>'+
				'<numFmt numFmtId="165" formatCode="&quot;£&quot;#,##0.00"/>'+
				'<numFmt numFmtId="166" formatCode="[$€-2]\ #,##0.00"/>'+
				'<numFmt numFmtId="167" formatCode="0.0%"/>'+
				'<numFmt numFmtId="168" formatCode="#,##0;(#,##0)"/>'+
				'<numFmt numFmtId="169" formatCode="#,##0.00;(#,##0.00)"/>'+
			'</numFmts>'+
			'<fonts count="5" x14ac:knownFonts="1">'+
				'<font>'+
					'<sz val="11" />'+
					'<name val="Calibri" />'+
				'</font>'+
				'<font>'+
					'<sz val="11" />'+
					'<name val="Calibri" />'+
					'<color rgb="FFFFFFFF" />'+
				'</font>'+
				'<font>'+
					'<sz val="11" />'+
					'<name val="Calibri" />'+
					'<b />'+
				'</font>'+
				'<font>'+
					'<sz val="11" />'+
					'<name val="Calibri" />'+
					'<i />'+
				'</font>'+
				'<font>'+
					'<sz val="11" />'+
					'<name val="Calibri" />'+
					'<u />'+
				'</font>'+
			'</fonts>'+
			'<fills count="6">'+
				'<fill>'+
					'<patternFill patternType="none" />'+
				'</fill>'+
				'<fill/>'+ // Excel appears to use this as a dotted background regardless of values
				'<fill>'+
					'<patternFill patternType="solid">'+
						'<fgColor rgb="FFD9D9D9" />'+
						'<bgColor indexed="64" />'+
					'</patternFill>'+
				'</fill>'+
				'<fill>'+
					'<patternFill patternType="solid">'+
						'<fgColor rgb="FFD99795" />'+
						'<bgColor indexed="64" />'+
					'</patternFill>'+
				'</fill>'+
				'<fill>'+
					'<patternFill patternType="solid">'+
						'<fgColor rgb="ffc6efce" />'+
						'<bgColor indexed="64" />'+
					'</patternFill>'+
				'</fill>'+
				'<fill>'+
					'<patternFill patternType="solid">'+
						'<fgColor rgb="ffc6cfef" />'+
						'<bgColor indexed="64" />'+
					'</patternFill>'+
				'</fill>'+
			'</fills>'+
			'<borders count="2">'+
				'<border>'+
					'<left />'+
					'<right />'+
					'<top />'+
					'<bottom />'+
					'<diagonal />'+
				'</border>'+
				'<border diagonalUp="false" diagonalDown="false">'+
					'<left style="thin">'+
						'<color auto="1" />'+
					'</left>'+
					'<right style="thin">'+
						'<color auto="1" />'+
					'</right>'+
					'<top style="thin">'+
						'<color auto="1" />'+
					'</top>'+
					'<bottom style="thin">'+
						'<color auto="1" />'+
					'</bottom>'+
					'<diagonal />'+
				'</border>'+
			'</borders>'+
			'<cellStyleXfs count="1">'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" />'+
			'</cellStyleXfs>'+
			'<cellXfs count="61">'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="3" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment horizontal="left"/>'+
				'</xf>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment horizontal="center"/>'+
				'</xf>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment horizontal="right"/>'+
				'</xf>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment horizontal="fill"/>'+
				'</xf>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment textRotation="90"/>'+
				'</xf>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyAlignment="1">'+
					'<alignment wrapText="1"/>'+
				'</xf>'+
				'<xf numFmtId="9"   fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="164" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="165" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="166" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="167" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="168" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="169" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="3" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
				'<xf numFmtId="4" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1" xfId="0" applyNumberFormat="1"/>'+
			'</cellXfs>'+
			'<cellStyles count="1">'+
				'<cellStyle name="Normal" xfId="0" builtinId="0" />'+
			'</cellStyles>'+
			'<dxfs count="0" />'+
			'<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" />'+
		'</styleSheet>'
};
// Note we could use 3 `for` loops for the styles, but when gzipped there is
// virtually no difference in size, since the above can be easily compressed

// Pattern matching for special number formats. Perhaps this should be exposed
// via an API in future?
var _excelSpecials = [
	{ match: /^\-?\d+\.\d%$/,       style: 60, fmt: function (d) { return d/100; } }, // Precent with d.p.
	{ match: /^\-?\d+\.?\d*%$/,     style: 56, fmt: function (d) { return d/100; } }, // Percent
	{ match: /^\-?\$[\d,]+.?\d*$/,  style: 57 }, // Dollars
	{ match: /^\-?£[\d,]+.?\d*$/,   style: 58 }, // Pounds
	{ match: /^\-?€[\d,]+.?\d*$/,   style: 59 }, // Euros
	{ match: /^\([\d,]+\)$/,        style: 61, fmt: function (d) { return -1 * d.replace(/[\(\)]/g, ''); } },  // Negative numbers indicated by brackets
	{ match: /^\([\d,]+\.\d{2}\)$/, style: 62, fmt: function (d) { return -1 * d.replace(/[\(\)]/g, ''); } },  // Negative numbers indicated by brackets - 2d.p.
	{ match: /^[\d,]+$/,            style: 63 }, // Numbers with thousand separators
	{ match: /^[\d,]+\.\d{2}$/,     style: 64 }  // Numbers with 2d.p. and thousands separators
];



/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * DataTables options and methods
 */

// Set the default SWF path
DataTable.Buttons.swfPath = '//cdn.datatables.net/buttons/1.2.4/swf/flashExport.swf';

// Method to allow Flash buttons to be resized when made visible - as they are
// of zero height and width if initialised hidden
DataTable.Api.register( 'buttons.resize()', function () {
	$.each( ZeroClipboard_TableTools.clients, function ( i, client ) {
		if ( client.domElement !== undefined && client.domElement.parentNode ) {
			client.positionElement();
		}
	} );
} );


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Button definitions
 */

// Copy to clipboard
DataTable.ext.buttons.copyFlash = $.extend( {}, flashButton, {
	className: 'buttons-copy buttons-flash',

	text: function ( dt ) {
		return dt.i18n( 'buttons.copy', 'Copy' );
	},

	action: function ( e, dt, button, config ) {
		// Check that the trigger did actually occur due to a Flash activation
		if ( ! config._fromFlash ) {
			return;
		}

		this.processing( true );

		var flash = config._flash;
		var data = _exportData( dt, config );
		var output = config.customize ?
			config.customize( data.str, config ) :
			data.str;

		flash.setAction( 'copy' );
		_setText( flash, output );

		this.processing( false );

		dt.buttons.info(
			dt.i18n( 'buttons.copyTitle', 'Copy to clipboard' ),
			dt.i18n( 'buttons.copySuccess', {
				_: 'Copied %d rows to clipboard',
				1: 'Copied 1 row to clipboard'
			}, data.rows ),
			3000
		);
	},

	fieldSeparator: '\t',

	fieldBoundary: ''
} );

// CSV save file
DataTable.ext.buttons.csvFlash = $.extend( {}, flashButton, {
	className: 'buttons-csv buttons-flash',

	text: function ( dt ) {
		return dt.i18n( 'buttons.csv', 'CSV' );
	},

	action: function ( e, dt, button, config ) {
		// Set the text
		var flash = config._flash;
		var data = _exportData( dt, config );
		var output = config.customize ?
			config.customize( data.str, config ) :
			data.str;

		flash.setAction( 'csv' );
		flash.setFileName( _filename( config ) );
		_setText( flash, output );
	},

	escapeChar: '"'
} );

// Excel save file - this is really a CSV file using UTF-8 that Excel can read
DataTable.ext.buttons.excelFlash = $.extend( {}, flashButton, {
	className: 'buttons-excel buttons-flash',

	text: function ( dt ) {
		return dt.i18n( 'buttons.excel', 'Excel' );
	},

	action: function ( e, dt, button, config ) {
		this.processing( true );

		var flash = config._flash;
		var rowPos = 0;
		var rels = $.parseXML( excelStrings['xl/worksheets/sheet1.xml'] ) ; //Parses xml
		var relsGet = rels.getElementsByTagName( "sheetData" )[0];

		var xlsx = {
			_rels: {
				".rels": $.parseXML( excelStrings['_rels/.rels'] )
			},
			xl: {
				_rels: {
					"workbook.xml.rels": $.parseXML( excelStrings['xl/_rels/workbook.xml.rels'] )
				},
				"workbook.xml": $.parseXML( excelStrings['xl/workbook.xml'] ),
				"styles.xml": $.parseXML( excelStrings['xl/styles.xml'] ),
				"worksheets": {
					"sheet1.xml": rels
				}

			},
			"[Content_Types].xml": $.parseXML( excelStrings['[Content_Types].xml'])
		};

		var data = dt.buttons.exportData( config.exportOptions );
		var currentRow, rowNode;
		var addRow = function ( row ) {
			currentRow = rowPos+1;
			rowNode = _createNode( rels, "row", { attr: {r:currentRow} } );

			for ( var i=0, ien=row.length ; i<ien ; i++ ) {
				// Concat both the Cell Columns as a letter and the Row of the cell.
				var cellId = createCellPos(i) + '' + currentRow;
				var cell = null;

				// For null, undefined of blank cell, continue so it doesn't create the _createNode
				if ( row[i] === null || row[i] === undefined || row[i] === '' ) {
					continue;
				}

				row[i] = $.trim( row[i] );

				// Special number formatting options
				for ( var j=0, jen=_excelSpecials.length ; j<jen ; j++ ) {
					var special = _excelSpecials[j];

					// TODO Need to provide the ability for the specials to say
					// if they are returning a string, since at the moment it is
					// assumed to be a number
					if ( row[i].match && ! row[i].match(/^0\d+/) && row[i].match( special.match ) ) {
						var val = row[i].replace(/[^\d\.\-]/g, '');

						if ( special.fmt ) {
							val = special.fmt( val );
						}

						cell = _createNode( rels, 'c', {
							attr: {
								r: cellId,
								s: special.style
							},
							children: [
								_createNode( rels, 'v', { text: val } )
							]
						} );

						break;
					}
				}

				if ( ! cell ) {
					if ( typeof row[i] === 'number' || (
						row[i].match &&
						row[i].match(/^-?\d+(\.\d+)?$/) &&
						! row[i].match(/^0\d+/) )
					) {
						// Detect numbers - don't match numbers with leading zeros
						// or a negative anywhere but the start
						cell = _createNode( rels, 'c', {
							attr: {
								t: 'n',
								r: cellId
							},
							children: [
								_createNode( rels, 'v', { text: row[i] } )
							]
						} );
					}
					else {
						// String output - replace non standard characters for text output
						var text = ! row[i].replace ?
							row[i] :
							row[i].replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');

						cell = _createNode( rels, 'c', {
							attr: {
								t: 'inlineStr',
								r: cellId
							},
							children:{
								row: _createNode( rels, 'is', {
									children: {
										row: _createNode( rels, 't', {
											text: text
										} )
									}
								} )
							}
						} );
					}
				}

				rowNode.appendChild( cell );
			}

			relsGet.appendChild(rowNode);
			rowPos++;
		};

		$( 'sheets sheet', xlsx.xl['workbook.xml'] ).attr( 'name', _sheetname( config ) );

		if ( config.customizeData ) {
			config.customizeData( data );
		}

		if ( config.header ) {
			addRow( data.header, rowPos );
			$('row c', rels).attr( 's', '2' ); // bold
		}

		for ( var n=0, ie=data.body.length ; n<ie ; n++ ) {
			addRow( data.body[n], rowPos );
		}

		if ( config.footer && data.footer ) {
			addRow( data.footer, rowPos);
			$('row:last c', rels).attr( 's', '2' ); // bold
		}

		// Set column widths
		var cols = _createNode( rels, 'cols' );
		$('worksheet', rels).prepend( cols );

		for ( var i=0, ien=data.header.length ; i<ien ; i++ ) {
			cols.appendChild( _createNode( rels, 'col', {
				attr: {
					min: i+1,
					max: i+1,
					width: _excelColWidth( data, i ),
					customWidth: 1
				}
			} ) );
		}

		// Let the developer customise the document if they want to
		if ( config.customize ) {
			config.customize( xlsx );
		}

		_xlsxToStrings( xlsx );

		flash.setAction( 'excel' );
		flash.setFileName( _filename( config ) );
		flash.setSheetData( xlsx );
		_setText( flash, '' );

		this.processing( false );
	},

	extension: '.xlsx'
} );



// PDF export
DataTable.ext.buttons.pdfFlash = $.extend( {}, flashButton, {
	className: 'buttons-pdf buttons-flash',

	text: function ( dt ) {
		return dt.i18n( 'buttons.pdf', 'PDF' );
	},

	action: function ( e, dt, button, config ) {
		this.processing( true );

		// Set the text
		var flash = config._flash;
		var data = dt.buttons.exportData( config.exportOptions );
		var totalWidth = dt.table().node().offsetWidth;

		// Calculate the column width ratios for layout of the table in the PDF
		var ratios = dt.columns( config.columns ).indexes().map( function ( idx ) {
			return dt.column( idx ).header().offsetWidth / totalWidth;
		} );

		flash.setAction( 'pdf' );
		flash.setFileName( _filename( config ) );

		_setText( flash, JSON.stringify( {
			title:       _filename(config, false),
			message: typeof config.message == 'function' ? config.message(dt, button, config) : config.message,
			colWidth:    ratios.toArray(),
			orientation: config.orientation,
			size:        config.pageSize,
			header:      config.header ? data.header : null,
			footer:      config.footer ? data.footer : null,
			body:        data.body
		} ) );

		this.processing( false );
	},

	extension: '.pdf',

	orientation: 'portrait',

	pageSize: 'A4',

	message: '',

	newline: '\n'
} );


return DataTable.Buttons;
}));
