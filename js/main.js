/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var main = function (){
    var ctx = document.getElementById('display').getContext('2d');
    // Stroked triangle
    Blockly.bindEvent_(blockly, 'mousedown', null,BlocklyApps.generateCode);
    Blockly.bindEvent_(blockly, 'mouseup', null,BlocklyApps.generateCode);
    BlocklyApps.generateCode();
};
