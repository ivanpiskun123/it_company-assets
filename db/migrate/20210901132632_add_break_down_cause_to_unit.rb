class AddBreakDownCauseToUnit < ActiveRecord::Migration[6.1]
  def change
    add_reference :units, :breakdown_cause, index: true
    remove_column :breakdown_causes, :is_common
  end
end
