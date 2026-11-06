var $=function(s){return document.querySelector(s)};
var st={glass:0,col:0,gar:0,ghosts:0,moon:0};
var COLS=['#9b5de5','#ff8a1f','#7bd957','#e63946'],CN=['마녀의 독약','호박즙','슬라임','뱀파이어 블러드'];
$('#n1').textContent=NAME;

var cur='s1';function go(id){cur=id;
 document.querySelectorAll('.scene').forEach(function(e){e.classList.toggle('on',e.id==id)});
 if(id=='s2')makeUI();if(id=='s7')shakeUI();if(id=='s8')reveal();if(id=='s9')fwStart();try{bgmGo(id)}catch(e){} if(id=='s3')game(); if(id=='s4')giftUI(); if(id=='s5')cakeUI(); if(id=='s6')ending();
}
function toast(t){var e=$('#toast');e.textContent=t;e.style.display='block';clearTimeout(toast.h);toast.h=setTimeout(function(){e.style.display='none'},1800)}
function moonTap(){st.moon++;if(st.moon==3){$('#moon').textContent='🎃';toast('Happy Halloween!! 🦇')}}
function confetti(){}

// 배경 박쥐 & 떠다니는 유령(이스터에그)
for(var i=0;i<4;i++){var b=document.createElement('div');b.className='bat';b.textContent='🦇';b.style.top=(8+Math.random()*70)+'vh';b.style.animationDuration=(9+Math.random()*8)+'s';b.style.animationDelay=(-Math.random()*10)+'s';document.body.appendChild(b)}
setInterval(function(){if(cur=='s6'||cur=='s9')return;var g=document.createElement('div');g.className='ghost';g.textContent='👻';g.style.top=(12+Math.random()*55)+'vh';g.onclick=function(){st.ghosts++;ghostHud();bloodFx();try{ghostSfx()}catch(e){}g.remove()};document.body.appendChild(g);setTimeout(function(){g.remove()},9200)},12000);

// 칵테일 픽셀 드로잉
function drawC(c,g,col,ga){
 var x=c.getContext('2d');x.clearRect(0,0,32,40);
 var r=function(a,b,w,h,f){x.fillStyle=f;x.fillRect(a,b,w,h)},L='#cfd8ff',C=COLS[col],D='#2a1a4a',i;
 if(g==0){r(8,12,16,22,L);r(9,13,14,20,D);r(9,18,14,15,C);r(11,19,2,10,'rgba(255,255,255,.4)')}
 else if(g==1){for(i=0;i<9;i++)r(5+i,11+i,22-2*i,1,L);for(i=0;i<7;i++)r(8+i,13+i,16-2*i,1,C);r(15,20,2,13,L);r(10,33,12,2,L)}
 else{r(7,11,18,10,L);r(8,12,16,8,D);r(8,14,16,6,C);r(9,21,14,2,L);r(11,23,10,1,L);r(15,24,2,9,L);r(10,33,12,2,L)}
 if(ga==0){r(22,6,7,6,'#ff8a1f');r(24,4,3,2,'#7bd957');r(23,8,1,2,'#000');r(26,8,1,2,'#000')}
 else if(ga==1){r(22,8,5,5,'#e63946');r(24,4,1,4,'#6b3e1e');r(23,9,1,1,'#fff')}
 else if(ga==2){r(21,6,7,7,'#fff');r(23,8,3,3,'#3a86ff');r(24,9,1,1,'#000')}
 else{r(20,6,2,2,'#b388ff');r(26,6,2,2,'#b388ff');r(22,7,4,3,'#b388ff');r(23,5,1,2,'#b388ff');r(25,5,1,2,'#b388ff');r(23,8,1,1,'#f00');r(25,8,1,1,'#f00')}
}
st.layers=[];st.ice=0;st.gars=[0,0,0,0,0];
function drawG(c,g,Ly,ice,ga){
 var x=c.getContext('2d');x.clearRect(0,0,32,40);
 var r=function(a,b,w,h,f){x.fillStyle=f;x.fillRect(a,b,w,h)},L='#cfd8ff',D='#2a1a4a',i,y,s,k,y0=[13,13,12][g],y1=[32,19,19][g],cap=y1-y0+1,yt=y1+1;
 if(g==0){r(8,12,16,22,L);r(9,13,14,20,D)}
 else if(g==1){for(i=0;i<9;i++)r(5+i,11+i,22-2*i,1,L);for(i=0;i<7;i++)r(8+i,13+i,16-2*i,1,D);r(15,20,2,13,L);r(10,33,12,2,L)}
 else{r(7,11,18,10,L);r(8,12,16,8,D);r(9,21,14,2,L);r(11,23,10,1,L);r(15,24,2,9,L);r(10,33,12,2,L)}
 for(y=y0;y<=y1;y++){k=Math.floor((y1-y)*3/cap);if(k<Ly.length){s=g==0?[9,14]:g==1?[8+y-13,16-2*(y-13)]:[8,16];r(s[0],y,s[1],1,COLS[Ly[k]]);if(y<yt)yt=y}}
 if(g==0&&Ly.length)r(10,14,1,18,'rgba(255,255,255,.25)');
 if(ice){var I='rgba(220,245,255,.9)';yt=Math.min(yt,y1-2);if(g==0){r(10,yt-1,3,3,I);r(16,yt-2,3,3,I)}else{r(13,yt-1,2,2,I);r(16,yt-2,2,2,I)}}
 if(ga[4])r(19,2,2,16,'#ff6b9d');
 if(ga[0]){r(22,6,7,6,'#ff8a1f');r(24,4,3,2,'#7bd957');r(23,8,1,2,'#000');r(26,8,1,2,'#000')}
 if(ga[1]){r(3,8,5,5,'#e63946');r(5,4,1,4,'#6b3e1e');r(4,9,1,1,'#fff')}
 if(ga[2]){r(11,5,7,7,'#fff');r(13,7,3,3,'#3a86ff');r(14,8,1,1,'#000')}
 if(ga[3]){var B='#b388ff';r(11,1,2,2,B);r(19,1,2,2,B);r(13,2,6,3,B);r(13,0,1,2,B);r(18,0,1,2,B);r(14,3,1,1,'#f00');r(17,3,1,1,'#f00')}
}
function icon(c,k,i){
 var x=c.getContext('2d'),r=function(a,b,w,h,f){x.fillStyle=f;x.fillRect(a,b,w,h)};
 if(k=='b'){var C=COLS[i];r(6,4,4,5,C);r(4,9,8,10,C);r(7,1,2,3,'#c9a27a');r(5,13,6,4,'#fff3e0');r(5,10,1,7,'rgba(255,255,255,.45)')}
 else if(k=='i'){r(2,9,8,8,'#bfefff');r(3,10,3,3,'#fff');r(8,4,7,7,'#9fe0f5');r(9,5,2,2,'#fff')}
 else if(k=='p'){r(2,8,12,10,'#ff8a1f');r(7,4,2,4,'#7bd957');r(5,11,2,2,'#2a1200');r(9,11,2,2,'#2a1200');r(6,15,4,1,'#2a1200')}
 else if(k=='c'){r(3,11,5,5,'#e63946');r(9,12,5,5,'#e63946');r(5,5,7,1,'#6b3e1e');r(5,5,1,6,'#6b3e1e');r(11,5,1,7,'#6b3e1e');r(4,12,1,1,'#fff');r(10,13,1,1,'#fff')}
 else if(k=='e'){r(3,6,10,10,'#fff');r(5,8,6,6,'#3a86ff');r(7,10,2,2,'#000')}
 else if(k=='t'){var B='#b388ff';r(1,7,3,3,B);r(12,7,3,3,B);r(4,8,8,6,B);r(4,6,2,2,B);r(10,6,2,2,B);r(6,10,1,1,'#f00');r(9,10,1,1,'#f00')}
 else{r(7,2,2,17,'#ff6b9d');r(7,5,2,2,'#fff');r(7,10,2,2,'#fff')}
}
var busy=0;
function cname(){var L=st.layers;if(!L.length)return '잔을 고르고 술을 따라봐요 🍾';var a=CN[L[0]],b=CN[L[L.length-1]];return NAME+'의 '+(a==b?a:a+' & '+b)+' 칵테일'}
function mk(row,w,h,lab,dr,fn,on){var b=document.createElement('button');b.className='it'+(on?' on':'');var c=document.createElement('canvas');c.width=w;c.height=h;dr(c);b.appendChild(c);var t=document.createElement('i');t.textContent=lab;b.appendChild(t);b.onclick=function(){fn(b)};row.appendChild(b)}
function bounce(){var p=$('#pv');p.classList.remove('bn');void p.offsetWidth;p.classList.add('bn')}
function pour(i,b){
 if(busy)return;if(st.layers.length>=3){toast('잔이 가득 찼어요! 🍹');return}
 busy=1;lidOpen(1);b.classList.add('pour');var s=$('#stream');s.style.background=COLS[i];s.style.height='80px';
 setTimeout(function(){st.layers.push(i);s.style.height='0';lidOpen(0);busy=0;makeUI();bounce()},700)}
function clearG(){st.layers=[];st.ice=0;st.gars=[0,0,0,0,0];makeUI()}
function finish(){if(!st.layers.length){toast('먼저 술을 따라줘요! 🍾');return}toast('완성! '+cname());confetti();setTimeout(function(){go('s4')},1200)}
function makeUI(){
 var T=$('#tbl');T.innerHTML='';
 drawBar();
 var r1=document.createElement('div'),r2=document.createElement('div'),r3=document.createElement('div');r1.className=r2.className=r3.className='row';
 ['하이볼','마티니','고블릿'].forEach(function(n,g){mk(r1,32,40,n,function(c){drawG(c,g,[],0,[0,0,0,0,0])},function(){st.glass=g;makeUI();bounce()},st.glass==g)});
 ['독약','호박즙','슬라임','블러드'].forEach(function(n,i){mk(r2,16,20,n,function(c){pk(c,i)},function(bt){pour(i,bt)},0)});
 [['얼음','i'],['호박','p'],['체리','c'],['눈알','e'],['박쥐','t'],['빨대','s']].forEach(function(m,j){
  var on=j==0?st.ice:st.gars[j-1];
  mk(r3,16,20,m[0],function(c){icon(c,m[1],0)},function(){if(j==0)st.ice=st.ice?0:1;else st.gars[j-1]=st.gars[j-1]?0:1;toast('퐁당! '+m[0]);makeUI();bounce()},on)});
 T.appendChild(r1);T.appendChild(r2);T.appendChild(r3);
 drawG($('#pv'),st.glass,st.layers,st.ice,st.gars);
 $('#cname').textContent=ingTxt();
}
st.tp=[0,0,0,0,0,0,0,0,0];COLS.push('#3ab8ff');CN.push('유령 블루');
function drawS(c,Ly,ice,h){
 c.width=40;c.height=40;var x=c.getContext('2d'),r=function(a,b,w,k,f){x.fillStyle=f;x.fillRect(a,b,w,k)},n=Ly.length,b,k,yt;
 if(h){r(0,15,10,9,'#f1c27d');r(30,15,10,9,'#f1c27d');r(0,24,8,12,'#5a2d82');r(32,24,8,12,'#5a2d82')}
 if(c.id!='pv'){r(15,1,10,3,'#e8ecff');r(12,4,16,4,'#aab4d4')}
 r(10,8,20,28,'#b9c2dc');r(10,8,3,28,'#f4f7ff');r(13,8,2,28,'#d6ddf0');r(26,8,2,28,'#8f9abb');r(28,8,2,28,'#6f7a9c');r(9,36,22,3,'#6f7a9c');r(10,18,20,1,'#8f9abb');r(10,19,20,1,'#e6ecfa');r(10,24,20,1,'#8f9abb');
}
function ic(c,k){var x=c.getContext('2d'),r=function(a,b,w,h,f){x.fillStyle=f;x.fillRect(a,b,w,h)};
 if(k=='l'){r(3,5,10,10,'#d4b800');r(4,6,8,8,'#ffe14a');r(7,6,2,8,'#fff3a0');r(4,9,8,2,'#fff3a0')}
 else if(k=='w'){r(3,7,10,8,'#e63946');r(5,15,6,2,'#e63946');r(3,4,10,3,'#4caf50');r(5,8,1,1,'#ffd23f');r(9,10,1,1,'#ffd23f');r(7,12,1,1,'#ffd23f')}
 else if(k=='u'){r(2,6,12,3,'#ff6b9d');r(4,3,8,3,'#ff6b9d');r(6,1,4,2,'#ff6b9d');r(7,9,2,10,'#8d6e63');r(4,9,1,1,'#fff');r(9,9,1,1,'#fff')}
 else if(k=='m'){r(2,5,5,4,'#3fbf5f');r(9,3,5,4,'#2e9e4a');r(5,9,6,4,'#3fbf5f');r(7,12,2,7,'#2e7d32')}
 else if(k=='v'){r(3,5,10,10,'#2e7d32');r(4,6,8,8,'#9be564');r(7,6,2,8,'#e8ffc0');r(4,9,8,2,'#e8ffc0')}
 else if(k=='o'){r(3,5,10,10,'#e07b00');r(4,6,8,8,'#ffa733');r(7,6,2,8,'#ffd28a');r(4,9,8,2,'#ffd28a')}
 else if(k=='B'){r(4,8,8,8,'#3a4fb5');r(5,7,6,1,'#3a4fb5');r(6,7,4,1,'#1a2155');r(5,9,2,2,'#8da0ff');r(9,12,2,2,'#2a3a8f')}
 else if(k=='g'){r(8,2,1,4,'#6b4a1a');r(9,3,4,2,'#4caf50');r(4,6,4,4,'#7b3fa0');r(8,6,4,4,'#7b3fa0');r(3,10,4,4,'#9a5bc4');r(7,10,4,4,'#7b3fa0');r(11,10,3,4,'#9a5bc4');r(5,14,4,4,'#7b3fa0');r(9,14,4,4,'#9a5bc4');r(5,7,1,1,'#fff')}
 else if(k=='k'){r(3,5,10,10,'#6b4a1a');r(4,6,8,8,'#8bc34a');r(6,8,4,4,'#e8f5c8');r(7,9,2,2,'#2a1a00');r(5,8,1,1,'#222');r(10,8,1,1,'#222');r(8,6,1,1,'#222')}
 else if(k=='a'){r(6,1,1,6,'#4caf50');r(8,0,1,7,'#2e7d32');r(10,1,1,6,'#4caf50');r(4,7,8,11,'#f5b800');r(5,9,2,2,'#c78500');r(9,9,2,2,'#c78500');r(7,12,2,2,'#c78500');r(5,15,2,2,'#c78500');r(9,15,2,2,'#c78500')}
 else if(k=='M'){r(2,6,12,8,'#2e7d32');r(3,7,10,6,'#ff5c7a');r(5,9,1,1,'#222');r(8,10,1,1,'#222');r(10,9,1,1,'#222');r(7,8,1,1,'#222')}
 else icon(c,k,0)}
function makeUI(){
 var T=$('#tbl');T.innerHTML='';
 drawBar();
 var R=[0,1,2,3,4].map(function(){var d=document.createElement('div');d.className='row';return d});
 [[0,'하이볼'],[1,'마티니'],[2,'고블릿']].forEach(function(a){var g=a[0];mk(R[0],32,40,a[1],function(c){drawG(c,g,[],0,[0,0,0,0,0])},function(){st.glass=g;makeUI()},st.glass==g)});
 ['독약','호박즙','슬라임','블러드','유령블루'].forEach(function(n,i){mk(R[1],16,20,n,function(c){pk(c,i)},function(bt){pour(i,bt)},0)});
 [['얼음','i'],['레몬','l'],['라임','v'],['오렌지','o'],['딸기','w'],['체리','c'],['블루베리','B'],['포도','g'],['키위','k'],['파인애플','a'],['수박','M'],['호박','p'],['눈알','e'],['박쥐','t'],['민트','m'],['빨대','s']].forEach(function(m,j){
  var on=j==0?st.ice:st.tp[j-1];
  mk(R[2+Math.floor(j/6)],16,20,m[0],function(c){ic(c,m[1])},function(){topFx(j,m)},on)});
 R.forEach(function(d){T.appendChild(d)});
 drawS($('#pv'),st.layers,st.ice,0);$('#cname').textContent=ingTxt();
}
function clearG(){st.layers=[];st.ice=0;st.tp=[0,0,0,0,0,0,0,0,0];makeUI()}
function finish(){if(!st.layers.length){toast('먼저 술을 따라줘요! 🍾');return}go('s7')}
var spr=0,sdone=0,sn=0;
function shakeUI(){spr=0;sdone=0;sn=0;$('#bar').style.width='0';$('#shk').style.transform='';drawS($('#shk'),st.layers,st.ice,0)}
function shakeTap(){
 if(sdone)return;sn++;spr=Math.min(100,spr+3.2);$('#bar').style.width=spr+'%';
 var s=$('#shk'),d=sn%2?-1:1;s.style.transform='translate('+(16*d)+'px,'+(8*d)+'px) rotate('+(9*d)+'deg)';
 if(sn%3==0){var e=document.createElement('span');e.className='conf';e.textContent=['❄️','✨','💧'][sn%9/3|0];e.style.left=(25+Math.random()*50)+'vw';e.style.top='25vh';document.body.appendChild(e);setTimeout(function(){e.remove()},3000)}
 if(spr>=100){sdone=1;s.style.transform='';toast('완성! 🍸');setTimeout(function(){go('s8')},900)}}
document.addEventListener('keydown',function(e){if(e.code=='Space'&&cur=='s7'){e.preventDefault();shakeTap()}});
$('#s7').addEventListener('pointerdown',shakeTap);
function drawBig(c,g,Ly,ice,tp){
 c.width=56;c.height=64;var x=c.getContext('2d'),r=function(a,b,w,h,f){x.fillStyle=f;x.fillRect(a,b,w,h)},L='#dfe6ff',D='#2a1a4a',n=Ly.length||1,i,dx,dy,d,y,s,k,
 y0=[20,19,21][g],y1=[55,30,31][g],cap=y1-y0+1,sp=function(y){return g==0?[14,20]:g==1?[9+y-18,30-2*(y-18)]:[12,24]};
 x.save();x.translate(4,0);
 if(g==0){r(12,18,24,40,L);r(14,20,20,36,D);r(13,56,22,3,'#9aa5c9')}
 else if(g==1){for(i=0;i<16;i++)r(6+i,16+i,36-2*i,1,L);for(i=0;i<13;i++)r(9+i,18+i,30-2*i,1,D);r(23,32,2,22,L);r(15,54,18,3,L);r(13,57,22,2,'#9aa5c9')}
 else{r(10,16,28,18,L);r(12,18,24,14,D);r(14,34,20,2,L);r(18,36,12,2,L);r(23,38,2,16,L);r(15,54,18,3,L)}
 for(y=y0;y<=y1;y++){k=Math.min(n-1,Math.floor((y1-y)*n/cap));s=sp(y);r(s[0],y,s[1],1,Ly.length?COLS[Ly[k]]:'#ff8a1f');
  if(Math.floor((y1-y+1)*n/cap)!=Math.floor((y1-y)*n/cap)||y==y0)r(s[0],y,s[1],1,'rgba(255,255,255,.3)')}
 if(g!=1)r(g==0?16:14,y0+2,1,cap-6,'rgba(255,255,255,.35)');
 if(ice)(g==0?[[16,24],[24,31],[17,39],[26,46],[18,51]]:g==1?[[20,21],[25,21],[22,25]]:[[16,22],[24,22],[20,27]]).forEach(function(p){var z=g==0?5:4;r(p[0],p[1],z,z,'rgba(235,250,255,.7)');r(p[0]+1,p[1]+1,1,1,'#fff')});
 if(tp[8])for(i=0;i<24;i++)r(22+(i>>1),y0+3-i,2,1,(i>>1)%2?'#fff':'#e63946');
 if(tp[0]){var cx=[34,38,36][g],cy=[17,16,15][g];for(dy=-6;dy<=6;dy++)for(dx=-6;dx<=6;dx++){d=dx*dx+dy*dy;if(d<=36)r(cx+dx,cy+dy,1,1,d>25?'#d4b800':'#ffe14a')}r(cx,cy-5,1,11,'#fff3a0');r(cx-5,cy,11,1,'#fff3a0')}
 if(tp[1]){var ax=[10,8,12][g],ay=[11,10,9][g];r(ax,ay,7,6,'#e63946');r(ax+1,ay+6,5,1,'#e63946');r(ax+2,ay+7,3,1,'#e63946');r(ax,ay-2,7,2,'#4caf50');r(ax+3,ay-4,2,2,'#4caf50');r(ax+2,ay+2,1,1,'#ffd23f');r(ax+4,ay+4,1,1,'#ffd23f');r(ax+1,ay+1,2,1,'#ff8a8a')}
 if(tp[7]){var mx=[18,16,18][g],my=[12,11,10][g];r(mx,my,4,3,'#3fbf5f');r(mx+4,my-2,4,3,'#2e9e4a');r(mx+3,my+3,1,5,'#2e7d32')}
 if(tp[6]){var UC=['#ff6b9d','#4cc9f0','#ffd23f','#b388ff'][(Ly[0]||0)%4];r(24,6,1,12,'#8d6e63');r(18,5,13,2,UC);r(20,3,9,2,UC);r(22,1,5,2,UC);r(22,7,2,1,'#fff');r(27,7,2,1,'#fff')}
 x.restore();
 if(tp[2]){r(1,52,7,7,'#d00f2a');r(2,53,1,1,'#fff');r(3,47,1,5,'#5a3a1a');r(3,47,4,1,'#5a3a1a')}
 if(tp[4]){r(1,42,8,8,'#fff');r(3,44,4,4,'#3a86ff');r(4,45,2,2,'#000')}
 if(tp[3]){r(45,50,10,9,'#ff8a1f');r(49,47,2,3,'#4caf50');r(47,53,2,2,'#2a1200');r(52,53,2,2,'#2a1200');r(48,57,4,1,'#2a1200')}
 if(tp[5]){var B='#b388ff';r(38,6,3,2,B);r(51,6,3,2,B);r(41,4,10,5,B);r(41,2,2,3,B);r(49,2,2,3,B);r(44,6,1,1,'#f00');r(48,6,1,1,'#f00')}
}
function reveal(){
 drawBig($('#big'),st.glass,st.layers,st.ice,st.tp);$('#rn').textContent='생일 칵테일 완성!';
 var TN=['레몬','딸기','체리','호박','눈알','박쥐','민트','빨대'];
 $('#ri').textContent=st.layers.map(function(i){return CN[i]}).join(' + ')+(st.ice?' + 얼음':'')+st.tp.map(function(v,i){return v?' + '+TN[i]:''}).join('');confetti()}
function makeUIold(){
 var G=['하이볼','마티니','고블릿'],GA=['🎃 호박','🍒 체리','👁️ 눈알','🦇 박쥐'];
 function row(id,a,k){$('#'+id).innerHTML=a.map(function(t,i){return '<button class="chip '+(st[k]==i?'sel':'')+'" onclick="st.'+k+'='+i+';makeUI()">'+t+'</button>'}).join('')}
 row('rg',G,'glass');row('rc',CN,'col');row('rga',GA,'gar');
 drawC($('#pv'),st.glass,st.col,st.gar);
 $('#cname').textContent=NAME+'의 '+CN[st.col]+' 칵테일';
}

// 미니게임
function game(){
 var cv=$('#gc'),x=cv.getContext('2d'),W=cv.width=320,H=cv.height=440,pc=document.createElement('canvas');
 pc.width=32;pc.height=40;drawG(pc,st.glass,st.layers,st.ice,st.gars);
 var px=W/2,items=[],score=0,GOAL=12,t=0,run=true,last=performance.now();
 var move=function(e){var r=cv.getBoundingClientRect();px=Math.max(30,Math.min(W-30,(e.clientX-r.left)*W/r.width))};
 cv.onpointermove=move;cv.onpointerdown=move;
 function loop(n){
  if(!run)return;var dt=Math.min(40,n-last)/16;last=n;t+=dt;
  if(t>26){t=0;var q=Math.random(),it;
   if(q<.08)it={e:'🦇',v:3};else if(q<.30)it={e:'🕷️',v:-1};else it={e:['🎃','🍒','🍬'][Math.floor(Math.random()*3)],v:1};
   it.x=20+Math.random()*(W-40);it.y=-20;it.s=1.8+Math.random()*1.2;items.push(it)}
  x.fillStyle='#1a0f2e';x.fillRect(0,0,W,H);x.font='26px serif';x.textAlign='center';
  x.fillText('🌕',W-34,34);
  items=items.filter(function(it){
   it.y+=it.s*dt;
   if(it.y>H-100&&it.y<H-30&&Math.abs(it.x-px)<38){
    score=Math.max(0,score+it.v);
    if(it.e=='🦇')toast('황금 박쥐 발견! +3 🦇');
    $('#hud').textContent='점수 '+score+'/'+GOAL+' · 🎃🍒🍬 받고 🕷️ 피하기';return false}
   if(it.y>H+20)return false;
   x.font='30px serif';x.fillText(it.e,it.x,it.y);return true});
  x.imageSmoothingEnabled=false;x.drawImage(pc,px-40,H-100,80,100);
  if(score>=GOAL){run=false;toast('클리어! 🎉');confetti();setTimeout(function(){go('s4')},1400);return}
  requestAnimationFrame(loop)}
 requestAnimationFrame(loop);
}

// 선물 고르기
function giftUI(){
 var opened=0;$('#gmsg').classList.add('hide');$('#gnext').classList.add('hide');
 $('#gifts').innerHTML=GIFTS.map(function(g,i){return '<button id="g'+i+'">🎁</button>'}).join('');
 GIFTS.forEach(function(g,i){$('#g'+i).onclick=function(){
  this.textContent=g.e;opened++;var m=$('#gmsg');m.textContent=g.t;m.classList.remove('hide');
  if(g.e=='👻')toast('👻 Boo!'); else confetti();
  if(opened>=1)$('#gnext').classList.remove('hide')}})
}

// 케이크 & 촛불
var lit=[0,0,0],blown=false;
function cakeUI(){lit=[0,0,0];blown=false;drawCake();
 $('#cake').onclick=function(){if(blown)return;var i=lit.indexOf(0);if(i<0)return;lit[i]=1;drawCake();
  var n=lit.filter(Boolean).length;$('#ctxt').textContent='초를 눌러서 불을 붙여요 ('+n+'/3)';
  if(n==3){$('#ctxt').textContent='소원을 빌고… 불어요! 🕯️';$('#blow').classList.remove('hide')}}}
function drawCake(){
 var x=$('#cake').getContext('2d');x.clearRect(0,0,32,34);
 var r=function(a,b,w,h,f){x.fillStyle=f;x.fillRect(a,b,w,h)};
 r(2,30,28,2,'#cfd8ff');r(4,20,24,10,'#5a2d82');r(4,20,24,3,'#fff');r(8,13,16,7,'#ff8a1f');r(8,13,16,2,'#fff');
 r(14,23,1,1,'#ffd23f');r(18,26,1,1,'#ffd23f');r(8,26,1,1,'#ffd23f');
 [9,15,21].forEach(function(cx,i){r(cx,6,2,7,'#fff');r(cx,8,2,1,'#e63946');
  if(lit[i]){r(cx,3,2,3,'#ffd23f');r(cx,2,2,1,'#ff8a1f')}})
}
function blowOut(){blown=true;lit=[0,0,0];drawCake();$('#blow').classList.add('hide');$('#ctxt').textContent='생일 축하해요! 🎉';confetti();setTimeout(function(){go('s6')},2200)}

// 엔딩
function ending(){
 document.querySelectorAll('.ghost').forEach(function(g){g.remove()});$('#gc').style.display='none';
 var el=$('#letter'),i=0;LT.done=0;LT.last=0;clearTimeout(LT.h);
 function end(){if(LT.done)return;LT.done=1;clearTimeout(LT.h);el.textContent=LETTER;setTimeout(finLetter,500)}
 LT.skip=end;
 (function tp(){if(LT.done)return;el.textContent=LETTER.slice(0,i);el.scrollTop=el.scrollHeight;if(i++<LETTER.length)LT.h=setTimeout(tp,32);else{LT.done=1;LT.h=setTimeout(finLetter,700)}})();
}
var LT={done:1,h:0,last:0,skip:null};
document.addEventListener('click',function(e){if(cur!='s6'||LT.done)return;if(e.target.closest&&e.target.closest('button'))return;var n=Date.now();if(n-LT.last<450&&LT.skip)LT.skip();LT.last=n});
function finLetter(){
 if(st.ghosts>=3){$('#alarm').classList.remove('hide');drawBell();drawTicket()}else $('#nxt').classList.remove('hide')}
function drawBell(){var x=$('#bell').getContext('2d'),r=function(a,b,w,k,f){x.fillStyle=f;x.fillRect(a,b,w,k)};
 r(7,1,2,2,'#c78500');r(5,3,6,1,'#ffd23f');r(4,4,8,1,'#ffd23f');r(3,5,10,5,'#ffd23f');r(2,10,12,2,'#ffd23f');r(1,12,14,1,'#c78500');
 r(3,5,2,5,'#fff0a0');r(11,6,2,5,'#e0a800');r(6,13,4,2,'#c78500');r(7,13,2,1,'#ffd23f');r(11,1,4,4,'#e63946');r(12,2,2,2,'#ff8a8a')}
function drawTicket(){var x=$('#tkc').getContext('2d'),r=function(a,b,w,k,f){x.fillStyle=f;x.fillRect(a,b,w,k)},y;
 x.clearRect(0,0,64,32);r(1,2,62,28,'#8a4b00');r(2,3,60,26,'#ffcf4a');r(2,3,60,2,'#ffe58a');r(2,27,60,2,'#e0a400');
 [[0,13],[0,16],[63,13],[63,16]].forEach(function(p){x.clearRect(p[0],p[1],1,3)});x.clearRect(1,14,2,4);x.clearRect(61,14,2,4);
 for(y=5;y<27;y+=3)r(23,y,1,2,'#8a4b00');
 var S=[[8,6],[7,8],[3,10],[7,10],[10,10],[5,14],[4,16],[2,20]];
 r(11,7,4,3,'#fff6c4');r(9,10,8,3,'#fff6c4');r(6,12,14,3,'#fff6c4');r(8,15,10,3,'#fff6c4');r(7,18,5,4,'#fff6c4');r(14,18,5,4,'#fff6c4');
 r(11,7,4,1,'#c78500');r(6,12,14,1,'#c78500');r(10,21,2,1,'#c78500');r(14,21,2,1,'#c78500');r(12,10,2,2,'#e63946')}
function showReward(){$('#alarm').classList.add('hide');$('#rw').classList.remove('hide')}
function closeReward(){$('#rw').classList.add('hide');go('s9')}
var IMG={"c": ["img/cocktail-c0.png", "img/cocktail-c1.png", "img/cocktail-c2.png", "img/cocktail-c3.png", "img/cocktail-c4.png"], "f": ["img/cocktail-f0.png", "img/cocktail-f1.png", "img/cocktail-f2.png", "img/cocktail-f3.png", "img/cocktail-f4.png"]},SH="img/sprites.png",BB="img/blueberry.png";
var shI=new Image();shI.src=SH;var bbI=new Image();bbI.src=BB;st.glass=1;
function spx(c,img,sx,sy){var d=function(){var x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(img,sx,sy,16,16,0,2,16,16)};if(img.complete)d();else img.addEventListener('load',d)}
function pk(c,i){c.width=16;c.height=32;c.style.width='28px';c.style.height='56px';var img=i==4?bbI:shI,sx=i==4?0:[0,48,16,32][i],sy=i==4?0:48,d=function(){var x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(img,sx,sy,16,32,0,0,16,32)};if(img.complete)d();else img.addEventListener('load',d)}
function reveal(){
 var cnt=[0,0,0,0,0],dom=st.layers[st.layers.length-1];st.layers.forEach(function(v){cnt[v]++});cnt.forEach(function(n,v){if(n>cnt[dom])dom=v});
 $('#big').src=(st.glass==0?IMG.f:IMG.c)[dom];$('#rn').textContent='생일 칵테일 완성!';
 var TN=['레몬','라임','오렌지','딸기','체리','블루베리','포도','키위','파인애플','수박','호박','눈알','박쥐','민트','빨대'],K=['l','v','o','w','c','B','g','k','a','M','p','e','t','m','s'];
 $('#ri').textContent=st.layers.map(function(i){return CN[i]}).join(' + ')+(st.ice?' + 얼음':'')+st.tp.map(function(v,i){return v?' + '+TN[i]:''}).join('');
 var rt=$('#rt');rt.innerHTML='';var add=function(k){var c=document.createElement('canvas');c.width=16;c.height=20;c.style.width='32px';c.style.height='40px';ic(c,k);rt.appendChild(c)};
 if(st.ice)add('i');st.tp.forEach(function(v,i){if(v)add(K[i])});}

function drawIntro(){
 var c=$('#introc'),x=c.getContext('2d'),r=function(a,b,w,k,f){x.fillStyle=f;x.fillRect(a,b,w,k)},y,i,j,dx,dy,d;
 var ln=function(a,b,e,f,col){var n=Math.max(Math.abs(e-a),Math.abs(f-b))||1;for(var k=0;k<=n;k++)r(Math.round(a+(e-a)*k/n),Math.round(b+(f-b)*k/n),1,1,col)};
 r(0,0,128,96,'#04060f');r(62,2,60,42,'#06103a');r(66,5,52,36,'#0a1a55');
 r(78,0,1,9,'#14204a');r(108,0,1,9,'#14204a');r(93,37,1,33,'#10183a');
 r(70,9,48,28,'#58a0ff');r(72,11,44,24,'#0b1670');r(71,10,46,1,'#bfe0ff');
 var G={B:['11110','10001','10001','11110','10001','10001','11110'],A:['01110','10001','10001','11111','10001','10001','10001'],R:['11110','10001','10001','11110','10100','10010','10001']};
 'BAR'.split('').forEach(function(ch,n){G[ch].forEach(function(row,ry){row.split('').forEach(function(v,rx){if(v=='1'){r(77+n*12+rx*2+1,16+ry*2+1,2,2,'#c4570a');r(77+n*12+rx*2,16+ry*2,2,2,'#ffb066')}})})});
 var yb=[70,74,80,88,96];
 for(i=0;i<4;i++){r(0,yb[i],128,yb[i+1]-yb[i],i%2?'#0b2a50':'#0e4a5a');r(0,yb[i],128,1,'#02060f')}
 for(i=-48;i<=176;i+=32)ln(64+(i-64)*.55,70,i,95,'#02060f');
 r(18,70,24,6,'#1f6577');
 r(26,14,8,3,'#cfe6f5');r(25,17,10,2,'#9fb7cc');r(20,19,20,5,'#a9c0d6');r(20,19,3,5,'#e6f4ff');r(37,19,3,5,'#5a7190');
 for(y=24;y<=68;y++){var w=18+Math.floor((y-24)*11/44),x0=30-(w>>1);r(x0,y,w,1,'#8da5bf');r(x0,y,3,1,'#e3f1fb');r(x0+3,y,2,1,'#c5d9ea');r(x0+w-4,y,4,1,'#4d6585');r(x0+w-7,y,2,1,'#6f87a5')}
 r(19,40,22,1,'#2c3e5b');r(19,41,22,1,'#d9ecfa');r(16,69,29,2,'#51698a');
 var cube=function(a,b){r(a,b,7,7,'#6fa8d8');r(a,b,6,6,'#cfe8ff');r(a+1,b+1,2,2,'#fff');r(a+4,b+4,2,2,'#9cc8f0')};
 cube(73,68);cube(80,65);cube(81,71);
 for(dy=-10;dy<=0;dy++)for(dx=-11;dx<=11;dx++){d=dx*dx+dy*dy;if(d<=110)r(99+dx,76+dy,1,1,d>80?'#d9680a':'#ff9b3d')}
 r(88,76,23,1,'#d9680a');ln(99,76,99,68,'#ffd9a8');ln(99,76,92,70,'#ffd9a8');ln(99,76,106,70,'#ffd9a8');ln(99,76,90,74,'#ffd9a8');ln(99,76,108,74,'#ffd9a8');
 r(113,68,12,9,'#ff8a1f');r(112,70,14,5,'#ff8a1f');r(113,68,2,8,'#ffb050');r(118,65,2,3,'#3fa34d');r(115,71,2,2,'#2a1200');r(121,71,2,2,'#2a1200');r(116,74,6,1,'#2a1200');
}
drawIntro();

function drawBar(){
 var c=$('#bk'),x=c.getContext('2d'),r=function(a,b,w,k,f){x.fillStyle=f;x.fillRect(a,b,w,k)},i,y,dx,dy,d;
 r(0,0,120,54,'#0d0716');
 // light cone
 for(y=0;y<42;y++){var hw=8+Math.floor(y*0.95);r(60-hw,y,hw*2,1,y%2?'#7a3a14':'#7d3d16')}
 for(y=0;y<42;y++){var hw2=Math.max(0,hw=4+Math.floor(y*0.55));r(60-hw2,y,hw2*2,1,'#9a4a1c')}
 // glow
 for(dy=-14;dy<=14;dy++)for(dx=-14;dx<=14;dx++){d=dx*dx+dy*dy;if(d<=196)r(60+dx,14+dy,1,1,d>130?'#b8601f':d>70?'#d9822e':'#f0a24a')}
 for(dy=-8;dy<=8;dy++)for(dx=-8;dx<=8;dx++){if(dx*dx+dy*dy<=64)r(60+dx,14+dy,1,1,'#f6b25a')}
 // lantern
 r(60,0,1,6,'#120a14');r(58,6,5,1,'#120a14');r(58,6,1,3,'#120a14');r(62,6,1,3,'#120a14');
 r(55,9,11,2,'#2a1a1a');r(54,11,13,1,'#120a14');r(55,12,11,10,'#120a14');r(56,13,9,8,'#6a3a14');r(58,14,5,6,'#ffe9a0');r(59,15,3,4,'#fff6d0');r(54,22,13,2,'#2a1a1a');r(56,24,9,1,'#120a14');
 // sparks
 [[48,5],[72,5],[44,16],[76,18],[70,26]].forEach(function(p){r(p[0],p[1],1,1,'#ffd9a0')});
 var bottle=function(a,b,col,hh){r(a,b+3,5,hh,col);r(a+1,b,3,4,col);r(a+1,b,3,1,'#2a1a1a');r(a+1,b+4,1,hh-2,'rgba(255,255,255,.25)')};
 // upper shelf
 bottle(33,12,'#2f8f4a',9);bottle(39,10,'#d1502a',11);bottle(46,7,'#3a78c8',14);r(52,14,3,7,'#2f8f4a');
 r(30,21,28,1,'#a35a22');r(30,22,28,1,'#6a3a14');
 // lower shelf
 r(30,23,28,7,'#0d0716');
 bottle(34,26,'#3a78c8',9);bottle(40,26,'#2f8f4a',9);bottle(46,28,'#d1502a',7);
 bottle(75,26,'#3a78c8',9);bottle(81,25,'#2f8f4a',10);bottle(87,26,'#d1502a',9);
 r(30,35,60,1,'#a35a22');r(30,36,60,1,'#6a3a14');
 // counter extras
 r(8,31,10,13,'#c7ccd4');r(10,29,6,3,'#c7ccd4');r(11,36,4,4,'#3aa88a');r(8,43,10,1,'#7b828c');
 r(20,36,6,1,'#e6a85a');r(20,37,6,2,'#c0761f');r(22,39,2,4,'#e8c27a');r(20,43,6,1,'#e8c27a');
 r(94,36,6,1,'#e6a85a');r(94,37,6,2,'#c0761f');r(96,39,2,4,'#e8c27a');r(94,43,6,1,'#e8c27a');
 r(104,32,12,12,'#a9afb8');r(106,30,4,3,'#d9c27a');r(114,34,4,6,'#a9afb8');r(116,35,2,4,'#0d0716');r(106,36,3,5,'#6a717c');
 // counter top
 r(0,44,120,5,'#8a4a22');r(0,44,120,1,'#b8723a');r(0,46,120,1,'#6e3a18');
 r(25,44,50,1,'#f0c890');
 for(i=0;i<120;i+=7)r(i,45,3,1,'#7a3e1a');
 // front wood panel
 r(0,49,120,5,'#4a2a14');
 for(i=0;i<120;i+=9){r(i,49,1,5,'#1a0e08');r(i+4,50,1,3,'#3a200f')}
}

(function(){var x=$('#lid').getContext('2d'),r=function(a,b,w,k,f){x.fillStyle=f;x.fillRect(a,b,w,k)};r(15,0,10,3,'#f4f7ff');r(15,0,10,1,'#fff');r(12,3,16,4,'#aab4d4');r(12,3,16,1,'#d6ddf0');r(12,7,16,1,'#6f7a9c')})();
function lidOpen(o){$('#lid').classList.toggle('open',!!o)}
function topFx(j,m){
 var on=j==0?st.ice:st.tp[j-1];
 var apply=function(){if(j==0)st.ice=st.ice?0:1;else st.tp[j-1]=st.tp[j-1]?0:1;makeUI();bounce()};
 if(on){apply();return}
 if(busy)return;busy=1;lidOpen(1);
 var f=document.createElement('canvas');f.width=16;f.height=20;f.className='fly';ic(f,m[1]);$('#stage').appendChild(f);
 setTimeout(function(){f.classList.add('go')},260);
 setTimeout(function(){f.remove();apply()},720);
 setTimeout(function(){lidOpen(0);busy=0},980)}

var RG={run:0};
function shakeTap(){}
function rgBeep(f){try{bgmWake();if(!BG.ready||!BG.on)return;var t=AC.x.currentTime+.01,P=f>=900;
 noise(t,.05,.16,1);/* shaker rattle */
 if(P){tone('sine',88,t,.35,.13);tone('sine',95,t+.07,.4,.12);tone('triangle',100,t+.14,.5,.09)}/* sparkly pling-pling-ling */
 else{tone('sine',84,t,.25,.12);tone('triangle',91,t+.06,.3,.07)}}catch(e){}}
function shakeUI(){
 var c=$('#rc');c.width=300;c.height=360;
 var sk=document.createElement('canvas');drawS(sk,st.layers,st.ice,0);
 var iL=document.createElement('canvas');iL.width=16;iL.height=20;ic(iL,'i');
 var iR=document.createElement('canvas');iR.width=16;iR.height=20;ic(iR,'p');
 var steps=[1,1,.5,.5,1,1,1,.5,.5,1],pat=[0,1,0,1,1,0,0,1,0,1,1,0,1,0],notes=[],t=2000,i;
 for(i=0;i<28;i++){notes.push({t:t,lane:pat[i%pat.length],res:null});t+=520*steps[i%steps.length]}
 RG={run:1,c:c,sk:sk,ic:[iL,iR],notes:notes,st:'ready',t0:0,score:0,combo:0,perf:0,fx:[],shake:0,done:0};
 $('#bar').style.width='0';$('#rtxt').textContent='떨어지는 재료를 박자에 맞춰 탭!';
 requestAnimationFrame(rgLoop)}
function rgHit(lane){
 if(!RG.run)return;
 if(RG.st=='ready'){RG.st='play';RG.t0=performance.now();return}
 if(RG.st!='play')return;
 var now=performance.now()-RG.t0,best=-1,bd=999;
 RG.notes.forEach(function(n,i){if(n.res===null&&n.lane==lane){var d=Math.abs(n.t-now);if(d<bd&&d<=230){bd=d;best=i}}});
 if(best<0){RG.shake=(lane?1:-1)*.1;return}
 var n=RG.notes[best],txt,pts,col;
 if(bd<=70){txt='PERFECT';pts=3;col='#ffd23f';RG.perf++}else if(bd<=140){txt='GREAT';pts=2;col='#7bd957'}else{txt='GOOD';pts=1;col='#9fd0ff'}
 n.res=txt;RG.score+=pts;RG.combo++;RG.shake=(lane?1:-1)*.28;rgBeep(bd<=70?988:740);
 RG.fx.push({txt:txt,x:lane?240:60,t:performance.now(),col:col});
 $('#bar').style.width=Math.min(100,RG.score/(RG.notes.length*3)*100)+'%'}
function rgLoop(){
 if(!RG.run)return;
 var x=RG.c.getContext('2d'),W=300,H=360,LY=310,now=RG.st=='play'?performance.now()-RG.t0:-9999,i;
 x.imageSmoothingEnabled=false;
 x.fillStyle='#120a22';x.fillRect(0,0,W,H);
 [10,190].forEach(function(lx){x.fillStyle='#1d1235';x.fillRect(lx,0,100,H);x.fillStyle='#2e1d52';x.fillRect(lx,0,2,H);x.fillRect(lx+98,0,2,H)});
 x.fillStyle='#ff8a1f';x.fillRect(10,LY,100,3);x.fillRect(190,LY,100,3);
 x.fillStyle='rgba(255,138,31,.2)';x.fillRect(10,LY-26,100,52);x.fillRect(190,LY-26,100,52);
 if(RG.st=='play'){
  RG.notes.forEach(function(n){
   if(n.res===null&&now>n.t+230){n.res='MISS';RG.combo=0;RG.fx.push({txt:'MISS',x:n.lane?240:60,t:performance.now(),col:'#ff6b6b'})}
   if(n.res===null){var y=LY-(n.t-now)*330/1300;if(y>-30&&y<350)x.drawImage(RG.ic[n.lane],(n.lane?240:60)-24,y-30,48,60)}});
  if(!RG.done&&RG.notes.every(function(n){return n.res!==null})){RG.done=1;setTimeout(rgFinish,700)}
 }
 RG.shake*=.86;
 x.save();x.translate(150,170);x.rotate(RG.shake);x.drawImage(RG.sk,-55,-55,110,110);x.restore();
 x.textAlign='center';x.font='20px Jua,sans-serif';
 RG.fx=RG.fx.filter(function(f){return performance.now()-f.t<600});
 RG.fx.forEach(function(f){var a=1-(performance.now()-f.t)/600;x.globalAlpha=a;x.fillStyle=f.col;x.fillText(f.txt,f.x,LY-40-(1-a)*30);x.globalAlpha=1});
 if(RG.combo>1){x.fillStyle='#fff3e0';x.fillText(RG.combo+' COMBO',150,255)}
 if(RG.st=='ready'){x.fillStyle='rgba(10,5,20,.7)';x.fillRect(0,110,W,110);x.fillStyle='#ff8a1f';x.font='24px Jua,sans-serif';if(Math.floor(performance.now()/450)%2)x.fillText('TAP TO START',150,155);x.fillStyle='#fff3e0';x.font='16px Jua,sans-serif';x.fillText('왼쪽·오른쪽 칸을 박자에 맞춰 탭!',150,190)}
 requestAnimationFrame(rgLoop)}
function rgFinish(){RG.run=0;toast('완성! 🍸 PERFECT ×'+RG.perf);setTimeout(function(){go('s8')},900)}
$('#rc').addEventListener('pointerdown',function(e){e.preventDefault();var r=this.getBoundingClientRect();rgHit((e.clientX-r.left)<r.width/2?0:1)});
document.addEventListener('keydown',function(e){if(cur!='s7')return;var k=e.code;
 if(k=='ArrowLeft'||k=='KeyA'||k=='KeyF'){e.preventDefault();rgHit(0)}
 else if(k=='ArrowRight'||k=='KeyL'||k=='KeyJ'){e.preventDefault();rgHit(1)}
 else if(k=='Space'){e.preventDefault();if(RG.st=='play'){var now=performance.now()-RG.t0,b=null;RG.notes.forEach(function(n){if(n.res===null&&(!b||Math.abs(n.t-now)<Math.abs(b.t-now)))b=n});rgHit(b?b.lane:0)}else rgHit(0)}});

function ingTxt(){var TN=['레몬','라임','오렌지','딸기','체리','블루베리','포도','키위','파인애플','수박','호박','눈알','박쥐','민트','빨대'],a=st.layers.map(function(i){return CN[i]});
 if(st.ice)a.push('얼음');st.tp.forEach(function(v,i){if(v&&TN[i])a.push(TN[i])});
 return a.length?a.join(' + '):'재료를 추가해주세요!'}

function ghostHud(){var g=$('#gc');g.style.display='block';g.textContent='👻 ×'+st.ghosts}
var bl={raf:0,tm:0};
function bloodFx(){
 var c=$('#blood'),x=c.getContext('2d'),r=function(a,b,w,k,f){x.fillStyle=f;x.fillRect(a,b,w,k)},i;
 cancelAnimationFrame(bl.raf);clearTimeout(bl.tm);c.style.transition='none';c.style.opacity='1';
 var D=[];for(i=0;i<60;){var w=2+Math.floor(Math.random()*3);D.push({x:i,w:w,len:6+Math.floor(Math.random()*24),sp:.5+Math.random()*.7});i+=w+Math.floor(Math.random()*3)}
 var t0=performance.now();
 (function f(){
  var t=(performance.now()-t0)/1000;x.clearRect(0,0,60,34);
  r(0,0,60,3,'#8f0e16');r(0,0,60,1,'#c1202a');
  D.forEach(function(d){var L=Math.min(d.len,2+t*d.sp*22);r(d.x,3,d.w,L,'#a8121c');r(d.x,3,1,L,'#d33a43');if(L<d.len||t<2){r(d.x,3+L,d.w,1,'#a8121c');r(d.x+(d.w>>1),3+L+1,1,1,'#8f0e16')}});
  if(t<2.2)bl.raf=requestAnimationFrame(f)})();
 bl.tm=setTimeout(function(){c.style.transition='opacity .9s';c.style.opacity='0'},1900)}

var FW={run:0};
function pxText(lines,fs,lh,w,col){
 var c=document.createElement('canvas');c.width=w;c.height=lines.length*lh+2;var x=c.getContext('2d');
 x.font=fs+'px Jua,sans-serif';x.textAlign='center';x.textBaseline='top';x.fillStyle='#000';
 lines.forEach(function(t,i){x.fillText(t,w/2,1+i*lh)});
 var d=x.getImageData(0,0,c.width,c.height),a=d.data,i;
 for(i=0;i<a.length;i+=4){if(a[i+3]>110){a[i]=col[0];a[i+1]=col[1];a[i+2]=col[2];a[i+3]=255}else a[i+3]=0}
 x.putImageData(d,0,0);return c}
function fwStart(){
 document.querySelectorAll('.ghost').forEach(function(g){g.remove()});$('#gc').style.display='none';
 var c=$('#fw'),W=120,r=c.getBoundingClientRect(),H=Math.max(160,Math.round(W*r.height/r.width));c.width=W;c.height=H;
 var x=c.getContext('2d'),P=[['#ff9ec7','#ff6b9d'],['#ffd23f','#ff8a1f'],['#b388ff','#9b5de5'],['#7be0ff','#3a86ff'],['#9be564','#4caf50'],['#ff6b6b','#e63946']];
 var tx=pxText(['하정언니','정말','생일 축하해'],15,19,W,[255,243,224]),sh=pxText(['하정언니','정말','생일 축하해'],15,19,W,[255,107,157]);
 var heart=['0110110','1111111','1111111','0111110','0011100','0001000'],hy=0;
 var rk=[],pt=[],last=0,t0=performance.now();FW.run=1;
 var stars=[];for(var i=0;i<30;i++)stars.push([Math.random()*W,Math.random()*H*.7,Math.random()*3]);
 function launch(){try{whistle()}catch(e){}var col=P[Math.floor(Math.random()*P.length)];rk.push({x:12+Math.random()*(W-24),y:H,ty:H*(.1+Math.random()*.32),col:col})}
 launch();
 (function f(now){
  if(!FW.run)return;
  var el=(now-t0)/1000;
  if(now-last>650){last=now;launch();if(Math.random()<.4)launch()}
  x.fillStyle='#0b0616';x.fillRect(0,0,W,H);
  stars.forEach(function(s){x.fillStyle=(Math.floor(el*2+s[2])%2)?'#4a3a7a':'#2a1f4a';x.fillRect(s[0]|0,s[1]|0,1,1)});
  rk=rk.filter(function(k){k.y-=1.8;x.fillStyle='#ffe9a0';x.fillRect(k.x|0,k.y|0,1,2);x.fillStyle=k.col[1];x.fillRect(k.x|0,(k.y+2)|0,1,2);
   if(k.y<=k.ty){try{boom()}catch(e){}var n=26+Math.floor(Math.random()*14);for(var j=0;j<n;j++){var an=Math.PI*2*j/n+Math.random()*.2,sp=.5+Math.random()*.9;pt.push({x:k.x,y:k.y,vx:Math.cos(an)*sp,vy:Math.sin(an)*sp,l:1,c:k.col[j%2]})}return false}return true});
  pt=pt.filter(function(q){q.x+=q.vx;q.y+=q.vy;q.vy+=.018;q.vx*=.985;q.l-=.012;if(q.l<=0)return false;x.fillStyle=q.c;x.globalAlpha=Math.min(1,q.l*1.6);var s=q.l>.5?2:1;x.fillRect(q.x|0,q.y|0,s,s);x.globalAlpha=1;return true});
  var by=Math.round(Math.sin(el*3)*1),ty=Math.round(H*.42)+by;
  x.drawImage(sh,1,ty+1);x.drawImage(tx,0,ty);
  var hx=Math.round(W/2-3.5),hyy=ty+tx.height+4;
  heart.forEach(function(row,ry){for(var rx=0;rx<7;rx++)if(row[rx]=='1'){x.fillStyle=(rx<2&&ry<2)?'#ffd0e4':'#ff9ec7';x.fillRect(hx+rx,hyy+ry,1,1)}});
  if(el>3.5)$('#fwb').classList.remove('hide');
  requestAnimationFrame(f)})(performance.now());
}

/* ===== BGM (WebAudio chiptune, no files) ===== */
var AC={x:null};
var BG={on:1,ready:0,tr:null,name:'',step:0,next:0,mg:null,nb:null};
function mf(m){return 440*Math.pow(2,(m-69)/12)}
function tone(ty,m,t,d,v){var a=AC.x,o=a.createOscillator(),g=a.createGain();o.type=ty;o.frequency.value=mf(m);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(BG.mg);o.start(t);o.stop(t+d+.03)}
function noise(t,d,v,hp){var a=AC.x;if(!BG.nb){BG.nb=a.createBuffer(1,a.sampleRate>>1,a.sampleRate);var x=BG.nb.getChannelData(0);for(var i=0;i<x.length;i++)x[i]=Math.random()*2-1}
 var s=a.createBufferSource();s.buffer=BG.nb;var f=a.createBiquadFilter();f.type=hp?'highpass':'lowpass';f.frequency.value=hp?7000:600;var g=a.createGain();g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(BG.mg);s.start(t);s.stop(t+d+.03)}
function kick(t){var a=AC.x,o=a.createOscillator(),g=a.createGain();o.frequency.setValueAtTime(130,t);o.frequency.exponentialRampToValueAtTime(40,t+.12);g.gain.setValueAtTime(.55,t);g.gain.exponentialRampToValueAtTime(.0001,t+.16);o.connect(g);g.connect(BG.mg);o.start(t);o.stop(t+.18)}
var BASS=[[45,52],[50,57],[52,59],[45,52]],LEAD=[69,0,72,0,76,0,72,69, 74,0,77,0,74,0,69,0, 76,0,71,0,68,0,71,0, 72,0,69,0,0,0,0,0];
var HB=[[67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],[67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],[67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,1],[77,.75],[77,.25],[76,1],[72,1],[74,1],[72,2]],HM={},HR=[48,48,48,43,48,41,41,48];
(function(){var s=0;HB.forEach(function(n){HM[s]=n;s+=Math.round(n[1]*4)})})();
var SL=[74,0,77,0,81,0,77,74, 77,0,74,0,70,0,74,77, 81,0,77,0,72,0,77,81, 79,0,76,0,72,0,67,0];
var TR={
 bar:{bpm:84,spb:2,len:32,f:function(i,t,sd){var b=i>>3,p=i&7;
  if(!(p&1))tone('triangle',BASS[b][(p>>1)&1],t,sd*3,.24);
  if(LEAD[i])tone('square',LEAD[i],t,sd*2.2,.045);
  if(p&1)noise(t,.04,.035,1);
  if(i==0)tone('sine',93,t,1.6,.04)}},
 shake:{bpm:132,spb:2,len:32,f:function(i,t,sd){var b=i>>3,p=i&7,R=[50,46,53,48][b];
  if(!(p&1))kick(t);if(p==2||p==6)noise(t,.12,.22,1);else if(p&1)noise(t,.035,.05,1);
  tone('square',R+(p%4==3?12:0),t,sd*.85,.06);
  if(SL[i])tone('square',SL[i],t,sd*1.7,.05);if(SL[i])tone('triangle',SL[i]-12,t,sd*1.7,.06)}},
 party:{bpm:104,spb:4,len:96,f:function(i,t,sd){var n=HM[i];
  if(n)tone('square',n[0],t,n[1]*4*sd*.95,.08),tone('triangle',n[0]-12,t,n[1]*4*sd*.95,.08);
  if(i%12==0)tone('triangle',HR[(i/12)|0],t,sd*10,.26);else if(i%4==0)tone('triangle',HR[(i/12)|0]+7,t,sd*3,.12);
  if(i%4==2&&Math.random()<.35)tone('sine',[84,88,91,96][Math.random()*4|0],t,.4,.03)}}
};
function bgmMap(id){return id=='s9'?'party':'bar'}
function bgmSet(n){if(BG.name==n)return;BG.name=n;BG.tr=TR[n];BG.step=0;BG.next=AC.x.currentTime+.06}
function bgmTick(){var a=AC.x;if(!BG.tr||!a||a.state!='running')return;var T=BG.tr,sd=60/T.bpm/T.spb;if(BG.next<a.currentTime)BG.next=a.currentTime+.02;
 while(BG.next<a.currentTime+.25){T.f(BG.step%T.len,BG.next,sd);BG.step++;BG.next+=sd}}
var SIL=null;
function bgmWake(){
 try{var a=AC.x=AC.x||new (window.AudioContext||window.webkitAudioContext)();
  if(!BG.ready){BG.mg=a.createGain();BG.mg.gain.value=BG.on?.5:0;BG.mg.connect(a.destination);BG.ready=1;setInterval(bgmTick,60);bgmSet(bgmMap(cur))}
  if(a.state!='running')a.resume();
  /* iOS: unlock with a silent buffer, and use a looping <audio> so the silent/ringer switch doesn't mute WebAudio */
  var bs=a.createBufferSource();bs.buffer=a.createBuffer(1,1,22050);bs.connect(a.destination);bs.start(0);
  if(!SIL){SIL=document.createElement('audio');SIL.setAttribute('playsinline','');SIL.loop=true;SIL.volume=.01;
   var n=4410,d=new Uint8Array(44+n*2),v=new DataView(d.buffer),w=function(o,s){for(var i=0;i<s.length;i++)d[o+i]=s.charCodeAt(i)};
   w(0,'RIFF');v.setUint32(4,36+n*2,true);w(8,'WAVEfmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,22050,true);v.setUint32(28,44100,true);v.setUint16(32,2,true);v.setUint16(34,16,true);w(36,'data');v.setUint32(40,n*2,true);
   var bin='';for(var i=0;i<d.length;i++)bin+=String.fromCharCode(d[i]);SIL.src='data:audio/wav;base64,'+btoa(bin)}
  var pr=SIL.play();if(pr&&pr.catch)pr.catch(function(){})}catch(e){}}
['pointerdown','touchstart','touchend','click','keydown'].forEach(function(e){document.addEventListener(e,bgmWake,{passive:true})});
document.addEventListener('visibilitychange',function(){var a=AC.x;if(!a)return;if(document.hidden)a.suspend();else a.resume()});
function bgmGo(id){if(!BG.ready)return;bgmSet(bgmMap(id));if(id=='s8'){var t=AC.x.currentTime+.05;[72,76,79,84,88].forEach(function(m,k){tone('square',m,t+k*.1,.4,.08)})}}
function ghostSfx(){bgmWake();if(!BG.ready||!BG.on)return;var a=AC.x,t=a.currentTime+.01,o=a.createOscillator(),l=a.createOscillator(),lg=a.createGain(),g=a.createGain();
 o.type='sine';o.frequency.setValueAtTime(520,t);o.frequency.exponentialRampToValueAtTime(150,t+.85);
 l.frequency.value=9;lg.gain.value=22;l.connect(lg);lg.connect(o.frequency);
 g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.2,t+.08);g.gain.exponentialRampToValueAtTime(.0001,t+.9);
 o.connect(g);g.connect(BG.mg);o.start(t);l.start(t);o.stop(t+.95);l.stop(t+.95);
 tone('triangle',55,t,.8,.12);tone('sine',49,t+.05,.8,.1);noise(t,.7,.12,0)}
function bgmToggle(){bgmWake();BG.on=!BG.on;if(BG.mg)BG.mg.gain.value=BG.on?.5:0;$('#mute').textContent=BG.on?'🔊':'🔇'}
function whistle(){if(!BG.ready||!BG.on)return;var a=AC.x,t=a.currentTime,o=a.createOscillator(),g=a.createGain();o.type='sine';o.frequency.setValueAtTime(500,t);o.frequency.exponentialRampToValueAtTime(1500,t+.9);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.12,t+.1);g.gain.linearRampToValueAtTime(.0001,t+.9);o.connect(g);g.connect(BG.mg);o.start(t);o.stop(t+.95)}
function boom(){if(!BG.ready||!BG.on)return;var t=AC.x.currentTime;noise(t,.6,1,0);tone('sine',40,t,.5,.6);noise(t,.15,.25,1);noise(t+.12,.25,.08,1);noise(t+.3,.2,.06,1)}
