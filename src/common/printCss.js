let cssObj = {
  oneA4: `
    #printDiv {
      width: 21cm;
      height: 29.7cm;
      border: 0.1cm solid red;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      overflow: hidden;
    }
    .logo {
      color: red;
      font-size: 1cm;
    }
    .con {
      page-break-inside: avoid;
      border: 0.1cm solid #000;
      transform-origin: center center;
    }
  `
}
export default cssObj
