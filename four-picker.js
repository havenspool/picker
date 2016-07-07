/* global $:true */
/* jshint unused:false*/
//数据源 raw
//数据源格式 
//    var raw=[{"name":"广东","sub": 
//    [{"name":"广州市","sub": [
//    {"name":"天河区","sub": [{"name":"广州市天河区第一琴行"},{"name":"广州市天河区第二"}]},
//    {"name":"番禺区","sub": [{"name":"广州市番禺区第三琴行"},{"name":"广州市番禺区第四"}]}
//    ]},
//    {"name":"佛山市","sub": [
//    {"name":"高明区","sub": [{"name":"高明区第五琴行"},{"name":"高明区第八"}]},
//    {"name":"南海区","sub": [{"name":"南海区第三琴行"},{"name":"南海区第四"}]}
//    ]}],"type":0},           
//    {"name":"北京","sub":[
//    {"name":"北京市","sub": [
//    {"name":"东城区","sub": [{"name":"东城区第一琴行"},{"name":"东城区第二"}]},
//    {"name":"西城区","sub": [{"name":"西城区第三琴行"},{"name":"西城区第四"}]}
//    ]}],"type":0}]; 
// $("#course").fourPicker({title: "选择课程"},raw);
//  可不显示第三级,第四级:$("#course").fourPicker({title: "选择目的地",showDistrict: false,showFour: false});

+ function($) {
  "use fourPicker";
  
  var defaults;
  
  $.fn.fourPicker = function(params,raw) {
    params = $.extend({}, defaults, params);
    return this.each(function() {

      var format = function(data) {
        var result = [];
        for(var i=0;i<data.length;i++) {
          var d = data[i];
          if(d.name === "请选择") continue;
          result.push(d.name);
        }
        if(result.length) return result;
        return [""];
      };

      var sub = function(data) {
        if(!data.sub) return [""];
        return format(data.sub);
      };

      var getCities = function(d) {
        for(var i=0;i< raw.length;i++) {
          if(raw[i].name === d) return sub(raw[i]);
        }
        return [""];
      };

      var getDistricts = function(p, c) {
        for(var i=0;i< raw.length;i++) {
          if(raw[i].name === p) {
            for(var j=0;j< raw[i].sub.length;j++) {
              if(raw[i].sub[j].name === c) {
                return sub(raw[i].sub[j]);
              }
            }
          }
        }
        return [""];
      };
	  
      var getFour = function(p, c,d) {
        for(var i=0;i< raw.length;i++) {
          if(raw[i].name === p) {
            for(var j=0;j< raw[i].sub.length;j++) {
              if(raw[i].sub[j].name === c) {
				  for(var k=0;k< raw[i].sub[j].sub.length;k++){
  				  	 if(raw[i].sub[j].sub[k].name === d){
	                    return sub(raw[i].sub[j].sub[k]);
				  	 }
				  }
              }
            }
          }
        }
        return [""];
      };

      var provinces = raw.map(function(d) {
        return d.name;
      });
      var initCities = sub(raw[0]);
      var initDistricts = sub(raw[0].sub[0]);
      var initFour = sub(raw[0].sub[0].sub[0]);  

      var currentProvince = provinces[0];
      var currentCity = initCities[0];
      var currentDistrict = initDistricts[0];
      var currentFour = initFour[0]; 

      var cols = [
          {
            values: provinces,
            cssClass: "col-province"
          },
          {
            values: initCities,
            cssClass: "col-city"
          }
        ];

        if(params.showDistrict) cols.push({
          values: initDistricts,
          cssClass: "col-district"
        });
		
        if(params.showFour) cols.push({
          values: initFour,
          cssClass: "col-four"
        });

      var config = {
        cssClass: "four-picker",
        rotateEffect: false,  //为了性能

        onChange: function (picker, values, displayValues) {
          var newProvince = picker.cols[0].value;
          var newCity;
          if(newProvince !== currentProvince) {
            var newCities = getCities(newProvince);
            newCity = newCities[0];
            var newDistricts = getDistricts(newProvince, newCity);
            picker.cols[1].replaceValues(newCities);
            if(params.showDistrict) picker.cols[2].replaceValues(newDistricts);
            var newFour = getFour(newProvince, newCity,newDistricts);
            picker.cols[2].replaceValues(newDistricts);
            if(params.showFour) picker.cols[3].replaceValues(newFour);
            currentProvince = newProvince;
            currentCity = newCity;
		    currentDistrict = newDistricts;
            picker.updateValue();
            return;
          }
          if(params.showDistrict) {
            newCity = picker.cols[1].value;
            if(newCity !== currentCity) {
              picker.cols[2].replaceValues(getDistricts(newProvince, newCity));
              currentCity = newCity;
              picker.updateValue();
            }
          }
		  
        if(params.showFour) {
            newDistricts = picker.cols[2].value;
            if(newDistricts !== currentDistrict) {
              picker.cols[3].replaceValues(getFour(newProvince, newCity,newDistricts));
              currentDistrict = newDistricts;
              picker.updateValue();
            }
          }
        },

        cols: cols
      };

      if(!this) return;
      var p = $.extend(config, params);
      //计算value
      var val = $(this).val();
      if(val) {
        p.value = val.split(" ");
        if(p.value[0]) {
          currentProvince = p.value[0];
          p.cols[1].values = getCities(p.value[0]);
        }

        if(p.value[1]) {
          currentCity = p.value[1];
          params.showDistrict && (p.cols[2].values = getDistricts(p.value[0], p.value[1]));
        } if(p.value[2]) {
          currentDistrict = p.value[2];
          params.showDistrict && (p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0]));
        } else {
          currentFour = p.value[3];
          params.showFour && (p.cols[3].values = getFour(p.value[0], p.cols[1].values[0],p.cols[2].values[0]));
        }
      }
      $(this).picker(p);
    });
  };

  defaults = $.fn.fourPicker.prototype.defaults = {
    showDistrict: true, //是否显示地区选择
	  showFour: true //是否显示第四项选择
  };

}($);
