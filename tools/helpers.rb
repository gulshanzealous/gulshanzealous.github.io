require "yaml"
require "fileutils"
require "time"

ROOT = File.expand_path("..", __dir__)

POST_DIR = "#{ROOT}/docs/_posts"
CATEGORY_DIR = "#{ROOT}/docs/categories"
BLOG_FILE = "#{ROOT}/docs/_data/blog.yml"

FileUtils.mkdir_p(POST_DIR)
FileUtils.mkdir_p(CATEGORY_DIR)

def load_blog
  unless File.exist?(BLOG_FILE)
    abort("Missing #{BLOG_FILE}")
  end

  YAML.load_file(BLOG_FILE)
end

def save_blog(blog)
  File.write(
    BLOG_FILE,
    blog.to_yaml
  )
end

def find_post(post_id)
  Dir.glob(
    "#{POST_DIR}/#{post_id}-*.md"
  ).first
end

def replace_status(file, status)
  content = File.read(file)

  content.gsub!(
    /^status:\s*.*/,
    "status: #{status}"
  )

  File.write(file, content)
end

def create_category_page(id, name)
  filename =
    "#{CATEGORY_DIR}/#{id}-#{name}.md"

  File.write(
    filename,
<<~MD
---
layout: category

title: #{name.capitalize}

category: #{name}

permalink: /categories/#{name}/
---

MD
  )
end

def usage
  puts <<~TXT

    Categories

      new-category <name>
      rename-category <category-id> <new-name>

      archive-category <category-id>
      restore-category <category-id>

      delete-category <category-id>

    Posts

      new-post <category> <title>

      publish <post-id>
      draft <post-id>
      archive <post-id>
      delete <post-id>

    Misc

      list
      drafts
      deploy

    Examples

      ruby tools/blog.rb new-category tech

      ruby tools/blog.rb new-post tech "Understanding Go Interfaces"

      ruby tools/blog.rb publish p-1

      ruby tools/blog.rb archive-category c-2

      ruby tools/blog.rb list

  TXT
end
