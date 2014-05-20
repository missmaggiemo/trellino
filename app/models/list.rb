class List < ActiveRecord::Base

  validates :title, :board_id, presence: true

  belongs_to :board
  
  has_many :cards
  
  def cards
    Card.where(list_id: self.id).order(:sort_id)
  end


end
