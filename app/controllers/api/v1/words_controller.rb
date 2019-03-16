class Api::V1::WordsController < ApplicationController
  def index
    render json: Word.all.order(id: :asc).as_json
  end

  def update
    word = Word.find(params[:id])
    word.update(word_params)
  end

  def word_params
    params.require(:word).permit(:text)
  end
end
