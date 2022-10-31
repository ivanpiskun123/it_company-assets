# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  # before_action :configure_sign_in_params, only: [:create]
  # skip_before_action :verify_authenticity_token

  # GET /resource/sign_in
  # def new
  #   render json: {success: warden.authenticated?}
  # end
  #
  # # POST /resource/sign_in
  # def create
  #    self.resource = warden.authenticate!(auth_options)
  #    sign_in(resource_name, resource)
  #    render json: {success: true }
  #    # print(url_for(current_user.avatar))
  #    # render json:  {success: true,
  #    #                current_user: UserShortSerializer.new(current_user).serializable_hash
  #    #                }
  #
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  private

  def respond_with(resource, _opts = {})
    render json: {
      status: {code: 200, message: 'Logged in sucessfully.', id: current_user.id}
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: 200,
        message: "logged out successfully"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end




end
