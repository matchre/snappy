/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

String.prototype.repeat = function( num )
{
    return new Array( num + 1 ).join( this );
};


var MobiToJsTab={
    "basculer sur le costume %cst": "switchToCostume( %cst )",
    "ajouter à %var %n ": "%var += %n",
    "costume suivant": "wearNextCostume()",
    "costume n°": "getCostumeByIndex() ",
    "dire %s pendant %n sec.": "sayFor( %data , %secs )",
    "dire %s": "say( %data , isThought, isQuestion) ",
    "penser %s pendant %n sec.": "thinkFor( %data , %secs )",
    "penser %s": "think( %data )",
    "ajouter à l’effet %eff %n": "changeEffect( %effect , %value )",
    "mettre l’effet %eff à %n": "setEffect( %effect , %value )",
    "annuler les effets graphiques": "clearEffects()",
    "ajouter %n à la taille": "changeScale( %delta )",
    "choisir %n % de la taille initiale": "setScale( %num )",
    "taille": "getScale()",
    "montrer": "show()",
    "cacher": "hide()",
    "envoyer au premier plan": "sendToFront()",
    "déplacer de %n plan arrière": "sendToBack( %layers )",
    "avancer de %n pas": "move( %steps )",
    "tourner de %n degrés %clockwise": "turn( %degrees )",
    "tourner de %n degrés %counterclockwise": "turnLeft( %degrees )",
    "se diriger en faisant un angle de %dir": "moveTurning( %degrees )",
    "se diriger vers %dst": "moveTowards( %name )",
    "aller à x: %n y: %n": "moveAt( %x , %y , %justMe )",
    "aller à %dst": "moveTo( %name )",
    "glisser en %n sec. à x: %n y: %n": "glideAt( %secs , %endX , %endY )",
    "ajouter %n à x": "addXPosition( %delta )",
    "donner la valeur %n à x": "setXPosition( %num )",
    "ajouter %n à y": "addYPosition( %num )",
    "donner la valeur %n à y": "setYPosition( %num )",
    "rebondir si le bord est atteint": "bounceIfOnEdge()",
    "position x": "getXPosition()",
    "position y": "getYPosition()",
    "direction": "getDirection()",
    "jouer le son %snd": "playSound( %name )",
    "jouer le son %snd jusqu'au bout": "playSoundUntilDone( %name )",
    "arrêter tous les sons": "stopAllSounds()",
    "faire une pause pour %n temps": "playRest( %beats )",
    "jouer la note %n pour %n temps": "playNote( %pitch , %beats )",
    "ajouter %n au tempo": "addTempo( %delta )",
    "choisir le tempo à %n bpm": "setTempo( %bpm )",
    "tempo": "getTempo()",
    "effacer tout": "penClear()",
    "stylo en position d'êcriture": "penDown()",
    "relever le stylo": "penUp()",
    "mettre la couleur %clr pour le stylo": "setPenColor( %aColor )",
    "ajouter %n à la couleur du stylo": "addPenColor( %delta )",
    "choisir la couleur %n pour le stylo": "setPenColor( %num )",
    "ajouter %n à l'intensité du stylo ": "changeBrightness( %delta )",
    "choisir l'intensité %n pour le stylo": "setPenBrightness( %num )",
    "ajouter %n à la taille du stylo": "addPenSize( %delta )",
    "choisir la taille %n pour le stylo": "setPenSize( %size )",
    "estampiller": "penPress()",
    "Quand %greenflag est pressé": "onGreenFlag(receiveGo,function(){",
    "Quand %keyHat est pressé": "onKeyPressed(receiveKey)",
    "Quand je suis pressé": "onClick(receiveClick)",
    "Quand je reçois %msgHat": "onMessage(receiveMessage)",
    "envoyer à tous %msg": "sendMessage( %message )",
    "envoyer à tous %msg et attendre": "sendMessageAndWait( %message )",
    "message": "getLastMessage()",
    "Englobe %c": "",
    "attendre %n sec.": "wait( %secs )",
    "attendre jusqu'à %b": "waitUntil( %goalCondition )",
    "répéter indéfiniment %c": "while(true)",
    "répéter %n fois %c": "for (i = 0; i < %n ; i++) ",
    "répéter jusqu'à %b %c": " do { %c } while( %b )",
    "si %b %c": "if( %b ) ",
    "si %b %c sinon %c": "if( %b ) %c else %c",
    "rapporte %s": "report( %value )",
    "stop %": "stop()",
    "Quand je commence comme clone": "onStartAsClone(‘receiveOnClone’)",
    "Clone %cln": "createClone()",
    "supprime ce clone": "removeClone()",
    "pause all": "pauseAll()"
};

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
                console.log(input.evaluate());
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
};


//delete all sub blocks and keep only Hat Block
SpriteMorph.prototype.deleteSubBlocks=function(){
    while(this.scripts.children[0].nextBlock()){
        this.scripts.children[0].bottomBlock().deleteBlock();
    }
};


// Create UI Block from SweetJs Macros

SpriteMorph.prototype.blockFromSweet = function (selector, values) {
    var info, block, defaults, inputs, i;
    info = this.blocks[selector];
    if (!info) {return null; }
    block = info.type === 'command' ? new CommandBlockMorph()
        : info.type === 'hat' ? new HatBlockMorph()
            : info.type === 'ring' ? new RingMorph()
                : new ReporterBlockMorph(info.type === 'predicate');
    block.color = this.blockColor[info.category];
    block.category = info.category;
    block.selector = selector;
    if (contains(['reifyReporter', 'reifyPredicate'], block.selector)) {
        block.isStatic = true;
    }
    block.setSpec(localize(info.spec));
    if (values || info.defaults) {
        defaults = values ? values : info.defaults;
        block.defaults = defaults;
        inputs = block.inputs();
        if (inputs[0] instanceof MultiArgMorph) {
            inputs[0].setContents(defaults);
            inputs[0].defaults = defaults;
        } else {
            for (i = 0; i < defaults.length; i += 1) {
                if (defaults[i] !== null) {
                    inputs[i].setContents(defaults[i]);
                }
            }
        }
    }
    return block;
};

// add SubBlock to the last block attached to the current sprite
SpriteMorph.prototype.addSubBlock=function(selector,values){
    this.scripts.children[0].bottomBlock().nextBlock(SpriteMorph.prototype.blockFromSweet(selector, values));
};
SpriteMorph.prototype.commandsLevels=[];
SpriteMorph.prototype.CompileSweettoBlocks=function(){
    var currentsprite=this;
    require(["./sweet", "./syntax"], function(sweet, syn) {
                    var storage_code = 'editor_code';
                    var storage_mode = 'editor_mode';

                    var commandsTable = editor.getValue().split('\n');
                    var commandsLevels=[];
                    var compileWithSourcemap = false;

                    function compile(command,level) {
                        var code = sweetmacros + command.replace(/-/g, '');;
                        var expanded, compiled, res;
                        try {
                            res = sweet.compile(code, {
                                sourceMap: false,
                                readableNames: true
                            });
                            compiled = res.code;
                            eval(compiled.replace('level', level));
//                            return compiled;
                        } catch (e) {
//                            return null;
                        }
                    }
                    function extractBlocksLevels(code){
                        var pos=0;
                        var levelsTab=[];
                        code.forEach(function(cmd){
                            levelsTab[pos]=(cmd.match(/-/g)||[]).length;
                            pos++;
                        });
                        return levelsTab;
                    }
                    commandsLevels=extractBlocksLevels(commandsTable);
                    var pos=0;
                    commandsTable.forEach(function(command){
                        compile(command,commandsLevels[pos]);
                        pos++;
                    });
    });
};


// add InnerSubBlock to the last block attached to the current sprite
SpriteMorph.prototype.pushBlock=function(selector,values,level){
    var cmd= "this.scripts.children[0].bottomBlock()";
    var loopcmd=".children.filter(function(morph){ return morph instanceof CSlotMorph; })[0].nestedBlock().bottomBlock()";
    values=values instanceof Array?"["+values.toString()+"]":"["+values+"]";
    var addcmd=".nextBlock(SpriteMorph.prototype.blockFromSweet('"+selector+"',"+values+"));";
    var addcmdtoslot=".children.filter(function(morph){ return morph instanceof CSlotMorph; })[0].nestedBlock(SpriteMorph.prototype.blockFromSweet('"+selector+"',"+values+"));";
    var finalcmd=cmd+loopcmd.repeat(level)+addcmd;
    console.log(finalcmd);
    try{
        eval(finalcmd);
    }catch (e){
        finalcmd=cmd+loopcmd.repeat(level-1)+addcmdtoslot;
        eval(finalcmd);
    }
};


SpriteMorph.prototype.getBlocksTree=function(){
    var node,blockstree,pos;
    blockstree=[];
    pos=0;
    node=this.scripts.children[0];
    while(node.nextBlock()){
        blockstree[pos]=[];
        blockstree[pos].block=node;
        blockstree[pos].selector=node.selector;
        blockstree[pos].children=node.ChildBlocksTab();
        node=node.nextBlock();
        pos++;
    }
    blockstree[pos]=[];
    blockstree[pos].block=node;
    blockstree[pos].selector=node.selector;
    blockstree[pos].children=node.ChildBlocksTab();
    return blockstree;
};


SpriteMorph.prototype.BlocksTreeToJs=function(){
    var blocksTree,blocklevel,code;
    var nodeToJs = function (node,level){
        var txt='';
        var isloop=node.children.length?true:false;
        var loopopen=isloop?"{":";";
        var loopend=isloop?Array(level).join(" ")+"}\n":"";
         txt=Array(level).join(" ")+node.block.toJs()+loopopen+'\n';
         node.children.forEach(function(child){
             txt+=nodeToJs(child,level+1);
         });
         txt+=loopend;
         return txt;
    };
    blocklevel=1; code='';
    this.getBlocksTree().forEach(function(block){
        code+=nodeToJs(block,blocklevel);
    });
    code+="});";
    
    //delete all %c remaining in the code
    code=code.replace(/%(\S+)/g, '');
    return code;
};

SpriteMorph.prototype.BlocksTreeToSweet=function(){
    var blocksTree,blocklevel,code;
    var nodeToCode = function (node,level){
        var txt='';
         txt=Array(level).join("-")+node.block.toSweet()+'\n';
         node.children.forEach(function(child){
             txt+=nodeToCode(child,level+1);
         });
         return txt;
    };
    blocklevel=1; code='';
    this.getBlocksTree().forEach(function(block){
        code+=nodeToCode(block,blocklevel);
    });
    //delete all %c remaining in the code
    code=code.replace(/%(\S+)/g, '');
    return code;
};

BlockMorph.prototype.ChildBlocksTab=function(){
    var blocksTab=[];
    var node,pos;
    pos=0;
    this.inputs().forEach(function(input){
        if(input instanceof CSlotMorph){
            node=input.children[0];
            while(node.nextBlock()){
                blocksTab[pos]=[];
                if(node instanceof CommandBlockMorph){
                    blocksTab[pos].selector=node.selector;
                    blocksTab[pos].block=node;
                    blocksTab[pos].children=node.ChildBlocksTab();
                }
                node=node.nextBlock();
                pos++;
            }
            blocksTab[pos]=[];
            if (node instanceof CommandBlockMorph) {
                blocksTab[pos].selector = node.selector;
                blocksTab[pos].block = node;
                blocksTab[pos].children = node.ChildBlocksTab();
            }
        }
    });
    return blocksTab;
};


CommandBlockMorph.prototype.toJs=function(){
    var spectxt=MobiToJsTab[this.blockSpec]||this.blockSpec;
            this.inputs().forEach(function (input) {
                if(typeof input.evaluate()!=='object') {
                    spectxt = spectxt.replace(/%(\S+)/, input.evaluate());
                }
            });
    return spectxt;
};

CommandBlockMorph.prototype.toSweet=function(){
    var spectxt=this.blockSpec;
            this.inputs().forEach(function (input) {
                if(typeof input.evaluate()!=='object') {
                    spectxt = spectxt.replace(/%(\S+)/, input.evaluate());
                }
            });
    return spectxt;
};
CommandBlockMorph.prototype.getCodeTxt=function(){
    var txt = '';
    var lineEnd=';';

    if (this.selector) {
        var spectxt=MobiToJsTab[this.blockSpec]||this.blockSpec;
        this.inputs().forEach(function (input) {
            if(typeof input.evaluate()!=='object') {
                spectxt = spectxt.replace(/%(\S+)/, input.evaluate());
            }else{
                spectxt = spectxt.replace(/%(\S+)/, '{');
                lineEnd='';
            }
        });

        txt=spectxt+lineEnd+'\n';
        return txt;
    }
};
CommandBlockMorph.prototype.fetchChildBlocks=function(){
    var innerCode=false;
    var code=this.getCodeTxt();
    this.inputs().forEach(function(input){
        if(input instanceof CSlotMorph){
            innerCode=true;
            var node=input.children[0];

            while(node.nextBlock()){
                if(node instanceof CommandBlockMorph)
                    code+=node.fetchChildBlocks();
                node=node.nextBlock();
//                console.log(':::< '+node.blockSpec);
//                if(node instanceof CommandBlockMorph)
//                    node.fetchChildBlocks();
            }
            code+=node.fetchChildBlocks();
        }

//        if((input instanceof BlockMorph) || (input instanceof CommandBlockMorph))
//            input.fetchChildBlocks();
    });
    if(innerCode) {
        code += '\n}';
    }
    return code;
};
SpriteMorph.prototype.getBlocksJs=function(){
    var txt = '';
    var code='';
    var indent='';
    var node=this.scripts.children[0];
    code=node.getCodeTxt();
    while(node.nextBlock()){
        node=node.nextBlock();
        if(node instanceof CommandBlockMorph)
            code+=node.fetchChildBlocks();
    }
    code+='});';
//    this.scripts.allChildren().forEach(function (morph) {
//        if (morph.selector) {
//
//            txt=MobiToJsTab[morph.blockSpec]+'(';
//            var spectxt=indent+MobiToJsTab[morph.blockSpec];
//            morph.inputs().forEach(function (input) {
//                if(typeof input.evaluate()!=='object') {
//                    spectxt = spectxt.replace(/%(\S+)/, input.evaluate());
//                }else{
//                    indent='        ';
//                }
//            });
//            txt=spectxt;
//            code+=txt+'\n';
//        }
//
//    });
    return code;
};


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

