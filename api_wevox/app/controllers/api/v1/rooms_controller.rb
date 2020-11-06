module Api
    module V1
      class RoomsController < ApplicationController
        before_action :set_post, only: [:show, :update, :destroy]
        
        def index
            room = Room.all
            render json: room
            # posts = Post.order(created_at: :desc)
            # render json: { status: 'SUCCESS', message: 'Loaded posts', data: posts }
        end

        def show
            render json: { status: 'SUCCESS', message: 'Loaded the post', data: @post }
        end

        def create
            room = Room.new(message_params)
            if room.save
              ActionCable.server.broadcast 'share_channel', room
              head :ok
            else
              head :ok
            end
            # post = Post.new(post_params)
            # if post.save
            #     render json: { status: 'SUCCESS', data: post }
            # else
            #     render json: { status: 'ERROR', data: post.errors }
            # end
        end
  
  
        def destroy # リソースを削除する
          @post.destroy
          render json: { status: 'SUCCESS', message: 'Deleted the post', data: @post }
        end
  
        def update # リソースを更新する
          if @post.update(post_params)
            render json: { status: 'SUCCESS', message: 'Updated the post', data: @post }
          else
            render json: { status: 'SUCCESS', message: 'Not updated', data: @post.errors }
          end
        end
  
        private
  
        def set_post
          @post = Post.find(params[:id])
        end
  
        def post_params
          params.require(:post).permit(:title)
        end

        def message_params
            params.require(:message).permit(:content)
        end
      end
    end
  end
  