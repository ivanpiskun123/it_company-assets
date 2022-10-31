class RemoveUnitReferenceFromBreakDownCauses < ActiveRecord::Migration[6.1]
  def change
    remove_reference :breakdown_causes, :unit, index: true
  end
end
