class Nomination < ApplicationRecord
    has_one_attached :icon

    validates :name, :shelf_time, presence: true
end
