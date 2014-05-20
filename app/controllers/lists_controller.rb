class ListsController < ApplicationController

  before_action :find_list, only: [:destroy, :show]

  def index
    @lists = List.all
    render json: @lists.sort_by(&:sort_id)
  end


  def create
    @list = List.new(list_params)
    if @list.save
      @list.update(sort_id: @list.id)
      render json: @list
    else
      render json: @list.errors.full_messages, status: 422      
    end
  end
  
  def destroy
    if @list.try(:destroy)
      head :ok
    else
      render json: @list.errors.full_messages, status: 422
    end
  end
  
  def show
    render json: @list, include: :cards
  end

  def update_order
    puts params
    if params[:list].length > 0
      order = 1
      params[:list].each do |list_i|
        if list = List.find(list_i)
          list.update(sort_id: order)
          order += 1
        end
      end
      head :ok
    else
      render json: "Oh no!", status: 422
    end
  end

  def update  
    @list = List.find(params[:id])
    if @list && @list.update(list_params)
      render json: @list
    else
      render json: @list.errors.full_messages, status: 422      
    end
  end

  
  private
  
  def list_params
    params.require(:list).permit(:title, :board_id)
  end

  def find_list
    @list = List.find(params[:id])
  end

end
