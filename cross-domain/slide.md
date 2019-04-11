title: Cross Domain
speaker: czhang

<slide class="bg-dark-r aligncenter"  >

# Cross Domain {.text-landing.text-shadow}

---

By czhang {.text-intro}

<slide class="bg-dark-r"  >

# SAME-ORIGIN POLICY {.slide-up.content-left}

:::div {.slide-up.content-right.tobuild.fadeInUp.text-intro}

http\://yuansuan.com/hybridcloud.html

---

- http\://yuansuan.com/yungewu.html {.tobuild.fadeInUp}

- https\://yuansuan.com/hybridcloud.html {.tobuild.fadeInUp}

- http\://lambdacal.com/hybridcloud.html {.tobuild.fadeInUp}

- http\://yuansuan.com\:9000/hybridcloud.html {.tobuild.fadeInUp}

:::

:::div {.slide-up.tobuild.fadeInUp.text-intro}

- _protocol_

- _host_

- _port_

:::
<slide class="bg-dark-r aligncenter">

# INTERACTIONS BETWEEN TWO DIFFERENT ORIGINS

:::div {.text-intro}

---

- Cross-origin writes => typically allowed
  - links redirects forms
- Cross-origin embedding => typically allowed
  - \<script src="…"\>\<\/script\>
  - \<link rel="stylesheet" href="…"> cross-origin CSS requires a correct Content-Type header
  - \<img>
  - \<video>
  - ...
- Cross-origin reads => typically disallowed

:::

<slide class="bg-dark-r aligncenter">

# window.postMessage {.text-landing.text-shadow}

:::div {.text-intro}

---

- otherWindow.postMessage(message, targetOrigin, [transfer]);

- "otherWindow"\: reference to the window that will receive the message

  - open new window
  - iframe

- always verify the sender's identity

:::

<slide class="bg-dark-r aligncenter">

# window.name {.text-landing.text-shadow}

---

```
> window.name
""

> window.name = "yskj"
"yskj"

> location.href = "http://www.google.com"
"http://www.google.com"
Navigated to http://www.google.com

> window.name
"yskj"

```

<slide class="bg-dark-r aligncenter">

# location.hash {.text-landing.text-shadow}

---

#### url data

<slide class="bg-dark-r aligncenter">

# document.domain {.text-landing}

---

```

 a.test.com
 b.test.com

 document.domain = "test.com"

```

<slide class="bg-dark-r aligncenter">

# JSONP {.text-landing.text-shadow}

---

#### only get request

<slide class="bg-dark-r aligncenter">

# CORS {.text-landing.text-shadow}

:::div {.text-intro}

---

- Cross-Origin Resource Sharing
  - Simple requests
  - Preflighted requests

:::

<slide class="bg-dark-r aligncenter">

Simple requests {.text-intro}

:::div {.text-intro.slide-up.content-left}

---

- only allowed method:
  - GET / HEAD / POST
- Content-Type
  - text/plain
  - multipart/form-data
  - application/x-www-form-urlencoded
- Other Head
  - Accept
  - Accept-Language
  - Content-Language

:::

Access-Control-Allow-Origin\: \* | \<origin> {.tobuild.fadeInUp.text-intro.content-right}

<slide class="bg-dark-r aligncenter">

Preflighted requests {.text-intro}

:::div {.text-intro.slide-up.content-left}

---

- methods:

  - PUT/DELETE/CONNECT/OPTIONS/TRACE/PATCHGET

- Other Head

:::

:::div {.tobuild.fadeInUp.text-intro.content-right}

- Access-Control-Allow-Origin\: \* | \<origin>
- Access-Control-Allow-Methods\: POST, OPTIONS
- Access-Control-Expose-Headers\: X-My-Custom-Header
- Access-Control-Allow-Headers\: \* | \<field-name>
- Access-Control-Max-Age\: \<delta-seconds>
- Access-Control-Allow-Credentials\: true

:::

<slide class="bg-dark-r aligncenter">

# NODEJS {.text-landing.text-shadow}

---

:::div {.text-intro}
browser -> proxy -> server
:::

<slide class="bg-dark-r aligncenter">

# NGINX {.text-landing.text-shadow}

---

```

server {
    listen 9999;
    server_name localhost;
    location / {
      proxy_pass localhost:8888;
      add_header Access-Control-Allow-Origin *;
    }
}

```
