# Blog Commands

## Categories

Create category:

```bash
./tools/blog.rb new-category tech
```

Rename category:

```bash
./tools/blog.rb rename-category c-1 engineering
```

Archive category:

```bash
./tools/blog.rb archive-category c-1
```

Restore category:

```bash
./tools/blog.rb restore-category c-1
```

Delete category:

```bash
./tools/blog.rb delete-category c-1
```

Notes:

- Archived categories disappear from navigation.
- Archived categories can be restored.
- Categories cannot be deleted while posts still reference them.

---

## Posts

Create post:

```bash
./tools/blog.rb new-post tech "Understanding Go Interfaces"
```

Publish post:

```bash
./tools/blog.rb publish p-1
```

Move post back to draft:

```bash
./tools/blog.rb draft p-1
```

Archive post:

```bash
./tools/blog.rb archive p-1
```

Delete post:

```bash
./tools/blog.rb delete p-1
```

---

## Listing

List categories and posts:

```bash
./tools/blog.rb list
```

List draft posts:

```bash
./tools/blog.rb drafts
```

---

## Deployment

Commit and push:

```bash
./tools/blog.rb deploy
```

---

## Typical Workflow

Create category:

```bash
./tools/blog.rb new-category tech
```

Create post:

```bash
./tools/blog.rb new-post tech "Understanding Go Interfaces"
```

Edit generated markdown file.

Publish:

```bash
./tools/blog.rb publish p-1
```

Deploy:

```bash
./tools/blog.rb deploy
```

---

## Examples

Create philosophy category:

```bash
./tools/blog.rb new-category philosophy
```

Create startup category:

```bash
./tools/blog.rb new-category startups
```

Create philosophy post:

```bash
./tools/blog.rb new-post philosophy "On Meaning and Work"
```

Create tech post:

```bash
./tools/blog.rb new-post tech "Building a NAS with Go"
```

List everything:

```bash
./tools/blog.rb list
```
