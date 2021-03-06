/* global $:true */
/* jshint unused:false*/
//数据源 raw
//数据源格式 var raw=[{"name":"钢琴","sub": [{"name":"钢琴1","sub": [{"name":"钢琴1.1"},{"name":"钢琴1.2"}]},{"name":"钢琴2","sub": [{"name":"钢琴2.1"},{"name":"钢琴2.2"}]}],"type":0},{"name":"吉他","sub": [{"name":"吉他1","sub": [{"name":"吉他1.1"},{"name":"吉他1.2"}]}],"type":0}];
// $("#course").threePicker({title: "选择课程"},raw);
//  可不显示第三级:$("#course").threePicker({title: "选择目的地",showDistrict: false});

+ function($) {
  "use three";
  
  var defaults;
  
  $.fn.threePicker = function(params,raw) {
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

      var provinces = raw.map(function(d) {
        return d.name;
      });
      var initCities = sub(raw[0]);
      var initDistricts = sub(raw[0].sub[0]);

      var currentProvince = provinces[0];
      var currentCity = initCities[0];
      var currentDistrict = initDistricts[0];

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

      var config = {

        cssClass: "three-picker",
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
            currentProvince = newProvince;
            currentCity = newCity;
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
        } else {
          currentDistrict = p.value[2];
          params.showDistrict && (p.cols[2].values = getDistricts(p.value[0], p.cols[1].values[0]));
        }
      }
      $(this).picker(p);
    });
  };

  defaults = $.fn.threePicker.prototype.defaults = {
    showDistrict: true //是否显示地区选择
  };

}($);
