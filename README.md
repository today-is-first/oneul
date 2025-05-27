[![hits](https://myhits.vercel.app/api/hit/https%3A%2F%2Fgithub.com%2Ftoday-is-first%2Foneul?color=purple&label=hits&size=small)](https://myhits.vercel.app)

## 🗂️ 팀 문서 & 자료 링크

<p align="center">
  <a href="https://oneul-pjt.notion.site/SSAFY-1d2bc43cad598007adaff9d1b7e0235f">📒 팀 노션</a> &nbsp;|&nbsp;
  <a href="https://oneul-pjt.notion.site/1d2bc43cad598052b36ce17db47ef476">📚 개발 위키</a> &nbsp;|&nbsp;
  <a href="https://oneul-pjt.notion.site/Ground-Rule-1d2bc43cad59801abca2d92893ca7093">📏 그라운드 룰</a> &nbsp;|&nbsp;
  <a href="http://oneul.store/">🚀 데모 페이지</a>
</p>

<br/>
<br/>

## 🧑‍💻 역할 및 기여

| 담당자 | 주요 작업 |
|--------|------------------------------------------------------------------|
| **이찬** | - 홈 스트릭/피드/통계 기능 구현 및 캘린더 연동<br>- 인증 피드 Presigned-URL 연동 및 업로드 처리<br>- 챌린지 생성/조회/참여 기능 전반 구현<br>- 회원가입/로그인/OAuth 소셜 로그인 연동<br>- 채팅 기능 구현 및 WebSocket 통신 연결<br>- GitHub 이슈-PR 자동 매핑 기능 설정<br>- Refresh Token Rotation 방식 구현 |
| **유아름** | - Toss Payments 위젯 연동 및 결제 처리 기능 구현<br>- 챌린지 참여 및 결제 후 상태 전환 처리<br>- 챌린지 피드 검수 탭 로직 및 상태 반영<br>- 피드 상세/수정 기능 구현<br>- 챌린지 디테일 조회 및 모달 처리 |
| **강설민** | - 설정용 DB 연동 및 영수증/결제 정보 저장 처리<br>- Toss 결제 승인 및 환불 처리 로직<br>- OAuth 로그인 처리 |


<br/>
<br/>

## 👋 프로젝트 소개

### 🏆 *"오늘의 운동을 인증하고, 리워드를 받는 챌린지 플랫폼"*

**oneul**은 사용자가 **운동 인증을 통해 챌린지에 참여**하고,  
**목표 달성 시 환급 리워드**를 받을 수 있는 **챌린지 기반 웹 서비스**입니다.

- 사용자는 **인증 피드를 업로드**하며 도전 현황을 기록할 수 있어요.  
- 참여자 간에는 **실시간 채팅으로 소통**하며 도전을 이어갑니다.

<br/>
<br/>

## 🎯 주요 기능 소개

### 💳 결제 및 환급 시스템  
> **"목표 달성, 그 자체가 리워드!"**

**유저는 Toss 결제 API를 통해 챌린지 참가비를 결제**하고,  
**목표를 달성하면 서버가 자동으로 환급 처리를 수행**합니다.  
결제 상태는 **Redis에 임시 저장**, **MySQL에 영구 반영**됩니다.

<img src="https://github.com/user-attachments/assets/94e09687-cfa2-4914-9742-0b6d472b9814" width="700" alt="결제 시스템" />

<br/>
<br/>

### 💬 실시간 채팅  
> **"운동 인증 뒤엔, 응원과 피드백이 바로바로!"**

**채팅은 Netty-Socket.io 기반 WebSocket 서버**와 연결되어 있으며,  
메시지는 **방별로 실시간 브로드캐스팅** 됩니다.

<img src="https://github.com/user-attachments/assets/7090104a-25a5-4c2a-8081-a1e445ce6988" width="700" alt="실시간 채팅" />

<br/>
<br/>

### 📸 인증 피드 업로드  
> **"하루 한 장, 당신의 변화가 시작됩니다."**

**사용자가 이미지와 내용을 업로드**하면,  
**S3 Presigned URL로 이미지 업로드**, 메타데이터는 **MySQL에 저장**됩니다.

<img src="https://github.com/user-attachments/assets/b2049261-6ced-4be9-82ef-6c1eee523804" width="700" alt="인증 피드" />

<br/>
<br/>

### 👑 방장 검수 기능  
> **"진짜 인증만, 진짜로 인정받는다!"**

**방장은 각 피드에 대해 승인/반려 상태를 변경**할 수 있으며,  
변경된 상태는 **DB에 저장**, **리워드 조건에 직접 반영**됩니다.

<img src="https://github.com/user-attachments/assets/0a298cd3-cefe-4032-9cdc-21a6ccc7405a" width="700" alt="방장 승인 기능" />

<br/>
<br/>

### 🧾 마이페이지  
> **"내 운동, 내 챌린지, 내 리워드까지 한 눈에!"**

서버에서 **JWT 기반으로 인증된 사용자의 모든 활동 데이터를 통합 조회**하여  
**챌린지, 피드, 결제 내역** 등을 **한눈에 마이페이지에 표시**합니다.

<img src="https://github.com/user-attachments/assets/51a9d143-a0a7-49c0-ba44-060dda54f7d1" width="700" alt="마이페이지" />

<br/>
<br/>

## ✅ 서비스 구조도

<img src="https://github.com/user-attachments/assets/93069da6-e930-4185-b0d2-d85e5e3ad024" width="700" alt="오늘 서비스 아키텍처" />

<br/>
<br/>

## ⚒️ Tech Stacks

| 분류 | 기술 스택 |
|------|-----------|
| **Frontend** | [![My Skills](https://skillicons.dev/icons?i=react,vite,tailwind,ts)](https://skillicons.dev) |
| **Backend** | [![My Skills](https://skillicons.dev/icons?i=java,spring)](https://skillicons.dev)  |
| **DB / Infra** | [![My Skills](https://skillicons.dev/icons?i=mysql,redis,nginx,aws)](https://skillicons.dev) |
| **배포** | [![My Skills](https://skillicons.dev/icons?i=githubactions,docker)](https://skillicons.dev) |
| **협업** | [![My Skills](https://skillicons.dev/icons?i=figma,git,github,notion)](https://skillicons.dev) |

<br/>
<br/>

## 🤼 팀원 소개

| 이찬 | 강설민 | 유아름 |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/3bc958ec-4303-4559-b20e-465fe1776e17" width="120"> | <img src="https://github.com/user-attachments/assets/ef01bd70-5a43-4264-b496-3b0874d108de" width="120"> | <img src="https://github.com/user-attachments/assets/259b607f-5a92-4d14-bdc6-91c98ed50149" width="120"> |
| **Frontend / Backend** | **Backend** | **Frontend / Backend** |
| [@today-is-first](https://github.com/today-is-first) | [@seolminkkang](https://github.com/seolminkkang) | [@aoooec](https://github.com/aoooec) |
