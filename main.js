const synth = speechSynthesis;
//Dom
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');
//Voices array
let voices = [];
const getVoices = () => {
    voices = synth.getVoices();
    // loop throw voices and create an option
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//speak 
const speak = () => {
    if (synth.speaking) {
        console.error('Already speaking');
        return;
    }
    if (textInput.value !== '') {
        // Add background animation
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
        //get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        //speak end
        speakText.onend = e => {
                console.log('Done Speaking.');
                body.style.background = '#141414';
            }
            //speack err
        speakText.onerror = e => {
                console.log('something wrong.');
            }
            // selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        // loop through voices
        voices.forEach(voice => {
            if (voices.name === selectedVoice) {
                speakText.voice = voice;
            }
        });
        //Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //speak
        synth.speak(speakText);
    }
};

//event
textForm.addEventListener('submit', (e) => {
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value);
//Pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value);
//voice select change
voiceSelect.addEventListener('change', e => speak());