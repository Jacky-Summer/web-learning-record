const root = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D',
    },
    right: {
      val: 'E',
    },
  },
  right: {
    val: 'C',
    right: {
      val: 'F',
    },
  },
}

// 先序遍历
const preOrder = (root) => {
  if (!root) {
    return
  }
  console.log('当前节点是', root.val)
  preOrder(root.left)

  preOrder(root.right)
}
preOrder(root) // A B D E C F
console.log('\r\n')

// 中序遍历
const inOrder = (root) => {
  if (!root) {
    return
  }
  inOrder(root.left)
  console.log('当前节点是', root.val)
  inOrder(root.right)
}
inOrder(root) // D B E A C F
console.log('\r\n')

// 后序遍历
const postOrder = (root) => {
  if (!root) {
    return
  }
  postOrder(root.left)
  postOrder(root.right)
  console.log('当前节点是', root.val)
}
postOrder(root) // D E B F C A
