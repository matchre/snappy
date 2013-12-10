
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
    this.setTooltip(BlocklyApps.getMsg('AnimatedObjects_moveTooltip'));
  }
};

Blockly.JavaScript['draw_move_linear'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var b = Blockly.JavaScript.valueToCode(block, 'b',
      Blockly.JavaScript.ORDER_NONE) || '0';
  var a = Blockly.JavaScript.valueToCode(block, 'a',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'AnimatedObjects.moveLinear(' + a + ','+b+', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_move_circle'] = {
  // Block for moving forward or backwards.
  init: function() {
    this.setColour(120);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendTitle(BlocklyApps.getMsg('AnimatedObjects_moveCircle'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObjects_moveTooltip'));
  }
};

Blockly.JavaScript['draw_move_circle'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'AnimatedObjects.moveCircle(' + value + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_move_diag'] = {
  // Block for moving forward or backwards.
  init: function() {
    var DIRECTIONS =
        [[BlocklyApps.getMsg('AnimatedObjects_moveDiag'), 'moveDiag']];
    this.setColour(120);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendTitle(BlocklyApps.getMsg('AnimatedObjects_moveDiag'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObjects_moveTooltip'));
  }
};

Blockly.JavaScript['draw_move_diag'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'AnimatedObjects.moveDiag(' + value + ', \'block_id_' + block.id + '\');\n';
};
// Extensions to Blockly's language and JavaScript generator.

Blockly.Blocks['draw_move'] = {
  // Block for moving forward or backwards.
  init: function() {
    var DIRECTIONS =
        [[BlocklyApps.getMsg('AnimatedObjects_moveForward'), 'moveForward'],
         [BlocklyApps.getMsg('AnimatedObjects_moveBackward'), 'moveBackward']];
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendTitle(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObjects_moveTooltip'));
  }
};

Blockly.JavaScript['draw_move'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'AnimatedObjects.' + block.getTitleValue('DIR') +
      '(' + value + ', \'block_id_' + block.id + '\');\n';
};


Blockly.Blocks['draw_turn'] = {
  // Block for turning left or right.
  init: function() {
    var DIRECTIONS =
        [[BlocklyApps.getMsg('AnimatedObjects_turnRight'), 'turnRight'],
         [BlocklyApps.getMsg('AnimatedObjects_turnLeft'), 'turnLeft']];
    this.setColour(160);
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendTitle(new Blockly.FieldDropdown(DIRECTIONS), 'DIR');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObjects_turnTooltip'));
  }
};

Blockly.JavaScript['draw_turn'] = function(block) {
  // Generate JavaScript for turning left or right.
  var value = Blockly.JavaScript.valueToCode(block, 'VALUE',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'AnimatedObjects.' + block.getTitleValue('DIR') +
      '(' + value + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_width'] = {
  // Block for setting the width.
  init: function() {
    this.setColour(160);
    this.appendValueInput('WIDTH')
        .setCheck('Number')
        .appendTitle(BlocklyApps.getMsg('AnimatedObjects_setWidth'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObjects_widthTooltip'));
  }
};

Blockly.JavaScript['draw_width'] = function(block) {
  // Generate JavaScript for setting the width.
  var width = Blockly.JavaScript.valueToCode(block, 'WIDTH',
      Blockly.JavaScript.ORDER_NONE) || '1';
  return 'AnimatedObjects.penWidth(' + width + ', \'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_pen'] = {
  // Block for pen up/down.
  init: function() {
    var STATE =
        [[BlocklyApps.getMsg('AnimatedObjects_penUp'), 'penUp'],
         [BlocklyApps.getMsg('AnimatedObjects_penDown'), 'penDown']];
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(STATE), 'PEN');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObjects_penTooltip'));
  }
};

Blockly.JavaScript['draw_pen'] = function(block) {
  // Generate JavaScript for pen up/down.
  return 'AnimatedObjects.' + block.getTitleValue('PEN') +
      '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_colour'] = {
  // Block for setting the colour.
  init: function() {
    this.setColour(20);
    this.appendValueInput('COLOUR')
        .setCheck('Colour')
        .appendTitle(BlocklyApps.getMsg('AnimatedObjects_setColour'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObjects_colourTooltip'));
  }
};

Blockly.JavaScript['draw_colour'] = function(block) {
  // Generate JavaScript for setting the colour.
  var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'AnimatedObjects.penColour(' + colour + ', \'block_id_' +
      block.id + '\');\n';
};

Blockly.Blocks['turtle_visibility'] = {
  // Block for changing turtle visiblity.
  init: function() {
    var STATE =
        [[BlocklyApps.getMsg('AnimatedObjects_hideAnimatedObjects'), 'hideAnimatedObjects'],
         [BlocklyApps.getMsg('AnimatedObjects_showAnimatedObjects'), 'showAnimatedObjects']];
    this.setColour(160);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(STATE), 'VISIBILITY');
    this.setTooltip(BlocklyApps.getMsg('AnimatedObjects_turtleVisibilityTooltip'));
  }
};

Blockly.JavaScript['turtle_visibility'] = function(block) {
  // Generate JavaScript for changing turtle visibility.
  return 'AnimatedObjects.' + block.getTitleValue('VISIBILITY') +
      '(\'block_id_' + block.id + '\');\n';
};

Blockly.Blocks['draw_print'] = {
  // Block for printing text.
  init: function() {
    this.setHelpUrl(BlocklyApps.getMsg('AnimatedObjects_printHelpUrl'));
    this.setColour(160);
    this.appendValueInput('TEXT')
        .appendTitle(BlocklyApps.getMsg('AnimatedObjects_print'));
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObjects_printTooltip'));
  }
};

Blockly.JavaScript['draw_print'] = function(block) {
  // Generate JavaScript for printing text.
  var argument0 = String(Blockly.JavaScript.valueToCode(block, 'TEXT',
      Blockly.JavaScript.ORDER_NONE) || '\'\'');
  return 'AnimatedObjects.drawPrint(' + argument0 + ', \'block_id_' +
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
        [[BlocklyApps.getMsg('AnimatedObjects_fontNormal'), 'normal'],
         [BlocklyApps.getMsg('AnimatedObjects_fontItalic'), 'italic'],
         [BlocklyApps.getMsg('AnimatedObjects_fontBold'), 'bold']];
    this.setHelpUrl(BlocklyApps.getMsg('AnimatedObjects_fontHelpUrl'));
    this.setColour(160);
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('AnimatedObjects_font'))
        .appendTitle(new Blockly.FieldDropdown(FONTLIST), 'FONT');
    this.appendDummyInput()
        .appendTitle(BlocklyApps.getMsg('AnimatedObjects_fontSize'))
        .appendTitle(new Blockly.FieldTextInput('18',
                     Blockly.FieldTextInput.nonnegativeIntegerValidator),
                     'FONTSIZE');
    this.appendDummyInput()
        .appendTitle(new Blockly.FieldDropdown(STYLE), 'FONTSTYLE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(BlocklyApps.getMsg('AnimatedObjects_fontTooltip'));
  }
};

Blockly.JavaScript['draw_font'] = function(block) {
  // Generate JavaScript for setting the font.
  return 'AnimatedObjects.drawFont(\'' + block.getTitleValue('FONT') + '\',' +
      Number(block.getTitleValue('FONTSIZE')) + ',\'' +
      block.getTitleValue('FONTSTYLE') + '\', \'block_id_' +
      block.id + '\');\n';
};
