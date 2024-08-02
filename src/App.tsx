import { useReducer, useState } from "react"
import { TodoType } from "./types"
import Todo from "./components/Todo"

export const initialTodos: TodoType[] = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Walk the dog", completed: false },
  { id: 3, text: "Complete project report", completed: false },
  { id: 4, text: "Call mom", completed: false },
  { id: 5, text: "Read a book", completed: false },
]

type State = {
  todos: TodoType[]
}

type Action =
  | { type: "addTodo"; payload: TodoType }
  | { type: "deleteTodo"; payload: { id: TodoType["id"] } }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "addTodo":
      return { ...state, todos: [...state.todos, action.payload] }
    case "deleteTodo":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }
    default:
      throw new Error("Invalid type of todo action")
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { todos: initialTodos })
  const [newTodoText, setNewTodoText] = useState("")

  const handleAddTodo = () => {
    if (newTodoText.trim() === "") return

    const newTodo: TodoType = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
    }

    dispatch({ type: "addTodo", payload: newTodo })
    setNewTodoText("")
  }

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: "deleteTodo", payload: { id } })
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-10 bg-slate-100">
      <main className="bg-white p-4 rounded-md max-w-screen-md w-full mx-auto">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-center text-2xl font-semibold">Todo App</h2>

          <div className="w-full flex justify-between items-center gap-x-3 pb-4 border-b">
            <input
              type="text"
              className="p-2 border w-full rounded-md focus:outline-none focus:border-slate-950"
              placeholder="New Todo"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
            />
            <button
              className="px-12 py-2 rounded-md bg-slate-900 text-white font-semibold transition-all duration-300 hover:bg-slate-950 active:scale-95"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>

          <div className="pt-4 divide-y-2">
            {state.todos.map((todo) => (
              <Todo key={todo.id} todo={todo} onDelete={handleDeleteTodo} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
