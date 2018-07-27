
let propulsion = document.querySelector(".bloc1")
let countdown = document.querySelector(".countdown")
let rocket = document.querySelector(".rocket")
let  number = 10

propulsion.addEventListener(
  'click',
  function(){
    setInterval(decollage, 1000);
  }, false);

  function decollage() {
    if(number > 0){
      countdown.innerHTML = (number -=1)
    } else {
      rocket.style.transform = "translateY(-15000px)"
      rocket.style.transition = "all 10s ease-in"
    }
  }



//  let interrogation = document.querySelector(".absolute img")
//  let bonus = document.querySelector(".absolute p")
//  let isActive = 0


// interrogation button

//  interrogation.addEventListener(
//      "click"
  //function(){
    //if (isActive ==  0){
      //bonus.style.display = "block"
    //  isActive = 1
    //} else  {
      //  bonus.style.display = "none"
      //  isActive = 0
  //  }
//  }
//)



//slider

//let bigImg = document.querySelector('.primarySlide img')
//let title = document.querySelector('.primarySlide h2')
//let thumbnail =  document.querySelectorAll('.slides img')

//for (let i= 0; i < thumbnail.length; i++) {
//  thumbnail[i].addEventListener(
  //  'click',
  //  function() {
    //  let altTxt = this.getAttribute('alt')
    //  let srcBigImg = this.getAttribute('data-srcBigImg')
    //   bigImg.setAttribute('alt', altTxt)
  //    bigImg.setAttribute('src',srcBigImg)
    //  title.innerHTML = altTxt
    //}
//  )
//}

//let sat = document.querySelector('.sat')
let minisat = document.querySelector('.minisat')

minisat.addEventListener(
  'click',
  function() {
  rocket.setAttribute('src', 'images/satellite.png')
  }
)


let minirocket = document.querySelector('.minirocket')

minirocket.addEventListener(
  'click',
  function() {
  rocket.setAttribute('src', 'images/rocket.png')
  }
)
//

var myObject = {
    reactorBoot: 0,
  powerRate: '0%'
}
var JSobjectProp = anime ({
  targets: myObject,
  reactorBoot: 50,
  powerRate: '100%',
  eas: 'linear ',
  round: 1,
  update: function() {
    var el = document.querySelector('#JSobjectProp pre');
    el.innerHTML = JSON.stringify(myObject);
  }
});
