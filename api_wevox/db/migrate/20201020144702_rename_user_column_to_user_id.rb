class RenameUserColumnToUserId < ActiveRecord::Migration[5.2]
  def change
    rename_column :rooms, :user1, :user1_id
    rename_column :rooms, :user2, :user2_id
    rename_column :rooms, :user3, :user3_id
    rename_column :rooms, :user4, :user4_id
  end
end
