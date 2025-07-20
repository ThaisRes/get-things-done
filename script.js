
const inputTarefa = document.querySelector("#novaTarefa");
const selectPrioridade = document.querySelector("#prioridade");
const btnAdicionar = document.querySelector("#adicionar");
const tableTarefa = document.querySelector("#tarefas");

// Habilita o botão "Adicionar" se os campos estiverem preenchidos
function verificarCampos() {
  if (inputTarefa.value.trim() && selectPrioridade.value !== "") {
    btnAdicionar.removeAttribute("disabled");
  } 
}

inputTarefa.addEventListener("input", verificarCampos);
selectPrioridade.addEventListener("change", verificarCampos);

// Adiciona nova tarefa
btnAdicionar.addEventListener("click", (e) => {
  e.preventDefault(); 

  const valorTarefa = inputTarefa.value.trim();
  const valorPrioridade = selectPrioridade.value;
  
  //Badges Prioridades
  const badgeClass = function () {
    if (valorPrioridade === "Alta") {
      return "danger";
    } else if (valorPrioridade === "Média") {
      return "warning text-dark";
    } else {
      return "success";
    }
  };

  //Tabela Tarefas
  if (valorTarefa && valorPrioridade) {
    tableTarefa.innerHTML += `
      <tr>
        <td>${valorTarefa}</td>
        <td><span class="badge rounded-pill px-3 py-2 bg-${badgeClass()} fs-6">${valorPrioridade}</span></td>
        <td>
          <span class="badge rounded-pill px-3 py-2 bg-info fs-6 concluir" style="cursor: pointer;" role="button" tabindex="0">Concluir</span>
        </td>
      </tr>
    `;

    // Limpa os campos e desabilita o botão
    inputTarefa.value = "";
    selectPrioridade.value = "";
    btnAdicionar.disabled = true;
  }
});

//evento para a badge "Concluir"
tableTarefa.addEventListener("click", (e) => {
  if (e.target.classList.contains("concluir")) {
    e.target.closest("tr").remove();
  }
});


//local storage
/*
JSON.stringify() para salvar objetos/arrays.
JSON.parse() para ler os dados salvos e transformá-los novamente em objetos.
Verificar se o dado já existe antes de sobrescrever (|| [] garante que não quebre se for null).
*/
