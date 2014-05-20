class CreateBoards < ActiveRecord::Migration
  def change
    create_table :boards do |t|
      t.string :title, null: false
      t.text :description
      
      t.timestamps
    end
    add_index :boards, :title, unique: true
  end
end
