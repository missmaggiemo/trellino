class AddUserIdToBoards < ActiveRecord::Migration
  def change
    add_column :boards, :user_id, :integer, null: false, default: 1
    add_index :boards, :user_id
  end
end
