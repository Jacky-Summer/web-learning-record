import { useEffect, useRef } from 'react'

export default function Content() {
  const divRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    console.log('初始化ref', divRef.current?.textContent)

    return () => {
      // v16销毁同步，divRef.current 还在
      console.log('销毁时ref', divRef.current?.textContent)
    }
  }, [])

  return <div ref={divRef}>Content</div>
}
