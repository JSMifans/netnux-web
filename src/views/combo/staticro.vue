<template>
    <div class="staticro-container main-wrapper">
        <div class="header">
            <Text class="title">
                静态住宅IP
                <span class="type">普通住宅</span>
            </Text>

            <Text class="desc">选择适合您的计划。是要不可阻止且稳定的代理取得成功。</Text>
        </div>
        <div class="content">
            <div class="item">
                <div class="title">7天套餐</div>
            </div>
            <div class="item"></div>
            <div class="item active"></div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
    </div>
</template>
<style scoped lang="less">
.staticro-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
}
.header {
    height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;

    .title {
        font-size: 30px;
        font-weight: 600;
        position: relative;
    }
    .type {
        font-size: 16px;
        position: absolute;
        right: -90px;
        background-color: #f0834d;
        padding: 0 10px;
        border-radius: 4px;
        color: #fff;
    }
    .desc {
        font-size: 16px;
        color: #666;
    }
}
.content {
    flex: 1;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    .item {
        flex: 1;
        height: 600px;
        background-color: #182145;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        padding: 20px;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            height: 780px;
            margin-top: -15px;
            box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
        }

        &.active {
            height: 780px;
            margin-top: -15px;
        }
    }
    // border: 1px solid red;
}
</style>
