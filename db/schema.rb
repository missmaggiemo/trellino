# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140519184513) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "boards", force: true do |t|
    t.string   "title",                   null: false
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "sort_id"
    t.integer  "user_id",     default: 1, null: false
  end

  add_index "boards", ["sort_id"], name: "index_boards_on_sort_id", using: :btree
  add_index "boards", ["title"], name: "index_boards_on_title", unique: true, using: :btree
  add_index "boards", ["user_id"], name: "index_boards_on_user_id", using: :btree

  create_table "cards", force: true do |t|
    t.integer  "list_id",    null: false
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "sort_id"
  end

  add_index "cards", ["list_id"], name: "index_cards_on_list_id", using: :btree
  add_index "cards", ["sort_id"], name: "index_cards_on_sort_id", using: :btree

  create_table "lists", force: true do |t|
    t.string   "title",      null: false
    t.integer  "board_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "sort_id"
  end

  add_index "lists", ["board_id"], name: "index_lists_on_board_id", using: :btree
  add_index "lists", ["sort_id"], name: "index_lists_on_sort_id", using: :btree
  add_index "lists", ["title", "board_id"], name: "index_lists_on_title_and_board_id", unique: true, using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "username",               default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
