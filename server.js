const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();
const port = 5000;

// 로그인 정보 저장
const users = [
  {
    id: 1,
    username: "윤영선",
    password: "0000",
    nickname: "yys",
    email: "yys@example.com",
    sessions: [{ session_info: "드럼" }],
  },
  {
    id: 2,
    username: "김시은",
    password: "1111",
    nickname: "kse",
    email: "kse@example.com",
    sessions: [{ session_info: "기타" }],
  },
];

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// 로그인 API
app.post("/dailband/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    req.session.userId = user.id;
    res.status(200).json({ message: "Login successful", userId: user.id });
  } else {
    res
      .status(401)
      .json({ message: "Unauthorized: Invalid username or password" });
  }
});

// 프로필 조회 API
app.get("/dailband/user/:user_id/profile", (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// 프로필 수정 API
app.put("/dailband/user/:user_id/profile", (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex !== -1) {
    const updatedUser = {
      ...users[userIndex],
      ...req.body,
    };
    users[userIndex] = updatedUser;
    res.status(200).json({ message: "Profile updated successfully" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// 스크랩한 공연 정보 API
app.get("/dailband/user/:user_id/scraps/myperformances", (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    // 예제 데이터
    const scrapPerformances = [
      {
        performance_id: 1,
        title: "블랙테트라",
        image_path: "path/to/image1.png",
      },
      {
        performance_id: 2,
        title: "[서울과기대/개망나니] 개그 공연",
        image_path: "path/to/image2.jpg",
      },
    ];
    res.status(200).json({ scrap_performance: scrapPerformances });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// 스크랩한 게시글 정보 API
app.get("/dailband/user/:user_id/scraps/posts", (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    // 예제 데이터
    const scrapPosts = [
      {
        post: {
          post_id: 1,
          title: "세션 게시판",
          content:
            "키보드 악보 연주하려고 하는데 중급자를 위한 곡을 추천해주세요",
          nickname: user.nickname,
          created_at: "2024.05.17",
        },
      },
      {
        post: {
          post_id: 2,
          title: "세션 게시판",
          content: "보컬 노래 연습 영상입니다",
          nickname: user.nickname,
          created_at: "2024.05.18",
        },
      },
    ];
    res.status(200).json({ scrap_post: scrapPosts });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// 내가 쓴 글 데이터
const userPosts = {
  1: [
    {
      post_id: 1,
      title: "첫 번째 글",
      content: "첫 번째 글의 내용",
      nickname: "yys",
      board_id: 1,
      created_at: "2024.05.17",
      file_url: "",
    },
    {
      post_id: 2,
      title: "두 번째 글",
      content: "두 번째 글의 내용",
      nickname: "yys",
      board_id: 1,
      created_at: "2024.05.18",
      file_url: "",
    },
  ],
  2: [
    {
      post_id: 3,
      title: "세 번째 글",
      content: "세 번째 글의 내용",
      nickname: "kse",
      board_id: 2,
      created_at: "2024.06.01",
      file_url: "",
    },
    {
      post_id: 4,
      title: "네 번째 글",
      content: "네 번째 글의 내용",
      nickname: "kse",
      board_id: 2,
      created_at: "2024.06.02",
      file_url: "",
    },
  ],
};

// 내가 쓴 글 조회 API
app.get("/dailband/user/:user_id/posts", (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const posts = userPosts[userId];

  if (posts) {
    res.status(200).json({ posts });
  } else {
    res.status(400).json({ message: "Bad Request" });
  }
});

// 내가 쓴 글 삭제 API
app.delete("/dailband/user/:user_id/posts/:post_id", (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const postId = parseInt(req.params.post_id, 10);
  const userPostList = userPosts[userId];

  if (userPostList) {
    const postIndex = userPostList.findIndex((p) => p.post_id === postId);
    if (postIndex !== -1) {
      userPostList.splice(postIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

// 공연 정보 데이터
const userPerformances = {
  1: [
    {
      performance_id: 1,
      title: "스튜디오에이 5월 단독 공연",
      date: "2024.05.24",
      time: "19:00",
      venue: "Main Hall",
      total_seats: 200,
      current_seats: 150,
      image_path: "/img/performance1.jpg",
    },
    {
      performance_id: 2,
      title: "메이데이 : 2024 밴드 연합공연",
      date: "2024.05.17",
      time: "18:00",
      venue: "Grand Theater",
      total_seats: 150,
      current_seats: 120,
      image_path: "/img/performance2.jpg",
    },
    {
      performance_id: 3,
      title: "2024학년도 1학기 SETTLER 정기 공연",
      date: "2024.05.25",
      time: "17:30",
      venue: "Lecture Art Center",
      total_seats: 300,
      current_seats: 300,
      image_path: "/img/performance3.jpg",
    },
  ],
  2: [
    // 다른 사용자 데이터 kse 혹은 kmj
  ],
};

// 내가 작성한 공연 조회 API
app.get("/dailband/user/:user_id/myperformances", (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const performances = userPerformances[userId];

  if (performances) {
    res.status(200).json({ performances });
  } else {
    res.status(400).json({ message: "Bad Request" });
  }
});

// 예약된 공연 정보 데이터
const userReservations = {
  1: [
    {
      reservation_id: 1,
      title: "스튜디오에이 5월 단독 공연",
      date: "2024.05.24",
      venue: "001 클럽 서울 마포구 와우산로 18길 20",
      tickets: 5,
    },
    {
      reservation_id: 2,
      title: "홍대밴드 5월 단독 공연",
      date: "2024.05.24",
      venue: "001 클럽 서울 마포구 와우산로 18길 20",
      tickets: 2,
    },
    {
      reservation_id: 3,
      title: "과기대밴드 5월 단독 공연",
      date: "2024.05.24",
      venue: "001 클럽 서울 마포구 와우산로 18길 20",
      tickets: 1,
    },
  ],
  2: [
    // 다른 사용자 데이터
  ],
};

// 예약된 공연 조회 API
app.get("/dailband/user/:user_id/reservations", (req, res) => {
  const userId = parseInt(req.params.user_id, 10);
  const reservations = userReservations[userId];

  if (reservations) {
    res.status(200).json({ reservations });
  } else {
    res.status(400).json({ message: "Bad Request" });
  }
});

// 예약 취소 API
app.delete(
  "/dailband/user/:user_id/reservations/:reservation_id",
  (req, res) => {
    const userId = parseInt(req.params.user_id, 10);
    const reservationId = parseInt(req.params.reservation_id, 10);
    const userReservationList = userReservations[userId];

    if (userReservationList) {
      const reservationIndex = userReservationList.findIndex(
        (r) => r.reservation_id === reservationId
      );
      if (reservationIndex !== -1) {
        userReservationList.splice(reservationIndex, 1);
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Reservation not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  }
);

// 공연 데이터
const performances = [
  {
    performanceId: 1,
    title: "Spring Concert",
    date: "2024-06-01",
    time: "19:00:00",
    venue: "Main Hall",
    totalSeats: 200,
    currentSeats: 150,
    file_url: "",
    comments: [],
  },
  {
    performanceId: 2,
    title: "Autumn Gala",
    date: "2024-10-05",
    time: "19:30:00",
    venue: "Grand Theater",
    totalSeats: 150,
    currentSeats: 120,
    file_url: "",
    comments: [],
  },
];

// 공연 홍보 게시판 조회 API
app.get("/boards/performances", (req, res) => {
  res.status(200).json(performances);
});

// 공연 상세 정보 조회 API
app.get("/boards/performances/:performance_id", (req, res) => {
  const performanceId = parseInt(req.params.performance_id, 10);
  const performance = performances.find(
    (p) => p.performanceId === performanceId
  );

  if (performance) {
    res.status(200).json(performance);
  } else {
    res.status(404).json({ message: "Performance not found" });
  }
});

// 공연 홍보 게시글 작성 API
app.post("/boards/performances", (req, res) => {
  const { title, date, time, venue, totalSeats } = req.body;

  const newPerformance = {
    performanceId: performances.length + 1,
    title,
    date,
    time,
    venue,
    totalSeats,
    currentSeats: totalSeats,
    file_url: "",
    comments: [],
  };

  performances.push(newPerformance);
  res.status(200).json(newPerformance);
});

// 공연 홍보 게시글 수정 API
app.put("/boards/performances/:performance_id", (req, res) => {
  const performanceId = parseInt(req.params.performance_id, 10);
  const performanceIndex = performances.findIndex(
    (p) => p.performanceId === performanceId
  );

  if (performanceIndex !== -1) {
    performances[performanceIndex] = {
      ...performances[performanceIndex],
      ...req.body,
    };
    res.status(200).json({ message: "Performance updated successfully" });
  } else {
    res.status(404).json({ message: "Performance not found" });
  }
});

// 공연 홍보 게시글 삭제 API
app.delete("/boards/performances/:performance_id", (req, res) => {
  const performanceId = parseInt(req.params.performance_id, 10);
  const performanceIndex = performances.findIndex(
    (p) => p.performanceId === performanceId
  );

  if (performanceIndex !== -1) {
    performances.splice(performanceIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Performance not found" });
  }
});

// 모집 페이지 - 동아리 모집
const posts1 = [
  {
    post_id: 1,
    title: "개망나니 밴드 : 서울 과기대 개망나니 밴드",
    content:
      "서울과기대 밴드부개망나니에서 세션을 구합니다! 남녀노소 누구나 환영합니다!! 저희 밴드에는 서울과기대 산공과를 휴학중인 21학번 멋있는 짱 보컬 김시은씨를 보유중입니다",
    created_at: "2024.06.02",
  },
  {
    post_id: 2,
    title: "깔루아 밴드 : 우리는 깔깔 깔루아!~ 홍익대 전통밴드 깔루아",
    content:
      "홍대 제일 밴드 깔루아에서 신입 부원을 모집합니다~!! 저희는 총 00명으로 구성되어있는 밴드이며 현재 ~~ 세션을 모집하고 있습니다!",
    created_at: "2024.06.01",
  },
  {
    post_id: 3,
    title: "000밴드 : 멋쟁이들만 모인 000밴드",
    content:
      "가족같은 밴드 000 입니다! 현재 드럼, 기타 세션을 모집하고 있습니다!! 여러분의 많은 지원과 관심 부탁드립니다",
    created_at: "2024.05.31",
  },
  {
    post_id: 4,
    title: "두번째 페이지에 나오는 4번째 밴드입니다",
    content: "동아리 소개글 4 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
  {
    post_id: 5,
    title: "두번째 페이지에 나오는 5번째 밴드입니다",
    content: "동아리 소개글 5 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
  {
    post_id: 6,
    title: "두번째 페이지에 나오는 6번째 밴드입니다",
    content: "동아리 소개글 6 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
  {
    post_id: 7,
    title: "세번째 페이지에 나오는 7번째 밴드입니다",
    content: "동아리 소개글 7 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
  {
    post_id: 8,
    title: "세번째 페이지에 나오는 8번째 밴드입니다",
    content: "동아리 소개글 8 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
  {
    post_id: 9,
    title: "세번째 페이지에 나오는 9번째 밴드입니다",
    content: "동아리 소개글 9 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
  {
    post_id: 10,
    title: "네번째 페이지에 나오는 10번째 밴드입니다",
    content: "동아리 소개글 10 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
  {
    post_id: 11,
    title: "네번째 페이지에 나오는 11번째 밴드입니다",
    content: "동아리 소개글 11 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
];
const posts1_1 = [
  {
    post_id: 1,
    title: "개망나니 밴드 : 서울 과기대 개망나니 밴드",
    content:
      "서울과기대 밴드부개망나니에서 세션을 구합니다! 남녀노소 누구나 환영합니다!! 저희 밴드에는 서울과기대 산공과를 휴학중인 21학번 멋있는 짱 보컬 김시은씨를 보유중입니다",
    file_url: "/img/groupphoto1.jpg",
    nickname: "김시은",
    created_at: "2024.06.02",
    comments: [],
  },
  {
    post_id: 2,
    title: "깔루아 밴드 : 우리는 깔깔 깔루아!~ 홍익대 전통밴드 깔루아",
    content:
      "홍대 제일 밴드 깔루아에서 신입 부원을 모집합니다~!! 저희는 총 00명으로 구성되어있는 밴드이며 현재 ~~ 세션을 모집하고 있습니다!",
    file_url: "/img/groupphoto2.jpg",
    nickname: "윤영선",
    created_at: "2024.06.01",
    comments: [],
  },
  {
    post_id: 3,
    title: "000밴드 : 멋쟁이들만 모인 000밴드",
    content:
      "가족같은 밴드 000 입니다! 현재 드럼, 기타 세션을 모집하고 있습니다!! 여러분의 많은 지원과 관심 부탁드립니다",
    file_url: "",
    nickname: "김민중",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 4,
    title: "두번째 페이지에 나오는 4번째 밴드입니다",
    content: "동아리 소개글 4 : 어쩌구저쩌구",
    file_url: "",
    nickname: "고운",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 5,
    title: "두번째 페이지에 나오는 5번째 밴드입니다",
    content: "동아리 소개글 5 : 어쩌구저쩌구",
    file_url: "",
    nickname: "정재현",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 6,
    title: "두번째 페이지에 나오는 6번째 밴드입니다",
    content: "동아리 소개글 6 : 어쩌구저쩌구",
    file_url: "",
    nickname: "익명의 기타",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 7,
    title: "세번째 페이지에 나오는 7번째 밴드입니다",
    content: "동아리 소개글 7 : 어쩌구저쩌구",
    file_url: "",
    nickname: "익명의 베이스",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 8,
    title: "세번째 페이지에 나오는 8번째 밴드입니다",
    content: "동아리 소개글 8 : 어쩌구저쩌구",
    file_url: "",
    nickname: "익명의 키보드",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 9,
    title: "세번째 페이지에 나오는 9번째 밴드입니다",
    content: "동아리 소개글 9 : 어쩌구저쩌구",
    file_url: "",
    nickname: "익명의 드럼",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 10,
    title: "네번째 페이지에 나오는 10번째 밴드입니다",
    content: "동아리 소개글 10 : 어쩌구저쩌구",
    file_url: "",
    nickname: "익명의 보컬",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 11,
    title: "네번째 페이지에 나오는 11번째 밴드입니다",
    content: "동아리 소개글 11 : 어쩌구저쩌구",
    file_url: "",
    nickname: "익명의 드럼",
    created_at: "2024.05.31",
    comments: [],
  },
];
// 모집 페이지 - 연합 공연 모집
const posts2 = [
  {
    post_id: 1,
    title: "서울 과기대 개망나니 밴드와 함께 공연하실 분~!",
    content:
      "서울과기대 밴드부개망나니와 연합 공연 하실 밴드를 모집합니다~! 날짜는 7월 말로 예상중이고, 홍대에서 공연할 예정입니다! 한 팀당 곡 수는 4~5곡 정도로 준비해 주시면 됩니다!!",
    created_at: "2024.06.02",
  },
  {
    post_id: 2,
    title: "홍익대 밴드 깔루아에서 연합 공연 팀을 모집합니다!! ",
    content:
      "홍대 제일 밴드 깔루아에서 연합 공연 팀을 모집합니다~!! 저희는 총 00명으로 구성되어있는 밴드이며 현재 7월 중 공연을 준비하고 있습니다!",
    created_at: "2024.06.01",
  },
  {
    post_id: 3,
    title: "멋쟁이들만 모인 000밴드와 함꼐 공연하실 분~!",
    content:
      "가족같은 밴드 000 입니다! 연합공연을 함께하실 멋있는 밴드들을 구하고 있습니다! 여러분의 많은 지원과 관심 부탁드립니다",
    created_at: "2024.05.31",
  },
  {
    post_id: 4,
    title: "두번째 페이지에 나오는 4번째 밴드입니다",
    content: "동아리 소개글 4 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
  {
    post_id: 5,
    title: "두번째 페이지에 나오는 5번째 밴드입니다",
    content: "동아리 소개글 5 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
  {
    post_id: 6,
    title: "두번째 페이지에 나오는 6번째 밴드입니다",
    content: "동아리 소개글 6 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
  {
    post_id: 7,
    title: "두번째 페이지에 나오는 7번째 밴드입니다",
    content: "동아리 소개글 7 : 어쩌구저쩌구",
    created_at: "2024.05.31",
  },
];
let posts2_1 = [
  {
    post_id: 1,
    title: "서울 과기대 개망나니 밴드와 함께 공연하실 분~!",
    content:
      "서울과기대 밴드부개망나니와 연합 공연 하실 밴드를 모집합니다~! 날짜는 7월 말로 예상중이고, 홍대에서 공연할 예정입니다! 한 팀당 곡 수는 4~5곡 정도로 준비해 주시면 됩니다!!",

    file_url: "",
    nickname: "",
    created_at: "2024.06.02",
    comments: [],
  },
  {
    post_id: 2,
    title: "홍익대 밴드 깔루아에서 연합 공연 팀을 모집합니다!! ",
    content:
      "홍대 제일 밴드 깔루아에서 연합 공연 팀을 모집합니다~!! 저희는 총 00명으로 구성되어있는 밴드이며 현재 7월 중 공연을 준비하고 있습니다!",

    file_url: "",
    nickname: "",
    created_at: "2024.06.01",
    comments: [],
  },

  {
    post_id: 3,
    title: "멋쟁이들만 모인 000밴드와 함꼐 공연하실 분~!",
    content:
      "가족같은 밴드 000 입니다! 연합공연을 함께하실 멋있는 밴드들을 구하고 있습니다! 여러분의 많은 지원과 관심 부탁드립니다",

    file_url: "",
    nickname: "",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 4,
    title: "두번째 페이지에 나오는 4번째 밴드입니다",
    content: "동아리 소개글 4 : 어쩌구저쩌구",

    file_url: "",
    nickname: "",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 5,
    title: "두번째 페이지에 나오는 5번째 밴드입니다",
    content: "동아리 소개글 5 : 어쩌구저쩌구",

    file_url: "",
    nickname: "",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 6,
    title: "두번째 페이지에 나오는 6번째 밴드입니다",
    content: "동아리 소개글 6 : 어쩌구저쩌구",

    file_url: "",
    nickname: "",
    created_at: "2024.05.31",
    comments: [],
  },
  {
    post_id: 7,
    title: "세번째 페이지에 나오는 7번째 밴드입니다",
    content: "동아리 소개글 7 : 어쩌구저쩌구",

    file_url: "",
    nickname: "",
    created_at: "2024.05.31",
    comments: [],
  },
];
// 모집 페이지 - 자기 PR
const posts3 = [
  {
    post_id: 1,
    title: "키보드하는 김시은입니다",
    content:
      "안녕하세요 저는 서울과기대 산업공학과에 재학중인 김시은입니다 MBTI는 ENFP이고요 세션은 키보드를 맡고있습니다!!! 저를 데려가주실 멋진 밴드 구합니다 어딜가서든 열심히 할 자신도 잇고요 저같은 멤버 어디서 또 못구합니다 ...",
    created_at: "2024.06.04",
    nickname: "김시은",
    email: "tldms0507@naver.com",
    sessions: [
      {
        session_id: 5,
        session_info: "키보드",
        created_at: "2024.06.04",
      },
    ],
  },
  {
    post_id: 2,
    title: "밴드를 고민중인 김고민중입니다",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",
    created_at: "2024.06.13",
    nickname: "김민중",
    email: "이메일주소",
    sessions: [
      {
        session_id: 1,
        session_info: "드럼",
        created_at: "2024.06.16",
      },
    ],
  },
  {
    post_id: 3,
    title: "영선이네 밴드부의 영선입니다",
    content:
      "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",
    created_at: "2024.06.16",
    nickname: "윤영선",
    email: "string",
    sessions: [
      {
        session_id: 4,
        session_info: "베이스",
        created_at: "2024.06.16",
      },
    ],
  },
  {
    post_id: 4,
    title: "고운 고운",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",
    created_at: "2024.06.16",
    nickname: "고운",
    email: "string",
    sessions: [
      {
        session_id: 5,
        session_info: "키보드",
        created_at: "2024.06.16",
      },
    ],
  },
  {
    post_id: 5,
    title: "아이돌을 겸하고있는 정재현입니다",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",
    created_at: "2024.06.16",
    nickname: "정재현",
    email: "string",
    sessions: [
      {
        session_id: 3,
        session_info: "보컬",
        created_at: "2024.06.16",
      },
    ],
  },
  {
    post_id: 6,
    title: "ㅈ-ㅔ목",
    content: "내용",
    created_at: "2024.06.16",
    nickname: "6번학생",
    email: "이메일",
    sessions: [
      {
        session_id: 3,
        session_info: "보컬",
        created_at: "2024.06.16",
      },
    ],
  },
  {
    post_id: 7,
    title: "string",
    content: "string",
    created_at: "2024.06.16",
    nickname: "7번",
    email: "string",
    sessions: [
      {
        session_id: 2,
        session_info: "기타",
        created_at: "2024.06.16",
      },
    ],
  },
  {
    post_id: 8,
    title: "string",
    content: "string",
    created_at: "2024.06.16",
    nickname: "8번학생",
    email: "string",
    sessions: [
      {
        session_id: 4,
        session_info: "베이스",
        created_at: "2024.06.16",
      },
    ],
  },
  {
    post_id: 9,
    title: "string",
    content: "string",
    created_at: "2024.06.16",
    nickname: "9번",
    email: "string",
    sessions: [
      {
        session_id: 2,
        session_info: "기타",
        created_at: "2024.06.16",
      },
    ],
  },
  {
    post_id: 10,
    title: "string",
    content: "string",
    created_at: "2024.06.16",
    nickname: "10번",
    email: "string",
    sessions: [
      {
        session_id: 1,
        session_info: "드럼",
        created_at: "2024.06.16",
      },
    ],
  },
  {
    post_id: 11,
    title: "string",
    content: "string",
    created_at: "2024.06.16",
    nickname: "11번",
    email: "string",
    sessions: [
      {
        session_id: 3,
        session_info: "보컬",
        created_at: "2024.06.16",
      },
    ],
  },
];
let posts3_1 = [
  {
    post_id: 1,
    title: "키보드하는 김시은입니다",
    content:
      "안녕하세요 저는 서울과기대 산업공학과에 재학중인 김시은입니다 MBTI는 ENFP이고요 세션은 키보드를 맡고있습니다!!! 저를 데려가주실 멋진 밴드 구합니다 어딜가서든 열심히 할 자신도 잇고요 저같은 멤버 어디서 또 못구합니다 ...",

    nickname: "김시은",
    email: "tldms0507@naver.com",
    created_at: "2024.06.04",
    sessions: [
      {
        session_id: 3,
        session_info: "보컬",
      },
    ],
    comments: [],
  },
  {
    post_id: 2,
    title: "밴드를 고민중인 김고민중입니다",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",

    nickname: "김민중",
    email: "이메일주소",
    created_at: "2024.06.13",
    sessions: [
      {
        session_id: 3,
        session_info: "보컬",
      },
    ],
    comments: [],
  },
  {
    post_id: 3,
    title: "영선이네 밴드부의 영선입니다",
    content:
      "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",

    nickname: "윤영선",
    email: "string",
    created_at: "2024.06.04",
    sessions: [
      {
        session_id: 3,
        session_info: "보컬",
      },
    ],
    comments: [],
  },
  {
    post_id: 4,
    title: "고운 고운",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",

    nickname: "고운",
    email: "string",
    created_at: "2024.06.04",
    sessions: [
      {
        session_id: 3,
        session_info: "보컬",
      },
    ],
    comments: [],
  },
  {
    post_id: 5,
    title: "아이돌을 겸하고있는 정재현입니다",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",
    nickname: "정재현",
    email: "string",
    created_at: "2024.06.04",
    sessions: [
      {
        session_id: 3,
        session_info: "보컬",
      },
    ],
    comments: [],
  },
  {
    post_id: 6,
    title: "제목",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",
    nickname: "이름",
    email: "Daeil@band.ac.kr",
    created_at: "2024.06.13",
    sessions: [
      {
        session_id: 3,
        session_info: "보컬",
      },
    ],
    comments: [],
  },
  {
    post_id: 7,
    title: "제목",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",
    nickname: "이름",
    email: "Daeil@band.ac.kr",
    created_at: "2024.06.13",
    sessions: [
      {
        session_id: 2,
        session_info: "기타",
      },
    ],
    comments: [],
  },
  {
    post_id: 8,
    title: "제목",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",
    nickname: "이름",
    email: "Daeil@band.ac.kr",
    created_at: "2024.06.13",
    sessions: [
      {
        session_id: 4,
        session_info: "베이스",
      },
    ],
    comments: [],
  },
  {
    post_id: 9,
    title: "제목",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",
    nickname: "이름",
    email: "Daeil@band.ac.kr",
    created_at: "2024.06.13",
    sessions: [
      {
        session_id: 2,
        session_info: "기타",
      },
    ],
    comments: [],
  },
  {
    post_id: 10,
    title: "제목",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",
    nickname: "이름",
    email: "Daeil@band.ac.kr",
    created_at: "2024.06.13",
    sessions: [
      {
        session_id: 1,
        session_info: "드럼",
      },
    ],
    comments: [],
  },
  {
    post_id: 11,
    title: "제목",
    content: "글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! 글 내용 ~! ",
    nickname: "이름",
    email: "Daeil@band.ac.kr",
    created_at: "2024.06.13",
    sessions: [
      {
        session_id: 3,
        session_info: "보컬",
      },
    ],
    comments: [],
  },
];
// 세션 페이지 - 드럼
let posts5 = [
  {
    board_id: 5,
    post_id: 1,
    title: "드럼 페이지 게시글1",
    content: "드럼 페이지 게시글의 내용입니다 두둥탁",
    file_url: "",
    nickname: "김민중",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    board_id: 5,
    post_id: 2,
    title: "드럼 페이지 게시글2",
    content: "string",
    file_url: "",
    nickname: "고운",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    board_id: 5,
    post_id: 3,
    title: "드럼 페이지 게시글3",
    content: "string",
    file_url: "",
    nickname: "정재현",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    board_id: 5,
    post_id: 4,
    title: "드럼 페이지 게시글4",
    content: "string",
    file_url: "",
    nickname: "윤영선",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    board_id: 5,
    post_id: 5,
    title: "드럼 페이지 게시글5",
    content: "string",
    file_url: "",
    nickname: "김시은",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
];
const posts5_1 = [
  {
    title: "드럼 연주영상",
    link: "https://www.youtube.com/watch?v=1aaHbB8w29c",
    user_id: 1,
  },
];

// 세션 페이지 - 기타
const posts6 = [
  {
    post_id: 1,
    title: "기타 게시판 게시글1",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 2,
    title: "기타 게시판 게시글2",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 3,
    title: "기타 게시판 게시글3",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 4,
    title: "기타 게시판 게시글4",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 5,
    title: "기타 게시판 게시글5",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
];
const posts6_1 = [
  {
    title: "기타 연주영상",
    link: "https://www.youtube.com/watch?v=T3jJQdzJ9SE",
    user_id: 1,
  },
];
// 세션 페이지 - 보컬
const posts7 = [
  {
    post_id: 1,
    title: "보컬 게시판 게시글1",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 2,
    title: "보컬 게시판 게시글2",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 3,
    title: "보컬 게시판 게시글3",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 4,
    title: "보컬 게시판 게시글4",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 5,
    title: "보컬 게시판 게시글5",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
];
const posts7_1 = [
  {
    title: "보컬",
    link: "https://www.youtube.com/watch?v=_I5vQ7W_jLU",
    user_id: 1,
  },
];
// 세션 페이지 - 베이스
const posts8 = [
  {
    post_id: 1,
    title: "베이스 게시판 게시글1",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 2,
    title: "베이스 게시판 게시글2",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 3,
    title: "베이스 게시판 게시글3",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 4,
    title: "베이스 게시판 게시글4",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 5,
    title: "베이스 게시판 게시글5",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
];
const posts8_1 = [
  {
    title: "붐붐베이스",
    link: "https://www.youtube.com/watch?v=P8f0x-S1DOo",
    user_id: 1,
  },
];
// 세션 페이지 - 키보드
const posts9 = [
  {
    post_id: 1,
    title: "키보드 게시판 게시글1",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 2,
    title: "키보드 게시판 게시글2",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 3,
    title: "키보드 게시판 게시글3",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 4,
    title: "키보드 게시판 게시글4",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
  {
    post_id: 5,
    title: "키보드 게시판 게시글5",
    content: "string",
    file_url: "",
    nickname: "닉네임",
    created_at: "2024.06.16",
    modified_at: "timestamp",
    comments: [],
  },
];
const posts9_1 = [
  {
    title: "베텔기우스 피아노",
    link: "https://www.youtube.com/watch?v=rqWhbYMq6pg",
    user_id: 1,
  },
];
let posts = [...posts1, ...posts2, ...posts3];

app.use(express.json());

app.get("/posts", (req, res) => {
  res.json({ posts: posts1 });
});

// 상세 게시물 조회
app.get("/posts_1/:post_id", (req, res) => {
  const { post_id } = req.params;
  console.log(`Received request for post_id: ${post_id}`);
  const post = posts1_1.find((post) => post.post_id === parseInt(post_id));
  if (post) {
    console.log(`Found post: ${JSON.stringify(post)}`);
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.get("/posts2_1/:post_id", (req, res) => {
  const { post_id } = req.params;
  console.log(`Received request for post_id: ${post_id}`);
  const post = posts2_1.find((post) => post.post_id === parseInt(post_id));
  if (post) {
    console.log(`Found post: ${JSON.stringify(post)}`);
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.get("/posts3_1/:post_id", (req, res) => {
  const { post_id } = req.params;
  console.log(`Received request for post_id: ${post_id}`);
  const post = posts3_1.find((post) => post.post_id === parseInt(post_id));
  if (post) {
    console.log(`Found post: ${JSON.stringify(post)}`);
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.get("/posts5/:post_id", (req, res) => {
  const { post_id } = req.params;
  console.log(`Received request for post_id: ${post_id}`);
  const post = posts5.find((post) => post.post_id === parseInt(post_id));
  if (post) {
    console.log(`Found post: ${JSON.stringify(post)}`);
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.get("/posts6/:post_id", (req, res) => {
  const { post_id } = req.params;
  console.log(`Received request for post_id: ${post_id}`);
  const post = posts6.find((post) => post.post_id === parseInt(post_id));
  if (post) {
    console.log(`Found post: ${JSON.stringify(post)}`);
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.get("/posts7/:post_id", (req, res) => {
  const { post_id } = req.params;
  console.log(`Received request for post_id: ${post_id}`);
  const post = posts7.find((post) => post.post_id === parseInt(post_id));
  if (post) {
    console.log(`Found post: ${JSON.stringify(post)}`);
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.get("/posts8/:post_id", (req, res) => {
  const { post_id } = req.params;
  console.log(`Received request for post_id: ${post_id}`);
  const post = posts8.find((post) => post.post_id === parseInt(post_id));
  if (post) {
    console.log(`Found post: ${JSON.stringify(post)}`);
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.get("/posts9/:post_id", (req, res) => {
  const { post_id } = req.params;
  console.log(`Received request for post_id: ${post_id}`);
  const post = posts9.find((post) => post.post_id === parseInt(post_id));
  if (post) {
    console.log(`Found post: ${JSON.stringify(post)}`);
    res.json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// 게시판에 따른 게시물 조회
app.post("/posts", (req, res) => {
  const newPost = req.body;
  posts.push(newPost);
  res.status(201).json(newPost);
});
app.get("/posts2", (req, res) => {
  res.json({ posts: posts2 });
});

app.get("/posts3", (req, res) => {
  res.json({ posts: posts3 });
});

app.get(`/posts5`, (req, res) => {
  res.json({ posts: posts5 });
});
app.get(`/posts5_1`, (req, res) => {
  res.json({ posts: posts5_1 });
});
app.get(`/posts6`, (req, res) => {
  res.json({ posts: posts6 });
});
app.get(`/posts6_1`, (req, res) => {
  res.json({ posts: posts6_1 });
});
app.get(`/posts7`, (req, res) => {
  res.json({ posts: posts7 });
});
app.get(`/posts7_1`, (req, res) => {
  res.json({ posts: posts6_1 });
});
app.get(`/posts8`, (req, res) => {
  res.json({ posts: posts8 });
});
app.get(`/posts8_1`, (req, res) => {
  res.json({ posts: posts6_1 });
});
app.get(`/posts9`, (req, res) => {
  res.json({ posts: posts9 });
});
app.get(`/posts9_1`, (req, res) => {
  res.json({ posts: posts6_1 });
});

// 댓글 추가
app.post("/posts_1/:post_id/comments", (req, res) => {
  const post_id = parseInt(req.params.post_id, 10);
  const post = posts1_1.find((post) => post.post_id === post_id);

  if (post) {
    const newComment = req.body;
    //일단 comment_id를 날짜로 표기함
    newComment.comment_id = new Date().getTime().toString();
    post.comments.push(newComment);
    res.json({ success: true, result: post.comments });
  } else {
    res.json({ success: false, message: "Post not found" });
  }
});
app.post("/posts2_1/:post_id/comments", (req, res) => {
  const post_id = parseInt(req.params.post_id, 10);
  const post = posts2_1.find((post) => post.post_id === post_id);

  if (post) {
    const newComment = req.body;
    newComment.comment_id = new Date().getTime().toString();
    post.comments.push(newComment);
    res.json({ success: true, result: post.comments });
  } else {
    res.json({ success: false, message: "Post not found" });
  }
});
app.post("/posts3_1/:post_id/comments", (req, res) => {
  const post_id = parseInt(req.params.post_id, 10);
  const post = posts3_1.find((post) => post.post_id === post_id);

  if (post) {
    const newComment = req.body;
    newComment.comment_id = new Date().getTime().toString();
    post.comments.push(newComment);
    res.json({ success: true, result: post.comments });
  } else {
    res.json({ success: false, message: "Post not found" });
  }
});
app.post("/posts5/:post_id/comments", (req, res) => {
  const post_id = parseInt(req.params.post_id, 10);
  const post = posts5.find((post) => post.post_id === post_id);

  if (post) {
    const newComment = req.body;
    newComment.comment_id = new Date().getTime().toString();
    post.comments.push(newComment);
    res.json({ success: true, result: post.comments });
  } else {
    res.json({ success: false, message: "Post not found" });
  }
});
app.post("/posts6/:post_id/comments", (req, res) => {
  const post_id = parseInt(req.params.post_id, 10);
  const post = posts6.find((post) => post.post_id === post_id);

  if (post) {
    const newComment = req.body;
    newComment.comment_id = new Date().getTime().toString();
    post.comments.push(newComment);
    res.json({ success: true, result: post.comments });
  } else {
    res.json({ success: false, message: "Post not found" });
  }
});
app.post("/posts7/:post_id/comments", (req, res) => {
  const post_id = parseInt(req.params.post_id, 10);
  const post = posts7.find((post) => post.post_id === post_id);

  if (post) {
    const newComment = req.body;
    newComment.comment_id = new Date().getTime().toString();
    post.comments.push(newComment);
    res.json({ success: true, result: post.comments });
  } else {
    res.json({ success: false, message: "Post not found" });
  }
});
app.post("/posts8/:post_id/comments", (req, res) => {
  const post_id = parseInt(req.params.post_id, 10);
  const post = posts8.find((post) => post.post_id === post_id);

  if (post) {
    const newComment = req.body;
    newComment.comment_id = new Date().getTime().toString();
    post.comments.push(newComment);
    res.json({ success: true, result: post.comments });
  } else {
    res.json({ success: false, message: "Post not found" });
  }
});
app.post("/posts9/:post_id/comments", (req, res) => {
  const post_id = parseInt(req.params.post_id, 10);
  const post = posts9.find((post) => post.post_id === post_id);

  if (post) {
    const newComment = req.body;
    newComment.comment_id = new Date().getTime().toString();
    post.comments.push(newComment);
    res.json({ success: true, result: post.comments });
  } else {
    res.json({ success: false, message: "Post not found" });
  }
});

// 게시글 수정
app.put("/posts/:post_id", (req, res) => {
  const { post_id } = req.params;
  const { title, content, file_url } = req.body;
  let updatedPost = null;
  // Search for the post in posts1
  let post1Index = posts1.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );
  if (post1Index !== -1) {
    posts1[post1Index].title = title;
    posts1[post1Index].content = content;
    updatedPost = posts1[post1Index];
  }
  let post1_1Index = posts1_1.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );
  if (post1_1Index !== -1) {
    posts1_1[post1_1Index].title = title;
    posts1_1[post1_1Index].content = content;
    updatedPost = posts1_1[post1_1Index];
  }

  if (updatedPost) {
    res.json({ success: true, updatedPost });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.put("/posts2/:post_id", (req, res) => {
  const { post_id } = req.params;
  const { title, content, file_url } = req.body;
  let updatedPost = null;
  let post2Index = posts2.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );
  if (post2Index !== -1) {
    posts2[post2Index].title = title;
    posts2[post2Index].content = content;
    updatedPost = posts2[post2Index];
  }
  let post2_1Index = posts2_1.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );
  if (post2_1Index !== -1) {
    posts2_1[post2_1Index].title = title;
    posts2_1[post2_1Index].content = content;
    updatedPost = posts2_1[post2_1Index];
  }

  if (updatedPost) {
    res.json({ success: true, updatedPost });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.put("/posts3/:post_id", (req, res) => {
  const { post_id } = req.params;
  const { title, content, file_url } = req.body;
  let updatedPost = null;

  let post3Index = posts3.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );
  if (post3Index !== -1) {
    posts3[post3Index].title = title;
    posts3[post3Index].content = content;
    updatedPost = posts3[post3Index];
  }
  let post3_1Index = posts3_1.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );
  if (post3_1Index !== -1) {
    posts3_1[post3_1Index].title = title;
    posts3_1[post3_1Index].content = content;
    updatedPost = posts3_1[post3_1Index];
  }

  if (updatedPost) {
    res.json({ success: true, updatedPost });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.put("/posts5/:post_id", (req, res) => {
  const { post_id } = req.params;
  const { title, content, file_url } = req.body;
  let updatedPost = null;

  let post5Index = posts5.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );
  if (post5Index !== -1) {
    posts5[post5Index].title = title;
    posts5[post5Index].content = content;
    updatedPost = posts5[post5Index];
  }

  if (updatedPost) {
    res.json({ success: true, updatedPost });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

// 게시글 작성
const formatDate = (date) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date
    .toLocaleDateString("ko-KR", options)
    .replace(/\./g, "")
    .replace(/ /g, ".");
};
app.post("/posts1", (req, res) => {
  const newPost = {
    post_id: posts1.length + 1,
    title: req.body.title,
    content: req.body.content,
    file_url: req.body.file_url,
    nickname: req.body.nickname || "이름",
    created_at: formatDate(new Date()),
    modified_at: new Date().toISOString(),
    comments: [],
  };
  console.log("Created new post:", newPost);
  posts1.push(newPost);
  posts1_1.push(newPost);
  res.status(201).json(newPost);
});
app.post("/posts2", (req, res) => {
  const newPost = {
    post_id: posts2.length + 1,
    title: req.body.title,
    content: req.body.content,
    file_url: req.body.file_url,
    nickname: req.body.nickname || "이름",
    created_at: formatDate(new Date()),
    modified_at: new Date().toISOString(),
    comments: [],
  };
  posts2.push(newPost);
  posts2_1.push(newPost);
  res.status(201).json(newPost);
});
app.post("/posts3", (req, res) => {
  const newPost = {
    post_id: posts3.length + 1,
    title: req.body.title,
    content: req.body.content,
    file_url: req.body.file_url,
    nickname: req.body.nickname || `${posts3.length + 1}번`, // Default nickname if not provided
    email: req.body.email || "이메일",
    sessions: [
      {
        session_id: 0,
        session_info: req.body.session_info || "미지정",
      },
    ],

    created_at: formatDate(new Date()), // Current date
    modified_at: new Date().toISOString(),
    comments: [],
  };
  posts3.push(newPost);
  posts3_1.push(newPost);
  res.status(201).json(newPost);
});
app.post("/posts5", (req, res) => {
  const newPost = {
    board_id: 5,
    post_id: posts5.length + 1,
    title: req.body.title,
    content: req.body.content,
    file_url: req.body.file_url,
    nickname: req.body.nickname || "이름",
    created_at: formatDate(new Date()),
    modified_at: new Date().toISOString(),
    comments: [],
  };
  posts5.push(newPost);
  res.status(201).json(newPost);
});
app.post("/posts6", (req, res) => {
  const newPost = {
    board_id: 5,
    post_id: posts6.length + 1,
    title: req.body.title,
    content: req.body.content,
    file_url: req.body.file_url,
    nickname: req.body.nickname || "이름",
    created_at: formatDate(new Date()),
    modified_at: new Date().toISOString(),
    comments: [],
  };
  posts6.push(newPost);
  res.status(201).json(newPost);
});
app.post("/posts7", (req, res) => {
  const newPost = {
    board_id: 5,
    post_id: posts7.length + 1,
    title: req.body.title,
    content: req.body.content,
    file_url: req.body.file_url,
    nickname: req.body.nickname || "이름",
    created_at: formatDate(new Date()),
    modified_at: new Date().toISOString(),
    comments: [],
  };
  posts7.push(newPost);
  res.status(201).json(newPost);
});
app.post("/posts8", (req, res) => {
  const newPost = {
    board_id: 5,
    post_id: posts8.length + 1,
    title: req.body.title,
    content: req.body.content,
    file_url: req.body.file_url,
    nickname: req.body.nickname || "이름",
    created_at: formatDate(new Date()),
    modified_at: new Date().toISOString(),
    comments: [],
  };
  posts8.push(newPost);
  res.status(201).json(newPost);
});
app.post("/posts9", (req, res) => {
  const newPost = {
    board_id: 5,
    post_id: posts9.length + 1,
    title: req.body.title,
    content: req.body.content,
    file_url: req.body.file_url,
    nickname: req.body.nickname || "이름",
    created_at: formatDate(new Date()),
    modified_at: new Date().toISOString(),
    comments: [],
  };
  posts9.push(newPost);
  res.status(201).json(newPost);
});

// 연주 영상
app.post("/posts5_1", (req, res) => {
  const newPost = {
    post_id: posts5_1.length + 1,
    title: req.body.title,
    link: req.body.link,
    user_id: req.body.user_id,
  };
  posts5_1.push(newPost);
  res.status(201).json(newPost);
});
app.post("/posts6_1", (req, res) => {
  const newPost = {
    post_id: posts6_1.length + 1,
    title: req.body.title,
    link: req.body.link,
    user_id: req.body.user_id,
  };
  posts6_1.push(newPost);
  res.status(201).json(newPost);
});
app.post("/posts7_1", (req, res) => {
  const newPost = {
    post_id: posts7_1.length + 1,
    title: req.body.title,
    link: req.body.link,
    user_id: req.body.user_id,
  };
  posts7_1.push(newPost);
  res.status(201).json(newPost);
});
app.post("/posts8_1", (req, res) => {
  const newPost = {
    post_id: posts8_1.length + 1,
    title: req.body.title,
    link: req.body.link,
    user_id: req.body.user_id,
  };
  posts8_1.push(newPost);
  res.status(201).json(newPost);
});
app.post("/posts9_1", (req, res) => {
  const newPost = {
    post_id: posts9_1.length + 1,
    title: req.body.title,
    link: req.body.link,
    user_id: req.body.user_id,
  };
  posts9_1.push(newPost);
  res.status(201).json(newPost);
});

// 게시글 삭제
app.delete("/posts/:post_id", (req, res) => {
  const { post_id } = req.params;
  console.log(`Received delete request for post_id: ${post_id}`);
  const postIndex = posts1.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );

  if (postIndex !== -1) {
    posts1.splice(postIndex, 1);
    console.log(`Post deleted: ${post_id}`);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    console.log(`Post not found: ${post_id}`);
    res.status(404).json({ message: "Post not found" });
  }
  const postIndex_1 = posts1_1.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );

  if (postIndex_1 !== -1) {
    posts1_1.splice(postIndex_1, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.delete("/posts2/:post_id", (req, res) => {
  const { post_id } = req.params;
  console.log(`Received delete request for post_id: ${post_id}`);
  const postIndex = posts2.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );

  if (postIndex !== -1) {
    posts2.splice(postIndex, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
  const postIndex_1 = posts2_1.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );

  if (postIndex_1 !== -1) {
    posts2_1.splice(postIndex_1, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.delete("/posts3/:post_id", (req, res) => {
  const { post_id } = req.params;
  const postIndex = posts3.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );

  if (postIndex !== -1) {
    posts3.splice(postIndex, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
  const postIndex_1 = posts3_1.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );

  if (postIndex_1 !== -1) {
    posts3_1.splice(postIndex_1, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.delete("/posts5/:post_id", (req, res) => {
  const { post_id } = req.params;
  const postIndex = posts5.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );

  if (postIndex !== -1) {
    posts5.splice(postIndex, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.delete("/posts6/:post_id", (req, res) => {
  const { post_id } = req.params;
  const postIndex = posts6.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );

  if (postIndex !== -1) {
    posts6.splice(postIndex, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.delete("/posts7/:post_id", (req, res) => {
  const { post_id } = req.params;
  const postIndex = posts7.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );

  if (postIndex !== -1) {
    posts7.splice(postIndex, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.delete("/posts8/:post_id", (req, res) => {
  const { post_id } = req.params;
  const postIndex = posts8.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );

  if (postIndex !== -1) {
    posts8.splice(postIndex, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});
app.delete("/posts9/:post_id", (req, res) => {
  const { post_id } = req.params;
  const postIndex = posts9.findIndex(
    (post) => post.post_id === parseInt(post_id)
  );

  if (postIndex !== -1) {
    posts9.splice(postIndex, 1);
    res.status(200).json({ message: "Post deleted successfully" });
  } else {
    res.status(404).json({ message: "Post not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});