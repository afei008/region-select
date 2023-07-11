/** @format */

import RegionSelect from './index';
import { clickItem } from './event';

function setActive(props: RegionSelect, dom: Element, item: any) {
    props.select.push({
        [props.keyMap.id]: item[props.keyMap.id],
        [props.keyMap.value]: item[props.keyMap.value],
    });
    dom.classList.add('active');
}

function buildColumn({ data, props }: { data: any[]; props: RegionSelect }) {
    /**
     * @description: 构建列
     * @return {*}
     */
    if (!Array.isArray(data) || !data.length) {
        return;
    }
    const { keyMap } = props;
    const column = document.createElement('div');
    column.className = 'region-column';
    let curr: any;
    data.forEach((item: any, index: number) => {
        const dom = document.createElement('div');
        dom.className = 'region-item';
        // 如果有默认值，将对应的数据设置为选中状态，否则将第一条数据设为选中
        if (Array.isArray(props.init) && props.init.length) {
            if (props?.init?.includes(item[keyMap.value])) {
                // 选中之后清除该值，避免后续判断出错
                props.init.shift();
                // 如果有选中的值，则将该值作为父级传给下级
                curr = item;
                setActive(props, dom, item);
            }
        } else if (index === 0) {
            curr = item;
            setActive(props, dom, item);
        }
        dom.innerHTML = `${item[keyMap.value]}`;
        dom.addEventListener('click', () => {
            clickItem({ dom, props, item });
        });
        column.appendChild(dom);
    });
    const body = document.querySelector('.region-body');
    body?.appendChild(column);
    if (curr[keyMap.children]) {
        buildColumn({ data: curr[keyMap.children], props });
    }
}

function scrollColumn() {
    const columns = Array.prototype.slice.call(
        document.querySelectorAll('.region-column')
    );
    columns.forEach((column) => {
        const item = column?.querySelector('.active');
        const itemHeight = (item as HTMLElement)?.offsetHeight;
        const itemOffsetTop = (item as HTMLElement)?.offsetTop;
        column?.scrollTo({
            top: itemOffsetTop - itemHeight,
        });
    });
}

export { buildColumn, scrollColumn, setActive };
