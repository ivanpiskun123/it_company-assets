class AddUnitToCauses < ActiveRecord::Migration[6.1]
  def change
    add_reference :breakdown_causes, :unit, index: true
  end
end
