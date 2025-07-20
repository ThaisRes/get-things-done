
const inputTarefa = document.querySelector("#novaTarefa");
const selectPrioridade = document.querySelector("#prioridade");
const btnAdicionar = document.querySelector("#adicionar");
const tableTarefa = document.querySelector("#tarefas");

// Habilita o botão "Adicionar" se os campos estiverem preenchidos
function verificarCampos() {
  if (inputTarefa.value.trim() && selectPrioridade.value !== "") {
    btnAdicionar.removeAttribute("disabled");
  } else {
    btnAdicionar.setAttribute("disabled", "disabled");
  }
}

inputTarefa.addEventListener("input", verificarCampos);
selectPrioridade.addEventListener("change", verificarCampos);

// Adiciona nova tarefa
btnAdicionar.addEventListener("click", (e) => {
  e.preventDefault(); 

  const novaTarefa = {
    valorTarefa: inputTarefa.value.trim(),
    valorPrioridade: selectPrioridade.value,
  };
  
  //Adicionar no local Storage
  const tarefas = JSON.parse(localStorage.getItem("listaTarefas")) || [];
  tarefas.push(novaTarefa);
  localStorage.setItem("listaTarefas", JSON.stringify(tarefas));

  //atualizar tabela
  adicionarTarefaNaTabela(novaTarefa);

  // Limpa os campos e desabilita o botão
  inputTarefa.value = "";
  selectPrioridade.value = "";
  btnAdicionar.disabled = true;
});

//carregar tarefas salar ao iniciar
window.addEventListener("DOMContentLoaded", () => {
  const tarefas = JSON.parse(localStorage.getItem("listaTarefas")) || [];
  tarefas.forEach(adicionarTarefaNaTabela);
});

//Badges Prioridades
  const badgeClass = function (prioridade) {
    if (prioridade === "Alta") { 
      return "danger";
    } else if (prioridade === "Média") {
      return "warning text-dark";
    } else {
      return "success";
    }
  };

//função para adicionar linha na tabela
function adicionarTarefaNaTabela(tarefa) {
  const linha = document.createElement("tr");

  linha.innerHTML =`
    <td>${tarefa.valorTarefa}</td>
    <td>
      <span class="badge rounded-pill px-3 py-2 bg-${badgeClass(tarefa.valorPrioridade)} fs-6">${tarefa.valorPrioridade}</span></td>
    <td>
      <span class="badge rounded-pill px-3 py-2 bg-primary-subtle text-primary fs-6 badgeConcluir" style="cursor: pointer;" role="button" tabindex="0">Concluir</span>
    </td>
  `;

//evento para a badge "Concluir"
const badgeConcluir = linha.querySelector(".badgeConcluir");
badgeConcluir.addEventListener("click", () => {
  linha.remove();
  removerTarefaStorage(tarefa.valorTarefa);
});

tableTarefa.appendChild(linha);
}

// Remover tarefa do Local Storage
function removerTarefaStorage(valorTarefa) {
  let tarefas = JSON.parse(localStorage.getItem("listaTarefas")) || [];
  tarefas = tarefas.filter(t => t.valorTarefa !== valorTarefa);
  localStorage.setItem("listaTarefas", JSON.stringify(tarefas));
}