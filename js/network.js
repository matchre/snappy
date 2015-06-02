/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

IDE_Morph.prototype.getShared=function(){
    var current_ide=this;
    $.get( "http://127.0.0.1:8000/ws/getsharedsprites/", function( data ) {
      var str=(new XMLSerializer()).serializeToString(data);
      ide.serializer.loadSharedSprites(str,ide.getShared);
//      setInterval(, 3000);
    });
};

IDE_Morph.prototype.isDuplicateSprite=function(spriteName){
    var isDuplicate=false;
    ide.sprites.contents.forEach(function(sprite){
    if (sprite.name === spriteName)
    isDuplicate=true;
    });
    return isDuplicate;
};

IDE_Morph.prototype.getSprite=function(spriteName){
    var theSprite=null;
    ide.sprites.contents.forEach(function(sprite){
    if (sprite.name === spriteName)
    theSprite=sprite;
    });
    return theSprite;
};

SnapSerializer.prototype.loadSharedSprites=function(xmlString,callback){
    var model, project, myself = this;

    project = this.project = {
        globalVariables: ide.globalVariables,
        stage: ide.stage,
        sprites: {}
    };
    project.sprites[project.stage.name] = project.stage;
    model = this.parse(xmlString);
    if (+model.attributes.version > this.version) {
        throw 'Module uses newer version of Serializer';
    }
    model.childrenNamed('sprite').forEach(function (model) {
        if(ide.getSprite(model.attributes.name)){
            var sprite = ide.getSprite(model.attributes.name);
            sprite.gotoXY(+model.attributes.x || 0, +model.attributes.y || 0);
        }else{
            var sprite  = new SpriteMorph(project.globalVariables);

            if (model.attributes.id) {
                myself.objects[model.attributes.id] = sprite;
            }
            if (model.attributes.name) {
                sprite.name = model.attributes.name;
                project.sprites[model.attributes.name] = sprite;
            }
            if (model.attributes.color) {
                sprite.color = myself.loadColor(model.attributes.color);
            }
            if (model.attributes.pen) {
                sprite.penPoint = model.attributes.pen;
            }
            project.stage.add(sprite);
            ide.sprites.add(sprite);
            sprite.scale = parseFloat(model.attributes.scale || '1');
            sprite.rotationStyle = parseFloat(
                model.attributes.rotation || '1'
            );
            sprite.isDraggable = model.attributes.draggable !== 'false';
            sprite.isVisible = model.attributes.hidden !== 'true';
            sprite.heading = parseFloat(model.attributes.heading) || 0;
            sprite.drawNew();
            sprite.gotoXY(+model.attributes.x || 0, +model.attributes.y || 0);
            myself.loadObject(sprite, model);
        }
    });
    
    this.objects = {};
    this.project = {};
    this.mediaDict = {};

//    ide.stage.drawNew();
    ide.createCorral();
    ide.fixLayout();
    callback();
};
