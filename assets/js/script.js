var Inventario, appDB, InventarioInsert, inventarios;
var upgradeFn;
var app = ons.bootstrap(['ngCordova']);

var waitingSelector;

var dataToSave;









/*
app.controller('DBCtrl', function($scope, $cordovaSQLite){
   var db;
   ons.ready(function() {
    if (window.cordova && window.SQLitePlugin) {
      db = $cordovaSQLite.openDB( 'scope.db', 1 );
    } else {
      db = window.openDatabase('scope', '1.0', 'scope.db', 100 * 1024 * 1024);
    }
    var query = 'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP, data BLOB)';
    $cordovaSQLite.execute(db, query, [])
      .then(function(res) {
        console.log(res);
      }, function (err) {
        console.error(err);
    });
  });

  $scope.insert = function(dataItem){
    var query = "INSERT INTO items (data) VALUES (?)";
    $cordovaSQLite.execute(db, query, [dataItem])
      .then(function(res) {
        console.log(res);
      }, function (err) {
        console.error(err);
    });
  };

});

*/

// Replace not found images
app.directive('img', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            // show an image-missing image
            $(element).on('error',function () {
                var w = $(element).width();
                var h = $(element).height();
                // using 20 here because it seems even a missing image will have ~18px width
                // after this error function has been called
                if (w <= 20) { w = 100; }
                if (h <= 20) { h = 100; }
                var url = 'db/catalogos_low/error.png';
                $(element).prop('src', url);
            });
        }
    }
});

app.service('ToTableService', function(){
  var items = [];
  var addItems = function(newObj){
    items.push(newObj);
  }
  var getItems = function(){
    return items;
  }
  var removeItems = function(index){
    items.splice(items[index], 1)
  }
  return{
    addItems : addItems,
    getItems : getItems,
    removeItems : removeItems
  }
});

app.controller('TableCtrl', function($scope, ToTableService){
  $scope.items = ToTableService.getItems();
  $scope.removeItem = function(id){
    ToTableService.removeItems(id);
  }

});
app.controller('DialogCtrl', function($scope, ToTableService, ClavesService){
  $scope.campos = ClavesService.getClaves();
  $scope.submit = function(){
    event.preventDefault();
    event.stopPropagation();
    if($scope.campos){
      ToTableService.addItems(this.campos);
    }

  }
});



app.controller('AddItemDialogController', function($scope){
  $scope.dialogs = {};
  $scope.show = function(dlg){
    upgrade();
    if(!$scope.dialogs[dlg]){
      ons.createDialog(dlg).then(function(addItemDialog){
        $scope.addItemDialog[dlg] = addItemDialog;
        addItemDialog.show();
      });
    } else {
      $scope.addItemDialog[dlg].show();
    }
  }
});



// DATABASE SITIOS

app.service('DBService', function(){
  var dbitems = [];
  var addItems = function(newItem){ dbitem.push( newItem ); }
  var getItems = function(){ return dbitem; }
  return{
    addItems : addItems,
    getItems : getItems
  }
});

app.service('SitiosService', function(){
  var sitios = [];
  var addSitios = function(nameObj, newObj){ sitios[nameObj] = newObj; }
  var getSitios = function(){ return sitios; }
  var cleanSitios = function(){ sitios = []; return sitios; }
  return{
    addSitios : addSitios,
    getSitios : getSitios,
    cleanSitios : cleanSitios
  }
});

app.service('ClavesService', function(){
  var claves = [];
  var addClaves = function(nameObj, newObj){ claves[nameObj] = newObj; }
  var getClaves = function(){ return claves; }
  return{
    addClaves : addClaves,
    getClaves : getClaves
  }
});




app.controller('ListaSitiosController', function($scope, SitiosService){

  $scope.failed = false;
  $scope.isFetching = true;

  $.ajax({
    url:'db/sitios.json',
    dataType:'json',
    success: function(sitios){
      $scope.$apply(function(){
        $scope.sitios = sitios;
        $scope.isFetching = false;
        $scope.failed = false;
      });
    },
    error: function(error){
      $scope.$apply(function(){
        $scope.failed = true;
        $scope.isFetching = false;
      });
    }
  });


  $scope.asignSelection = function(valueR){
    SitiosService.addSitios(waitingSelector, valueR);
    $('#'+waitingSelector).parent().addClass('is-dirty');
    upgrade();
    closeMenuSitios();
  }


});


//DATABASE CATALOGO
app.controller('ListaCatalogosController', function($scope, ClavesService){
  $scope.failed = false;
  $scope.isFetching = true;
  $.ajax({
    url:'db/catalogos.json',
    dataType:'json',
    success: function(catalogos){
      $scope.$apply(function(){
        $scope.catalogos = catalogos;
        $scope.isFetching = false;
        $scope.failed = false;
      });
    },
    error: function(error){
      $scope.$apply(function(){
        $scope.failed = true;
        $scope.isFetching = false;
      });
    }
  });


  $scope.asignSelection = function(valueR){
    ClavesService.addClaves(waitingSelector, valueR);
    $('#'+waitingSelector).parent().addClass('is-dirty');
    upgrade();
    closeMenuSitios();
  }

});






upgradeFn = function(){
  upgrade();
}

function upgrade(){
  setTimeout(function(){
    //Update MaterialD
    componentHandler.upgradeAllRegistered();

    //Form Code
    $('#inventarioForm').submit(function(e){
      e.preventDefault();
      var data = $( this ).serializeArray();
      //console.log(data[0].value);
    });

    }, 500);
}



/*
document.addEventListener('input', function(e) {
  console.log('autofilled: ' + e.target.matches(':-webkit-autofill'));
  upgrade();
});
*/

function triggerForm(item){
  $(item).trigger('submit');
}

function openMenuSitios(id, page){
  menuRight.setMenuPage(page, {closeMenu:false, callback:function(){ menuRight.openMenu(); upgrade(); } }  );
  waitingSelector = id;
}

function closeMenuSitios(){
  menuRight.closeMenu({callback:function(){ upgrade(); }});
}





/* DATABAAAAAAAASEEEE */

/*
var DBscope = new properDB();

DBscope.addTable("requerimientos",
"remision, fecha, requerimientoInicial, requerimientoComplementario, sitio, fechaEntrega, Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP");
DBscope.addTable("requerimientos_detalle", "cantidad, unidad, clave, requerimientos_ID");
*/
//DBscope["requerimientos"].recreate();




//var item_id = databaseFn.last().id;


/*
      angular.forEach(cm.elemento, function(value, key) {
        SaveToDB.saveItem(database_detalle, {
          "cantidad"        :   value.cantidad,
          "unidad"          :   value.unidad,
          "clave"           :   value.clave,
          "pertenencia"     :   item_id
        });
      });
*/


/*
var cm = $scope.campos;
var addedto = DBscope["requerimientos"].add({
    "remision":                   cm.remision,
    "fecha":                      $filter('date')($scope.campos.fecha, 'yyyy-MM-dd HH:mm:ss.sss'),
    "requerimientoInicial":       cm.requerimientoInicial,
    "requerimientoComplementario":cm.requerimientoComplementario,
    "sitio":                      cm.sitio,
    "fechaEntrega":               $filter('date')($scope.campos.fechaEntrega, 'yyyy-MM-dd HH:mm:ss.sss')
  });
console.log(addedto);
DBscope.execute('')
*/



var noimage = "iVBORw0KGgoAAAANSUhEUgAAAPoAAADICAMAAAD2gAypAAAA/1BMVEUhICUhICYiIScjIickIygmJSsqKS4sKzAsKzEtLDIvLjMwLzQyMTYzMjc1NDk4Nzw5OD08O0BAP0RAQERBQUVCQUZCQkZDQkdDQ0dEQ0hEREhFRElSUlVTUlZTU1ZUU1dUVFdVVFhVVVhWVllYWFtaWV1bWl1bW15cW15cXF9dXF9fX2JjYmVkY2ZlZWhnZmlpaWxqamxqam1ra21sbG5ubXBwcHJycnR2dnh6enx9fX59fX9+fn+CgoOGhYeGhoeIiImJiYqKiouLi4yQkJGSkZKUk5SUlJWYmJiampudnZ6enp+fn5+fn6CgoKChoaGhoaKioqKioqOjo6OkpKRPcMhzAAACT0lEQVR4Ae3b2W7TQBSH8Q4htCUlQFkg0AbCQlkolAVKKUsDLkuBBsL//Z8Fq1FOLI1vcC6qOfN9V770zyNZlnzOQsg26NChpxJ06NChQ4cOHTp06NChQ4cOHTp06AvHevOcOnTo0KFDhw4deqJBhw4dOnTo0KFDhw4dOnTo0KHz44lThw4dOnTorcH23udm7W0PWgnTu580T8NusvT2vuZrv50qfUvztpUqvZA0evumWbsjSUWi9PZY0mZo2qakcTtN+pLK+qFpfZUtJUmHDv3M0w/F8NX5DOmPRjrq9cnc6E80bScz+gXNup0X/V2F/jUreutQlbqhpkWn9GVV64W4SwdrPumnVG01RF3+ofGaS3r4VpH/XayTy+zO6C8r9Pex/Ofkmax7pC9/N/nv6IPuSik3uzt6uHigSX/W6+RTe98hPZz9eIQrotf7VZOb3Re97NydxxurJ2rlFfsNj/S4WG52//TeTG72m1nQe7+kertreiw3+8An/e4zu7wWy83ukH5Peh7JY/stT3STT+3X6+RmP+2NvjGBvYjkUSuu6CYv7SbPhH5f1s6hcqKb3MqF/kC50k2eHf2hcqWbPDt6R9nSV6BDhw7dN73z5X/rMEYEHTqDosmMB+9mMh7MUDirAKE7dLAAwtqPk6AnEHTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KFDhw4dOnTo0KH/AxNRWRlOrkFVAAAAAElFTkSuQmCC";
