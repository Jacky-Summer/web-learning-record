// v17中 forwardRef 和 memo 组件的行为会与常规组件保持一致，在返回 undefined 时会报错
// import { memo } from 'react'
// const Test = (type?: 'button' | 'submit' | 'reset') => {
//   ;<button type={type}>test</button>
// }

// export default memo(Test)

export default () => null
