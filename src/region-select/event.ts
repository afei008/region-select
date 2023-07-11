/** @format */

import RegionSelect from '.';
import { buildColumn, setActive } from './build';

function scrollEvent() {
    const cols = document.querySelectorAll('.column');
    for (let i = 0; i < cols.length; i++) {
        const scrollBox = cols[i];

        scrollBox.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        });

        scrollBox.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        });
        /**
         * 滚动溢出
         */
        let initialPageY = 0;

        scrollBox.addEventListener('touchstart', (e: any) => {
            initialPageY = e.changedTouches[0].pageY;
        });

        scrollBox.addEventListener('touchmove', (e: any) => {
            const deltaY = e.changedTouches[0].pageY - initialPageY;
            // 禁止向上滚动溢出
            if (e.cancelable && deltaY > 0 && scrollBox.scrollTop <= 0) {
                e.preventDefault();
            }

            // 禁止向下滚动溢出
            if (
                e.cancelable &&
                deltaY < 0 &&
                scrollBox.scrollTop + scrollBox.clientHeight >=
                    scrollBox.scrollHeight
            ) {
                e.preventDefault();
            }
        });
    }
}

function registerEvent({
    onCancel,
    onConfirm,
}: {
    onCancel: () => void;
    onConfirm: () => void;
}) {
    /**
     * @description: 注册事件
     * @return {*}
     */
    document
        .querySelector('.region-btn.cancel-btn')
        ?.addEventListener('click', () => {
            onCancel();
        });
    document
        .querySelector('.region-btn.confirm-btn')
        ?.addEventListener('click', () => {
            onConfirm();
        });
    setTimeout(() => {
        scrollEvent();
    });
}

function clickItem({
    dom,
    props,
    item,
}: {
    dom: Element;
    props: RegionSelect;
    item: any;
}) {
    const { data, keyMap, regionSelect } = props;
    const parent = dom.parentElement;
    const columns = Array.prototype.slice.call(
        regionSelect?.querySelectorAll('.region-column')
    );
    const siblings = Array.prototype.slice.call(parent?.children);
    siblings.map((item) => item.classList.remove('active'));

    // 判断点击的是哪列，更改该列之后的所有列的数据
    const index = columns.findIndex((item) => item === parent);
    props.select = props.select.slice(0, index);
    setActive(props, dom, item);
    const body = regionSelect?.querySelector('.region-body');
    const d = findItem(data, dom.textContent!, keyMap);
    columns.map((_, i) => {
        if (i > index) {
            body?.removeChild(columns[i]);
        }
    });
    buildColumn({ data: d[keyMap.children], props });
}

function findItem(data: any[], key: string, keyMap: any): any {
    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        if (node[keyMap.value] === key) {
            return node;
        }
        if (node[keyMap.children]) {
            const result = findItem(node[keyMap.children], key, keyMap);
            if (result) {
                return result;
            }
        }
    }
    return null;
}

export { scrollEvent, registerEvent, clickItem };
