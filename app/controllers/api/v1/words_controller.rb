class Api::V1::WordsController < ApplicationController
  def index
    render json: get_words.as_json
  end

  def get_words
    Word.all.order(id: :asc).map do |w|
      {
        id: w.id,
        text: w.text
      }
    end
  end

  def update
    word = Word.find(params[:id])
    word.update(word_params)
  end

  def word_params
    params.require(:word).permit(:text)
  end
end
