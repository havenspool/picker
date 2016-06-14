
/* global $:true */
/* jshint unused:false*/
//数据源 raw
//数据源格式 var raw=[{"name":"钢琴","sub": [{"name":"钢琴1"},{"name":"钢琴2"}],"type":0},{"name":"吉他","sub": [{"name":"吉他1"}],"type":0}]; 
// $("#course").twoPicker({title: "选择课程"},raw);


+ function($) {
  "use two";
  
  var defaults;
  
  $.fn.twoPicker = function(params,raw) {
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

      var getSubjects = function(d) {
        for(var i=0;i< raw.length;i++) {
          if(raw[i].name === d) return sub(raw[i]);
        }
        return [""];
      };

      var getCourses = function(p, c) {
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
            
      var subjects = raw.map(function(d) {
        return d.name;
      });
      var initCourses = sub(raw[0].sub[0]);

      var currentSubject = subjects[0];
      var currentCourse = initCourses[0];

      var cols = [
          {
            values: subjects,
            cssClass: "col-subject"
          },
          {
            values: initCourses,
            cssClass: "col-course"
          }
        ];

      var config = {
        cssClass: "two-picker",
        rotateEffect: false,  //为了性能

        onChange: function (picker, values, displayValues) {
          var newSubject = picker.cols[0].value;
          var newCourse;
          if(newSubject !== currentSubject) {
            var newCourses = getSubjects(newSubject);
            newCourse = newCourses[0];
            picker.cols[1].replaceValues(newCourses);
            currentSubject = newSubject;
            currentCourse = newCourse;
            picker.updateValue();
            return;
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
          currentSubject = p.value[0];
          p.cols[1].values = getCourses(p.value[0]);
        }

        if(p.value[1]) {
          currentCourse = p.value[1];
        }
      }
      $(this).picker(p);
    });
  };
}($);
