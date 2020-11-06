class ChangeDataUsersToRoom < ActiveRecord::Migration[5.2]
  def change
    change_column :rooms, :user1, :integer
    change_column :rooms, :user2, :integer
    change_column :rooms, :user3, :integer
    change_column :rooms, :user4, :integer
  end
end
