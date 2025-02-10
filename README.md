# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



### Tiêu đề riêng

root/
├── public/                # Tất cả các tệp tin public (index.html, favicon, images, etc.)
├── src/                   # Thư mục chứa tất cả mã nguồn
│   ├── assets/            # Tệp tin tài nguyên như hình ảnh, font, icons
│   ├── components/        # Các component React
│   ├── containers/        # Các container chứa logic và kết nối với API
│   ├── pages/             # Các trang chính của ứng dụng
│   ├── redux/             # Redux (actions, reducers, store)
│   ├── styles/            # Các tệp tin CSS, SASS, LESS hoặc Bootstrap
│   ├── utils/             # Các hàm hỗ trợ, API, lưu trữ
│   ├── App.js             # Ứng dụng chính
│   ├── index.js           # Entry point
│   ├── router.js          # Router của ứng dụng
│   └── setupTests.js      # Cấu hình cho các test
├── .gitignore             # File để git ignore các tệp tin không cần lưu trữ
├── README.md              # Hướng dẫn sử dụng
└── package.json           # Các phụ thuộc và cài đặt của dự án

### Trong thư viện

root/
├── public/
│   ├── index.html                # Tệp tin chính của trang web
│   ├── favicon.ico               # Icon của trang web
│   ├── images/                   # Thư mục chứa các hình ảnh
│   └── ...                       # Các tệp tin public khác
├── src/
│   ├── assets/
│   │   ├── fonts/                # Font chữ
│   │   ├── icons/                # Icons
│   │   └── images/               # Hình ảnh
│   ├── components/
│   │   ├── Header.js             # Component header
│   │   ├── Footer.js             # Component footer
│   │   └── ...                   # Các component khác
│   ├── containers/
│   │   ├── HomeContainer.js      # Container của trang Home
│   │   └── ...                   # Các container khác
│   ├── pages/
│   │   ├── HomePage.js           # Trang Home
│   │   ├── AboutPage.js          # Trang About
│   │   └── ...                   # Các trang khác
│   ├── redux/
│   │   ├── actions/              # Các action Redux
│   │   ├── reducers/             # Các reducer Redux
│   │   ├── store.js              # Store Redux
│   │   └── ...                   # Các tệp tin liên quan khác
│   ├── styles/
│   │   ├── App.css               # CSS chính
│   │   ├── Bootstrap.css         # Bootstrap CSS
│   │   └── ...                   # Các tệp tin CSS khác
│   ├── utils/
│   │   ├── api.js                # Các hàm gọi API
│   │   ├── helpers.js            # Các hàm hỗ trợ
│   │   └── ...                   # Các tệp tin utils khác
│   ├── App.js                    # Ứng dụng chính
│   ├── index.js                  # Entry point
│   ├── router.js                 # Router của ứng dụng
│   └── setupTests.js             # Cấu hình cho các test
├── .gitignore                    # File để git ignore các tệp tin không cần lưu trữ
├── README.md                     # Hướng dẫn sử dụng
└── package.json                  # Các phụ thuộc và cài đặt của dự án