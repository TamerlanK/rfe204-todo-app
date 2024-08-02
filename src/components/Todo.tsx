import { useState } from "react"
import { TodoType } from "../types"
import { FaTrashAlt } from "react-icons/fa"

interface TodoProps {
  todo: TodoType
  onDelete: (id: number) => void
}

const Todo = ({ todo, onDelete }: TodoProps) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed)
  return (
    <div className="w-full flex justify-between items-center py-2">
      <div className={`text-xl text-neutral-600 ${isCompleted && "line-through text-emerald-600"}`}>{todo.text}</div>
      <div className="flex gap-x-3 justify-between items-center">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={(e) => setIsCompleted(e.target.checked)}
          className="size-4"
        />
        <button onClick={() => onDelete(todo.id)}>
          <FaTrashAlt className="size-4 text-rose-700" />
        </button>
      </div>
    </div>
  )
}

export default Todo
