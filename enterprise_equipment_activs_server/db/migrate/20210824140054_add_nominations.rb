class AddNominations < ActiveRecord::Migration[6.1]
  def change
    create_table :nominations do |t|
      t.string :name
      t.float :shelf_time

      t.timestamps
    end
  end
end
