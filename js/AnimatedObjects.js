/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



'use strict';

/**
 * Create a namespace for the application.
 */
var AnimatedObjects = {};



// Multiple Animated objects
AnimatedObjects.ObjectsCollection=[];

//DEFINITION OF AnimatedObjectClass
function AnimatedObjectClass () {
    this.id=0;
    this.img="media/planet.png";
    this.XML=
            '<xml>' +
      '  <block type="draw_move" x="70" y="70">' +
      '    <value name="VALUE">' +
      '      <block type="math_number">' +
      '        <title name="NUM">75</title>' +
      '      </block>' +
      '    </value>' +
      '  ' +
      '  <next><block type="draw_move">' +
      '    <value name="VALUE">' +
      '      <block type="math_number">' +
      '        <title name="NUM">55</title>' +
      '      </block>' +
      '    </value>' +
      '  </block></next></block>' +
      '</xml>';
//      this.ctxDisplay = document.getElementById('display'+this.id).getContext('2d');
      this.setId=function(Id){
          this.id=Id;
      };
      this.init=function(id){
          this.setId(id);
          var canvasHTML='<canvas id="display'+this.id+'" width="400" height="400" style="position:absolute"></canvas>';
          $("#visualization").prepend(canvasHTML);
          this.ctxDisplay = document.getElementById('display'+this.id).getContext('2d');
          AnimatedObjects.ctxDisplay=this.ctxDisplay;
          var img=document.getElementById("planetimg");
          this.ctxDisplay.drawImage(img,185,185);
          
      };
};

AnimatedObjects.createAnimatedObject=function(){
    var newAnimatedObject= new AnimatedObjectClass();
    newAnimatedObject.init(this.ObjectsCollection.length);
    this.ObjectsCollection.push(newAnimatedObject);
};




// Supported languages.
BlocklyApps.LANGUAGES = ['en', 'fr'];
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="template/generated/' +
               BlocklyApps.LANG + '.js"></script>\n');

AnimatedObjects.HEIGHT = 400;
AnimatedObjects.WIDTH = 400;

/**
 * PID of animation task currently executing.
 */
AnimatedObjects.pid = 0;

/**
 * Should the turtle be drawn?
 */
AnimatedObjects.visible = true;

/**
 * Initialize Blockly and the turtle.  Called on page load.
 */
AnimatedObjects.init = function() {
  BlocklyApps.init();

  var rtl = BlocklyApps.isRtl();
  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('blockly'),
      {path: '',
       rtl: rtl,
       toolbox: toolbox,
       trashcan: true});
   

  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  BlocklyApps.checkTimeout(%1);\n';

  // Add to reserved word list: API, local variables in execution evironment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('AnimatedObjects,code');

  window.addEventListener('beforeunload', function(e) {
    if (Blockly.mainWorkspace.getAllBlocks().length > 2) {
      e.returnValue = BlocklyApps.getMsg('AnimatedObjects_unloadWarning');  // Gecko.
      return BlocklyApps.getMsg('AnimatedObjects_unloadWarning');  // Webkit.
    }
    return null;
  });
  var blocklyDiv = document.getElementById('blockly');
  var visualization = document.getElementById('visualization');
  var onresize = function(e) {
    var top = visualization.offsetTop;
    blocklyDiv.style.top = Math.max(10, top - window.scrollY) + 'px';
    blocklyDiv.style.left = rtl ? '10px' : '420px';
    blocklyDiv.style.width = (window.innerWidth - 440) + 'px';
  };
  window.addEventListener('scroll', function() {
      onresize();
      Blockly.fireUiEvent(window, 'resize');
    });
  window.addEventListener('resize', onresize);
  onresize();
  Blockly.fireUiEvent(window, 'resize');

  // Hide download button if browser lacks support
  // (http://caniuse.com/#feat=download).
  if (!(goog.userAgent.GECKO ||
       (goog.userAgent.WEBKIT && !goog.userAgent.SAFARI))) {
    document.getElementById('captureButton').className = 'disabled';
  } else {
    BlocklyApps.bindClick('captureButton', AnimatedObjects.createImageLink);
  }

  // Initialize the slider.
  var sliderSvg = document.getElementById('slider');
  AnimatedObjects.speedSlider = new Slider(10, 35, 130, sliderSvg);
  AnimatedObjects.speedSlider.value_=1;

  var defaultXml =
      '<xml>' +
      '  <block type="draw_move" x="70" y="70">' +
      '    <value name="VALUE">' +
      '      <block type="math_number">' +
      '        <title name="NUM">75</title>' +
      '      </block>' +
      '    </value>' +
      '  ' +
      '  <next><block type="draw_move_circle">' +
      '    <value name="VALUE">' +
      '      <block type="math_number">' +
      '        <title name="NUM">5</title>' +
      '      </block>' +
      '    </value>' +
      '  </block></next></block>' +
      '</xml>';
  BlocklyApps.loadBlocks(defaultXml);

  AnimatedObjects.ctxDisplay = document.getElementById('display').getContext('2d');
  AnimatedObjects.ctxScratch = document.getElementById('scratch').getContext('2d');
  AnimatedObjects.reset();

  BlocklyApps.bindClick('runButton', AnimatedObjects.runButtonClick);
  BlocklyApps.bindClick('resetButton', AnimatedObjects.resetButtonClick);

  // Lazy-load the syntax-highlighting.
  window.setTimeout(BlocklyApps.importPrettify, 1);
};

window.addEventListener('load', AnimatedObjects.init);

/**
 * Reset the turtle to the start position, clear the display, and kill any
 * pending tasks.
 */
AnimatedObjects.reset = function() {
  // Starting location and heading of the turtle.
//  AnimatedObjects.x = AnimatedObjects.HEIGHT / 2;
//  AnimatedObjects.y = AnimatedObjects.WIDTH / 2;
  AnimatedObjects.UpdateX();
  AnimatedObjects.UpdateY();
  AnimatedObjects.heading = 0;
  AnimatedObjects.penDownValue = true;
  AnimatedObjects.visible = true;

  // Clear the display.
  AnimatedObjects.ctxScratch.canvas.width = AnimatedObjects.ctxScratch.canvas.width;
  AnimatedObjects.ctxScratch.strokeStyle = '#000000';
  AnimatedObjects.ctxScratch.fillStyle = '#000000';
  AnimatedObjects.ctxScratch.lineWidth = 1;
  AnimatedObjects.ctxScratch.lineCap = 'round';
  AnimatedObjects.ctxScratch.font = 'normal 18pt Arial';
  AnimatedObjects.display();

  // Kill any task.
  if (AnimatedObjects.pid) {
    window.clearTimeout(AnimatedObjects.pid);
  }
  AnimatedObjects.pid = 0;
};

/**
 * Copy the scratch canvas to the display canvas. Add a turtle marker.
 */
AnimatedObjects.display = function() {
  AnimatedObjects.ctxDisplay.globalCompositeOperation = 'copy';
  AnimatedObjects.ctxDisplay.drawImage(AnimatedObjects.ctxScratch.canvas, 0, 0);
  AnimatedObjects.ctxDisplay.globalCompositeOperation = 'source-over';
  
   
  // Draw the turtle.
  if (AnimatedObjects.visible) {
    // Make the turtle the colour of the pen.
    AnimatedObjects.ctxDisplay.strokeStyle = AnimatedObjects.ctxScratch.strokeStyle;
    AnimatedObjects.ctxDisplay.fillStyle = AnimatedObjects.ctxScratch.fillStyle;

    // Draw the turtle body.
    var radius = AnimatedObjects.ctxScratch.lineWidth / 2 + 10;
    AnimatedObjects.ctxDisplay.beginPath();
    AnimatedObjects.ctxDisplay.arc(AnimatedObjects.x, AnimatedObjects.y, radius, 0, 2 * Math.PI, false);
    AnimatedObjects.ctxDisplay.lineWidth = 3;
    AnimatedObjects.ctxDisplay.stroke();

    // Draw the turtle head.
    var WIDTH = 0.3;
    var HEAD_TIP = 10;
    var ARROW_TIP = 4;
    var BEND = 6;
    var radians = 2 * Math.PI * AnimatedObjects.heading / 360;
    var tipX = AnimatedObjects.x + (radius + HEAD_TIP) * Math.sin(radians);
    var tipY = AnimatedObjects.y - (radius + HEAD_TIP) * Math.cos(radians);
    radians -= WIDTH;
    var leftX = AnimatedObjects.x + (radius + ARROW_TIP) * Math.sin(radians);
    var leftY = AnimatedObjects.y - (radius + ARROW_TIP) * Math.cos(radians);
    radians += WIDTH / 2;
    var leftControlX = AnimatedObjects.x + (radius + BEND) * Math.sin(radians);
    var leftControlY = AnimatedObjects.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH;
    var rightControlX = AnimatedObjects.x + (radius + BEND) * Math.sin(radians);
    var rightControlY = AnimatedObjects.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH / 2;
    var rightX = AnimatedObjects.x + (radius + ARROW_TIP) * Math.sin(radians);
    var rightY = AnimatedObjects.y - (radius + ARROW_TIP) * Math.cos(radians);
    AnimatedObjects.ctxDisplay.beginPath();
    AnimatedObjects.ctxDisplay.moveTo(tipX, tipY);
    AnimatedObjects.ctxDisplay.lineTo(leftX, leftY);
    AnimatedObjects.ctxDisplay.bezierCurveTo(leftControlX, leftControlY,
        rightControlX, rightControlY, rightX, rightY);
    AnimatedObjects.ctxDisplay.closePath();
    AnimatedObjects.ctxDisplay.fill();
  }
};

/**
 * Click the run button.  Start the program.
 */
AnimatedObjects.runButtonClick = function() {
  var runButton = document.getElementById('runButton');
  var resetButton = document.getElementById('resetButton');
  // Ensure that Reset button is at least as wide as Run button.
  if (!resetButton.style.minWidth) {
    resetButton.style.minWidth = runButton.offsetWidth + 'px';
  }
  runButton.style.display = 'none';
  resetButton.style.display = 'inline';
  document.getElementById('spinner').style.visibility = 'visible';
  Blockly.mainWorkspace.traceOn(true);
  AnimatedObjects.execute();
  
};

/**
 * Click the reset button.  Reset the AnimatedObjects.
 */
AnimatedObjects.resetButtonClick = function() {
  document.getElementById('runButton').style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  document.getElementById('spinner').style.visibility = 'hidden';
  Blockly.mainWorkspace.traceOn(false);
  AnimatedObjects.reset();
};


/**
 * Execute the user's code.  Heaven help us...
 */
AnimatedObjects.execute = function() {
  BlocklyApps.log = [];
  BlocklyApps.ticks = 1000000;

  var code = Blockly.JavaScript.workspaceToCode();
  try {
    eval(code);
  } catch (e) {
    // Null is thrown for infinite loop.
    // Otherwise, abnormal termination is a user error.
    if (e !== Infinity) {
      alert(e);
    }
  }

  // BlocklyApps.log now contains a transcript of all the user's actions.
  // Reset the graphic and animate the transcript.
  AnimatedObjects.reset();
  AnimatedObjects.pid = window.setTimeout(AnimatedObjects.animate, 100);
};

/**
 * Iterate through the recorded path and animate the turtle's actions.
 */
AnimatedObjects.animate = function() {
  // All tasks should be complete now.  Clean up the PID list.
  AnimatedObjects.pid = 0;
 
  
  var tuple = BlocklyApps.log.shift();
  if (!tuple) {
    document.getElementById('spinner').style.visibility = 'hidden';
    Blockly.mainWorkspace.highlightBlock(null);
    return;
  }
  var command = tuple.shift();
  BlocklyApps.highlight(tuple.pop());
  AnimatedObjects.step(command, tuple);
  AnimatedObjects.display();

  // Scale the speed non-linearly, to give better precision at the fast end.
  var stepSpeed = 1000 * Math.pow(1 - AnimatedObjects.speedSlider.getValue(), 2);
  AnimatedObjects.pid = window.setTimeout(AnimatedObjects.animate, stepSpeed);
};

/**
 * Execute one step.
 * @param {string} command Logo-style command (e.g. 'FD' or 'RT').
 * @param {!Array} values List of arguments for the command.
 */
AnimatedObjects.step = function(command, values) {
  switch (command) {
    case 'LN':  // Forward
      AnimatedObjects.heading = 45;
      if (AnimatedObjects.penDownValue) {
        AnimatedObjects.ctxScratch.beginPath();
        AnimatedObjects.ctxScratch.moveTo(AnimatedObjects.x, AnimatedObjects.y);
      }
      var a = values[0];
      var b = values[1];
      if (a) {
       for(var i=0;i<=10;i++){
           AnimatedObjects.x += i;
           AnimatedObjects.y -= a*i+b;
       }
        var bump = 0;
      } else {
        // WebKit (unlike Gecko) draws nothing for a zero-length line.
        var bump = 0.1;
      }
      if (AnimatedObjects.penDownValue) {
        AnimatedObjects.ctxScratch.lineTo(AnimatedObjects.x + bump, AnimatedObjects.y + bump);
        AnimatedObjects.ctxScratch.stroke();
      }
      break;
    case 'DIAG':  // Forward
      AnimatedObjects.heading = 45;
      if (AnimatedObjects.penDownValue) {
        AnimatedObjects.ctxScratch.beginPath();
        AnimatedObjects.ctxScratch.moveTo(AnimatedObjects.x, AnimatedObjects.y);
      }
      var distance = values[0];
      if (distance) {
        AnimatedObjects.x += distance;
        AnimatedObjects.y -= distance;
        var bump = 0;
      } else {
        // WebKit (unlike Gecko) draws nothing for a zero-length line.
        var bump = 0.1;
      }
      if (AnimatedObjects.penDownValue) {
        AnimatedObjects.ctxScratch.lineTo(AnimatedObjects.x + bump, AnimatedObjects.y + bump);
        AnimatedObjects.ctxScratch.stroke();
      }
      break;
    case 'FD':  // Forward
      if (AnimatedObjects.penDownValue) {
        AnimatedObjects.ctxScratch.beginPath();
        AnimatedObjects.ctxScratch.moveTo(AnimatedObjects.x, AnimatedObjects.y);
      }
      var distance = values[0];
      if (distance) {
        AnimatedObjects.x += distance * Math.sin(2 * Math.PI * AnimatedObjects.heading / 360);
        AnimatedObjects.y -= distance * Math.cos(2 * Math.PI * AnimatedObjects.heading / 360);
        var bump = 0;
      } else {
        // WebKit (unlike Gecko) draws nothing for a zero-length line.
        var bump = 0.1;
      }
      if (AnimatedObjects.penDownValue) {
        AnimatedObjects.ctxScratch.lineTo(AnimatedObjects.x, AnimatedObjects.y + bump);
        AnimatedObjects.ctxScratch.stroke();
      }
      break;
    case 'RT':  // Right Turn
      AnimatedObjects.heading += values[0];
      AnimatedObjects.heading %= 360;
      if (AnimatedObjects.heading < 0) {
        AnimatedObjects.heading += 360;
      }
      break;
    case 'DP':  // Draw Print
      AnimatedObjects.ctxScratch.save();
      AnimatedObjects.ctxScratch.translate(AnimatedObjects.x, AnimatedObjects.y);
      AnimatedObjects.ctxScratch.rotate(2 * Math.PI * (AnimatedObjects.heading - 90) / 360);
      AnimatedObjects.ctxScratch.fillText(values[0], 0, 0);
      AnimatedObjects.ctxScratch.restore();
      break;
    case 'DF':  // Draw Font
      AnimatedObjects.ctxScratch.font = values[2] + ' ' + values[1] + 'pt ' + values[0];
      break;
    case 'PU':  // Pen Up
      AnimatedObjects.penDownValue = false;
      break;
    case 'PD':  // Pen Down
      AnimatedObjects.penDownValue = true;
      break;
    case 'PW':  // Pen Width
      AnimatedObjects.ctxScratch.lineWidth = values[0];
      break;
    case 'PC':  // Pen Colour
      AnimatedObjects.ctxScratch.strokeStyle = values[0];
      AnimatedObjects.ctxScratch.fillStyle = values[0];
      break;
    case 'HT':  // Hide AnimatedObjects
      AnimatedObjects.visible = false;
      break;
    case 'ST':  // Show AnimatedObjects
      AnimatedObjects.visible = true;
      break;
  }
};

/**
 * Save an image of the SVG canvas.
 */
AnimatedObjects.createImageLink = function() {
  var imgLink = document.getElementById('downloadImageLink');
  imgLink.setAttribute('href',
      document.getElementById('display').toDataURL('image/png'));
  var temp = window.onbeforeunload;
  window.onbeforeunload = null;
  imgLink.click();
  window.onbeforeunload = temp;
};

// AnimatedObjects API.

AnimatedObjects.moveForward = function(distance, id) {
  BlocklyApps.log.push(['FD', distance, id]);
};

AnimatedObjects.moveDiag = function(distance, id) {
  BlocklyApps.log.push(['DIAG', distance, id]);
};

AnimatedObjects.moveLinear = function(a,b, id) {
  BlocklyApps.log.push(['LN', a,b, id]);
};

AnimatedObjects.moveCircle = function(distance, id) {
  for(var i=0;i<=50;i++){
      BlocklyApps.log.push(['RT', distance, id]);
      BlocklyApps.log.push(['FD', distance, id]);
  }
};

AnimatedObjects.moveBackward = function(distance, id) {
  BlocklyApps.log.push(['FD', -distance, id]);
};

AnimatedObjects.turnRight = function(angle, id) {
  BlocklyApps.log.push(['RT', angle, id]);
};

AnimatedObjects.turnLeft = function(angle, id) {
  BlocklyApps.log.push(['RT', -angle, id]);
};

AnimatedObjects.penUp = function(id) {
  BlocklyApps.log.push(['PU', id]);
};

AnimatedObjects.penDown = function(id) {
  BlocklyApps.log.push(['PD', id]);
};

AnimatedObjects.penWidth = function(width, id) {
  BlocklyApps.log.push(['PW', Math.max(width, 0), id]);
};

AnimatedObjects.penColour = function(colour, id) {
  BlocklyApps.log.push(['PC', colour, id]);
};

AnimatedObjects.hideAnimatedObjects = function(id) {
  BlocklyApps.log.push(['HT', id]);
};

AnimatedObjects.showAnimatedObjects = function(id) {
  BlocklyApps.log.push(['ST', id]);
};

AnimatedObjects.drawPrint = function(text, id) {
  BlocklyApps.log.push(['DP', text, id]);
};

AnimatedObjects.drawFont = function(font, size, style, id) {
  BlocklyApps.log.push(['DF', font, size, style, id]);
};

AnimatedObjects.UpdateX= function(){
    var newX=parseInt(document.getElementById('objectX').value);
    AnimatedObjects.x = (AnimatedObjects.HEIGHT / 2) - newX;
    AnimatedObjects.display();
};

AnimatedObjects.UpdateY= function(){
    var newY=parseInt(document.getElementById('objectY').value);
    AnimatedObjects.y = (AnimatedObjects.WIDTH / 2) - newY;
    AnimatedObjects.display();
};