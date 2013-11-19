
'use strict';

/**
 * Create a namespace for the application.
 */
var AnimatedObject = {};

// Supported languages.
BlocklyApps.LANGUAGES = ['en', 'fr'];
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="template/generated/' +
               BlocklyApps.LANG + '.js"></script>\n');

AnimatedObject.HEIGHT = 400;
AnimatedObject.WIDTH = 400;

/**
 * PID of animation task currently executing.
 */
AnimatedObject.pid = 0;

/**
 * Should the turtle be drawn?
 */
AnimatedObject.visible = true;

/**
 * Initialize Blockly and the turtle.  Called on page load.
 */
AnimatedObject.init = function() {
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
  Blockly.JavaScript.addReservedWords('AnimatedObject,code');

  window.addEventListener('beforeunload', function(e) {
    if (Blockly.mainWorkspace.getAllBlocks().length > 2) {
      e.returnValue = BlocklyApps.getMsg('AnimatedObject_unloadWarning');  // Gecko.
      return BlocklyApps.getMsg('AnimatedObject_unloadWarning');  // Webkit.
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
    BlocklyApps.bindClick('captureButton', AnimatedObject.createImageLink);
  }

  // Initialize the slider.
  var sliderSvg = document.getElementById('slider');
  AnimatedObject.speedSlider = new Slider(10, 35, 130, sliderSvg);
  AnimatedObject.speedSlider.value_=1;

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

  AnimatedObject.ctxDisplay = document.getElementById('display').getContext('2d');
  AnimatedObject.ctxScratch = document.getElementById('scratch').getContext('2d');
  AnimatedObject.reset();

  BlocklyApps.bindClick('runButton', AnimatedObject.runButtonClick);
  BlocklyApps.bindClick('resetButton', AnimatedObject.resetButtonClick);

  // Lazy-load the syntax-highlighting.
  window.setTimeout(BlocklyApps.importPrettify, 1);
};

window.addEventListener('load', AnimatedObject.init);

/**
 * Reset the turtle to the start position, clear the display, and kill any
 * pending tasks.
 */
AnimatedObject.reset = function() {
  // Starting location and heading of the turtle.
//  AnimatedObject.x = AnimatedObject.HEIGHT / 2;
//  AnimatedObject.y = AnimatedObject.WIDTH / 2;
  AnimatedObject.UpdateX();
  AnimatedObject.UpdateY();
  AnimatedObject.heading = 0;
  AnimatedObject.penDownValue = true;
  AnimatedObject.visible = true;

  // Clear the display.
  AnimatedObject.ctxScratch.canvas.width = AnimatedObject.ctxScratch.canvas.width;
  AnimatedObject.ctxScratch.strokeStyle = '#000000';
  AnimatedObject.ctxScratch.fillStyle = '#000000';
  AnimatedObject.ctxScratch.lineWidth = 1;
  AnimatedObject.ctxScratch.lineCap = 'round';
  AnimatedObject.ctxScratch.font = 'normal 18pt Arial';
  AnimatedObject.display();

  // Kill any task.
  if (AnimatedObject.pid) {
    window.clearTimeout(AnimatedObject.pid);
  }
  AnimatedObject.pid = 0;
};

/**
 * Copy the scratch canvas to the display canvas. Add a turtle marker.
 */
AnimatedObject.display = function() {
  AnimatedObject.ctxDisplay.globalCompositeOperation = 'copy';
  AnimatedObject.ctxDisplay.drawImage(AnimatedObject.ctxScratch.canvas, 0, 0);
  AnimatedObject.ctxDisplay.globalCompositeOperation = 'source-over';
  
   
  // Draw the turtle.
  if (AnimatedObject.visible) {
    // Make the turtle the colour of the pen.
    AnimatedObject.ctxDisplay.strokeStyle = AnimatedObject.ctxScratch.strokeStyle;
    AnimatedObject.ctxDisplay.fillStyle = AnimatedObject.ctxScratch.fillStyle;

    // Draw the turtle body.
    var radius = AnimatedObject.ctxScratch.lineWidth / 2 + 10;
    AnimatedObject.ctxDisplay.beginPath();
    AnimatedObject.ctxDisplay.arc(AnimatedObject.x, AnimatedObject.y, radius, 0, 2 * Math.PI, false);
    AnimatedObject.ctxDisplay.lineWidth = 3;
    AnimatedObject.ctxDisplay.stroke();

    // Draw the turtle head.
    var WIDTH = 0.3;
    var HEAD_TIP = 10;
    var ARROW_TIP = 4;
    var BEND = 6;
    var radians = 2 * Math.PI * AnimatedObject.heading / 360;
    var tipX = AnimatedObject.x + (radius + HEAD_TIP) * Math.sin(radians);
    var tipY = AnimatedObject.y - (radius + HEAD_TIP) * Math.cos(radians);
    radians -= WIDTH;
    var leftX = AnimatedObject.x + (radius + ARROW_TIP) * Math.sin(radians);
    var leftY = AnimatedObject.y - (radius + ARROW_TIP) * Math.cos(radians);
    radians += WIDTH / 2;
    var leftControlX = AnimatedObject.x + (radius + BEND) * Math.sin(radians);
    var leftControlY = AnimatedObject.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH;
    var rightControlX = AnimatedObject.x + (radius + BEND) * Math.sin(radians);
    var rightControlY = AnimatedObject.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH / 2;
    var rightX = AnimatedObject.x + (radius + ARROW_TIP) * Math.sin(radians);
    var rightY = AnimatedObject.y - (radius + ARROW_TIP) * Math.cos(radians);
    AnimatedObject.ctxDisplay.beginPath();
    AnimatedObject.ctxDisplay.moveTo(tipX, tipY);
    AnimatedObject.ctxDisplay.lineTo(leftX, leftY);
    AnimatedObject.ctxDisplay.bezierCurveTo(leftControlX, leftControlY,
        rightControlX, rightControlY, rightX, rightY);
    AnimatedObject.ctxDisplay.closePath();
    AnimatedObject.ctxDisplay.fill();
  }
};

/**
 * Click the run button.  Start the program.
 */
AnimatedObject.runButtonClick = function() {
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
  AnimatedObject.execute();
  
};

/**
 * Click the reset button.  Reset the AnimatedObject.
 */
AnimatedObject.resetButtonClick = function() {
  document.getElementById('runButton').style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  document.getElementById('spinner').style.visibility = 'hidden';
  Blockly.mainWorkspace.traceOn(false);
  AnimatedObject.reset();
};


/**
 * Execute the user's code.  Heaven help us...
 */
AnimatedObject.execute = function() {
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
  AnimatedObject.reset();
  AnimatedObject.pid = window.setTimeout(AnimatedObject.animate, 100);
};

/**
 * Iterate through the recorded path and animate the turtle's actions.
 */
AnimatedObject.animate = function() {
  // All tasks should be complete now.  Clean up the PID list.
  AnimatedObject.pid = 0;
 
  
  var tuple = BlocklyApps.log.shift();
  if (!tuple) {
    document.getElementById('spinner').style.visibility = 'hidden';
    Blockly.mainWorkspace.highlightBlock(null);
    return;
  }
  var command = tuple.shift();
  BlocklyApps.highlight(tuple.pop());
  AnimatedObject.step(command, tuple);
  AnimatedObject.display();

  // Scale the speed non-linearly, to give better precision at the fast end.
  var stepSpeed = 1000 * Math.pow(1 - AnimatedObject.speedSlider.getValue(), 2);
  AnimatedObject.pid = window.setTimeout(AnimatedObject.animate, stepSpeed);
};

/**
 * Execute one step.
 * @param {string} command Logo-style command (e.g. 'FD' or 'RT').
 * @param {!Array} values List of arguments for the command.
 */
AnimatedObject.step = function(command, values) {
  switch (command) {
    case 'LN':  // Forward
      AnimatedObject.heading = 45;
      if (AnimatedObject.penDownValue) {
        AnimatedObject.ctxScratch.beginPath();
        AnimatedObject.ctxScratch.moveTo(AnimatedObject.x, AnimatedObject.y);
      }
      var a = values[0];
      var b = values[1];
      if (a) {
       for(var i=0;i<=10;i++){
           AnimatedObject.x += i;
           AnimatedObject.y -= a*i+b;
       }
        var bump = 0;
      } else {
        // WebKit (unlike Gecko) draws nothing for a zero-length line.
        var bump = 0.1;
      }
      if (AnimatedObject.penDownValue) {
        AnimatedObject.ctxScratch.lineTo(AnimatedObject.x + bump, AnimatedObject.y + bump);
        AnimatedObject.ctxScratch.stroke();
      }
      break;
    case 'DIAG':  // Forward
      AnimatedObject.heading = 45;
      if (AnimatedObject.penDownValue) {
        AnimatedObject.ctxScratch.beginPath();
        AnimatedObject.ctxScratch.moveTo(AnimatedObject.x, AnimatedObject.y);
      }
      var distance = values[0];
      if (distance) {
        AnimatedObject.x += distance;
        AnimatedObject.y -= distance;
        var bump = 0;
      } else {
        // WebKit (unlike Gecko) draws nothing for a zero-length line.
        var bump = 0.1;
      }
      if (AnimatedObject.penDownValue) {
        AnimatedObject.ctxScratch.lineTo(AnimatedObject.x + bump, AnimatedObject.y + bump);
        AnimatedObject.ctxScratch.stroke();
      }
      break;
    case 'FD':  // Forward
      if (AnimatedObject.penDownValue) {
        AnimatedObject.ctxScratch.beginPath();
        AnimatedObject.ctxScratch.moveTo(AnimatedObject.x, AnimatedObject.y);
      }
      var distance = values[0];
      if (distance) {
        AnimatedObject.x += distance * Math.sin(2 * Math.PI * AnimatedObject.heading / 360);
        AnimatedObject.y -= distance * Math.cos(2 * Math.PI * AnimatedObject.heading / 360);
        var bump = 0;
      } else {
        // WebKit (unlike Gecko) draws nothing for a zero-length line.
        var bump = 0.1;
      }
      if (AnimatedObject.penDownValue) {
        AnimatedObject.ctxScratch.lineTo(AnimatedObject.x, AnimatedObject.y + bump);
        AnimatedObject.ctxScratch.stroke();
      }
      break;
    case 'RT':  // Right Turn
      AnimatedObject.heading += values[0];
      AnimatedObject.heading %= 360;
      if (AnimatedObject.heading < 0) {
        AnimatedObject.heading += 360;
      }
      break;
    case 'DP':  // Draw Print
      AnimatedObject.ctxScratch.save();
      AnimatedObject.ctxScratch.translate(AnimatedObject.x, AnimatedObject.y);
      AnimatedObject.ctxScratch.rotate(2 * Math.PI * (AnimatedObject.heading - 90) / 360);
      AnimatedObject.ctxScratch.fillText(values[0], 0, 0);
      AnimatedObject.ctxScratch.restore();
      break;
    case 'DF':  // Draw Font
      AnimatedObject.ctxScratch.font = values[2] + ' ' + values[1] + 'pt ' + values[0];
      break;
    case 'PU':  // Pen Up
      AnimatedObject.penDownValue = false;
      break;
    case 'PD':  // Pen Down
      AnimatedObject.penDownValue = true;
      break;
    case 'PW':  // Pen Width
      AnimatedObject.ctxScratch.lineWidth = values[0];
      break;
    case 'PC':  // Pen Colour
      AnimatedObject.ctxScratch.strokeStyle = values[0];
      AnimatedObject.ctxScratch.fillStyle = values[0];
      break;
    case 'HT':  // Hide AnimatedObject
      AnimatedObject.visible = false;
      break;
    case 'ST':  // Show AnimatedObject
      AnimatedObject.visible = true;
      break;
  }
};

/**
 * Save an image of the SVG canvas.
 */
AnimatedObject.createImageLink = function() {
  var imgLink = document.getElementById('downloadImageLink');
  imgLink.setAttribute('href',
      document.getElementById('display').toDataURL('image/png'));
  var temp = window.onbeforeunload;
  window.onbeforeunload = null;
  imgLink.click();
  window.onbeforeunload = temp;
};

// AnimatedObject API.

AnimatedObject.moveForward = function(distance, id) {
  BlocklyApps.log.push(['FD', distance, id]);
};

AnimatedObject.moveDiag = function(distance, id) {
  BlocklyApps.log.push(['DIAG', distance, id]);
};

AnimatedObject.moveLinear = function(a,b, id) {
  BlocklyApps.log.push(['LN', a,b, id]);
};

AnimatedObject.moveCircle = function(distance, id) {
  for(var i=0;i<=50;i++){
      BlocklyApps.log.push(['RT', distance, id]);
      BlocklyApps.log.push(['FD', distance, id]);
  }
};

AnimatedObject.moveBackward = function(distance, id) {
  BlocklyApps.log.push(['FD', -distance, id]);
};

AnimatedObject.turnRight = function(angle, id) {
  BlocklyApps.log.push(['RT', angle, id]);
};

AnimatedObject.turnLeft = function(angle, id) {
  BlocklyApps.log.push(['RT', -angle, id]);
};

AnimatedObject.penUp = function(id) {
  BlocklyApps.log.push(['PU', id]);
};

AnimatedObject.penDown = function(id) {
  BlocklyApps.log.push(['PD', id]);
};

AnimatedObject.penWidth = function(width, id) {
  BlocklyApps.log.push(['PW', Math.max(width, 0), id]);
};

AnimatedObject.penColour = function(colour, id) {
  BlocklyApps.log.push(['PC', colour, id]);
};

AnimatedObject.hideAnimatedObject = function(id) {
  BlocklyApps.log.push(['HT', id]);
};

AnimatedObject.showAnimatedObject = function(id) {
  BlocklyApps.log.push(['ST', id]);
};

AnimatedObject.drawPrint = function(text, id) {
  BlocklyApps.log.push(['DP', text, id]);
};

AnimatedObject.drawFont = function(font, size, style, id) {
  BlocklyApps.log.push(['DF', font, size, style, id]);
};

AnimatedObject.UpdateX= function(){
    var newX=parseInt(document.getElementById('objectX').value);
    AnimatedObject.x = (AnimatedObject.HEIGHT / 2) - newX;
    AnimatedObject.display();
};

AnimatedObject.UpdateY= function(){
    var newY=parseInt(document.getElementById('objectY').value);
    AnimatedObject.y = (AnimatedObject.WIDTH / 2) - newY;
    AnimatedObject.display();
};