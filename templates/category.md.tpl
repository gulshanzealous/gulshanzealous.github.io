---
layout: default

title: "{{TITLE}}"

permalink: /categories/{{CATEGORY}}/
---


{% assign posts = site.posts
  | where: "category", "{{CATEGORY}}"
  | where: "status", "published"
%}

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
