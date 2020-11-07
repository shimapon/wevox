class Card < ApplicationRecord
    has_many :user_card
    has_many :user, through: :user_card
end
