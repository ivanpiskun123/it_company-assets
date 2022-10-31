class AddDateBreakToUnit < ActiveRecord::Migration[6.1]
  def change
    add_column :units, :breaked_at, :date
  end
end
