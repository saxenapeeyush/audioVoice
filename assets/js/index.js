window.addEventListener('load',bindEvents);
function bindEvents() {
    recordingSetup();
    document.querySelector('#recorder').addEventListener('click',recordAudio);
    document.querySelector('#stopRecording').addEventListener('click',stopRecording);
    document.querySelector('#playAll').addEventListener('click',playAll);
}

let mic,recorder,soundFile,convertToBlob,SaveSound;
let status =0;
var arr=[];
var formdata=new FormData();
function recordingSetup() {
    mic=new p5.AudioIn();
    recorder=new p5.SoundRecorder();
    soundFile=new p5.SoundFile();
    recorder.setInput(mic);
    // SaveSound=new p5.saveSound();
}
function recordAudio() {
    mic.start();
    recorder.record(soundFile);
    document.querySelector('#stopRecording').classList.remove('d-none');
    document.querySelector('#recorder').classList.add('d-none');
}
function stopRecording() {
    mic.stop();
    recorder.stop();
    soundFile.play(); 
    console.log(soundFile);
    // console.log(typeof(soundFile));
    // console.log(soundFile.buffer);
    // context.decodeAudioData(soundFile.buffer);
    // p5.getAudioContext(soundFile);
    // console.log(context);
    // var mysound=loadSound(soundFile);
    // SaveSound(soundFile,"peeyush");
    // to test and play the sound remove the above comment for the testing purpose only .
    document.querySelector('#stopRecording').classList.add('d-none');
    document.querySelector('#recorder').classList.remove('d-none');
}
function playAll() {
    var newSound=new SoundObject(soundFile);
    var promise=firebase.database().ref('/sounds').set(soundFile.buffer);
    promise.then((response)=> {
        console.log(response);
    }).catch(err=> {
        console.log(err);
    })
}
