class UnitSerializer
  include JSONAPI::Serializer
  attributes :id, :cost, :product_url,  :breaked_at

  attribute :created_date do |object|
    object.created_at.to_date
  end

  attribute :breaked_date do |object|
    object.breaked_at.to_date if object.breaked_at
  end

  attribute :nomination_name do |object|
    object.nomination.name
  end

  attribute :user_name do |object|
    "#{object.user.first_name} #{object.user.second_name}" unless object.user.nil?
  end

  attribute :user_position do |object|
    "#{object.user.position.name}" unless object.user.nil?
  end

  attribute :nomination_avatar do |object|
    "#{Rails.application.routes.url_helpers.rails_blob_path(object.nomination.icon) if object.nomination.icon.attached?}"
  end

  attribute :shelf_time do |object|
    object.nomination.shelf_time
  end

  attribute :working_time, &:working_time

  attribute :breakdown_cause do |object|
    object.breakdown_cause.body unless object.breakdown_cause.nil?
  end


end
