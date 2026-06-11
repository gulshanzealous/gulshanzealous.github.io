# Gulshan Zealous Blog

A minimal, dark, mobile-friendly blog built with Jekyll and hosted on GitHub Pages.

## Features

- Black background
- White text
- Mobile friendly
- Markdown posts
- Categories
- Dynamic tags
- Draft / Published / Archived posts
- Reading time
- Analytics support
- GitHub Pages deployment

## Local Development

Install dependencies:

```bash
bundle install
```

Run locally:

```bash
cd docs

bundle exec jekyll serve
```

Open:

```text
http://localhost:4000
```

## Writing

All blog management commands are documented in:

```text
COMMANDS.md
```

## Repository Structure

```text
docs/
├── _posts/
├── categories/
├── _layouts/
├── _data/
└── assets/

tools/
├── blog.rb
├── commands.rb
└── helpers.rb
```

## Deployment

GitHub Pages serves the site from:

```text
/docs
```
