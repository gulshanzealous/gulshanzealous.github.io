---
layout: default
title: Home
---

{% assign posts = site.posts | where_exp: "post", "post.status == 'published' and post.category == 'tech'" %}

{% for post in posts %}

<div class="post-card">

  <a href="{{ post.url }}">
    {{ post.title }}
  </a>

  <div class="meta">
    {{ post.date | date: "%d %b %Y" }}
  </div>

</div>

{% endfor %}
