 document.querySelector("#login").addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#Email").value;
    const senha = document.querySelector("#senhaLogin").value;
    if (email != '' && senha != '') {
       
        try {
            const response = await fetch("http://192.168.1.21:3000/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({email, senha }),
                        });
              
            if (response.status == 200) {
                const data = await response.json();
                if(data.funcao == "admin"){
                    window.location.replace("./formulario.html"); // Redireciona para a página cadastro
                }
                else
                    window.location.replace("./quiz.html"); // Redireciona para a página home
            } else {
                alert('Usuário ou senha incorretos!', 'danger');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao tentar fazer login. Tente novamente mais tarde.', 'danger');
        }
    } else {
        alert('Preencha todos os campos!', 'warning');
    }
});