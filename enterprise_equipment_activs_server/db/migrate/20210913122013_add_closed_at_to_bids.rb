class AddClosedAtToBids < ActiveRecord::Migration[6.1]
  def change
    add_column :bids, :closed_at, :date
  end
end
