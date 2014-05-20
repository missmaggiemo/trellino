class AddSortIdToLists < ActiveRecord::Migration
  def change
    add_column :lists, :sort_id, :integer
    add_index :lists, :sort_id
  end
end
