logo = document.getElementsByClassName('.logo'),
bar = document.getElementsByClassName('.bar'),
logoText = document.getElementsByClassName('.spam_killer'),
delCookie = document.getElementById('delCookie'), 
showCookie = document.getElementById('showCookie'),
banlist = document.getElementsByClassName('banlist'),
cookieBigBans=[].
cookieBanIds = [],
cookieUnbanIds=[],
userid = [],
// $.get(chrome.extension.getURL('banlist.json'), function(data){
// 	var parsed = $.parseJSON(data);
// 	userid = parsed[0].items;
// });
hider();
function hider() {	
	var select = document.querySelectorAll('.wall_post_text, .wall_reply_text, .bp_text');
	if($("#page_wall_header").length>0){
		// observeElement = $("#page_wall_header b");
		
		observeElement=$("#page_wall_header b");

		// setInterval(function(){observeElement.text('started');}, 5000);
	}
	else{
	
		observeElement = $('#bt_summary');
		observeElement = $('#feed_summary');
	}
	
	$(observeElement).on("DOMSubtreeModified", function(){

		reply = document.getElementsByClassName('reply_text');
		for (var i = 0; i < reply.length; i++){
			if (reply[i].childNodes.length<6){
				replyBan = document.createElement('input')
				replyBan.type='button';
				replyBan.value='Add To Ban';
				replyBan.className='AddToBan';
				replyBan.id='replyBan';

				reply[i].childNodes[0].parentNode.insertBefore(replyBan, reply[i].childNodes[2]);
				replyBan.addEventListener('click', banOne);
			}
		}
		
			var tagA = document.getElementsByTagName('a');
			var wallText = document.querySelectorAll('.wall_post_text, .wall_reply_text, .bp_text');
			bar.innerHTML='Banned: ' + userid.length;
			cross( tagA, userid.concat(cookieBigBans), wallText);
			function cross(Arr1, Arr2, Arr3){
				for ( i=0; i < Arr1.length; i++ ){
					if ( Arr1[i].className == 'author' ){
						if (Arr1[i].parentNode.childNodes.length<2){
							var addToBan = document.createElement('input');
								addToBan.className='AddToBan';
								addToBan.type = 'button';
								addToBan.value="Add To Ban";
								addToBan.id = "Add";
								Arr1[i].parentNode.insertBefore(addToBan, Arr1[i].parentNode.childNodes[1]);
								addToBan.addEventListener('click', banOne);

						}
						for( a=0; a<Arr2.length; a++){
							if (  Arr1[i].getAttribute('href') == Arr2[a] ){
								Arr1[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display='none';
							}	
						}
					}		
				}
				for ( i = 0; i < Arr3.length; i++ ){
					Arr3[i].innerHTML = Arr3[i].textContent
					.replace(/пздц|пиздец|пизда|хуй|блядь|нахуй|сука|пидорас|пидор|хуета|чмошник|б\*\*|^го|куй|куй|сладкие|анал|марамойка| девочки|хауню|хуйня|пздц|накуй|придурок|придурог|блядский|блядство|доебался|ебало|ебанул|ебанулся|[её]бнутый|[её]бнутая|[её]бнутые|хуесос|хуесосы|шлюха|пиндуй|нах|пиздуй|ахуеть|ахуенный|ахуенно|[её]пт|пизда|пиздит|охуел|ахуел|спиздил|спизди|ебаный|пиздюк|пиздище|обосанная|обоссанная|обосанный|обоссанный|хохол|пох|хохлушка|пиздюк|пиздюки|жополиз|шлюхи|бляди|пиздабол|бля|пиздишь|ебан|ебло|(Пообщаюсь с девушкой!)|(одни бляди)|(Хули ты палишь)|хер|(хер в рот)|далбаеб|заебал|ебать|(нихуя себе)|мля|замутим|нихуя|ебу|вирт|шмара|замутить|засади|засадите|хуясе|проебал|охуенные|охуенный|охуенне|ипать|попи..дим|попиздим|попездим|ебануться|жопу|жопа|жопой|жопе|(жестко любит в рот)|падла|(гоу замутим вирт)|сцучка|гоу|бог|боже|еблей|ебля|ёблей|пиздёж|пиздеж|хуле|ёбля|еплей|епля|хз|ипал|ипать|сцука|сцуко|мразинка|мразь/ig, "&#127856;&#127799; The good word could be there, but there's only emptiness.&#127856;&#127799;");
				
					if( Arr3[i].textContent.match ( /tipos\.at\.ua|Профсоюзная|метро|(для мужиков)|krof\.3dn\.ru|(хочу секса)|(в финaнcoвoм плaне)|(uщy прияmнoгo мoлoдого челoвeкa)|порно|порнуха|(член у себя в попке)|(в эскорте для женщин)|(обмeн uнmимнымu фomкaми)|(для дружбы, секса и общения)|(вы не xoтелu бы пошaлumь cо мной?)|(Качественный утренний минетик)|opik\.id\.vg|(Ищу уверенного в себе мужчину, для серьёзных отношений или не совсем серьёзных)|(Хочу предложить тебе попользоваться друг другом)|(ищу партнёра для шалостей в скайпе)|(покажу член)|(Бyдy радa нoвoмy знакoмcтву c мужчuной для дpужбы, oбщенuя uлu чeго-то бoльшего)|(Покaжу кискy пo вебке)|(Покажу киску по вебке)|(Покажу по вебке)|(Покажу по скайпу)|(Кuдaю инmuм фоmки. вoзможна сmpечa)|(В поискe сuмпaтuчнoгo мoлoдoго парня для всmречи сегодня вечеpoм)|(Стройная, свободная, страстная девушка)|(ecmь многo uнтимных фоmoгрaфuй и видeo)|futr\.pp\.ua|(Прuглашу нa чaшечкy кoфe c послeдyющим прoдолжениeм)|(страстная, стройная брюнеточка)|fVuxFsYUyj\.vn\.tn|(сучку со со своего района и приписюнить)|(ищу парня для секса в свободное время)|(Путаны из твоего города.)|(Жду тебя у себя! Приятно проведем время!)|(Хочешь окунуться в чарующий мир жаркой эротики?)|(Мальчики кто хочет секса пишите)|(Встречусь с хорошим, страсть гарантирована)|(я oчень cильнo люблю соcaть)|(юблю бpаmь в рom y паpнeй посmаpшe)|(Милая, сексуальная, красивая и очень обаятельная)|(Жду в гости Котики мой номерочек)|(925-324-17-61)|(открылась новая группа по продаже кодов)|(кто желает встреч, пишите, оплата наличными)|(Телки скучают без мужиков)|www\.youwentianxia\.cn|(Чувственная, яркая и темпераментная девушка пригласит в гости)|(Прuглашу к ceбе сегодня вeчером молoдогo и веселого парня)|(Красивая девушка с горячим темпераментом)|(Привет, кто хочет секса)|(Строго Москва и 18+)|(B таких грyппaх куча мошенников, эти бaбы все ненастоящие!)|(я сейчас свободна и могу пригласить в гости)|(Одинокие женщины в поиске)|(заходите на бесплатные сайтики знакомств)|(Москва, оплата при личной встрече)|(девушка с горячими желаниями, желает тигра)|(кто хочет секс с горячей блонди)|(жду в гости, оплата при встрече)|(работа для парней 18)|(красивого, страстного мужчину)|(удивлю техниками минета и просто помогу получить незабываемое удовольствие)|(мaльчикu кmo желaem cо мной немнoгo пошалиmь)/ig)){
						// Arr3[i].parentNode.parentNode.parentNode.parentNode.style.display="none";
						// Arr3[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display='none';
						// alert(Arr3[i].className);
						Arr3[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display='none';
					}
				}
			}
			
		})
	}

getCookieToArray = ( $.cookie('ids')) ? JSON.parse($.cookie('ids')) : '';
cookieBigBans = getCookieToArray;

function banOne(){
		$.removeCookie('ids');
		cookieBanIds=[];

		(event.target.id=='replyBan') ? cookieBanIds.push(event.target.parentNode.childNodes[1].getAttribute('href')) : cookieBanIds.push(event.target.parentNode.childNodes[0].getAttribute('href'));
		var readyToCookieArray=cookieBanIds.concat(getCookieToArray);
		$.cookie('ids', JSON.stringify(readyToCookieArray), {expires: 1000});
		getCookieToArray = ( $.cookie('ids')) ? JSON.parse($.cookie('ids')) : '';
		cookieBigBans = getCookieToArray;
		$("#page_wall_header b").text('started');



}

$(document).ready(function(){
	$(".unbun").click(function(){

			ids = this.parentNode.childNodes[0].textContent;
			// userid = $.grep(userid, function(n,i){
			// 	return (n!== ids)

			// });
		

	});

	$("#page_wall_header b").text('started');
	$("#feed_summary").text('started');
	$('#bt_summary').text('started');
	// observeElement = $('#wall_more_progress');


	// alert($(".author").attr('href'));
	// $("#page_wall_posts").on("DOMNodeInserted", function(){
	// 	alert("dd");
	// });
	
});





