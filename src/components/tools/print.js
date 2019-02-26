/**
 * 打印指定区域的元素
 * @param {String} selector 打印区域的根元素选择器
 */
function print (selector, cssFilePath) {
  if (!selector) {
    console.error('selector is required.')
    return
  }

  const newWindow = window.open('_blank')
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = `
    html,
    body {
      margin: 0;
      padding: 0;
      font-family: "Microsoft YaHei", "微软雅黑", "黑体", Arial, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", sans-serif !important;
    }

    table {
      border-collapse: collapse;
      border: 1px solid #e6e6e6;
      width: 100%;
    }

    table th,
    table td {
      border: 1px solid #e6e6e6;
      padding: 0
    }
    ${cssFilePath}
  `
  const html = document.querySelector(selector).outerHTML
  newWindow.document.write(style.outerHTML + html)
  newWindow.print()
  newWindow.close()
}

export default print
