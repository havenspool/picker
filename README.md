# picker

//数据源 raw

two-picker 二级选择
<script src="./two-picker.js"></script>
//数据源格式 var raw=[{"name":"钢琴","sub": [{"name":"钢琴1"},{"name":"钢琴2"}],"type":0},{"name":"吉他","sub": [{"name":"吉他1"}],"type":0}]; 
// $("#course").twoPicker({title: "选择课程"},raw);


three-picker 三级选择
<script src="./three-picker.js"></script>
//数据源格式 var raw=[{"name":"钢琴","sub": [{"name":"钢琴1","sub": [{"name":"钢琴1.1"},{"name":"钢琴1.2"}]},{"name":"钢琴2","sub": [{"name":"钢琴2.1"},{"name":"钢琴2.2"}]}],"type":0},{"name":"吉他","sub": [{"name":"吉他1","sub": [{"name":"吉他1.1"},{"name":"吉他1.2"}]}],"type":0}];
// $("#course").threePicker({title: "选择课程"},raw);
//  可不显示第三级:$("#course").threePicker({title: "选择目的地",showDistrict: false});


four-picker 四级选择
<script src="./four-picker.js"></script>
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
