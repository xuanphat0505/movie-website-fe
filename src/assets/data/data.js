import { FaHeart, FaPlus, FaUser, FaRightFromBracket } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";


export const subMenu = [
  {
    color: "rgb(150, 22, 209)",
    title: "Phim lẻ",
    path: "phim-le",
  },
  {
    color: "rgb(116, 45, 75)",
    title: "Phim bộ",
    path: "phim-bo",
  },
  {
    color: "rgb(37, 187, 132)",
    title: "Hoạt hình",
    path: "hoat-hinh",
  },
  {
    color: "rgb(115, 86, 177)",
    title: "Phim Vietsub",
    path: "phim-vietsub",
  },
];

export const typeList = [
  {
    title: "phim bộ",
    path: "phim-bo",
    color: "rgb(116, 45, 75)",
  },
  {
    title: "phim lẻ",
    path: "phim-le",
    color: "rgb(150, 22, 209)",
  },
  {
    title: "tv shows",
    path: "tv-shows",
    color: "rgb(111, 32, 208)",
  },
  {
    title: "hoạt hình",
    path: "hoat-hinh",
    color: "rgb(37, 187, 132)",
  },
  {
    title: "phim vietsub",
    path: "phim-vietsub",
    color: "rgb(115, 86, 177)",
  },
  {
    title: "phim thuyết minh",
    path: "phim-thuyet-minh",
    color: "rgb(33, 138, 143)",
  },
  {
    title: "phim lồng tiếng",
    path: "phim-long-tieng",
    color: "rgb(169, 135, 98)",
  },
];

export const footerSocials = [
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253296/telegram-icon_whex9w.svg",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253304/x-icon_alim22.svg",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253352/facebook-icon_hrfqyq.svg",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253297/tiktok-icon_vug9bm.svg",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253302/youtube-icon_l2u4xv.svg",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253299/threads-icon_bnbdhh.svg",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253354/instagram-icon_fea3fr.svg",
  },
];

export const filterCategory = [
  {
    name: "Quốc gia",
    categories: [
      { name: "Tất cả", slug: "" },
      {
        name: "Việt Nam",
        slug: "viet-nam",
      },
      {
        name: "Trung Quốc",
        slug: "trung-quoc",
      },
      {
        name: "Thái Lan",
        slug: "thai-lan",
      },
      {
        name: "Hồng Kông",
        slug: "hong-kong",
      },
      {
        name: "Pháp",
        slug: "phap",
      },
      {
        name: "Đức",
        slug: "duc",
      },
      {
        name: "Hà Lan",
        slug: "ha-lan",
      },
      {
        name: "Mexico",
        slug: "mexico",
      },
      {
        name: "Thụy Điển",
        slug: "thuy-dien",
      },
      {
        name: "Philippines",
        slug: "philippines",
      },
      {
        name: "Đan Mạch",
        slug: "dan-mach",
      },
      {
        name: "Thụy Sĩ",
        slug: "thuy-si",
      },
      {
        name: "Ukraina",
        slug: "ukraina",
      },
      {
        name: "Hàn Quốc",
        slug: "han-quoc",
      },
      {
        name: "Âu Mỹ",
        slug: "au-my",
      },
      {
        name: "Ấn Độ",
        slug: "an-do",
      },
      {
        name: "Canada",
        slug: "canada",
      },
      {
        name: "Tây Ban Nha",
        slug: "tay-ban-nha",
      },
      {
        name: "Indonesia",
        slug: "indonesia",
      },
      {
        name: "Ba Lan",
        slug: "ba-lan",
      },
      {
        name: "Malaysia",
        slug: "malaysia",
      },
      {
        name: "Bồ Đào Nha",
        slug: "bo-dao-nha",
      },
      {
        name: "UAE",
        slug: "uae",
      },
      {
        name: "Châu Phi",
        slug: "chau-phi",
      },
      {
        name: "Ả Rập Xê Út",
        slug: "a-rap-xe-ut",
      },
      {
        name: "Nhật Bản",
        slug: "nhat-ban",
      },
      {
        name: "Đài Loan",
        slug: "dai-loan",
      },
      {
        name: "Anh",
        slug: "anh",
      },
      {
        name: "Quốc Gia Khác",
        slug: "quoc-gia-khac",
      },
      {
        name: "Thổ Nhĩ Kỳ",
        slug: "tho-nhi-ky",
      },
      {
        name: "Nga",
        slug: "nga",
      },
      {
        name: "Úc",
        slug: "uc",
      },
      {
        name: "Brazil",
        slug: "brazil",
      },
      {
        name: "Ý",
        slug: "y",
      },
      {
        name: "Na Uy",
        slug: "na-uy",
      },
    ],
  },
  {
    name: "Thể loại",
    categories: [
      {
        name: "Hành Động",
        slug: "hanh-dong",
      },
      {
        name: "Miền Tây",
        slug: "mien-tay",
      },
      {
        name: "Trẻ Em",
        slug: "tre-em",
      },
      {
        name: "Lịch Sử",
        slug: "lich-su",
      },
      {
        name: "Cổ Trang",
        slug: "co-trang",
      },
      {
        name: "Chiến Tranh",
        slug: "chien-tranh",
      },
      {
        name: "Viễn Tưởng",
        slug: "vien-tuong",
      },
      {
        name: "Kinh Dị",
        slug: "kinh-di",
      },
      {
        name: "Tài Liệu",
        slug: "tai-lieu",
      },
      {
        name: "Bí Ẩn",
        slug: "bi-an",
      },
      {
        name: "Phim 18+",
        slug: "phim-18",
      },
      {
        name: "Tình Cảm",
        slug: "tinh-cam",
      },
      {
        name: "Tâm Lý",
        slug: "tam-ly",
      },
      {
        name: "Thể Thao",
        slug: "the-thao",
      },
      {
        name: "Phiêu Lưu",
        slug: "phieu-luu",
      },
      {
        name: "Âm Nhạc",
        slug: "am-nhac",
      },
      {
        name: "Gia Đình",
        slug: "gia-dinh",
      },
      {
        name: "Học Đường",
        slug: "hoc-duong",
      },
      {
        name: "Hài Hước",
        slug: "hai-huoc",
      },
      {
        name: "Hình Sự",
        slug: "hinh-su",
      },
      {
        name: "Võ Thuật",
        slug: "vo-thuat",
      },
      {
        name: "Khoa Học",
        slug: "khoa-hoc",
      },
      {
        name: "Thần Thoại",
        slug: "than-thoai",
      },
      {
        name: "Chính Kịch",
        slug: "chinh-kich",
      },
      {
        name: "Kinh Điển",
        slug: "kinh-dien",
      },
    ],
  },
  {
    name: "Năm sản xuất",
    categories: [
      { name: "Tất cả", slug: "" },
      { name: "2025", slug: "2025" },
      { name: "2024", slug: "2024" },
      { name: "2023", slug: "2023" },
      { name: "2022", slug: "2022" },
      { name: "2021", slug: "2021" },
      { name: "2020", slug: "2020" },
      { name: "2019", slug: "2019" },
      { name: "2018", slug: "2018" },
      { name: "2017", slug: "2017" },
      { name: "2016", slug: "2016" },
      { name: "2015", slug: "2015" },
      { name: "2014", slug: "2014" },
      { name: "2013", slug: "2013" },
      { name: "2012", slug: "2012" },
      { name: "2011", slug: "2011" },
      { name: "2010", slug: "2010" },
      { name: "2009", slug: "2009" },
      { name: "2008", slug: "2008" },
      { name: "2007", slug: "2007" },
      { name: "2006", slug: "2006" },
      { name: "2005", slug: "2005" },
      { name: "2004", slug: "2004" },
      { name: "2003", slug: "2003" },
      { name: "2002", slug: "2002" },
      { name: "2001", slug: "2001" },
      { name: "2000", slug: "2000" },
      { name: "1999", slug: "1999" },
      { name: "1998", slug: "1998" },
      { name: "1997", slug: "1997" },
      { name: "1996", slug: "1996" },
      { name: "1995", slug: "1995" },
      { name: "1994", slug: "1994" },
      { name: "1993", slug: "1993" },
      { name: "1992", slug: "1992" },
      { name: "1991", slug: "1991" },
      { name: "1990", slug: "1990" },
      { name: "1989", slug: "1989" },
      { name: "1988", slug: "1988" },
      { name: "1987", slug: "1987" },
      { name: "1986", slug: "1986" },
      { name: "1985", slug: "1985" },
      { name: "1984", slug: "1984" },
      { name: "1983", slug: "1983" },
      { name: "1982", slug: "1982" },
      { name: "1981", slug: "1981" },
      { name: "1980", slug: "1980" },
      { name: "1979", slug: "1979" },
      { name: "1978", slug: "1978" },
      { name: "1977", slug: "1977" },
      { name: "1976", slug: "1976" },
      { name: "1975", slug: "1975" },
      { name: "1974", slug: "1974" },
      { name: "1973", slug: "1973" },
      { name: "1972", slug: "1972" },
      { name: "1971", slug: "1971" },
      { name: "1970", slug: "1970" },
    ],
  },
];

export const dialogIcons = [
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253352/facebook-icon_hrfqyq.svg",
    color: "#4267B2",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253304/x-icon_alim22.svg",
    color: "#000000",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253296/telegram-icon_whex9w.svg",
    color: "#0088cc",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253291/reddit_mjjxir.svg",
    color: "#ff4500",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253422/messenger_xgo6bn.svg",
    color: "#448AFF",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253293/sharethis_bcbqgu.svg",
    color: "#95D03A",
  },
];

export const rateIcons = [
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253187/rate-1_om7rph.webp",
    text: "dở tệ",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253188/rate-2_elch9b.webp",
    text: "phim chán",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253189/rate-3_ddkkuw.webp",
    text: "khá ổn",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253191/rate-5_xdxygb.webp",
    text: "phim hay",
  },
  {
    icon: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745253192/rate-4_exgqzh.webp",
    text: "quá tuyệt",
  },
];

export const userTab = [
  {
    icon: FaHeart,
    title: "Yêu thích",
    path: "/user-profile/favorite",
  },
  {
    icon: FaPlus,
    title: "Danh sách",
    path: "/user-profile/list",
  },
  {
    icon: FaHistory,
    title: "Xem tiếp",
    path: "/user-profile/watch-later",
  },
  {
    icon: FaUser,
    title: "Tài khoản",
    path: "/user-profile/account",
  },
  {
    icon: FaRightFromBracket,
    title: "Đăng xuất",
    path: "#",
  },
];

export const avatarList = [
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252587/01_odv3vg.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252587/02_lyxfhg.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252587/03_qiwlk8.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252587/04_qk9eke.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252587/05_k1t4nk.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252587/06_g2ke5j.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252587/07_oseoch.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252587/08_c7bgum.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252589/09_cokzwf.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252591/10_dbtkau.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252592/11_i12gux.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252592/12_hx23fo.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252593/13_chpylg.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252593/14_jhfctu.jpg",
  },
  {
    avatar: "https://res.cloudinary.com/djmeybzjk/image/upload/v1745252594/15_yym3nq.jpg",
  },
];

export const hotTypes = [
  {
    type: "chính kịch",
    trend: "normal",
    color: "rgb(116, 45, 75)",
  },
  {
    type: "tâm lý",
    trend: "up",
    color: "#387fda",
  },
  {
    type: "tình cảm",
    trend: "down",
    color: "#7356b1",
  },
  {
    type: "lãng mạn",
    trend: "normal",
    color: "#91ab47",
  },
  {
    type: "hài",
    trend: "normal",
    color: "#a98762",
  },
  {
    type: "hành động",
    trend: "up",
    color: "#218a8f",
  },
  {
    type: "hình sự",
    trend: "up",
    color: "#9616d1",
  },
  {
    type: "bí ẩn",
    trend: "normal",
    color: "#c9512c",
  },
  {
    type: "phiêu lưu",
    trend: "down",
    color: "#616994",
  },
  {
    type: "gây cấn",
    trend: "normal",
    color: "#ad4c68",
  },
];
