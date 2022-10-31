class AddPositions < ActiveRecord::Migration[6.1]
  def change
    create_table :breakdown_causes do |t|
      t.string :body
      t.boolean :is_common

      t.timestamps
    end
  end
end
