class BidsController < ApplicationController
  before_action :authenticate_user!

  def opened_bids_count
    render json:
      {
       opened_count:  Bid.where(unit: nil).count
      }, status: :ok
  end

  def index

    if(params[:user_id])
      b = Bid.where(user_id: params[:user_id].to_i)
      render json:
        {
         data:  BidSerializer.new(b).serializable_hash
        }, status: :ok
    else
      render json:
        {
         data:  BidSerializer.new(Bid.order('created_at DESC')).serializable_hash
        }, status: :ok
    end


  end

  def create

    b = Bid.new
    b.is_urgent = params[:isUrgent]
    b.nomination_id = params[:nominationId].to_i
    b.user_id = params[:user_id].to_i
    b.advice_product_url = params[:user_id]


    if b.save
      render json: {
        status: {code: 200, message: 'Bid created sucessfully.'}
      }, status: :ok
    else
      render json: {
        status: {code: 504, message: 'Can\'t create Bid.'}
      }, status: :ok


  end
  end

  def update
    b = Bid.find_by_id(params[:id].to_i)
    b.unit_id=params[:unit_id].to_i
    b.closed_at = Time.now

    u = Unit.find_by_id(params[:unit_id].to_i)
    u.user_id = params[:user_id].to_i
    u.save

    if b.save

      render json: {
        status: {code: 200, message: 'Bid updated sucessfully.'}
      }, status: :ok
    else
      render json: {
        status: {code: 504, message: 'Can\' update bid.'}
      }, status: :ok
    end

  end

end
