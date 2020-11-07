class Room < ApplicationRecord
    belongs_to :user1, class_name: 'User', optional: true
    belongs_to :user2, class_name: 'User', optional: true
    belongs_to :user3, class_name: 'User', optional: true
    belongs_to :user4, class_name: 'User', optional: true
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
=======
>>>>>>> 36e55ce86ecdc0c7fc85597e4f437ef7dce95de8


    def pushuserid(userid)
        if (self.user1_id.nil?) then
            self.update(user1_id:userid)
        elsif (self.user2_id.nil?) then
            self.update(user2_id:userid)
        elsif (self.user3_id.nil?) then
            self.update(user3_id:userid)
        else
            self.update(user4_id:userid)
        end
    end

<<<<<<< HEAD
    def deleteuserid(username)
        if (self.user1.name==username) then
            self.update(user1_id:nil)
        elsif (self.user2.name==username) then
            self.update(user2_id:nil)
        elsif (self.user3.name==username) then
            self.update(user3_id:nil)
        else
            self.update(user4_id:nil)
        end
    end

=======
>>>>>>> 36e55ce86ecdc0c7fc85597e4f437ef7dce95de8
    def createReturnArray
        @roomuser=[]

        for userid in [self.user1, self.user2, self.user3, self.user4] do
            if userid then
                @roomuser.push(userid.name)
            else
                @roomuser.push(nil)
            end
        end

        return @roomuser
    end
<<<<<<< HEAD
>>>>>>> Stashed changes
=======
>>>>>>> 36e55ce86ecdc0c7fc85597e4f437ef7dce95de8
end
