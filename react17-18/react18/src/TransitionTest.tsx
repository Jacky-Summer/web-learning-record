/**
 * Transition例子：https://react-fractals-git-react-18-swizec.vercel.app/
 */

import { useState, useTransition } from 'react'

function TransitionTest() {
  const [isPending, startTransition] = useTransition()
  const [count, setCount] = useState(0)

  function handleClick() {
    startTransition(() => {
      setCount((c) => c + 1)
    })
  }

  return (
    <div>
      {isPending && <div>loading...</div>}
      <button onClick={handleClick}>{count}</button>
    </div>
  )
}

export default TransitionTest
