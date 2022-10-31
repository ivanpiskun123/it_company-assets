class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, 
         :recoverable, :rememberable, :validatable

    include Devise::JWT::RevocationStrategies::JTIMatcher

    devise :database_authenticatable, :trackable,  :validatable,
           :jwt_authenticatable, jwt_revocation_strategy: self

  has_one_attached :avatar



  after_initialize :init

  belongs_to :position
  has_many :units
  has_many :bids

  # SCOPES
  # scope :serviceable_equipment, -> { where(breakdown_cause: nil) }


  validates_associated :position
  validates_presence_of :position

  validates :first_name, :second_name, :email, presence: true

  validates :work_experience, inclusion: { in: 0.0 ..99999999999.0 ,
            message: "(%{value}) can't be less 0 and more 99999999999" }

  def init
      self.is_admin = false if self.is_admin.nil?
  end

  def units_count
     self.units.where(breakdown_cause: nil).count
  end

  def opened_bids_count
    self.bids.where(unit: nil).count
  end

  def bids_count
    self.bids.count
  end

  def broken_units_count
    self.units.where.not(breakdown_cause_id: nil).count
  end

  def months_in_company
    (Date.today.year*12+Date.today.month) - (self.created_at.year*12+self.created_at.month)
  end

  def rating
      score = self.broken_units_count.to_f / months_in_company
      case score
      when 0..0.0556 # 0 - 1.5 year
          5
        when 0.0556..0.084 # 1.5 - 1 year
          4
        when 0.084..0.1429 # 1 year - 7 months
          3
        when 0.1429..0.2 # 1 year - 5 months
          2
        else 1
      end
  end


end
