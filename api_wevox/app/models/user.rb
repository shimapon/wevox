class User < ApplicationRecord
    has_one :room
    has_many :user_card
    has_many :card, through: :user_card
end
