class UsersController < ApplicationController
  before_action :authenticate_user!

  def show

  end

  def index
       render json: {
         data: UserShortSerializer.new(User.all).serializable_hash
       }, status: :ok

  end


end
