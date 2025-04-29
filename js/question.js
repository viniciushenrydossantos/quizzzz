document.querySelector('#cadastro').addEventListener('click', async(event) => {
    event.preventDefault();
    const Nome = document.querySelector('#pergunta').value;
    const Resp1 = document.querySelector('#alternativa1').value;
    const Resp2 = document.querySelector('#alternativa2').value;
    const Resp3 = document.querySelector('#alternativa3').value;
    const Resp4 = document.querySelector('#alternativa4').value;
    const RespostaCorreta = document.querySelector('#resposta').value;
    const Nivel = document.querySelector('#nivel').value;

    const res = await fetch ('http://192.168.1.21:3000/quest/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            question: Nome,
            option1: Resp1,
            option2: Resp2,
            option3: Resp3,
            option4: Resp4,
            gabarito: RespostaCorreta,
            nivel: Nivel
            })
    });

    if (res.status == 200) {
        alert('Postagem com sucesso')
    }
    else if (res.status == 500) {
        alert('Ops...houve um erro ao compartilhar sua pesquisa!')
    }
    else if (res.status == 409) {
        alert('Enunciado ja cadastrado')
    }
});
