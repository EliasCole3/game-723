import 'jquery-ui.js'
// import 'jquery-ui.css'
import '../css/jquery-ui'

function createMessageWindow() {
  let options = {
    windowId: 'message',
    content: getMessagingWindowContent(),
    width: '450px',
    height: '280px'
  }
  createWindow(options)
  // abc.handlerMessagingWindow()
  console.log('asdf')
}

function getMessagingWindowContent() {
  let players = ['all', 'dave', 'elias', 'izzy', 'josh', 'nick'] // this should be more global
  let htmlString = ``

  htmlString += `<ul id="tabs" class="nav nav-tabs" role="tablist">`
  players.forEach(player => {
    htmlString += `
      <li role="presentation" class="tabs"><a id="tab-${player}" class='messaging-tab' data-player='${player}' href="#pane-${player}" aria-controls="pane-${player}" role="tab" data-toggle="tab">${player}</a></li>
    `
  })
  htmlString += `</ul>`


  htmlString += `<div class="tab-content">`
  players.forEach(player => {
    htmlString += `
    <div id="pane-${player}" class="tab-pane fade active" role="tabpanel">
      <div class='message-ul-wrapper'>
        <ul id='messages-from-${player}'></ul>
      </div>
      <div id='messaging-controls-${player}' class='messaging-controls'>
        <input id='messages-to-send-${player}' class='messages-to-send' data-player='${player}'>
        <button id='send-message-${player}' data-from='sdfg' data-to='${player}' class='btn btn-sm messages-send-button'>Send</button>
      </div>
    </div>`
  })
  htmlString += `</div>`

  return htmlString
}


function createWindow(options) {

  options.windowId += '-window'

  if(!options.hasOwnProperty('width')) {
    options.width = '300px'
  }

  if(!options.hasOwnProperty('height')) {
    options.height = '485px'
  }

  let htmlString = ``

  // create the window html
  htmlString += `
  <div id='${options.windowId}' class='window' style='width:${options.width}; height:${options.height}'>
    <div id='window-close-${options.windowId}' class='window-close-button'><i class='glyphicon glyphicon-remove'></i></div><br>
    ${options.content}
  </div>`

  // add the window to the page
  $('#wrapper').append(htmlString)

  // make the window draggable and resizable
  $(`#${options.windowId}`).draggable().resizable()

  // enable the close functionality
  $(`#window-close-${options.windowId}`).click(e => {
    $(`#${options.windowId}`).remove()
    if(options.closeCallback) options.closeCallback()
  })
}

export {createMessageWindow}