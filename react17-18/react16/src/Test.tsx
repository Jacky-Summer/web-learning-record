// v16 并不会检查 forwardRef 和 memo 组件的返回值，当返回undefined时不会报错
// import { memo } from 'react'
// const Test = (type?: 'button' | 'submit' | 'reset') => {
//   ;<button type={type}>test</button>
// }

// export default memo(Test)

export default () => null
