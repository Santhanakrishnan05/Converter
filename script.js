

// script for converting speech to text:
document.addEventListener('DOMContentLoaded', (event) => {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser does not support the Web Speech API. Please upgrade to the latest version.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  const voiceSelect = document.getElementById('voiceSelect');
  const txt = document.getElementById('txt');
  const startBtn = document.getElementById('start');
  const stopBtn = document.getElementById('stop');

  // Fetch available voices from the Web Speech API
  function populateVoiceList() {
    const voices = window.speechSynthesis.getVoices();
    voices.forEach(voice => {
      const option = document.createElement('option');
      option.value = voice.lang;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(option);  
    });
  }

  // Populate the voice list after the voices are loaded
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  populateVoiceList();

  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        txt.value += event.results[i][0].transcript + '\n';
      }
    }
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  startBtn.addEventListener('click', () => {
    const selectedLanguage = voiceSelect.value;
    recognition.lang = selectedLanguage;
    recognition.start();
    console.log('Speech recognition started');
  });

  stopBtn.addEventListener('click', () => {
    recognition.stop();
    console.log('Speech recognition stopped');
  });
});
//-------------------------------//

// Navbar Scrolling scrip :

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    // Scroll Down
    navbar.style.top = '-60px'; // Adjust the value based on your navbar height
  } else {
    // Scroll Up
    navbar.style.top = '0';
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
});

//-------------------------------//

// script for converting text to speech

let text = document.getElementById("txt");
let convertbtn = document.getElementById("submit");
let resumebtn = document.getElementById("resume");
let pausebtn = document.getElementById("pause");
let voiceSelect = document.getElementById("voiceSelect");
let audioMessage;

// Populate the voice options
function populateVoiceList() {
  if (typeof speechSynthesis === 'undefined') {
    return;
  }

  let voices = speechSynthesis.getVoices();
  voiceSelect.innerHTML = '';
  voices.forEach((voice, i) => {
    let option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = i;
    voiceSelect.appendChild(option);
  });
}

// Event listener for voice change
voiceSelect.addEventListener('change', () => {
  let selectedVoiceIndex = voiceSelect.value;
  audioMessage.voice = speechSynthesis.getVoices()[selectedVoiceIndex];
});

convertbtn.addEventListener("click", () => {
  audioMessage.text = text.value;
  audioMessage.voice = speechSynthesis.getVoices()[voiceSelect.value];
  window.speechSynthesis.speak(audioMessage);
});

resumebtn.addEventListener("click", () => {
  pausebtn.style.display = "block";
  resumebtn.style.display = "none";
  
  if(speechSynthesis.paused) { 
    speechSynthesis.resume();
  }
});

pausebtn.addEventListener("click", () => {
  pausebtn.style.display = "none";
  resumebtn.style.display = "block";

  if(speechSynthesis.speaking) {
    speechSynthesis.pause();
  }
});

window.onload = () => {
  resumebtn.style.display = "none";
  if ("speechSynthesis" in window) {
    audioMessage = new SpeechSynthesisUtterance();
    populateVoiceList();
    speechSynthesis.onvoiceschanged = populateVoiceList;
  } else {
    alert("Speech Synthesis is not supported");
  }
};

//-------------------------------//