var Inventario, appDB, InventarioInsert, inventarios;
var upgradeFn;
var app = ons.bootstrap();

var waitingSelector;


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
app.controller('ListaSitiosController', function($scope){
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
    console.log(valueR);
    $(waitingSelector).val(valueR).parent().addClass('is-dirty');
    upgrade();
    closeMenuSitios();
  }


});


//DATABASE CATALOGO
app.controller('ListaCatalogosController', function($scope){
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
    console.log(valueR);
    $(waitingSelector).val(valueR).parent().addClass('is-dirty');
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




document.addEventListener('input', function(e) {
  console.log('autofilled: ' + e.target.matches(':-webkit-autofill'));
});


function triggerForm(item){
  $(item).trigger('submit');
}

function openMenuSitios(id, page){
  menuRight.setMenuPage(page, {closeMenu:false, callback:function(){ menuRight.openMenu(); upgrade(); } }  );
  waitingSelector = '#'+id;
  console.log(waitingSelector);
}
function closeMenuSitios(){
  menuRight.closeMenu({callback:function(){ upgrade(); }});
}
