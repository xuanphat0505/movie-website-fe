# Movie Website - Client

Frontend application cho website xem phim, được xây dựng với React, Vite và TailwindCSS.

## 🚀 Công nghệ sử dụng

- **React 18** - UI Library
- **Vite** - Build tool & Dev server
- **Redux Toolkit** - State management
- **React Router v7** - Routing
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **Plyr** - Video player
- **Socket.IO Client** - Real-time communication
- **Swiper** - Carousel/Slider
- **React Toastify** - Notifications
- **Lucide React** - Icons

## 📋 Yêu cầu hệ thống

- Node.js >= 16.x
- npm hoặc yarn

## 🔧 Cài đặt

1. Clone repository và di chuyển vào thư mục client:

```bash
cd client
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Tạo file `.env` và cấu hình các biến môi trường:

```env
VITE_API_URL=http://localhost:5000/api/v1
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret
```

4. Khởi chạy development server:

```bash
npm run dev
```

Application sẽ chạy tại `http://localhost:5173`

## 📁 Cấu trúc thư mục

```
client/
├── public/               # Static files
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable components
│   ├── config/          # Configuration files
│   ├── contexts/        # React Context providers
│   │   ├── OpenContext.jsx
│   │   ├── FavoritesContext.jsx
│   │   ├── WatchHistoryContext.jsx
│   │   ├── PlayListContext.jsx
│   │   ├── CommentContext.jsx
│   │   └── RateContext.jsx
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── MovieDetail/
│   │   ├── PlayMovie/
│   │   ├── FilterMovies.jsx
│   │   ├── MovieCategory.jsx
│   │   ├── TypeMovie.jsx
│   │   ├── TypesPage.jsx
│   │   ├── ChangePassword.jsx
│   │   └── User/
│   ├── redux/           # Redux store & slices
│   ├── shared/          # Shared utilities
│   ├── App.jsx          # Main App component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # TailwindCSS configuration
├── package.json
└── README.md
```

## 🎯 Tính năng chính

### 🎬 Xem phim

- Video player tùy chỉnh với Plyr
- Chọn tập phim (cho phim bộ)
- Tự động lưu thời điểm xem
- Tiếp tục xem tại thời điểm đã dừng trước đó

### 👤 Quản lý người dùng

- Đăng ký / Đăng nhập
- Đăng nhập với Google OAuth
- Quản lý profile
- Đổi mật khẩu
- Quên mật khẩu

### ❤️ Yêu thích & Playlist

- Thêm phim vào danh sách yêu thích
- Tạo và quản lý playlist
- Lịch sử xem phim
- Đồng bộ dữ liệu với server

### 💬 Tương tác

- Comment và thảo luận
- Đánh giá phim (rating)
- Chia sẻ phim lên mạng xã hội
- Thông báo real-time

### 🔍 Tìm kiếm & Lọc

- Tìm kiếm phim theo tên
- Lọc theo thể loại
- Lọc theo quốc gia
- Lọc theo năm phát hành
- Sắp xếp theo nhiều tiêu chí

### 📱 Responsive Design

- Tối ưu cho mobile, tablet, desktop
- Dark mode
- UI/UX thân thiện

## 🎨 UI Components

### Core Components

- Header / Navigation
- Footer
- Sidebar
- Movie Card
- Video Player
- Comment Section
- Rating Component
- Search Bar
- Filter Panel

### Shared Components

- Button
- Input
- Modal
- Dropdown
- Skeleton Loader
- Toast Notifications
- Carousel/Slider

## 🔐 Authentication Flow

1. User đăng ký/đăng nhập
2. Nhận access token & refresh token
3. Token được lưu trong Redux store (persist)
4. Tự động refresh token khi hết hạn
5. Protected routes cho các trang yêu cầu auth

## 📦 State Management

### Redux Store

- **auth**: User authentication state
- **user**: User profile & preferences
- **movies**: Movies data & cache
- **favorites**: Favorite movies
- **history**: Watch history
- **playlists**: User playlists
- **comments**: Comments data
- **ratings**: Movie ratings

### Context API

- OpenContext: Modal & drawer states
- FavoritesContext: Favorites management
- WatchHistoryContext: History tracking
- PlayListContext: Playlist operations
- CommentContext: Comment handling
- RateContext: Rating management

## 🎬 Video Player Features

- Play/Pause
- Volume control
- Fullscreen mode
- Picture-in-Picture
- Playback speed control
- Quality selection
- Keyboard shortcuts
- Progress bar with preview
- Auto-play next episode

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

## 🛠️ Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Styling

Project sử dụng TailwindCSS với Prettier plugin để format code:

- Utility-first CSS
- Custom theme configuration
- Dark mode support
- Responsive design utilities

## 🔌 API Integration

Client giao tiếp với backend qua REST API và Socket.IO:

- Axios interceptors cho authentication
- Automatic token refresh
- Error handling
- Loading states
- Real-time updates với Socket.IO

## 🚀 Build & Deploy

### Build cho production:

```bash
npm run build
```

Output sẽ được tạo trong thư mục `dist/`

### Deploy lên Netlify:

1. Connect repository với Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables
5. Deploy!

### Environment Variables trên Netlify:

```
VITE_API_URL=https://your-api-url.com/api/v1
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🎯 Performance Optimization

- Code splitting với React.lazy()
- Image lazy loading
- Virtual scrolling cho danh sách dài
- Memoization với React.memo
- Debounce cho search input
- Redux persist cho offline support
- Service Worker (nếu có)

## 🐛 Debug

### Development tools:

- React DevTools
- Redux DevTools
- Network tab (Chrome DevTools)
- Console logging

### Common issues:

- Clear browser cache nếu gặp lỗi sau khi update
- Check CORS configuration nếu API không hoạt động
- Verify environment variables

## 📚 Libraries Documentation

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Plyr](https://plyr.io/)
- [HLS.js](https://github.com/video-dev/hls.js/)
- [Swiper](https://swiperjs.com/)

## 🤝 Contributing

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

ISC

## 👥 Author

Phát Trần

## 📞 Support

Email: phattran052004@gmail.com
