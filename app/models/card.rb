class Card < ActiveRecord::Base

  validates :list_id, presence: true
  
  belongs_to :list

end
