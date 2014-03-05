// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">a visual programming environment</span><span id="blocklyMessage">Blockly</span><span id="codeTooltip">Generéierte JavaScript Code kucken.</span><span id="linkTooltip">Späicheren a mat de Bléck verlinken.</span><span id="runTooltip">Run the program defined by the blocks in the workspace.</span><span id="runProgram">Programm ausféieren</span><span id="resetProgram">Zrécksetzen</span><span id="dialogOk">OK</span><span id="dialogCancel">Ofbriechen</span><span id="catLogic">Logik</span><span id="catLoops">Loops</span><span id="catMath">Math</span><span id="catText">Text</span><span id="catLists">Lëschten</span><span id="catColour">Faarf</span><span id="catVariables">Variabelen</span><span id="catProcedures">Prozeduren</span><span id="httpRequestError">Et gouf e Problem mat der Ufro.</span><span id="linkAlert">Share your blocks with this link:\\n\\n%1</span><span id="hashError">Pardon, \'%1\' entsprécht kengem vun de gespäicherte Programmer.</span><span id="xmlError">Could not load your saved file.  Perhaps it was created with a different version of Blockly?</span><span id="listVariable">Lëscht</span><span id="textVariable">Text</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">OK</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof turtlepage == 'undefined') { var turtlepage = {}; }


turtlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="AnimatedObject_moveTooltip">Moves the turtle forward or backward by the specified amount.</span><span id="AnimatedObject_moveForward">move forward by</span><span id="AnimatedObject_moveBackward">move backward by</span><span id="AnimatedObject_moveDiag">move Diag by</span><span id="AnimatedObject_moveCircle">move Circle by</span><span id="AnimatedObject_moveLinear">move Linear by</span><span id="AnimatedObject_turnTooltip">Turns the turtle left or right by the specified number of degrees.</span><span id="AnimatedObject_turnRight">turn right by</span><span id="AnimatedObject_turnLeft">turn left by</span><span id="AnimatedObject_widthTooltip">Changes the width of the pen.</span><span id="AnimatedObject_setWidth">set width to</span><span id="AnimatedObject_colourTooltip">Changes the colour of the pen.</span><span id="AnimatedObject_setColour">set colour to</span><span id="AnimatedObject_penTooltip">Lifts or lowers the pen, to stop or start drawing.</span><span id="AnimatedObject_penUp">pen up</span><span id="AnimatedObject_penDown">pen down</span><span id="AnimatedObject_turtleVisibilityTooltip">Makes the turtle (circle and arrow) visible or invisible.</span><span id="AnimatedObject_hideAnimatedObject">hide turtle</span><span id="AnimatedObject_showAnimatedObject">show turtle</span><span id="AnimatedObject_printHelpUrl">http://en.wikipedia.org/wiki/Printing</span><span id="AnimatedObject_printTooltip">Draws text in the turtle\'s direction at its location.</span><span id="AnimatedObject_print">print</span><span id="AnimatedObject_fontHelpUrl">http://en.wikipedia.org/wiki/Font</span><span id="AnimatedObject_fontTooltip">Sets the font used by the print block.</span><span id="AnimatedObject_font">font</span><span id="AnimatedObject_fontSize">font size</span><span id="AnimatedObject_fontNormal">normal</span><span id="AnimatedObject_fontBold">bold</span><span id="AnimatedObject_fontItalic">italic</span><span id="AnimatedObject_unloadWarning">Leaving this page will result in the loss of your work.</span></div>';
};


turtlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return turtlepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title">  AnimatedObject Graphics</span></h1></td><td class="farSide"><select id="languageMenu"></select></td></tr></table><div id="visualization"><canvas id="scratch" width="400" height="400" style="display: none"></canvas><canvas id="display" width="400" height="400" style="position:absolute"></canvas><canvas id="ball-display" width="400" height="400" style="position:absolute"></canvas><div style="width: 400px;height: 420px;"></div></div><div id="xy" style="max-width: 400px;"><input type="number" id="objectX" value="0" onchange="AnimatedObject.UpdateX();"></input><input type="number" id="objectY" value="0" onchange="AnimatedObject.UpdateY();"></input></div><div id="jscode" style="max-width: 400px;"></div><table style="padding-top: 1em;"><tr><td style="width: 190px; text-align: center; vertical-align: top; visibility: hidden;"><script type="text/javascript" src="vendors/slider.js"><\/script><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="media/icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /><!-- Fast icon. --><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="media/icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="media/loading.gif" height=15 width=15></td><td style="width: 190px; text-align: center"><button id="runButton" class="primary" title="Makes the turtle do what the blocks say."><img src="media/1x1.gif" class="run icon21">Programm ausféieren</button><button id="resetButton" class="primary" style="display: none"><img src="media/1x1.gif" class="stop icon21"> Zrécksetzen</button></td></tr></table><div id="toolbarDiv" style="display:none;"><button id="codeButton" class="notext" title="Generéierte JavaScript Code kucken."><img src=\'media/1x1.gif\' class="code icon21"></button><button id="linkButton" class="notext" title="Späicheren a mat de Bléck verlinken."><img src=\'media/1x1.gif\' class="link icon21"></button><button class="notext" id="captureButton" title="Save the drawing."><img src=\'media/1x1.gif\' class="img icon21"></button><a id="downloadImageLink" download="drawing.png"></a></div><script type="text/javascript" src="vendors/blockly_compressed.js"><\/script><script type="text/javascript" src="vendors/blocks_compressed.js"><\/script><script type="text/javascript" src="vendors/javascript_compressed.js"><\/script><script type="text/javascript" src="' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="vendors/blocks.js"><\/script>' + turtlepage.toolbox(null, null, opt_ijData) + '<div style="width:500px;"><div id="blockly"></div></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData);
};


turtlepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="AnimatedObject"><block type="draw_move"><value name="VALUE"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="draw_move_diag"><value name="VALUE"><block type="math_number"><title name="NUM">20</title></block></value></block><block type="draw_move_linear"><value name="a"><block type="math_number"><title name="NUM">10</title></block></value><value name="b"><block type="math_number"><title name="NUM">20</title></block></value></block><block type="draw_move_circle"><value name="VALUE"><block type="math_number"><title name="NUM">5</title></block></value></block><block type="draw_turn"><value name="VALUE"><block type="math_number"><title name="NUM">90</title></block></value></block><block type="draw_width"><value name="WIDTH"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="draw_pen"></block><block type="turtle_visibility"></block><block type="draw_print"><value name="TEXT"><block type="text"></block></value></block><block type="draw_font"></block></category><category name="Faarf"><block type="draw_colour"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="colour_picker"></block><block type="colour_random"></block><block type="colour_rgb"></block><block type="colour_blend"></block></category><category name="Logik"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_ternary"></block></category><category name="Loops"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">10</title></block></value><value name="BY"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="Math"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><title name="NUM">1</title></block></value><value name="HIGH"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_float"></block></category><category name="Lëschten"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><title name="NUM">5</title></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><title name="VAR">Lëscht</title></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><title name="VAR">Lëscht</title></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><title name="VAR">Lëscht</title></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><title name="VAR">Lëscht</title></block></value></block></category><category name="Variabelen" custom="VARIABLE"></category><category name="Prozeduren" custom="PROCEDURE"></category></xml>';
};
