/** @format */

import { uniqBy, sortBy } from 'lodash';
import RegionSelect from './index';

function tree2listB(data: any[], keyMap: KeyMap) {
    // 广度遍历，采用队列辅助
    const list = [];
    const queue = JSON.parse(JSON.stringify(data));
    while (queue.length) {
        const node = queue.shift();
        const children = node[keyMap.children];
        if (children) {
            children.forEach((item: any) => {
                item.pid = node[keyMap.id];
            });
            queue.push(...children);
            node[keyMap.children] = null;
        }
        list.push(node);
    }
    return list;
}

// function tree2listD(data: any[], id: string | number) {
//     // 深度遍历，采用栈辅助
//     const list = [];
//     const stack = JSON.parse(JSON.stringify(data));
//     while (stack.length) {
//         const node = stack.pop();
//         const { children } = node;
//         if (children) {
//             children.forEach((item: any) => {
//                 item.pid = node[id];
//             });
//             stack.push(...children);
//         }
//         list.push(node);
//     }
//     return list;
// }

function list2tree(list: any[], keyMap: KeyMap) {
    const [map, treeData]: any = [{}, []];

    for (let i = 0; i < list.length; i += 1) {
        map[list[i][keyMap.id]] = i;
        list[i][keyMap.children] = [];
    }

    for (let i = 0; i < list.length; i += 1) {
        const node = list[i];
        if (node.pid && list[map[node.pid]]) {
            list[map[node.pid]][keyMap.children].push(node);
        } else {
            treeData.push(node);
        }
    }
    return treeData;
}

function findParent(data: any[], list: any[], keyMap: KeyMap) {
    const res: any[] = [];
    list.forEach((item) => {
        data.forEach((fItem) => {
            if (fItem[keyMap.id] === item.pid) {
                res.push(fItem);
            }
        });
    });
    return res;
}
function findChildren(data: any[], list: any[], keyMap: KeyMap) {
    const res: any[] = [];
    list.forEach((item) => {
        data.forEach((fItem) => {
            if (fItem.pid === item[keyMap.id]) {
                res.push(fItem);
            }
        });
    });
    return res;
}

function formatInclude(props: RegionSelect) {
    // 写的很乱，仅实现了效果，待优化
    const { keyMap } = props;
    const data = tree2listB(props.data, keyMap);
    let res = data;
    if (props.include.length) {
        // 存储最终需要的结果
        const result = [];
        // 找出初始数据
        const initArr = data.filter((item) =>
            props.include.includes(item[keyMap.value])
        );
        // 初始根级
        const rootArr = initArr.filter((item) => !item.pid);
        // 最后一级
        const lastArr = initArr.filter(
            (item) => item[keyMap.children] === undefined
        );
        // 中间层级
        const otherArr = initArr.filter(
            (item) => item.pid && item[keyMap.children] === null
        );
        // 存储最终需要的结果
        result.push(...rootArr, ...otherArr, ...lastArr);
        // 存放从子级往上找到的根级
        const rootFromChild = [];
        // 存放从子级往上找到的中间层级
        const otherFromChild = [];
        // 从最后一级网上找，将其父级存放起来，若与初始数据重复，则该层级不需要再找所有子级
        if (lastArr.length) {
            otherFromChild.push(...findParent(data, lastArr, keyMap));
        }
        if (otherArr.length) {
            const ids = otherFromChild.map((item) => item[keyMap.id]);
            // 需要同时寻找上下级的
            const needAll = otherArr.filter(
                (item) => !ids.includes(item[keyMap.id])
            );
            const a = findParent(data, needAll, keyMap);
            const b = findChildren(data, needAll, keyMap);
            // 只需要寻找父级的
            const c = findParent(data, otherFromChild, keyMap);
            rootFromChild.push(...a, ...c);
            const pids = uniqBy(
                lastArr.map((item) => item.pid),
                () => null
            );
            // 排除掉在最后一级中，已指定了地区的其他数据
            const d = b.filter((item) => !pids.includes(item.pid));
            result.push(...d);
        }
        if (rootArr.length) {
            const ids = uniqBy(
                rootFromChild.map((item) => item[keyMap.id]),
                () => null
            );
            const xorArr = [...rootArr, ...rootFromChild].filter(
                (item) => !ids.includes(item[keyMap.id])
            );
            const a = findChildren(data, xorArr, keyMap);
            const b = findChildren(data, a, keyMap);
            result.push(...a, ...b);
        }
        result.push(...rootFromChild, ...otherFromChild);
        res = sortBy(uniqBy(result, keyMap.id), keyMap.id);
    }
    return list2tree(res, keyMap);
}

export default formatInclude;
