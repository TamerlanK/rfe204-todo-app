import { FaTrashAlt } from "react-icons/fa"
import { TodoType } from "../types"

interface TodoProps {
  todo: TodoType
  onDelete: (id: TodoType["id"]) => void
  onToggle: (id: TodoType["id"]) => void
}

const Todo = ({ todo, onDelete, onToggle }: TodoProps) => {
  return (
    <div className="w-full flex justify-between items-center py-2">
      <label className="flex items-center gap-x-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="size-4"
        />
        <span
          className={`text-xl ${
            todo.completed
              ? "text-emerald-600 line-through"
              : "text-neutral-600"
          }`}
        >
          {todo.text}
        </span>
      </label>
      <div className="flex gap-x-3 justify-between items-center">
        <button onClick={() => onDelete(todo.id)}>
          <FaTrashAlt className="size-4 text-rose-700" />
        </button>
      </div>
    </div>
  )
}

export default Todo
