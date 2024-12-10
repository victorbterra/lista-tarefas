import React from "react";
import { useState } from "react";

const TodoApp = () => {
  //lista de tarefas
  const [tarefas, setTarefas] = useState([]);

  //estado do texto que vem do Input
  const [valorInput, setValorInput] = useState("");

  //funcão para adicionar tarefa
  const handlesubmit = (e) => {
    e.preventDefault();
    //condição para não adicionar tarefa vazia
    if (valorInput.trim() !== "") {
      //cria objeto com id, nome e status (concluida = false)
      const novaTarefa = {
        id: Date.now(),
        nome: valorInput,
        concluida: false,
      };
      //adiciona a nova tarefa à lista de tarefas e limpa o input
      setTarefas((prevTarefa) => [...prevTarefa, novaTarefa]);
      //limpando o input
      setvalorInput("");
    }
  };
  // função para deletar tarefas
  const handleDelete = (id) => {
    setTarefas((prevTarefas) => prevTarefas.filter((tarefa) => tarefa.id!== id));
  };
  return (
    <div className=" w-[400px] mx-auto mt-6 bg-slate-300 p-4 rounded-md">
      <h1 className=" text-purple-600 text-center text-3xl my-6">
        Lista de Tarefas
      </h1>
      {/* formulario para adicionar tarefas */}
      <form className=" flex justify-between" onSubmit={handlesubmit}>
        <input
          className="border border-purple-200 rounded-md p-2 mr-1 w-full focus:outline-none"
          type="text"
          placeholder="Adicionar tarefa..."
          value={valorInput}
          onChange={(e) => setValorInput(e.target.value)}
        />
        <button
          type="submit"
          className=" bg-blue-600 py-2 px-6 rounded-md text-white"
        >
          Adicionar
        </button>
      </form>
      {/* lista de tarefas */}
      {tarefas.length === 0 && (
        <p className="text-center py-3">Não há tarefas</p>
      )}
      {/* listando tarefas */}
      <ul className="flex flex-col py-2 my-2">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className="flex justify-between items-center bg-slate-200 py-2 px-2 my-2"
          >
            {tarefa.nome}
            <button 
            className="bg-red-500 text-white py-1 px-4 rounded-md"
            onClick={() => handleDelete(tarefa.id)}
            >
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
