document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault();

    let input = document.querySelector('.busca input').value 
    let key = '7e506b7ccee77ac949d5241be91da952'

    if(input !== '') {
        
        clearInfo();
        showWarning('Carregando....')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=7e506b7ccee77ac949d5241be91da952&units=metric&lang=pt_br`
        
        let resultado = await fetch(url);
        let json = await resultado.json();

        console.log(json)
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                tempe: json.main.temp,
                vento: json.wind.speed
            });
        } else {
            document.querySelector('.resultado').style.display = 'none';
            showWarning('Não encontramos está localização')
        }


    } else {
        clearInfo();
        showWarning('Preencha o campo de cidade');
    }
})

function showInfo(json) {
    showWarning('');

    document.querySelector('.resultado').style.display = 'flex';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('#tempResultado').innerHTML = `${json.tempe}`
    document.querySelector('#ventoResultado').innerHTML = `${json.vento}`
}

function clearInfo() {
    showWarning('');

    document.querySelector('.resultado').style.display = 'none';
}


function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

