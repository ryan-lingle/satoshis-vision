class CreateEdits < ActiveRecord::Migration[5.2]
  def change
    create_table :edits do |t|
      t.string :former
      t.string :new
      t.integer :word_id
      t.timestamps
    end
  end
end
