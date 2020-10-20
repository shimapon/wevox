class Room < ApplicationRecord
    belongs_to :user1, class_name: 'User', optional: true
    belongs_to :user2, class_name: 'User', optional: true
    belongs_to :user3, class_name: 'User', optional: true
    belongs_to :user4, class_name: 'User', optional: true
end
