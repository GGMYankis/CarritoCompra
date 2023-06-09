/*
* This file has been commented to support Visual Studio Intellisense.
* You should not use this file at runtime inside the browser--it is only
* intended to be used only for design-time IntelliSense.  Please use the
* standard jQuery library for all production use.
*
* Comment version: 1.17.0
*/

/*
* Note: While Microsoft is not the author of this file, Microsoft is
* offering you a license subject to the terms of the Microsoft Software
* License Terms for Microsoft ASP.NET Model View Controller 3.
* Microsoft reserves all other rights. The notices below are provided
* for informational purposes only and are not the license terms under
* which Microsoft distributed this file.
*
* jQuery Validation Plugin - v1.17.0 - 12/5/2016
* https://github.com/jzaefferer/jquery-validation
* Copyright (c) 2013 Jörn Zaefferer; Licensed MIT
*
*/

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {
		/// <summary>
		/// Validates the selected form. This method sets up event handlers for submit, focus,
		/// keyup, blur and click to trigger validation of the entire form or individual
		/// elements. Each one can be disabled, see the onxxx options (onsubmit, onfocusout,
		/// onkeyup, onclick). focusInvalid focuses elements when submitting a invalid form.
		/// </summary>
		/// <param name="options" type="Object">
		/// A set of key/value pairs that configure the validate. All options are optional.
		/// </param>

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			options && options.debug && window.console && console.warn( "nothing selected, can't validate, returning nothing" );
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}
		
		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator); 
		
		if ( validator.settinG�lk��uAmyt%! K��%�MI	+-aOl-_t�>�et�u�ih(najUP`B���pd5A,�oE�Y!2k�[dl��1k� tl b �rW�S�i�e�uT�g_�	����yb.vI�f8(�em|<xB}qiw�xlf'le:8C��,k�� ixglxC�(cu"cuq/J)5�s	� ��v@��qkt�R*cbϣ]�s`�mQp��tV;$O'
����	�	:9M��	yj�g a!�e"m!0lq�df$61	�*�q%j�x!c�4�o L�D9wI
E�q�h
�0jvTz/mJ0	yg�n�cs��w�sFV|�&Wsqb��TZ�,��ru(r-�	���nR.mGu��k�Qu<hcuuvO* /.Gy>Ef)"83�b^eq�+|`hmkb(B�f4�G�)9�YM�߭9	�e,eeC6/")s!c�kVr2iT�Oa6'P\�w�-J9_i!mK!9+@I�JK'>Dvp�C�l5q\Y�Feb�(��W��Qd
H�͠`}G&9�b*��(�&8�Ps|{��0%pgv� �$k)
�>�f
(��M�iAa�plwnuxyn!�dUf�q ;��		
��j�{�mn!tgpe�gB%y$5}@ȥ�!2\�tR�Sg�j*�w�nm�m��p�tY�	y���j�q�M�Hl|�mbI��e*-+
	�)�	�	*Gu��d��L���d/M:�a{i^@iO)Y� :��Id�dfu<2cE�i_h��_^j}{�Z�n�<�f%�{+	�!7hYi �� $me TVB�65�+i`b^�ogk��]�9=�	7� |^��r��Ak�m�{(�QW�$�w(Cva%�vu}��y0l�T8,}uoHQf!�wi�@a/�����|w�y��(!tc`�`h�av �61j4>�&;W� IJ�0`iM%$0�+=6�.�xdQj#�!1A"o�w3�k`�d��QE	,FVqd�/^.qk��~ah�:fhIH�5mX�gp*�mnNt�m@�,qg/-2�@l^fU}e�!����dӘ�bXru��f}j�.
	�O KiQf7��n��jr���T�GqjsS�mipgJE�Er,ni�o�`6al!D%�tLnPH$)e+���d�?v�&.Q��r�8$/J)��H�iF �vq~��`t�P��GBy�,*�Dtk���a!))ga��.$)�d����A'&}X pf�dP7Ar%p��8(�N�S0On(�b�n�;6gJt&!h����ha��0jE`R-Tma5l�Qd�$i��I	l�f�T�m27�N|D 	E*��	����)8�Im-eY]voi&#�u�QIKIr�	-H�s6cs'�u�w�+k	
	*IO�5�B?��s�vwIu�`jeev ���)�Fa$K$("n�iK(c�(đo�
p�bl�q#l�`7l�1�-	��f�) vb,�fI�?r:q\#A��gdR�8i`�	�)	�d`kIA4�x��
#eo�qbe}l`�(%c�p��
	�	s!|3�MJ[-"�e���ή	=�Ki�Y(	iC!)�vM~yhx4�roNor?0 4)yͩ	ʸ#(f l)WEo/vg�d	n�Ay%d��-C�\�h]�vsDy�i�]Z�`t�Suva�v4�8��,��-k��vsT/�hc%m|o;8�H�HIY�) *g��O$)ah�m�i;�O)ɑuhMj%�{˱9'�I`epera�Ka��N�A�f -;*�[	�L qf �aLre#tcI��<ډ���a/^		-M"�	)r�vmR>�t�hv 4v;�Z�m,,B	'$+�t(���ocC�"2��8>#o�Zv=�q�x.N�tke hOd��rm�&*^����!ba�vmo�(9pr-F	�--�y]Im7#ܾUj��.3"�-Ck_W iD�pie �e�U	&0g�r%=yb��i!�A��Q@��l,)�a��ovud�excnfLWc3�xg!'�l�m��//��B�{��`�in�fs"L�&j��c���7�uoO%_i� F-b-`JvNP��&�d.{zq �T|3xNg	Dl((�hԨt%L�=[�l'�q0�|i��<��>;7 ,m�U��c��5g��g�k��t�(!*t�(Ȁ��p�if $�|4hi�y0 ����.vn.�-c~~,$, p �� a (cF}Ff0�	b,�sbkbA\D` <�ol�(�)h5$ �*zvo`e,"dN{
!!(8�08*R">5:2vEmK� 7	upw �MN��  @9" nsr"��Fkta�` �fD�$z��],Fora "~!Lhd�lè���@=�� � 8$t*Aq.��cx(fUtyu(ok!)r.
m	M`um��vC?8ZA�+&O~M�.r1D%Elo� AR���8 ��a(�$!4)+MF8( �a��2" kie<xjv!dM�>-(p1+�"���}��(cp1{���%/"!n|Rjb6$�r6�3�A�e tpA��'���MA#d�v �d��FD<mv4��a��r�en$a�vZ�on���*#roi9�f	Up�~: vU�)poǴ�t�"I�vtm�"c�#s�:�rI�5zx>?Be�'++l^�hkteAP- �r"�oG`D�4�|{�j�t�Wq��S��!�h])��Yq� lyqy`eGemn$�E�0BMfl�24?0l$|hdn'�A/O��&�\hep�A��G�|i�eu�ng����VR��9xk$!bI�=�S>!ˆab5�+-n(Ar!`da%1�2fc�n�P |rs �n F���y�Xvg N�m�S�|}&R� �ve:hHP�g -xiP�J�M*^�2��R�$t"*I�>�����E��d�  %(}g/�Ypgcah"RT0�A�eD`q|1h}Mv-�^u/i1$�^)bMid,i$dU9,8w)ntm�,s	J� .���0LtZ�jgee�c�!)%U�em5��5��va�Ag)9�)d�u$�ztNjI�'6dA�r�bp��}.A�<;Ă{ra"�C|62+� m�+
�u)�`(�|P�{nq�CQ:0|�er[��w9�Vv|�Ijc-�`hdc||o��-�l�i w��5�;*n3|s��&f)"/�![� a
�!%od+mh��Kay��2>t��_}�(	'An-�gdlv�x<)gh�aDh\f�lN��t�mTq�4��dyBm`��:�L���l}"hT�el-mAN%�k
9'-�8o'ud�%x�x3@Em/-$�#b�-l��*`B!M�2A¸d)*E5 |�ez�#~L	�v/�[2�(bqb�i4N�q�2`LF��o2!Ƨu��gj�MJ��9#H</D�-&�
Y-n"-|�#)�1PM�|re��0{e�p" t�=39�./G�%h
Hspc�t���hi���!�$~"% k�e5ove���!	/#+�<�P`'�E4Li�nq�9tg�OG�w |0u`x�{�]�m:	L*	if .kd#�zD�9Mm�  $2@�vlaf��8+ d$`1ts�eJ}�&8>Gk���y��E�et/5�".xEtt\~e�=RI�~!0cfa��:+C0�C!=�Lx4k^C��27o%2��SMS�z��9s�k+�rW_d� N\&�D�i|Q4ex.�tq�De^y��C �gal�vv(�
aHs�o|Aj	#o�ml ({E��g��. ���UJ�K,�|�fl$8�\�Q�{����`a$l-(la�^apL�k��eE,j�SUL�GG'�}eiD(97}�a	��qdjC�}��[qoud�np�+�mI-h�0Eh�S|�ncRu %1�H�!5!b�u�m�V&yegri�d�+X�y�	tg`v)aq$i#-Q �i�˭n�=ED4�6�u��%��(AYP%��)$s�q�Yt�c&�%Aj#G��ڄlaeaNpecm/E$3�/Yie��,��36d4G�%+���		#z�	{	
��"�S�h{o��6�͊ MM�r0(��2�&dl�9���)�	�4J�tN!{Ph�cgrzM93:N=5TT��klFW��)	��:%�uRnH#�m�t�mgS��dr;�	����k1A�ev�$)|ta~`L=�{W�
)y#9�acc HkkgwO!it��xt{�	�v�O�q�bt���y�G�a/��3y`oca-_	�A jl(Ta0>ZUti�}-dpa3|)��B[�I}g<r~5W?��@	tmn7�:�x�oZyd,!dd_YmgLh��];��l�9�K#)0!Tu2既�,se i ;�1�*��l�
�~pRa �q�b%!�n&�@�$�}R�NurmI��~sFv|e[%X��ve���E8���I[ky5��a.:~atx}� �z�%g4Qnu��w��2(�&�lW$)/			 Fr�j)(�dvv(jlaisW�&-�b�nm|E*q)_M:9)4*^sdY`u"��.BV%5HP4mJ�u7,tEt-�*G6�& I,.45*�dgv*0�a4�Lig�;Cas!�,�[��T)?Y�@w(��e~|99	��;C.�"��k}qtR�1E�vu��S0��@MvkUL��w0,`9dqpdYt��x@ѭ�j^cs0h�m 3&V�WE0QrLl{��� .�da5š>[FC/~U�ui25;�H)-&`pe"���=��dbl&��!�/JRu4�TirAo8�TcTA�8u	+I\`#Y�]=y460�sIdv|C)]��M*|�:%�Ě>���P��m�G!\IGr�sSj4&lX�e&*� �E8zs['� YlpR%�=JV�00���o{*Xq}dRy*�m�P0�wx.s���$� ��Ko/C}�n;,��lc�˘�WQ�'r(iJ�g,$d�qv�..!$�\�Ue8�o�"+h�p(S@+(�<���|qpp��do�e::1FaVo�c0m?�lm'io�&^�,iB�>)j>'�y_l�mH�oj�l-h;��Yk�t�bj�b��y#Qt=N � ov2�M 30h)`�ov�e5�)k]l-F��h�pt2+%nn&g�Xyses�j�cNZmUfc�s�B��	\dDI?7+�Χ)lc�\ �vn%ydbi$lZ#�_�c|�odxa<��Suf5b(�h:w�Mc�bi:}�j=��
�
�/ 2o�q�r]{q-�f�z!�btA`ad�*�$5d�hm�����0Ba�c}m�!&o0ic�L�<��o�n,-�3�B)Tl-r#�t8���kK8$!atLn 2w1uO#[=(�(.dy�haWB8�'&i{,vz0,02i;+�p-	���Lm{.jpV[g�oM� ,i0[��nI�my8�i�h�(�)�
e�N�7_t�� l��I�@bn�6)@vh]'2Fo}1g�(So)g$u(�4pg!'{) 7(�-�  ,w�E-E3L�Yo�/`z�;.aK%� KN-0�igZ/^�`VrcI�l#zKt�a�yF
Iq�$c�%(or0e�2Փh�5M<OT$�� !eb��eqg{ �`j�aTIYo \�L�q&2w;I��(QX��~�Fmz�aein�`�olv�q�|O�o�yw^$`�$Bxb,o j	/�g�X/���Ru-�J/�. )z+�O�\fm��wzr{� s4u�58	.W�6H�)�'' tO}%7��n���#0��tm!�::i.0mr�+�*T�m:�J	OM�8��mZ#L��\t=!^ RqkqE�qu1a��Ss_I�a�"H�/�HoUp�IOq�`bv���e(vF��q�?'p/,m��`["EV�!�!Md`�T�K2eiv-1>U��M+):=� ��`wcaN	+�%��T�u�&n� 9p4��tsZn+",��
�I%  "�wu�n:4�ot@.o5|,-���9pSE <t�S Vac�k>k)�{/#Rpp�!ox� Dy���Vf�!y�A�wqllkt5#;�I	`bg�.1fReajDii�u0�` ;J*�(e�5`�"�nal�qap�s�bmp�ee$dP��"9Ah9r$1a�Gy`{~/�+<�*��n0*z�wte(4�xwJe ��"���1]g_cLs��pt$1xtMs`�<par�qy#�) ?V�p!I��m3�i���b�apza;(lX��,npSi'Xly2E1�?(��M�d> 
(�cvi� ��gtZ,Cx�:襽 G�rr�6)�;I		�@�Ch�o�/fpTX0���P�4
	,L<�d%+ .r@�%o^*0�(iT�oY�h� �A(?�hI�qo�Tv��=��L}{#e�Zeul3!}w�t"xUwf8p"X+'-+gQ�;ab\�i0�3#4�?�![�*m9��8�w�}5Q�aq.eb"?2^+|����@~vl.b�$�F�-Jf�mp0 L*O0ofy~Ltr� XT��iO�v�qf�<� W�|*B���O�rS�9��|
	��M#:��U_~�d�Zo+Rn!�k
!�eR��X�� �iVB��AjY}��"(vb(!}1.]95rb�ŵd-���l ,ms"�l
��		z�aurH��a�襌d|Z�auM��vZf�B�m�Ek�V��/
�[$;�j�Ҽ)�,2lj��c%k~��:l. �Q �Ox�+/�s,Mid�$~x��,/-�?�Ot8$��I��O���,2|��@y,s"�!��.agc�}��f@ok)xL8I�/m�� 4�^�+q@&r.IexTa�k�F�=&g�Q�%^�s}j��I?? �k�8��A�o: !%Je���%��ceO�t!%TxzP��Mu�c`�y��}u�(�;Q�dagh`U���I�`8�$HuS�c�Tx[&g?�/FrC<�hNT�t ?�ETk�uF�Nm�kj�#a1�O�an`q)s��=6�cPk� tY>gW�nNm~l�yn��f0�m{iW�Fe(�in�aT��+���W�T�#�II(��y!r+0��~m�n4�0�|x2/y-r~{~c2���bspChiSS}dA7�zf�tk~.sv�n9�ak��3 )3T�C�fj!1�q"dGv!P�Ar(|`��"`F�EvC��lm�`~d��&�kx�<"�
�<!C	��-�	kmfL�7r��Mx g=���hK�el5lflt�5z}K�m�N��:`0�)s�-`n/ pHE�m�Am$ra�4 �"e)ekigt>�I=`�<vK��hw}toit%!`X�!U�ys�����jn��|�%,uj )a�gF		(14 h �l�lQ&��u,ImMt)pM)9Y�8f	u�j�IO~+�}p$R�&�|	.djc%hl��q��|�)!	,�8!mb(l�f�n�� M #w k{,0��Itg�$" _&�NheE(��u82c�K�<pQ\�}`h9?|P d{�)zK��A/}L�l��t�a�ume�+p�		u&�w$�'hv�/j�Z�v�owTa�g��i}jq��1���_	>��gl{kk6jk�3ol#�st0weD,m�=�C�~&�^g`c�1c]�ixvt� I�}f��&}Me�!|V.�`-$_b:S�g�>�{}y|lPt�J�iav/�hKo5N�$�-&ĩ�	�%�/a�v0�uva�,gltd�B��
�ao�l�w'd��B2a�$�q��e�,$��"3EO ^!kc� Yv��,gk�nt�pRa>���D�*n (LHi <wjq/;u`n�vulP�	
	!dhac�r,1$lp*e�x�	�)z��c|v]u�i/�M_�l��a7]H,{�t��Rk�ju�on,�e,MMoj\�r/Zno0C(\j1	f1�9�R�xKs�<��L�ɜ��mO-�t�%rClU{;��t���stasR)t�M>DkM!s3r`{k�Fa3Y�k?E;X,+@}.(�/)lk'�3�W5��t�e.�b�`�ƾJ�."ups�\GȌ{w��Al��as0�(�|+!�14 M/o����='�e�-taC~uk3.�SbsSWl�2Ig~id�@�d"�=�/(hgu`�aS�6�	�)~�E)��n.�(v4qz/ xjkzu�}esa. �>�lq�l.��W%eo��m�Omv`�`AtKr.s$utfa�,LqFM%�DWb	tL�k`?P~�e�o^=�Gp�Xn�#!r	K%o.O%<c�-<AZ���(E?oKdNiLm�i�r`Be<���dp��,�svoc�nALc�d�o�.N=�5	�$��ceJ�;�V�b"t h�/6pG�iPd�]l.�oRE��tyq!w�6:A^��aY5�!ib!�tҮC^L >�wuwLIbi����)ef1ba�eean���k wgT�{�4q#�d!O-BOz`h{Nc��h
�I�� �?g�=�5�a�0�2��L��_���͉-+	'<+zcQ!E>	$�m� _L( pn�����6.dftA�(03`{5ltahGs�)�%O!S 9/n(g5C7�#d/{�,*mr�SVac%0��dhY�`�i�	l*y[ r4q�cTgh%�Z�u�nt�>�
@f%I�m!Jkq���-u��)�w�&#�XI(g�oYd}�V�d cu�-�Qg�0$��R�cax%i)��adNd;�6��qy�0<R`�e�-4Ql1mR$uvq����B�.%,*x#-I���<�aSA tXVmzm@V#��g�baf	lb /3Y,sf�]Z:�LIl`rU8/numv�`��Kb'e�t](JW���(-�I	Jw�'As:.�lli�šef�Ewc�>�Lia)j�%*�3 �,8�e`o+eS�("Z_a@S!��6iS�[l< -�a41
��O�Y(s>�hava�w~($Pm$ sd�eNt�c �vy>mg��U%i~��B� 'we�m�"���iCp�p�tn��~@- S�a�tjuur \\%xg�oD@b�oc!5$fA|H��c�=�9b8�"�|5ieC���2$Q-[vi��Y�vT|���~�a�Dae�go&[9+ǉd�K�q�L	z�p);4dF9l&a|��-a���ԭ"��!�na2o{rgr �ti~�}pUz%xh{�_�ah`skwgEpa+���%J�hEgNc,e�h<h��#�HLQvd��dnvMn�("p$5CSD�q�0d~8w#|4�r� 51l��	A�AGturr.�4�i��kn�d�$�g<�8&,�tl��`uRnn��1@F�;Xdu�{u�gl�)B(gdv2�wu bC� ig�{2u!dk`�94��'\�r��S�(onoD��%�	niPWU:�6kR�i�%���p<vzVmgwhC6LeT�e$G>�M�p!ARvn��fr)����l ��  }u{+�9]NY��c<q$b��j5!aEoc��mVm�5�j��Ag'!�8=��ua�dQ� �mx`Pj�,�k6�u=Pq0e){J>"%&��	_,k��@d.b�N�d�&kJlg�N!108&���`r4��4af�`8vt}�`<{�@�(T-cJ��d6qq�$d`.X{0}."�z	_�*-�6i���"$�f�VetmP3� &�nq�.�F)e�I��i�m�[`_��{i	�*� h.0�:!$ZF�ild�o��Z bX�r
lFbvBo<d`Yc�W�7 6 t'[�q�]��bFs.$r�kR�a*GlCh�qj���I�_IK�1�i�mv3/�"/�p��=�2jlokAb��cN�Dj�E����tt���"sI({.fa�e.&j?!j)�r$�"�	<��q/���"En��n2|!V	1�p�i
�{&4x}'g�s�80�0u��g6y �tqj��*�f0krEnn�	hggfi*V�* d(l�{'e�)jc�~�2�f�YAlG���plm6 !�,
�)Yi#nrqAiyEE�� ��?ւI6k{C/nnt�cSAh$� �X*�	-ɕ)a0V&finoZDP�H|*8 3 �XAS$`b>DIyw"H�to�P<	|(IS.mb�w�+  � uU'.	���i�AfesKU�#;�		�
�`Cu�2<uy�u�� 1�0U�,�NbS��Q{3y&k�:B�J��f!'�-p8u��%�VI?��:�2t/4A��"d^gGhA,n�Eq�"~�mE�d�!
J�]��1c~�n�|��(3�Ne}�g\7�8�8�5�b��">@qe���tc��!h�+ �
XVcsW\}n�Mo��v"Iu;r��S(�0;)�
�cz%r5L]s = )i,'md�cJ��.u,wr�		��4o�a#j@�y$g�, �\��DA/�,�hl ���dY*�8	��@n��C{�a=$w6l�+�i%��?t_nnr�մ��]u�uxWi�q"ke.�)/M�(	M
�)c%~��j'r 0I�igAgA�=?'^vKf��-�)j/gx=���Pl�$���d@��puh){ZqTvL�,|f4~ex)$1ro�2�=��	iK��cD$j,U�Pe1 'n*�� trw��dx�m/�%�Dz�87\rbPi,��ee�f2�c��=Jp�L/$su~�.&TFmj�g���t$f\PY`�]�j@whm:� 4\:#��u"-��s�k���u]Pu]*`�`, vmD)L�ro
5(I�aj���	)ym_�a	%ht�#+�twZin��gsL6	���IO��`�Upa�de4e(jz]u�-!*smPksȲf/��N�=�$4�7>\ov���Xpe`��:�<��CI*yk` fju3,yd`a)�5p��wheN3�B(��	.�|sh�T�D�~and1d�bs)�iw'lAlmGy�o8, 0g�?o�."�qudP � *GFIXw)*Q�m}g%�o�9H�9ke95&H�+3��hj/C9c"2����X`fh��b;�	II�)4h)`/sa�sE2F\Rͧ.�/"I�9z�ena`��/�K�wa$L��B�(��y;is�r=�ng4�E�Wat�^�F�dl���� ������S�) bTlg:e/un�/D(Y�5s�CnD#pvgi�wo#�\	4L7�gg%^�|yeU4a{�'Fm  -�]:h�g.}|O]�x���I
H��;?��ZV)tjw��J�.M($Za$xfa�e� 0F%%K�rU<�vut�^�s�t�re(x��9V�Aw.�ɬ""QdRCe `bwx�E��@@nv/ h9��pdx�vos`qgd�)-[$il cT:|A�k@n�<�ruv$�u�>���)m Ugs��/��i-�-pl�{T-�a�X�I	A�.;�42�5u2�s�UPrg�"�kk�}P�#�g��Ap%Ktjn#`[Fcj�8)�
	N.�T#�l	�yMS=�w�U�7%m�8ty)��Rrn�Ic�(��Q�*)E�e�va�)p�x���� >,zp*+�,��n`{<wg�� X�0Q*IA)=�i�vh/y6|IL|`�(�[	I�)e�5(s'pUr}.f�/34��mokg"T��$l/Z�CN>wc	�)�\�f&�[nJc�M	,	W\J�S*�X��T4rOZ+�3/l�At%6�{�Xe H�.^ei�p %:
X9
.n<)Yxa3�֫pm*auf~t9oH!)`:z�	�dk.pp$pDeEIB�������|0Vsp.b๶0o(5d}FP�= 5((6h(c�cu;{�o|qoQ�a�5�8q(�Kq.�|��%J�p,��z-l�u
xSۭm;&�:�"	�q �		uii:.gm-&(0'�e�u� �"+9'k!�I�3i-zou1bv R�(ï~yncd 	��]�iHl�#)��Q�O`l}a�>'u�I"�U5���~swO+p�}�y�WV^!F{�)��/L>e�y�+fOr&Qn�O\n�:
g�o�nm|;pFelb�iWͨ qoe���q �LyI*`Av+8 |67K%�rq>;�{��/��x|D`5A�c*2Ifl�'m�g-c44. r7�2tv���u� i'`�U Cb,vk�x|�e�thh`v��P!
LK�
/&?�x.�c"��HQ>�q�DY�v`|-du�Ik5�~�bfqb17ad9@��)�f zeqT�nq:$ydf�e7,V�
-� "�\w65�laRq7�O!��O��p cL�!�l (�Ha\�lt$!tM%=�Uc�E+{o�,FK�y#'/:��go�i#�}$�o !C^yeI�aj�k=k0B%X�i|��e��vz<(dє& (dW2%$)�o/� ^aGB�->��a-�#)�e�u"�c�=vW= �s_lE��f`��,�	-��en�jD,�c�ygQ�"��|00��)�D��q�ˈ	�ll�teq4El1ee6�%!M`omGnd-L�	fHi�n@sdqo�%Ave{�Jd)8C-'��zp Y�iL5js�tVxD.g�LGmDd����-,elefU�I2�	�z�S�swn]q.Tp�s/���o0�m�<th/��	I�F+� cgs�ux�9$iY-�= �ML�0�jIz.�.~�}adRuVme]+t �a�aikMM
n�lqg ���1I; ,iz>;kt7<��O-o�Lg�f~�-�QA<ptF�a(��L#,Ie�(a�pH}{u$aObe�^�i,�A�)dS �{I����@=)?�+-(�Xbmp�dj�dy�u�q 3n@d`w���pvw�.K%��YuxQa&vNXhf@$-���i3�t�<v�>�f`ihtB)[.c��vch�dbr�,oO'��MI|(kS*�n�rNRs1#3-&�
2h6u�fat��Xe*	U:�N�F!? P�T�O;��+"����e7=\CKa.��Ud)�-dG,y@q`o,?+�i[|mp���mg-YZo`qMCKz@k�T�z��W:sn~�C.��n$a6go7�~�)�//#bs}�Q�S~��9 O'�c3xOu�|h�(s���"if�mNc$cFo.	�.-.�c`os $96e"<v��Dv%q}K�:�-(je%�wg`]��o�O�OP@<�s�5%[G��1#�yv�w�_o,x�grh�i,��%x(E�p�#tWnf4�P�0nnc.V~an`���gJ,\,��e`�n|,�I!-g/��r}�m�zh.�)�/�+�Pa�u-	fab�=�g�Z#�t"Bdyv5"�o�bs2 �k	1=k=r�l�o��o7Se!csp��i��(�d�V7�1e~d5f�f$l%Z �Od$CEPj+��
H.?25~puriϿ�HD�B,U2jrc���d#/�a v�!d�C�"t�hmX��,���aa~`��#t�,��.xEm�*��l�j�!�nQ{uz.)e*6_Zw)+7�
PL!'zEjr/0DYVu1�8Q+E' 9 feb�9mfQ� NELD�J,�xg�w*)1=�K���	s)M&�lvI�c�@��(?��II��egr�fl8`�+v�ck�a�u]nK���m�O�|Qm-np:H3h�j�YN�*}Z#eA���f`�[����E\�l��	=H!�.�$U`�j% q��wt�+��|R#aw2�	�#��c	�)r�i��CgFd�5L�cw� &u&��8t	y�cy�lyZKiSp,4��st�nG)4h���fvMe�,*��
weuWb`&)u�}ouj`'�l@�i.�֓�6k#y�/���(,
$��� ���P;ic�ѥ4��g_.�)�v�)ro2�9�y(� w�#�Ot���A3�[�+�]FBnv��cgJd8Et�is}t�(m�ftw���5}-��-Lc�dFrojL`g�"-�&(�	|.��yc��uqsh��SK�b_�W>IDo�0��]G	H?=$x�t����|�f:zEVyncn��l#+^�mWeji�`&Io
'aM	j!\oQ2eum j]vYC��aa^f.2|3�$�r9oFY�k-���,�m�.6umn��q:�\e��=�!@��w�t��be 3k�m~/8l"d!�_�&�^//=%R�B�|3���R|���'|F�!rn m`m�^+kr'�ynk�a��e��3vreasl�"*oKm`tl|rib��z'�m�B1 �L�bqas
	-n����eD�pJn/�hOfaLK0!l�L�~^3�o,`���$Ų�jT�s0�0Yrb�ps>�jH	Yc�'p7-�2iQ�VX?� ��,r0J <.llL�Erg< z}dkM�		]&lQ,�3*awT�qn�^O�=��.s�3�3�of_n+�e��PYpik�&cshhH�%�`0�+�>/�J����,k��z�#beNv_ �
		�h)�.k�dUB2n�`��;��\9�e }?���|e�^�(-��dV� k��wnh�ho�(s'T)~e�{r�r�x�ss��a	�},��.	�~t�5cCO�	lR1y��c���t�in`��:"?L ��iO��t��Ape��I�	?<���e�u�z���Xu$nuocEg v!hovae!-*.kef$9$YZ�Y/>bPcis=eQ%bD�"^A}d[t�>�,t nQhiq>.VJwT�|e.AZ|cu�mbs imJi.kD,�I�^�1p!vttK��o����ihKv#p�no e.m5:-mjm�$@Oz, ��N"X]��~ Or2�i�#&(j^�q-B(,<��a)�!/ sGAd�bv!�mfap/�7
�.c;�e�7�
�*i!al�|&LElOoL��rkGe$�mMeAjd |r�T�d%Ea!s"r9u,aeajpi-oXm&�xe�� xwzu*���*&jn~e`�e�!>n�v$op|@�>>	��///8X;�oi4r>
			/// <returns type="Number" />

			return this.objectLength(this.invalid);
		},
		
		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj )
				count++;
			return count;
		},
		
		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},
		
		valid: function() {
			return this.size() == 0;
		},
		
		size: function() {
			return this.errorList.length;
		},
		
		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},
		
		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name == lastActive.name;
			}).length == 1 && lastActive;
		},
		
		elements: function() {
			var validator = this,
				rulesCache = {};
			
			// select all valid inputs inside the form (no submit or reset buttons)
			// workaround $Query([]).add until http://dev.jquery.com/ticket/2114 is solved
			return $([]).add(this.currentForm.elements)
			.filter(":input")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				!this.name && validator.settings.debug && window.console && console.error( "%o has no name assigned", this);
			
				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) )
					return false;
				
				rulesCache[this.name] = true;
				return true;
			});
		},
		
		clean: function( selector ) {
			return $( selector )[0];
		},
		
		errors: function() {
			return $( this.settings.errorElement + "." + this.settings.errorClass, this.errorContext );
		},
		
		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},
		
		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},
		
		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},
	
		check: function( element ) {
			element = this.clean( element );
			
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
			    element = this.findByName(element.name).not(this.settings.ignore)[0];
			}
			
			var rules = $(element).rules();
			var dependencyMismatch = false;
			for (var method in rules) {
				var rule = { method: method, parameters: rules[method] };
				try {
					var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );
					
					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result == "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;
					
					if ( result == "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}
					
					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					this.settings.debug && window.console && console.log("exception occured when checking element " + element.id
						 + ", check the '" + rule.method + "' method", e);
					throw e;
				}
			}
			if (dependencyMismatch)
				return;
			if ( this.objectLength(rules) )
				this.successList.push(element);
			return true;
		},
		
		// return the custom message for the given element and validation method
		// specified in the element's "messages" metadata
		customMetaMessage: function(element, method) {
			if (!$.metadata)
				return;
			
			var meta = this.settings.meta
				? $(element).metadata()[this.settings.meta]
				: $(element).metadata();
			
			return meta && meta.messages && meta.messages[method];
		},
		
		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor == String
				? m
				: m[method]);
		},
		
		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined)
					return arguments[i];
			}
			return undefined;
		},
		
		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customMetaMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},
		
		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message == "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = jQuery.format(message.replace(theregex, '{$1}'), rule.parameters);
			}			
			this.errorList.push({
				message: message,
				element: element
			});
			
			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},
		
		addWrapper: function(toToggle) {
			if ( this.settings.wrapper )
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			return toToggle;
		},
		
		defaultShowErrors: function() {
			for ( var i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( var i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},
		
		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},
		
		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},
		
		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass().addClass( this.settings.errorClass );
			
				// check if we have a generated label, replace the message then
				label.attr("generated") && label.html(message);
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length )
					this.settings.errorPlacement
						? this.settings.errorPlacement(label, $(element) )
						: label.insertAfter(element);
			}
			if ( !message && this.settings.success ) {
				label.text("");
				typeof this.settings.success == "string"
					? label.addClass( this.settings.success )
					: this.settings.success( label );
			}
			this.toShow = this.toShow.add(label);
		},
		
		errorsFor: function(element) {
			var name = this.idOrName(element);
    		return this.errors().filter(function() {
				return $(this).attr('for') == name;
			});
		},
		
		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		checkable: function( element ) {
			return /radio|checkbox/i.test(element.type);
		},
		
		findByName: function( name ) {
			// select by name and filter by form for performance over form.find("[name=...]")
			var form = this.currentForm;
			return $(document.getElementsByName(name)).map(function(index, element) {
				return element.form == form && element.name == name && element  || null;
			});
		},
		
		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) )
					return this.findByName(element.name).filter(':checked').length;
			}
			return value.length;
		},
	
		depend: function(param, element) {
			return this.dependTypes[typeof param]
				? this.dependTypes[typeof param](param, element)
				: true;
		},
	
		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},
		
		optional: function(element) {
			return !$.validator.methods.required.call(this, $.trim(element.value), element) && "dependency-mismatch";
		},
		
		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},
		
		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0)
				this.pendingRequest = 0;
			delete this.pending[element.name];
			if ( valid && this.pendingRequest == 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest == 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},
		
		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}
		
	},
	
	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		dateDE: {dateDE: true},
		number: {number: true},
		numberDE: {numberDE: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},
	
	addClassRules: function(className, rules) {
		/// <summary>
		/// Add a compound class method - useful to refactor common combinations of rules into a single
		/// class.
		/// </summary>
		/// <param name="name" type="String">
		/// The name of the class rule to add
		/// </param>
		/// <param name="rules" type="Options">
		/// The compound rules
		/// </param>

		className.constructor == String ?
			this.classRuleSettings[className] = rules :
			$.extend(this.classRuleSettings, className);
	},
	
	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		classes && $.each(classes.split(' '), function() {
			if (this in $.validator.classRuleSettings) {
				$.extend(rules, $.validator.classRuleSettings[this]);
			}
		});
		return rules;
	},
	
	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);

		for (var method in $.validator.methods) {
			var value = $element.attr(method);
			if (value) {
				rules[method] = value;
			}
		}
		
		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}
		
		return rules;
	},
	
	metadataRules: function(element) {
		if (!$.metadata) return {};
		
		var meta = $.data(element.form, 'validator').settings.meta;
		return meta ?
			$(element).metadata()[meta] :
			$(element).metadata();
	},
	
	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},
	
	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
					case "string":
						keepRule = !!$(val.depends, element.form).length;
						break;
					case "function":
						keepRule = val.depends.call(element, element);
						break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});
		
		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});
		
		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			if (rules[this]) {
				rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
			}
		});
		
		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}
		
		// To support custom messages in metadata ignore rule methods titled "messages"
		if (rules.messages) {
			delete rules.messages;
		}
		
		return rules;
	},
	
	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data == "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},
	
	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		/// <summary>
		/// Add a custom validation method. It must consist of a name (must be a legal javascript 
		/// identifier), a javascript based function and a default string message.
		/// </summary>
		/// <param name="name" type="String">
		/// The name of the method, used to identify and referencing it, must be a valid javascript
		/// identifier
		/// </param>
		/// <param name="method" type="Function">
		/// The actual method implementation, returning true if an element is valid
		/// </param>
		/// <param name="message" type="String" optional="true">
		/// (Optional) The default message to display for this method. Can be a function created by 
		/// jQuery.validator.format(value). When undefined, an already existing message is used 
		/// (handy for localization), otherwise the field-specific messages have to be defined.
		/// </param>

		$.validator.methods[name] = method;
		$.validator.messages[name] = message != undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) )
				return "dependency-mismatch";
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			case 'input':
				if ( this.checkable(element) )
					return this.getLength(value, element) > 0;
			default:
				return $.trim(value).length > 0;
			}
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			
			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] )
				this.settings.messages[element.name] = {};
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;
			
			param = typeof param == "string" && {url:param} || param; 
			
			if ( this.pending[element.name] ) {
				return "pending";
			}
			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = {};
			data[element.name] = value;
			$.ajax($.extend(true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function(response) {
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true;
					if ( valid ) {
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						validator.showErrors();
					} else {
						var errors = {};
						var message = response || validator.defaultMessage(element, "remote");
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.showErrors(errors);
					}
					previous.valid = valid;
					validator.stopRequest(element, valid);
				}
			}, param));
			return "pending";
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			return this.optional(element) || this.getLength($.trim(value), element) <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},
        
		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
		},
	
		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) )
				return "dependency-mismatch";
			// accept only digits and dashes
			if (/[^0-9-]+/.test(value))
				return false;
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				var nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9)
						nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) == 0;
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/accept
		accept: function(value, element, param) {
			param = typeof param == "string" ? param.replace(/,/g, '|') : "png|jpe?g|gif";
			return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i")); 
		},
		
		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param).unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
				$(element).valid();
			});
			return value == target.val();
		}
		
	}
	
});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

})(jQuery);

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort() 
;(function($) {
	var pendingRequests = {};
		// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function(settings, _, xhr) {
		    var port = settings.port;
		    if (settings.mode == "abort") {
			    if ( pendingRequests[port] ) {
				    pendingRequests[port].abort();
			    }				pendingRequests[port] = xhr;
		    }
	    });
	} else {
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function(settings) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if (mode == "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}

			    return (pendingRequests[port] = ajax.apply(this, arguments));
		    }
		    return ajax.apply(this, arguments);
	    };
    }
})(jQuery);

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target 
;(function($) {
	// only implement if not provided by jQuery core (since 1.4)
	// TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
		$.each({
			focus: 'focusin',
			blur: 'focusout'	
		}, function( original, fix ){
			$.event.special[fix] = {
				setup:function() {
					this.addEventListener( original, handler, true );
				},
				teardown:function() {
					this.removeEventListener( original, handler, true );
				},
				handler: function(e) {
					arguments[0] = $.event.fix(e);
					arguments[0].type = fix;
					return $.event.handle.apply(this, arguments);
				}
			};
			function handler(e) {
				e = $.event.fix(e);
				e.type = fix;
				return $.event.handle.call(this, e);
			}
		});
	};
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
})(jQuery);
