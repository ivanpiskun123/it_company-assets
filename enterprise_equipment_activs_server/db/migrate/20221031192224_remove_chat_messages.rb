class RemoveChatMessages < ActiveRecord::Migration[6.1]
  def change
    drop_table :chat_messages do |t|
      t.text content
      t.belongs_to :chat
      t.belongs_to :user
      t.timestamps null: false
    end
  end
end
