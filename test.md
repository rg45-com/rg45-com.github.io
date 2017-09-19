---
layout: default
title: test page
---
<p>A list of things Jekyll should provide, I guess...</p>

<h1>All Posts</h1>
<ul>
  {% for post in site.posts %}
    <li>
      <img src="{{ post.thumbnail }}" width="150px" ><a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>