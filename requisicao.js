window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
const recognition = new SpeechRecognition()
recognition.lang = 'pt-BR'
recognition.start()

recognition.addEventListener('result', result => console.log(result.results[0][0].transcript))