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

const meuFormulario = document.getElementById("meuFormulario");

// Salvar dados do formulário
function salvarForm() {
    const dados = new FormData(meuFormulario);  //pega todos os dados de "form"
    const obj = Object.fromEntries(dados);      //pega todas as entradas do formulário e transforma em um objeto só
    localStorage.setItem('formInfo', JSON.stringify(obj));  //converte um objeto em texto (string) para poder guardar em localStorage (persistência)
}

// Restaurar dados do formulário
function restaurarForm() {
    const dados = localStorage.getItem('formInfo'); //pega o que foi salvo no localStorage
    if (dados) {                                    //se retornar algum "dado", então...
        const obj = JSON.parse(dados);              //converta o jason em objeto
        for (let [name, value] of Object.entries(obj)) {    //para cada campo salvo, será preenchido com o valor. Ex: name="nome", valor="Filipe"
            const campo = meuFormulario.querySelector(`[name="${name}"]`);  //procure o campo com o name = "name" (importância do name ser igual ao campo do nome?)
            if (campo) campo.value = value; //vai retornar o valor do campo. Se campo for igual a "nome", vai retornar o valor do campo "nome" ("Filipe", no caso)
              
        }
    }
}

// Salva quando o usuário digita
meuFormulario.addEventListener('input', salvarForm);

// Restaura quando a página carrega
document.addEventListener('DOMContentLoaded', restaurarForm);