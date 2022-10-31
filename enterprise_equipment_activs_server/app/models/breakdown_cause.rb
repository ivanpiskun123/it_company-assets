class BreakdownCause < ApplicationRecord

  has_many :units

  validates :body, presence: true


end
