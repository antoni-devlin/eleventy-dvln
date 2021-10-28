---
pagination:
    data: collections
    size: 1
    alias: tag
permalink: /tags/{{ tag }}/
---

<h1>Posts tagged with #{{ tag  }}</h1>

{% set taglist = collections[ tag ] %}
{% for post in taglist | reverse %}
<section class="post-teaser">
  <img src="{{ post.data.hero.url }}" alt="{{ post.data.hero.alt }}">
  <a href="{{post.url}}">
    <h1>{{post.data.title}}</h1>
  </a>
  <p class="date">{{post.date|dateFilter}}</p>
  <p>{{post.content|safe|truncate(450)}}</p>
</section>
{% endfor %}