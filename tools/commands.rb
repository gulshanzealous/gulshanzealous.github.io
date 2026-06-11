require_relative "helpers"

def new_category(name)
  abort("category name required") unless name

  blog = load_blog

  existing =
    blog["categories"].find do |c|
      c["name"] == name
    end

  abort("category already exists") if existing

  id = "c-#{blog["next_category_id"]}"

  blog["next_category_id"] += 1

  blog["categories"] << {
    "id" => id,
    "name" => name,
    "status" => "active"
  }

  save_blog(blog)

  create_category_page(id, name)

  puts "Created #{id}"
end

def rename_category(id, new_name)
  abort("usage: rename-category <id> <new-name>") unless id && new_name

  blog = load_blog

  category =
    blog["categories"].find do |c|
      c["id"] == id
    end

  abort("category not found") unless category

  old_name = category["name"]

  category["name"] = new_name

  save_blog(blog)

  Dir.glob("#{POST_DIR}/*.md").each do |file|
    content = File.read(file)

    content.gsub!(
      /^category:\s*#{Regexp.escape(old_name)}$/,
      "category: #{new_name}"
    )

    File.write(file, content)
  end

  old_page =
    "#{CATEGORY_DIR}/#{id}-#{old_name}.md"

  File.delete(old_page) if File.exist?(old_page)

  create_category_page(id, new_name)

  puts "Renamed #{id}"
end

def archive_category(id)
  abort("usage: archive-category <id>") unless id

  blog = load_blog

  category =
    blog["categories"].find do |c|
      c["id"] == id
    end

  abort("category not found") unless category

  category["status"] = "archived"

  save_blog(blog)

  puts "Archived #{id}"
end

def restore_category(id)
  abort("usage: restore-category <id>") unless id

  blog = load_blog

  category =
    blog["categories"].find do |c|
      c["id"] == id
    end

  abort("category not found") unless category

  category["status"] = "active"

  save_blog(blog)

  puts "Restored #{id}"
end

def delete_category(id)
  abort("usage: delete-category <id>") unless id

  blog = load_blog

  category =
    blog["categories"].find do |c|
      c["id"] == id
    end

  abort("category not found") unless category

  category_name = category["name"]

  used_by = []

  Dir.glob("#{POST_DIR}/*.md").each do |file|
    content = File.read(file)

    if content.match?(
      /^category:\s*#{Regexp.escape(category_name)}$/
    )
      used_by << file
    end
  end

  unless used_by.empty?
    puts
    puts "Cannot delete category #{id}"
    puts
    puts "Posts still reference '#{category_name}'"
    puts

    used_by.each do |file|
      puts "  #{File.basename(file)}"
    end

    exit 1
  end

  blog["categories"].reject! do |c|
    c["id"] == id
  end

  save_blog(blog)

  Dir.glob(
    "#{CATEGORY_DIR}/#{id}-*.md"
  ).each do |file|
    File.delete(file)
  end

  puts "Deleted #{id}"
end

def new_post(category, title)
  abort("usage: new-post <category> <title>") unless category && title

  blog = load_blog

  cat =
    blog["categories"].find do |c|
      c["name"] == category
    end

  abort("category not found") unless cat

  post_id = "p-#{blog["next_post_id"]}"

  blog["next_post_id"] += 1

  save_blog(blog)

  timestamp =
    Time.now.strftime("%Y-%m-%d-%H%M%S")

  slug =
    title
      .downcase
      .gsub(/[^a-z0-9 ]/, "")
      .tr(" ", "-")

  filename =
  "#{POST_DIR}/#{timestamp}-#{post_id}-#{slug}.md"

  File.write(
    filename,
<<~MD
---
id: #{post_id}

layout: post

title: "#{title}"

category: #{category}

tags: []

description: ""

status: draft

created_at: #{Time.now.iso8601}
updated_at: #{Time.now.iso8601}
---

## Problem

## Thoughts

## Conclusion
MD
  )

  puts filename
end

def publish_post(id)
  file = find_post(id)

  abort("post not found") unless file

  replace_status(file, "published")

  puts "Published #{id}"
end

def draft_post(id)
  file = find_post(id)

  abort("post not found") unless file

  replace_status(file, "draft")

  puts "Draft #{id}"
end

def archive_post(id)
  file = find_post(id)

  abort("post not found") unless file

  replace_status(file, "archived")

  puts "Archived #{id}"
end

def delete_post(id)
  file = find_post(id)

  abort("post not found") unless file

  puts
  puts "Delete?"
  puts "  #{file}"
  puts

  answer = STDIN.gets.chomp

  return unless answer == "y"

  File.delete(file)

  puts "Deleted #{id}"
end

def list
  blog = load_blog

  puts
  puts "Categories"
  puts "----------"

  blog["categories"].each do |c|
    puts "#{c["id"]} | #{c["status"]} | #{c["name"]}"
  end

  puts
  puts "Posts"
  puts "-----"

  Dir.glob("#{POST_DIR}/*.md").sort.each do |file|

    content = File.read(file)

    id =
      content[/^id:\s*(.+)$/, 1]

    title =
      content[/^title:\s*"(.+)"$/, 1]

    status =
      content[/^status:\s*(.+)$/, 1]

    puts "#{id} | #{status} | #{title}"
  end
end

def drafts
  Dir.glob("#{POST_DIR}/*.md").sort.each do |file|

    content = File.read(file)

    next unless content.include?("status: draft")

    puts File.basename(file)
  end
end

def deploy
  system("git add .")
  system("git commit -m 'publish'")
  system("git push")
end
