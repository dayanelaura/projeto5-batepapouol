let mensagem;
let nomeInicio;

entrarnasala();

function entrarnasala(){
    nomeInicio = prompt("Digite seu nome:");
    const promessa = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", {
name: nomeInicio});

    promessa.then(carregandosala);
    promessa.catch(nomeInvalido);
}

function nomeInvalido(){
    entrarnasala();
    alert("Você digitou um nome inválido. Tente novamente:");
}

function manterconexao(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", {name: nomeInicio});
}

function carregandosala(){
    // colocar um gif de carregando quando entrar aqui;
    setInterval(buscarmensagens, 3000);
    setInterval(manterconexao, 4000);
}

function buscarmensagens(){
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(recebeDados);
}

function recebeDados(resposta){
    console.log("Os dados chegaram!");
    console.log(resposta);
    mensagem = resposta.data;

renderizarMensagens(resposta);
}

function renderizarMensagens(resposta){
    
    const ulchat = document.querySelector(".boxmensagens");   
    ulchat.innerHTML = "";
    // console.log(resposta);

    let msg = resposta.data.length;
    for(let i=0; msg > i; i++){

    const from = (resposta.data[i].from);
    const to = (resposta.data[i].to);
    const text = (resposta.data[i].text);
    const type = (resposta.data[i].type);
    const time = (resposta.data[i].time);

    if (type == "status"){
        mensagem = `<li class= "caixamsg cinza">
        <div class="clock">(${time})</div>
        <div class="texto"><strong>${from}</strong> ${text}</div>
        </li>`;
        ulchat.innerHTML = ulchat.innerHTML + mensagem;
    }else if (type == "message"){
        mensagem = `<li class= "caixamsg branca">
        <div class="clock">(${time})</div>
        <div class="texto"><strong>${from}</strong> para <strong>${to}</strong>: ${text} </div>
        </li>`;
        ulchat.innerHTML = ulchat.innerHTML + mensagem;
    }else if(type == "private_message"){
        mensagem = `<li class= "caixamsg rosa">
        <div class="clock">(${time})</div>
        <div class="texto"><strong>${from}</strong> reservadamente para <strong>${to}</strong>: ${text}</div>
        </li>`;
        ulchat.innerHTML = ulchat.innerHTML + mensagem;
    }
    }

    const elementoVisivel = document.querySelector('.caixamsg:last-child');
    elementoVisivel.scrollIntoView();
}