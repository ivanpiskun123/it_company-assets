class CurrentUserController < ApplicationController
  before_action :authenticate_user!

  def index
    render json:
      {
       data:  UserShortSerializer.new(current_user).serializable_hash[:data][:attributes]
      }, status: :ok
  end

end
