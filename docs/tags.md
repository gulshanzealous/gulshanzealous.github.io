---
layout: default
title: Tags
permalink: /tags/
---

# Tags

{% assign tags = site.tags | sort %}

{% for tag in tags %}

<div class="post-card">

  <h3>{{ tag[0] }}</h3>

  {% for post in tag[1] %}

    {% if post.status == "published" %}

      <div>

        <a href="{{ post.url }}">
          {{ post.title }}
        </a>

      </div>

    {% endif %}

  {% endfor %}

</div>

{% endfor %}
