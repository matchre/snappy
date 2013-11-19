
'use strict';


Blockly.Blocks['draw_move_linear'] = {
  // Block for moving forward or backwards.
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendTitle("move to");
    this.appendValueInput('a')
        .setCheck('Number')
        .appendTitle("Y = ");
    this.appendValueInput('b')
        .setCheck('Number')
        .appendTitle("* X + ");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObject_moveTooltip'));
  }
};

Blockly.JavaScript['draw_move_linear'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var b = Blockly.JavaScript.valueToCode(block, 'b',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var a = Blockly.JavaScript.valueToCode(block, 'a',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'AnimatedObject.moveLinear(' + a + ','+b+', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_move_circle'] = {
  // Block for moving forward or backwards.
  init: function() {
    this.setColour(120);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendTitle(BlocklyApps.getMsg('AnimatedObject_moveCircle'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObject_moveTooltip'));
  }
};

Blockly.JavaScript['draw_move_circle'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'AnimatedObject.moveCircle(' + value + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_move_diag'] = {
  // Block for moving forward or backwards.
  init: function() {
    var DIRECTIONS =
        [[BlocklyApps.getMsg('AnimatedObject_moveDiag'), 'moveDiag']];
    this.setColour(120);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendTitle(BlocklyApps.getMsg('AnimatedObject_moveDiag'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObject_moveTooltip'));
  }
};

Blockly.JavaScript['draw_move_diag'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'AnimatedObject.moveDiag(' + value + ', \'block_id_' + block.id + '\');\n';
};
// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['draw_move'] = {
  // Block for moving forward or backwards.
  init: function() {
    var DIRECTIONS =
        [[BlocklyApps.getMsg('AnimatedObject_moveForward'), 'moveForward'],
         [BlocklyApps.getMsg('AnimatedObject_moveBackward'), 'moveBackward']];
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendTitle(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObject_moveTooltip'));
  }
};

Blockly.JavaScript['draw_move'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'AnimatedObject.' + block.getTitleValue('DIR') +
      '(' + value + ', \'block_id_' + block.id + '\');\n';
};


Blockly.Blocks['draw_turn'] = {
  // Block for turning left or right.
  init: function() {
    var DIRECTIONS =
        [[BlocklyApps.getMsg('AnimatedObject_turnRight'), 'turnRight'],
         [BlocklyApps.getMsg('AnimatedObject_turnLeft'), 'turnLeft']];
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendTitle(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObject_turnTooltip'));
  }
};

Blockly.JavaScript['draw_turn'] = function(block) {
  // Generate JavaScript for turning left or right.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'AnimatedObject.' + block.getTitleValue('DIR') +
      '(' + value + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_width'] = {
  // Block for setting the width.
  init: function() {
    this.setColour(160);
    this.appendValueInput('WIDTH')
        .setCheck('Number')
        .appendTitle(BlocklyApps.getMsg('AnimatedObject_setWidth'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObject_widthTooltip'));
  }
};

Blockly.JavaScript['draw_width'] = function(block) {
  // Generate JavaScript for setting the width.
  var width = Blockly.JavaScript.valueToCode(block, 'WIDTH',
      Blockly.JavaScript.ORDER_NONE) || '1';
  return 'AnimatedObject.penWidth(' + width + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_pen'] = {
  // Block for pen up/down.
  init: function() {
    var STATE =
        [[BlocklyApps.getMsg('AnimatedObject_penUp'), 'penUp'],
         [BlocklyApps.getMsg('AnimatedObject_penDown'), 'penDown']];
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(STATE), 'PEN');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObject_penTooltip'));
  }
};

Blockly.JavaScript['draw_pen'] = function(block) {
  // Generate JavaScript for pen up/down.
  return 'AnimatedObject.' + block.getTitleValue('PEN') +
      '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_colour'] = {
  // Block for setting the colour.
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendTitle(BlocklyApps.getMsg('AnimatedObject_setColour'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObject_colourTooltip'));
  }
};

Blockly.JavaScript['draw_colour'] = function(block) {
  // Generate JavaScript for setting the colour.
  var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'AnimatedObject.penColour(' + colour + ', \'block_id_' +
      block.id + '\');\n';
};

Blockly.Blocks['turtle_visibility'] = {
  // Block for changing turtle visiblity.
  init: function() {
    var STATE =
        [[BlocklyApps.getMsg('AnimatedObject_hideAnimatedObject'), 'hideAnimatedObject'],
         [BlocklyApps.getMsg('AnimatedObject_showAnimatedObject'), 'showAnimatedObject']];
    this.setColour(160);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(STATE), 'VISIBILITY');
    this.setTooltip(BlocklyApps.getMsg('AnimatedObject_turtleVisibilityTooltip'));
  }
};

Blockly.JavaScript['turtle_visibility'] = function(block) {
  // Generate JavaScript for changing turtle visibility.
  return 'AnimatedObject.' + block.getTitleValue('VISIBILITY') +
      '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_print'] = {
  // Block for printing text.
  init: function() {
    this.setHelpUrl(BlocklyApps.getMsg('AnimatedObject_printHelpUrl'));
    this.setColour(160);
    this.appendValueInput('TEXT')
        .appendTitle(BlocklyApps.getMsg('AnimatedObject_print'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObject_printTooltip'));
  }
};

Blockly.JavaScript['draw_print'] = function(block) {
  // Generate JavaScript for printing text.
  var argument0 = String(Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'');
  return 'AnimatedObject.drawPrint(' + argument0 + ', \'block_id_' +
      block.id + '\');\n';
};

Blockly.Blocks['draw_font'] = {
  // Block for setting the font.
  init: function() {
    var FONTLIST = // Common font names (intentionally not localized)
        [['Arial', 'Arial'], ['Courier New', 'Courier New'], ['Georgia', 'Georgia'],
         ['Impact', 'Impact'], ['Times New Roman', 'Times New Roman'],
         ['Trebuchet MS', 'Trebuchet MS'], ['Verdana', 'Verdana']];
    var STYLE =
        [[BlocklyApps.getMsg('AnimatedObject_fontNormal'), 'normal'],
         [BlocklyApps.getMsg('AnimatedObject_fontItalic'), 'italic'],
         [BlocklyApps.getMsg('AnimatedObject_fontBold'), 'bold']];
    this.setHelpUrl(BlocklyApps.getMsg('AnimatedObject_fontHelpUrl'));
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('AnimatedObject_font'))
        .appendTitle(new Blockly.FieldDropdown(FONTLIST), 'FONT');
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('AnimatedObject_fontSize'))
        .appendTitle(new Blockly.FieldTextInput('18',
                     Blockly.FieldTextInput.nonnegativeIntegerValidator),
                     'FONTSIZE');
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(STYLE), 'FONTSTYLE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObject_fontTooltip'));
  }
};

Blockly.JavaScript['draw_font'] = function(block) {
  // Generate JavaScript for setting the font.
  return 'AnimatedObject.drawFont(\'' + block.getTitleValue('FONT') + '\',' +
      Number(block.getTitleValue('FONTSIZE')) + ',\'' +
      block.getTitleValue('FONTSTYLE') + '\', \'block_id_' +
      block.id + '\');\n';
};
