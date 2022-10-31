class RemoveChats < ActiveRecord::Migration[6.1]
  def change
    drop_table :chats do |t|
      t.belongs_to :user
      t.timestamps null: false
    end
  end
end
