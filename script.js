async function carregarAlunos() {
  const url = 'https://670edf663e7151861656043e.mockapi.io/api/alunos'
  try{
      const resposta =  await fetch(url)
      const dadosAluno = await resposta.json()
      console.log(dadosAluno)
      const listaAlunos = document.querySelector('#studentList')
      listaAlunos.innerHTML = ''
      dadosAluno.forEach(dadosDeUmAlunoSo=> {
          const conteudoHtmlAluno =`
          <strong>ID:</strong>
          ${dadosDeUmAlunoSo.id}
          <br />
          <strong>Nome:</strong>
          ${dadosDeUmAlunoSo.nome}
          <br />
          <strong>Idade:</strong>
          ${dadosDeUmAlunoSo.idade}
          <button onclick="deletarEstudante(${dadosDeUmAlunoSo.id})">Deletar</button>
          <button onclick="editarEstudante(${dadosDeUmAlunoSo.id})">Editar</button>
          <hr />
        `
      listaAlunos.innerHTML += conteudoHtmlAluno
  });
  
}
catch{
  console.log('Não consegui carregar os alunos da API')

}
}
async function cadastrarAluno() {
  const url = 'https://670edf663e7151861656043e.mockapi.io/api/alunos'
  const nomeDigitado = document.querySelector('#name').value
  const idadeDigitada = document.querySelector('#age').value
  let dadosAluno = {
    nome: nomeDigitado,
    idade: idadeDigitada

  }
  dadosAluno = JSON.stringify(dadosAluno)
  const resposta = await fetch(url,{
    method:'Post',
    headers:{'Content-Type': 'application/json'},
    BODY: dadosAluno
  })
  alert('Aluno cadastrado com sucesso')
}

async function deletarEstudante(id) {
  const url = `https://670edf663e7151861656043e.mockapi.io/api/alunos/${id}`
  const resposta = await fetch(url,{
    method: 'DELETE'
    
  })
  alert('Aluno apagado com sucesso')
  carregarAlunos()


}

async function editarEstudante(id) {
  const url = `https://670edf663e7151861656043e.mockapi.io/api/alunos/${id}`
  
  const nomeAlteracao = document.querySelector('#name').value
  const idadeAlteracao = document.querySelector('#age').value
  let informacoesAlteradas ={
    nome: nomeAlteracao,
    idade: idadeAlteracao
  }
  informacoesAlteradas = JSON.stringify(informacoesAlteradas)

  const resposta = await fetch(url,{
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: informacoesAlteradas

  })
  alert('Aluno editado com sucesso!')
  carregarAlunos()
}
carregarAlunos()