// TAFFY

var DB_requerimientos = TAFFY();
DB_requerimientos.store("Requerimientos");

var DB_proveedor = TAFFY();
DB_proveedor.store("Proveedor");

var DB_transformacion = TAFFY();
DB_transformacion.store("Transformacion");

var DB_requerimientos = TAFFY();
DB_requerimientos.store("Requerimientos");

var DB_baja = TAFFY();
DB_baja.store("Baja");

var DB_inventario = TAFFY();
DB_inventario.store("Inventario");

var DB_relacion = TAFFY();
DB_relacion.store("Relacion");

var DB_inspeccion = TAFFY();
DB_inspeccion.store("Inspeccion");

var DB_acero = TAFFY();
DB_acero.store("Acero");

var DB_concreto = TAFFY();
DB_concreto.store("Concreto");






app.service('SaveToDB', function(){
  var saveItem = function(database, dataItem){ var insert = database.insert(dataItem); }
  return{ saveItem : saveItem }
});



app.controller('RequerimientosCtrl', ['$scope', '$filter', 'SitiosService', 'SaveToDB', function($scope, $filter, SitiosService, SaveToDB){
  var database = DB_requerimientos;
  var databaseFn = DB_requerimientos();
  $scope.campos = SitiosService.getSitios();
  $scope.campos.fecha= new Date();
  $scope.campos.fechaEntrega= new Date();

  $scope.save = function(){
    var cm = $scope.campos;
    SaveToDB.saveItem(database, {
        "remision":                   cm.remision,
        "fecha":                      $filter('date')($scope.campos.fecha, 'yyyy-MM-dd HH:mm:ss.sss'),
        "requerimientoInicial":       cm.requerimientoInicial,
        "requerimientoComplementario":cm.requerimientoComplementario,
        "sitio":                      cm.sitio,
        "fechaEntrega":               $filter('date')($scope.campos.fechaEntrega, 'yyyy-MM-dd HH:mm:ss.sss'),
        "id"  :                       idGen(),
        "elemento"  :                 cm.elemento
      });

      //Clean
      $scope.campos = {};
      $scope.campos = SitiosService.cleanSitios();
      $scope.campos.fecha= new Date();
      $scope.campos.fechaEntrega= new Date();
  }
}]);

app.controller('ProveedorCtrl', ['$scope', '$filter', 'SitiosService', 'SaveToDB', '$cordovaCamera', function($scope, $filter, SitiosService, SaveToDB, $cordovaCamera){
  var database = DB_proveedor;
  var databaseFn = DB_proveedor();
  $scope.campos = SitiosService.getSitios();
  $scope.campos.fecha = new Date();
  $scope.campos.captura = noimage;
  document.addEventListener("deviceready", function () {  }, false);

  $scope.save = function(){

    var cm = $scope.campos;
    SaveToDB.saveItem(database, {
        "remision":                   cm.remision,
        "fecha":                      $filter('date')($scope.campos.fecha, 'yyyy-MM-dd HH:mm:ss.sss'),
        "nombreProveedor":            cm.nombreProveedor,
        "claveProveedor":             cm.claveProveedor,
        "contacto":                   cm.contacto,
        "telefono":                   cm.telefono,
        "comentariosProveedor":       cm.comentariosProveedor,
        "nombreEquipo":               cm.nombreEquipo,
        "claveEquipo":                cm.claveEquipo,
        "familiaEquipo":              cm.familioEquipo,
        "proveedor":                  cm.proveedor,
        "comentariosEquipo":          cm.comentariosEquipo,
        "captura":                    cm.captura,
        "id"  :                       idGen()
      });

      //Clean
      $scope.campos = {};
      $scope.campos = SitiosService.cleanSitios();
      $scope.campos.fecha= new Date();
  }

  $scope.camera = function(){
    var options = {
      quality: 90,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('picture');
      image.src = "data:image/jpeg;base64," + imageData;
      $scope.campos.captura = imageData;
    }, function(err) {
      // error
    });
  }

}]);




app.controller('TransformacionCtrl', ['$scope', '$filter', 'SitiosService', 'SaveToDB', function($scope, $filter, SitiosService, SaveToDB){
  var database = DB_transformacion;
  var databaseFn = DB_transformacion();
  $scope.campos = SitiosService.getSitios();
  $scope.campos.fecha = new Date();
  $scope.save = function(){
    var cm = $scope.campos;
    SaveToDB.saveItem(database, {
        "folioSitio":                  cm.folioSitio,
        "fecha":                      $filter('date')($scope.campos.fecha, 'yyyy-MM-dd HH:mm:ss.sss'),
        "sitio":                      cm.sitio,
        "id"  :                       idGen(),
        "elemento"  :                 cm.elemento
      });
      //Clean
      $scope.campos = {};
      $scope.campos = SitiosService.cleanSitios();
      $scope.campos.fecha= new Date();
  }
}]);

app.controller('BajaCtrl', ['$scope', '$filter', 'SitiosService', 'SaveToDB', function($scope, $filter, SitiosService, SaveToDB){
  var database = DB_baja;
  var databaseFn = DB_baja();
  $scope.campos = SitiosService.getSitios();
  $scope.campos.fecha = new Date();
  $scope.save = function(){
    var cm = $scope.campos;
    SaveToDB.saveItem(database, {
        "folioSitio":                  cm.folioSitio,
        "fecha":                      $filter('date')($scope.campos.fecha, 'yyyy-MM-dd HH:mm:ss.sss'),
        "sitio":                      cm.sitio,
        "id"  :                       idGen(),
        "elemento"  :                 cm.elemento
      });
      //Clean
      $scope.campos = {};
      $scope.campos = SitiosService.cleanSitios();
      $scope.campos.fecha= new Date();
  }
}]);

app.controller('InventarioCtrl', ['$scope', '$filter', 'SitiosService', 'SaveToDB', function($scope, $filter, SitiosService, SaveToDB){
  var database = DB_inventario;
  var databaseFn = DB_inventario();
  $scope.campos = SitiosService.getSitios();
  $scope.campos.fecha = new Date();
  $scope.save = function(){
    var cm = $scope.campos;
    SaveToDB.saveItem(database, {
        "fecha":                      $filter('date')($scope.campos.fecha, 'yyyy-MM-dd HH:mm:ss.sss'),
        "sitio":                      cm.sitio,
        "id"  :                       idGen(),
        "elemento"  :                 cm.elemento
      });
      //Clean
      $scope.campos = {};
      $scope.campos = SitiosService.cleanSitios();
      $scope.campos.fecha= new Date();
  }
}]);






app.controller('RelacionCtrl', ['$scope', '$filter', 'SitiosService', 'SaveToDB', '$cordovaCamera', function($scope, $filter, SitiosService, SaveToDB, $cordovaCamera){
  var database = DB_relacion;
  var databaseFn = DB_relacion();
  $scope.campos = SitiosService.getSitios();
  $scope.campos.captura = [];
  $scope.campos.fecha = new Date();


  $scope.save = function(){
    console.log('saving');
    var cm = $scope.campos;
    SaveToDB.saveItem(database, {
        "TipoRemision":               cm.TipoRemision,
        "NoRemision":                 cm.NoRemision,
        "fecha":                      $filter('date')($scope.campos.fecha, 'yyyy-MM-dd HH:mm:ss.sss'),
        "ClaveSitioDestion":          cm.ClaveSitioDestion,
        "ClaveSitioOrigen":           cm.ClaveSitioOrigen,
        "FechaEmbarque":              cm.FechaEmbarque,
        "FechaArribo":                cm.FechaArribo,
        "Responsable":                cm.Responsable,
        "Compania":                   cm.Compania,
        "PlacaVehiculo":              cm.PlacaVehiculo,
        "PlacaPlataforma":            cm.PlacaPlataforma,
        "Notas":                      cm.Notas,
        "elemento":                   cm.elemento,
        "id"  :                       idGen()
      });

      //Clean
      $scope.campos = {};
      $scope.campos = SitiosService.cleanSitios();
      $scope.campos.captura = [];
      $scope.campos.fecha = new Date();
  }

  $scope.camera = function(){
    var options = {
      quality: 90,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('picture');
      if(imageData==null || imageData==""){
        imageData = noimage;
      }
      image.src = "data:image/jpeg;base64," + imageData;

      $scope.campos.captura.push(imageData);
    }, function(err) {
      // error
    });
  }

}]);





app.controller('InspeccionCtrl', ['$scope', '$filter', 'SitiosService', 'SaveToDB', '$cordovaCamera', function($scope, $filter, SitiosService, SaveToDB, $cordovaCamera){
  var database = DB_inspeccion;
  var databaseFn = DB_inspeccion();
  $scope.campos = SitiosService.getSitios();
  $scope.campos.captura = [];
  $scope.campos.fecha = new Date();


  $scope.save = function(){
    console.log('saving');
    var cm = $scope.campos;
    SaveToDB.saveItem(database, {
        "folioSitio":                 cm.folioSitio,
        "fecha":                      $filter('date')($scope.campos.fecha, 'yyyy-MM-dd HH:mm:ss.sss'),
        "sitio":                      cm.sitio,
        "elemento":                   cm.elemento,
        "id"  :                       idGen()
      });

      //Clean
      $scope.campos = {};
      $scope.campos = SitiosService.cleanSitios();
      $scope.campos.captura = [];
      $scope.campos.fecha = new Date();
  }

  $scope.camera = function(){
    var options = {
      quality: 90,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('picture');
      if(imageData==null || imageData==""){
        imageData = noimage;
      }
      image.src = "data:image/jpeg;base64," + imageData;

      $scope.campos.captura.push(imageData);
    }, function(err) {
      // error
    });
  }

}]);




//Display datos

app.controller('DatosCtrl', function($scope, ClavesService, $rootScope){
  $scope.requerimientos = DB_requerimientos().get();
  $scope.proveedor = DB_proveedor().get();
  $scope.transformacion = DB_transformacion().get();
  $scope.baja = DB_baja().get();
  $scope.inventario = DB_inventario().get();
  $scope.relacion = DB_relacion().get();
  $scope.inspeccion = DB_inspeccion().get();

  $scope.views = [];
  $scope.viewHide = function(val, ndx){
    $scope.views[ndx] = false;
  };
  $scope.viewDialog = function(ndx){
    $scope.views[ndx] = !$scope.views[ndx];
  };
  $rootScope.Utils = function(itm){
    if(itm){
      return Object.keys(itm);
    } else {
      return 0;
    }
  }

});




function idGen() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}
