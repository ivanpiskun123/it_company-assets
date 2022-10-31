class AddUnits < ActiveRecord::Migration[6.1]
  def change
    create_table :units do |t|
      t.integer :cost
      t.string :product_url
      t.belongs_to :user
      t.belongs_to :nomination



      t.timestamps
    end
  end
end
