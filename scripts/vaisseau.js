// OPTIONS
var maxplanetspeed = 10;
var minplanetspeed = 10;
var minplanetradius = 2;
var maxplanetradius = 6;
var gravity = .5;
var numplanets = 9;
var mainplanetradius = 20;
var maxtrail = 10;
var infinitetrail = false;


//FPS VARIABLES
var fps = 0, now, lastUpdate = (new Date)*1 - 1;
var fpsOut = document.getElementById('fps');
var last;
var t;

//CANVAS
var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = 400;
var context = canvas.getContext("2d");
var canvasW = canvas.width;
var canvasH = canvas.height;
var screencap = context.getImageData(0, 0, canvasW, canvasH);

var center = [window.innerWidth/2,200];
var interval;
var intervalfps = 1000/60;
var planets = [];

function Planet(x,y,s,radius)
{
  this.x = x;
  this.y = y;
  this.s = s;
  this.vx = Math.random() * s;
  this.vy = Math.random() * s;
  this.r = 0;
  this.g = 0;
  this.b = 0;
  this.a = 250;
  this.radius = radius;
  this.tochange = false;
  this.infront = true;
  this.trail = [];
}

function init(){
  planets = [];
  for(var i = 0; i < numplanets; i++)
  {
    var p = new Planet (Math.random() * canvasW, Math.random() * canvasH,minplanetspeed + Math.random() * (maxplanetspeed - minplanetspeed),minplanetradius + Math.random() * (maxplanetradius - minplanetradius));
    planets.push(p);
  }
}


var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

function intervalhandler(){

  var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);
  fps += (thisFrameFPS - fps) / intervalfps;
  lastUpdate = now;
  fpsOut.innerHTML = fps.toFixed(1) + "fps";

  context.putImageData(screencap, 0, 0);

  for(var i = 0; i < planets.length; i++)
  {
    var p = planets[i];
    for(var t = 0; t < p.trail.length; t++)
    {
      var tr = p.trail[t];
      var a;
      if(!infinitetrail) a = .8 - (t * 1/maxtrail);
      else a = 1;
      drawPlanet(tr[0],tr[1],tr[2],a);
    }
    drawPlanet(p.x,p.y,p.radius,1);
    var dx = center[0] - p.x;
    var dy = center[1] - p.y;
    var angle = Math.atan2(dx,dy);
    var dist = Math.sqrt(dx * dx + dy * dy);
    if(dist <= mainplanetradius + p.radius && !p.tochange)
    {
      p.tochange = true;
    }
    else if(dist > mainplanetradius && p.tochange)
    {
      tochange = false;
      p.infront ^= true;
    }
    var movex = dx / dist;
    var movey = dy / dist;
    p.vx += movex * gravity;
    p.vy += movey * gravity;
    if(Math.sqrt(p.vx * p.vx + p.vy * p.vy) > p.s)
    {
      var ratio = p.s/Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      p.vx *= ratio;
      p.vy *= ratio;
    }
    p.x += p.vx;
    p.y += p.vy;
    p.lastvx = p.vx;
    if((p.trail.length < maxtrail) || infinitetrail)
    {
      p.trail.unshift([p.x,p.y,1.5]);
    }
    else
    {
      if(p.trail.length > maxtrail + 1) p.trail = [];
      else p.trail.pop();
    }
  }

  drawPlanet(center[0],center[1],mainplanetradius,1);
  requestAnimationFrame(intervalhandler);
}

function drawPlanet(x,y,radius,alpha) {
    if (x >= 0 && x < canvasW && y >= 0 && y < canvasH)
    {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(0,0,0,' + alpha + ')';
        context.fill();
    }
}

canvas.onclick = function(e){
  center[0] = e.clientX;
  center[1] = e.clientY;
}

requestAnimationFrame(intervalhandler);
init();

var gui = new dat.GUI();
gui.close();
gui.add(window, "mainplanetradius", 5,50).step(1.0);
gui.add(window, "numplanets",1, 100).step(1.0).onChange(function(){ init(); });
gui.add(window, "gravity",0,1).step(.01);
gui.add(window, "maxtrail",0,1000).step(1);
gui.add(window, "infinitetrail").onChange(function(val){ infinitetrail = val;});
