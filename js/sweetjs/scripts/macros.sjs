
macro avancer {
        rule { de $value:lit pas } => { ide.currentSprite.forward($value); }
}




macro si {
        rule { $cond:expr... alors $action:expr(;)... finsi } => {
        if($cond...) { $action(;)... }
        }
        rule { $cond alors $action sinon $alternative finsi } => {
        if($cond...) { $action(;)... } else { $alternative(;)... }
        }
}

        macro ajouter {
        rule{ à $var $value } => {
        $var += $value;
        }
        }
        macro attendre{
        rule{ $time sec. } => { wait($time); }
        }
        macro répéter {
        rule { indéfiniment $action:expr(;)... fin } => { repeatForever($action(,)...)  }
        }

        macro : {
        rule infix { $name:ident | $value:expr } => {
        $name = $value;
        }
        }

        macro dire {
        rule { $word:lit pendant $time:lit sec.} => { sayFor($word,$time); }
        rule { $word:lit } => { say ($word); }
        }

        

        macro aller {
        rule { à x:$x:lit y:$y:lit } => { moveAt($x,$y,true); }
        }