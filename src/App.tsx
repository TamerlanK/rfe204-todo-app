import { useEffect, useReducer, useState } from "react"
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
  | { type: "setTodos"; payload: TodoType[] }
  | { type: "toggleTodo"; payload: { id: TodoType["id"] } }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "addTodo":
      return { ...state, todos: [...state.todos, action.payload] }
    case "deleteTodo":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }
    case "toggleTodo":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      }
    case "setTodos":
      return { ...state, todos: action.payload }

    default:
      throw new Error("Invalid type of todo action")
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { todos: initialTodos })
  const [newTodoText, setNewTodoText] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos")
    if (savedTodos) {
      dispatch({ type: "setTodos", payload: JSON.parse(savedTodos) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos))
  }, [state.todos])

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newTodoText.trim() === "") {
      setError("Input field is empty")
      return
    }

    const newTodo: TodoType = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
    }

    dispatch({ type: "addTodo", payload: newTodo })
    setNewTodoText("")
  }

  const handleDeleteTodo = (id: TodoType["id"]) => {
    dispatch({ type: "deleteTodo", payload: { id } })
  }

  const handleToggleTodo = (id: TodoType["id"]) => {
    dispatch({ type: "toggleTodo", payload: { id } })
  }

  const completedTodosCount = state.todos.filter(
    (todo) => todo.completed
  ).length

  return (
    <div className="min-h-screen flex justify-center items-center p-10 bg-slate-100">
      <main className="bg-white p-4 rounded-md max-w-screen-md w-full mx-auto">
        <div className="flex flex-col gap-y-3">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-center text-2xl font-semibold">Todo App</h2>
            <span className="text-neutral-600">
              {completedTodosCount} / {state.todos.length} completed
            </span>
          </div>

          <form
            onSubmit={handleAddTodo}
            className="w-full flex justify-between items-center gap-x-3"
          >
            <input
              type="text"
              className="p-2 border w-full rounded-md focus:outline-none focus:border-slate-950"
              placeholder="New Todo"
              value={newTodoText}
              onChange={(e) => {
                setNewTodoText(e.target.value)
                setError("")
              }}
            />
            <button
              className="px-12 py-2 rounded-md bg-slate-900 text-white font-semibold transition-all duration-300 hover:bg-slate-950 active:scale-95"
              type="submit"
            >
              Add
            </button>
          </form>
          {error && (
            <div className="p-1.5 rounded-md bg-[#feccec] text-[#d6236a]">
              {error}
            </div>
          )}

          <div className="divide-y-2">
            {state.todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                onDelete={handleDeleteTodo}
                onToggle={handleToggleTodo}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
