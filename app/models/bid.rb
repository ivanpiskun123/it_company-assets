class Bid < ApplicationRecord
  after_initialize :init

  belongs_to :user
  belongs_to :nomination
  belongs_to :unit, optional: true

  scope :opened, -> { where(unit: nil) }
  scope :closed, -> { where.not(unit: nil) }

  validates_associated :user, :nomination
  validates_presence_of :user, :nomination

  def init
    self.is_urgent = false  if self.is_urgent.nil?
    self.is_viewed = false if self.is_viewed.nil?
  end

  def days_ago
    (Date.today - self.created_at.to_date).to_i
  end



end
