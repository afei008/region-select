/** @format */

import RegionSelect from './index';
import formatInclude from './tree';

function excludeData(props: RegionSelect) {
    /**
     * @description: 过滤排除数据
     * @return {*}
     */
    if (!props.exclude.length) {
        return;
    }
    props.exclude = props.exclude.filter(
        (item) => !props.include.includes(item)
    );
    const fn = (data: any[]) => {
        data.forEach((item, index) => {
            if (props.exclude.includes(item[props.keyMap.value])) {
                data.splice(index, 1);
            }
            if (item[props.keyMap.children]) {
                fn(item[props.keyMap.children]);
            }
        });
    };
    fn(props.data);
}

function includeData(props: RegionSelect) {
    /**
     * @description: 过滤仅展示数据
     * @return {*}
     */
    const list = formatInclude(props);
    props.data = list;
}

export { excludeData, includeData };
