module.exports = function(value) {
  let div = document.createElement('div')
  div.setAttribute('class', 'someClass')
  div.innerHTML = 'Current epoch time: ' + value
  document.getElementById('message').appendChild(div)
}