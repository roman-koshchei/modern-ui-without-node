import { useState } from "react"

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button className="p-5 bg-red-300" onClick={() => setCount(count + 1)}>
      {count}
    </button>
  )
}
