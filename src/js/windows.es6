import 'jquery-ui.js'
// import 'jquery-ui.css'
// import '../css/jquery-ui'

function createMessageWindow() {
  let options = {
    windowId: 'message',
    content: getMessagingWindowContent(),
    width: '450px',
    height: '280px'
  }
  createWindow(options)
  // abc.handlerMessagingWindow()
}

function getMessagingWindowContent() {
  // let players = ['all', 'dave', 'elias', 'izzy', 'josh', 'nick'] // this should be more global
  let htmlString = ``

  htmlString += `<div id='window-content'></div>`


  // htmlString += `<ul id="tabs" class="nav nav-tabs" role="tablist">`
  // players.forEach(player => {
  //   htmlString += `
  //     <li role="presentation" class="tabs"><a id="tab-${player}" class='messaging-tab' data-player='${player}' href="#pane-${player}" aria-controls="pane-${player}" role="tab" data-toggle="tab">${player}</a></li>
  //   `
  // })
  // htmlString += `</ul>`


  // htmlString += `<div class="tab-content">`
  // players.forEach(player => {
  //   htmlString += `
  //   <div id="pane-${player}" class="tab-pane fade active" role="tabpanel">
  //     <div class='message-ul-wrapper'>
  //       <ul id='messages-from-${player}'></ul>
  //     </div>
  //     <div id='messaging-controls-${player}' class='messaging-controls'>
  //       <input id='messages-to-send-${player}' class='messages-to-send' data-player='${player}'>
  //       <button id='send-message-${player}' data-from='sdfg' data-to='${player}' class='btn btn-sm messages-send-button'>Send</button>
  //     </div>
  //   </div>`
  // })
  // htmlString += `</div>`

  return htmlString
}


function createWindow(options) {

  let divId = options.windowId + '-window'
  let divContent = options.windowId + '-window-content'

  if(!options.hasOwnProperty('width')) {
    options.width = '300px'
  }

  if(!options.hasOwnProperty('height')) {
    options.height = '485px'
  }

  let htmlString = ``

  // create the window html
  htmlString += `
  <div id='${divId}' class='window' style='width:${options.width}; height:${options.height}; top:${options.locationY}; left:${options.locationX}'>
    <div id='window-close-${divId}' class='window-close-button'><i class='glyphicon glyphicon-remove'></i></div><br>
    <span id='${divContent}'>
      ${options.content}
    </span>
  </div>`

  // add the window to the page
  $('#wrapper').append(htmlString)

  // make the window draggable and resizable
  $(`#${divId}`).draggable().resizable()

  // enable the close functionality
  $(`#window-close-${divId}`).click(e => {
    $(`#${divId}`).remove()
    if(options.closeCallback) options.closeCallback()
  })
}

export {createMessageWindow, createWindow}