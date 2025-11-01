const formulario = document.getElementById('formulario')
const nomeCidade = document.getElementById('nomeCidade')
const dataAtual = document.getElementById('dataAtual')
const temperaturaC = document.getElementById('temperaturaC')
const sensacao = document.getElementById('sensacao')
const humidade = document.getElementById('humidade')
const secao = document.getElementById('secao')
const fechar = document.getElementById('fechar')
const carregando = document.getElementById('carregando')
let inputCidade = document.getElementById('cidade')

formulario.addEventListener('submit', async (e) => {
    e.preventDefault()
    const cidade = inputCidade.value.trim()

    if (inputCidade.value == '') {
        window.alert('Digite o nome da cidade!')
        return
    }

    console.log('enviou a cidade: ', cidade)

    nomeCidade.textContent = inputCidade.value
    carregando.textContent = `Carregando o tempo em ${cidade}...`
    carregando.style.display = 'block'


    const url = `https://wttr.in/${cidade}?format=j1`

    try {
        await fetch(url)
       .then(res => res.json())
       .then(res => {
        if (res.ok) {
            carregando.style.display = 'none'
            secao.style.display = 'flex'
            if (temperaturaC.textContent = res.current_condition[0].temp_C > 25) {
                secao.style.backgroundImage = "url('./assets/sol.jpg')";
            } else {
                secao.style.backgroundImage = "url('./assets/nublado.jpg')";
            }
            dataAtual.textContent = res.current_condition[0].localObsDateTime
            temperaturaC.textContent = res.current_condition[0].temp_C
            sensacao.textContent = res.current_condition[0].FeelsLikeC
            humidade.textContent = res.current_condition[0].humidity


            console.log(res)
        } else {
            window.alert('Digite um nome válido!')
            inputCidade.value = ''
        }
       })
       .catch(err => console.log(err));    
    } catch (error) {
        
    }
})

fechar.addEventListener('click', () => {
    secao.style.display = 'none'
    inputCidade.value = ''
})