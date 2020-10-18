module Api
  module V1
    class PostsController < ApplicationController
      before_action :set_post, only: [:show, :update, :destroy]

      def index # リソースの一覧を表示する
        posts = Post.order(created_at: :desc) # 並び替え

        titles = Card.all

        render json: { status: 'SUCCESS', message: 'Loaded posts', data: titles }
      end

      # def new # リソースを新規作成する
      #
      # end

      def show # レコードの内容を表示する
        render json: { status: 'SUCCESS', message: 'Loaded the post', data: @post }
      end

      def create # リソースを新規作成して追加(保存)する
        post = Post.new(post_params)
        if post.save
          render json: { status: 'SUCCESS', data: post }
        else
          render json: { status: 'ERROR', data: post.errors }
        end
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
    end
  end
end
