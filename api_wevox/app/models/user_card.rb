class UserCard < ApplicationRecord
    belongs_to :user, optional: true
    belongs_to :card, optional: true
end
