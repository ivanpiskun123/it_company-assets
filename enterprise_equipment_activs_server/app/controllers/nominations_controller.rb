class NominationsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: {
      data: NominationSerializer.new(Nomination.all).serializable_hash
    }, status: :ok
  end

end
