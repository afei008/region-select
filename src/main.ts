/** @format */

// 所有样式都通过 css 控制
import './assets/style.scss';
// import region from './assets/city';
import RegionSelect from './region-select';

// const regionSelect = new RegionSelect({
//     trigger: '#region-select',
//     data: region,
//     keyMap: {
//         id: 'code',
//         value: 'name',
//         children: 'areaList',
//     }, // 传入的数据中键的名称，默认为 id、value、children
//     init: [], // 需按省市区输入，暂不支持仅输入市或者区，如 ['广东省', '惠州市', '惠东县']、['广东省', '惠州市']
//     exclude: [], // 排除的数据，注意不要与 init 数据冲突，可输入省市区任意名称，如数据中名称有重复的则会一并过滤掉，如 ['广东省', '北京市']
//     include: [], // 仅显示的数据，权限比 exclude 高，格式同 exclude
//     onCancel: () => {
//         console.log('click cancel');
//     },
//     onConfirm: () => {
//         console.log(regionSelect.select);
//     },
// });

export default RegionSelect;
