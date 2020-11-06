class CreateTables < ActiveRecord::Migration[5.2]
  def change
    create_table "posts", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
      t.string "title"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
    end

    create_table "test", id: false, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
      t.string "title", limit: 200, null: false, comment: "タイトル"
    end
  end
end
