class ChatMessage < ApplicationRecord
  belongs_to :user
  belongs_to :chat, :inverse_of => :chat_messages
end
