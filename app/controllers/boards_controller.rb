class BoardsController < ApplicationController

  before_action :find_board, only: [:destroy, :show]

  def index
    @boards = current_user.try(:boards)
    render json: @boards.sort_by(&:sort_id)
  end


  def create
    @board = current_user.boards.new(board_params)
    if @board.save
      @board.update(sort_id: @board.id)
      render json: @board
    else
      render json: @board.errors.full_messages, status: 422      
    end
  end
  
  def destroy
    if @board.try(:destroy)
      head :ok
    else
      render json: @board.errors.full_messages, status: 422
    end
  end
  
  def show
    render json: @board, include: { lists: { include: :cards } }
  end
  
  def update_order
    if update_order_params.length > 0
      order = 1
      update_order_params.each do |board_i|
        if board = Board.find(board_i)
          board.update(sort_id: order)
          order += 1
        end
      end
      head :ok
    else
      render json: "Oh no!", status: 422
    end
  end


  def update
    @board = Board.find(params[:id])
    if @board && @board.update(board_params)
      render json: @board
    else
      render json: @board.errors.full_messages, status: 422      
    end    
  end

  
  private
  
  def board_params
    params.require(:board).permit(:title, :description)
  end

  def find_board
    @board = Board.find(params[:id])
  end

  def update_order_params
    params.require(:board)
  end


end
