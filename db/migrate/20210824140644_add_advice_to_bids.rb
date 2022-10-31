class AddAdviceToBids < ActiveRecord::Migration[6.1]
  def change
        add_column :bids, :advice_product_url, :string
  end
end
