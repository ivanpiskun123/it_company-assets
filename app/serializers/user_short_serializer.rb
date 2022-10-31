class UserShortSerializer
  include JSONAPI::Serializer

  attributes :id ,:first_name, :second_name,  :is_admin

  attribute :position_name do |object|
    object.position.name
  end

  attribute :avatar do |object|
     # "#{Rails.application.routes.url_helpers.url_for(object.avatar) if object.avatar.attached?}"

    "#{Rails.application.routes.url_helpers.rails_blob_path(object.avatar) if object.avatar.attached?}"
  end

  attribute :units_count, &:units_count
  attribute :opened_bids_count, &:opened_bids_count
  attribute :rating, &:rating
  attribute :bids_count, &:bids_count
  attribute :months_in_company, &:months_in_company
end
