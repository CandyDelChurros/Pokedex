//trocar imagem
document.getElementById('img').addEventListener('change', function(event) {
    const img = event.target.files[0]
    const leitor = new FileReader() //FileReader = Ele lê um arquivo do computador e gera uma url

    leitor.onload = function(e) {
        const div = document.querySelector('.img');
        div.style.backgroundImage = `url(${e.target.result})`
        div.style.backgroundSize = `contain`
        div.style.backgroundRepeat = `no-repeat`
        div.style.backgroundPosition = `center`
    }
    if (img) {
        leitor.readAsDataURL(img)
    }
})
//selecionador de tags
const types = [];
document.querySelectorAll('.type button').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.innerText
        if (!types.includes(type)) {
            types.push(type) // adiciona um fragmento a lista
            button.style.backgroundColor = "#96D9D6"
            button.style.color = "#fff"
        } else {
            types.splice(types.indexOf(type), 1);
            button.style.backgroundColor = "" //tira a seleção, voltando a cor antiga
            button.style.color = ""
        }
    })
})
//Seleção de Informação
document.getElementById('enviar').addEventListener('click', () => {
    const nome = document.getElementById('nome').value
    const imgInput = document.getElementById('img')
    const img = imgInput.files[0]

    //notificação de Erro caso não seja preenchido
    if (!nome || !img || types.length === 0) {
        alert("Termine de Preencher")
        return
    }

    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('img', img);
    formData.append('tipos', JSON.stringify(types));

    fetch('http://localhost:3000/add-pokemon', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        alert("Pokemon adicionado!");
    })
    .catch(error => {
        console.error('Erro:', error);
        alert("Erro ao adicionar Pokemon");
    });
});
