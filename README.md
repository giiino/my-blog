# 個人部落格

網站0成本開發，使用免費serverless部屬、firebase免費方案，內容主用於紀錄學習筆記，目前僅供自己查看

## 功能介紹
使用 **markdown** 進行內容展示
![image](https://github.com/giiino/my-blog/assets/52125591/efec96b5-9620-44d3-bb24-f2c0a0f38990)

透過github三方認證登入後，檢查是否有管理權限，擁有者則可以進行文章編輯、刪除
![image](https://github.com/giiino/my-blog/assets/52125591/1434a742-296e-464c-9223-939b023a3f0f)

## 資料夾結構
  ```
  ├── src/
  │    ├── db 
  │    ├── features
  │    ├── layout
  │    ├── pages
  │    ├── styles
  │    └── shared/
  │         ├── components
  │         ├── constants
  │         ├── hooks
  │         ├── lib
  │         ├── providers
  │         ├── services
  │         ├── store 
  │         ├── types 
  │         ├── utils 
  │         └── HOC
```
1. `/db` : 主存放db初始化設定
2. `/features` : 主針對功能模組進行拆分
3. `/layout` : 存放全局app版型
4. `/pages` : 本地API、SSR、SSG頁面
5. `/styles` : 全局樣式
6. `/shared/components` : 全局組件
7. `/shared/constants` : 全局可用常數
8. `/shared/hooks` : 全局可用custom hook
9. `/shared/lib` : 全局可用二次封裝套件
10. `/shared/providers` : 全局provider
11. `/shared/services` : 全局外部資源服務
12. `/shared/store` : 全局狀態管理
13. `/shared/types` : 全局類型
14. `/shared/utils` : 全局工具
15. `/shared/HOC` : 全局組件專用高階函數

## 啟用指令
正式環境
```
docker-compose up -d --remove-orphans
```
開發環境
```
npm run dev
```

## 功能開發紀錄
- [ ] 留言功能
- [ ] 分類排序功能
- [ ] 草稿文章模式
- [ ] 熱門文章section
- [ ] 綁定正式域名、上搜索引擎

## 重要commit記錄
- 2023/07/17 專案展開 
- 2024/03/15 mogodb + typeorm 轉為 firebase
