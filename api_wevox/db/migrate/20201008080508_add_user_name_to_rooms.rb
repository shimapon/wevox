class AddUserNameToRooms < ActiveRecord::Migration[5.2]
  def change
    add_column :rooms, :user1, :string
    add_column :rooms, :user2, :string
    add_column :rooms, :user3, :string
    add_column :rooms, :user4, :string
  end
end
