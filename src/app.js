require('./css/style')
require('./scss/style')
require('./js/sample2')
require('chosen/chosen.jquery')
require('chosen/chosen.css')
require('bootstrap/dist/js/bootstrap.js')
require('bootstrap/dist/css/bootstrap.css')


let say = require('./js/sample1')
// let $ = require('jquery')



let config = {
  chosenOptions: {
    search_contains: true
  }
}



$(() => {
  $('#chosen-example').chosen(config.chosenOptions)



  $('#load-moment').click(e => {

    // webpack doesn't like es6 syntax
    // require(['moment'], Moment => {

    // this works
    require(['moment'], function(Moment) {
      say(Moment())
    })

    // console.log('asdf')

    // // this works
    // require.ensure(['moment'], function(require) {
    //   let Moment = require('moment')
    //   say(Moment())
    // })
  })
})