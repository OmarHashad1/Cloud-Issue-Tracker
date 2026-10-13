# Lab 3 — Cloud Issue Tracker Architecture

## 1. Application Goal

## 2. Functional Scope

Record the three operations by the application:

- Create an issue.
- View all issues.
- Change an issue status.

## 3. Request Flow

```
User → Frontend form → POST /api/issues → API validation → Data layer
 ← Render created issue ← 201 + JSON ←───────────────┘
```

Explanation:

- The user fills in the form (title, description) and clicks Submit.
- The frontend sends POST /api/issues with the form data as JSON.
- The API validates the data (title present, length limits). If invalid, it stops and returns code 400 and an error
  message.
- The data layer stores the issue, gives it an id and status "open".
- The API replies 201 Created and the new issue as JSON.
- The frontend adds the new issue to the list on screen

## 4. Trust Boundaries

```
USER-CONTROLLED SIDE APPLICATION-CONTROLLED SIDE
Browser input ───── HTTP request ─────▶ REST API ─────▶ Data
 ▲ │
 └────────── JSON response ◀────────────┘
```

Explanation:\
**User-controlled side:** AKA the browser, the form fields, the buttons, and
every HTTP request that leaves the browser. The user can change any of
it (browser dev tools, curl, Postman). When they a HTTP request is passed it is deemed untrusted until it is validated.
**Application-controlled side:** AKA the REST API and the data layer. Only
the code base runs here, and the data is reachable only through the API.
**The boundary** is the HTTP request and follows rules:

- The API validates every request. Frontend checks are only for
  convenience, never for security.
- The browser never talks to the data layer directly.
- The API returns only what the frontend needs, and never leaks
  internal errors or stack traces.
- The frontend shows issue text as plain text, never as
