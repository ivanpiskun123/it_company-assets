class CreateBids < ActiveRecord::Migration[6.1]
  def change
    create_table :bids do |t|

      t.boolean :is_urgent
      t.belongs_to :breakdown_cause
      t.belongs_to :nomination
      t.boolean :is_viewed
      t.belongs_to :unit
      t.belongs_to :user

      t.timestamps
    end
  end
end
