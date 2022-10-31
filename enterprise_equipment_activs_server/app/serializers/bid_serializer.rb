class BidSerializer
  include JSONAPI::Serializer
  attributes :id, :is_urgent, :unit_id, :advice_product_url

  attribute :nomination_name do |object|
    object.nomination.name
  end

  attribute :nomination_id do |object|
    object.nomination.id
  end

  attribute :created_date do |object|
    object.created_at.to_date
  end

  attribute :created_at do |object|
    object.created_at.to_formatted_s(:db)
  end

  attribute :days_ago, &:days_ago

  attribute :closed_at do |object|
    object.closed_at.to_formatted_s(:db) unless object.closed_at.nil?
  end

  attribute :closed_at_ago do |object|
    (Date.today - object.closed_at.to_date).to_i unless object.closed_at.nil?
  end

  attribute :unit_name do |object|
    "#{object.unit.nomination.name}" unless object.unit.nil?
  end

  attribute :user_name do |object|
    "#{object.user.first_name} #{object.user.second_name}"
  end

  attribute :user_position do |object|
    object.user.position.name
  end

  attribute :user_id do |object|
    object.user.id
  end

  attribute :user_avatar do |object|
    "#{Rails.application.routes.url_helpers.rails_blob_path(object.user.avatar) if object.user.avatar.attached?}"
  end

  attribute :user_rating do |object|
    object.user.rating
  end

end
