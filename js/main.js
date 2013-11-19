/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
var context;
var x=100;
var y=200;
var dx=5;
var dy=5;

var main = function (){
    
    context = document.getElementById('ball-display').getContext('2d');
    // Stroked triangle
    Blockly.bindEvent_(blockly, 'mousedown', null,BlocklyApps.generateCode);
    Blockly.bindEvent_(blockly, 'mouseup', null,BlocklyApps.generateCode);
    BlocklyApps.generateCode();
    setInterval(draw,10);
    
};

function draw()
{
    
  context.clearRect(0,0, 400,400);
  context.beginPath();
  context.fillStyle="#0000ff";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  context.arc(x,y,20,0,Math.PI*2,true);
  context.closePath();
  context.fill();
  // Boundary Logic
if( x<0 || x>400) dx=-dx; 
if( y<0 || y>400) dy=-dy; 
  // Boundary Logic
  var diffx = x-AnimatedObject.x;
  var diffy = y-AnimatedObject.y;

if(( diffx<20 && diffx>-20 )&&( diffy<20 && diffy>-20)){
    dx=-dx;
    dy=-dy; 
} 
x+=dx; 
y+=dy;

    if(AnimatedObject.x>430) AnimatedObject.x-=400;
    if(AnimatedObject.x<0) AnimatedObject.x+=400;
    if(AnimatedObject.y<0) AnimatedObject.y+=400;
    if(AnimatedObject.y>430) AnimatedObject.y-=400;
    
    document.getElementById('objectX').value=(AnimatedObject.HEIGHT / 2)-AnimatedObject.x;
    document.getElementById('objectY').value=(AnimatedObject.WIDTH / 2) - AnimatedObject.y;
}