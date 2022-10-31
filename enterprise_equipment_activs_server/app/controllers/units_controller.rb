class UnitsController < ApplicationController
    before_action :authenticate_user!



  def index

    if(params[:user_id])
      u = Unit.where(user_id: params[:user_id].to_i)
      render json: {
        data: UnitSerializer.new(u).serializable_hash
      }, status: :ok
    else
      render json: {
        data: UnitSerializer.new(Unit.order('created_at DESC')).serializable_hash
      }, status: :ok
    end


  end

  def show
    render json: {
      data: UnitSerializer.new(Unit.find_by_id(params[:id].to_i)).serializable_hash
    }, status: :ok
  end

  def create

    u = Unit.new
    u.cost = params[:cost].to_i
    u.product_url = params[:product_url]

    if params[:user_id].to_i==0
        u.user_id = nil
    else
        u.user_id = params[:user_id].to_i
    end

    u.nomination_id = params[:nomination_id].to_i

    if u.save
      if params[:bid_id]
        b = Bid.find_by_id(params[:bid_id].to_i)
        b.unit_id = u.id
        b.closed_at = Time.now
        b.save
      end

      render json: {
        status: {code: 200, message: 'Unit created sucessfully.'}
      }, status: :ok
    else
      render json: {
        status: {code: 504, message: 'Can\'t create unit.'}
      }, status: :ok
    end


  end

end
