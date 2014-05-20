class AddSortIdToBoards < ActiveRecord::Migration
  def change
    add_column :boards, :sort_id, :integer
    add_index :boards, :sort_id
  end
end
