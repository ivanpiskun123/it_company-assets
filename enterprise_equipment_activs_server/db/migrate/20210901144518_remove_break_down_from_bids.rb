class RemoveBreakDownFromBids < ActiveRecord::Migration[6.1]
  def change
      remove_reference :bids, :breakdown_cause, index: true
        
  end
end
