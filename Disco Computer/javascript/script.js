//PLAY BUTTON

//ASKING IF IT SHOULD FIRE THE PLAY FUNCTION

var shouldIPlay = true;
var shouldIRepeat = true;
var whichBeat = 0;
var speed = 0;

function onPlay(){
	if(Howler.ctx.state !== 'running') {
    Howler.ctx.resume();};

	if(shouldIPlay == true){
		shouldIRepeat = true;
		shouldIPlay = false;
		playFunction();
	}
}

//METRONOME

function playFunction() {

	if(shouldIRepeat == true){
	var bpmData = document.getElementById("bpmValue").value;
	var speed = (( 60 / bpmData) * 250);

//IF BEAT IS 1

		if(whichBeat==0){
		playBeat(0);
		playSynth(0);
		document.getElementById("counter0").style.color = "#1dafad";
	 	document.getElementById("counter15").style.color = "#2c2f49";
	 	whichBeat++;
	 	setTimeout(playFunction, speed);
		

//IF BEAT IS LESS THAN 15

		}else if((whichBeat<15)&&(whichBeat>=1)){
		playBeat(whichBeat);
		playSynth(whichBeat);
	 	var whichLight = "counter" + whichBeat;
	 	var whichLightOff = "counter" + (whichBeat - 1);
	 	document.getElementById(whichLight).style.color = "#1dafad";
	 	document.getElementById(whichLightOff).style.color = "#2c2f49";
	 	whichBeat++;
	 	setTimeout(playFunction, speed);

//IF BEAT IS 15

	 }else{
	 	playBeat(15);
	 	playSynth(15);
	 	document.getElementById("counter15").style.color = "#1dafad";
	 	document.getElementById("counter14").style.color = "#2c2f49";
	 	whichBeat = 0;
	 	setTimeout(playFunction, speed);
	 }

//IF STOP HAS BEEN PRESSED, TURN ALL THE LIGHTS OFF

	}else{
		shouldIRepeat = true;
		whichBeat = 0;
		for(i=0;i<=15;i++){
			var lightsOut = "counter" + i;
			document.getElementById(lightsOut).style.color = "#2c2f49";
		}
	}

}

//STOP BUTTON

stopFunction = function(){
	shouldIRepeat = false;
	shouldIPlay = true;

}

//DISABLE SPACE AND ENTER

document.onkeydown = function(event){
    if(event.keyCode == 32||13) {
       return false;
    }
};

document.onkeydown = function(event){
    if(event.which == 32||13) {
       return false;
    }
};

window.onkeydown = function(event){
    if(event.keyCode == 32||13) {
       return false;
    }
};

window.onkeydown = function(event){
    if(event.which == 32||13) {
       return false;
    }
};


//SPACE IS PLAY AND STOP

var stopSpace = true;

document.onkeydown = function(e){

	 if((e.keyCode == 32)&&(stopSpace==true)){
	 	if(shouldIPlay == false){
			stopFunction();
		}else{
 			onPlay()}
 	stopSpace = false;
    setTimeout(function(){stopSpace = true}, 100);
    }
}

//VOLUME

Howler.volume(0.7);

volumeControl = function(){
	var volData = document.getElementById("volValue").value;
	Howler.volume(volData/10)
}

//TOGGLE SWITCHES

var toggleArray = new Array (0,0,0,0,0,0,0);
var muteOrNot = new Array ("kick", "snar", "clos", "open", "perc", "synt", "synh");
var downTime = "";
var thisToggle = 10;

function toggleDown(z){

	downTime = new Date;
	thisToggle = z;
}

function toggleUp(x){

	var n = "toggle" + x;

	//if mouse is held
	
	if((((new Date)-downTime)>600)&&(thisToggle==x)){
		window[muteOrNot[x] + "Array"] = new Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
		toggleArray[x] = 0;

		for(i=0;i<=15;i++){

			var y = muteOrNot[x] + i;
			document.getElementById(y).value = "";
			document.getElementById(y).style.background = "#cec8b5";
			document.getElementById(y).style.border = "#cec8b5 solid 2px";
			document.getElementById(n).style.color = "#035154"}
 		}

	else if(thisToggle==x){
		var o = muteOrNot[x] + "Array";
		var p = 0;

	for(i=0;i<=15;i++){
		var q = window[o][i];
		p = p + q;
	}

	//if all notes are blank play note

	if(p==0){if(toggleArray[x]==1){
		document.getElementById(n).style.color = "#035154";
				toggleArray[x] = 0;
				thisToggle = 10;
	}else{if((x<=4)){
		window[muteOrNot[x] + "a"].play();
			}else if(x==5){s1n0.play()}else{s2n0.play()}}

		
	//else toggle

		}else{
			if((toggleArray[x] == 0)&&(thisToggle==x)){

				document.getElementById(n).style.color = "#3aafbc";
				toggleArray[x] = 1;
				thisToggle = 10;

			}else if((toggleArray[x] == 1)&&(thisToggle==x)){
				
				document.getElementById(n).style.color = "#035154";
				toggleArray[x] = 0;
				thisToggle = 10;
			}
		}

	}

}


//DRUM KIT SELECT

var whichKit = 0;
var kicka = kick0;
var snara = snar0;
var closa = clos0;
var opena = open0;
var perca = perc0;

function kitSelect(){

	var whichKit = document.getElementById("kit").value;

		kicka = window["kick" + whichKit];
		snara = window["snar" + whichKit];
		closa = window["clos" + whichKit];
		opena = window["open" + whichKit];
		perca = window["perc" + whichKit];
}

//DRUM SEQUENCER

var kickArray = new Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var snarArray = new Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var closArray = new Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var openArray = new Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var percArray = new Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

sequencer = function(sound, number){

	var whichSound = sound + number;

	if(sound=="kick"){x=kickArray}
		else if(sound=="snar"){x=snarArray}
			else if(sound=="clos"){x=closArray}
				else if(sound=="open"){x=openArray}
					else{x=percArray};

	if(x[number]==0){
			x[number] = 1;
			document.getElementById(whichSound).style.background = "#a05a10";
			document.getElementById(whichSound).style.border = "#a56413 solid 2px";
					
	}else{
			x[number] = 0;
			document.getElementById(whichSound).style.background = "#cec8b5";
			document.getElementById(whichSound).style.border = "#cec8b5 solid 2px";
	}

}

//PLAYBEAT

function playBeat(beat){
	if((kickArray[beat]==1)&&(toggleArray[0]==0)){
		kicka.play();
		document.getElementById("kick"+beat).style.background = "#b56b1c";
		setTimeout(function(){
			if(kickArray[beat]==1){document.getElementById("kick"+beat).style.background = "#a05a10"}}, 100);
	}
	if((snarArray[beat]==1)&&(toggleArray[1]==0)){
		snara.play();
		document.getElementById("snar"+beat).style.background = "#b56b1c";
		setTimeout(function(){
			if(snarArray[beat]==1){document.getElementById("snar"+beat).style.background = "#a05a10"}}, 100);
	}
	if((closArray[beat]==1)&&(toggleArray[2]==0)){
		closa.play();
		document.getElementById("clos"+beat).style.background = "#b56b1c";
		setTimeout(function(){
			if(closArray[beat]==1){document.getElementById("clos"+beat).style.background = "#a05a10"}}, 100);
	}
	if((openArray[beat]==1)&&(toggleArray[3]==0)){
		opena.play();
		document.getElementById("open"+beat).style.background = "#b56b1c";
		setTimeout(function(){
			if(openArray[beat]==1){document.getElementById("open"+beat).style.background = "#a05a10"}}, 100);
	}
	if((percArray[beat]==1)&&(toggleArray[4]==0)){
		perca.play();
		document.getElementById("perc"+beat).style.background = "#b56b1c";
		setTimeout(function(){
			if(percArray[beat]==1){document.getElementById("perc"+beat).style.background = "#a05a10"}}, 100);
	}
}

//SYNTH SEQUENCER

var syntArray = new Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var synhArray = new Array (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
var notes = new Array ("","A","A#","B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A");
var upDown = "";
var synthDate = "";

synthDown = function(sound,number){
	synthDate = new Date;
	upDown = sound + number;
}

synthSequencer = function(sound, number){

	var thisOne = sound + number;

	if((((new Date)-synthDate)>500)&&(thisOne==upDown)){

		for(i=0;i<=15;i++){

		var y = sound + number;
		document.getElementById(thisOne).style.background = "#cec8b5";
		document.getElementById(thisOne).style.border = "#cec8b5 solid 2px";
		document.getElementById(thisOne).value = "";
		}

		window[sound + "Array"][number] = 0;

	}else if(thisOne==upDown){

	
	if(sound=="synt"){x=syntArray}else{x=synhArray};

	var whichNote = x[number];

	if(whichNote<=12){
		whichNote = whichNote + 1;
		if(sound=="synt"){
		document.getElementById(thisOne).style.background = "#7f3063";
		document.getElementById(thisOne).style.border = "#913771 solid 2px"}
		else{
		document.getElementById(thisOne).style.background = "#991818";
		document.getElementById(thisOne).style.border = "#963333 solid 2px";
		}
	}else{
		whichNote = 0;
		document.getElementById(thisOne).style.background = "#cec8b5";
		document.getElementById(thisOne).style.border = "#cec8b5 solid 2px"};

	x[number] = whichNote;
	var thisNote = notes[whichNote]
	document.getElementById(thisOne).value = thisNote;}

}

//SYNTH 1 SELECT

var s1n0 = acid0;
var s1n1 = acid1;
var s1n2 = acid2;
var s1n3 = acid3;
var s1n4 = acid4;
var s1n5 = acid5;
var s1n6 = acid6;
var s1n7 = acid7;
var s1n8 = acid8;
var s1n9 = acid9;
var s1n10 = acid10;
var s1n11 = acid11;
var s1n12 = acid12;

var whichSoundSynth1 = "acid";

function synth1Select(){

	var whichSoundSynth1 = document.getElementById("synth1").value;

	for(i=0;i<=12;i++){
				window["s1n" + i] = window[whichSoundSynth1 + i];
	}
}

//SYNTH 2 SELECT

var s2n0 = psy0;
var s2n1 = psy1;
var s2n2 = psy2;
var s2n3 = psy3;
var s2n4 = psy4;
var s2n5 = psy5;
var s2n6 = psy6;
var s2n7 = psy7;
var s2n8 = psy8;
var s2n9 = psy9;
var s2n10 = psy10;
var s2n11 = psy11;
var s2n12 = psy12;

var whichSoundSynth2 = "psy";

function synth2Select(){
	var whichSoundSynth2 = document.getElementById("synth2").value;

	for(i=0;i<=12;i++){
				window["s2n" + i] = window[whichSoundSynth2 + i];
	}
}


//SYNTH PLAYER

function playSynth(beat){
	x = syntArray[beat] - 1;
	y = synhArray[beat] - 1;

	if((syntArray[beat]!=0)&&(toggleArray[5]==0)){
		window["s1n" + x].play();
		document.getElementById("synt"+beat).style.background = "#913b72";
		setTimeout(function(){
			if(syntArray[beat]!=0){document.getElementById("synt"+beat).style.background = "#7f3063"}}, 100);
	}

	if((synhArray[beat]!=0)&&(toggleArray[6]==0)){
		window["s2n" + y].play();
		document.getElementById("synh"+beat).style.background = "#b22323";
		setTimeout(function(){
			if(synhArray[beat]!=0){document.getElementById("synh"+beat).style.background = "#991818"}}, 100);
	}
}


