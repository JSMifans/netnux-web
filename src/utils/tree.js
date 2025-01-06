/**
 * 将扁平数组转换为树形结构，并按照 sort 字段排序
 * @param {Array} items 扁平数组
 * @param {String|Number} parentId 父级ID
 * @param {String} idKey ID字段名
 * @param {String} parentKey 父级ID字段名
 * @returns {Array} 排序后的树形数组
 */
export function arrayToTree(items, parentId = 0, idKey = 'id', parentKey = 'parentId') {
    // 获取当前父级下的所有子项
    const children = items
        .filter((item) => item[parentKey] === parentId)
        // 按照 sort 字段排序，如果 sort 相同则按照 id 排序
        .sort((a, b) => {
            if (a.sort === b.sort) {
                return a[idKey] - b[idKey]
            }
            return a.sort - b.sort
        })

    // 递归处理每个子项的子级
    return children.map((item) => {
        // 递归获取子级
        const subChildren = arrayToTree(items, item[idKey], idKey, parentKey)

        // 如果有子级，添加到 children 字段
        if (subChildren.length) {
            item.children = subChildren
        }

        return item
    })
}
