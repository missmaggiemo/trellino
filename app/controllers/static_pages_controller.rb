class StaticPagesController < ApplicationController

  def home
    redirect_to new_user_session_url unless current_user
  end

end
