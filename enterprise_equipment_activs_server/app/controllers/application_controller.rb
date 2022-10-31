class ApplicationController < ActionController::API
    # include ActionController::MimeResponds
    # include ActionController::RequestForgeryProtection
    #
    # before_action :authenticate_user!
    # protect_from_forgery with: :exception
    include ActionView::Layouts

end
