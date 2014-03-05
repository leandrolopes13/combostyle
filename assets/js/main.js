$(document).ready(function(){
	$('select').combostyle({
		iconPath: 'assets/img/icons/'
	});
});

function destroyCombo(selector){
	if(selector != undefined){
		$(selector).combostyle('destroy');
	}else{
		$('select').combostyle('destroy');
	}
}