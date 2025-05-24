# 🏋️ 오늘(oneul) - 운동 인증 챌린지 플랫폼

**"오늘도 인증했나요? 운동도 돈도, 함께 챌린지!"**

**oneul**은 운동 인증, 실시간 소통, 그리고 목표 달성 시 리워드 환급까지 가능한  
**보상 기반의 챌린지 플랫폼**입니다.

---

## 🗂️ 팀 문서 & 자료 링크

<p align="center">
  <a href="https://oneul-pjt.notion.site/SSAFY-1d2bc43cad598007adaff9d1b7e0235f">📒 팀 노션</a> &nbsp;|&nbsp;
  <a href="https://oneul-pjt.notion.site/1d2bc43cad598052b36ce17db47ef476">📚 개발 위키</a> &nbsp;|&nbsp;
  <a href="https://oneul-pjt.notion.site/Ground-Rule-1d2bc43cad59801abca2d92893ca7093">📏 그라운드 룰</a>
</p>

---

## 🤼 팀원 소개

| 이찬 | 강설민 | 유아름 |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/3bc958ec-4303-4559-b20e-465fe1776e17" width="120"> | <img src="https://github.com/user-attachments/assets/ef01bd70-5a43-4264-b496-3b0874d108de" width="120"> | <img src="https://github.com/user-attachments/assets/259b607f-5a92-4d14-bdc6-91c98ed50149" width="120"> |
| **Frontend / Backend** | **Backend** | **Frontend / Backend** |
| [@today-is-first](https://github.com/today-is-first) | [@seolminkkang](https://github.com/seolminkkang) | [@aoooec](https://github.com/aoooec) |

---

## 👋 프로젝트 소개

### 🏆 *"오늘의 운동을 인증하고, 리워드를 받는 챌린지 플랫폼"*

**oneul**은 사용자가 운동 인증을 통해 챌린지에 참여하고,  
목표 달성 시 환급 리워드를 받을 수 있는 **챌린지 기반 웹 서비스**입니다.

- 사용자는 인증 피드를 업로드하며 도전 현황을 기록할 수 있어요.  
- 방장은 인증을 검수하고, 관리에 따른 보상을 받아요.  
- 참여자 간에는 실시간 채팅으로 소통하며 도전을 이어갑니다.

---

## 🎯 주요 기능 소개

---

### 💳 결제 및 환급 시스템  
**"목표 달성, 그 자체가 리워드!"**

유료 챌린지에 참여하면 Toss API 기반으로 결제를 진행합니다.  
챌린지를 성공하면 참가비 일부 또는 전부를 자동 환급받을 수 있어요.

![오늘_결제](https://github.com/user-attachments/assets/5cc53e62-af0a-4739-9584-cbf5bc7840da)

---

### 💬 실시간 채팅  
**"운동 인증 뒤엔, 응원과 피드백이 바로바로!"**

모든 페이지에서 챌린지별 채팅을 제공해  
언제 어디서나 실시간 소통이 가능합니다.

![오늘_채팅](https://github.com/user-attachments/assets/4266943a-b60a-467a-8dc4-bb53de4a4151)

---

### 📸 인증 피드 업로드  
**"하루 한 장, 당신의 변화가 시작됩니다."**

사진과 내용을 피드 형식으로 업로드해 운동을 인증합니다.  
다른 사용자들과 좋아요를 주고받으며 도전 의지를 키워보세요.

![오늘_인증](https://github.com/user-attachments/assets/d31e4ee0-f1cf-4f3a-b682-ced059f33208)

---

### 👑 방장 검수 기능  
**"진짜 인증만, 진짜로 인정받는다!"**

방장은 참여자의 인증 피드를 승인 또는 반려할 수 있어요.  
공정한 챌린지를 위해 인증의 신뢰도를 높이는 핵심 기능입니다.

![오늘_승인](https://github.com/user-attachments/assets/b7bf69de-2438-426e-968f-b2b727db4131)

---

### 👥 팔로우 & 커뮤니티  
**"함께하면 더 오래갑니다!"**

사용자 간 팔로우, 피드 좋아요를 통해  
함께 성장하는 커뮤니티를 만들어갑니다.

![오늘_사용자](https://github.com/user-attachments/assets/b20e262b-a40e-4507-b1f9-4510fbb707e1)

---

### 🧾 마이페이지  
**"내 운동, 내 챌린지, 내 리워드까지 한 눈에!"**

참여 챌린지, 내가 올린 피드, 결제 영수증까지  
모든 기록을 한 곳에서 간편하게 관리할 수 있어요.

![오늘_마이페이지_영수증](https://github.com/user-attachments/assets/a3968855-0335-4d7d-a2cc-797bd29f1c74)

---
---

## ✅ 서비스 구조도

![오늘 서비스 아키텍쳐](https://github.com/user-attachments/assets/93069da6-e930-4185-b0d2-d85e5e3ad024)

---

## ⚒️ Tech Stacks

| 분류 | 기술 스택 |
|------|-----------|
| 공통 | [![My Skills](https://skillicons.dev/icons?i=ts,github)](https://skillicons.dev) |
| FE | [![My Skills](https://skillicons.dev/icons?i=react,vite,tailwind)](https://skillicons.dev) <br/> Zustand, React Query |
| BE | [![My Skills](https://skillicons.dev/icons?i=java,spring)](https://skillicons.dev) <br/> Netty-Socket.IO |
| DB/Infra | [![My Skills](https://skillicons.dev/icons?i=mysql,redis,nginx,aws)](https://skillicons.dev) <br/> EC2 |
| 배포 | [![My Skills](https://skillicons.dev/icons?i=githubactions,docker)](https://skillicons.dev) |
| 협업 | [![My Skills](https://skillicons.dev/icons?i=figma,git,github,notion)](https://skillicons.dev) |



