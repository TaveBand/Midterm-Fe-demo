# 대일밴드 : 대학 밴드 동아리 커뮤니티 서비스
![ReadMe_MainImage](https://github.com/user-attachments/assets/0e843219-f6e8-43c1-af84-bf633a0dc232)

## 📖 목차
- [🙋‍♀️ 프로젝트 소개](#-프로젝트-소개)

- [주제 선정 배경](#주제-선정-배경)
- [기획 의도](#기획-의도)
- [기술 스택](#기술-스택)
  - 기술 선정 이유
- [폴더 구조](#폴더-구조)
- [ERD](#ERD)
- [와이어프레임](#와이어프레임)
- [주요 기능](#주요-기능)
- [팀원 소개 & 후기](팀원-소개-&-후기)
- [Demo 영상](#Demo-영상)

## 🙋‍♀️ 프로젝트 소개
대일밴드 : 밴드 동아리들을 위한 밴드모집 및 공연예약 서비스와 음성분석을 통해 음역대에 맞는 편곡 서비스

## 주제 선정 배경
- 밴드 음악에 대한 늘어나는 관심과 학교, 학과별 밴드 동아리 수가 많아짐에 따라 밴드 동아리를 위한 커뮤니티의 필요성을 느낌
- 사용자의 음역대를 분석해 밴드 보컬리스트에게 적합한 노래를 자동으로 추천해주기 위함

## 프로젝트 기획 의도
- 타학교 **밴드동아리와의 교류**를 돕고, **밴드원 모집을 더 쉽게** 합니다!
- 같은 세션을 가진 사람들의 **고민과 노하우를 공유**할 수 있어요!
- 공연 상세 정보를 확인가능한 포스팅과 **해당 페이지에서 예약까지** 가능합니다!
- 노래 부르는 사람의 **음역대를 분석**해주고 **맞춤형 노래를 추천**해드립니다!

## 🛠 기술 스택
**프론트엔드**

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">&nbsp;<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">&nbsp;

**백엔드**

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">


## 기술 선정 이유
>React와 SpringBoot를 왜 선택하였는가? 

Component를 사용하여 **재사용과 유지보수가 용이**하다는 점과 Virtual DOM으로 인해 *리렌더링* 될 때 **컨텐츠를 좀 더 빠르고 효율적으로 변경**할 수 있다고 생각했습니다.

이지 렌더링이 많이 일어나는 서비스 특성상 **렌더링 서비스에 관리에 적합**한  Spring을 사용했고, React 또한 렌더링 최적화에 좋아서 사용하고자 합니다.



## 폴더 구조
 ```
📂src
│
├── App.js
├── index.js
├── axios.js
│
├── 📂authentication
│   ├── Login.js
│   ├── Register.js
│   ├── Verify.js
│   ├── Complete.js
│   ├── AuthContext.js
│   └── 📂styles
│       └── Login.css
│       ├── Register.css
│       ├── Verify.css
│       ├── Complete.css
│       └── AuthContext.css
│
├── 📂mainpage
│   ├── Home.js
│   └── 📂styles
│       └── Home.css
│
├── 📂mypage
│   ├── Profile.js
│   ├── Scrap.js
│   ├── MyPosts.js
│   ├── MyPerformances.js
│   ├── MyReservations.js
│   └── 📂styles
│       └── Profile.css
│       ├── Scrap.css
│       ├── MyPosts.css
│       ├── MyPerformances.css
│       └── MyReservations.css
│
├── 📂post
│   ├── Clubs.js
│   ├── ClubsDetail.js
│   ├── PR.js
│   ├── PRDetail.js
│   ├── Matching.js
│   ├── MatchingDetail.js
│   └── 📂styles
│       └── Clubs.css
│       ├── ClubsDetail.css
│       ├── PR.css
│       ├── PRDetail.css
│       ├── Matching.css
│       └── MatchingDetail.css
│
├── 📂performance
│   ├── UnionPerformance.js
│   ├── UnionPerformanceDetail.js
│   └── 📂styles
│       └── UnionPerformance.css
│       └── UnionPerformanceDetail.css
│
├── 📂session
│   ├── Bass.js
│   ├── BassDetail.js
│   ├── Drum.js
│   ├── DrumDetail.js
│   ├── Guitar.js
│   ├── GuitarDetail.js
│   ├── Keyboard.js
│   ├── KeyboardDetail.js
│   ├── Vocal.js
│   ├── VocalDetail.js
│   └── 📂styles
│       └── Drum.css
│       └── DrumDetail.css
│
├── 📂shared
│   ├── BoardBtns.js
│   ├── Comment.js
│   ├── Header.js
│   ├── Pagenumber.js
│   ├── SessionBtns.js
│   ├── Sidebar.js
│   ├── Toggle.js
│   └── 📂styles
│       └── BoardBtns.css
│       ├── Comment.css
│       ├── Header.css
│       ├── Pagenumber.css
│       ├── SessionBtns.css
│       ├── Sidebar.css
│       └── Toggle.css
```


## ERD

## 와이어프레임

## 주요 기능

## 팀원 소개 & 후기

## Demo 영상




