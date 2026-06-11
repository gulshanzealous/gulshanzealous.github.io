#!/usr/bin/env ruby

require_relative "commands"

command = ARGV.shift

case command

when "new-category"
  new_category(ARGV[0])

when "rename-category"
  rename_category(
    ARGV[0],
    ARGV[1]
  )

when "archive-category"
  archive_category(ARGV[0])

when "restore-category"
  restore_category(ARGV[0])

when "delete-category"
  delete_category(ARGV[0])

when "new-post"

  category = ARGV.shift

  title = ARGV.join(" ")

  new_post(
    category,
    title
  )

when "publish"
  publish_post(ARGV[0])

when "draft"
  draft_post(ARGV[0])

when "archive"
  archive_post(ARGV[0])

when "delete"
  delete_post(ARGV[0])

when "list"
  list

when "drafts"
  drafts

when "deploy"
  deploy

when "help"
  usage

else
  usage

end
