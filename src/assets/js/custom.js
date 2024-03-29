if(location.pathname==="/dashboard" || location.pathname==="/historiqueWater" || location.pathname==="/historiqueWeight" ) {
  $(function() {
    "use strict";
    const usernameSession = $('#usernameSession').val();
    const seriesPoidsArray = [];
    const labelsArray = [];

    const labelArraySparkline = [];
    const seriesImcArray = [];
    const caloriesArray = [];
    const sommeilArray = [];
    const waterArray = [];
    let avgCalories = 0;
    let avgSommeil = 0;
    let avgWater = 0;

    // Récupération des WELL BEING
    $.get( 'http://localhost:5000/wellBeing/' + usernameSession, function( data ) {

      $.each(JSON.parse(data).well_being, function(k, v) {
        //console.log(k,v)
        seriesPoidsArray.push(v.weight);
        labelsArray.push(v.date);
        seriesImcArray.push(v.imc);
      });
      //ct-poids
      new Chartist.Line('#ct-poids', {
        labels: labelsArray,
        series:
          [seriesPoidsArray]
      }, {
        showPoint: true,
        fullWidth: true,
        plugins: [
          Chartist.plugins.tooltip()
        ],
        axisY: {
          labelInterpolationFnc: function (value) {
            return (value) + 'kg';
          }
        },
        axisX: {
          labelInterpolationFnc: function (value) {
            return (new Date(value).toLocaleDateString());
          }
        },
        showArea: true
      });

      // ct-poids
      new Chartist.Line('#ct-imc', {
        labels: labelsArray,
        series:
          [seriesImcArray]
      }, {
        showPoint: true,
        fullWidth: true,
        plugins: [
          Chartist.plugins.tooltip()
        ],
        axisY: {
          labelInterpolationFnc: function (value) {
            return (value) + '%';
          }
        },
        axisX: {
          labelInterpolationFnc: function (value) {
            return (new Date(value).toLocaleDateString());
          }
        },
        showArea: true
      });

    });

    var chart = [chart];

    $.get(`http://localhost:5000/wellBeing/${usernameSession}/stats`, function (data) {
      let counter = 1;
      $.each(JSON.parse(data).well_being_stats, function(k, v) {
        //console.log(k,v)
        if(counter===6){
          return false;
        }
        labelArraySparkline.push(v.date);
        caloriesArray.push(v.calories);
        sommeilArray.push(v.sleep);
        waterArray.push(v.water);
        counter++;
      });
      $.each(JSON.parse(data).well_being_avg, function(k, v) {
        avgCalories = v.avgCalories;
        avgSommeil = v.avgSleep;
        avgWater = v.avgWater;
      });

      $("#avgCalories").text( avgCalories != null ? avgCalories + ' Kcal' : 0 + ' Kcal');
      $("#avgSommeil").text( avgSommeil != null ? avgSommeil + 'h' : 0 + 'h');
      $("#avgWater").text( avgWater != null ? avgWater + 'L' : 0 + 'L');
    });

    var sparklineLogin = function () {
      var dataCalories = {
        labels: labelArraySparkline,
        series: [caloriesArray]
      };
      var options = {
        axisX: {
          labelInterpolationFnc: function (value) {
            let strDate = new Date(value).toLocaleDateString();
            let arrayDate = strDate.split("/");
            return arrayDate[0] + '/' + arrayDate[1];
          }
        },

      };
      new Chartist.Bar('#sparkLineCalories', dataCalories, options);

      var dataSommeil = {
        labels: labelArraySparkline,
        series: [sommeilArray]
      };
      new Chartist.Bar('#sparkLineSommeil', dataSommeil, options);

      var dataWater = {
        labels: labelArraySparkline,
        series: [waterArray]
      }
      new Chartist.Bar("#sparkLineWater", dataWater, options)
    }
    var sparkResize;
    $(window).on("resize", function (e) {
      clearTimeout(sparkResize);
      sparkResize = setTimeout(sparklineLogin, 500);
    });
    sparklineLogin();


    $(".preloader").fadeOut();
    // this is for close icon when navigation open in mobile view
    $(".nav-toggler").on('click', function() {

      $("#main-wrapper").toggleClass("show-sidebar");
      $(".nav-toggler i").toggleClass("ti-menu");
    });
    $(".search-box a, .search-box .app-search .srh-btn").on('click', function() {
      $(".app-search").toggle(200);
      $(".app-search input").focus();

    });

    // ==============================================================
    // Resize all elements
    // ==============================================================
    $("body, .page-wrapper").trigger("resize");
    $(".page-wrapper").delay(20).show();

    //****************************
    /* This is for the mini-sidebar if width is less then 1170*/
    //****************************
    var setsidebartype = function() {

      var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
      if (width < 1170) {
        $("#main-wrapper").attr("data-sidebartype", "mini-sidebar");
      } else {
        $("#main-wrapper").attr("data-sidebartype", "full");
      }

    };
    $(window).ready(setsidebartype);
    $(window).on("resize", setsidebartype);


  });
}
