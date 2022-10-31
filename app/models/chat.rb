class Chat < ApplicationRecord
  has_many :chat_messages, dependent: :destroy, inverse_of: :chat
  belongs_to :user
end
