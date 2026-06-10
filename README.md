# socketio_ex202606

Node.js, Express, Socket.IO를 사용한 실시간 채팅 예제 프로젝트입니다.  
브라우저 클라이언트에서 메시지를 보내면 Socket.IO 서버가 접속 중인 모든 클라이언트에게 메시지를 브로드캐스트합니다.

## 주요 기능

- Express 기반 정적 파일 제공
- Socket.IO 기반 실시간 채팅
- 사용자 접속/퇴장 시스템 메시지 전송
- 메시지 전송 시각 표시
- 개발용 예제 서버에서 파일 업로드 라우트 제공

## 기술 스택

- Node.js
- Express
- Socket.IO
- Nodemon
- Multer
- CORS
- Express Session

## 프로젝트 구조

```text
.
|-- public/
|   |-- index.html        # 메인 채팅 화면
|   |-- client.js         # Socket.IO 채팅 클라이언트
|   |-- styles.css        # 채팅 화면 스타일
|   |-- chat_ex01.html    # Socket.IO 연결 테스트 페이지
|   `-- photo.html        # 파일 업로드 테스트 페이지
|-- src/
|   |-- server.js
|   `-- chat_ex01.js
|-- chat_ex01.js          # test-server.js에서 사용하는 Socket.IO 모듈
|-- server.js             # 메인 채팅 서버
|-- test-server.js        # 개발/업로드 테스트용 서버
|-- package.json
`-- README.md
```

## 설치

```bash
npm install
```

PowerShell에서 `npm.ps1` 실행 정책 오류가 발생하면 다음처럼 실행할 수 있습니다.

```bash
npm.cmd install
```

## 실행

메인 채팅 서버를 실행합니다.

```bash
npm start
```

브라우저에서 다음 주소로 접속합니다.

```text
http://localhost:3000
```

여러 브라우저 탭을 열고 메시지를 보내면 모든 탭에 실시간으로 메시지가 표시됩니다.

PowerShell에서 실행 정책 오류가 발생하면 다음 명령을 사용합니다.

```bash
npm.cmd start
```

## 개발 서버 실행

`nodemon`을 사용해 `test-server.js`를 실행합니다.

```bash
npm run dev
```

이 서버는 정적 파일 제공, Socket.IO 테스트, 파일 업로드 라우트를 포함합니다.

```text
http://localhost:3000/chat_ex01.html
http://localhost:3000/photo.html
```

## Socket.IO 이벤트

### 서버 수신

| 이벤트 | 설명 |
| --- | --- |
| `chat:message` | 클라이언트가 보낸 채팅 메시지를 수신합니다. 빈 메시지는 무시합니다. |

### 서버 발신

| 이벤트 | 설명 |
| --- | --- |
| `chat:message` | 모든 클라이언트에게 채팅 메시지를 전송합니다. |
| `system:message` | 사용자 입장/퇴장 안내 메시지를 전송합니다. |

## 파일 업로드 테스트

개발 서버 실행 후 다음 페이지에서 파일 업로드를 테스트할 수 있습니다.

```text
http://localhost:3000/photo.html
```

업로드 요청은 `POST /process/photo`로 전송되며, `multer`를 사용해 파일을 처리합니다.

## npm 스크립트

| 명령어 | 설명 |
| --- | --- |
| `npm start` | `server.js`를 실행합니다. |
| `npm run dev` | `nodemon test-server.js`를 실행합니다. |

## 참고

- 기본 포트는 `3000`입니다.
- `server.js`는 `process.env.PORT` 값이 있으면 해당 포트를 사용합니다.
- `test-server.js`는 현재 코드상 `3000` 포트로 실행됩니다.
