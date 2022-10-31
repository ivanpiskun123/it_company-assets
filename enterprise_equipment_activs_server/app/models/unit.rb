class Unit < ApplicationRecord
  belongs_to :nomination
  belongs_to :user, optional: true
  belongs_to :breakdown_cause, optional: true
  has_one :bid



  # units without user_id = office equipment

  validates :cost, :product_url, presence: true

  validates :cost, inclusion: { in: 0..99999999999 ,
            message: "(%{value}) can't be less 0 and more 99999999999" }


  def working_time
    (((Date.today.year*12+Date.today.month) - (self.created_at.year*12+self.created_at.month))/12.0).round(1)
  end


end
