/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

SpriteMorph.prototype.getBlocksTab=function(){
    var txt = '';
    var code='';
    var indent='';
    this.scripts.allChildren().forEach(function (morph) {

        if (morph.selector) {
//            console.log('------(((((((((((((((((('+morph.selector+')))))))))))))-----');
            txt=morph.blockSpec+'(';
            var spectxt=indent+morph.blockSpec;
            morph.inputs().forEach(function (input) {
//                txt+=input.evaluate()+',';
                console.log(typeof input.evaluate()+' => '+input.evaluate());
                if(typeof input.evaluate()!=='object') {
                    spectxt = spectxt.replace(/%(\S+)/, input.evaluate());
                }else{
                    indent='        ';
                }
                });
//            txt+=');';
            txt=spectxt;
//            console.log(morph.inputs()[0]?morph.inputs()[0].evaluate():'');
//            if (contains(
//                ['receiveMessage', 'doBroadcast', 'doBroadcastAndWait'],
//                morph.selector
//            )) {
//                txt = morph.inputs()[0].evaluate();
//                if (isString(txt) && txt !== '') {
//                    if (!contains(msgs, txt)) {
//                        msgs.push(txt);
//                    }
//                }
//            }
        code+=txt+'\n';
        }

    });
    return code;
}
var CodeGenerator;

CodeGenerator.prototype.getBlocks = function (XML){
    var code = [];
  this.init();
  var blocks = Workspace.getTopBlocks(true);
  for (var x = 0, block; block = blocks[x]; x++) {
    var line = this.blockToCode(block);
    if (isArray(line)) {
      line = line[0];
    }
    if (line) {
      if (block.outputConnection && this.scrubNakedValue) {
        line = this.scrubNakedValue(line);
      }
      code.push(line);
    }
  }
  code = code.join('\n');  // Blank line between each section.
  code = this.finish(code);
  code = code.replace(/^\s+\n/, '');
  code = code.replace(/\n\s+$/, '\n');
  code = code.replace(/[ \t]+\n/g, '\n');
  return code;
};

CodeGenerator.prototype.blockToCode = function(block) {
  if (!block) {
    return '';
  }
  if (block.disabled) {
    return this.blockToCode(block.getNextBlock());
  }

  var func = this[block.type];
  if (!func) {
    throw 'Language "' + this.name_ + '" does not know how to generate code ' +
        'for block type "' + block.type + '".';
  }
  var code = func.call(block, block);
  if (isArray(code)) {
     return [this.scrub_(block, code[0]), code[1]];
  } else if (goog.isString(code)) {
    if (this.STATEMENT_PREFIX) {
      code = this.STATEMENT_PREFIX.replace(/%1/g, '\'' + block.id + '\'') +
          code;
    }
    return this.scrub_(block, code);
  } else if (code === null) {
    return '';
  } else {
    throw 'Invalid code generated: ' + code;
  }
};

CodeMirror.prototype.refreshCode = function (){
    editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        lineNumbers: true,
        matchBrackets: true,
        continueComments: "Enter",
        extraKeys: {"Ctrl-Q": "toggleComment"}
    });
};