const clock = document.querySelector('.clock');
const button = document.querySelector('#botao');
const closeModal = document.querySelector('#closeModal')
const closeModalX = document.querySelector('#closeModalX')
const container = document.querySelector('#exampleModal')
const modal = new bootstrap.Modal(container);
const fullModal = document.querySelector('#fullModal')
const modalTelaCheia = new bootstrap.Modal(fullModal)
const saveModal = document.querySelector('#saveModal')
const nomeInput = document.querySelector('#nome')
const afterLogin = document.querySelector('.afterLogin')
const horaInput = document.querySelector('#hora')
const minutoInput = document.querySelector('#minuto')
const clock2 = document.querySelector('.clock-2')
const containerEmpty = document.querySelector('.test')
const audio = document.querySelector('#audio-despertador')
const audioZeroTwo = document.querySelector('#zeroTwo-audio')
const imgBanner = document.querySelector('#imgBanner')
const botaoFullScreen = document.querySelector('.botaoFullScreen')

let speech = new SpeechSynthesisUtterance();
speech.lang = "en";


function textToSpeech(nome){
  speech.text = "Olá, " + nome + ", Já esta na hora de rodar....,      agradecemos, por usar nosso, programa."
}

showDate()

function showDate() {
  let hora = parseInt(horaInput.value)
  let minuto = parseInt(minutoInput.value)
  let date = new Date()
  let h = '0' + date.getHours();
  let m = '0' + date.getMinutes();
  let s = '0' + date.getSeconds();

  let timeNow = `${h.slice(-2)}:${m.slice(-2)}:${s.slice(-2)}`

  if (h == hora && m == minuto && s == '00') {
      // audio.play();
    
    window.speechSynthesis.speak(speech)
    modalTelaCheia.show()
  }
  clock.innerHTML = timeNow
  clock.textContent = timeNow

  setTimeout(showDate, 1000);
}

closeModal.addEventListener('click', () => {
  modal.hide()

})

closeModalX.addEventListener('click', () => {
  modal.hide()

})

botaoFullScreen.addEventListener('click', () =>{
  document.location.reload(true)
})

saveModal.addEventListener('click', () => {
  let nome = pegaNome(nomeInput.value)
  let hora = horaInput.value
  let minuto = minutoInput.value
  
  if(validaCampoHora(hora, "Hora") && validaCampoHora(minuto, "Minuto") && validaCampoNome(nome, "Nome")){
    
    if (hora < 10) {
      hora = '0' + hora
    };
    if (minuto < 10) {
      minuto = '0' + minuto
    };
    textToSpeech(nome)
    let finalHour = `${hora}:${minuto}`
    modal.hide()
    return escreveNaLogo(nome, finalHour);
    
  }else{
    console.log('entrou aqui')
    return 
  }
})

function escreveNaLogo(nome, horario) {

  containerEmpty.setAttribute('style', 'visibility:visible')
  afterLogin.innerHTML = `Olá ${nome} relaxa ai,<br>seu próximo roll é as <p class="pintudo">${horario}</p>`
  
}

Date.prototype.addHours = function (h) {
  this.setTime(this.getTime() + (h * 60 * 60 * 1000));
  return this;
}

imgBanner.addEventListener('click', ()=>{
  audioZeroTwo.play();
});

function validaCampoHora(campo, campoNome){
  if(campo.length < 3 && campo.length > 0){
      return true
  }else{
    alert('Ops..  algo deu errado, o campo ' + campoNome + ' parece está inválido :/')
    return false
  };
}

function pegaNome(nome){return nome }

function validaCampoNome(campo, campoNome){
  if(campo.length < 13 && campo.length > 1){
    return true
  }else{
    alert('Ops..  algo deu errado, o campo ' + campoNome + ' parece está inválido :/')
    return false
  }
}

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();

  speech.voice = voices[1];
}


