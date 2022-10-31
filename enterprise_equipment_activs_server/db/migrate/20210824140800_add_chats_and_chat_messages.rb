class AddChatsAndChatMessages < ActiveRecord::Migration[6.1]
  def change
        create_table :chat_messages do |t|
            t.text :content
            t.belongs_to :user

            t.timestamps
      end

      create_table :chats do |t|
          t.belongs_to :user

          t.timestamps
      end


  end
end
