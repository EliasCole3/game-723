'use strict'

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
}

function getMessagingWindowContent() {
  let htmlString = ``

  htmlString += `<div id='window-content'></div>`

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