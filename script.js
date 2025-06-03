document.getElementById("cep").addEventListener("blur", (evento)=>{ //vai "escutar" o "blur" e vai chamar a função anônima com o evento como parâmentro.Ele está sendo utilizado como parâmetro, pois seu "target" será utilizado para a variável "elemento"
    const elemento = evento.target; //o elemento será o alvo do "blur" (id='cep')
    const cepInformado = elemento.value;    //o valor de elemento será atribuído a "cepInformado"

    if(!(cepInformado.length===8)){ //validando o CEP digitado pelo seu tamanho
        return alert('CEP inválido');
    }

    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then (response => response.json()) //será solicitado o arquivo . json
        .then (data => {                    //caso obtenha o arquivo, então será pego seus dados
            if(!data.erro){                 //"data.erro" é uma resposta da própria API que     estabelece como a representação de um erro com os dados solicitados
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            } else {
                return alert('CEP não encontrado')
            }            
        })
        .catch(error => console.error("Erro ao busca CEP: ", error));
})