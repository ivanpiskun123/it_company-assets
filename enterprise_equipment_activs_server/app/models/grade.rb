class Grade < ApplicationRecord

  validates :grade, numericality: { greater_than_or_equal_to: 1, less_than: 100 }

end
