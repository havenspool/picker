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
