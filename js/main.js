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
    Blockly.mainWorkspace.clear();
    AnimatedObjects.createAnimatedObject();
    AnimatedObjects.ObjectsCollection[0].XML='<xml><block type="draw_move" inline="false" x="70" y="70"><title name="DIR">moveForward</title><value name="VALUE"><block type="math_number"><title name="NUM">75</title></block></value><next><block type="draw_move_circle" inline="false"><value name="VALUE"><block type="math_number"><title name="NUM">5</title></block></value><next><block type="draw_width" inline="false"><value name="WIDTH"><block type="math_number"><title name="NUM">1</title></block></value><next><block type="draw_colour" inline="false"><value name="COLOUR"><block type="colour_picker"><title name="COLOUR">#ff0000</title></block></value></block></next></block></next></block></next></block></xml>';
    BlocklyApps.loadBlocks(AnimatedObjects.ObjectsCollection[0].XML);
    AnimatedObjects.createAnimatedObject();
    $("#loadObject2").click(function(){
//        AnimatedObjects.createAnimatedObject();
//        BlocklyApps.loadBlocks(AnimatedObjects.ObjectsCollection[0].XML); 
        AnimatedObjects.ObjectsCollection[0].XML=(new XMLSerializer()).serializeToString(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
//        Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, AnimatedObjects.ObjectsCollection[1].XML);
        Blockly.mainWorkspace.clear();
        BlocklyApps.loadBlocks(AnimatedObjects.ObjectsCollection[1].XML);
    });
     $("#loadObject1").click(function(){
         AnimatedObjects.ObjectsCollection[1].XML=(new XMLSerializer()).serializeToString(Blockly.Xml.workspaceToDom(Blockly.mainWorkspace));
//         Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, AnimatedObjects.ObjectsCollection[0].XML);
         Blockly.mainWorkspace.clear();
        BlocklyApps.loadBlocks(AnimatedObjects.ObjectsCollection[0].XML);
    });
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
  var diffx = x-AnimatedObjects.x;
  var diffy = y-AnimatedObjects.y;

if(( diffx<20 && diffx>-20 )&&( diffy<20 && diffy>-20)){
    dx=-dx;
    dy=-dy; 
} 
x+=dx; 
y+=dy;

    if(AnimatedObjects.x>430) AnimatedObjects.x-=400;
    if(AnimatedObjects.x<0) AnimatedObjects.x+=400;
    if(AnimatedObjects.y<0) AnimatedObjects.y+=400;
    if(AnimatedObjects.y>430) AnimatedObjects.y-=400;
    
    document.getElementById('objectX').value=(AnimatedObjects.HEIGHT / 2)-AnimatedObjects.x;
    document.getElementById('objectY').value=(AnimatedObjects.WIDTH / 2) - AnimatedObjects.y;
}