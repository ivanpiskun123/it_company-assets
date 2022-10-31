class AddGrades < ActiveRecord::Migration[6.1]
  def change
    create_table :grades do |t|
      t.integer :grade
      t.timestamps
    end
  end
end
