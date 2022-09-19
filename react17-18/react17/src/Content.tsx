import { useEffect, useRef, useLayoutEffect } from 'react'

export default function Content() {
  const divRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    console.log('初始化ref', divRef.current?.textContent)

    return () => {
      // v17销毁异步，divRef.current 已经被重置为nulls
      console.log('销毁时ref', divRef.current, divRef.current?.textContent)
    }
  }, [])

  // 解决方案1
  // useLayoutEffect(() => {
  //   console.log('初始化ref', divRef.current?.textContent)

  //   return () => {
  //     // v16销毁异步，divRef.current 已经为undefined
  //     console.log('销毁时ref', divRef.current, divRef.current?.textContent)
  //   }
  // }, [])

  // 解决方案2
  // useEffect(() => {
  //   const divInstance = divRef.current
  //   console.log('初始化ref', divInstance?.textContent)

  //   return () => {
  //     // v16销毁异步，divRef.current 已经为undefined
  //     console.log('销毁时ref', divInstance, divInstance?.textContent)
  //   }
  // }, [])

  return <div ref={divRef}>Content</div>
}
