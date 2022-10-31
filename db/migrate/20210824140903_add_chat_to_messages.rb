class AddChatToMessages < ActiveRecord::Migration[6.1]
  def change
    add_reference :chat_messages, :chat, index: true
  end
end
