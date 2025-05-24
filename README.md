## 🗂️ 팀 문서 & 자료 링크

<p align="center">
  <a href="https://oneul-pjt.notion.site/SSAFY-1d2bc43cad598007adaff9d1b7e0235f">📒 팀 노션</a> &nbsp;|&nbsp;
  <a href="https://oneul-pjt.notion.site/1d2bc43cad598052b36ce17db47ef476">📚 개발 위키</a> &nbsp;|&nbsp;
  <a href="https://oneul-pjt.notion.site/Ground-Rule-1d2bc43cad59801abca2d92893ca7093">📏 그라운드 룰</a>
</p>

<br/>

## 👋 프로젝트 소개

### 🏆 *"오늘의 운동을 인증하고, 리워드를 받는 챌린지 플랫폼"*

**oneul**은 사용자가 **운동 인증을 통해 챌린지에 참여**하고,  
**목표 달성 시 환급 리워드**를 받을 수 있는 **챌린지 기반 웹 서비스**입니다.

- 사용자는 **인증 피드를 업로드**하며 도전 현황을 기록할 수 있어요.  
- 방장은 **인증을 검수**하고, **관리에 따른 보상**을 받아요.  
- 참여자 간에는 **실시간 채팅으로 소통**하며 도전을 이어갑니다.

<br/>

## 🎯 주요 기능 소개

### 💳 결제 및 환급 시스템  
> **"목표 달성, 그 자체가 리워드!"**

**유저는 Toss 결제 API를 통해 챌린지 참가비를 결제**하고,  
**목표를 달성하면 서버가 자동으로 환급 처리를 수행**합니다.  
→ 결제 상태는 **Redis에 임시 저장**, **MySQL에 영구 반영**됩니다.

<img src="https://github.com/user-attachments/assets/5cc53e62-af0a-4739-9584-cbf5bc7840da" width="700" alt="결제 시스템" />

<br/>

### 💬 실시간 채팅  
> **"운동 인증 뒤엔, 응원과 피드백이 바로바로!"**

**채팅은 Netty-Socket.io 기반 WebSocket 서버**와 연결되어 있으며,  
메시지는 **방별로 실시간 브로드캐스팅** 됩니다.

<img src="https://github.com/user-attachments/assets/4266943a-b60a-467a-8dc4-bb53de4a4151" width="700" alt="실시간 채팅" />

<br/>

### 📸 인증 피드 업로드  
> **"하루 한 장, 당신의 변화가 시작됩니다."**

**사용자가 이미지와 내용을 업로드**하면,  
**S3 Presigned URL로 이미지 업로드**, 메타데이터는 **MySQL에 저장**됩니다.

<img src="https://github.com/user-attachments/assets/d31e4ee0-f1cf-4f3a-b682-ced059f33208" width="700" alt="인증 피드" />

<br/>

### 👑 방장 검수 기능  
> **"진짜 인증만, 진짜로 인정받는다!"**

**방장은 각 피드에 대해 승인/반려 상태를 변경**할 수 있으며,  
변경된 상태는 **DB에 저장**, **리워드 조건에 직접 반영**됩니다.

<img src="https://github.com/user-attachments/assets/b7bf69de-2438-426e-968f-b2b727db4131" width="700" alt="방장 승인 기능" />

<br/>

### 👥 팔로우 & 커뮤니티  
> **"함께하면 더 오래갑니다!"**

**팔로우와 좋아요는 각각 `follow`, `feed_like` 테이블에 기록**됩니다.

<img src="https://github.com/user-attachments/assets/b20e262b-a40e-4507-b1f9-4510fbb707e1" width="700" alt="팔로우 시스템" />

<br/>

### 🧾 마이페이지  
> **"내 운동, 내 챌린지, 내 리워드까지 한 눈에!"**

서버에서 **JWT 기반으로 인증된 사용자의 모든 활동 데이터를 통합 조회**하여  
**챌린지, 피드, 결제 내역** 등을 **한눈에 마이페이지에 표시**합니다.

<img src="https://github.com/user-attachments/assets/a3968855-0335-4d7d-a2cc-797bd29f1c74" width="700" alt="마이페이지" />

<br/>

## ✅ 서비스 구조도

<img src="https://github.com/user-attachments/assets/93069da6-e930-4185-b0d2-d85e5e3ad024" width="700" alt="오늘 서비스 아키텍처" />

<br/>

## ⚒️ Tech Stacks

| 분류 | 기술 스택 |
|------|-----------|
| **공통** | [![My Skills](https://skillicons.dev/icons?i=ts,github)](https://skillicons.dev) |
| **Frontend** | [![My Skills](https://skillicons.dev/icons?i=react,vite,tailwind)](https://skillicons.dev) <br/> **Zustand**, **React Query** |
| **Backend** | [![My Skills](https://skillicons.dev/icons?i=java,spring)](https://skillicons.dev) <br/> **Netty-Socket.IO** |
| **DB / Infra** | [![My Skills](https://skillicons.dev/icons?i=mysql,redis,nginx,aws)](https://skillicons.dev) <br/> **EC2** |
| **배포** | [![My Skills](https://skillicons.dev/icons?i=githubactions,docker)](https://skillicons.dev) |
| **협업** | [![My Skills](https://skillicons.dev/icons?i=figma,git,github,notion)](https://skillicons.dev) |

<br/>

## 🤼 팀원 소개

| 이찬 | 강설민 | 유아름 |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/3bc958ec-4303-4559-b20e-465fe1776e17" width="120"> | <img src="https://github.com/user-attachments/assets/ef01bd70-5a43-4264-b496-3b0874d108de" width="120"> | <img src="https://github.com/user-attachments/assets/259b607f-5a92-4d14-bdc6-91c98ed50149" width="120"> |
| **Frontend / Backend** | **Backend** | **Frontend / Backend** |
| [@today-is-first](https://github.com/today-is-first) | [@seolminkkang](https://github.com/seolminkkang) | [@aoooec](https://github.com/aoooec) |
