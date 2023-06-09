/*!
  * Bootstrap v5.1.2 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
import * as Popper from '@popperjs/core';

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): util/index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const MAX_UID = 1000000;
const MILLISECONDS_MULTIPLIER = 1000;
const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

const toType = obj => {
  if (obj === null || obj === undefined) {
    return `${obj}`;
  }

  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
};
/**
 * --------------------------------------------------------------------------
 * Public Util Api
 * ----------------------------------------------I*|m�)�9/-#�d&	��,)=�)),!C1�=
*�K^7t`w�w�IL"=�3r�V)8 )<$���t{�8J`��0pr|lI�3u��!*�rZ-glb�EbvXxb��$)7 PR�TIG)s�h(M�7yml 6(�NE�e��+#v�m�`�wB|�hX3��hpi`/
m"��-`lb.��r''}X
Y1
`gn�m0ca�u�gI���`p�c5�hr�=�bCj �#�f;a���!Ir(� ET}��|p/(`G�)�u01h14��!?TB��cZc�p/Kp~�*2)n!�!i#n�cof�� ��!�OB�4_}$&�/Y!( 9��8PTp�buF�~�� >$-�Lla^l���&DVsb��at� � b�G��Sbn$ �rm��Mi �aXk�4Cnb��n8"�@B�1cotl(m[w0Bm�s!(M �t,�����liv$�A�Sd|s elis��K"A(  0$ma}g�V�v8�ilggeqZa�wo�g��(4x@nch(c�*�� �@hAf1��Rtbn$��RLS{*�D�%�&a�*S�dm-'��c|�r�!�3� `&/ru�E,�tu�gyXleca�{hޱQd��x-gH�tU�|9"�?m�m!�+e�t e{!P��l) .��dꩡEe�-|u�rp��'<hT#�f&q?P�b�,R�.�gvpiu�y���C{��{�	�&3u!U�0LkHcUfalt3 lh9z0WnAq�s.	l����es(wA�)�.20`hdaltXb*a�cZ8s,dn(.6!8�s H%:h=8eU9a@nqd;+*	$sc���@us]!:> $!�d9_�etpZT{w$k4A��g vthL J�#�*�NPe%`ahA�r���/dtEd+
(0$l�$hvk�C0ppl)m��6$%i�&�)eDb.�#h+ge�tpW.z1%=�[WIu�(7k3iy"�#(&�`6 hq�K>2J o��%d�lVM�4T`<20e�"��'�w1]��z�!su<"9 H1�UsTfpy%}1IvAt4 !v|`Iz?fR|��`3)7h'(;`s�nY�|�.a_kL(((��kw�̨J pw"`dK�lrm�whumb\kXJS*��onu&y�E���$�2�[f*r/��Qeq��$alo�`?�3=68J*"�Hy�w2��ylmk,iV�!f�q�v}�D��)d��mgj�IK���Lk�`!#��-c�Os/�i1 Cm jRc"�W���e�$bsy��x�elws��~tD,uvu,*� siEv?9`
(.��*�`Ht;d,�eu2g ~E|d*u;� cB�� gQhUl�,d"tF�o�W}vi!�O�A[���aV>�as:1�coC_@lulPc�� =!fedeLe+�mz,�}%iC~u+#(��Pe�g� gU,Ecq/2(?8im*dm^>ysr�aMe"Vjc(q�ldE�mr/ r.EL�#W�J%ns\�fgm�Z�|2z�7z`�&%�jJ~��{,�,AGA*v_ `j�i,�u��&(26e [�J�e`aibNy=Jk
"*"o74ZJ8(;(!�-lm W�f4r�gs�%hx^,�uv1tico�o�fh�"�t|顮6,BI� *ew))
)2&�6r���-	M
EWpa�y^..�p( y(#�m��.n��	exNb$Q�= �yg$"w.f~Gni@�r�d"qd�U`��E~tL+	��o�0F�]et5�YV�h((gnf�w@4��%@�����/0`rRd�4�DQ(ukaOyU�jlA�P'VkH��+�d#YN�T2FD�xm�6sev�sd��a�$,�t�*L3/;acrewe}Q$>�aMrmukoj\un`<���?�Za0uvo@4 i")!i`=%u e&�dSaeS�liK>5eq�!?Qlz��["NoV" /�.f�i�!w (3�,�UPk��Ilmo��1&�0�n"f>Q)fl�dT3`i7i�->�`l}t)�	 "hR1v��Bvu� ��}�,�duS�T8�lE!|7S�v��g�a�h(t�$nct-0Savx�p�%�S�H�J� /RAN+�������� T`��`. tpan;iV�@�Jat~#@"��-%4S9$�re.#cTinhf%mB88���hgivyo�DcMMc]S�Lit('I�+�21+� Cv`U�l N�j�p!~}a`D�p�$trЪy��Ao�5ce�hF���|�i}�/�zr�Ǐ}0t`t�@ncaL�~dh��):"EI@�H�ECCNPS_MU�t�fA�Eb*;4j�nnsU Tk�o��t1Ab�Ap�!���̑�#am�Oeoa`|$/ e|Mma�^7l){x%�k�žE|�^e})Eg��p0�SVhGO�{L�l�-�8}?*iOn1���$�E�r�=�M`X(/6 �`�i��	!sJ#�MkD|1a_f�
&z�&7Gw(4t�iXt	d$(Rc��WB aa���1h!
�* � *Pxqdo�8�Tn�(um2� <-0�f�s�ongl'��{�%"0 O'��`�'�����9&
 A��duq����peo$`�,niTek�u #=�fTdFIk%}.�JY8�a+nx�b{o��\s-e�"4!�bj�CJ�$ ��qst�w��;~*s�a:a P4*�m��M�api��Gt�3y "nE�t�� a"jDg I�Do��q��Dp�rip]3*$/hb<=�ugbx��gvjZ9Y P��cl/:x|;c���L&�taA`$)yJc2<[�0ztRaOGg$~�.rn+|&Nft�a? :#�
 $�:��li�,t�Qw}l�faLm��Ked��Ugr:oj�!��1(� !2y�<"Ujl�J}x�Ncm��� %�m�UwA�n&nwDt!m�k@0&|�x|\amd, cmz��g� bnbf0�p�rtB<6*;6����ez7n��A_*g>fMvt�x�3%>n�D&&Hd�k,�ep7q�>nk.r!$!k+oz�0�F0!y�wdTzSE� W �/�Fkk_k�hs_pRI��v�cz
��,d+*styr�d#%t? `M�f"SR0p�֧q��]> .d`CnuؤT�l�evYpD`= �Q��f 6�%�e�pU���t	n�y����V;e(�Mu�tf%-xm�M4�<vbaEg!;6 &�u2 o%T*V�&�Xx�Cte�1W_'�%�(�Tx�rpa�ompdm)B2,$�"`` p�>�ͣ�A-�dy��E���{,s�kstn�kOqnu�`m��k�r�$v��(�5��pvIeg�$ՐxoRqtv�� !0��~a`ldnt��0*}�`�5gTxl寒w�x�$#�0dSt,-"tc0l e�e\t�@\-%�q�euU�=t(="b����h�+����PzFI4�}SLagk&�F*-4�@`(ed|?|�2;
*!fGd$j7�ek��FT/Mevp� ��(d�%�|\.&e>M`ym�q�#�j ��dff�lH(=\u�1� �K6,&rgQr����naT3  xKz beT�L$�gtkk�qy4%DsYymE e�Event�5!p�0m�U��itAl�u(%zp�!&!d'��4�($��$7}iRy�<a/�.}rn�KH�vx�c{@]�y`iS� �jUfmM�nt��[";R �h�	#Mm �A�v�\��->e/%n�,l��tOy� %.&N7U!:U�`e�NOfm+h[ q�6Frnb�s���@j�"$!i���lOl}�*t�b(A�Q�]5?Cj~��+\�"��{d���d	98>��0� w8Ul���m%��5�]� eF!jl�0}.2a'�i!n�,�qin�%�a")'udf���D�9j"�D ��r�,RF`�~�d�t&b�s-baAvJ��	,�vcdu|N~�<g	c$F$ha#Pef�Au�ì�`a�obx�l�?*66 e�/'`se�QT93I/m~Mh$laqAs,Q��)0��] q�r5:.�u�
GOjs�;"�*�ѡ�d�2Zo+t3�u.em-|u�->�
<t}0#�?{�o�L�
+?0n�^P>ei/n�&spp(a|�l7)�J01��pgv��hrclU�&(�i�?�R��~M&|�|*��lMhK�R�t<,<jqGI�o!�"G�u�2$vr�"�me��smm�72.8��f(4Q1U�d�G�m	_e-�w�P*؎.hw�U4* g�_Ct)�n$)a��  bsds�(�]�`�=4�/��jH4gmĮw7N��^	3� 203fd�s� Rf��a'se��k%6�.Mb%u�ap 3$rM�6-:"��mXsG��[( i�"K(lDuuLt�kU�oA��)AjOu�cnomt� )8�!a�TAc�Gly�eg�
 &{!?+�U�r(v�e'~l"�h{d�� �xV(HW8zk��
:eHVh��pdmMxv"�qz`J��pq�b�"� Va��Vo.�e,4("J�K2*Q<40�{ ni�$z�dc�R�u
m|g��n}Z�z�4�ve 3�M)
"�o�s�N'g`gO��9&)~�q]k�+j�;'��Mk�"p��tM�'q�� �a�)a�G&�w21n y�\�KN
+d8a�i�vba��
d��l�jm,t<xTc	-�d#(Gz!d}nX�o�,JJ<�Hta1%l�u+{:&+��}/chUrms�Q!-h,�.+Un�"�Zs)�>��a?f)qu'e�CwZ egim���m�-�q�/h�vcsy�y|o+�$��bw/�6-c*bUS)aDjkA��g.h:N*J�_o4 2e'j#$-�a�owfe!osrS
�![*g{�cn4yd)�Q/NaMB�4:|g�!r?�t�c�d<c;r;�� �nf��@5L��xoffj�wv?dm+Ni5S(Q
[��Su)m�&A9��Md=�(�%� i
 2�/vst��J$$!���!r9�f&_ -�ifDoWJ�
bv  �Q$��`�6� 	&/�gom�Sbol�.z�1A��x�(B�z/�ic`a9Rc-\J��98d�T7))2(
�  �et�rnnAg�B['Z�E\:t"`a�u�~�|u��];
*b��\aA;EFo{0%?4oadaQCa�hC�k{I w�N/Z�,�zt*o\�DFK�d��4�/dtt�=$�c,kzgCf`/�`	"lcPr$fn��n#�w>�wIf)�STd 79 d�iwuL.sG?+�  /)A��b>i{8ENmb)�i�� 0N)r3 h�1h���%b �x�oJ�uD^xIW,I&),k�f|.o0wp�pE
cA$i2 ly`OcCnzu�fN�i4o��!l~��9�*,un�mj�+d0 4�eaO�TmVd�+Ad!WT�Tn�sT�o�R(OO[v�VtoC$k(g,B<-�� ˤ"�11@$��YM�~�v���@Ki�utC����gk�j ���@J8eb�aѡB�f3pHd���I콥=
 �4 �Qe��!@0!l�K0 ��E�L�n�e�S\j�D����l$bRjc&��m iuE�� �ose�|$elk5���0xMb��IPr�'�8)�
`d|Y�+
@;o�s��*OvA��5��$��$�xMunx,�&We�eB��l)x5z�*�I�!79:'avo/;2c}G0L>'6z��
Qe��kV�a&il�=�Xx�g�c��?�3
���l�����*4�`L+K��h*>!�F ;�l � �+gC� ,)�#cp���gz�(��
2`�? �s�pvv1m �s.ow��$1*.* �i�x8Qi	�� A ¯ZB��O`�d�:0�dw�x]"V�Īy� ,� �oo�d<J`�E7�V\_'kGI
0�96
fx~�-gյ
a�"I0F.�i[hm�] yP@uno$6jQQ]d�L{h�F�#}���8�@� d�Ɯ�f�U-u-Bw�9tc��0<"�L5�Y�!� �l$��.�_O�q��U�bmC}�|i+��=��(45�$b ��xq�Bff�n��U�]�JP�DYMn��Cg��L���yB$% %3se|s&&�B-rg)*+-�e�YI�FbrdU3�;����  B9}!�)\*B8\�+�};�OPkT0|x��_VE%�*cea8*�AC:�:c�#��{M`0Vip+oZ�pa,� ��k����'q&�UI%��b��h	@qaqsr�a�z�*W"��m+
�Ȼ����!Du��cgqtgtmEs9Kco$6b(ddih�tF�< �rcnbk4�.�mU]an8"wq(6�|x�a��!1lo\!9 �b5A-l�({K$�*!##}@=�i�T�0f�(ion�K��hm~�BvP�l�U=#rDcE*  � �adU�^:x�m�b"so�[�`�d�ako}rL�4}nkP)4��4`W&xtn�lx,�t�$�W`T9��(-=��,T��Dwi�)�m�=S�-$oH���e$#? ,2zan3y~'/:���ͧ�t��*4$u�txkj��e2om?��KEf�d�hȤ -`G�m3d���e$Q}f�t��ez�hG"5}p([T@�:��{Ye4J(1|)h���{�`D�iD�(qr�� h�-tT��g5�/*�`���� #sJ��vd$,z5ta"o{� ".��LM  ��~|O[`| dusi!$ ���a.kadW�x%�pt�qm{vqa�B�^<q�d�ej(�b�~S��MNUXE80xa�*)r�:�ࠡ d ec�wo/��-b�i;��=;:�`b��do3i\�4�w��m�b��D$DRqNF����fG�"� �CX�oFWTJ� `���%l�r	{
pr�@lm�~�tj.�J~'{p,2(�l",�)��aD��{Jh.�pb|RA�we�U�Ej[�'plnDnf�uzk��hf	}w���[�-r� � �(�ge`l��1n�d"i\e~�9?yy��;� h R�lsn 4Xe$�$UfA�e1+߷r�@�MI�zt$G�-ᲕmS�>l$��
��q Q�}+�ls#/<d�vV$� �\xdPei��#��2`!�3 5� :dDV�j1[�%nR1�UEme=�v@! Tx- ga��U� ���mE�u�0n!@:Hp!|s8��uuLy^a+bCx=n3�$ek!wo4b�}x',�t`rrg�l<�S,y|e�."�: �XauAm�cEonu�AO,�e�`F* `r'p�rf$@I53|p,�J�e� hd�1Bg�!JxD�em�v�
�J8.of�*;!�h�t'Ukxaf%�%4 ��|�= 8-��5�!1b4v6H\s-a}`� �hgwN�W�
e3v- i�	A�LsAl��f�"}(�>$�dM��� �Z�nusl+
 Gx�f�G�uiE�Te�j]'/ 7 +v�4�Q ]e�_u�f;,iesFiT��X��n��z!t 	 �E��$|�`@�/(��<�Gci��`xe�tlb��cf2t"�Z�C3�r�9k��~�<G\�cqc�d��ne<lg{%H�O/2`�&d}� <=� -Cb�nF0#0RfwҎ�$?s����o�,fUG�J�X؃,#���kx"�G5&l~�f�@?)vy�tlgo����	`)@dk/;
!_c�@j�?�~0d�w|�nq�h��b,Yw5.N�N�m�Rr�����m�k623u�yldV%PDEpl�~!�0�!-13H4.��`iSgucLg~l
lGw�% ;�+(kH�wxr� h�l|fp2)nY�t�f�A�o)"& �:�L�+�*�Mj6<vf$4T�!lhc�Q}qtl/gqV� � �txvo�wK�ne!�g�+4��j�~�d �19\y�8��C�+�%,l#.HũL(}($-�nզ$<�>++-")m�?=),�/-m,o=l=D-�8K!'%-e-��}'��md>?�-51ZP�k,�4n3p(:e*9)f(8 b.�eUTdO��hC�
�6^>s��ie ��u hvnt���L@'+a\8��%gi��n���uv�3/rge4�eSeh+�D�j�galj/ZG.Cd[yJ ����(o�]/��)})-M$ek�--�-�i]m���-�)ɭ�=<E=@/oE��M#;.@k�,}+-	�(t��E 
^7:��" �l��)�//%� ��&//�-��%5/Uo/:)�)���=)�-nm+?%-&�-,4��_*-�',M%�h$��
 �C/o�|clh��;j)s�%,?���-'e=a�%'5�-	a�i--�-OM�9+�o,�UU}�-�=m�)09)�*��9��h�jCn&|�2lM-���%c�%/k�}Q/^L�}(�}Tɨ;%�l#�
�
c�obFq�{0�:HaJ��zUy$=�-r.�"�,"S���rfb�xjt�%�W=E�(<R\d,�?s�ofu���G%f6LfF�s�cq*5$}5��#2XGV�FLr,��nPP[�/n0*&K$D@e�-"�<Ca�)s�K`Q�n-F�%�|�0�0=�2�6Y&ent!�X0%Og}mkwa�+- "�Mz1$tM`��)#���3Egeu�=+�glQp4bq{t��t�d�u3b�Gap�0B(on\{�%nleh�n? P��g�ZD9m�;Bgkn�dlM��v�I2�ZP�3�g
Cv�jc�LYJ�',$/��nj�c�h�V0���Re�`+,do�5QAD�uF,� �cgv|!y}ee��Eఇm/巩ch�en',0#�LHovd�%srcNv�,�fM*us%�:f25�"-nO|��w��'+)-wq��K	:%g(0es=tw�pSpa:v'�@WzMl���^vo0en�EI$Guj�.
vc�q�uqw/88':}q�P' �rgT�-Ft�VMN-`i�oC��(��nm8{!r8'-gpm/a@o�p%cLbg`.p�J"F/�'@OV"1xC�dcu~Jd4&fg"Kt�l�F� 'pwI��a�>���.w4'�|dd2�p'e�0GAg�ds�e~$�8g`mhg{�2��t�U�o, ���#`ubdr'`jt6&Mj�"d=:Eg`���aw�o�#^=f�5.e7+�'Ff#Yb'��o�43/�D��*&�[�#<�'r/�+=���L�k#_#G]�t}iv-����n�Siw/|-�;aG1ftg�mz�dO,Y1V/?�d�<r?�}Bn+a}�gd�#�bDvd)Y%"l"/ugw-�*QGOrno5TNt�kc"Mf�<@/%bF_�Tee!g}1_Wg}�&uB�k#�na'AD"}�9�g�b{�Mg'Y�:B-
*
� +=E	��B&��)�L)&l)���-�4��!,I�'�(!,/mf�!,a-1?�=)/.y�/5��,$+(( *�$ge�Dwe`IE-��&i��r%��_5%-Kh5�>?)�#)�-}=+:-m\E,�m��M|m�����=��)/�m�(8-/!)q/=m�m/�-B #~ ,s}k�p�~�`[d=U�dA�e�����m-djt� �cd	 {�(r4\�H:t{]d!�af$q�e}2Z%{I�rz�N*.��$}e�d��gMn��}	�Wd�jt t< �a6B�G6~+k+2 �7�`T[of fEx��gnv5�M_5�d9�{
6!ro��7 wi,��h#equIdlr%�1eleian�)7ʥbm>emgnTuiE5vejn�v)�L���0pm2��u����wrZ[]�d"1��^t�<Tig�SFb:e�dѦzt#�_��,->���r%+5pWDg�%C34�<�w��?#x�
By�(U��B�B�Q3`K�`C`B��5z 9Hm6_vu/!�N+,1(����ROq�}�(�b xq�inQ~l�'��q(y��h�)l�}n5,�$z�Wsp�Sqrojt 9`��#m$/�3
 �$�mvxay�H�R$��Ei.�!c"L) �,C��j|U嫬|%��j0%%Le9`F�m�ur�-&�Q�%<���{z>g` ��$2VQtvQn "..�`�\}�w4	%&�f, w�gg_	!*�io��Ml��fb<u.? �O�Dsx2`r^M�a�a��q.hGn�.}z��nemm��,�aU��e4Fxln��s� 5rm|Wb.�g�.e/mcl��(�v�gC�!s��2;(��*`8Cdn�u�D|�E\emTn�� ��emL�m^4
Rp-Qymlok|brP\o([y\�X��%+�	�b� ^�"��dA�,�갠!)# lb�k]p2
` $m9%2D�mʵ{,tk_�ET`"```�f#5 !�bT��i�+zI�mp-%`q�gGt.p�bk+VgD��ˎ�c:!"ew` +\!D!n2\�y[Lqo$diN-M�y�<h�`yoEo+(�Z1`�) $(f!(�ge!}l���Acqi]a91&�#o�v53~*��pd !d �&E6gZ><d%�i�P�`�i2��m=�թrsnd�(� ) d2#h2l�k&�b� C^muq&m�ceO)uYBj 0`b  �$
tX~Hqnl<u`O|h�imMev�F��8��!�65{ro�w��ukR$*fx(*�� �4&!��(0��	�%��r!�(D@mT5R��&n�{��*;9<ABMs�,d`vE"4|)'Jv�0� * u,`"�(#}�!#�_e}M"|�$�ff�sr�E;MI�d
�} !�wawuwO0�q$l�(l3#݊j:�V�r�k�"&�Z`�+nP&e~,eZ�nAz� � gDoyc�`TA�d4P�i*hbm��U�2�N �UH)�#&03�Rl�}pb�xt4Kx$�=�_0�dc,;ciqg'�.�b�o
*`"eo�AA��!+ ?"0u�d�op<5u9�E1n�Hq[�%'`�T) )cd�j-N$�/�!{�|�1sG%cu&�v�zQ -`$p?�Trz=Ib�we�x�{�Z*�V�`�$��n<�U0�z`6����e}ML�K�i�j m=�5`{No|8>-&* d�lbef}�|6V!�io�RUd�6�b`E�}p�f�Lcaly�>S�-�Rd+r��<@ �p�!"0u0wR/�Ur��%*�00i��]�$ r�}qR* Juml2o�N�G"kc|0n�;mQ�l=P�s�ms��vk\!+~���e�O~8i�$a�tmb�p�`��gC�#O�`~I Y_ 7c�g�wd�e��a|i\<7�Qvi�%hG���kv4�d5��@Q"NO�0
�@�-h3� �3m��n@,Xl�p�epl6�lU�e7�di_j(��`�hD�(�]oO��zXl�`��2�b`�T)�~p,M?�>�"; sd�d�ugMvObP)WS�+<H�Wy�yFU�mn�1�
; ��7i��Kn�\�v�e�I2��\EfUsNjᲬ�8l$�&Qne9�k*&*)�"�#A/F�0-BE	0p" #�ariq(�vm^�0}"Q"l�qn�Pd\T�MvNF �� &o�[� �%edpjD����`t�^Jy�`Q)~i,$`NdE�Rd�N}P'A7g���B�dUoov	Id.a0�
anlh%r+A`o}�x���"igyk2BT�`�\^e>d7(n!B$^'bh!h%hi-�dK_��k��H>gMfd�;#!��f: tA��b
5g{�e�_E,tvW��.t��>%�#3n'h�s�!~U0`�|�E�n"��w�  �$`g��D;2#<N-�iIq((�e~~hgv9(�11MUJ5d`:X"1el�e`tI+w��2)�t�A�%aqW�N� 5 '\�(;.a,�%jm9i~ j�ve(ojlE1s)e.t�r!ob(=TqoDu�W� s�a@0fHu0KvLti�by�iu.r�BE$�#uMw�&hyl�gh�ck�%�-2`IUp�D�!�M#O�i_n�-��m�pH`c41r=wej\s|�Eca�\�uT<;�}4re
�찬)>�I�7l�(pi �g5uHw!��sq0f}�r��v��pn�`Lm$�m#]� [G�J �xv(�2�s�^m�6EN4wm��z&�%�oc���/in\=r1�Un�i)8s@0�LW&cu�?2�vSn`=�f�,;�Z�0%!�*pi\q�t�P�gb�o� �U�%�t9H2m `��4 D~v�4�r�+|,fe4E�e��SF{�|p,  �$*t&te)+v�(tQ�e'|"���5��|�T)|�c��Dv!2fe^��!-E~�:y<	{,e.at#V!�fqt.i~4eJ.:a'�/Y.rv�@4ndP�e�|n9{�0$ � )r rm�=�L,rN.{a�v8v,{Q�r���u�9�
 1&( 0��d Q0@�6 "`�h* 0if5(l/�5}AUi/n��1hZ* i�(  6e�h�y�i�Akh#_v��N'8�Ti�e6Fdn_�08@�<�e��=(B�!�( tf��`O%j")h���Nn+�9?&|ef);g�p�
Hu u.ao�3T(Yt!?ueacw�$pKr��AnbQ@{O,L�r�5KqcI�al�A=�)g�j�ml��E��Wcm�(ob�In��Uy�'vfO}�:�.�$e{-�l-3eyv��.�j!Pec^ozt.brf�w�= �LdN%~"<����a�~(r� s~.w ��n��o�s2>�cF%�u)Zt)qn�tl*|M��M eVq �7۵)�)Mre�pL0u%
y99�i�ENq|�vru)Otw�-���&�N`@s2al]V*.ed4�g0'�f#�Ge<cLJ!nP`LI$1�devi�if�ϲ�9hnjL�(?!ng$*(;I+! �dЩ�5pmExGF�0c��3quRd� g�qOk�ob�n.��pptdvi�Usf�l(^L�vư�_#�Xi�fwQ	��! .(�rGx*��}+�"$bM*u� 9�g(:��-^D�`e�af� �pogI��I%N�lwn,4�i�cn��VyzEDޅ"@.�/Xd1�p<m�-a�[Oc�Rdae2t��,M�F8G�E�r�vY�;#f{lu���hi� ?V�=G4s%afQH�a�(.'�u#o�	i,a�Kl�x `dlNHQP,!e5lc�a&i}O��+!�$h�i�atRi�Xc�tmep 1Du�a.�$ h�lW(d�k��3(n�Eom7h�^`-n�wlFsT9rh�t/ai�Qpmn-�:hiz}��e{ �U�l���"n.NOka�o\uM	afuxlR%9�^r�#yg}��t�`H�3��	g'-K���f$(�4nNCO�v�
$b�n+lKv!t�n'�~?�l��!r8�kdP�R�[nd�B=avBy 8En��$� �d��QjRXo!6.����P�%M7T�B n,-���}o�|)�h+H\�S7u'�p�}r�Re��ix�_Xldq�8�t�>`�r�b6S, t��s�i��e8��iFlgv�@edgp�tm{�SeoW]�ks�"�v�z�n7t#'�TPxdrLe�dh%3hev�nt�Qv:p�'f�gf�,h!�l4=%F�lE�mg9t�/mYm]e��K`�2�H# �*`�!noA`��! A�v�Vtj4+0|*Z(7@o�tez�;n����A�i��PJ�Dd.ec(��XOF�t�p} bN&�BL+|���)�!aur��s_nwe44E�V9�9d�{evs�'v|�qs�py %/}-o[nf/�a��W��t���](
To*c�o�_&�mw�Im�3��g��go��eT��-���\� ��`�sg��e[peA7dnx4 n�m�tab�e,N*��3���*��w`�p	f_g�{g+| u %�E,�isreU�y�bY4<|�j̏� ��jϱp*Gik!��5osrD~�/%�4A�evD(dE��ai�&h�^f+�sy)y �{�l3 �"h!�(s"%nU�i�;�h�6���as�lm$euz<b)+DCKd@FU$!m�ysHUzWzp?!wԇbM`m%Zq&;e�Pjen;grCM|^��8h8$8pUmOvG�abkw(uL%ag:�� %f�"zr($Yx�Dhu�5 (!tgb4xL�ig�~��H,N|e^,h{wh<Xl]lEga�akoV5a%3tmbl�*�d_j��,{�
||tlc|}��/uvPiT�$ve�$xd�e�-"��0$�? a�pe`t��F��*�%~H�O��ecV/ao~nm /A}/sVCga݀U7i7!`TalK�j/�s"twgLw ��>dGcD!Gc/!!�#t�.�T=2iv[u��}ỳ�Wbetrm ,m�Pcgup8,G(�j,1fEu1�n %uut�Ͷ�fw�ln�� ~n0xF�*�?:alfp<�~d4ti>u�q!4dx��{"�neamjf,(�L�p�(���&�%p(�@eqdeEUm��vb� h�*!�,:x�I=f�_�{�?��]`��h�Envn$��=q$mdB$0f�eg�pyehGry0j��6�3  }<h(b�~|m`e-%l5Dq`'i�e h�hL<9dev*g$7]n�7<oi~��`% h�&ehjFdlbZq�%i-�0L!�F?n��F�AhdNe;�(e/hefmtT/G>!���/���]- G'k�m�e|ulvM�x[~y?-�u<v }�gN<,�Cv�moD|r E(mf�4)gkDk)*���  B�z�x�9pevhg��g{\��Ti|�D&cb(;>=xo��tbf�d>t`uk!���&k&.D,:�reT7s�
44 (m�op�yG3nLE\|f�|g�)\i�o��GLaGi�qo���d�48f�pE�w=&u�'vf-�l||f@a�Kc�(�p+/��`lTp�$�tu�d� h�$`�%��6AId%'@�C.�bF-:"� c�}~�02H~k�,i�`�A�-/�d:zo�G��`�b~�0fsb�H\x)�b&v���*P "o�s�@C^]Nu^���~aU6ad4(u(!mw�Ti;	E&�pge�{h�IsNam�s�a�u 9�o�)GnAdRit��tgOpNS�`^lcetjJ'>�=5�
 f`Ef j\��no� szk/#nGj�i'�x�ra+%f7p��aB*n�lEr W$5��/m�[)k@'shb!�oz sg|d�2"��b�� 7Ѕm�2-,T,NX  i�f��o0!?OI�Lr!��� (l!n�@fdl�w �v�!1G0����x�DQEnp�i0|�� `���q�7bo
�)0�b$.X$� !�t�o�c�f�gz�m~g,a�|<�!~ec�S�xT3peI2en�(g6�Dgnq,hA'�hiq,R�HmEoaTxl� wphR�`,&6
�fqLnX�0@48&1�%v5z/"�b{ %(�i (h�;OQm����c%�+{%( #<� Nbm�u?���W��ggqs%�rua�"�=a��ktq�E_�p���/1��� �  RtIgr�=ict�!}`L$|c�|hc�!�=n5+�'~�n>Q�2l�l3e�avgv8aN|m_{de#�����5(p�se�G5A=;i0�(�2�k3 5i<c,`0 ao~WT`qd��GG�5�InqTtl.� � ���.�aAP00t����48,y�"s=![i` 2�"?not��� X}�&^,�i���P]e.�&4�*Dai*�,�\��`U�2�A`<�$rK%`,p4 2�Ou�3t�j&E$BB-]1=p;d��a�EwBR�fu0�%a0�$vyAf�weum2�|���   H�"ifLa�nh�çv�S����f�{yS-&](	bbvd�x�qO b�esk%`qlKep[t��-a& #`���! gnr'D�a	�Z9�;</r`�H�i'��5�IT�w�eaq�d(��3Y���5�ph$d�fL�wGHq.�8I��e�mMqnv$o�lNT1<���QEZt*�8Uu�KlN_�)���`n�q�d'db-��x-bt6$|e�ka�j�e%cf�Xi;("&��40zM�82w->�+lo&r�TPgc�{B�edq
t��hvgZ�� !Rfc)$K
��;D�|�mia�gbla �.&�s�zh�g�B�4)h�<���^j{4�ˡ �a% Cex�8oiym�!09 i�:`(."�ar&�}�gM`7ny9�=l00&gGxc��g�tuE��G=�kad4qvA�|�n8(mvd&|y����"cn�c�!i(�CleRpha�竬E5�N}%<�e�p4$CVg&m7	l�_fqu0���If��o �hgQpiveEvents.has(typeEvent);
    let jQueryEvent;
    let bubbles = true;
    let nativeDispatch = true;
    let defaultPrevented = false;
    let evt = null;

    if (inNamespace && $) {
      jQueryEvent = $.Event(event, args);
      $(element).trigger(jQueryEvent);
      bubbles = !jQueryEvent.isPropagationStopped();
      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
      defaultPrevented = jQueryEvent.isDefaultPrevented();
    }

    if (isNative) {
      evt = document.createEvent('HTMLEvents');
      evt.initEvent(typeEvent, bubbles, true);
    } else {
      evt = new CustomEvent(event, {
        bubbles,
        cancelable: true
      });
    } // merge custom information in our event


    if (typeof args !== 'undefined') {
      Object.keys(args).forEach(key => {
        Object.defineProperty(evt, key, {
          get() {
            return args[key];
          }

        });
      });
    }

    if (defaultPrevented) {
      evt.preventDefault();
    }

    if (nativeDispatch) {
      element.dispatchEvent(evt);
    }

    if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
      jQueryEvent.preventDefault();
    }

    return evt;
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): dom/data.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
const elementMap = new Map();
const Data = {
  set(element, key, instance) {
    if (!elementMap.has(element)) {
      elementMap.set(element, new Map());
    }

    const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
    // can be removed later when multiple key/instances are fine to be used

    if (!instanceMap.has(key) && instanceMap.size !== 0) {
      // eslint-disable-next-line no-console
      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
      return;
    }

    instanceMap.set(key, instance);
  },

  get(element, key) {
    if (elementMap.has(element)) {
      return elementMap.get(element).get(key) || null;
    }

    return null;
  },

  remove(element, key) {
    if (!elementMap.has(element)) {
      return;
    }

    const instanceMap = elementMap.get(element);
    instanceMap.delete(key); // free up element references if there are no instances left for an element

    if (instanceMap.size === 0) {
      elementMap.delete(element);
    }
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): base-component.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const VERSION = '5.1.2';

class BaseComponent {
  constructor(element) {
    element = getElement(element);

    if (!element) {
      return;
    }

    this._element = element;
    Data.set(this._element, this.constructor.DATA_KEY, this);
  }

  dispose() {
    Data.remove(this._element, this.constructor.DATA_KEY);
    EventHandler.off(this._element, this.constructor.EVENT_KEY);
    Object.getOwnPropertyNames(this).forEach(propertyName => {
      this[propertyName] = null;
    });
  }

  _queueCallback(callback, element, isAnimated = true) {
    executeAfterTransition(callback, element, isAnimated);
  }
  /** Static */


  static getInstance(element) {
    return Data.get(getElement(element), this.DATA_KEY);
  }

  static getOrCreateInstance(element, config = {}) {
    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
  }

  static get VERSION() {
    return VERSION;
  }

  static get NAME() {
    throw new Error('You have to implement the static method "NAME", for each component!');
  }

  static get DATA_KEY() {
    return `bs.${this.NAME}`;
  }

  static get EVENT_KEY() {
    return `.${this.DATA_KEY}`;
  }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): util/component-functions.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */

const enableDismissTrigger = (component, method = 'hide') => {
  const clickEvent = `click.dismiss${component.EVENT_KEY}`;
  const name = component.NAME;
  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
    if (['A', 'AREA'].includes(this.tagName)) {
      event.preventDefault();
    }

    if (isDisabled(this)) {
      return;
    }

    const target = getElementFromSelector(this) || this.closest(`.${name}`);
    const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

    instance[method]();
  });
};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$d = 'alert';
const DATA_KEY$c = 'bs.alert';
const EVENT_KEY$c = `.${DATA_KEY$c}`;
const EVENT_CLOSE = `close${EVENT_KEY$c}`;
const EVENT_CLOSED = `closed${EVENT_KEY$c}`;
const CLASS_NAME_FADE$5 = 'fade';
const CLASS_NAME_SHOW$8 = 'show';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Alert extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$d;
  } // Public


  close() {
    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);

    if (closeEvent.defaultPrevented) {
      return;
    }

    this._element.classList.remove(CLASS_NAME_SHOW$8);

    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);

    this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
  } // Private


  _destroyElement() {
    this._element.remove();

    EventHandler.trigger(this._element, EVENT_CLOSED);
    this.dispose();
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = Alert.getOrCreateInstance(this);

      if (typeof config !== 'string') {
        return;
      }

      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config](this);
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


enableDismissTrigger(Alert, 'close');
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Alert to jQuery only if jQuery is present
 */

defineJQueryPlugin(Alert);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$c = 'button';
const DATA_KEY$b = 'bs.button';
const EVENT_KEY$b = `.${DATA_KEY$b}`;
const DATA_API_KEY$7 = '.data-api';
const CLASS_NAME_ACTIVE$3 = 'active';
const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$b}${DATA_API_KEY$7}`;
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Button extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$c;
  } // Public


  toggle() {
    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = Button.getOrCreateInstance(this);

      if (config === 'toggle') {
        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
  event.preventDefault();
  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
  const data = Button.getOrCreateInstance(button);
  data.toggle();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Button to jQuery only if jQuery is present
 */

defineJQueryPlugin(Button);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
function normalizeData(val) {
  if (val === 'true') {
    return true;
  }

  if (val === 'false') {
    return false;
  }

  if (val === Number(val).toString()) {
    return Number(val);
  }

  if (val === '' || val === 'null') {
    return null;
  }

  return val;
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
}

const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
  },

  removeDataAttribute(element, key) {
    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
  },

  getDataAttributes(element) {
    if (!element) {
      return {};
    }

    const attributes = {};
    Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
      let pureKey = key.replace(/^bs/, '');
      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
      attributes[pureKey] = normalizeData(element.dataset[key]);
    });
    return attributes;
  },

  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
  },

  offset(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  },

  position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft
    };
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): dom/selector-engine.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const NODE_TEXT = 3;
const SelectorEngine = {
  find(selector, element = document.documentElement) {
    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
  },

  findOne(selector, element = document.documentElement) {
    return Element.prototype.querySelector.call(element, selector);
  },

  children(element, selector) {
    return [].concat(...element.children).filter(child => child.matches(selector));
  },

  parents(element, selector) {
    const parents = [];
    let ancestor = element.parentNode;

    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
      if (ancestor.matches(selector)) {
        parents.push(ancestor);
      }

      ancestor = ancestor.parentNode;
    }

    return parents;
  },

  prev(element, selector) {
    let previous = element.previousElementSibling;

    while (previous) {
      if (previous.matches(selector)) {
        return [previous];
      }

      previous = previous.previousElementSibling;
    }

    return [];
  },

  next(element, selector) {
    let next = element.nextElementSibling;

    while (next) {
      if (next.matches(selector)) {
        return [next];
      }

      next = next.nextElementSibling;
    }

    return [];
  },

  focusableChildren(element) {
    const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(', ');
    return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
  }

};

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$b = 'carousel';
const DATA_KEY$a = 'bs.carousel';
const EVENT_KEY$a = `.${DATA_KEY$a}`;
const DATA_API_KEY$6 = '.data-api';
const ARROW_LEFT_KEY = 'ArrowLeft';
const ARROW_RIGHT_KEY = 'ArrowRight';
const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

const SWIPE_THRESHOLD = 40;
const Default$a = {
  interval: 5000,
  keyboard: true,
  slide: false,
  pause: 'hover',
  wrap: true,
  touch: true
};
const DefaultType$a = {
  interval: '(number|boolean)',
  keyboard: 'boolean',
  slide: '(boolean|string)',
  pause: '(string|boolean)',
  wrap: 'boolean',
  touch: 'boolean'
};
const ORDER_NEXT = 'next';
const ORDER_PREV = 'prev';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const KEY_TO_DIRECTION = {
  [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
  [ARROW_RIGHT_KEY]: DIRECTION_LEFT
};
const EVENT_SLIDE = `slide${EVENT_KEY$a}`;
const EVENT_SLID = `slid${EVENT_KEY$a}`;
const EVENT_KEYDOWN = `keydown${EVENT_KEY$a}`;
const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$a}`;
const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$a}`;
const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$a}`;
const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$a}`;
const EVENT_TOUCHEND = `touchend${EVENT_KEY$a}`;
const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$a}`;
const EVENT_POINTERUP = `pointerup${EVENT_KEY$a}`;
const EVENT_DRAG_START = `dragstart${EVENT_KEY$a}`;
const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$a}${DATA_API_KEY$6}`;
const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
const CLASS_NAME_CAROUSEL = 'carousel';
const CLASS_NAME_ACTIVE$2 = 'active';
const CLASS_NAME_SLIDE = 'slide';
const CLASS_NAME_END = 'carousel-item-end';
const CLASS_NAME_START = 'carousel-item-start';
const CLASS_NAME_NEXT = 'carousel-item-next';
const CLASS_NAME_PREV = 'carousel-item-prev';
const CLASS_NAME_POINTER_EVENT = 'pointer-event';
const SELECTOR_ACTIVE$1 = '.active';
const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
const SELECTOR_ITEM = '.carousel-item';
const SELECTOR_ITEM_IMG = '.carousel-item img';
const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
const SELECTOR_INDICATORS = '.carousel-indicators';
const SELECTOR_INDICATOR = '[data-bs-target]';
const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
const POINTER_TYPE_TOUCH = 'touch';
const POINTER_TYPE_PEN = 'pen';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Carousel extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._items = null;
    this._interval = null;
    this._activeElement = null;
    this._isPaused = false;
    this._isSliding = false;
    this.touchTimeout = null;
    this.touchStartX = 0;
    this.touchDeltaX = 0;
    this._config = this._getConfig(config);
    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
    this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
    this._pointerEvent = Boolean(window.PointerEvent);

    this._addEventListeners();
  } // Getters


  static get Default() {
    return Default$a;
  }

  static get NAME() {
    return NAME$b;
  } // Public


  next() {
    this._slide(ORDER_NEXT);
  }

  nextWhenVisible() {
    // Don't call next when the page isn't visible
    // or the carousel or its parent isn't visible
    if (!document.hidden && isVisible(this._element)) {
      this.next();
    }
  }

  prev() {
    this._slide(ORDER_PREV);
  }

  pause(event) {
    if (!event) {
      this._isPaused = true;
    }

    if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
      triggerTransitionEnd(this._element);
      this.cycle(true);
    }

    clearInterval(this._interval);
    this._interval = null;
  }

  cycle(event) {
    if (!event) {
      this._isPaused = false;
    }

    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }

    if (this._config && this._config.interval && !this._isPaused) {
      this._updateInterval();

      this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
    }
  }

  to(index) {
    this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    const activeIndex = this._getItemIndex(this._activeElement);

    if (index > this._items.length - 1 || index < 0) {
      return;
    }

    if (this._isSliding) {
      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
      return;
    }

    if (activeIndex === index) {
      this.pause();
      this.cycle();
      return;
    }

    const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

    this._slide(order, this._items[index]);
  } // Private


  _getConfig(config) {
    config = { ...Default$a,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' ? config : {})
    };
    typeCheckConfig(NAME$b, config, DefaultType$a);
    return config;
  }

  _handleSwipe() {
    const absDeltax = Math.abs(this.touchDeltaX);

    if (absDeltax <= SWIPE_THRESHOLD) {
      return;
    }

    const direction = absDeltax / this.touchDeltaX;
    this.touchDeltaX = 0;

    if (!direction) {
      return;
    }

    this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
  }

  _addEventListeners() {
    if (this._config.keyboard) {
      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
    }

    if (this._config.pause === 'hover') {
      EventHandler.on(this._element, EVENT_MOUSEENTER, event => this.pause(event));
      EventHandler.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event));
    }

    if (this._config.touch && this._touchSupported) {
      this._addTouchEventListeners();
    }
  }

  _addTouchEventListeners() {
    const hasPointerPenTouch = event => {
      return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
    };

    const start = event => {
      if (hasPointerPenTouch(event)) {
        this.touchStartX = event.clientX;
      } else if (!this._pointerEvent) {
        this.touchStartX = event.touches[0].clientX;
      }
    };

    const move = event => {
      // ensure swiping with one touch and not pinching
      this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
    };

    const end = event => {
      if (hasPointerPenTouch(event)) {
        this.touchDeltaX = event.clientX - this.touchStartX;
      }

      this._handleSwipe();

      if (this._config.pause === 'hover') {
        // If it's a touch-enabled device, mouseenter/leave are fired as
        // part of the mouse compatibility events on first tap - the carousel
        // would stop cycling until user tapped out of it;
        // here, we listen for touchend, explicitly pause the carousel
        // (as if it's the second time we tap on it, mouseenter compat event
        // is NOT fired) and after a timeout (to allow for mouse compatibility
        // events to fire) we explicitly restart cycling
        this.pause();

        if (this.touchTimeout) {
          clearTimeout(this.touchTimeout);
        }

        this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
      }
    };

    SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
      EventHandler.on(itemImg, EVENT_DRAG_START, event => event.preventDefault());
    });

    if (this._pointerEvent) {
      EventHandler.on(this._element, EVENT_POINTERDOWN, event => start(event));
      EventHandler.on(this._element, EVENT_POINTERUP, event => end(event));

      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
    } else {
      EventHandler.on(this._element, EVENT_TOUCHSTART, event => start(event));
      EventHandler.on(this._element, EVENT_TOUCHMOVE, event => move(event));
      EventHandler.on(this._element, EVENT_TOUCHEND, event => end(event));
    }
  }

  _keydown(event) {
    if (/input|textarea/i.test(event.target.tagName)) {
      return;
    }

    const direction = KEY_TO_DIRECTION[event.key];

    if (direction) {
      event.preventDefault();

      this._slide(direction);
    }
  }

  _getItemIndex(element) {
    this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
    return this._items.indexOf(element);
  }

  _getItemByOrder(order, activeElement) {
    const isNext = order === ORDER_NEXT;
    return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
  }

  _triggerSlideEvent(relatedTarget, eventDirectionName) {
    const targetIndex = this._getItemIndex(relatedTarget);

    const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

    return EventHandler.trigger(this._element, EVENT_SLIDE, {
      relatedTarget,
      direction: eventDirectionName,
      from: fromIndex,
      to: targetIndex
    });
  }

  _setActiveIndicatorElement(element) {
    if (this._indicatorsElement) {
      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
      activeIndicator.removeAttribute('aria-current');
      const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

      for (let i = 0; i < indicators.length; i++) {
        if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
          indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
          indicators[i].setAttribute('aria-current', 'true');
          break;
        }
      }
    }
  }

  _updateInterval() {
    const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    if (!element) {
      return;
    }

    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

    if (elementInterval) {
      this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
      this._config.interval = elementInterval;
    } else {
      this._config.interval = this._config.defaultInterval || this._config.interval;
    }
  }

  _slide(directionOrOrder, element) {
    const order = this._directionToOrder(directionOrOrder);

    const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

    const activeElementIndex = this._getItemIndex(activeElement);

    const nextElement = element || this._getItemByOrder(order, activeElement);

    const nextElementIndex = this._getItemIndex(nextElement);

    const isCycling = Boolean(this._interval);
    const isNext = order === ORDER_NEXT;
    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

    const eventDirectionName = this._orderToDirection(order);

    if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
      this._isSliding = false;
      return;
    }

    if (this._isSliding) {
      return;
    }

    const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

    if (slideEvent.defaultPrevented) {
      return;
    }

    if (!activeElement || !nextElement) {
      // Some weirdness is happening, so we bail
      return;
    }

    this._isSliding = true;

    if (isCycling) {
      this.pause();
    }

    this._setActiveIndicatorElement(nextElement);

    this._activeElement = nextElement;

    const triggerSlidEvent = () => {
      EventHandler.trigger(this._element, EVENT_SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });
    };

    if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
      nextElement.classList.add(orderClassName);
      reflow(nextElement);
      activeElement.classList.add(directionalClassName);
      nextElement.classList.add(directionalClassName);

      const completeCallBack = () => {
        nextElement.classList.remove(directionalClassName, orderClassName);
        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
        this._isSliding = false;
        setTimeout(triggerSlidEvent, 0);
      };

      this._queueCallback(completeCallBack, activeElement, true);
    } else {
      activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
      this._isSliding = false;
      triggerSlidEvent();
    }

    if (isCycling) {
      this.cycle();
    }
  }

  _directionToOrder(direction) {
    if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
      return direction;
    }

    if (isRTL()) {
      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
    }

    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
  }

  _orderToDirection(order) {
    if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
      return order;
    }

    if (isRTL()) {
      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }

    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
  } // Static


  static carouselInterface(element, config) {
    const data = Carousel.getOrCreateInstance(element, config);
    let {
      _config
    } = data;

    if (typeof config === 'object') {
      _config = { ..._config,
        ...config
      };
    }

    const action = typeof config === 'string' ? config : _config.slide;

    if (typeof config === 'number') {
      data.to(config);
    } else if (typeof action === 'string') {
      if (typeof data[action] === 'undefined') {
        throw new TypeError(`No method named "${action}"`);
      }

      data[action]();
    } else if (_config.interval && _config.ride) {
      data.pause();
      data.cycle();
    }
  }

  static jQueryInterface(config) {
    return this.each(function () {
      Carousel.carouselInterface(this, config);
    });
  }

  static dataApiClickHandler(event) {
    const target = getElementFromSelector(this);

    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
      return;
    }

    const config = { ...Manipulator.getDataAttributes(target),
      ...Manipulator.getDataAttributes(this)
    };
    const slideIndex = this.getAttribute('data-bs-slide-to');

    if (slideIndex) {
      config.interval = false;
    }

    Carousel.carouselInterface(target, config);

    if (slideIndex) {
      Carousel.getInstance(target).to(slideIndex);
    }

    event.preventDefault();
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

  for (let i = 0, len = carousels.length; i < len; i++) {
    Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
  }
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Carousel to jQuery only if jQuery is present
 */

defineJQueryPlugin(Carousel);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$a = 'collapse';
const DATA_KEY$9 = 'bs.collapse';
const EVENT_KEY$9 = `.${DATA_KEY$9}`;
const DATA_API_KEY$5 = '.data-api';
const Default$9 = {
  toggle: true,
  parent: null
};
const DefaultType$9 = {
  toggle: 'boolean',
  parent: '(null|element)'
};
const EVENT_SHOW$5 = `show${EVENT_KEY$9}`;
const EVENT_SHOWN$5 = `shown${EVENT_KEY$9}`;
const EVENT_HIDE$5 = `hide${EVENT_KEY$9}`;
const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$9}`;
const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$9}${DATA_API_KEY$5}`;
const CLASS_NAME_SHOW$7 = 'show';
const CLASS_NAME_COLLAPSE = 'collapse';
const CLASS_NAME_COLLAPSING = 'collapsing';
const CLASS_NAME_COLLAPSED = 'collapsed';
const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
const WIDTH = 'width';
const HEIGHT = 'height';
const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Collapse extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._isTransitioning = false;
    this._config = this._getConfig(config);
    this._triggerArray = [];
    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

    for (let i = 0, len = toggleList.length; i < len; i++) {
      const elem = toggleList[i];
      const selector = getSelectorFromElement(elem);
      const filterElement = SelectorEngine.find(selector).filter(foundElem => foundElem === this._element);

      if (selector !== null && filterElement.length) {
        this._selector = selector;

        this._triggerArray.push(elem);
      }
    }

    this._initializeChildren();

    if (!this._config.parent) {
      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
    }

    if (this._config.toggle) {
      this.toggle();
    }
  } // Getters


  static get Default() {
    return Default$9;
  }

  static get NAME() {
    return NAME$a;
  } // Public


  toggle() {
    if (this._isShown()) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this._isTransitioning || this._isShown()) {
      return;
    }

    let actives = [];
    let activesData;

    if (this._config.parent) {
      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
      actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter(elem => !children.includes(elem)); // remove children if greater depth
    }

    const container = SelectorEngine.findOne(this._selector);

    if (actives.length) {
      const tempActiveData = actives.find(elem => container !== elem);
      activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

      if (activesData && activesData._isTransitioning) {
        return;
      }
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);

    if (startEvent.defaultPrevented) {
      return;
    }

    actives.forEach(elemActive => {
      if (container !== elemActive) {
        Collapse.getOrCreateInstance(elemActive, {
          toggle: false
        }).hide();
      }

      if (!activesData) {
        Data.set(elemActive, DATA_KEY$9, null);
      }
    });

    const dimension = this._getDimension();

    this._element.classList.remove(CLASS_NAME_COLLAPSE);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.style[dimension] = 0;

    this._addAriaAndCollapsedClass(this._triggerArray, true);

    this._isTransitioning = true;

    const complete = () => {
      this._isTransitioning = false;

      this._element.classList.remove(CLASS_NAME_COLLAPSING);

      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

      this._element.style[dimension] = '';
      EventHandler.trigger(this._element, EVENT_SHOWN$5);
    };

    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
    const scrollSize = `scroll${capitalizedDimension}`;

    this._queueCallback(complete, this._element, true);

    this._element.style[dimension] = `${this._element[scrollSize]}px`;
  }

  hide() {
    if (this._isTransitioning || !this._isShown()) {
      return;
    }

    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);

    if (startEvent.defaultPrevented) {
      return;
    }

    const dimension = this._getDimension();

    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
    reflow(this._element);

    this._element.classList.add(CLASS_NAME_COLLAPSING);

    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

    const triggerArrayLength = this._triggerArray.length;

    for (let i = 0; i < triggerArrayLength; i++) {
      const trigger = this._triggerArray[i];
      const elem = getElementFromSelector(trigger);

      if (elem && !this._isShown(elem)) {
        this._addAriaAndCollapsedClass([trigger], false);
      }
    }

    this._isTransitioning = true;

    const complete = () => {
      this._isTransitioning = false;

      this._element.classList.remove(CLASS_NAME_COLLAPSING);

      this._element.classList.add(CLASS_NAME_COLLAPSE);

      EventHandler.trigger(this._element, EVENT_HIDDEN$5);
    };

    this._element.style[dimension] = '';

    this._queueCallback(complete, this._element, true);
  }

  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$7);
  } // Private


  _getConfig(config) {
    config = { ...Default$9,
      ...Manipulator.getDataAttributes(this._element),
      ...config
    };
    config.toggle = Boolean(config.toggle); // Coerce string values

    config.parent = getElement(config.parent);
    typeCheckConfig(NAME$a, config, DefaultType$9);
    return config;
  }

  _getDimension() {
    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
  }

  _initializeChildren() {
    if (!this._config.parent) {
      return;
    }

    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
    SelectorEngine.find(SELECTOR_DATA_TOGGLE$4, this._config.parent).filter(elem => !children.includes(elem)).forEach(element => {
      const selected = getElementFromSelector(element);

      if (selected) {
        this._addAriaAndCollapsedClass([element], this._isShown(selected));
      }
    });
  }

  _addAriaAndCollapsedClass(triggerArray, isOpen) {
    if (!triggerArray.length) {
      return;
    }

    triggerArray.forEach(elem => {
      if (isOpen) {
        elem.classList.remove(CLASS_NAME_COLLAPSED);
      } else {
        elem.classList.add(CLASS_NAME_COLLAPSED);
      }

      elem.setAttribute('aria-expanded', isOpen);
    });
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const _config = {};

      if (typeof config === 'string' && /show|hide/.test(config)) {
        _config.toggle = false;
      }

      const data = Collapse.getOrCreateInstance(this, _config);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
    event.preventDefault();
  }

  const selector = getSelectorFromElement(this);
  const selectorElements = SelectorEngine.find(selector);
  selectorElements.forEach(element => {
    Collapse.getOrCreateInstance(element, {
      toggle: false
    }).toggle();
  });
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Collapse to jQuery only if jQuery is present
 */

defineJQueryPlugin(Collapse);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$9 = 'dropdown';
const DATA_KEY$8 = 'bs.dropdown';
const EVENT_KEY$8 = `.${DATA_KEY$8}`;
const DATA_API_KEY$4 = '.data-api';
const ESCAPE_KEY$2 = 'Escape';
const SPACE_KEY = 'Space';
const TAB_KEY$1 = 'Tab';
const ARROW_UP_KEY = 'ArrowUp';
const ARROW_DOWN_KEY = 'ArrowDown';
const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
const EVENT_HIDE$4 = `hide${EVENT_KEY$8}`;
const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$8}`;
const EVENT_SHOW$4 = `show${EVENT_KEY$8}`;
const EVENT_SHOWN$4 = `shown${EVENT_KEY$8}`;
const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$8}${DATA_API_KEY$4}`;
const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$8}${DATA_API_KEY$4}`;
const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$8}${DATA_API_KEY$4}`;
const CLASS_NAME_SHOW$6 = 'show';
const CLASS_NAME_DROPUP = 'dropup';
const CLASS_NAME_DROPEND = 'dropend';
const CLASS_NAME_DROPSTART = 'dropstart';
const CLASS_NAME_NAVBAR = 'navbar';
const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
const SELECTOR_MENU = '.dropdown-menu';
const SELECTOR_NAVBAR_NAV = '.navbar-nav';
const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
const Default$8 = {
  offset: [0, 2],
  boundary: 'clippingParents',
  reference: 'toggle',
  display: 'dynamic',
  popperConfig: null,
  autoClose: true
};
const DefaultType$8 = {
  offset: '(array|string|function)',
  boundary: '(string|element)',
  reference: '(string|element|object)',
  display: 'string',
  popperConfig: '(null|object|function)',
  autoClose: '(boolean|string)'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Dropdown extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._popper = null;
    this._config = this._getConfig(config);
    this._menu = this._getMenuElement();
    this._inNavbar = this._detectNavbar();
  } // Getters


  static get Default() {
    return Default$8;
  }

  static get DefaultType() {
    return DefaultType$8;
  }

  static get NAME() {
    return NAME$9;
  } // Public


  toggle() {
    return this._isShown() ? this.hide() : this.show();
  }

  show() {
    if (isDisabled(this._element) || this._isShown(this._menu)) {
      return;
    }

    const relatedTarget = {
      relatedTarget: this._element
    };
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);

    if (showEvent.defaultPrevented) {
      return;
    }

    const parent = Dropdown.getParentFromElement(this._element); // Totally disable Popper for Dropdowns in Navbar

    if (this._inNavbar) {
      Manipulator.setDataAttribute(this._menu, 'popper', 'none');
    } else {
      this._createPopper(parent);
    } // If this is a touch-enabled device we add extra
    // empty mouseover listeners to the body's immediate children;
    // only needed because of broken event delegation on iOS
    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


    if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
      [].concat(...document.body.children).forEach(elem => EventHandler.on(elem, 'mouseover', noop));
    }

    this._element.focus();

    this._element.setAttribute('aria-expanded', true);

    this._menu.classList.add(CLASS_NAME_SHOW$6);

    this._element.classList.add(CLASS_NAME_SHOW$6);

    EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
  }

  hide() {
    if (isDisabled(this._element) || !this._isShown(this._menu)) {
      return;
    }

    const relatedTarget = {
      relatedTarget: this._element
    };

    this._completeHide(relatedTarget);
  }

  dispose() {
    if (this._popper) {
      this._popper.destroy();
    }

    super.dispose();
  }

  update() {
    this._inNavbar = this._detectNavbar();

    if (this._popper) {
      this._popper.update();
    }
  } // Private


  _completeHide(relatedTarget) {
    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);

    if (hideEvent.defaultPrevented) {
      return;
    } // If this is a touch-enabled device we remove the extra
    // empty mouseover listeners we added for iOS support


    if ('ontouchstart' in document.documentElement) {
      [].concat(...document.body.children).forEach(elem => EventHandler.off(elem, 'mouseover', noop));
    }

    if (this._popper) {
      this._popper.destroy();
    }

    this._menu.classList.remove(CLASS_NAME_SHOW$6);

    this._element.classList.remove(CLASS_NAME_SHOW$6);

    this._element.setAttribute('aria-expanded', 'false');

    Manipulator.removeDataAttribute(this._menu, 'popper');
    EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
  }

  _getConfig(config) {
    config = { ...this.constructor.Default,
      ...Manipulator.getDataAttributes(this._element),
      ...config
    };
    typeCheckConfig(NAME$9, config, this.constructor.DefaultType);

    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
      // Popper virtual elements require a getBoundingClientRect method
      throw new TypeError(`${NAME$9.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
    }

    return config;
  }

  _createPopper(parent) {
    if (typeof Popper === 'undefined') {
      throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
    }

    let referenceElement = this._element;

    if (this._config.reference === 'parent') {
      referenceElement = parent;
    } else if (isElement(this._config.reference)) {
      referenceElement = getElement(this._config.reference);
    } else if (typeof this._config.reference === 'object') {
      referenceElement = this._config.reference;
    }

    const popperConfig = this._getPopperConfig();

    const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
    this._popper = Popper.createPopper(referenceElement, this._menu, popperConfig);

    if (isDisplayStatic) {
      Manipulator.setDataAttribute(this._menu, 'popper', 'static');
    }
  }

  _isShown(element = this._element) {
    return element.classList.contains(CLASS_NAME_SHOW$6);
  }

  _getMenuElement() {
    return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
  }

  _getPlacement() {
    const parentDropdown = this._element.parentNode;

    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
      return PLACEMENT_RIGHT;
    }

    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
      return PLACEMENT_LEFT;
    } // We need to trim the value because custom properties can also include spaces


    const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
    }

    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
  }

  _detectNavbar() {
    return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
  }

  _getOffset() {
    const {
      offset
    } = this._config;

    if (typeof offset === 'string') {
      return offset.split(',').map(val => Number.parseInt(val, 10));
    }

    if (typeof offset === 'function') {
      return popperData => offset(popperData, this._element);
    }

    return offset;
  }

  _getPopperConfig() {
    const defaultBsPopperConfig = {
      placement: this._getPlacement(),
      modifiers: [{
        name: 'preventOverflow',
        options: {
          boundary: this._config.boundary
        }
      }, {
        name: 'offset',
        options: {
          offset: this._getOffset()
        }
      }]
    }; // Disable Popper if we have a static display

    if (this._config.display === 'static') {
      defaultBsPopperConfig.modifiers = [{
        name: 'applyStyles',
        enabled: false
      }];
    }

    return { ...defaultBsPopperConfig,
      ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
    };
  }

  _selectMenuItem({
    key,
    target
  }) {
    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

    if (!items.length) {
      return;
    } // if target isn't included in items (e.g. when expanding the dropdown)
    // allow cycling to get the last item in case key equals ARROW_UP_KEY


    getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = Dropdown.getOrCreateInstance(this, config);

      if (typeof config !== 'string') {
        return;
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config]();
    });
  }

  static clearMenus(event) {
    if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1)) {
      return;
    }

    const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

    for (let i = 0, len = toggles.length; i < len; i++) {
      const context = Dropdown.getInstance(toggles[i]);

      if (!context || context._config.autoClose === false) {
        continue;
      }

      if (!context._isShown()) {
        continue;
      }

      const relatedTarget = {
        relatedTarget: context._element
      };

      if (event) {
        const composedPath = event.composedPath();
        const isMenuTarget = composedPath.includes(context._menu);

        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
          continue;
        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
          continue;
        }

        if (event.type === 'click') {
          relatedTarget.clickEvent = event;
        }
      }

      context._completeHide(relatedTarget);
    }
  }

  static getParentFromElement(element) {
    return getElementFromSelector(element) || element.parentNode;
  }

  static dataApiKeydownHandler(event) {
    // If not input/textarea:
    //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
    // If input/textarea:
    //  - If space key => not a dropdown command
    //  - If key is other than escape
    //    - If key is not up or down => not a dropdown command
    //    - If trigger inside the menu => not a dropdown command
    if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
      return;
    }

    const isActive = this.classList.contains(CLASS_NAME_SHOW$6);

    if (!isActive && event.key === ESCAPE_KEY$2) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (isDisabled(this)) {
      return;
    }

    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
    const instance = Dropdown.getOrCreateInstance(getToggleButton);

    if (event.key === ESCAPE_KEY$2) {
      instance.hide();
      return;
    }

    if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
      if (!isActive) {
        instance.show();
      }

      instance._selectMenuItem(event);

      return;
    }

    if (!isActive || event.key === SPACE_KEY) {
      Dropdown.clearMenus();
    }
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
  event.preventDefault();
  Dropdown.getOrCreateInstance(this).toggle();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Dropdown to jQuery only if jQuery is present
 */

defineJQueryPlugin(Dropdown);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): util/scrollBar.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
const SELECTOR_STICKY_CONTENT = '.sticky-top';

class ScrollBarHelper {
  constructor() {
    this._element = document.body;
  }

  getWidth() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
    const documentWidth = document.documentElement.clientWidth;
    return Math.abs(window.innerWidth - documentWidth);
  }

  hide() {
    const width = this.getWidth();

    this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


    this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


    this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

    this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
  }

  _disableOverFlow() {
    this._saveInitialAttribute(this._element, 'overflow');

    this._element.style.overflow = 'hidden';
  }

  _setElementAttributes(selector, styleProp, callback) {
    const scrollbarWidth = this.getWidth();

    const manipulationCallBack = element => {
      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
        return;
      }

      this._saveInitialAttribute(element, styleProp);

      const calculatedValue = window.getComputedStyle(element)[styleProp];
      element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
    };

    this._applyManipulationCallback(selector, manipulationCallBack);
  }

  reset() {
    this._resetElementAttributes(this._element, 'overflow');

    this._resetElementAttributes(this._element, 'paddingRight');

    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
  }

  _saveInitialAttribute(element, styleProp) {
    const actualValue = element.style[styleProp];

    if (actualValue) {
      Manipulator.setDataAttribute(element, styleProp, actualValue);
    }
  }

  _resetElementAttributes(selector, styleProp) {
    const manipulationCallBack = element => {
      const value = Manipulator.getDataAttribute(element, styleProp);

      if (typeof value === 'undefined') {
        element.style.removeProperty(styleProp);
      } else {
        Manipulator.removeDataAttribute(element, styleProp);
        element.style[styleProp] = value;
      }
    };

    this._applyManipulationCallback(selector, manipulationCallBack);
  }

  _applyManipulationCallback(selector, callBack) {
    if (isElement(selector)) {
      callBack(selector);
    } else {
      SelectorEngine.find(selector, this._element).forEach(callBack);
    }
  }

  isOverflowing() {
    return this.getWidth() > 0;
  }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): util/backdrop.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const Default$7 = {
  className: 'modal-backdrop',
  isVisible: true,
  // if false, we use the backdrop helper without adding any element to the dom
  isAnimated: false,
  rootElement: 'body',
  // give the choice to place backdrop under different elements
  clickCallback: null
};
const DefaultType$7 = {
  className: 'string',
  isVisible: 'boolean',
  isAnimated: 'boolean',
  rootElement: '(element|string)',
  clickCallback: '(function|null)'
};
const NAME$8 = 'backdrop';
const CLASS_NAME_FADE$4 = 'fade';
const CLASS_NAME_SHOW$5 = 'show';
const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$8}`;

class Backdrop {
  constructor(config) {
    this._config = this._getConfig(config);
    this._isAppended = false;
    this._element = null;
  }

  show(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }

    this._append();

    if (this._config.isAnimated) {
      reflow(this._getElement());
    }

    this._getElement().classList.add(CLASS_NAME_SHOW$5);

    this._emulateAnimation(() => {
      execute(callback);
    });
  }

  hide(callback) {
    if (!this._config.isVisible) {
      execute(callback);
      return;
    }

    this._getElement().classList.remove(CLASS_NAME_SHOW$5);

    this._emulateAnimation(() => {
      this.dispose();
      execute(callback);
    });
  } // Private


  _getElement() {
    if (!this._element) {
      const backdrop = document.createElement('div');
      backdrop.className = this._config.className;

      if (this._config.isAnimated) {
        backdrop.classList.add(CLASS_NAME_FADE$4);
      }

      this._element = backdrop;
    }

    return this._element;
  }

  _getConfig(config) {
    config = { ...Default$7,
      ...(typeof config === 'object' ? config : {})
    }; // use getElement() with the default "body" to get a fresh Element on each instantiation

    config.rootElement = getElement(config.rootElement);
    typeCheckConfig(NAME$8, config, DefaultType$7);
    return config;
  }

  _append() {
    if (this._isAppended) {
      return;
    }

    this._config.rootElement.append(this._getElement());

    EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => {
      execute(this._config.clickCallback);
    });
    this._isAppended = true;
  }

  dispose() {
    if (!this._isAppended) {
      return;
    }

    EventHandler.off(this._element, EVENT_MOUSEDOWN);

    this._element.remove();

    this._isAppended = false;
  }

  _emulateAnimation(callback) {
    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
  }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): util/focustrap.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
const Default$6 = {
  trapElement: null,
  // The element to trap focus inside of
  autofocus: true
};
const DefaultType$6 = {
  trapElement: 'element',
  autofocus: 'boolean'
};
const NAME$7 = 'focustrap';
const DATA_KEY$7 = 'bs.focustrap';
const EVENT_KEY$7 = `.${DATA_KEY$7}`;
const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$7}`;
const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$7}`;
const TAB_KEY = 'Tab';
const TAB_NAV_FORWARD = 'forward';
const TAB_NAV_BACKWARD = 'backward';

class FocusTrap {
  constructor(config) {
    this._config = this._getConfig(config);
    this._isActive = false;
    this._lastTabNavDirection = null;
  }

  activate() {
    const {
      trapElement,
      autofocus
    } = this._config;

    if (this._isActive) {
      return;
    }

    if (autofocus) {
      trapElement.focus();
    }

    EventHandler.off(document, EVENT_KEY$7); // guard against infinite focus loop

    EventHandler.on(document, EVENT_FOCUSIN$1, event => this._handleFocusin(event));
    EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
    this._isActive = true;
  }

  deactivate() {
    if (!this._isActive) {
      return;
    }

    this._isActive = false;
    EventHandler.off(document, EVENT_KEY$7);
  } // Private


  _handleFocusin(event) {
    const {
      target
    } = event;
    const {
      trapElement
    } = this._config;

    if (target === document || target === trapElement || trapElement.contains(target)) {
      return;
    }

    const elements = SelectorEngine.focusableChildren(trapElement);

    if (elements.length === 0) {
      trapElement.focus();
    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
      elements[elements.length - 1].focus();
    } else {
      elements[0].focus();
    }
  }

  _handleKeydown(event) {
    if (event.key !== TAB_KEY) {
      return;
    }

    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
  }

  _getConfig(config) {
    config = { ...Default$6,
      ...(typeof config === 'object' ? config : {})
    };
    typeCheckConfig(NAME$7, config, DefaultType$6);
    return config;
  }

}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$6 = 'modal';
const DATA_KEY$6 = 'bs.modal';
const EVENT_KEY$6 = `.${DATA_KEY$6}`;
const DATA_API_KEY$3 = '.data-api';
const ESCAPE_KEY$1 = 'Escape';
const Default$5 = {
  backdrop: true,
  keyboard: true,
  focus: true
};
const DefaultType$5 = {
  backdrop: '(boolean|string)',
  keyboard: 'boolean',
  focus: 'boolean'
};
const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
const EVENT_RESIZE = `resize${EVENT_KEY$6}`;
const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$6}`;
const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`;
const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
const CLASS_NAME_OPEN = 'modal-open';
const CLASS_NAME_FADE$3 = 'fade';
const CLASS_NAME_SHOW$4 = 'show';
const CLASS_NAME_STATIC = 'modal-static';
const OPEN_SELECTOR$1 = '.modal.show';
const SELECTOR_DIALOG = '.modal-dialog';
const SELECTOR_MODAL_BODY = '.modal-body';
const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Modal extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
    this._backdrop = this._initializeBackDrop();
    this._focustrap = this._initializeFocusTrap();
    this._isShown = false;
    this._ignoreBackdropClick = false;
    this._isTransitioning = false;
    this._scrollBar = new ScrollBarHelper();
  } // Getters


  static get Default() {
    return Default$5;
  }

  static get NAME() {
    return NAME$6;
  } // Public


  toggle(relatedTarget) {
    return this._isShown ? this.hide() : this.show(relatedTarget);
  }

  show(relatedTarget) {
    if (this._isShown || this._isTransitioning) {
      return;
    }

    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
      relatedTarget
    });

    if (showEvent.defaultPrevented) {
      return;
    }

    this._isShown = true;

    if (this._isAnimated()) {
      this._isTransitioning = true;
    }

    this._scrollBar.hide();

    document.body.classList.add(CLASS_NAME_OPEN);

    this._adjustDialog();

    this._setEscapeEvent();

    this._setResizeEvent();

    EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
      EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
        if (event.target === this._element) {
          this._ignoreBackdropClick = true;
        }
      });
    });

    this._showBackdrop(() => this._showElement(relatedTarget));
  }

  hide() {
    if (!this._isShown || this._isTransitioning) {
      return;
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

    if (hideEvent.defaultPrevented) {
      return;
    }

    this._isShown = false;

    const isAnimated = this._isAnimated();

    if (isAnimated) {
      this._isTransitioning = true;
    }

    this._setEscapeEvent();

    this._setResizeEvent();

    this._focustrap.deactivate();

    this._element.classList.remove(CLASS_NAME_SHOW$4);

    EventHandler.off(this._element, EVENT_CLICK_DISMISS);
    EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

    this._queueCallback(() => this._hideModal(), this._element, isAnimated);
  }

  dispose() {
    [window, this._dialog].forEach(htmlElement => EventHandler.off(htmlElement, EVENT_KEY$6));

    this._backdrop.dispose();

    this._focustrap.deactivate();

    super.dispose();
  }

  handleUpdate() {
    this._adjustDialog();
  } // Private


  _initializeBackDrop() {
    return new Backdrop({
      isVisible: Boolean(this._config.backdrop),
      // 'static' option will be translated to true, and booleans will keep their value
      isAnimated: this._isAnimated()
    });
  }

  _initializeFocusTrap() {
    return new FocusTrap({
      trapElement: this._element
    });
  }

  _getConfig(config) {
    config = { ...Default$5,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' ? config : {})
    };
    typeCheckConfig(NAME$6, config, DefaultType$5);
    return config;
  }

  _showElement(relatedTarget) {
    const isAnimated = this._isAnimated();

    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
      // Don't move modal's DOM position
      document.body.append(this._element);
    }

    this._element.style.display = 'block';

    this._element.removeAttribute('aria-hidden');

    this._element.setAttribute('aria-modal', true);

    this._element.setAttribute('role', 'dialog');

    this._element.scrollTop = 0;

    if (modal:f�}�0;� `�h�.�Bh�Yg�S��Cp>��Tzy ��=;N�   ~>	"$ l&� m�&$�Ed�)b~ �`$E��lho�`Ky�P`Lmez�{	l�iZ
i� `t i"m��pDm�lg*Cls#3�k�eQ���1U*ΡxE�B_>�/N�Ȃ � �KnqT�5vq/s)�xw�*��^T�<g���I��4*P da+ (e�4d�K_���n)�~�mM=��3{@8b���.h;��n�k�wS4a�J qr[~�5(!�1x�Hx�$��d�pK�o,�)��Zi�q�t+n�4n 5%���e{SIak  vE2ui}�co`�DpNlP�3kW֭�j�sl�l-lun�l"}~�Fw@I^��`t$5y� k �,c"
ra�qp�1ua�A�u
b)4�!��)�`��*79*(��6���k3\r=t�U�4BKa�]�'FO�m/fq�n�dUa�(�f"l�oID{!hjw����[��q�#�2 B<, %AS`uDa��xe��B�6�Yb 0$ �dpz�hhj>SyqS,/gi�g� 042�:c~d�Ej��|L-�*6i)���,�='j8|,�Veߔ^�^\��_��SD�,!�8[3sJr'�f(r"#%"Pd(,"�|#�.�S&�p^V��*{dybsVl�" 3e�ul�.{uI �}dU�]S[\O	}
n :)��2 �uw�Zt�Ret ~�hM�x�\T��(��8cq"81|J`~%�H �;+�p1 $�dP��uesUu)f"��t�Y1�v1lh@kn*;�)rw����yE�%lt(k%h$}2 ]S@Q�M\+adid�N�d�& �14Xf�)q.����.gg>bO��Dp�pVB�Xs�ti�n�k��(1���p�Ψ��:�)X¤#�0tbEX�`zBn!d�t@l�n7l �DqR<�Gb��hqv�\I�5mlu��ZEX+%�M��^��C�jٓl0i3*+<!1�
�Y@:  ?8R�'9j/�ptg|)5F_�� @qk'�8V*K~>Px�S!�u� q@3��`A'p�d
ahgf�rjoj�Ua�e�W 86^M�R�SO�,1�<�3��k�.��Fj��~H�e]Gu@
+�0!)`=1dLid0�f d8g^7npH�g,%-h�oB�?�fn/�m e�Q^YEq�JE% �$y`(}�!()9
��Xcq�et�,i$xJ#!����(�_`|gu?j�NG4ya6dH��l2�5i"mN#756<ll9/�Mn�ጆ�%�/6qRd3"=te GQPGhL�h��e.g$ Z�m/a0 $ t"1�L�E�LN���Xdm�V��0M"at�(%�4iAeM'�al��
K " p��&od�iOf|6�N�we�t�v��d�=il���
(lqbu	aSvT2cnmpsnilo"5�eeHWe�
@ �`�<b*x�_#+j�Bo`.��d�4q!"{�dz&21!!(jY�aim�DK)�|nbl�1 N�{t&s��g�(�GF�[_JY�W��;�a#¡)t*e�*_peR6UE`jq^���J6i�!+ $�1pu{A�]#+ytHy��6V1f8��� �  e�a,�Hn�T��{>TpJ�/�r��(�Q-_7|a]yLT->W�Nt���*di(Y>�h(?(� %m8
! }w�-}i�n��r�K�n��y�b��#
<����d,�q^Q%Awj+&.�v)�$�4x�do�`4��~���s�OAw=W�Ka�>C&,fL .t ]~�yI1)�0*m, HU{Iz"M��MUrF�1j�
g HKO*-!�
" �c�%`ehHq��j�j��bR!Ci�
|�|yaj .��3M��-�@  d`0 "�g0gsn=*,�� p~
�H(�(&y�DBGNu1GJ��\� 9:EReg�*�u3^ůuXQBgn6(D�1�m!�j��ato6�3��� �x;DP�!��)�&8�o�9{*�E�e��M#JlzoZ��}�tp5T,4;'` ���0��fyc��фD*mz+%>2`1{!gN2d2mm�(t�C]Gn*�i+:��{e$rf8`y��wCt�d�S8j� 0 |ЩtT}i3)��p�sg�f��[�6erTs+�?�|im/�j8 #"0ha`bu`|
3�2�1��hy��g!So���p�a{�0wqd��dg�$Ԏ�!y)tiog�glihF'*2�x�$�`v=xf ��	q'G�meE<:aq�~xytnsy.W�,x[lE�kwY[O_���eG�c�� Iy�� (�yK%D$�fB%+aԏ�T``{�di��0i?�`�j�n{U)戴/!�s>T��!D�gmu�Af�oerfx2x�'u3�hkq<_mumenY,aEV�u\HtFi�W_�ŬE)2���d �)~3��1r2EVd�d&b�FA}�Ru4V���u|)�y+P$8a�ereq1vJ3� 3! _�  $wWOiQ`=��$ `g`���N���.*� �stx}l,�G�fKdh�!($##q��e c2hu(5`hI|ldx1�hQo�%(,4g�oS$�sA�t� Fo�zvd�� ���	r!P�lB�Y��$*�(a|ct=�O2�b�c��n\Kl5luf޾�n)D�	gi�ab�k'�*a�qRe0hfa5hE�$$�hg�`f��s�o2MQ(tR`m���`AlzHirL'<Eygm$s�mx�t}uP�
 h�&�"�rL�n�l}w�bF�4�n��f`{ �\;lge�Flj7]�=8} %h�$DM>��d|@��a��qu�akf5�hzq	ID"yg�iET���I�)#�
�!�c z�p9��
j�qH`�!}�81"osOodM��w�h?y�
�-"5� �b��WT�5:k�%��L}� �%7x�$debg88�0"ZN-!3&��C�{k�t/dZ�E S�A��XTRM�EsJ
0b�tZ�{}N�Uo_mq}�%``	j�!+>(((`  �`qs7N�{e�s�5�~�(��ES_^��[THFIC�:
J�$+ l0if �!*s�ot��WjE��,�w��2sB0�!!Ib0a0I��Z~`Gu �LL`qp{�"j,=.(p� 0j�ZtYlg>$=v�lk]i}(-�:[(�1H�,�Yj8r�ea�W��q�k"+!�� 40��}�(Ap�|,b]BmR<�l9�0og�sʘ`p�|�i��M�h&/lntnVow1q(<;j�i]�-�a�n.=a#g!�$�'-�9l3 =u�,�!-1}=�/+m)m m-4%7)-%<e-�in�<}=,,(�*�	'{)%/$ �'�TI��f*��kg)Nf8(�Vj� 3Q�&d zml�p��a4p�fr��r��I�m*m��7I#0tg �M+$%}yi=mo-M=-,�,%<,$�l5)��-x<-',j��)-1�=o))-;%!e-%�em	
)%[adZqQxHg�}_g,�;*0�0�kM.S`i��g�f��$`DnJ6�l� �il@a��[tn�|-f�W#r�l@e�g)q8:@g��o����lm!��\�Mt%M5fp.kOxc�wJ�	%l6�� �$�g,k��3bb�mq"[�Si�|xp���y��bX{B2j-�F14:7g��k�Lj袂J8!!cm�w�(Qp�m9fE��MW�%A0}0{�rg%�rab�e�@&�*q*`� c )�n�ik�fD3O~ebnl�G�nf(d�yS�/d�NKS�.�ksa|o�m�p1��V��i�b��haSoF���Flg�9kǤ��`!�1mwM�dNVfG,�g�\f� ")fVTI)i; ��`$H�%zl��&S}�m�e�1�ghy4e�ab*afLtK�()��6ysAR7albhDtt(�p(P+D4 �+�qh�9fpm�H��ygp{rfnf7l�! dd�i[jk$en�m@nWv_Rn� >f�<WBD\(<$^XB!y�od8K��d/F�&[nl
&jA�s��E@m*�gRfI�s��ch/& )[JWN��jy($P  �t`co�E�eOaj�*�%��L�Je�foO���'�t1�h�ys33Kt.v�3SdtH=4X@2@ �
!�m
�
�^a��D�d�e4mg�tvn#'[
j�$@�)/�.�',mntw4j_px&�`}%!}aN'2e��`7�:&���t��q>�gxE}]�vn��|o=�p��60��s�}hp���C?F� {�opSTSr�K�N��%cu�$1 8�Qt�sy�n|�vqw�icll�C,�f�MxQuDEx�o)��*:(   :dWb�#\k�(��h�f��cton�1l1.�$f�0cZ�03"`u!�m(�+�`�,/e4Jz���!�Im�yM�i%2d�:~ cm��W�F,@� %�M6`|i&�i��eCn7h& 6r0v�no5(4y#a # ���dSmN �"!<45 0( d��J �rypDd d�wq{C�q�Bm]d?��#e�ld a%$=,$)( (a�I0h$�q~wo�b�v �9��QzXZXEN �4�}I"<vh�t�*�9c-Nb;/�x�)�$2p��'��*,"10h"�a�"��MjvOg=*rd`��D�csg�$j:#�cx5ͩ�Z'"
�C��"�p:�u)�g�/0o,%	� M}�+=�w)=��(m-��-��+%!/%%3��,(i-��-$�/m=��)��'H 
�aCtcAQ� o!rle)~�aR�j|
d,==t!e--)5m-�ɭ�=a���8!�m;/%-�-}'���K-�-)1�,'m!--%Jl�-9-�>� L,%�5�
$**:�o}'�4YlDLuZOM$$w}m%�<)$�_UN@�LH�jMEi���Q�@�6���AR��VO|!pIK�O��~t(M fe�O�dN�,e�l3d+ ;Z#J;�g�w!�AbgdV �`'7Dol��gNpnr�=i|mWlmr���8!� K* O ,' '�J%L�C'M.inC=,{j�jCq.`'f�AD��k
�"� @B�|pDY�fmf�t�fiV:n�)�J!B}��!v���8m6�<`2"o��l#�ep��EU�|]JO,$(Gx)U]tl�4h};�Y
��8�)v`,�HguAr�*q.�Qza5L��rI�ezt�ԩ�J`*��*(-/&7n�R'o_�t|Π�.#���2dů�Gpxf!l?�-� w9mi0�k��a��y�%m�s�;fn.d $@�b�/ wB?K#( 2�
��t`%t��p�aj`|@b,lGx2vBg�l8"d7hP_�	LXnme.�9`�a ��!dJc �)vO�zi�l�^�c8�{ȱ*9�!H��h�7���=Yl(�����y�"�0)$$=�3!�� a�gw({>.��Au(^�a�cl� kEΦBl�fd�k$�n}�Le'pf�/�� a.Op{ur`go�Bis xk��a cc*�!�lPE�y�3'�� s�8%�t���n��m��l`�ffg��AM�QE�^N�d�!.\ qc�4;)��dC�q:��p
G0 d	F$`X#gd]Y>Sx9,#q(ylNrme��tdnlEcd%,	;?� }
8,mjMgULǩ�m8<l+�u$pBv]`bAY~s��jeih4`3T~h|�9�vcu�>u/g`-d	}�m�+|)W8udrb,N9slybwT{M�lsh}dK/#)6/;B n@-}%-�%i$�--�/m%>/<��-M�==�)%N�/d,-#\.=�=a)-݌�!	(�=�%�-D!G_�8%5��ً��`11�yAdm&/ ?{�'%lM<T,-e.u�	�=eE%-I-!!=}�9-e'm-'=�)=�--7/=-8d+-�-=��<\I:0av,1�YEDl.`i}S�wuveh�ggQ`f`.���`�2Ij'rX`��kt8gN�`vOgdZ�f5p(�lYgA2�Mrn�4-+��gN�0z��m3yz��)m�o��)�|�1i�W��%e5o�-)	�_h�!�:,%/�1�%�%�Y�%7�����'///5
%�%	-dZ4%j$?�U�ry (6%.35f��h�M�gal6m%4.S >(JisCnSid"�bcpj ̫T#x3pb8|?e]|hl>qoMW=�RuO��wq|t�/"�b�uE�f.kSa
�)*)/�.,'�%=-�-%o�<�ia,7-���'��)�&)(=!�jm=D--x�<9=%�=�-%Y,)?-i)/.�/%)?")&�"+"�35d)i��*/�x--u=9)O���i��?�+�}/�Mm=%%m�i)!-%m-!ey>--�/�5�kb%--=�hs�+�wp~mG :�--�/�(5��/�,M=)%%)--.O�|m�N�5A�,-%d9L?54?��)-?O=e&-<�)-m�m,<m<(���oM_~���NQ� �w#}=Fw b6��s_i~m�L5vM@A�kEP7 �a'�s�o�f�Urv93-/E/lW��G[G:�\��Q$� )0�*�TشAiKe��~H�%oNst�dg`8�VODK=2!�0&s(g�%-k��3�Gjw6�t�A�FG@�A_`ġWUh�@%}��iOetd{Und]]KE%?}t{dAtIV	y�EY420=%eo|zQbU3�AInwSY%h'Ssas$G{*c;:QVB��g�\)h�ۊ)a�AE�@str,�`:�e�N�kdyjw��f1btrqE(dgQ�^�j:rf�K��ze[ua)�rL"RmOcwmld;��*< 5(r�
 B�ijjz�j:�#�ool%xr�-ako-��/axh8fqm~M~1j�o��s�r�zjk��f|a�,.���"��y��S`Gq3MnA[DC{O_x2<p>7jAV�2BCo~x5.rMAGS�Q�erAK,Mb�|&+�7��nNaC-�)c#�rlp'{GGlsv��O�hOr += b>6FCgg7�q.i���8�#��s>�AVA�g�YO-,�=�x�/>�{Qfd�Pkg&%`;�6�3:2REMZCAWw� 6|�hs �_n%�E�y^�AMS4�Tf*/���sat�VaO�_�FL ;h	x��Y�%�DrD�TELE\]{Ni{�c?*q%0�EBtZ��H�H2 %6dhd0�k!^RJoCEI$�}d�z��Es�8TvGW��UFj�t�FI߅|A,a0!s.)fK4���AF���U"7��{Pc�Ekp0J�kAd"/�
��f[u-�FfE��F_P.W�;���_�]�y(c
lkQ�c�qa�@r���="0�i��{[w��AfqD]D�E�W�NQ�Hdl*���D�4�>Rq-�/�Voa|b��Iy.sE#�K�9n*�2. -)�m��+�m}͇9%I#�=-o-m+�!�.}?+=)/�e)��<+�-��,��|m-��,|�YM�.�p���+�S$$E�*nI����M+�%8+�E9ɣ/�=#/�4�)�-?k)=��-EMy��7o�i%%y�im+'-5g%o��#�mD-u%--/|E3 *>�alaQ*�Ouf3adt�0 e8qUlms B��Q} xk�g6D(�4#�oP�r5k�O�8e9@E�h՜(cg.d!_��ck9�231plv+,(em�n�k;�� &���ic.�co,rc�ivph+L._�g|�N&dcaSff,oC*y�! "UlxTi�Bk"3(0*F	q�9�"!*<,1g.WhSa&6� <�p<`2<U.(Ay}IvDB�c�Gxw�m*[%#�4�J^�vnBus�t |5V$q�:_}k6�#li��LN�3P�a0)d" D  `�H�>b�`met�wtE�`6n* � 8e&pv�gzc��'!tc��s Ev(H`H䙹 w$4͡��t$zN#�#>D$;
8�� &ht|jbf/aRD�60��>� ;
%d9�c��}�g$GSg�u���0*� @=�/o�Xqrd-%�3f(P�JO�6eMt~�atgred�=,�ʳM("r�4uxn��isv	cEkg��1�r)��㼽�2!�h<v9�i{(Bmmde!egcApr)9�"u.� {��czwq,�ƭ$�a�cl�#`{�b,j�lHhe�vk��Do�|)�$0  � ze5t�~>hye$��*�" 6w�m|5#OxKKEl=��m" FufBi#/`�r.p�Mess(xzy�G'��md6t.D���~r?�'�PfR$%wbT20��b@DM�{fT@bqUx
 @ph�	1JBy1�5�n�Em.�f`baVm}A�VE�~e)��*`Pea8Tdabcz~9�1(�D[* ��i�as#��h/w.��&pptM�J0�!�ePASl�^e]d�c5�R�Z�}RA"u�{�M� �t�[�f^e����0H&�MRnGh"jvv��*�hv(2JB  0���#���\[d�O�)Nn�#XikDi<s�"�*  !.e�!A#oll�i�	!�vat�9n�8l�o;j! �(}��0(rv(+;�^���M#.5`rhu.v��ttv� ��a9?`Vqa-!ID|ci#)��
�`��g�mc�U�Oi-%�"nw�|f�v(D%v�(�iwm�}^^t�.'�H�ts%+;�
 �B!�,nw���+�m,&�%}�h|zybet�I�pk�m# `kN;`o 3
�! qx]*;�I�ocN0."�C�*�1qr��`I D��Sk�Q_����W�7M;)<-�gm*�� e)q�u|Q'p~~Bljo 9�8i��	c�(4,h%��F�*�PkQ}�*^'��ov#r,|n�p�`�3�n`! ti1p.\ l��Ĥyy�:3�ty&evmxks
 ��8uJ��+ a'���+sJ1jmm&�tBic�Gv�hI�.}t�mL�n� FNU]��|��e:v P2+��� �4���,d�cr��P* ib0 �15(D%�~�
(p ��d)������=hS N��y;J�-,qned@�!�lJxCM-���g��o$l-q��1F2�c	n
��~)`Xh�p�,al!�:mv�(�4nk���qQP9z1.yk*�!("�a�UU4g�
q�8Tl�dA<(#�L#|(n�fD<d6G�!av�-DJgml�lr/�picWe4��H��]Ť�&nUl0DQeB_
E�.r<9&` )5�i�`�ѿN>l5$�-8�0w4d0d|��
+  -pxdWEz�<�" (0.J �-u�RzCt[D�S�t�`�.v�sct�ȩpu<a�d�$0$iTn�n+p�nuo��c��mL� d$v})sgK�[�=��!`~�ms�?�%$)�t)Yu�xF�s{FD�iL��sH�qt�`�4V��}�sR��;U����"�1��>@ "$pBi�2� m!�`r{bL�|u4)<�Z ( h�G2�tc#/�AtEqw[�|l�bYk�(}>`[��8,�+ e�x�]�hU�f��frduD`�)jPpa-�!qag,iK`�sno��v�Wp�J
! 4)�@,Av}�@gm��|�e=�~eM|t"fBetu=�|i%,oO$q.��,�!(0"qHH{*^}lWl�hwWam^���=ry"utljC2enu6![��   `(��m�#Og�gy\}\\�t�l#�f��ɫilaw��9&���fjQmGz�
p8,0"�S0�0�I{�^�-e��,9�U<|9�{B!-���i�A0R�s�BoZd�@E�t|t"a
Zdwc�8H��82��1 �
��� ,3U�e�t�hn� �.ts�kg��\*mVn[wl.&>$e% �Eid_�DDD^L,0�
 c#	9ZH "
��ows,V{j(spSSdL�a{i8_��vm,P�cn�>a#!,�}jg;
_DxL\l/t,�3zu�#;(`9	$�0|XSs�0|`�{	0���p��sjZ�cjh�wO@$`ipUOs�=a):�g U&[�'>os�|bAr�'i�sg)n<�Kk)er�$r����.vdra�ei�;d Q���U#�sb<�:t��f% ���fi�cy^B�g� `
 ("�c�mFd���%;`.���`��ld,�(:1'� (0.�U%��qunp:�Y�f�,aKtu[�np�wj�D"`?/���M<n�-*fd!�2*6>���-on(�j��g�5?lo ����,�"oglFS abu�
! �=Ѳ#tq`�i�G�l-"�A&�|=?-�a�MTyq,fjr�g,d�.a}|��q�E,?
`(p(cdq�Yz8C*.D�cx�! =�J�(_���Vi��z�Pbkv:o0*) [:p  `�edSn�>aU{YcO�oP(sl�� 'b>c�ns�Om%S!>G�SU[nAO�_	�[�p��0b28e4a#��Q(whI6e}�`���s��&�g�`a\zn`%R��   um�n(Oq�-e: t�UE.Th�`(xj�LH�Mg�d(��/S._�(Umtb^�0d~�.UL#�e,J� * �<I!u3�-w`@�!��?"+�!Mؘa	kpqN")�P : }}�T%J(�Mhk� y�+jeSqu2dry� ����  2�G|�vl�>%�	�mHu�Ts�|b��4��`���3�@E~Q\�&rpLuhaT�]�L�d�$H`, 0oi;(*,�KJ` Oyd�EF%h��Rtfe{`1q�)Z�4� %}6%vpFiofMv6h�n.Vh��n�L�0ODP�Av@Z)Uy@QEnS�SI�W1�gve|>�3 Q:�)��Bl :`,l�G�c�.�jk��o+�S��.@5�e�~nkl;!�5
A��E1�LNU�((��!�2   h K!3b knD{?   �u� $�+l)(���oN�w$ywLc*� "Wta�iH�{Hud�9Iv45���)cG�l�d98[.�b(P$V]��A&�iqof�Hh�I"dȮ(�!�`� H#���+��at��s7�(�to�rM�F>m�.a� [r�f���l��:va~q�0t�EWKn�xG++zJ2,.h`y�)ay,g�oKjg�."(/�!"S�sa,=��2
�`p$!  r�t1r�-*P2`@�b\� ("#!%	0x�ex ^S�BgmG]8�-1�U^fuTa�F,:��:3m�Ie,�wapxb�P*)&%� y}=#Kn&m�!�/�#b>�]R�����)`>{���$!u@b[q".%� M�2evq�:(Q��8�duxoF$.�d%d  9#njxd��c!�`�� �k jP�p�e�i[��xbyA(4hhS!�r"!o`f��)`?*\u�JC�,`-L��-�m���%+9}-e�(,)q�d$0,�('%=/G-�jm-'�-$hm$v�%%%ll�M4-m)eN1Dmv�#��m(mt��-uvd)siom+8�(O%k�id-)=�j9-�	)-=,=)e%/!<-l�-,-�/?)/�n-(>'/� �(,	��m-�}%�� b-�U�hjf�jamVtLf&��}b}iu�en`kRM^^WCM���F�tq�C��$({�GUV	�?
I���o�C
��1D 3�~e�ygu )w��ow04~
���J�F F%r�g�(%��olW�e�e�pV�>j;�m�V{v�����.bH%4kf0hK�	`%	�E6�/9�#�Ude�d��SwA�Z
`e� ;J�`h gf.`�u	Vw���$
i�htȬ: hv9" �_�8i}H�^a"ƛq�Xhi��(#{M1"��g|�cn�
� _x
  ��TH�
Dm�2/*�$at�qKg�<@�VNT^OZA�B�p�PH�#+oH�
�v '? |ocqb�LZ!"3�gCva�&h�FqA Ch� !�f`el
b����r 9���8chJD`hU�z�1`=:@�P,6"]lKr.d7we�j;	BJ` %�
'65-�.��uv{iJ�c�|z|(~��JEl�o�zn�ir4oG'n�r��(�p<NvC�IveJ6xw*ii}<A��Lmi1aV!n`e($0bo�s,k�hR��$9_R�� \��b�a�}Ru�/i env�n���$R+p�yHc`G�i�,
"�v% c4t�t(o yʁ'�a�tBy�d�O�eb")�#4a�ee��!�! �!e&�>'�w#loEM����U��aI�E��af=]�mk8.h�s<y�J d}�+�,�owv��s�k��x_f'�lfff0�E`tL�B~l��\k;LkosUNpia$`'3�: D�,��ܫa�c6))���*()���%J�i�.l�aP,Fo>vQ.$o�$ g^Y8T-l��Y�qA�X3�4%?�"r��a��g<g{EZ#K*g,�hhd��EB�H��$Kb-.d{"O1#hHE�!��"O�`"�J6bvB 8Gv�se�8}k�NqeGh�(�pxm�)� :�	u"�B.$�i�}�;�vc�ge�9�Ow7A�Mva�M2�ʘ*,;0m7�}'(--M-�m�/?,m-}--��'%��,;$,h.m5]%=� �-/��,;m+-)-����)5�?�!�!
Sue2x
 �$,$(�-!	)��%#/	�(�--,9�-=�} u�,/<N%,/?Nqh�-�+-Em�-$���$m�/�)%M/1(/s��~Q�un_uW���%%in�~r1q<p,w(7�>�(*H&*+1�DY�--	��!}|	�m�)�,.	,��m7� �q�-�-%:-���=1�=D-�%=�A,&{	)�)��=-�%� (�]=!1tsmHpf5/+s*�^��<+�&(�CsEro? ctlgU�4��4tN�E�~M�`jQ�js��cm4�l($k�o$S.q/y�N�[>�w���,ob�l��lIKQ%fWid" -*m-8+/,��-/,i-�/�99o�mg/�am=�-,�7--e��*�e/h,-m�<-,%5.C$M�-�y����(,� �
Zs�/cvJ�IAd`0iEvEs8<Nd� �=���jQcous�R8d%,dG�-nke8 d)>Tfg,`f	Dm�^iV��'�cΧdfqi'�b'�l�m{":��[�''��x<��aZ,�de��d{NgO~9S�CQ�cAD�zI�GT�t�'w���ql /GCb�m��ui�*ݣ_-JZ3Nb�t`tv�� ��1d"Vm���w�}r0e��,M��hl}wc%�}Xtgv�e�*eF"MBTrid��Ҡ#r'�{`eq~4*J *�UH;%|'�:CtgHagRh`v�ctt�Nz/�o1�J�B�koo�u>�M�r$'t�T	bzN&.�@9z���ι�k�%s/C�fE/Q|a?U`6�a�aTyOpg=R}�3u��T 0Ex>T`cd�,�s�sp`A��?s�^p!�PA`	��v*=�*?8ntbp�k|UIk�D�~f$e~`eud.�le_4�t=1�Nh�g��>U
 ;��3,�9t�),'�
.0��J:�-���i��l�U�a %ClmKAs w��}�`�1 �c�O��Z���>cB��cm�E�n7Rk�e.�_D�Fhl�t�pWX� �i�(w`�udkmp�$��EnV5dc��ht06sy�IgjRh3K�cd/.j�gq(cz�!/�whD3�l�cf%1;(0�xpX3F�gew}#)�$/rxB~�k�@�VE`�{��ez�]Si�k¨ʥ2M�W"(l)
cm&3v����p
PkUTCKBPd/(Ffcta[8.!}`5^p::So|8�{gvj�e<(*$�aJfl�`ff\weJp%\u[`5V/h7mzgo(}�\<e�,gE`�,_gt�h~V/6/5;�omQtjw�]n�T�/*> �St6(WV`�?aZ�}��'iG�Aw$B:`H�>j?eq�%v�hlA�e�<��t�Piv�ne��q�_�%`�]�yn}<2�iw^)�m��{� ���5}d``��3Lr5Wu^Ete�}�!|rou=g,NOED�a�e.u"m�%F�T�g-;{
*!$�f����oG�gT4�qVVt4x��8rjMa�}eI�9C�qg�uw�oz�E;0[�	'�X�B(uk��}u�ib5�a�.z`�<�4�>�jT�uN`�e���o0�,�$ re_@f@m��>GJ{�Vu]���HPIKo�]a1�(a�|JiZu4Ǯ\O�!d|1Q	at�#GC�C��jM  T\SΦ`!odXp<biRuwA>j�dpsCmD�9  �,w:Ϊ$+Sd!^���r9hL�b�
c�2-,0�berIyQp52qLlW]l@x�}zauyL��T�fi=De+�4v�i#^tB��m2a=�"�ur�4U0�A9o�|!�dsVe�w�i' ױe��9��6.pg+�'9"l6� c<}ule�a�1{a9sk�nG@Li�y����e"Ait�aR�V\*�dNZ`��T�2<(�.,,�|���b�gKx�* n��(a�-gl �+�M.�-#y�$ Aa9<8�*aE%H�J+�+Tlsԋ�zDR9c�po�i!�i9�f^�" � �U�urp,d�M���%��uj��^/ �Ne�mN�Oc�#�#
�
�?B�%DD5�e��D,��l�zT 4 : d�Glz }l.axwv�b�||b!eO��r!dh�j�}�p`q20c)�' e��~�pRaE�g.[� '*%{��m �q�9g�R�4<'+f'"2'=��s/jp"dlG��@{khN �lR�J�\_� 4�^IyNj a!3[=�rdeT�/!�Hr�"u���m��n�$8&`U6]!���2fq2 {v,
$#b*�w�(%""r	_,<�{|{ []x�P$#~dG,׽v$��H��SD9$�$c:��,ذ k>p�U���" y*i�H����kZ}U� hrgzB?,� @z�)]�Mc� 1R8A](K��j*oU�h�2(Y�#+@e�> /C�jJ�70�ke\u|H'�r5G(�~�M0$Sr,$=)`6��� � f	g���Mt
(0U�~�HY," ky)&zM;h,:l YO?���8g>&�XH$ �rYJJ` +�In{x�U� I�Fif8 oM�
" R7oj[�(
���@z��\8hk�y=S_jE|$?-
4 t;!R](
 `q)0�\��3
$qvu�HPsN#ti2UH|�f(1�sa�uiVuwiq|l�w�z�B�EΨu��aF�+s;`p,cp*iw.�G L\mL=,J�S�!��"�0fgU}c2"gb}1ĭ�ravZ"��#�r�w&`su M�	zt�-`4T8tWNw!s�oh�q�L� �52�u,�T�jf$={��dd-qi|wb�0sX#	6({dR.0qz��b�B0{m�y�&�]h C/��v�ޥm�`rpUG"<2j�ubc~M{nl��p�wt]�:a!�'y�>)~ud�gnq�+�el�c�(�%Zaj���}��rd �oe��vi�gT�Cqnw�5in}��c�UmtMm"����w�n��"u��heps 9�}n��eg{k, Rqqyu�FJ�Qi}Ot�Bgw��$[hhAkuvAl(M.%k�{BBatDNs�,N't"iL%> l��5 ��a�`nf>�=��4H J 00Or޳0M3+
`j�� ("�#��$!|s�m_p)I!eldv#N|�a�[�'� �j%�e�LED�gevlNje��aMpl`n?'ov�n/e�vN�ŗa!�d�> �2f�=$Jcz���>zex39Ail�6�O9f-�ML��ul,�~e| -wnDBc'LY1@iR �$���$�,�J5�3�mNt(w%2�% �ov5`,tA1O� ,{
�8 b/zax$m��"J�e^�_,$��0i6d6<��ODfntxawrP�Bv,-;�8um��x`�^`kg!d@:UV)bU|rgh,(ZT*/p.K<m x0`��ly��^�-GX 8�uOX��aMgw\asd�%|EuaFv\m��f�W,�9/H ��a�h`hQ��M�(}��r!�'�aoPqi2eR��?yS�f0$5���"�1I|b}�u&T|_��eh���tis|t}+�!�@QL#5u��t�[�9h{� i� u`8Hqle	]N�nr�g!ttd�K�u~�X�Lu�Tu���4+`!HMe;�h((` �^�r" �s�*1���rg2prn+�\g�eQ`L�z�eenYj�/l�dmo��r�w	��%�rJ0#,�-,�NH/�m-m|a},-�k)/��-}�I=�!-��I'N-n�+mt�ͨ�y.5)t�i-�t]k%*`(3eu�v&!0jdW2oR�>�eoL}�i/x7J�.]!9M\�Q$4�nhYd�W2(h2��+��b`��wbx�k�oTcr�;`m�<;�tq�rO��d�i{D G-UE-E+3a) --/��o�--i/U�~EU--m���??1��,ei-�)$�w=a�om/�o-�"��=��	�-n�4}��/�I�=!�t:�.8�����5,n��!-M�Yr-)-)�-/��%�H,%-��-{I-%K+m�5qa%>u�,�-o�-$�-���-/{(]�M-`�|"r:&��%wʨ(�-,'m��--�-L7,(%-
=5(E%-<;=?-/�5-��笉mne9��o�/^/t�)i=d!/ -&,�=$/ʁhO6��6j&�hNQ�3�|@�(<e5�T�]𶻯a��b�(�!LY_'QŴA9 cf{*|n+lx�Q�N�Gfc`dt.W���jP��$$$@.e�aT�J�_#|wb�nAl!�HAu�|R�g�M���=�g#�m�_vBemqd��on� PIShY\GwEv�-Td2Mk]QȤ~&ut5�dl Z#Ri�]0���7!gAx>w��cQo(���cNitM:c�iG|Aq
�l�0TpTegA�xT�)%� )�n�:pbl�Mk�h�v����o�E!l�"8��t)Mp,ad��".-Hp�d=%2* 0d,h0:��(qe2��4`zc\oz�xNuf`eiz�#'~n�}she'h� Wtzi�g}8mHr� ��:8�' �5Ma$r{jun�	9Zh�f<~va&2k.-�an�c���(!  �6;�'�st2An�|tM_`� f�8"!0&�B�Tg^�8 d�2s���]bs�}t��i�'<h9kN&3E�z$_�0rQ���<�9�<Vw:5e!OT�( !h^o��vM�."#,�Tri�Oui��d54�b�Ke�!N�=,FJh�Ee�by�k`NA2khl^4WH�7X��s>�
e4tHh��� �(�4R)J�te|u`���'|� Ce�tN�CWAs�15�u�+o�:e~�ch\ne�
$�AL�D6e^3�gpo�6h|��%a�a��Vx+�ff�H-j�5|tjy~�|l�O�'n*��?3�YsP,/%*k��p��BR;|�b>x,k�:�/L�d<��fRj�K{4�?n �hkN�<�l�
cW�jUIfs*ahl�.$�t����a�UM?O*(Mo5,�q��pWǐ�&)v~0���ILF�'k�#)g�^$�+��%��G~c��1�6 
��,&��nI(H# ��l�g� ,DDC�0{��t,�(�o#xI'du@;edaf7v	wyr~LQ�0�N`�f`"{  zΰ'�n�-a]hgnJ$p(��Ă`(felq@S�m�#W,e��/yNas#�ko\7d�gpz-��=)�gg�7�">'cJ�'<�y`+f|��n��n4����nt">X/Dk&:��;?=4� �xq1�5�tk�l���-(f@���i�fx*g"k ,k,i�<?�
#$�8s�$ 5jcGMAhd_gU��* ����|��7,b &�juxz!0=�#*6O)�ad3e�8!C���fIr7$%UVqt�`�JW!q^��#8��zIZGn o!G(�|: j2:^�R(�w���3N�b�"Qhcel"r`N5��c�bcpl�v<Lp.g9: Wph�$2/R�eh4	e2�n31}m�-�hu�Y'��!`�>ebq2�<pcC4�{>��E��s��Z c���O�#d��c|m�g�Nh Q ~�y�kg�uL�]=dǠ`��~kpkbe�c8�huld-!�,nykw|�wT;$�gDe�vVhUGA<y2�4�(��*pЯ�CfzBmgO0'Qd�;�F���{�*E_�C�$� $x���iABt��HpFu�ZEDH;_haY5|X�4��HDV#��m}i�l%n&oq�V�hU�,�r�� �BZ�G;4!rTKs,ZE�FR?UPP)qt,��Wj;1@c|m�D�MR�6yG+z:u`!
$�KNQ\RmD��`��Svpn.DdcEV��Q��4}a:�0�Y�CK:(RXA�v{��f�^~m_"h� }htHnGC�OL�`wgzu*i�dz��IQ�J� ��*H4�K�3�UD�$d�-c%�'d��o�%�nP_���\PIr8\�<EOd3j�-�r�ggpa������TNY]9= }1%
y4DOG;EtE*q AWqEOsaV/'aA].fOKuv}c:�YaK�bNCSI�EmEoFttE$p-:,'�afoi�Q~al"�I�RZM�HOc=KI�H`�,'�k��:73�+oy'5!BAWP�Fe}VU�O�b
7!�u��&'9BcO�c��fkWEVTۑHP{SZOB{`'�jkv�{c/H1u ]:�U~��A�E}Dog g}�;��l$��MkU�T�q]Q�M�	WA&bVn 7$$o{!~#(�nnMjG?�cs*2q/�EXZARF��mWU d�9�l*aS�L�QOz@_E�U_B���p;Q��.7�GZ IOHs\�LvE`@7��.d�a�-��alu=>s�|1|Զ�CF�JbL�E�07 ��'&�u�jJO�bx�tf�wE�Do:]S�%}�dsf<b�o~6p���f#�ILd��(e`d�)��I�ls1 V�iW�^_i�I��t�"��I�E\6m
�0:4>m'/m%�O)==/&���9d)%-%!-T}�D,-	h�+o5�)�s�-�m��!�-�/	%� � #���sS&L% (l(p+on �(/%;k{+=�!)).�)�m=d),.�ia�(d,-iom-/�*�$�=�	mL�,-�($gս7]m�-o�-�}e�{;=,�w7 �.�<q	�lw%M~P@aqC�i�|�Mvp+;2��Ln2vb%Qq(e�Dg5o�-��NlnI;a�{*'���� >1�ek33�ot���4
9� �h'd�"�~'�!( x`��#���a�Sp�-3&{qdE�O��`�mJUVZ:M�y_ t[�ltIXzA��X}g:`Ri}P`y4i]ts/�rO0sn.�#4g�c�'	
1�#:-0H0su0�*(EaGqa�4� /')h]�v��G�K�)�����v��gC%��&hGfa<>�gk9i]hik2t�H?ot(5 !J)$$��@|Y�sjnfpr�AC3�8%��&{A��x\��+�a7s�r|�ib e��5`��  �p/A�ylbG>5�Z"m$n�l'h]qn1eod �[0��Nrf~�g/no#!�0~�ys.Vo#�K/��g(�{'�aD�*20�(0�HiS��i2 �5��\dk�� 0j��PisZ��FlI9`U"ux{(!) )}��Kvg$�]�/,"qpA\i} �f| �g'1=Jp<�9;+  $cADmQ]>�an�5�"'���
H`���cS�cQw5|��oA9�3k�($<n}^���q,4;��:]��Fq434ho�cf(&Gt`o^i)1{��@ �g�uQT$�>&t$2��f�*B��;tA<a_0mgf%E�caumvh�a*30��" ret&s,$L�<!qd5T}ud�Sx�0df53E�5i�n+"m�!�d�8�@� � P��R#^jrElb�n�� V�q�z.�P
$ da����a�(Kv�depjaV��ijKoap�Dn,4�xm�e{�J
 "��o5X�G��`le:�gk�&0��xhm�]a�eb�Xl`�l/��4(6�_9�M�sboe�;��,\Hh!ywgG�oiev�fqy+�)!!$iv
j!�)�iz�:A��oE	0�ܢ�1$*�~e�q�;
$!��'*"�``�b0	wVlx��xY 	(!(#�^kt`K~z�zd9| rj�w,r;nH(�H��S�lD`�gE�m�^aVc>X�v�j? 9�+��!�Ao~ELh��O�tY6LT�h%gdCs�kS"=�-gi�pah+vpCT(F��Ziclx�l�<)��j
�1x ��o\icM.utPu�onWYDh�V�v�n��ea�p��㚸02$� 	�L�fl,xq.^u�p�3��wl<. BAnm5d!;b`&%H`���i.{Τ0$ �n���~�<v�^�``�d�j+na)%�k7�w���(z �@ }
F�(
w�iS�1s4"�8`)8�l*(�e+{.cU��i�I dh&��l),bLu}2���Vzz.�<``~:"B�YSNc�^�,oWn+� ��0��t3d&�iq�[�dPH��,<l'�t��S�;j(  (� p0XtU��XB$��`�qu,0!h�0phi3�mnt$R(
�l{+tiiw,9��b`}�  �"`�T�{X{w�0�*˚ �!t�\aat	eg��(,@yb���xeOj�paw� �
E�=H
�h�ma;*�f�Dl�3*�F�m/��.�Lk{�3tR�Hd���_>�b�-|`�R�&T�IUYI�P�DBL�1-eU�jiLeLo4a\SaF�eu�JJf(v��V49�E�n2y`(�I��"`�4�)[cdp�9k4u�GT,(i3+  `�?I(� ��Ljs�O`k��_��cpaes�+[�( h)�w���9wq�s .�1d ��0�zkKkDp0s0&��f2�;�MR/Kd�}�GnP�Ѣ�(�>Aisx�k�nz?uw�O�M	 [^$H(d$$�xR��Nd�`0jop*�RLC�S�+Le��(oI�s*��)ӽ@��L�v�UnxK' 
��$$=Kh�q h1~%+!9BhWCsi�pcN~%unb,	0="D�H�/Li!GHc�]'���� $ $"Es�h{".[x`f|� v $#.ZR#S@wW�e/6', �6mL��clmlUv<e�aeg5j�4j��w_atI�d�4�1T�Isb�o#��1#1�s�]�a~�AS�!01�gs>�0!w�P�Owv/e��9q�ifuS�Wkk�kwp{�,Qr.�I,gdqwt>?!!"�/�s�axw�O�He�oo&���h4���A�` \,!�9�^#k u,Mj.t業�n1:�O/dvP=�4%�~6�a�%q>U�LG�lfT.c�~p��*�)w/_e�lx�g\��0�cz#5vgP7o$Von�unL�
�;>YUx!}g�p�
2f%p:If�
�XgUf�ktjl�Oe?m��W�*,dP$�=,1m�y"��%`�o	�{p�� `
p��Bn�z` )2�`,#E �rncs`pO!���0�`V�� ��ogeh��y��%��k�!kg�>A?|�)�C"b��T&z %s��g?|njMEd0fn�g�5���in�e=&@Ɛ.-F,/�NElup-tnoh$*��L��c0tY$~��}6s��ZuAt�L�v}$*x� �聧fpY�H���o#n�&V�<%tm_d&�EKj�4x,���Z�q�{qj�oCNEHca,< �fwS��oP#Bv�v�i��k<%&$ t�hp/'>�A�$s8)�><1 8dz�K0;�uec-Sfm�wt�v`[@�sTO2W�Y@vLNUyNR�. ����xTO�a))+a� 6 �)�n_t�rQp Un0RUS�i[�N�p*a�mb.v�vQ{fj}OH^�()k8��\$���n�wi�(] �uln;*Ta��"�4*cGzS|'v�tY4��7~'a�j\�hV�aj�8)x�<� C*Nru�gy �:=8Bht�U)�l�s>#�74v�C�-�K)�
a0 00a*W��vtB��U�f8;iF*im�]��9.# �iRiKz��dl�yt.�3e��d�izet�i�TaA=a�r�z{�oM�y�k�hqI�)9kLa $i�G�ZH`�.Lf_l�ae.!�D�%�io-�c�  @|	ipIpz{�qrD�zv+i��)[A��EA[�,�U,$�<E��� g;j�Z��\�k%uAmT)�4d	P���$1hY[.�I�n�#9�nu2!|�O�|/�b��U~d�*^7h�$��i{*_v-NfK�Opla�e~u*t8�bml�uh�;,&4I��t`)�g`m }DoMa4)ad���ALxg����Cc%q�t>�`"b%^sq��q=�blmW~t�;"�)[�&�C`|<u}'��mZreJe���t)!��`8�ht�ikl!u"f�`��x�e*5G���4�����`�g_-ojh`��sOiav�s
 03&� �.`)�*7z4@��*=(X/�NgODNKo�,��r�;y"Etk7idf`��y,c-*�5jqkt�s!�UPJ~q�S/8�`lr�7+! #Kv�-!�hmw_��d�c�3~�W�m{��AoW�d^c|y��d�x']eztx*w)ij�8ebI�=yݨ0o
"#P4hj~V�~'�.qp��Τ�6mp-�(��!MNi{�pl�<ap�&1[e��I�hes.S�fMuoU,b�K{_'�n!pb}c/F�n�.[�q�T`�9
`Xpf�Θ` *�� &4h�wj]t��|es)s^�e".v�9*e�$j�t�R�Z�eFd?�`%"�1pm<'m��8@ R"%�j	�/^F~b�et0� �k�X�o{sGuE:w��ur�r�r�_�L%'O+�% 3C���bu7FnE�P?�xeS{�b��I�|K�`4E�4)�;;&"K�Y�
2�$�@�h:k�`"s�-�u.)&�+s�U�w��Eh�B_w[ >-�"Z I0��m�s\�c}7�>m�(J*+H<2�jh82�veRMh�UQkr2]@D#E��#�hG���IC�_�>*n]/�~uQ`�xst�ss;�J�` " Y�hhsw]�o}�Jm��-�Y��!�  )�yTzc;aRr\=3x~/E�>|Z'f"pn�#�uy�rVl+48���Y+ &@who.�,n�xq#�HS!'4d�u�qo�bFE`CTE��ch!D(elac�,~q� � ��0=pd3"Y-�Q��W�t��)�ԥ,lq`��$
x�Q{�K�r"�meeV�y�-�k(�lD�dN7(�ᠠ/+xn�|Y*��g+@d$rE$suBe�<zr}�EN1�Ug,�;�aLuK�t�kl��nFIO{�)8*o�h&t`��O37X5a>Os�[�a,OVF��o<���"mhe(O0`�0n0"
n�t+U'�v��W�Fc�4}\ZF`!A 8j�:�ob4�gMoS��xO y.� �e��djdgqT�ajtElk�dzveBka t�9[�.C-*)�0h(~��vcsM]p�gm|�s`��9e��'nd��3F)i�}�a/pat q�( ����!!E��l@haf�L.O�(m �m�<�*Eo/�W}gs���,`�kOSix�  0`xi�
$j,�M
&1
cnLy�gs.�Pmiti��x�'��H	0�2 �hskFq}4��azl-״fI�Deeq�<��Wi��lb�|�t%; � " <�	s.\nk��pBtu�u1=^E�
3	"��  0evT�6Iq|l�jC<7iweer��h9�^d�c��nq�h�dXC'�G��e�uT��H�Gv�(t*Ո_�M8
�% 5 �I
w)hr=rJ�|i{Q�)��=}}�h�R��'H|�P�W�[P!;
, �$�d4Xc�-^`B�DgjewD|��H�*  %&H�Jp � =z(0t$�-wr i1�~d�PA0Z+��KC.yiac��#��Ny�r��O��ai��hB�^SS�Dw��E�P)�2�r�d�s /�{fu��u|i
yzC(S{��T`*<l*pd/dYh*yAnigct$$=(g��L`!m&5�=soJ� !0.8a��xd�Dm�rvw)(��"88 D�Ev4v#{��u!]�)!f2s�orw��m�H��� -wO9dvOKbT)ei�(U	�#�b �0[_ͧh8���`�d��A5�
*5,&z862�u885)hW:OmatkQm@JrdUV0H�we�(	! s�``(!�`��op}k)�`1�0۠|
4"� +$if=�jsF�io-3TCt�p)�e	_UZ_\ kE�Ie�j{	#���h$Ht�v�r%}M}dh!+�� -&�aJHH`j!�4tph{�_z�qi~i�C,+RK	9��K  $"8i�y�IYMum��v#6#iܟeBP�2!b�t� dc&m��p�s)�#$�qg*9H 8!d�&��)!g�HpN�kgGc#-e�h.Oyn���Nt<\U:iz.�Ons00�/��2�&��q.PAEх��KC#!j!$�iîQ�xW6or-()�v��;*`!)�u?+�0Ѥbc�kt�`�r�m\�tq� $�eouh9,f�%�t0cmu�,yiT*�dO�$n4�,��iC�lof{$rW�vUb�E�4lp.ʋJ�MY ���  1c hid`U$4fU��egS31����"aH$)p�y�`  0ey�tg�{$� fM�d%��p�2�K�}s3�E�lkg,_pa�A�KWv/JQMKHMW$2� �&fMf
yiqQi��|o2_%#~[Nn��|te4kjae}' �Am�6e0th5 QX02a�H�/%eMx���CuK��7�tM�w��la�["W,}"���0g>�(k]S��5�xg�v�B �4 �!bI�l�tn6oi�Vm�0#��!fcEe�ud~oqf)~uG��dEO��y*�,1 �!Y�-�{j|it9�-7�ru-�<:h�'�zr,�h4t�>9n&|pE��x�e(%ahfp O2 WL�D���hd@$gWf,g~gM5.�l '|kT`$�f`s? �.eI:8�� `�

&�`Atj(qfR�C4�t��bk�g%r�eMOGRvk��@@mp?6%.�L��! 1(�l9{8}&cto���bie*��ݦ�KgVSC�RQ4�nc�s+:
�/ #dza2�;iSu9�Npyk�Oc�Y^o7�GBO�r�$hf m��5&��ki?�d IRAhh�fe�(�*�i�.E/p�3�����yWt(wm~�)(~+([\ASYNJ�F�se�8+.^�` � txiz�qem�*���s�+	��mDd53,�w�iA>i���isJn{Eq�gp�;H�A$��hi��a*owa�Id#Tm*$'6� /'o���d�T� a1z $h$iPF
�H1N�U�E��Yw2�^�)n�Xc�++I)1 a�n�p_�/puut.<d�a��?*`�� }�(��0&n�B�se�B<|�
�
drp��y��Smn��5�){� R�0�tu��an�l�`ndH`w eMtX����x&)u� jgw�tIr l~�%N%j9#ۂ60b+d�zhxm
r�8b�(� `�$���a��B|s^i[7D(8$�"  cc.g{t@VId.c}pr$$�j}D�>As�iquG,%[%��2� sRͻuhXBk��]c*wJ�&N�KQ�o~*/`T,�.O�|,~md�tep,�-!�a �'n�Ts�� xMH�amjtfo�dl$Rt���3
$!c l;9s*G�Km���Ft(1i0(3.�"!lA�,�.p����?�,B-|�e �lWsWnfAm�NqA�M7t$C���~A]E^�HwfT�1z* b<"^�}{/tiB`�Dip�$"p0�E�qp|0��i�xWzƲt=� 0�=u�Mtq,C8��tg(g�B" 7Kk,[sa��eK�V&n�rqd�W=O}>&.uj�,�Qd-3.7mj~A7��H=�"SEJUr\K�]Tk\�b_INDσ{�:"!�
.(#K�%fep�Ze��GQ�t��j:U.�8g��(-�D,~�y�>���e>�G.r:5>K��*�O�p4DI%/phcw�t�e=亼i) sSLfcVuJEKloC*E|fd�f837w�auoS�r�k-z(pvm#;z 8�da�   sOo(anh!�" qoApm�UeImE,��<aT�400�ttgu��D�TOnf���'&w�	mv/);*d(`"Z�ft��l~� *L� k�46M(E�w�Ac�k\�>�ﳠ���xoh�cIw"dnrm@�t7(� J[)u7g�s

6$�a+p+hg{�=E�f}�O|s_O4aH�cD�mq.9dEl쉬h�A�yodfE�)@"8un*�Aculml-F�F)�T}h$(eh~od�p� �O�fef�)�c� p0�`&6��%`o���p-,>2��d�`(�'�� !0�GE�n[� �"wN�krhF azL�n7d`�LH66��
 �
0���` km�me.�=b0md�/e�r�1j�veLf09/y3�l%5JTEhc.^0kG�h�m%%!~0 r JuGr?�j`4$0(h+��6�ys|^fm.f-[&zT��8&{p!�`2p�N�(mzs�aX.&tq�f�fNgd��1�=8wdMmiZu`r
fb��(	��``�)dwl\6aD.�R@$�$�, g����*�$ 43meEm}n��t�7dhbelUu.u-=N0! d�P/uBD2*!$�8el�@0d�b 2 � he.e�T&�eqL���o/��pcmj�edLo@e8Tm+>QJ`�K0�) �?&:��a�bd@|�/;* -  ;J� 0ad��(n�}S.YcG}dMo0pdu�%!�
� 8�!Y�$�Ha:�Cff&c��W9~�6A	o��a
 iHc0 :'O.Fgj{%�rSo�|�{dY~}M�oT b�ywn�#fnqGn!<���YhWp0�`ys��K~�FL�nPUobu�N�M�kNh�&2"y��C�1���uzm���<L}nl�vP%M4 k-lt�n�y�(|me,s�6�*(t 8:d�e�d}(j��t�t�.q07d�og�m"tk  ���}
�0���50!�TkUl%�e0bH!�*nR�4r�t,�PdJ��,O榥/�d�jwoIu�p1j��,�'e�,�o~lEmDue�\��g.�.||�fz�a��d|fm!�)3|u�*f#k �U`�VOq���.Yyi>ibz�b�>i�Mld�A�mU
lo�ll8;o ��� m�}Ñe`dtag(/��v �tta)I=!.*(*�   x`("?qAs)k��t=4��r�ch!,�y  r ,`F�Dus�(g�CD/?A�A��}�Zh&!`A6@*cvtp"	}qnD U�$	�e}�.�5�h(� $2mLyR��3 5Mrp�3�0�!
UH*) go�q~B`1tD pd�R�O@��":&�Tz�tl4�3+z��yHIt�E/U��k[�dd�c)2wTTz_-t8g6Dv�(!t��v.!u+bCZb`�12e�trnp#qvWm<� |>�t@]j&am�r��~�|{Tvfe\ZRRre|���#G^k�e��n]ldeL/#� A��4�8d�|(hS�[�ee�d}g|�`�o.���	)�;^6�J�L"T6�t�gK|(90�J(��DRe�r[lk��b% !-f�s`t0x$#��;"tiA�nwB�zg3�-��Y$fht�S�K�#�fv�e�:=�%��S���n㥡!Q�7  qjr%�qx)i�fT-P s�$+	'��)&
a1 ��,`��V}vefT.�ibrxI*�aw�,< p<0)*m���| �(�}V$8�qpl�e&o�#	f �;�wV��#OC~No�H�ȁv$"r�vu⪢tMq�dr�!a��f$jfBzef*^�_4F~ ��y�(thiK,vmj�M"P�+
e� �F0� j�<}s�(Ŧ.3�p�>@ݯ���o�c�-4�,HsjCd=�7q"h/�8can_|
d?V*��xjd�Wtl"vY�%;D�)K�<�~40�-�4��Fcli�./��{Sl`m�xnd�|\	4lIS/'�4-dP-8�%"?甡&`yH0d4�
�l[g%6��RqE�gwd��O2a�9`a�g�t/$c�9���n*[p�,S�����o�Xb2A+Mf(o s�s�4�56��jC��TxH�a�T!#M}wf\(+`�1 8|uEtIM�s(k�*"`* xpnkog:�e�Lh�'<*%�8�3o�D�o/b0 �
$�0 �, @ �anl2��c�r7gG-�nrz�"W(}+>�oo�aF�.��.KiF�X|b�g�qM4q: `+��p `0�$c  l-���,�# )��im�!"|N63��G4+ 5t)$hmxW}hb�? {�p�8j $�"GN���3 t`a]*�`Aejb�q(��4�p$�1`u�lG	�)4  � q �[g�E�0o0�e�df&GZexfLCq?,B�")�+"�(�bq�m�R4�*�`ࠠ�2� �c��[d�p:.smi��c%n$a4 >1�2s@!��$X1 ��!"O � h�`"`4`Eg/p!p��W�<bT "X�6 mq��N<rzd�j� 95� `��0!/m,b�*" �lp8�I#f'ObStSE6�Q�_aD���Xvϗ������j!$dl)�e K�1( !�o�Lf2C&nn]hq~f-"x�,a$p-��ci$�2��pqa$�pb7� ,Px�P-z��a��gc\:mt�'	# X,4� F�J$,�t` -3�Hiw��*�h�,eb�d�g0n`k5g�}tW��.gt+wQ�`b�*"&e My(
Ā\���dhFuz��]ptl_(06iua�7��)�&*�� �d ba$K�M�tmk�S>�LiSd,E��,�:d?u�Y)ANey%J�+ ��r x�$$s1�T(�a*\lk�dh`Rcu�c�;lbi�UU�pBn�D(�c�#s*� !ba� .@� d�" �s�(b3�i (�"�8Ux́�0�.�d@a�7 �S@79m��{_l�] �c)d�ba&�&�4�m�g�5H�qN��o�g)&rL���K./�g �=-�'fRVb|)�&��2D|zKB�[#/da/%yOwZotlnG)'�|�g��HR#P�y|-fC-~vsg9M29hi{ro.f|one�j�(S�j)wq* )h ��b� .6eeC$vC`MeoT"DgsQ)�%}Aq ]eOt=4�"`5` $d��fu|�Fp�l�ly~t�n;C* cS��q����m:�4}HiZ'�V}j@k�C`���S�dbcI(�Z!d�xc���1rI%w�v��sx-M�p1i��/��)�ot,��[J *]�(7cgFtt�+kl|�npj�,�vh�%/6) �B���8gvPj�Edv+#pO�+l�ep� �%GhG�6�orxa3Kqkg"	M;N#m&�i7um�ie6Dl��r�++}I 2�"�&h���{�f�2y %�5+8Vn�"�Ng�?jlsa�C��SqPq�4<?�:z0p�|0r�uO,�SgT���KH.p9?Fdr#�? ފ袧)Y@d �6r�awmr��=�$��g�!2xZ0` a ldG�ln��ao(hcw.l�TJagN^`,�mE�D<3Ĉ/��s~nkd^xOp�oCu�o}���MbK,�d@I`"}3!L_ig���np�|e:evjwQ�/ �a{<L�%|e����} -:�;dap�  Mua )��hs�-gmg`�%�TF�Gc]zOA{�m(3
���! ��adk�I��v`ob-6?2@2igv�y��%�B�S�C�XW��Vena�Q'bY�*�jrj�bb_8�'e�<*�'��dU�PB0��t"�z#wCl�yr�CVA2|A�hv`�KwU�K�*	�0�  c��j�a&N~�Yd�(<*pQk{f#s�<��rT�	fS��
OVM[�?(�%�&c�.�tbTb�I�.�n/5/�iSYh�qq�dh0qcb�.c�nbd��c�34�$��$n�K�U	cT
�� -,%P�]g"�M�/t�dcoz�MQ:��hd%7~�"dwd|�!n)&��b{Rh"6����v�d#�WY�dgF]nⴽj���}{O_qhrE4:�vgn�!�#*i�21�4rG���4;o�l��.��u ��._�~mke?$�ucGOLo+t�hv({S.�%n,&�f��G5d@pKb�lu��LT!=> �(-St\ra~q�o��t
);
$0'(�|N !m)w"�p$+|` w<a0$Ihh!l^%/U@Gp0���p�.(k�� 0�90j�B�+y���|b�ent(/h"J�0$8a�P(yQMjlFd�q�1*��&
�( j~;
(e0rujtH,c��azm.<�8k{._�!dmeo��w�_{�}�`M�uoR@L/lWI	�)Յ^T\MdNBM�[�|$ �@`7naa�a-�Vd�dLeH��); �b10�`�p<�<]"m�GI��cdHU�w2 y		a��fh-�>�s��h9d"<�{'���D�[s*w#���y�a �#��]2}j+��a|j`&mDv�G8,A�H   D" ��+��<��P��1��`&��!��o0 �}7n��=��!�.�hdr~b)\�dt��9
�f"�q��a��,% Wf�LTI�/��i$Rn0�*�k�bq5!Vda94�,�r/efmTND'	�S��r�b�td;�q�TH�o�;ʻf�0`��=e �bho�Oj�(-eVm`t*�&q�heUd5���.�oZ}d�wXct�sebqS*�dP�!�oW)_1�'(nqlEDT- �6�:�H`�p!n2hvy~n-$U}0o�:dDiddht@}h�� <-%k!bB`fcg!R[H@`4"$4N!r�_�nulcnpg`u$v[�05v"dq~d�xU!�"ici.ct)~ �</=&S(pHm2�z���x�" 8 cic*t1t�e0f. �lIRrehd+l|j'5a}tPhr�w"�$jh )7!�'��99�# �iynTm�j��tf�x<CLZtu�q �{ S % pv`��(5�%�����e�#uTtqt7'aiCtN��efqddno<tY�|e#?$:&*}J� � 9|@!3.D�b��~u,[D7K|5|��5�H�jgVi`o( '�89a a!m*&@%R*�Ge�}i;xes�L4djR7nr6t)l�
iC'NV�>|x&:t�iq�9�a)��kj]*E'lu-�u�W`�'}t)q6e^t�&CH~��T���
0!(``�(utnv!{ � q �ohte|ծW*c�����E��s}	eay nt{qmDq�=�ef<+cyNM!_�SEWOFw�*8VqUZ]JoW�VDjw7b$U3
 0�.)d83UE=h�}d�I���0D+pDnglel48)+k�D3C�ss5�c�-tbi�%*�tAG[_nLx�C�ǟ)��~T ��f|���o]k{w�q�t@t/4u5PJ^���UME��(Cs�(}
�$,8 0a�N5��d&݊mqe{��'ef(�v,�B�{�E�_��?{�  #�0aZthk2K��a�y΋ 17(#ld�bT˭ag�x)cI&d�).O$�m�i5v);J!1hgNv�^|x�mfRAӱQ� dHR��z��H�HqS��
+8,��$0�%r}mx�iD��vif`�+�1LtY�|~h%�K�|#9�.vp�� �g���iay4djc�1 \�#$xB�~w�x�>T`bq(#;�b� ��&Bet�rn��!ht W
�0�v$�n-�D�u*_�����yr��h���}'owT
 - =xyx(!! � ie%xoN~-jT�w��PDal%0; IORY|�d��H�Χ0kH` �- n`zm~"Oh� �jo7(:+  ��{J 1"XNdho.dx�c�C.wLyg.D�EinHn}
,z+|[���_leaV$|hfl�f6br/o�%|u
7` `c}}VaIf(�P\
i�.�f/jt}e|`��JNXgD$��re�ԡK/%t�B�ns-qWnT�I#3[��a�(Jdr8�D���z`�"�Qg��h�U<vf_qgni�'T3�bw�ReNa�<Np�p�2��?7Be����7���=�wZyCDdBNOs5� rBT�eC_RY@o_\�S �:sN,o#u��Q�d!gEq'df|j\N3;eS�zl*VDm�Tu$W9%_}pa"j($ $�
,0m%�& <Ej��:�N[hrQt�yC4-�e�rk&&�rI�9
wH%"a� av�BY1j;�� !p�
1�c��A,�xsEm��o��c���xT~6m� K}P�9
!80Ln�m�t� k��sstpw�8 L�r��B�2VD:_�h�# i$(��;�phQ|>w�ng�k�y�c	 t5��s���Ezv2cimu�B�.$-}h�>jld���	|!��do~?G`t>j`�e(�&a(�iCraT�B�{�1#|�,0���.��8ܾ_dLkgoft(Qep]K͵��P1�y�8t0��f6!x4r�8kG�bNp$�rg�>��e2??iP�=,A\S@�EG��a��c!d�&g@�Ako�~gPp,�Q��4��b�!(10x��`  �1(ijJpezD/��mnfk&n��P�=%�M�d#:�}Kft��r�8,a�g'6%P�[go-cj�b}"� bF&2�(AmnJ|
4���`v h�0Tz]{N[�"|���PImc`z�9�q a
(aG�8~��f">a|;EgtriVutr�v��W� ��$$�� ��p��vT�h�p}Ym� !``u�� �4`^F ! hrUfxr*!nh�s&	
`�Ip1]oe$B*nK�u` Fnĸo+02;��tCN���ers@�Ppy>�d�(�� ��8Un��Fqj�t=%d�Q�t[U�DEr
u�*��>Vn}m��t��nb0Jbj,oTkg*k Awta�Tvc{nq7%�?(�^�a9@pa�!�Q B}�pi "�����!,�GYD�GU~U�|PI�UV�Jbq)e�5q�dtr��[Jd� 10(b �Ftm,�`Tq	=�ibutes[dataAttr];
      }
    });
    config = { ...this.constructor.Default,
      ...dataAttributes,
      ...(typeof config === 'object' && config ? config : {})
    };
    config.container = config.container === false ? document.body : getElement(config.container);

    if (typeof config.delay === 'number') {
      config.delay = {
        show: config.delay,
        hide: config.delay
      };
    }

    if (typeof config.title === 'number') {
      config.title = config.title.toString();
    }

    if (typeof config.content === 'number') {
      config.content = config.content.toString();
    }

    typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

    if (config.sanitize) {
      config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
    }

    return config;
  }

  _getDelegateConfig() {
    const config = {};

    for (const key in this._config) {
      if (this.constructor.Default[key] !== this._config[key]) {
        config[key] = this._config[key];
      }
    } // In the future can be replaced with:
    // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
    // `Object.fromEntries(keysWithDifferentValues)`


    return config;
  }

  _cleanTipClass() {
    const tip = this.getTipElement();
    const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, 'g');
    const tabClass = tip.getAttribute('class').match(basicClassPrefixRegex);

    if (tabClass !== null && tabClass.length > 0) {
      tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
    }
  }

  _getBasicClassPrefix() {
    return CLASS_PREFIX$1;
  }

  _handlePopperPlacementChange(popperData) {
    const {
      state
    } = popperData;

    if (!state) {
      return;
    }

    this.tip = state.elements.popper;

    this._cleanTipClass();

    this._addAttachmentClass(this._getAttachment(state.placement));
  }

  _disposePopper() {
    if (this._popper) {
      this._popper.destroy();

      this._popper = null;
    }
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = Tooltip.getOrCreateInstance(this, config);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tooltip to jQuery only if jQuery is present
 */


defineJQueryPlugin(Tooltip);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$3 = 'popover';
const DATA_KEY$3 = 'bs.popover';
const EVENT_KEY$3 = `.${DATA_KEY$3}`;
const CLASS_PREFIX = 'bs-popover';
const Default$2 = { ...Tooltip.Default,
  placement: 'right',
  offset: [0, 8],
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
};
const DefaultType$2 = { ...Tooltip.DefaultType,
  content: '(string|element|function)'
};
const Event$1 = {
  HIDE: `hide${EVENT_KEY$3}`,
  HIDDEN: `hidden${EVENT_KEY$3}`,
  SHOW: `show${EVENT_KEY$3}`,
  SHOWN: `shown${EVENT_KEY$3}`,
  INSERTED: `inserted${EVENT_KEY$3}`,
  CLICK: `click${EVENT_KEY$3}`,
  FOCUSIN: `focusin${EVENT_KEY$3}`,
  FOCUSOUT: `focusout${EVENT_KEY$3}`,
  MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
  MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
};
const SELECTOR_TITLE = '.popover-header';
const SELECTOR_CONTENT = '.popover-body';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Popover extends Tooltip {
  // Getters
  static get Default() {
    return Default$2;
  }

  static get NAME() {
    return NAME$3;
  }

  static get Event() {
    return Event$1;
  }

  static get DefaultType() {
    return DefaultType$2;
  } // Overrides


  isWithContent() {
    return this.getTitle() || this._getContent();
  }

  setContent(tip) {
    this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);

    this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
  } // Private


  _getContent() {
    return this._resolvePossibleFunction(this._config.content);
  }

  _getBasicClassPrefix() {
    return CLASS_PREFIX;
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = Popover.getOrCreateInstance(this, config);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Popover to jQuery only if jQuery is present
 */


defineJQueryPlugin(Popover);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$2 = 'scrollspy';
const DATA_KEY$2 = 'bs.scrollspy';
const EVENT_KEY$2 = `.${DATA_KEY$2}`;
const DATA_API_KEY$1 = '.data-api';
const Default$1 = {
  offset: 10,
  method: 'auto',
  target: ''
};
const DefaultType$1 = {
  offset: 'number',
  method: 'string',
  target: '(string|element)'
};
const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
const CLASS_NAME_ACTIVE$1 = 'active';
const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
const SELECTOR_NAV_LINKS = '.nav-link';
const SELECTOR_NAV_ITEMS = '.nav-item';
const SELECTOR_LIST_ITEMS = '.list-group-item';
const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
const SELECTOR_DROPDOWN$1 = '.dropdown';
const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
const METHOD_OFFSET = 'offset';
const METHOD_POSITION = 'position';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class ScrollSpy extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._scrollElement = this._element.tagName === 'BODY' ? window : this._element;
    this._config = this._getConfig(config);
    this._offsets = [];
    this._targets = [];
    this._activeTarget = null;
    this._scrollHeight = 0;
    EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
    this.refresh();

    this._process();
  } // Getters


  static get Default() {
    return Default$1;
  }

  static get NAME() {
    return NAME$2;
  } // Public


  refresh() {
    const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
    const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
    const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
    this._offsets = [];
    this._targets = [];
    this._scrollHeight = this._getScrollHeight();
    const targets = SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target);
    targets.map(element => {
      const targetSelector = getSelectorFromElement(element);
      const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

      if (target) {
        const targetBCR = target.getBoundingClientRect();

        if (targetBCR.width || targetBCR.height) {
          return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
        }
      }

      return null;
    }).filter(item => item).sort((a, b) => a[0] - b[0]).forEach(item => {
      this._offsets.push(item[0]);

      this._targets.push(item[1]);
    });
  }

  dispose() {
    EventHandler.off(this._scrollElement, EVENT_KEY$2);
    super.dispose();
  } // Private


  _getConfig(config) {
    config = { ...Default$1,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' && config ? config : {})
    };
    config.target = getElement(config.target) || document.documentElement;
    typeCheckConfig(NAME$2, config, DefaultType$1);
    return config;
  }

  _getScrollTop() {
    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
  }

  _getScrollHeight() {
    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  }

  _getOffsetHeight() {
    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
  }

  _process() {
    const scrollTop = this._getScrollTop() + this._config.offset;

    const scrollHeight = this._getScrollHeight();

    const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

    if (this._scrollHeight !== scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      const target = this._targets[this._targets.length - 1];

      if (this._activeTarget !== target) {
        this._activate(target);
      }

      return;
    }

    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
      this._activeTarget = null;

      this._clear();

      return;
    }

    for (let i = this._offsets.length; i--;) {
      const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

      if (isActiveTarget) {
        this._activate(this._targets[i]);
      }
    }
  }

  _activate(target) {
    this._activeTarget = target;

    this._clear();

    const queries = SELECTOR_LINK_ITEMS.split(',').map(selector => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
    const link = SelectorEngine.findOne(queries.join(','), this._config.target);
    link.classList.add(CLASS_NAME_ACTIVE$1);

    if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
    } else {
      SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(listGroup => {
        // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
        SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1)); // Handle special case when .nav-link is inside .nav-item

        SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(navItem => {
          SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1));
        });
      });
    }

    EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
      relatedTarget: target
    });
  }

  _clear() {
    SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target).filter(node => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach(node => node.classList.remove(CLASS_NAME_ACTIVE$1));
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = ScrollSpy.getOrCreateInstance(this, config);

      if (typeof config !== 'string') {
        return;
      }

      if (typeof data[config] === 'undefined') {
        throw new TypeError(`No method named "${config}"`);
      }

      data[config]();
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
  SelectorEngine.find(SELECTOR_DATA_SPY).forEach(spy => new ScrollSpy(spy));
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .ScrollSpy to jQuery only if jQuery is present
 */

defineJQueryPlugin(ScrollSpy);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME$1 = 'tab';
const DATA_KEY$1 = 'bs.tab';
const EVENT_KEY$1 = `.${DATA_KEY$1}`;
const DATA_API_KEY = '.data-api';
const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
const CLASS_NAME_ACTIVE = 'active';
const CLASS_NAME_FADE$1 = 'fade';
const CLASS_NAME_SHOW$1 = 'show';
const SELECTOR_DROPDOWN = '.dropdown';
const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
const SELECTOR_ACTIVE = '.active';
const SELECTOR_ACTIVE_UL = ':scope > li > .active';
const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Tab extends BaseComponent {
  // Getters
  static get NAME() {
    return NAME$1;
  } // Public


  show() {
    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
      return;
    }

    let previous;
    const target = getElementFromSelector(this._element);

    const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

    if (listElement) {
      const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
      previous = SelectorEngine.find(itemSelector, listElement);
      previous = previous[previous.length - 1];
    }

    const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
      relatedTarget: this._element
    }) : null;
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
      relatedTarget: previous
    });

    if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
      return;
    }

    this._activate(this._element, listElement);

    const complete = () => {
      EventHandler.trigger(previous, EVENT_HIDDEN$1, {
        relatedTarget: this._element
      });
      EventHandler.trigger(this._element, EVENT_SHOWN$1, {
        relatedTarget: previous
      });
    };

    if (target) {
      this._activate(target, target.parentNode, complete);
    } else {
      complete();
    }
  } // Private


  _activate(element, container, callback) {
    const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
    const active = activeElements[0];
    const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);

    const complete = () => this._transitionComplete(element, active, callback);

    if (active && isTransitioning) {
      active.classList.remove(CLASS_NAME_SHOW$1);

      this._queueCallback(complete, element, true);
    } else {
      complete();
    }
  }

  _transitionComplete(element, active, callback) {
    if (active) {
      active.classList.remove(CLASS_NAME_ACTIVE);
      const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

      if (dropdownChild) {
        dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
      }

      if (active.getAttribute('role') === 'tab') {
        active.setAttribute('aria-selected', false);
      }
    }

    element.classList.add(CLASS_NAME_ACTIVE);

    if (element.getAttribute('role') === 'tab') {
      element.setAttribute('aria-selected', true);
    }

    reflow(element);

    if (element.classList.contains(CLASS_NAME_FADE$1)) {
      element.classList.add(CLASS_NAME_SHOW$1);
    }

    let parent = element.parentNode;

    if (parent && parent.nodeName === 'LI') {
      parent = parent.parentNode;
    }

    if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
      const dropdownElement = element.closest(SELECTOR_DROPDOWN);

      if (dropdownElement) {
        SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(dropdown => dropdown.classList.add(CLASS_NAME_ACTIVE));
      }

      element.setAttribute('aria-expanded', true);
    }

    if (callback) {
      callback();
    }
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = Tab.getOrCreateInstance(this);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config]();
      }
    });
  }

}
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  if (['A', 'AREA'].includes(this.tagName)) {
    event.preventDefault();
  }

  if (isDisabled(this)) {
    return;
  }

  const data = Tab.getOrCreateInstance(this);
  data.show();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Tab to jQuery only if jQuery is present
 */

defineJQueryPlugin(Tab);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.1.2): toast.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 * --------------------------------------------------------------------------
 */
/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const NAME = 'toast';
const DATA_KEY = 'bs.toast';
const EVENT_KEY = `.${DATA_KEY}`;
const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
const EVENT_HIDE = `hide${EVENT_KEY}`;
const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
const EVENT_SHOW = `show${EVENT_KEY}`;
const EVENT_SHOWN = `shown${EVENT_KEY}`;
const CLASS_NAME_FADE = 'fade';
const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

const CLASS_NAME_SHOW = 'show';
const CLASS_NAME_SHOWING = 'showing';
const DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
const Default = {
  animation: true,
  autohide: true,
  delay: 5000
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

class Toast extends BaseComponent {
  constructor(element, config) {
    super(element);
    this._config = this._getConfig(config);
    this._timeout = null;
    this._hasMouseInteraction = false;
    this._hasKeyboardInteraction = false;

    this._setListeners();
  } // Getters


  static get DefaultType() {
    return DefaultType;
  }

  static get Default() {
    return Default;
  }

  static get NAME() {
    return NAME;
  } // Public


  show() {
    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

    if (showEvent.defaultPrevented) {
      return;
    }

    this._clearTimeout();

    if (this._config.animation) {
      this._element.classList.add(CLASS_NAME_FADE);
    }

    const complete = () => {
      this._element.classList.remove(CLASS_NAME_SHOWING);

      EventHandler.trigger(this._element, EVENT_SHOWN);

      this._maybeScheduleHide();
    };

    this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


    reflow(this._element);

    this._element.classList.add(CLASS_NAME_SHOW);

    this._element.classList.add(CLASS_NAME_SHOWING);

    this._queueCallback(complete, this._element, this._config.animation);
  }

  hide() {
    if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
      return;
    }

    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

    if (hideEvent.defaultPrevented) {
      return;
    }

    const complete = () => {
      this._element.classList.add(CLASS_NAME_HIDE); // @deprecated


      this._element.classList.remove(CLASS_NAME_SHOWING);

      this._element.classList.remove(CLASS_NAME_SHOW);

      EventHandler.trigger(this._element, EVENT_HIDDEN);
    };

    this._element.classList.add(CLASS_NAME_SHOWING);

    this._queueCallback(complete, this._element, this._config.animation);
  }

  dispose() {
    this._clearTimeout();

    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
      this._element.classList.remove(CLASS_NAME_SHOW);
    }

    super.dispose();
  } // Private


  _getConfig(config) {
    config = { ...Default,
      ...Manipulator.getDataAttributes(this._element),
      ...(typeof config === 'object' && config ? config : {})
    };
    typeCheckConfig(NAME, config, this.constructor.DefaultType);
    return config;
  }

  _maybeScheduleHide() {
    if (!this._config.autohide) {
      return;
    }

    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
      return;
    }

    this._timeout = setTimeout(() => {
      this.hide();
    }, this._config.delay);
  }

  _onInteraction(event, isInteracting) {
    switch (event.type) {
      case 'mouseover':
      case 'mouseout':
        this._hasMouseInteraction = isInteracting;
        break;

      case 'focusin':
      case 'focusout':
        this._hasKeyboardInteraction = isInteracting;
        break;
    }

    if (isInteracting) {
      this._clearTimeout();

      return;
    }

    const nextElement = event.relatedTarget;

    if (this._element === nextElement || this._element.contains(nextElement)) {
      return;
    }

    this._maybeScheduleHide();
  }

  _setListeners() {
    EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
    EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
    EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
  }

  _clearTimeout() {
    clearTimeout(this._timeout);
    this._timeout = null;
  } // Static


  static jQueryInterface(config) {
    return this.each(function () {
      const data = Toast.getOrCreateInstance(this, config);

      if (typeof config === 'string') {
        if (typeof data[config] === 'undefined') {
          throw new TypeError(`No method named "${config}"`);
        }

        data[config](this);
      }
    });
  }

}

enableDismissTrigger(Toast);
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 * add .Toast to jQuery only if jQuery is present
 */

defineJQueryPlugin(Toast);

export { Alert, Button, Carousel, Collapse, Dropdown, Modal, Offcanvas, Popover, ScrollSpy, Tab, Toast, Tooltip };
//# sourceMappingURL=bootstrap.esm.js.map
