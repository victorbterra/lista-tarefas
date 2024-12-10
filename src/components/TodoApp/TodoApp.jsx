import React from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";

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
      setValorInput("");
    } else {
      alert("Por favor, digite um nome para a tarefa.");
    }
  };
  // função para deletar tarefas
  const handleDelete = (id) => {
    setTarefas((prevTarefas) =>
      prevTarefas.filter((tarefa) => tarefa.id !== id)
    );
  };
  // função para marcar tarefa como concluída
  const handleToggle = (id) => {
    setTarefas((prevTarefas) =>
      prevTarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      )
    );
  };
  return (
    <main className=" w-[400px] mx-auto bg-slate-700 p-4 rounded-md">
      <h1 className=" text-white text-center text-3xl my-3">
        Lista de Tarefas
      </h1>
      {/* formulario para adicionar tarefas */}
      <form className=" flex justify-between py-8" onSubmit={handlesubmit}>
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
      {/* Caso não haja tarefas */}
      {tarefas.length === 0 && (
        <p className="text-center text-white">Não há tarefas</p>
      )}
      {/* listando tarefas */}
      <ul className="flex flex-col py-2 my-2">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className="flex justify-between items-center bg-slate-200 py-2 px-2 my-2"
          >
            <div className="flex gap-2 items-center">
              {/* Checkbox para marcar tarefa como concluida */}
              <button
                className="border-none"
                onClick={() => handleToggle(tarefa.id)}
              >
                {tarefa.concluida ? (
                  <MdCheckBox />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank />
                )}
              </button>
              {/* Texto da tarefa */}
              <p className={tarefa.concluida ? "italic line-through" : ""}>
                {tarefa.nome}
              </p>
            </div>
            <div className="flex items-center">
              {/* Botão de excluir */}
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md"
                onClick={() => handleDelete(tarefa.id)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default TodoApp;
