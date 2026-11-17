# Lesson content

Add lessons under a folder whose name matches the course's slug in
`content/courses/index.json`.
Use one MDX file per lesson and language:

```text
content/lessons/<course-slug>/<lesson-slug>.<en|ro>.mdx
```

Each file must start with frontmatter:

```yaml
---
title: Lesson title
description: Short summary shown in the lesson list
order: 1
published: true
---
```

Set `published` to `false` to keep a lesson out of the public catalog. A lesson is
only listed when its file exists for the requested language.

MDX is executable content. Only merge lesson files from trusted contributors.
