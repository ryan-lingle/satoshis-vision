class AddEditedToWords < ActiveRecord::Migration[5.2]
  def change
    add_column :words, :edited, :boolean
  end
end
